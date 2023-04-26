/**
 * A normal LineStock, but handling more events from the mouse.
 * Also allows to make some cards unselectable.
 */
class LineStockWithEvents<T> extends LineStock<T> {
	/**
	 * @param manager the card manager
	 * @param element the stock element (should be an empty HTML Element)
	 * @param settings a `LineStockSettings` object
	 */
	constructor(protected manager: CardManager<T>, protected element: HTMLElement, settings?: LineStockSettings) {
		super(manager, element, settings);
		this.bindMouseEvents();
	}

	protected bindMouseEvents() {
		this.element?.addEventListener("mouseover", (event) => {
			const cardDiv = (event.target as HTMLElement).closest(".card");
			if (!cardDiv) {
				return;
			}
			const card = this.cards.find((c) => this.manager.getId(c) == cardDiv.id);
			if (!card) {
				return;
			}
			this.onCardMouseOver(card);
		});

		this.element?.addEventListener("mouseout", (event) => {
			const cardDiv = (event.target as HTMLElement).closest(".card");
			if (!cardDiv) {
				return;
			}
			const card = this.cards.find((c) => this.manager.getId(c) == cardDiv.id);
			if (!card) {
				return;
			}
			this.onCardMouseOut(card);
		});
	}

	/**
	 * Called when the mouse is on a card. Returns the hovered card.
	 *
	 * card: the hovered card
	 */
	public onCardMouseOver?: (card: T) => void;

	/**
	 * Called when the mouse leaves a card. Returns the previously hovered card.
	 *
	 * card: the previously hovered card
	 */
	public onCardMouseOut?: (card: T) => void;

	public setSelectableCards(selectableCards: T[]) {
		/*this.cards.forEach((card) =>
			this.setSelectableCard(card, selectableCards.find((sc) => sc == card) != undefined)
		);*/
		console.log("selectableCards", selectableCards);

		this.cards.forEach((card) =>
			this.setSelectableCard(
				card,
				selectableCards.find((sc) => this.manager.getId(sc) == this.manager.getId(card)) != undefined
			)
		);
	}

	protected cardClick(card: T) {
		const div: HTMLElement = this.getCardElement(card);
		if (div && div.classList.contains("selectable")) {
			super.cardClick(card);
		}
	}
}
