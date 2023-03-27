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

		dojo.place(html, "resized");

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
			document.getElementById("resized").appendChild(playerHandDiv);
		}
		playerHandDiv.classList.toggle("left", left);
	}

	public addDestinations(destinations: Destination[], originStock?: Stock) {
		this.playerDestinations.addDestinations(destinations, originStock);
	}

	public markDestinationComplete(destination: Destination, destinationRoutes?: Route[]) {
		this.playerDestinations.markDestinationComplete(destination, destinationRoutes);
	}
}
