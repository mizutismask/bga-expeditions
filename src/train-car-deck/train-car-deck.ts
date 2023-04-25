const DBL_CLICK_TIMEOUT = 300;
const SPOTS_COUNT = 6;

/**
 * Selection of new train cars and destination cards.
 */
class TrainCarSelection {
	public visibleCards: Destination[] = [];
	private sharedDestinationDeck: SharedDestinationDeck;
	private dblClickTimeout = null;

	/**
	 * Init stocks.
	 */
	constructor(
		private game: ExpeditionsGame,
		visibleCards: Destination[],
		sharedDestinationDeck: SharedDestinationDeck,
		destinationDeckCount: number,
		destinationDeckMaxCount: number
	) {
		this.sharedDestinationDeck = sharedDestinationDeck;

		/*for (let i = 1; i <= SPOTS_COUNT; i++) {
			this.visibleCardsSpots[i] = new VisibleCardSpot(game, i);
		}*/

		//console.log("new TrainCarSelection", visibleCards);
		this.visibleCards = Object.values(visibleCards);
		this.setNewSharedCardsOnTable(visibleCards, false);
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
	public setNewSharedCardsOnTable(spotsCards: Destination[], fromDeck: boolean) {
		this.sharedDestinationDeck.setCards(spotsCards);
		this.game.showSharedDestinations(spotsCards);
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
						`tickets-counter-${playerId}-wrapper`
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
					"overall_player_board_" + playerId
				);

				animateCardToCounterAndDestroy(
					this.game,
					`animated-destination-card-${i}`,
					`destinations-counter-${playerId}-wrapper`
				);
			}, 200 * i);
		}
	}
}
