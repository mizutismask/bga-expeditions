const ANIMATION_MS = 500;
const SCORE_MS = 1500;

const isDebug = window.location.host == 'studio.boardgamearena.com';
const log = isDebug ? console.log.bind(window.console) : function () {};

const ACTION_TIMER_DURATION = 8;
const LOCATION_SHARED_COMPLETED = 'sharedCompleted';
const ARROW_CLASSES_PERMUTATIONS: string[] = [
    'arrowLRB',
    'arrowLRY',
    'arrowLRR',
    'arrowLNB',
    'arrowLNY',
    'arrowLNR',
    'arrowMRB',
    'arrowMRY',
    'arrowMRR',
    'arrowMNB',
    'arrowMNY',
    'arrowMNR',
    'arrowSRB',
    'arrowSRY',
    'arrowSRR',
    'arrowSNB',
    'arrowSNY',
    'arrowSNR',
];

class Expeditions implements ExpeditionsGame {
    private gamedatas: ExpeditionsGamedatas;

    public map: TtrMap;
    private destinationSelection: DestinationSelection;
    private sharedDestinations: SharedDestinationDeck;
    public destinationCardsManager: CardsManager;
    private playerTable: PlayerTable = null;
    private destinationToReveal: Destination;
    private endScore: EndScore;
    private selectedArrowColor: number;

    private revealedTokensBackCounters: Counter[] = [];
    private ticketsCounters: Counter[] = [];
    private arrowsCounters: Counter[] = [];
    private destinationCardCounters: Counter[] = [];
    private completedDestinationsCounters: Counter[] = [];
    private commonCompletedDestinationsCounters: Counter[] = [];
    private lastArrowsByColor: Map<number, Route> = new Map();

    private animations: ExpeditionsAnimation[] = [];
    public animationManager: AnimationManager;

    private isTouch = window.matchMedia('(hover: none)').matches;
    private routeToConfirm: { route: Route; color: number } | null = null;
    private originalTextChooseAction: string;
    private actionTimerId = null;

    private TOOLTIP_DELAY = document.body.classList.contains('touch-device') ? 1500 : undefined;

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
        log('Starting game setup');

        this.gamedatas = gamedatas;
        log('gamedatas', gamedatas);

        this.map = new TtrMap(
            this,
            Object.values(gamedatas.players),
            gamedatas.claimedRoutes,
            this.getDestinationsByPlayer(this.gamedatas.revealedDestinationsToDo)
        );

        this.destinationCardsManager = new CardsManager(this);
        this.sharedDestinations = new SharedDestinationDeck(this);
        this.animationManager = new AnimationManager(this);
        this.showSharedDestinations(Object.values(gamedatas.sharedDestinations));

        COLORS.forEach((color) => {
            const counter = new ebg.counter();
            counter.create(`arrows-counter-color-${color}`);
            counter.setValue(gamedatas.remainingArrows[color]);
            this.arrowsCounters[color] = counter;
        });

        const player = gamedatas.players[this.getPlayerId()];
        if (player) {
            this.playerTable = new PlayerTable(
                this,
                player,
                gamedatas.handDestinations,
                gamedatas.completedDestinations
            );
            this.playerTable.setToDoSelectionMode('none');
        }
        this.destinationSelection = new DestinationSelection(this);

        this.createPlayerPanels(gamedatas);

        if (gamedatas.lastTurn) {
            this.notif_lastTurn(false);
        }
        if (Number(gamedatas.gamestate.id) >= 90) {
            // score or end
            this.onEnteringEndScore();
        }

        COLORS.forEach((color) => this.replacePreviousLastRoute(gamedatas.lastArrowsByColor[color]));

        this.setupNotifications();
        this.setupPreferences();

        (this as any).onScreenWidthChange = () => this.map.setAutoZoom();

        log('Ending game setup');
    }

    ///////////////////////////////////////////////////
    //// Game & client states

    // onEnteringState: this method is called each time we are entering into a new game state.
    //                  You can use this method to perform some user interface changes at this moment.
    //
    public onEnteringState(stateName: string, args: any) {
        log('Entering state: ' + stateName, args.args);

        switch (stateName) {
            case 'chooseAdditionalDestinations':
                if (args?.args) {
                    const chooseDestinationsArgs = args.args as EnteringChooseDestinationsArgs;
                    const destinations =
                        chooseDestinationsArgs.destinations || chooseDestinationsArgs._private?.destinations;
                    if (destinations && (this as any).isCurrentPlayerActive()) {
                        destinations.forEach((destination) => this.map.setSelectableDestination(destination, true));
                        this.destinationSelection.setCards(destinations);
                        this.destinationSelection.selectionChange();
                    }
                    this.playerTable?.setToDoSelectionMode('single');
                    this.toggleDisableButtonTrade(false); //no selection is valid to say no trade
                }
                break;
            case 'revealDestination':
                if (args?.args) {
                    const revealDestinationArgs = args.args as EnteringRevealDestinationArgs;
                    const possibleDestinations = revealDestinationArgs._private?.possibleDestinations;
                    const allDestinations = revealDestinationArgs._private?.allDestinations;
                    if (allDestinations && (this as any).isCurrentPlayerActive()) {
                        possibleDestinations.forEach((destination) =>
                            this.map.setSelectableDestination(destination, true)
                        );
                        //this.destinationSelection.setCards(allDestinations);
                        //this.destinationSelection.setSelectableCards(possibleDestinations);
                        this.playerTable?.setToDoSelectionMode('single');
                        this.playerTable?.setToDoSelectableCards(possibleDestinations);
                    }
                }
                break;
            case 'chooseAction':
                dojo.query('[data-to-connect="true"]:not([data-selectable]):not([data-revealed-by])').forEach(
                    (elt) => (elt.dataset.selectable = 'true')
                );

                this.onEnteringChooseAction(args.args as EnteringChooseActionArgs);
                break;
            case 'useTicket':
                this.onEnteringUseTicket(args.args as EnteringUseTicketArgs);
                break;
            case 'endScore':
                this.onEnteringEndScore();
                break;
        }
    }
    /**
     * Show selectable routes, and unclaimable routes.
     */
    private onEnteringUseTicket(args: EnteringUseTicketArgs) {
        const currentPlayerActive = (this as any).isCurrentPlayerActive();

        //this.map.setSelectableRoutes(currentPlayerActive, args.possibleRoutes);
        this.map.setRemovableRoutes(currentPlayerActive, args.unclaimableRoutes);
    }

    /**
     * Show selectable routes.
     */
    private onEnteringChooseAction(args: EnteringChooseActionArgs) {
        if (args.loopToResolve) {
            this.setGamestateDescription('Loop');
        } else {
            this.selectedArrowColor = 0;
            this.setGamestateDescription(args.mainActionDone && args.canPass ? 'MainActionDone' : '');
        }
        const currentPlayerActive = (this as any).isCurrentPlayerActive();

        this.map.setSelectableRoutes(false, []);
        //this.map.setSelectableRoutes(currentPlayerActive, args.possibleRoutes);
    }

    /**
     * Show score board.
     */
    private onEnteringEndScore() {
        const lastTurnBar = document.getElementById('last-round');
        if (lastTurnBar) {
            lastTurnBar.style.display = 'none';
        }

        document.getElementById('score').style.display = 'flex';

        this.endScore = new EndScore(this, Object.values(this.gamedatas.players), this.gamedatas.bestScore);
    }

    // onLeavingState: this method is called each time we are leaving a game state.
    //                 You can use this method to perform some user interface changes at this moment.
    //
    public onLeavingState(stateName: string) {
        log('Leaving state: ' + stateName);

        switch (stateName) {
            case 'revealDestination':
                this.map.setHighligthedDestination(null);
                //this.setDestinationsToConnect(this.destinationsTodo);
                this.playerTable?.setToDoSelectionMode('none');
                break;
            case 'chooseAdditionalDestinations':
                this.destinationSelection.hide();
                const mapDiv = document.getElementById('map');
                mapDiv
                    .querySelectorAll(`.city[data-selected]`)
                    .forEach((city: HTMLElement) => (city.dataset.selected = 'false'));
                this.playerTable?.setToDoSelectionMode('none');
                break;
            case 'chooseAction':
                //this.map.setSelectableDestination()
                this.playerTable?.setToDoSelectableCards([]);
                break;
            case 'useTicket':
                dojo.query('.remove-arrow-handle').forEach((handle) => dojo.destroy(handle));
                dojo.query('.removable').removeClass('removable');
                break;
        }
    }

    // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
    //                        action status bar (ie: the HTML links in the status bar).
    //
    public onUpdateActionButtons(stateName: string, args: any) {
        if ((this as any).isCurrentPlayerActive()) {
            switch (stateName) {
                case 'revealDestination':
                    (this as any).addActionButton('revealDestination_button', _('Reveal this destination'), () =>
                        this.doRevealDestination()
                    );
                    dojo.addClass('revealDestination_button', 'disabled');
                    dojo.addClass('revealDestination_button', 'timer-button');
                    break;
                case 'chooseAction':
                    const chooseActionArgs = args as EnteringChooseActionArgs;
                    this.setActionBarChooseAction(false);
                    //this.playerTable.destinationColumnsUpdated();
                    break;
                case 'useTicket':
                    this.setActionBarUseTicket(false);
                    break;
                case 'chooseAdditionalDestinations':
                    (this as any).addActionButton(
                        'chooseAdditionalDestinations_button',
                        _('Trade selected destinations'),
                        () => this.chooseAdditionalDestinations()
                    );
                    dojo.addClass('chooseAdditionalDestinations_button', 'disabled');
                    break;
            }
        }
    }

    ///////////////////////////////////////////////////
    //// Utility methods

    ///////////////////////////////////////////////////

    public getRouteOrigin(route: Route, claimed: ClaimedRoute) {
        return claimed.reverseDirection ? route.to : route.from;
    }

    public getRouteDestination(route: Route, claimed: ClaimedRoute) {
        return claimed.reverseDirection ? route.from : route.to;
    }

    /**
     * This method can be used instead of addActionButton, to add a button which is an image (i.e. resource). Can be useful when player
     * need to make a choice of resources or tokens.
     */
    public addImageActionButton(
        id: string,
        div: string,
        color: string = 'gray',
        tooltip: string,
        handler,
        parentClass: string = ''
    ) {
        // this will actually make a transparent button
        (this as any).addActionButton(id, div, handler, '', false, color);
        // remove boarder, for images it better without
        dojo.style(id, 'border', 'none');
        // but add shadow style (box-shadow, see css)
        dojo.addClass(id, 'shadow bgaimagebutton ' + parentClass);
        // you can also add addition styles, such as background
        if (tooltip) dojo.attr(id, 'title', tooltip);
        return $(id);
    }

    public createDiv(classes: string, id: string = '', value: string = '') {
        if (typeof value == 'undefined') value = '';
        var node: HTMLElement = dojo.create('div', { class: classes, innerHTML: value });
        if (id) node.id = id;
        return node.outerHTML;
    }
    public getDestinationsByPlayer(destinations: Destination[]) {
        const destinationsByPlayer = this.groupBy(destinations, (p) => p.location_arg);
        const typedDestinationsByPlayer = new Map<ExpeditionsPlayer, Destination[]>();
        Object.entries(destinationsByPlayer).forEach((e) => {
            const [playerId, destinations] = e;
            typedDestinationsByPlayer.set(this.gamedatas.players[playerId], destinations);
        });
        return typedDestinationsByPlayer;
    }

    public groupBy<T>(arr: T[], fn: (item: T) => any) {
        return arr.reduce<Record<string, T[]>>((prev, curr) => {
            const groupKey = fn(curr);
            const group = prev[groupKey] || [];
            group.push(curr);
            return { ...prev, [groupKey]: group };
        }, {});
    }

    public setTooltip(id: string, html: string) {
        (this as any).addTooltipHtml(id, html, this.TOOLTIP_DELAY);
    }
    public setTooltipToClass(className: string, html: string) {
        (this as any).addTooltipHtmlToClass(className, html, this.TOOLTIP_DELAY);
    }

    private setGamestateDescription(property: string = '') {
        const originalState = this.gamedatas.gamestates[this.gamedatas.gamestate.id];
        this.gamedatas.gamestate.description = originalState['description' + property];
        this.gamedatas.gamestate.descriptionmyturn = originalState['descriptionmyturn' + property];
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
        dojo.query('.preference_control').connect('onchange', onchange);

        // Call onPreferenceChange() now
        dojo.forEach(dojo.query('#ingame_menu_content .preference_control'), (el) => onchange({ target: el }));
    }

    /**
     * Handle user preferences changes.
     */
    private onPreferenceChange(prefId: number, prefValue: number) {
        switch (prefId) {
        }
    }

    public getPlayerId(): number {
        return Number((this as any).player_id);
    }

    public getPlayerScore(playerId: number): number {
        return (this as any).scoreCtrl[playerId]?.getValue() ?? Number(this.gamedatas.players[playerId].score);
    }

    /**
     * Place counters on player panels.
     */
    private createPlayerPanels(gamedatas: ExpeditionsGamedatas) {
        Object.values(gamedatas.players).forEach((player) => {
            const playerId = Number(player.id);

            document.getElementById(`overall_player_board_${player.id}`).dataset.playerColor = player.color;

            // public counters
            dojo.place(
                `<div class="counters">
				<div id="tickets-counter-${player.id}-wrapper" class="counter tickets-counter">
                    <div class="icon expTicket"></div> 
                    <span id="tickets-counter-${player.id}"></span>
                </div>
                <div id="destinations-counter-${player.id}-wrapper" class="counter destinations-counter">
                    <div class="icon destination-card"></div> 
                    <span id="completed-destinations-counter-${player.id}">${
                    this.getPlayerId() !== playerId ? '?' : ''
                }</span>/<span id="destination-card-counter-${player.id}"></span>
                </div>
                <div id="revealed-tokens-back-counter-${
                    player.id
                }-wrapper" class="counter revealed-tokens-back-counter">
                    <div class="icon token" data-player-color="${player.color}"></div> 
                    <span id="revealed-tokens-back-counter-${player.id}"></span> / 4
                </div>
                
				</div>
				<div id="additional-info-${player.id}" class="counters additional-info">
					<div id="common-destinations-counter-${player.id}-wrapper" class="counter common-destinations-counter">
						<div class="icon destination-card shared-destination"></div> 
						<span id="common-completed-destinations-counter-${player.id}">${this.getPlayerId() !== playerId ? '?' : ''}</span>
					</div>
					<div id="additional-icons-${player.id}" class="additional-icons"></div> 
				</div>
				`,
                `player_board_${player.id}`
            );

            const revealedTokensBackCounter = new ebg.counter();
            revealedTokensBackCounter.create(`revealed-tokens-back-counter-${player.id}`);
            revealedTokensBackCounter.setValue(player.revealedTokensBackCount);
            this.revealedTokensBackCounters[playerId] = revealedTokensBackCounter;

            const ticketsCounter = new ebg.counter();
            ticketsCounter.create(`tickets-counter-${player.id}`);
            ticketsCounter.setValue(player.ticketsCount);
            this.ticketsCounters[playerId] = ticketsCounter;

            const destinationCardCounter = new ebg.counter();
            destinationCardCounter.create(`destination-card-counter-${player.id}`);
            destinationCardCounter.setValue(player.destinationsCount);
            this.destinationCardCounters[playerId] = destinationCardCounter;

            const completedDestinationsCounter = new ebg.counter();
            completedDestinationsCounter.create(`completed-destinations-counter-${player.id}`);
            completedDestinationsCounter.setValue(gamedatas.players[player.id].completedDestinations.length);
            this.completedDestinationsCounters[playerId] = completedDestinationsCounter;

            const commonCompletedDestinationsCounter = new ebg.counter();
            commonCompletedDestinationsCounter.create(`common-completed-destinations-counter-${player.id}`);
            commonCompletedDestinationsCounter.setValue(gamedatas.players[player.id].sharedCompletedDestinationsCount);
            this.commonCompletedDestinationsCounters[playerId] = commonCompletedDestinationsCounter;

            if (this.getPlayerId() === playerId) {
                dojo.place(
                    `<div id="player-help" class="css-icon xpd-help-icon">?</div>`,
                    `additional-icons-${player.id}`
                );

                dojo.place(
                    `<div id="player-help-scoring" class="css-icon xpd-help-icon xpd-help-icon-mini">?</div>`,
                    `icon_point_${player.id}`,
                    'after'
                );
            }
            if (player.playerNo === 1) {
                dojo.place(
                    `<div id="firstPlayerIcon" class="css-icon player-turn-order">1</div>`,
                    `additional-icons-${player.id}`,
                    `last`
                );
            }
        });

        this.setTooltipToClass('revealed-tokens-back-counter', _('Revealed destinations reached'));
        this.setTooltipToClass('tickets-counter', _('Remaining tickets'));
        this.setTooltipToClass('destinations-counter', _('Completed / Total destination cards'));
        this.setTooltipToClass('common-destinations-counter', _('Shared destinations reached'));
        this.setTooltipToClass('xpd-help-icon', `<div class="help-card recto"></div>`);
        this.setTooltipToClass('xpd-help-icon-mini', `<div class="help-card verso"></div>`);
        this.setTooltipToClass('player-turn-order', _('First player'));
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
    public setActiveDestination(destination: Destination, previousDestination: Destination = null): void {
        this.map.setActiveDestination(destination, previousDestination);
    }

    /**
     * Check if a route can be claimed with dragged cards.
     */
    public canClaimRoute(route: Route, arrowColor: number): boolean {
        return (
            route.color == arrowColor &&
            (this.gamedatas.gamestate.args as EnteringChooseActionArgs).possibleRoutes.some((pr) => pr.id == route.id)
        );
    }

    /**
     * Check if a route can be claimed in both directions.
     */
    public bothDirectionsPossible(route: Route): boolean {
        const stateArgs = this.gamedatas.gamestate.args as EnteringChooseActionArgs;
        return (
            stateArgs.possibleRoutes.findIndex((pr) => pr.id == route.id) !=
            stateArgs.possibleRoutes.findLastIndex((pr) => pr.id == route.id)
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
        this.map.setHighligthedDestination(null);

        if (this.destinationToReveal) {
            this.startActionTimer(`revealDestination_button`, ACTION_TIMER_DURATION);
            this.map.setHighligthedDestination(this.destinationToReveal);
        }
        this.map.revealDestination(this.getCurrentPlayer(), this.destinationToReveal, true);
        dojo.toggleClass('revealDestination_button', 'disabled', this.destinationToReveal == null);
    }

    /**
     * Sets a player marker on the destination.
     */
    public showRevealedDestination(player: ExpeditionsPlayer, destination: Destination): void {
        this.map.setHighligthedDestination(destination);
        this.map.revealDestination(player, destination);
    }

    public showSharedDestinations(destinations: Destination[]): void {
        this.sharedDestinations.setCards(destinations);
        this.map.showSharedDestinations(destinations);
    }

    /**
     * Highlight cities of selected destination.
     */
    public setSelectedDestination(destination: Destination, visible: boolean): void {
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
    public addAnimation(animation: ExpeditionsAnimation) {
        this.animations.push(animation);
        if (this.animations.length === 1) {
            this.animations[0].animate();
        }
    }

    /**
     * Start the next animation in animation queue.
     */
    public endAnimation(ended: ExpeditionsAnimation) {
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
            (this.gamedatas.gamestate.name !== 'chooseAction' && this.gamedatas.gamestate.name !== 'useTicket')
        ) {
            return;
        }

        const args = this.gamedatas.gamestate.args as EnteringChooseActionArgs;
        if (selectedColor) {
            this.map.setSelectableRoutes(
                true,
                args.possibleRoutes.filter((route) => route.color === selectedColor)
            );

            //makes routes of the selected color on top
            document.querySelectorAll(`.selectable:not([data-color="${selectedColor}"])`).forEach((r: HTMLElement) => {
                r.style.zIndex = '100';
            });
            document
                .querySelectorAll(`.selectable[data-color="${selectedColor}"]`)
                .forEach((r: HTMLElement) => (r.style.zIndex = '101'));
        }
    }

    /**
     * Handle city click during reveal state.
     */
    public clickedCity(city: City): void {
        //console.log("clickedCity", city);
        if (!(this as any).isCurrentPlayerActive() || this.gamedatas.gamestate.name !== 'revealDestination') {
            return;
        }

        const dest = this.gamedatas.handDestinations.find((d) => d.type_arg + 100 == city.id);
        const cityDiv = $(`city${city.id}`);
        if (
            dest &&
            cityDiv.dataset?.selectable === 'true' &&
            (!('revealedBy' in cityDiv.dataset) || cityDiv.dataset?.temporary === 'true')
        ) {
            this.revealDestination(dest);
        }
    }
    /**
     * Handle route click.
     */
    public clickedRoute(route: Route): void {
        const routeDivId: string = `route-spaces-route${route.id}-space0`;
        const routeDiv: HTMLElement = $(routeDivId);
        if (!(this as any).isCurrentPlayerActive()) {
            return;
        }
        //const otherRoute = getAllRoutes().find((r) => route.from == r.from && route.to == r.to && route.id != r.id);

        if (!this.canClaimRoute(route, this.selectedArrowColor) && !dojo.hasClass(routeDivId, 'removable')) {
            return;
        }

        dojo.query(`.route-space.selectable:not(#${routeDivId})`).removeClass('selected');
        routeDiv.classList.toggle('selected');

        if (!routeDiv.classList.contains('selected')) {
            this.stopActionTimer();
            return;
        }
        if (this.bothDirectionsPossible(route)) {
            dojo.destroy(`claimRouteConfirm_button`);
            if (this.gamedatas.gamestate.name !== 'clientChooseDirection') {
                (this as any).setClientState('clientChooseDirection', {
                    descriptionmyturn: _('Click on the selected blinking route to change its direction and confirm'),
                });
            }
            this.map.showOtherDirection(route, routeDiv);
            (this as any).addActionButton(`claimRouteConfirm_button`, _('Confirm'), () => {
                const reverseDirection = routeDiv.dataset.reverseDirection === 'true';
                this.claimRoute(route.id, this.selectedArrowColor, reverseDirection);
                document.documentElement.style.setProperty(
                    '--route-space-background',
                    'var(--route-space-default-background)'
                );
                document.documentElement.style.setProperty(
                    '--route-space-background-size',
                    'var(--route-space-default-background-size)'
                );
            });
        } else {
            if ($(`claimRouteConfirm_button`)) {
                dojo.destroy(`claimRouteConfirm_button`);
            }

            document
                .querySelectorAll(`[id^="claimRouteWithColor_button"]`)
                .forEach((button) => button.parentElement.removeChild(button));

            if (dojo.hasClass(`route-spaces-route${route.id}-space0`, 'removable')) {
                return;
            } else {
                if (this.selectedArrowColor != route.color) {
                    console.log('clic on the wrong color:', this.selectArrowColor, 'instead of', route.color);
                    return;
                }

                (this as any).addActionButton(`claimRouteConfirm_button`, _('Confirm'), () => {
                    dojo.destroy(`claimRouteConfirm_button`);
                    this.claimRoute(route.id, this.selectedArrowColor);
                });
                dojo.addClass('claimRouteConfirm_button', 'timer-button');

                this.startActionTimer(`claimRouteConfirm_button`, ACTION_TIMER_DURATION, () => {
                    dojo.destroy(`claimRouteConfirm_button`);
                    dojo.query(`.route-space.selectable`).removeClass('selected');
                });
            }
        }
    }

    public clickedRemovableRoute(route: Route): void {
        if (!(this as any).isCurrentPlayerActive()) {
            return;
        }
        //clickedRoute method is also called, that’s why selected class is already managed
        if (dojo.hasClass(`route-spaces-route${route.id}-space0`, 'removable')) {
            if (!$(`unclaimRouteConfirm_button`)) {
                (this as any).addActionButton(`unclaimRouteConfirm_button`, _('Confirm'), () => {
                    dojo.destroy(`unclaimRouteConfirm_button`);
                    this.unclaimRoute(route.id);
                });
            }
            dojo.addClass('unclaimRouteConfirm_button', 'timer-button');
            this.startActionTimer(`unclaimRouteConfirm_button`, ACTION_TIMER_DURATION);
        }
    }

    public toDoDestinationSelectionChanged(selection: Destination[], lastChange: Destination) {
        if (this.gamedatas.gamestate.name == 'revealDestination') {
            this.revealDestination(lastChange);
        } else if (this.gamedatas.gamestate.name == 'chooseAdditionalDestinations') {
            this.toggleDisableButtonTrade(
                this.destinationSelection.getSelectedDestinationsIds().length != selection.length
            );
        }
    }

    private toggleDisableButtonTrade(disable: boolean) {
        document.getElementById('chooseAdditionalDestinations_button')?.classList.toggle('disabled', disable);
    }

    public destinationSelectionChanged(selectedIds: number[]) {
        this.toggleDisableButtonTrade(this.playerTable?.getSelectedToDoDestinations().length != selectedIds.length);
    }

    /**
     * Timer for Confirm button. Also adds a cancel button to stop timer.
     * Cancel actions can be passed to be executed on cancel button click.
     */
    private startActionTimer(buttonId: string, time: number, cancelFunction?) {
        if (this.actionTimerId) {
            window.clearInterval(this.actionTimerId);
            dojo.query('.timer-button').forEach((but: HTMLElement) => (but.innerHTML = this.stripTime(but.innerHTML)));
            dojo.destroy(`cancel-button`);
        }

        //adds cancel button
        const button = document.getElementById(buttonId);
        (this as any).addActionButton(
            `cancel-button`,
            _('Cancel'),
            () => {
                window.clearInterval(this.actionTimerId);
                button.innerHTML = this.stripTime(button.innerHTML);
                cancelFunction?.();
                dojo.destroy(`cancel-button`);
            },
            null,
            null,
            'red'
        );

        const _actionTimerLabel = button.innerHTML;
        let _actionTimerSeconds = time;

        const actionTimerFunction = () => {
            const button = document.getElementById(buttonId);
            if (button == null) {
                window.clearInterval(this.actionTimerId);
            } else if (button.classList.contains('disabled')) {
                window.clearInterval(this.actionTimerId);
                button.innerHTML = this.stripTime(button.innerHTML);
            } else if (_actionTimerSeconds-- > 1) {
                button.innerHTML = _actionTimerLabel + ' (' + _actionTimerSeconds + ')';
            } else {
                window.clearInterval(this.actionTimerId);
                button.click();
                button.innerHTML = this.stripTime(button.innerHTML);
            }
        };
        actionTimerFunction();
        this.actionTimerId = window.setInterval(() => actionTimerFunction(), 1000);
    }

    private stopActionTimer() {
        if (this.actionTimerId) {
            window.clearInterval(this.actionTimerId);
            dojo.query('.timer-button').forEach((but: HTMLElement) => dojo.destroy(but.id));
            dojo.destroy(`cancel-button`);
            this.actionTimerId = undefined;
        }
    }

    private stripTime(buttonLabel: string): string {
        const regex = /\s*\([0-9]+\)$/;
        return buttonLabel.replace(regex, '');
    }
    private setChooseActionGamestateDescription(newText?: string) {
        if (!this.originalTextChooseAction) {
            this.originalTextChooseAction = document.getElementById('pagemaintitletext').innerHTML;
        }

        document.getElementById('pagemaintitletext').innerHTML = newText ?? this.originalTextChooseAction;
    }

    /**
     * Sets the action bar (title and buttons) for Choose action.
     */
    private setActionBarChooseAction(fromCancel: boolean) {
        document.getElementById(`generalactions`).innerHTML = '';
        if (fromCancel) {
            this.setChooseActionGamestateDescription();
        }
        if (this.actionTimerId) {
            window.clearInterval(this.actionTimerId);
        }

        const chooseActionArgs = this.gamedatas.gamestate.args as EnteringChooseActionArgs;

        if (!chooseActionArgs.canPass) {
            this.addArrowsColoredButtons(chooseActionArgs.remainingArrows, chooseActionArgs.possibleRoutes);
        }
        this.addImageActionButton(
            'useTicket_button',
            this.createDiv('expTicket', 'expTicket-button'),
            'blue',
            _('Use a ticket to place another arrow, remove the last one of any expedition or exchange a card'),
            () => {
                this.useTicket();
            }
        );
        $('expTicket-button').parentElement.style.padding = '0';

        dojo.toggleClass('useTicket_button', 'disabled', !chooseActionArgs.canUseTicket);
        if (chooseActionArgs.canPass) {
            (this as any).addActionButton('pass_button', _('End my turn'), () => this.pass());
        }
    }

    /**
     * Sets the action bar (title and buttons) for Use ticket action.
     */
    private setActionBarUseTicket(fromCancel: boolean) {
        document.getElementById(`generalactions`).innerHTML = '';
        if (fromCancel) {
            this.setChooseActionGamestateDescription();
        }
        if (this.actionTimerId) {
            window.clearInterval(this.actionTimerId);
        }

        const stateArgs = this.gamedatas.gamestate.args as EnteringUseTicketArgs;
        this.addArrowsColoredButtons(stateArgs.remainingArrows, stateArgs.possibleRoutes);

        (this as any).addActionButton(
            'drawDestinations_button',
            _('Trade one destination'),
            () => this.drawDestinations(),
            null,
            null,
            'blue'
        );

        (this as any).addActionButton(
            'undoTicket_button',
            _('Undo use ticket'),
            () => this.takeAction('undoTicket'),
            null,
            null,
            'red'
        );
    }

    private selectArrowColor(color: number) {
        this.selectedArrowColor = color;
        this.selectedColorChanged(color);
        dojo.query('.place-arrow-button.selected').removeClass('selected');
        dojo.toggleClass('placeArrow_button_' + getColor(color, false), 'selected', this.selectedArrowColor != 0);
    }

    private addArrowsColoredButtons(remainingArrows: { [color: number]: number }, possibleRoutes: Route[]) {
        COLORS.forEach((color) => {
            let colorName = getColor(color);
            let rawColorName = getColor(color, false);
            let label = dojo.string.substitute(_('Continue the ${colorName} expedition'), {
                colorName: `${colorName}`,
            });

            (this as any).addImageActionButton(
                'placeArrow_button_' + rawColorName,
                this.createDiv('arrow ' + rawColorName),
                colorName,
                label,
                () => {
                    this.selectArrowColor(color);
                },
                'place-arrow-button'
            );
            dojo.place(
                dojo.create('span', {
                    class: 'remaining-arrows-count',
                    innerHTML: 'x' + remainingArrows[color],
                }).outerHTML,
                'placeArrow_button_' + rawColorName,
                'after'
            );
        });

        //disable buttons if no more arrows or not possible to use a certain color
        const colors = possibleRoutes.map((r) => r.color);
        COLORS.forEach((c) =>
            dojo.toggleClass(
                'placeArrow_button_' + getColor(c, false),
                'disabled',
                !colors.find((pc) => pc == c) || remainingArrows[c] == 0
            )
        );

        //auto select color if there is only one possible
        const enabledButtons = dojo.query('.place-arrow-button:not(.disabled)');
        if (enabledButtons.length == 1) {
            enabledButtons[0].click();
        }
    }

    public getCityName(cityId: number) {
        return CITIES_NAMES[cityId - 100];
    }

    /**
     * Apply destination reveal.
     */
    public doRevealDestination() {
        if (!(this as any).checkAction('revealDestination')) {
            return;
        }

        if (this.destinationToReveal) {
            this.takeAction('revealDestination', {
                destinationId: this.destinationToReveal.id,
            });
        }
    }
    /**
     * Pick destinations.
     */
    public drawDestinations() {
        if (!(this as any).checkAction('drawDestinations')) {
            return;
        }

        const confirmation = (this as any).prefs[206]?.value !== 2;

        if (confirmation) {
            (this as any).confirmationDialog(_('Are you sure you want to take new destinations?'), () => {
                this.takeAction('drawDestinations');
            });
        } else {
            this.takeAction('drawDestinations');
        }
    }

    /**
     * Apply destination selection (additional objectives).
     */
    public chooseAdditionalDestinations() {
        if (!(this as any).checkAction('chooseAdditionalDestinations')) {
            return;
        }

        const destinationsIds = this.destinationSelection.getSelectedDestinationsIds();

        this.takeAction('chooseAdditionalDestinations', {
            keptDestinationId: destinationsIds.pop(),
            discardedDestinationId: this.playerTable?.getSelectedToDoDestinations().pop().id,
        });
    }

    /**
     * Claim a route.
     */
    public claimRoute(routeId: number, color: number, reverseDirection: boolean = undefined) {
        if (!(this as any).checkAction('claimRoute')) {
            return;
        }

        if (reverseDirection != undefined) {
            this.takeAction('claimRoute', { routeId, color, reverseDirection });
        } else {
            this.takeAction('claimRoute', { routeId, color });
        }
    }

    /**
     * Unclaim a route (with a ticket).
     */
    public unclaimRoute(routeId: number) {
        if (!(this as any).checkAction('unclaimRoute')) {
            return;
        }

        this.takeAction('unclaimRoute', {
            routeId,
        });
    }

    /**
     * Use ticket.
     */
    public useTicket() {
        if (!(this as any).checkAction('useTicket')) {
            return;
        }

        this.takeAction('useTicket');
    }

    /**
     * Pass (in case of no possible action).
     */
    public pass() {
        if (!(this as any).checkAction('pass')) {
            return;
        }

        this.takeAction('pass');
    }

    public takeAction(action: string, data?: any) {
        data = data || {};
        data.lock = true;
        (this as any).ajaxcall(`/expeditions/expeditions/${action}.html`, data, this, () => {});
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

        const notifs = [
            ['claimedRoute', ANIMATION_MS],
            ['unclaimedRoute', ANIMATION_MS],
            ['destinationCompleted', 2700],
            ['points', 1],
            ['ticketUsed', 1],
            ['destinationsPicked', 1],
            ['newSharedDestinationsOnTable', 1],
            ['lastTurn', 1],
            ['bestScore', 1],
            ['destinationRevealed', 600],
            ['highlightWinnerScore', 1],
            ['newLastArrow', 1],
        ];

        notifs.forEach((notif) => {
            dojo.subscribe(notif[0], this, `notif_${notif[0]}`);
            (this as any).notifqueue.setSynchronous(notif[0], notif[1]);
        });
    }

    /**
     * Update player score.
     */
    notif_points(notif: Notif<NotifPointsArgs>) {
        this.setPoints(notif.args.playerId, notif.args.points);
    }

    /**
     * Shows a revealed destination.
     */
    notif_destinationRevealed(notif: Notif<NotifDestinationRevealedArgs>) {
        this.showRevealedDestination(this.gamedatas.players[notif.args.playerId], notif.args.destination);
    }

    /**
     * Adds shared destinations.
     */
    notif_newSharedDestinationsOnTable(notif: Notif<NotifNewSharedDestinationsOnTableArgs>) {
        this.showSharedDestinations(notif.args.sharedDestinations);
    }

    /**
     * Update player destinations.
     */
    notif_destinationsPicked(notif: Notif<NotifDestinationsPickedArgs>) {
        this.destinationCardCounters[notif.args.playerId].incValue(notif.args.number);
        const destinations = notif.args._private?.[this.getPlayerId()]?.destinations;
        const discarded = notif.args._private?.[this.getPlayerId()]?.discardedDestination;
        if (destinations) {
            this.playerTable?.addDestinations(destinations, this.destinationSelection.destinations);
            this.playerTable?.removeDestination(discarded);
            this.map.showNewDestination(destinations[0]);
            this.map.showNewDestination(discarded, false);
        }
        //this.trainCarSelection.moveDestinationCardToPlayerBoard(notif.args.playerId, notif.args.number);
    }

    /**
     * Update claimed routes.
     */
    notif_claimedRoute(notif: Notif<NotifClaimedRouteArgs>) {
        const playerId = notif.args.playerId;
        const route: Route = notif.args.route;

        this.replacePreviousLastRoute(route);

        this.gamedatas.claimedRoutes = notif.args.claimedRoutes;
        const claimedRoute: ClaimedRoute = {
            playerId,
            routeId: route.id,
            reverseDirection: notif.args.reverseDirection,
        };
        if ((this as any).isCurrentPlayerActive()) {
            this.map.setSelectableRoutes(false, []);
        }
        this.map.addClaimedRoute(claimedRoute, this.gamedatas.claimedRoutes);

        const city = CITIES.find((city) => city.id == (this as any).getRouteDestination(route, claimedRoute));
        if (notif.args.ticketsGained > 0) {
            const anim = new TicketAnimation(this, city, {}, 'map');
            this.addAnimation(anim);
        }
        if (notif.args.isDestinationBlue) {
            const anim = new ReplayAnimation(this, city, {}, 'map');
            this.addAnimation(anim);
        }
        this.ticketsCounters[playerId].incValue(notif.args.ticketsGained);
        this.arrowsCounters[route.color].incValue(-1);
    }

    replacePreviousLastRoute(route: Route): void {
        if (route) {
            const previous: Route = this.lastArrowsByColor.get(route.color);
            const index = 0;
            if (previous) {
                document
                    .getElementById(`route-spaces-route${previous.id}-space${index}`)?.classList.remove('last-arrow');
            }
            this.lastArrowsByColor.set(route.color, route);
            document.getElementById(`route-spaces-route${route.id}-space${index}`)?.classList.add('last-arrow');
        }
    }

    /**
     * Update unclaimed route.
     */
    notif_unclaimedRoute(notif: Notif<NotifUnclaimedRouteArgs>) {
        dojo.query('.remove-arrow-handle').forEach((handle) => dojo.destroy(handle));
        dojo.query('.removable').removeClass('removable');

        const playerId = notif.args.playerId;
        const route: Route = notif.args.route;
        this.map.unclaimRoute(route);
        this.ticketsCounters[playerId].incValue(notif.args.ticketsGained);
        this.arrowsCounters[route.color].incValue(1);
    }

    /**
     * Update last arrow when an arrow has been removed.
     */
    notif_newLastArrow(notif: Notif<NotifNewLastArrowArgs>) {
        this.replacePreviousLastRoute(notif.args.newLastArrow);
    }

    /**
     * Update unclaimed routes.
     */
    notif_ticketUsed(notif: Notif<NotifTicketUsedArgs>) {
        const playerId = notif.args.playerId;
        this.ticketsCounters[playerId].incValue(notif.args.canceled ? 1 : -1);
    }

    /**
     * Mark a destination as complete.
     */
    notif_destinationCompleted(notif: Notif<NotifDestinationCompletedArgs>) {
        const playerId = notif.args.playerId;
        const destination: Destination = notif.args.destination;
        if (destination.location == LOCATION_SHARED_COMPLETED) {
            this.commonCompletedDestinationsCounters[playerId].incValue(1);
            this.sharedDestinations.removeCard(destination);
        } else {
            this.completedDestinationsCounters[playerId].incValue(1);
        }
        this.gamedatas.completedDestinations.push(destination);
        this.map.removeRevealedDestination(destination);
        this.revealedTokensBackCounters[playerId].incValue(notif.args.revealedTokenBack);
        if (this.playerTable) {
            this.playerTable?.markDestinationComplete(destination);
        } else {
            this.destinationCompleteAnimationSpectator(destination);
        }

        this.playRandomCompletedSound();
    }

    public destinationCompleteAnimationSpectator(destination: Destination) {
        const endAnimLocation =
            destination.location === LOCATION_SHARED_COMPLETED
                ? `common-completed-destinations-counter-${destination.location_arg}`
                : `completed-destinations-counter-${destination.location_arg}`;

        const newDac = new DestinationCompleteAnimation(this, destination, endAnimLocation, {}, 'completed', 'map');
        this.addAnimation(newDac);
    }

    playRandomCompletedSound() {
        const min = 1;
        const max = 6;
        const i = Math.floor(Math.random() * (max - min + 1) + min);
        playSound(`completed-in-game-${i}`);
        (this as any).disableNextMoveSound();
    }

    /**
     * Show last turn banner.
     */
    notif_lastTurn(animate: boolean = true) {
        dojo.place(
            `<div id="last-round">
            <span class="last-round-text ${animate ? 'animate' : ''}">${_('Finishing round before end of game!')}</span>
        </div>`,
            'page-title'
        );
    }

    /**
     * Save best score for end score animations.
     */
    notif_bestScore(notif: Notif<NotifBestScoreArgs>) {
        this.gamedatas.bestScore = notif.args.bestScore;
        this.endScore?.setBestScore(notif.args.bestScore);
        this.endScore?.updateScores(notif.args.players);
    }

    /**
     * Highlight winner for end score.
     */
    notif_highlightWinnerScore(notif: Notif<NotifLongestPathArgs>) {
        this.endScore?.highlightWinnerScore(notif.args.playerId);
    }

    /* This enable to inject translatable styled things to logs or action bar */
    /* @Override */
    public format_string_recursive(log: string, args: any) {
        try {
            if (log && args && !args.processed) {
                if (typeof args.arrowColor == 'number') {
                    args.arrowColor = `<div class="arrow icon ${this.getColorName(args.arrowColor)}"></div>`;
                }
                if (typeof args.ticket == 'number') {
                    args.ticket = `<div class="icon expTicket"></div>`;
                }

                // make red and blue points red and blue and strong
                ['from', 'to'].forEach((field) => {
                    if (args[field] !== null && args[field] !== undefined && args[field].includes('blue point')) {
                        args[field] = `<strong><span style="color:blue">${_(args[field])}</span></strong>`;
                    } else if (args[field] !== null && args[field] !== undefined && args[field].includes('red point')) {
                        args[field] = `<strong><span style="color:red">${_(args[field])}</span></strong>`;
                    }
                });

                // make cities names in bold
                ['from', 'to', 'cities_names'].forEach((field) => {
                    if (args[field] !== null && args[field] !== undefined && args[field][0] != '<') {
                        args[field] = `<span style="color:#2cd51e"><strong>${_(args[field])}</strong></span>`;
                    }
                });
                ['you', 'actplayer', 'player_name'].forEach((field) => {
                    if (
                        typeof args[field] === 'string' &&
                        args[field].indexOf('#df74b2;') !== -1 &&
                        args[field].indexOf('text-shadow') === -1
                    ) {
                        args[field] = args[field].replace(
                            '#df74b2;',
                            '#df74b2; text-shadow: 0 0 1px black, 0 0 2px black, 0 0 3px black;'
                        );
                    }
                });
            }
        } catch (e) {
            console.error(log, args, 'Exception thrown', e.stack);
        }
        return (this as any).inherited(arguments);
    }

    public getColorName(color: number) {
        switch (color) {
            case BLUE:
                return 'blue';
            case YELLOW:
                return 'yellow';
            case RED:
                return 'red';
        }
    }
}
