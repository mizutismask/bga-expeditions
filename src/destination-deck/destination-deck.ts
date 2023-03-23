/**
 * Selection of new destinations.
 */
class DestinationSelection {
	/** Destinations stock */
	public destinations: Stock;
	/** Minimum number of selected destinations to enable the confirm selection button */
	public minimumDestinations: number = 1;

	/**
	 * Init stock.
	 */
	constructor(private game: ExpeditionsGame) {
		this.destinations = new ebg.stock() as Stock;
		this.destinations.setSelectionAppearance("class");
		this.destinations.selectionClass = "selected";
		this.destinations.setSelectionMode(1);
		this.destinations.create(
			game,
			$(`destination-stock`),
			CARD_WIDTH,
			CARD_HEIGHT
		);
		this.destinations.onItemCreate = (
			cardDiv: HTMLDivElement,
			cardUniqueId
		) => setupDestinationCardDiv(cardDiv, Number(cardUniqueId));
		this.destinations.image_items_per_row = 10;
		this.destinations.centerItems = true;
		this.destinations.item_margin = 20;
		dojo.connect(this.destinations, "onChangeSelection", this, () =>
			this.selectionChange()
		);
		setupDestinationCards(this.destinations);
	}

	/**
	 * Set visible destination cards.
	 */
	public setCards(destinations: Destination[]) {
		dojo.removeClass("destination-deck", "hidden");

		destinations.forEach((destination) => {
			this.destinations.addToStockWithId(
				destination.type * 100 + destination.type_arg,
				"" + destination.id
			);

			const cardDiv = document.getElementById(
				`destination-stock_item_${destination.id}`
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
					this.destinations
						.getSelectedItems()
						.some((item) => Number(item.id) == destination.id)
				)
			);
		});
		/*
		this.minimumDestinations = minimumDestinations;

		visibleColors.forEach((color: number, index: number) => {
			document.getElementById(
				`visible-train-cards-mini${index}`
			).dataset.color = "" + color;
		});*/

		//visible-train-cards-mini to remove everything related, mini cards under right pick color cards bar
	}

	/**
	 * Hide destination selector.
	 */
	public hide() {
		this.destinations.removeAll();

		dojo.addClass("destination-deck", "hidden");
	}

	/**
	 * Get selected destinations ids.
	 */
	public getSelectedDestinationsIds() {
		return this.destinations
			.getSelectedItems()
			.map((item) => Number(item.id));
	}

	/**
	 * Toggle activation of confirm selection buttons, depending on minimumDestinations.
	 */
	public selectionChange() {
		document
			.getElementById("chooseInitialDestinations_button")
			?.classList.toggle(
				"disabled",
				this.destinations.getSelectedItems().length <
					this.minimumDestinations
			);
		document
			.getElementById("chooseAdditionalDestinations_button")
			?.classList.toggle(
				"disabled",
				this.destinations.getSelectedItems().length <
					this.minimumDestinations
			);
	}
}
