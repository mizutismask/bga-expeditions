/**
 * Stock of shared destinations.
 */
class SharedDestinationDeck {
	/** Destinations stock */
	public sharedDestinations: Stock;

	/**
	 * Init stock.
	 */
	constructor(private game: ExpeditionsGame) {
		this.sharedDestinations = new ebg.stock() as Stock;
		this.sharedDestinations.setSelectionAppearance("class");
		this.sharedDestinations.selectionClass = "selected";
		this.sharedDestinations.setSelectionMode(0);
		this.sharedDestinations.create(
			game,
			$(`shared-destination-stock`),
			CARD_WIDTH,
			CARD_HEIGHT
		);
		this.sharedDestinations.onItemCreate = (
			cardDiv: HTMLDivElement,
			cardUniqueId
		) => setupDestinationCardDiv(cardDiv, Number(cardUniqueId));
		this.sharedDestinations.image_items_per_row = 10;
		this.sharedDestinations.centerItems = true;
		this.sharedDestinations.item_margin = 20;

		//this.sharedDestinations.setOverlap(-1, 20);// = 20; // overlap
		//this.sharedDestinations.horizontal_overlap = -1; // current bug in stock - this is needed to enable z-index on overlapping items
		//this.sharedDestinations.item_margin = 0; // has to be 0 if using overlap
		//this.sharedDestinations.set

		setupDestinationCards(this.sharedDestinations);
	}

	/**
	 * Set visible destination cards.
	 */
	public setCards(destinations: Destination[]) {
		dojo.removeClass("destination-deck", "hidden");

		destinations.forEach((destination) => {
			/*console.log(
				"add shared",
				destination.type * 100 + destination.type_arg
			);*/
			
			this.sharedDestinations.addToStockWithId(
				destination.type * 100 + destination.type_arg,
				"" + destination.id
			);

			const cardDiv = document.getElementById(
				`shared-destination-stock_item_${destination.id}`
			);
				// when mouse hover destination, highlight it on the map
			cardDiv.addEventListener("mouseenter", () =>
				this.game.setHighligthedDestination(destination)
			);
			cardDiv.addEventListener("mouseleave", () =>
				this.game.setHighligthedDestination(null)
			);
			// when destinatin is selected, another highlight on the map
			cardDiv.addEventListener("click", () =>
				this.game.setSelectedDestination(
					destination,
					this.sharedDestinations
						.getSelectedItems()
						.some((item) => Number(item.id) == destination.id)
				)
			);
		});
	}

	/**
	 * Hide destination selector.
	 */
	public hide() {
		this.sharedDestinations.removeAll();

		dojo.addClass("shared-destination-deck", "hidden");
	}
}