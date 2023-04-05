/**
 * A normal LineStock, but handling more events from the mouse.
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
}
