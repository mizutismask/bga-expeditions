/**
 * Player table : destination cards.
 */
class PlayerTable {
	private playerDestinations: PlayerDestinations;

	constructor(
		game: ExpeditionsGame,
		player: ExpeditionsPlayer,
		destinations: Destination[],
		completedDestinations: Destination[]
	) {
		let html = `
            <div id="player-table" class="player-table">
                <div id="player-table-${player.id}-destinations" class="player-table-destinations"></div>
            </div>
        `;

		dojo.place(html, "destination-deck", "before");

		this.playerDestinations = new PlayerDestinations(game, player, destinations, completedDestinations);
	}

	/**
	 * Place player table to the left or the bottom of the map.
	 */
	public setPosition(left: boolean) {
		const playerHandDiv = document.getElementById(`player-table`);
		if (left) {
			document.getElementById("main-line").prepend(playerHandDiv);
		} else {
			dojo.place(`player-table`, "destination-deck", "before");
		}
		playerHandDiv.classList.toggle("left", left);
	}

	public addDestinations(destinations: Destination[], originStock?: Stock) {
		this.playerDestinations.addDestinations(destinations, originStock);
	}

	public markDestinationComplete(destination: Destination) {
		this.playerDestinations.markDestinationComplete(destination);
	}

	public setToDoSelectionMode(selectionMode: CardSelectionMode) {
		this.playerDestinations.setToDoSelectionMode(selectionMode);
	}

	public setToDoSelectableCards(possibleDestinations: Destination[]) {
		this.playerDestinations.setToDoSelectableCards(possibleDestinations);
	}

	public getSelectedToDoDestinations() {
		return this.playerDestinations.getSelectedToDoDestinations();
	}

	public removeDestination(destination: Destination) {
		this.playerDestinations.removeCard(destination);
	}

	public updateDestinations() {
		this.playerDestinations.updateDestinationsToConnect();
	}
}
