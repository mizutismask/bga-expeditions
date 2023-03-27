const DBL_CLICK_TIMEOUT = 300;
const SPOTS_COUNT = 6;

/**
 * Level of cards in deck indicator.
 */
class Gauge {
	private levelDiv: HTMLDivElement;

	constructor(containerId: string, className: string, private max: number) {
		dojo.place(
			`
        <div id="gauge-${className}" class="gauge ${className}">
            <div class="inner" id="gauge-${className}-level"></div>
        </div>`,
			containerId
		);

		this.levelDiv = document.getElementById(`gauge-${className}-level`) as HTMLDivElement;
	}

	public setCount(count: number) {
		this.levelDiv.style.height = `${(100 * count) / this.max}%`;
	}
}

/**
 * Selection of new train cars and destination cards.
 */
class TrainCarSelection {
	public visibleCards: Destination[] = [];
	private sharedDestinationDeck: SharedDestinationDeck;
	private destinationGauge: Gauge;
	private dblClickTimeout = null;

	/**
	 * Init stocks and gauges.
	 */
	constructor(
		private game: ExpeditionsGame,
		visibleCards: Destination[],
		sharedDestinationDeck: SharedDestinationDeck,
		destinationDeckCount: number,
		destinationDeckMaxCount: number
	) {
		this.sharedDestinationDeck = sharedDestinationDeck;
		console.log("const", this.sharedDestinationDeck);

		document
			.getElementById("destination-deck-hidden-pile")
			.addEventListener("click", () => this.game.drawDestinations());

		/*for (let i = 1; i <= SPOTS_COUNT; i++) {
			this.visibleCardsSpots[i] = new VisibleCardSpot(game, i);
		}*/

		//console.log("new TrainCarSelection", visibleCards);
		this.visibleCards = Object.values(visibleCards);
		//	this.setNewCardsOnTable(visibleCards, false);
		this.setNewSharedCardsOnTable(visibleCards, false);
		this.destinationGauge = new Gauge("destination-deck-hidden-pile", "destination", destinationDeckMaxCount);
		this.setDestinationCount(destinationDeckCount);
	}

	/**
	 * Set selection of hidden cards deck.
	 */
	public setSelectableTopDeck(selectable: boolean, number: number = 0) {
		/*dojo.toggleClass(
			"train-car-deck-hidden-pile",
			"selectable",
			selectable
		);*/
	}

	/**
	 * Set selectable visible cards (locomotive can't be selected if 1 visible card has been picked).
	 */
	public setSelectableVisibleCards(availableVisibleCards: Destination[]) {
		for (let i = 1; i <= SPOTS_COUNT; i++) {
			/*this.visibleCardsSpots[i].setSelectableVisibleCards(
				availableVisibleCards
			);*/
		}
	}

	/**
	 * Reset visible cards state.
	 */
	public removeSelectableVisibleCards() {
		for (let i = 1; i <= SPOTS_COUNT; i++) {
			/*this.visibleCardsSpots[i].removeSelectableVisibleCards();*/
		}
	}

	/**
	 * Set new visible cards.
	 */
	public setNewCardsOnTable(spotsCards: { [spot: number]: Destination | null }, fromDeck: boolean) {
		Object.keys(spotsCards).forEach((spot) => {
			const card = spotsCards[spot];
			/*this.visibleCardsSpots[spot].setNewCardOnTable(card, fromDeck);*/
		});
	}
	/**
	 * Set new visible cards.
	 */
	public setNewSharedCardsOnTable(spotsCards: Destination[], fromDeck: boolean) {
		this.sharedDestinationDeck.setCards(spotsCards);
		this.game.showSharedDestinations(spotsCards);
	}

	/**
	 * Update destination gauge.
	 */
	public setDestinationCount(count: number) {
		this.destinationGauge.setCount(count);
		document.getElementById(`destination-deck-level`).dataset.level = `${Math.min(10, Math.ceil(count / 10))}`;
	}

	/**
	 * Get HTML Element represented by "origin" (0 means invisible, 1 to 5 are visible cards).
	 */
	public getStockElement(origin: number): HTMLElement {
		return origin === 0
			? document.getElementById("train-car-deck-hidden-pile")
			: document.getElementById(`visible-train-cards-stock${origin}`);
	}

	/**
	 * Animation when train car cards are picked by another player.
	 */
	public moveTrainCarCardToPlayerBoard(playerId: number, from: number, number: number = 1) {
		if (from > 0) {
			/*this.visibleCardsSpots[from].moveTrainCarCardToPlayerBoard(
				playerId
			);*/
		} else {
			for (let i = 0; i < number; i++) {
				setTimeout(() => {
					dojo.place(
						`
                    <div id="animated-train-car-card-0-${i}" class="animated train-car-card from-hidden-pile"></div>
                    `,
						document.getElementById("train-car-deck-hidden-pile")
					);

					animateCardToCounterAndDestroy(
						this.game,
						`animated-train-car-card-0-${i}`,
						`train-car-card-counter-${playerId}-wrapper`
					);
				}, 200 * i);
			}
		}
	}

	/**
	 * Animation when destination cards are picked by another player.
	 */
	public moveDestinationCardToPlayerBoard(playerId: number, number: number) {
		for (let i = 0; i < number; i++) {
			setTimeout(() => {
				dojo.place(
					`
                <div id="animated-destination-card-${i}" class="animated-destination-card"></div>
                `,
					"destination-deck-hidden-pile"
				);

				animateCardToCounterAndDestroy(
					this.game,
					`animated-destination-card-${i}`,
					`destinations-counter-${playerId}-wrapper`
				);
			}, 200 * i);
		}
	}

	/**
	 * List visible cards colors.
	 */
	public getVisibleColors(): number[] {
		/*return this.visibleCardsSpots.map((stock) => stock.getVisibleColor());//*/
		return [2];
	}

	/**
	 * Animate the 3 visible locomotives (bump) before they are replaced.
	 */
	public highlightVisibleLocomotives() {
		/*	this.visibleCardsSpots
			.filter((stock) => stock.getVisibleColor() === 0)
			.forEach((stock) => {
				const cardDiv = stock.getCardDiv();
				if (cardDiv) {
					cardDiv.classList.remove("highlight-locomotive");
					cardDiv.classList.add("highlight-locomotive");
				}
			});*/
	}

	/**
	 * Show the 3 cards drawn for the tunnel claim. Clear them if called with empty array.
	 */
	public showTunnelCards(tunnelCards: TrainCar[]) {
		if (tunnelCards?.length) {
			dojo.place(`<div id="tunnel-cards"></div>`, "train-car-deck-hidden-pile");
			tunnelCards.forEach((card, index) => {
				dojo.place(
					`<div id="tunnel-card-${index}" class="train-car-card tunnel-card animated" data-color="${card.type}"></div>`,
					"tunnel-cards"
				);
				const element = document.getElementById(`tunnel-card-${index}`);
				setTimeout(() => (element.style.transform = `translateY(${55 * (index - 1)}px) scale(0.33)`));
			});
		} else {
			(this.game as any).fadeOutAndDestroy("tunnel-cards");
			//document.getElementById('tunnel-cards')?.remove();
		}
	}
}
