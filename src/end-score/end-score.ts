declare const playSound;

/**
 * End score board.
 * It will start empty, and notifications will update it and start animations one by one.
 */
class EndScore {
	/** Player scores (key is player id) */
	private scoreCounters: Counter[] = [];

	constructor(
		private game: ExpeditionsGame,
		private players: ExpeditionsPlayer[],
		/** fromReload: if a player refresh when game is over, we skip animations (as there will be no notifications to animate the score board) */
		fromReload: boolean,
		/** bestScore is the top score for the game, so progression shown as train moving forward is relative to best score */
		private bestScore: number
	) {
		const headers = document.getElementById("scoretr");
		if (!headers.childElementCount) {
			dojo.place(
				`
                <th></th>
                <th id="th-destination-reached-score" class="">${_("Destinations reached")}</th>
                <th id="th-revealed-tokens-back-score" class="">${_("Revealed destinations reached")}</th>
                <th id="th-destination-unreached-score" class="">${_("Destinations not reached")}</th>
                <th id="th-revelead-tokens-left-score" class="">${_("Reveled destinations not reached")}</th>
                <th id="th-total-score" class="">${_("Total")}</th>
            `,
				headers
			);
		}

		players.forEach((player) => {
			const playerId = Number(player.id);

			dojo.place(
				`<tr id="score${player.id}">
                    <td id="score-name-${player.id}" class="player-name" style="color: #${player.color}">${
					player.name
				}</td>
                    <td id="destination-reached${player.id}" class="score-number">${
					player.completedDestinations.length + player.sharedCompletedDestinationsCount
				}</td>
                    <td id="revealed-tokens-back${player.id}" class="score-number">${
					player.revealedTokensBackCount
				}</td>
                    <td id="destination-unreached${player.id}" class="score-number">-${
					player.uncompletedDestinations?.length
				}</td>
                    <td id="revealed-tokens-left${player.id}" class="score-number">-${
					player.revealedTokensLeftCount
				}</td>
                    <td id="total${player.id}" class="score-number total">${player.score}</td>
                </tr>`,
				"score-table-body"
			);
		});

		this.setBestScore(bestScore);
		players.forEach((player) => {
			if (Number(player.score) == bestScore) {
				this.highlightWinnerScore(player.id);
			}
			this.updateDestinationsTooltip(player);
		});
	}

	public updateScores(players: ExpeditionsPlayer[]) {
		players.forEach((p) => {
			document.getElementById(`destination-reached${p.id}`).innerHTML = (
				p.completedDestinations.length + p.sharedCompletedDestinationsCount
			).toString();
			document.getElementById(`revealed-tokens-back${p.id}`).innerHTML = p.revealedTokensBackCount.toString();
			document.getElementById(`destination-unreached${p.id}`).innerHTML = "-" + p.uncompletedDestinations?.length;
			document.getElementById(`revealed-tokens-left${p.id}`).innerHTML = "-" + p.revealedTokensLeftCount;
			document.getElementById(`total${p.id}`).innerHTML = p.score.toString();
		});
	}

	/**
	 * Add golden highlight to top score player(s)
	 */
	public highlightWinnerScore(playerId: number | string) {
		document.getElementById(`score${playerId}`).classList.add("highlight");
		document.getElementById(`score-name-${playerId}`).style.color = "";
	}

	/**
	 * Save best score so we can move trains.
	 */
	public setBestScore(bestScore: number) {
		this.bestScore = bestScore;
	}

	/**
	 * Set score, and animate train to new score.
	 */
	public setPoints(playerId: number, points: number) {
		this.scoreCounters[playerId].toValue(points);
	}

	public updateDestinationsTooltip(player: ExpeditionsPlayer) {
		let html = `<div class="destinations-flex">
            <div>
                ${player.completedDestinations.map(
					(destination) =>
						`<div class="destination-card completed" style="${getBackgroundInlineStyleForDestination(
							destination
						)}"></div>`
				)}
            </div>
            <div>
                ${player.uncompletedDestinations?.map(
					(destination) =>
						`<div class="destination-card uncompleted" style="${getBackgroundInlineStyleForDestination(
							destination
						)}"></div>`
				)}
            </div>
        </div>`;

		if (document.getElementById(`destinations-score-${player.id}`)) {
			this.game.setTooltip(`destinations-score-${player.id}`, html);
		}
	}
}
