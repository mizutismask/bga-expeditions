/**
 * Stock of shared destinations.
 */
class SharedDestinationDeck {
    /** Destinations stock */
    public sharedDestinationsStock: LineStockWithEvents<Destination>;

    /**
     * Init stock.
     */
    constructor(private game: ExpeditionsGame) {
        let stock = new LineStockWithEvents<Destination>(
            this.game.destinationCardsManager,
            $(`shared-destination-stock`),
            {
                center: true,
                gap: "10px",
                direction: "column",
                wrap: "nowrap",
            }
        );
        stock.setSelectionMode("none");

        // highlight destination's cities on the map, on mouse over
        stock.onCardMouseOver = (dest: Destination) => this.game.setHighligthedDestination(dest);
        stock.onCardMouseOut = (dest: Destination) => this.game.setHighligthedDestination(null);
        this.sharedDestinationsStock = stock;
    }

    /**
     * Set visible destination cards.
     */
    public setCards(destinations: Destination[]) {
        this.sharedDestinationsStock.addCards(destinations, { fromElement: $("upperrightmenu"), originalSide: "back" });
    }

    public removeCard(destination: Destination) {
        this.sharedDestinationsStock.removeCard(destination);
    }
}
