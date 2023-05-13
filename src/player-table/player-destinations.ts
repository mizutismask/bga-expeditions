const IMAGE_ITEMS_PER_ROW = 10;

/**
 * Player's destination cards.
 */
class PlayerDestinations {
	public playerId: number;
	/** Highlighted destination on the map */
	private selectedDestination: Destination | null = null;
	/** Destinations in "to do" column */
	private destinationsTodo: Destination[] = [];
	/** Destinations in "done" column */
	private destinationsDone: Destination[] = [];

	/** Stock for destinations in "to do" column */
	private destinationsToDoStock: LineStockWithEvents<Destination>;
	/** Stock for destinations in "done" column */
	private destinationsDoneStock: LineStockWithEvents<Destination>;

	constructor(
		private game: ExpeditionsGame,
		player: ExpeditionsPlayer,
		destinations: Destination[],
		completedDestinations: Destination[]
	) {
		this.playerId = Number(player.id);

		let html = `
        <div id="player-table-${player.id}-destinations-todo" class="player-table-destinations-column todo"></div>
        `;
		dojo.place(html, `player-table-${player.id}-destinations`);

		html = `
        <div id="player-table-${player.id}-destinations-done" class="player-table-destinations-column done"></div>
        `;
		dojo.place(html, `destination-deck`, "after");

		this.initDestinationStocks([
			document.getElementById(`player-table-${this.playerId}-destinations-todo`),
			document.getElementById(`player-table-${this.playerId}-destinations-done`),
		]);
		this.destinationsDoneStock.setSelectionMode("none");
		this.destinationsToDoStock.onSelectionChange = (selection: Destination[], lastChange: Destination) =>
			this.game.toDoDestinationSelectionChanged(selection, lastChange);

		this.addDestinations(destinations);
		destinations
			.filter((destination) => completedDestinations.some((d) => d.id == destination.id))
			.forEach((destination) => this.markDestinationCompleteNoAnimation(destination));

		// highlight the first "to do" destination
		this.activateNextDestination(this.destinationsTodo);
	}

	/**
	 * Add destinations to player's hand.
	 */
	public addDestinations(destinations: Destination[], originStock?: Stock) {
		this.destinationsToDoStock.addCards(destinations);
		destinations.forEach((destination) => {
			const card = document.getElementById(`destination-card-${destination.id}`) as HTMLDivElement;
			/*	let html = `
            <div id="destination-card-${
				destination.id
			}" class="destination-card" style="${getBackgroundInlineStyleForDestination(destination)}"></div>
            `;

			dojo.place(html, `player-table-${this.playerId}-destinations-todo`);

			setupDestinationCardDiv(card, destination.type * 100 + destination.type_arg);

			card.addEventListener("click", () => this.game.revealDestination(destination));

			// highlight destination's cities on the map, on mouse over
			card.addEventListener("mouseenter", () => this.game.setHighligthedDestination(destination));
			card.addEventListener("mouseleave", () => this.game.setHighligthedDestination(null));
*/
			if (originStock) {
				this.addAnimationFrom(
					card,
					document.getElementById(`${originStock.container_div.id}_item_${destination.id}`)
				);
			} else {
				this.addAnimationFrom(card, document.getElementById(`upperrightmenu`));
			}
		});

		originStock?.removeAll();

		this.destinationsTodo.push(...destinations);

		this.updateDestinationsToConnect();
	}

	public setToDoSelectableCards(possibleDestinations: Destination[]) {
		this.destinationsToDoStock.setSelectableCards(possibleDestinations);
	}
	/**
	 * Mark destination as complete (place it on the "complete" column).
	 */
	public markDestinationCompleteNoAnimation(destination: Destination) {
		//console.log("markDestinationComplete");
		if (destination.location_arg === this.playerId) {
			const index = this.destinationsTodo.findIndex((d) => d.id == destination.id);
			if (index !== -1) {
				this.destinationsTodo.splice(index, 1);
				this.destinationsToDoStock.removeCard(destination);
			}

			if (destination.location !== LOCATION_SHARED_COMPLETED) {
				this.destinationsDone.push(destination);
				// fromStock: this.destinationsToDoStock
				this.destinationsDoneStock.addCard(destination);
				this.destinationsDoneStock.getCardElement(destination).classList.add("hidden-for-animation");
			}
			/*document
				.getElementById(`player-table-${this.playerId}-destinations-done`)
				.appendChild(document.getElementById(`destination-card-${destination.id}`));*/
		}
		this.updateDestinationsToConnect();
	}

	/**
	 * Add an animation to mark a destination as complete.
	 */
	public markDestinationCompleteAnimation(destination: Destination) {
		let endAnimLocation: string;
		if (destination.location === LOCATION_SHARED_COMPLETED) {
			endAnimLocation = `common-completed-destinations-counter-${destination.location_arg}`;
		} else {
			if (destination.location_arg === this.playerId) {
				endAnimLocation = `destination-card-${destination.id}`;
				//endAnimLocation = `player-table-${destination.location_arg}-destinations-done`;
			} else {
				endAnimLocation = `completed-destinations-counter-${destination.location_arg}`;
			}
		}

		const newDac = new DestinationCompleteAnimation(
			this.game,
			destination,
			endAnimLocation,
			{
				start: (d) => document.getElementById(endAnimLocation)?.classList.add("hidden-for-animation"),
				change: (d) => this.markDestinationCompleteNoAnimation(d),
				end: (d) => document.getElementById(endAnimLocation)?.classList.remove("hidden-for-animation"),
			},
			"completed",
			"map" //"game_play_area_wrap"
		);

		this.game.addAnimation(newDac);
	}

	/**
	 * Mark a destination as complete.
	 */
	public markDestinationComplete(destination: Destination) {
		if (!(document.visibilityState === "hidden" || (this.game as any).instantaneousMode)) {
			this.markDestinationCompleteAnimation(destination);
		} else {
			this.markDestinationCompleteNoAnimation(destination);
		}
	}

	/**
	 * Highlight another destination.
	 */
	public activateNextDestination(destinationList: Destination[]) {
		const oldSelectedDestination = this.selectedDestination;
		if (
			this.selectedDestination &&
			destinationList.some((d) => d.id == this.selectedDestination.id) &&
			destinationList.length > 1
		) {
			destinationList.splice(destinationList.length, 0, ...destinationList.splice(0, 1));
		}
		this.selectedDestination = destinationList[0];
		this.game.setActiveDestination(this.selectedDestination, oldSelectedDestination);

		document
			.getElementById(`player-table-${this.playerId}-destinations-todo`)
			.classList.toggle("front", destinationList == this.destinationsTodo);
		document
			.getElementById(`player-table-${this.playerId}-destinations-done`)
			.classList.toggle("front", destinationList == this.destinationsDone);

		this.updateDestinationsToConnect();
	}

	public setToDoSelectionMode(selectionMode: CardSelectionMode) {
		this.destinationsToDoStock.setSelectionMode(selectionMode);
	}

	public getSelectedToDoDestinations() {
		return this.destinationsToDoStock.getSelection();
	}

	public removeCard(destination: Destination) {
		this.destinationsToDoStock.removeCard(destination);
		const index = this.destinationsTodo.findIndex((d) => d.id == destination.id);
		if (index !== -1) {
			this.destinationsTodo.splice(index, 1);
		}
	}

	/**
	 * Update dataset property toConnect on map when there is a change.
	 */
	public updateDestinationsToConnect() {
		this.game.setDestinationsToConnect(this.destinationsTodo);
	}

	/**
	 * Place cards on a column.
	 */
	private placeCards(list: Destination[], originalBottom: number = 0): number {
		let maxBottom = 0;
		list.forEach((destination, index) => {
			const bottom = originalBottom + index * DESTINATION_CARD_SHIFT;
			const card = document.getElementById(`destination-card-${destination.id}`);
			card.parentElement.prepend(card);
			/*card.style.bottom = `${bottom}px`;

            if (bottom > maxBottom) {
                maxBottom = bottom;
            }*/
		});

		return maxBottom;
	}

	/**
	 * Add an animation to the card (when it is created).
	 */
	private addAnimationFrom(card: HTMLElement, from: HTMLElement) {
		if (document.visibilityState === "hidden" || (this.game as any).instantaneousMode) {
			return;
		}

		const destinationBR = card.getBoundingClientRect();
		const originBR = from.getBoundingClientRect();

		const deltaX = destinationBR.left - originBR.left;
		const deltaY = destinationBR.top - originBR.top;

		card.style.zIndex = "10";
		card.style.transition = `transform 0.5s linear`;
		const zoom = this.game.getZoom();
		card.style.transform = `translate(${-deltaX / zoom}px, ${-deltaY / zoom}px)`;
		setTimeout(() => (card.style.transform = null));

		setTimeout(() => {
			card.style.zIndex = null;
			card.style.transition = null;
		}, 500);
	}

	private initDestinationStocks(divs: HTMLElement[]) {
		var stockSettings = {
			center: false,
			gap: "10px",
			direction: "row" as "row",
			wrap: "nowrap" as "nowrap",
		};
		divs.forEach((stockToCreate, index) => {
			let stock = new LineStockWithEvents<Destination>(
				this.game.destinationCardsManager,
				stockToCreate,
				stockSettings
			);
			stock.setSelectionMode("single");

			// highlight destination's cities on the map, on mouse over
			stock.onCardMouseOver = (dest: Destination) => this.game.setHighligthedDestination(dest);
			stock.onCardMouseOut = (dest: Destination) => this.game.setHighligthedDestination(null);

			index == 0 ? (this.destinationsToDoStock = stock) : (this.destinationsDoneStock = stock);
		});
	}
}
