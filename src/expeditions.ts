const ANIMATION_MS = 500;
const SCORE_MS = 1500;

const isDebug = window.location.host == "studio.boardgamearena.com";
const log = isDebug ? console.log.bind(window.console) : function () {};

const ACTION_TIMER_DURATION = 8;

class Expeditions implements ExpeditionsGame {
	private gamedatas: ExpeditionsGamedatas;

	public map: TtrMap;
	private trainCarSelection: TrainCarSelection;
	private destinationSelection: DestinationSelection;
	private sharedDestinations: SharedDestinationDeck;
	private playerTable: PlayerTable = null;
	private destinationToReveal: Destination;
	private endScore: EndScore;

	private trainCarCounters: Counter[] = [];
	private trainCarCardCounters: Counter[] = [];
	private destinationCardCounters: Counter[] = [];
	private completedDestinationsCounter: Counter;

	private animations: WagonsAnimation[] = [];

	private isTouch = window.matchMedia("(hover: none)").matches;
	private routeToConfirm: { route: Route; color: number } | null = null;
	private originalTextChooseAction: string;
	private actionTimerId = null;

	private TOOLTIP_DELAY = document.body.classList.contains("touch-device")
		? 1500
		: undefined;

	constructor() {}

	/*
        setup:

        This method must set up the game user interface according to current game situation specified
        in parameters.

        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)

        "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
    */

	public setup(gamedatas: ExpeditionsGamedatas) {
		log("Starting game setup");

		this.gamedatas = gamedatas;
		log("gamedatas", gamedatas);

		this.map = new TtrMap(
			this,
			Object.values(gamedatas.players),
			gamedatas.claimedRoutes
		);

		this.destinationSelection = new DestinationSelection(this);
		this.sharedDestinations = new SharedDestinationDeck(this);

		this.trainCarSelection = new TrainCarSelection(
			this,
			gamedatas.visibleTrainCards,
			this.sharedDestinations,
			gamedatas.destinationDeckCount,
			gamedatas.destinationDeckMaxCount
		);

		const player = gamedatas.players[this.getPlayerId()];
		if (player) {
			this.playerTable = new PlayerTable(
				this,
				player,
				gamedatas.handDestinations,
				gamedatas.completedDestinations
			);
		}

		this.createPlayerPanels(gamedatas);

		if (gamedatas.lastTurn) {
			this.notif_lastTurn(false);
		}
		if (Number(gamedatas.gamestate.id) >= 90) {
			// score or end
			this.onEnteringEndScore(true);
		}

		this.setupNotifications();
		this.setupPreferences();

		(this as any).onScreenWidthChange = () => this.map.setAutoZoom();

		log("Ending game setup");
	}

	///////////////////////////////////////////////////
	//// Game & client states

	// onEnteringState: this method is called each time we are entering into a new game state.
	//                  You can use this method to perform some user interface changes at this moment.
	//
	public onEnteringState(stateName: string, args: any) {
		log("Entering state: " + stateName, args.args);

		switch (stateName) {
			case "privateChooseInitialDestinations":
			case "chooseInitialDestinations":
			case "chooseAdditionalDestinations":
				if (args?.args) {
					const chooseDestinationsArgs =
						args.args as EnteringChooseDestinationsArgs;
					const destinations =
						chooseDestinationsArgs.destinations ||
						chooseDestinationsArgs._private?.destinations;
					if (destinations && (this as any).isCurrentPlayerActive()) {
						destinations.forEach((destination) =>
							this.map.setSelectableDestination(destination, true)
						);
						this.destinationSelection.setCards(destinations);
						this.destinationSelection.selectionChange();
					}
				}
				break;
			case "revealDestination":
				if (args?.args) {
					const revealDestinationArgs =
						args.args as EnteringRevealDestinationArgs;
					const possibleDestinations =
						revealDestinationArgs._private?.possibleDestinations;
					const allDestinations =
						revealDestinationArgs._private?.allDestinations;
					if (
						allDestinations &&
						(this as any).isCurrentPlayerActive()
					) {
						possibleDestinations.forEach((destination) =>
							this.map.setSelectableDestination(destination, true)
						);
						this.destinationSelection.setCards(allDestinations);
						this.destinationSelection.selectionChange();
					}
				}
				break;
			case "chooseAction":
				this.onEnteringChooseAction(
					args.args as EnteringChooseActionArgs
				);
				break;
			case "drawSecondCard":
				this.onEnteringDrawSecondCard(
					args.args as EnteringDrawSecondCardArgs
				);
				break;
			case "confirmTunnel":
				this.onEnteringConfirmTunnel(
					args.args as EnteringConfirmTunnelArgs
				);
				break;
			case "endScore":
				this.onEnteringEndScore();
				break;
		}
	}

	/**
	 * Show selectable routes, and make train car draggable.
	 */
	private onEnteringChooseAction(args: EnteringChooseActionArgs) {
		this.setGamestateDescription(
			args.canTakeTrainCarCards ? "" : "NoTrainCarsCards"
		);

		const currentPlayerActive = (this as any).isCurrentPlayerActive();
		this.trainCarSelection.setSelectableTopDeck(
			currentPlayerActive,
			args.maxHiddenCardsPick
		);

		this.map.setSelectableRoutes(currentPlayerActive, args.possibleRoutes);
	}

	/**
	 * Allow to pick a second card (locomotives will be grayed).
	 */
	private onEnteringDrawSecondCard(args: EnteringDrawSecondCardArgs) {
		this.trainCarSelection.setSelectableTopDeck(
			(this as any).isCurrentPlayerActive(),
			args.maxHiddenCardsPick
		);
		this.trainCarSelection.setSelectableVisibleCards(
			args.availableVisibleCards
		);
	}

	private onEnteringConfirmTunnel(args: EnteringConfirmTunnelArgs) {
		const route = ROUTES.find(
			(route) => route.id == args.tunnelAttempt.routeId
		);
		this.map.setHoveredRoute(route, true);
		this.trainCarSelection.showTunnelCards(args.tunnelAttempt.tunnelCards);
	}

	/**
	 * Show score board.
	 */
	private onEnteringEndScore(fromReload: boolean = false) {
		const lastTurnBar = document.getElementById("last-round");
		if (lastTurnBar) {
			lastTurnBar.style.display = "none";
		}

		document.getElementById("score").style.display = "flex";

		this.endScore = new EndScore(
			this,
			Object.values(this.gamedatas.players),
			fromReload,
			this.gamedatas.bestScore
		);
	}

	// onLeavingState: this method is called each time we are leaving a game state.
	//                 You can use this method to perform some user interface changes at this moment.
	//
	public onLeavingState(stateName: string) {
		log("Leaving state: " + stateName);

		switch (stateName) {
			case "privateChooseInitialDestinations":
			case "chooseInitialDestinations":
			case "chooseAdditionalDestinations":
				this.destinationSelection.hide();
				const mapDiv = document.getElementById("map");
				mapDiv
					.querySelectorAll(`.city[data-selectable]`)
					.forEach(
						(city: HTMLElement) =>
							(city.dataset.selectable = "false")
					);
				mapDiv
					.querySelectorAll(`.city[data-selected]`)
					.forEach(
						(city: HTMLElement) => (city.dataset.selected = "false")
					);
				break;
			case "multiChooseInitialDestinations":
				(
					Array.from(
						document.getElementsByClassName("player-turn-order")
					) as HTMLDivElement[]
				).forEach((elem) => elem.remove());
				break;
			case "chooseAction":
				this.map.setSelectableRoutes(false, []);
				document
					.getElementById("destination-deck-hidden-pile")
					.classList.remove("selectable");
				(
					Array.from(
						document.getElementsByClassName("train-car-group hide")
					) as HTMLDivElement[]
				).forEach((group) => group.classList.remove("hide"));
				break;
			case "drawSecondCard":
				this.trainCarSelection.removeSelectableVisibleCards();
				break;
			case "confirmTunnel":
				this.map.setHoveredRoute(null);
				this.trainCarSelection.showTunnelCards([]);
				break;
		}
	}

	// onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
	//                        action status bar (ie: the HTML links in the status bar).
	//
	public onUpdateActionButtons(stateName: string, args: any) {
		if ((this as any).isCurrentPlayerActive()) {
			switch (stateName) {
				case "privateChooseInitialDestinations":
					(this as any).addActionButton(
						"chooseInitialDestinations_button",
						_("Keep selected destinations"),
						() => this.chooseInitialDestinations()
					);
					this.destinationSelection.selectionChange();
					break;
				case "revealDestination":
					(this as any).addActionButton(
						"revealDestination_button",
						_("Reveal this destination"),
						() => this.doRevealDestination()
					);
					break;
				case "chooseAction":
					const chooseActionArgs = args as EnteringChooseActionArgs;
					if (chooseActionArgs.maxDestinationsPick) {
						document
							.getElementById("destination-deck-hidden-pile")
							.classList.add("selectable");
					}
					this.setActionBarChooseAction(false);
					break;
				case "chooseAdditionalDestinations":
					(this as any).addActionButton(
						"chooseAdditionalDestinations_button",
						_("Keep selected destinations"),
						() => this.chooseAdditionalDestinations()
					);
					dojo.addClass(
						"chooseAdditionalDestinations_button",
						"disabled"
					);
					break;
				case "confirmTunnel":
					const confirmTunnelArgs = args as EnteringConfirmTunnelArgs;
					const confirmLabel =
						/* TODO MAPS _*/ "Confirm tunnel claim" +
						(confirmTunnelArgs.canPay
							? ""
							: ` (${
									/* TODO MAPS _*/ "You don't have enough cards"
							  })`);
					(this as any).addActionButton(
						"claimTunnel_button",
						confirmLabel,
						() => this.claimTunnel()
					);
					(this as any).addActionButton(
						"skipTunnel_button",
						/* TODO MAPS _*/ "Skip tunnel claim",
						() => this.skipTunnel(),
						null,
						null,
						"gray"
					);
					if (!confirmTunnelArgs.canPay) {
						dojo.addClass("claimTunnel_button", "disabled");
					}
					break;
			}
		}
	}

	///////////////////////////////////////////////////
	//// Utility methods

	///////////////////////////////////////////////////
	public isGlobetrotterBonusActive(): boolean {
		return this.gamedatas.isGlobetrotterBonusActive;
	}

	public isLongestPathBonusActive(): boolean {
		return this.gamedatas.isLongestPathBonusActive;
	}

	public setTooltip(id: string, html: string) {
		(this as any).addTooltipHtml(id, html, this.TOOLTIP_DELAY);
	}
	public setTooltipToClass(className: string, html: string) {
		(this as any).addTooltipHtmlToClass(
			className,
			html,
			this.TOOLTIP_DELAY
		);
	}

	private setGamestateDescription(property: string = "") {
		const originalState =
			this.gamedatas.gamestates[this.gamedatas.gamestate.id];
		this.gamedatas.gamestate.description =
			originalState["description" + property];
		this.gamedatas.gamestate.descriptionmyturn =
			originalState["descriptionmyturn" + property];
		(this as any).updatePageTitle();
	}

	/**
	 * Handle user preferences changes.
	 */
	private setupPreferences() {
		// Extract the ID and value from the UI control
		const onchange = (e) => {
			var match = e.target.id.match(/^preference_[cf]ontrol_(\d+)$/);
			if (!match) {
				return;
			}
			var prefId = +match[1];
			var prefValue = +e.target.value;
			(this as any).prefs[prefId].value = prefValue;
			this.onPreferenceChange(prefId, prefValue);
		};

		// Call onPreferenceChange() when any value changes
		dojo.query(".preference_control").connect("onchange", onchange);

		// Call onPreferenceChange() now
		dojo.forEach(
			dojo.query("#ingame_menu_content .preference_control"),
			(el) => onchange({ target: el })
		);
	}

	/**
	 * Handle user preferences changes.
	 */
	private onPreferenceChange(prefId: number, prefValue: number) {
		switch (prefId) {
			case 203:
				this.map.setOutline();
				break;
		}
	}

	public isColorBlindMode(): boolean {
		return Number((this as any).prefs[204]?.value) === 1;
	}

	public getPlayerId(): number {
		return Number((this as any).player_id);
	}

	public getPlayerScore(playerId: number): number {
		return (
			(this as any).scoreCtrl[playerId]?.getValue() ??
			Number(this.gamedatas.players[playerId].score)
		);
	}

	public isDoubleRouteForbidden(): boolean {
		return Object.values(this.gamedatas.players).length <= 3;
	}

	/**
	 * Place counters on player panels.
	 */
	private createPlayerPanels(gamedatas: ExpeditionsGamedatas) {
		Object.values(gamedatas.players).forEach((player) => {
			const playerId = Number(player.id);

			document.getElementById(
				`overall_player_board_${player.id}`
			).dataset.playerColor = player.color;

			// public counters
			dojo.place(
				`<div class="counters">
                <div id="train-car-counter-${
					player.id
				}-wrapper" class="counter train-car-counter">
                    <div class="icon train" data-player-color="${
						player.color
					}" data-color-blind-player-no="${player.playerNo}"></div> 
                    <span id="train-car-counter-${player.id}"></span>
                </div>
                <div id="train-car-card-counter-${
					player.id
				}-wrapper" class="counter train-car-card-counter">
                    <div class="icon train-car-card-icon"></div> 
                    <span id="train-car-card-counter-${player.id}"></span>
                </div>
                <div id="destinations-counter-${
					player.id
				}-wrapper" class="counter destinations-counter">
                    <div class="icon destination-card"></div> 
                    <span id="completed-destinations-counter-${player.id}">${
					this.getPlayerId() !== playerId ? "?" : ""
				}</span>/<span id="destination-card-counter-${
					player.id
				}"></span>
                </div>
            </div>`,
				`player_board_${player.id}`
			);

			const trainCarCounter = new ebg.counter();
			trainCarCounter.create(`train-car-counter-${player.id}`);
			trainCarCounter.setValue(player.remainingTrainCarsCount);
			this.trainCarCounters[playerId] = trainCarCounter;

			const trainCarCardCounter = new ebg.counter();
			trainCarCardCounter.create(`train-car-card-counter-${player.id}`);
			trainCarCardCounter.setValue(player.trainCarsCount);
			this.trainCarCardCounters[playerId] = trainCarCardCounter;

			const destinationCardCounter = new ebg.counter();
			destinationCardCounter.create(
				`destination-card-counter-${player.id}`
			);
			destinationCardCounter.setValue(player.destinationsCount);
			this.destinationCardCounters[playerId] = destinationCardCounter;

			// private counters
			if (this.getPlayerId() === playerId) {
				this.completedDestinationsCounter = new ebg.counter();
				this.completedDestinationsCounter.create(
					`completed-destinations-counter-${player.id}`
				);
				this.completedDestinationsCounter.setValue(
					gamedatas.completedDestinations.length
				);
			}

			if (gamedatas.showTurnOrder && gamedatas.gamestate.id < 30) {
				// don't show turn order if game is already started (refresh or TB game)
				dojo.place(
					`<div class="player-turn-order">${_(
						"Player ${number}"
					).replace(
						"${number}",
						`<strong>${player.playerNo}</strong>`
					)}</div>`,
					`player_board_${player.id}`
				);
			}
		});

		this.setTooltipToClass("train-car-counter", _("Remaining train cars"));
		this.setTooltipToClass("train-car-card-counter", _("Train cars cards"));
		this.setTooltipToClass(
			"destinations-counter",
			_("Completed / Total destination cards")
		);
	}

	/**
	 * Update player score.
	 */
	private setPoints(playerId: number, points: number) {
		(this as any).scoreCtrl[playerId]?.toValue(points);
	}

	/**
	 * Highlight active destination.
	 */
	public setActiveDestination(
		destination: Destination,
		previousDestination: Destination = null
	): void {
		this.map.setActiveDestination(destination, previousDestination);
	}

	/**
	 * Check if a route can be claimed with dragged cards.
	 */
	public canClaimRoute(route: Route, cardsColor: number): boolean {
		return (
			(route.color == 0 ||
				cardsColor == 0 ||
				route.color == cardsColor) &&
			(
				this.gamedatas.gamestate.args as EnteringChooseActionArgs
			).possibleRoutes.some((pr) => pr.id == route.id)
		);
	}

	/**
	 * Highlight destination (on destination mouse over).
	 */
	public setHighligthedDestination(destination: Destination | null): void {
		this.map.setHighligthedDestination(destination);
	}

	/**
	 * Sets or remove a player marker on the destination.
	 */
	public revealDestination(destination: Destination): void {
		if (!(this as any).isCurrentPlayerActive()) {
			return;
		}
		this.destinationToReveal == destination
			? (this.destinationToReveal = null)
			: (this.destinationToReveal = destination);
		this.map.setHighligthedDestination(destination);
		this.map.revealDestination(this.getCurrentPlayer(), destination);
	}

	public showSharedDestinations(destinations: Destination[]): void {
		this.map.showSharedDestinations(destinations);
	}

	/**
	 * Highlight cities of selected destination.
	 */
	public setSelectedDestination(
		destination: Destination,
		visible: boolean
	): void {
		this.map.setSelectedDestination(destination, visible);
	}

	/**
	 * Highlight cities player must connect for its objectives.
	 */
	public setDestinationsToConnect(destinations: Destination[]): void {
		this.map.setDestinationsToConnect(destinations);
	}

	/**
	 * Place player table to the left or the bottom of the map.
	 */
	public setPlayerTablePosition(left: boolean) {
		this.playerTable?.setPosition(left);
	}

	/**
	 * Get current zoom.
	 */
	public getZoom(): number {
		return this.map.getZoom();
	}

	/**
	 * Get current player.
	 */
	public getCurrentPlayer(): ExpeditionsPlayer {
		return this.gamedatas.players[this.getPlayerId()];
	}

	/**
	 * Add an animation to the animation queue, and start it if there is no current animations.
	 */
	public addAnimation(animation: WagonsAnimation) {
		this.animations.push(animation);
		if (this.animations.length === 1) {
			this.animations[0].animate();
		}
	}

	/**
	 * Start the next animation in animation queue.
	 */
	public endAnimation(ended: WagonsAnimation) {
		const index = this.animations.indexOf(ended);
		if (index !== -1) {
			this.animations.splice(index, 1);
		}

		if (this.animations.length >= 1) {
			this.animations[0].animate();
		}
	}

	public selectedColorChanged(selectedColor: number | null) {
		if (
			!(this as any).isCurrentPlayerActive() ||
			this.gamedatas.gamestate.name !== "chooseAction"
		) {
			return;
		}

		const args = this.gamedatas.gamestate.args as EnteringChooseActionArgs;
		if (selectedColor === null || selectedColor === 0) {
			this.map.setSelectableRoutes(true, args.possibleRoutes);
		} else {
			this.map.setSelectableRoutes(
				true,
				args.possibleRoutes.filter(
					(route) =>
						route.color === selectedColor || route.color === 0
				)
			);
		}
	}

	/**
	 * Handle route click.
	 */
	public clickedRoute(route: Route, needToCheckDoubleRoute?: boolean): void {
		if (!(this as any).isCurrentPlayerActive()) {
			return;
		}

		if (needToCheckDoubleRoute === undefined) {
			needToCheckDoubleRoute = this.askDoubleRouteActive();
		}

		const otherRoute = ROUTES.find(
			(r) => route.from == r.from && route.to == r.to && route.id != r.id
		);

		if (!this.canClaimRoute(route, 0)) {
			return;
		}

		document
			.querySelectorAll(`[id^="claimRouteWithColor_button"]`)
			.forEach((button) => button.parentElement.removeChild(button));
		/*
		const selectedColor = this.playerTable.getSelectedColor();

		if (selectedColor !== null) {
			this.askRouteClaimConfirmation(route, selectedColor);
		} else {
			const possibleColors: number[] =
				this.playerTable?.getPossibleColors(route) || [];

			if (possibleColors.length == 1) {
				this.askRouteClaimConfirmation(route, possibleColors[0]);
			} else if (possibleColors.length > 1) {
				possibleColors.forEach((color) => {
					const label = dojo.string.substitute(_("Use ${color}"), {
						color: `<div class="train-car-color icon" data-color="${color}"></div> ${getColor(
							color,
							"train-car"
						)}`,
					});
					(this as any).addActionButton(
						`claimRouteWithColor_button${color}`,
						label,
						() => this.askRouteClaimConfirmation(route, color)
					);
				});

				this.playerTable.setSelectableTrainCarColors(
					route,
					possibleColors
				);
			}
		}*/
	}

	/**
	 * Timer for Confirm button
	 */
	private startActionTimer(buttonId: string, time: number) {
		if (this.actionTimerId) {
			window.clearInterval(this.actionTimerId);
		}

		if (Number((this as any).prefs[207]?.value) == 2) {
			return false;
		}

		const button = document.getElementById(buttonId);

		const _actionTimerLabel = button.innerHTML;
		let _actionTimerSeconds = time;
		const actionTimerFunction = () => {
			const button = document.getElementById(buttonId);
			if (button == null) {
				window.clearInterval(this.actionTimerId);
			} else if (_actionTimerSeconds-- > 1) {
				button.innerHTML =
					_actionTimerLabel + " (" + _actionTimerSeconds + ")";
			} else {
				window.clearInterval(this.actionTimerId);
				button.click();
			}
		};
		actionTimerFunction();
		this.actionTimerId = window.setInterval(
			() => actionTimerFunction(),
			1000
		);
	}

	private setChooseActionGamestateDescription(newText?: string) {
		if (!this.originalTextChooseAction) {
			this.originalTextChooseAction =
				document.getElementById("pagemaintitletext").innerHTML;
		}

		document.getElementById("pagemaintitletext").innerHTML =
			newText ?? this.originalTextChooseAction;
	}

	/**
	 * Sets the action bar (title and buttons) for Choose action.
	 */
	private setActionBarChooseAction(fromCancel: boolean) {
		document.getElementById(`generalactions`).innerHTML = "";
		if (fromCancel) {
			this.setChooseActionGamestateDescription();
		}
		if (this.actionTimerId) {
			window.clearInterval(this.actionTimerId);
		}

		const chooseActionArgs = this.gamedatas.gamestate
			.args as EnteringChooseActionArgs;
		(this as any).addActionButton(
			"drawDestinations_button",
			dojo.string.substitute(_("Draw ${number} destination tickets"), {
				number: chooseActionArgs.maxDestinationsPick,
			}),
			() => this.drawDestinations(),
			null,
			null,
			"red"
		);
		dojo.toggleClass(
			"drawDestinations_button",
			"disabled",
			!chooseActionArgs.maxDestinationsPick
		);
		if (chooseActionArgs.canPass) {
			(this as any).addActionButton("pass_button", _("Pass"), () =>
				this.pass()
			);
		}
	}

	/**
	 * Check if player should be asked for the color he wants when he clicks on a double route.
	 */
	private askDoubleRouteActive() {
		const preferenceValue = Number((this as any).prefs[209]?.value);
		return preferenceValue === 1;
	}

	public getCityName(cityId: number) {
		return CITIES_NAMES[cityId - 100];
	}

	/**
	 * Apply destination selection (initial objectives).
	 */
	public chooseInitialDestinations() {
		if (!(this as any).checkAction("chooseInitialDestinations")) {
			return;
		}

		const destinationsIds =
			this.destinationSelection.getSelectedDestinationsIds();

		this.takeAction("chooseInitialDestinations", {
			destinationsIds: destinationsIds.join(","),
		});
	}

	/**
	 * Apply destination reveal.
	 */
	public doRevealDestination() {
		if (!(this as any).checkAction("revealDestination")) {
			return;
		}

		if (this.destinationToReveal) {
			this.takeAction("revealDestination", {
				destinationId: this.destinationToReveal.id,
			});
		}
	}
	/**
	 * Pick destinations.
	 */
	public drawDestinations() {
		if (!(this as any).checkAction("drawDestinations")) {
			return;
		}

		const confirmation = (this as any).prefs[206]?.value !== 2;

		if (confirmation && this.gamedatas.gamestate.args.maxDestinationsPick) {
			(this as any).confirmationDialog(
				_("Are you sure you want to take new destinations?"),
				() => {
					this.takeAction("drawDestinations");
				}
			);
		} else {
			this.takeAction("drawDestinations");
		}
	}

	/**
	 * Apply destination selection (additional objectives).
	 */
	public chooseAdditionalDestinations() {
		if (!(this as any).checkAction("chooseAdditionalDestinations")) {
			return;
		}

		const destinationsIds =
			this.destinationSelection.getSelectedDestinationsIds();

		this.takeAction("chooseAdditionalDestinations", {
			destinationsIds: destinationsIds.join(","),
		});
	}

	/**
	 * Pick hidden train car(s).
	 */
	public onHiddenTrainCarDeckClick(number: number) {
		const action =
			this.gamedatas.gamestate.name === "drawSecondCard"
				? "drawSecondDeckCard"
				: "drawDeckCards";

		if (!(this as any).checkAction(action)) {
			return;
		}

		this.takeAction(action, {
			number,
		});
	}

	/**
	 * Pick visible train car.
	 */
	public onVisibleTrainCarCardClick(id: number) {
		const action =
			this.gamedatas.gamestate.name === "drawSecondCard"
				? "drawSecondTableCard"
				: "drawTableCard";

		if (!(this as any).checkAction(action)) {
			return;
		}

		this.takeAction(action, {
			id,
		});
	}

	/**
	 * Claim a route.
	 */
	public claimRoute(routeId: number, color: number) {
		if (!(this as any).checkAction("claimRoute")) {
			return;
		}

		this.takeAction("claimRoute", {
			routeId,
			color,
		});
	}

	/**
	 * Pass (in case of no possible action).
	 */
	public pass() {
		if (!(this as any).checkAction("pass")) {
			return;
		}

		this.takeAction("pass");
	}

	/**
	 * Claim a tunnel (confirm paying extra cost).
	 */
	public claimTunnel() {
		if (!(this as any).checkAction("claimTunnel")) {
			return;
		}

		this.takeAction("claimTunnel");
	}

	/**
	 * Skip a tunnel (deny paying extra cost).
	 */
	public skipTunnel() {
		if (!(this as any).checkAction("skipTunnel")) {
			return;
		}

		this.takeAction("skipTunnel");
	}

	public takeAction(action: string, data?: any) {
		data = data || {};
		data.lock = true;
		(this as any).ajaxcall(
			`/expeditions/expeditions/${action}.html`,
			data,
			this,
			() => {}
		);
	}

	private isFastEndScoring() {
		return Number((this as any).prefs[208]?.value) == 2;
	}

	///////////////////////////////////////////////////
	//// Reaction to cometD notifications

	/*
        setupNotifications:

        In this method, you associate each of your game notifications with your local method to handle it.

        Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                your azul.game.php file.

    */
	setupNotifications() {
		//log( 'notifications subscriptions setup' );

		const skipEndOfGameAnimations = this.isFastEndScoring();

		const notifs = [
			["newCardsOnTable", ANIMATION_MS],
			["claimedRoute", ANIMATION_MS],
			["destinationCompleted", ANIMATION_MS],
			["points", 1],
			["destinationsPicked", 1],
			//["trainCarPicked", ANIMATION_MS],
			["freeTunnel", 2000],
			["highlightVisibleLocomotives", 1000],
			["notEnoughTrainCars", 1],
			["lastTurn", 1],
			["bestScore", 1],
			["scoreDestination", skipEndOfGameAnimations ? 1 : 2000],
			["longestPath", skipEndOfGameAnimations ? 1 : 2000],
			["longestPathWinner", skipEndOfGameAnimations ? 1 : 1500],
			["globetrotterWinner", skipEndOfGameAnimations ? 1 : 1500],
			["highlightWinnerScore", 1],
		];

		notifs.forEach((notif) => {
			dojo.subscribe(notif[0], this, `notif_${notif[0]}`);
			(this as any).notifqueue.setSynchronous(notif[0], notif[1]);
		});

		/*(this as any).notifqueue.setIgnoreNotificationCheck(
			"trainCarPicked",
			(notif: Notif<NotifTrainCarsPickedArgs>) =>
				notif.args.playerId == this.getPlayerId() && !notif.args.cards
		);*/
	}

	/**
	 * Update player score.
	 */
	notif_points(notif: Notif<NotifPointsArgs>) {
		this.setPoints(notif.args.playerId, notif.args.points);
		this.endScore?.setPoints(notif.args.playerId, notif.args.points);
	}

	/**
	 * Update player destinations.
	 */
	notif_destinationsPicked(notif: Notif<NotifDestinationsPickedArgs>) {
		this.destinationCardCounters[notif.args.playerId].incValue(
			notif.args.number
		);
		const destinations =
			notif.args._private?.[this.getPlayerId()]?.destinations;
		if (destinations) {
			this.playerTable.addDestinations(
				destinations,
				this.destinationSelection.destinations
			);
		} else {
			this.trainCarSelection.moveDestinationCardToPlayerBoard(
				notif.args.playerId,
				notif.args.number
			);
		}
		this.trainCarSelection.setDestinationCount(
			notif.args.remainingDestinationsInDeck
		);
	}

	/**
	 * Update visible cards.
	 */
	notif_newCardsOnTable(notif: Notif<NotifNewCardsOnTableArgs>) {
		if (notif.args.locomotiveRefill) {
			playSound(`ttr-clear-train-car-cards`);
			(this as any).disableNextMoveSound();
		}

		this.trainCarSelection.setNewCardsOnTable(notif.args.spotsCards, true);
	}

	/**
	 * Animate the 3 visible locomotives (bump) before they are replaced.
	 */
	notif_highlightVisibleLocomotives() {
		this.trainCarSelection.highlightVisibleLocomotives();
	}

	/**
	 * Update claimed routes.
	 */
	notif_claimedRoute(notif: Notif<NotifClaimedRouteArgs>) {
		const playerId = notif.args.playerId;
		const route: Route = notif.args.route;

		this.trainCarCardCounters[playerId].incValue(-route.number);
		this.trainCarCounters[playerId].incValue(-route.number);
		this.map.setClaimedRoutes(
			[
				{
					playerId,
					routeId: route.id,
				},
			],
			playerId
		);
	}

	/**
	 * Mark a destination as complete.
	 */
	notif_destinationCompleted(notif: Notif<NotifDestinationCompletedArgs>) {
		const destination: Destination = notif.args.destination;
		this.completedDestinationsCounter.incValue(1);
		this.gamedatas.completedDestinations.push(destination);
		this.playerTable.markDestinationComplete(
			destination,
			notif.args.destinationRoutes
		);

		playSound(`ttr-completed-in-game`);
		(this as any).disableNextMoveSound();
	}

	/**
	 * Show the 3 cards when attempting a tunnel (case withno extra cards required, play automatically).
	 */
	notif_freeTunnel(notif: Notif<NotifFreeTunnelArgs>) {
		if (
			document.visibilityState !== "hidden" &&
			!(this as any).instantaneousMode
		) {
			this.trainCarSelection.showTunnelCards(notif.args.tunnelCards);
			setTimeout(() => this.trainCarSelection.showTunnelCards([]), 2000);
		}
	}

	/**
	 * Show an error message and animate train car counter to show the player can't take the route because he doesn't have enough train cars left.
	 */
	notif_notEnoughTrainCars() {}

	/**
	 * Show last turn banner.
	 */
	notif_lastTurn(animate: boolean = true) {
		dojo.place(
			`<div id="last-round">
            <span class="last-round-text ${animate ? "animate" : ""}">${_(
				"This is the final round!"
			)}</span>
        </div>`,
			"page-title"
		);
	}

	/**
	 * Save best score for end score animations.
	 */
	notif_bestScore(notif: Notif<NotifBestScoreArgs>) {
		this.gamedatas.bestScore = notif.args.bestScore;
		this.endScore?.setBestScore(notif.args.bestScore);
	}

	/**
	 * Animate a destination for end score.
	 */
	notif_scoreDestination(notif: Notif<NotifDestinationCompletedArgs>) {
		const playerId = notif.args.playerId;
		const player = this.gamedatas.players[playerId];
		this.endScore?.scoreDestination(
			playerId,
			notif.args.destination,
			notif.args.destinationRoutes,
			this.isFastEndScoring()
		);
		if (notif.args.destinationRoutes) {
			player.completedDestinations.push(notif.args.destination);
		} else {
			player.uncompletedDestinations.push(notif.args.destination);
			document
				.getElementById(`destination-card-${notif.args.destination.id}`)
				?.classList.add("uncompleted");
		}
		this.endScore?.updateDestinationsTooltip(player);
	}

	/**
	 * Add Globetrotter badge for end score.
	 */
	notif_globetrotterWinner(notif: Notif<NotifBadgeArgs>) {
		this.endScore?.setGlobetrotterWinner(
			notif.args.playerId,
			notif.args.length
		);
	}

	/**
	 * Animate longest path for end score.
	 */
	notif_longestPath(notif: Notif<NotifLongestPathArgs>) {
		this.endScore?.showLongestPath(
			this.gamedatas.players[notif.args.playerId].color,
			notif.args.routes,
			notif.args.length,
			this.isFastEndScoring()
		);
	}

	/**
	 * Add longest path badge for end score.
	 */
	notif_longestPathWinner(notif: Notif<NotifBadgeArgs>) {
		this.endScore?.setLongestPathWinner(
			notif.args.playerId,
			notif.args.length
		);
	}

	/**
	 * Highlight winner for end score.
	 */
	notif_highlightWinnerScore(notif: Notif<NotifLongestPathArgs>) {
		this.endScore?.highlightWinnerScore(notif.args.playerId);

		playSound(`ttr-scoring-end`);
		(this as any).disableNextMoveSound();
	}

	/* This enable to inject translatable styled things to logs or action bar */
	/* @Override */
	public format_string_recursive(log: string, args: any) {
		try {
			if (log && args && !args.processed) {
				if (typeof args.color == "number") {
					args.color = `<div class="train-car-color icon" data-color="${args.color}"></div>`;
				}
				if (typeof args.colors == "object") {
					args.colors = args.colors
						.map(
							(color) =>
								`<div class="train-car-color icon" data-color="${color}"></div>`
						)
						.join("");
				}

				// make cities names in bold
				["from", "to", "count", "extraCards", "pickedCards"].forEach(
					(field) => {
						if (
							args[field] !== null &&
							args[field] !== undefined &&
							args[field][0] != "<"
						) {
							args[field] = `<strong>${_(args[field])}</strong>`;
						}
					}
				);

				["you", "actplayer", "player_name"].forEach((field) => {
					if (
						typeof args[field] === "string" &&
						args[field].indexOf("#df74b2;") !== -1 &&
						args[field].indexOf("text-shadow") === -1
					) {
						args[field] = args[field].replace(
							"#df74b2;",
							"#df74b2; text-shadow: 0 0 1px black, 0 0 2px black, 0 0 3px black;"
						);
					}
				});
			}
		} catch (e) {
			console.error(log, args, "Exception thrown", e.stack);
		}
		return (this as any).inherited(arguments);
	}
}
