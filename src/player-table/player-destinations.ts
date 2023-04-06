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
        <div id="player-table-${player.id}-destinations-done" class="player-table-destinations-column done"></div>
        `;

		dojo.place(html, `player-table-${player.id}-destinations`);

		this.initDestinationStocks([
			document.getElementById(`player-table-${this.playerId}-destinations-todo`),
			document.getElementById(`player-table-${this.playerId}-destinations-done`),
		]);
		this.destinationsToDoStock.onSelectionChange = (selection: Destination[], lastChange: Destination) =>
			this.game.toDoDestinationSelectionChanged(selection, lastChange);

		this.addDestinations(destinations);
		destinations
			.filter((destination) => completedDestinations.some((d) => d.id == destination.id))
			.forEach((destination) => this.markDestinationComplete(destination));

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
			}
		});

		originStock?.removeAll();

		this.destinationsTodo.push(...destinations);

		this.destinationColumnsUpdated();
	}

	/**
	 * Mark destination as complete (place it on the "complete" column).
	 */
	public markDestinationCompleteNoAnimation(destination: Destination) {
		console.log("markDestinationComplete");

		const index = this.destinationsTodo.findIndex((d) => d.id == destination.id);
		if (index !== -1) {
			this.destinationsTodo.splice(index, 1);
			this.destinationsToDoStock.removeCard(destination);
		}
		this.destinationsDone.push(destination);
		// fromStock: this.destinationsToDoStock
		this.destinationsDoneStock.addCard(destination, {}, {});

		/*document
				.getElementById(`player-table-${this.playerId}-destinations-done`)
				.appendChild(document.getElementById(`destination-card-${destination.id}`));*/
		this.destinationColumnsUpdated();
	}

	/**
	 * Add an animation to mark a destination as complete.
	 */
	public markDestinationCompleteAnimation(destination: Destination, destinationRoutes: Route[]) {
		const newDac = new DestinationCompleteAnimation(
			this.game,
			destination,
			destinationRoutes,
			`destination-card-${destination.id}`,
			`destination-card-${destination.id}`,
			{
				start: (d) => document.getElementById(`destination-card-${d.id}`).classList.add("hidden-for-animation"),
				change: (d) => this.markDestinationCompleteNoAnimation(d),
				end: (d) =>
					document.getElementById(`destination-card-${d.id}`).classList.remove("hidden-for-animation"),
			},
			"completed"
		);

		this.game.addAnimation(newDac);
	}

	/**
	 * Mark a destination as complete.
	 */
	public markDestinationComplete(destination: Destination, destinationRoutes?: Route[]) {
		if (destinationRoutes && !(document.visibilityState === "hidden" || (this.game as any).instantaneousMode)) {
			this.markDestinationCompleteAnimation(destination, destinationRoutes);
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

		this.destinationColumnsUpdated();
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
	 * Update destination cards placement when there is a change.
	 */
	private destinationColumnsUpdated() {
		const doubleColumn = this.destinationsTodo.length > 0 && this.destinationsDone.length > 0;

		const destinationsDiv = document.getElementById(`player-table-${this.playerId}-destinations`);

		const maxBottom = Math.max(
			this.placeCards(this.destinationsTodo, doubleColumn ? DESTINATION_CARD_SHIFT : 0),
			this.placeCards(this.destinationsDone)
		);

		/* const height = `${maxBottom + CARD_HEIGHT}px`;
        destinationsDiv.style.height = height;
        document.getElementById(`player-table-${this.playerId}-train-cars`).style.height = height;
*/

		/*	const col1 = document.getElementById(
			`player-table-${this.playerId}-destinations-todo`
		);
		const col2 = document.getElementById(
			`player-table-${this.playerId}-destinations-todo`
		);
		const destinationCount =
			this.destinationsTodo.length + this.destinationsDone.length;
		col1.style.width =
			(this.destinationsTodo.length * 100 / destinationCount) + "%";
		col2.style.width =
			(this.destinationsDone.length * 100) / destinationCount + "%";*/

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

			index == 0 ? (this.destinationsToDoStock = stock) : (this.destinationsDoneStock = stock);

			stock.setSelectionMode("single");

			// highlight destination's cities on the map, on mouse over
			stock.onCardMouseOver = (dest: Destination) => this.game.setHighligthedDestination(dest);
			stock.onCardMouseOut = (dest: Destination) => this.game.setHighligthedDestination(null);
		});
	}
}
