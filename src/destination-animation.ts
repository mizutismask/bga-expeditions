type DestinationAnimationCallback = (destination: Destination) => void;

/**
 * Destination animation : destination card appears growing over the map next to its city, destination is mark "done" or "uncomplete", and card slides where it's been told to.
 */
class DestinationCompleteAnimation extends ExpeditionsAnimation {
	constructor(
		game: ExpeditionsGame,
		private destination: Destination,
		private toId: string,
		private actions: {
			start?: DestinationAnimationCallback;
			change?: DestinationAnimationCallback;
			end?: DestinationAnimationCallback;
		},
		private state: "completed" | "uncompleted",
		private copyAnchor: string,
		private initialSize: number = 1
	) {
		super(game);
	}

	public animate(): Promise<ExpeditionsAnimation> {
		return new Promise((resolve) => {
			dojo.place(
				`
            <div id="animated-destination-card-${
				this.destination.id
			}" class="destination-card" style="${this.getCardPosition(
					this.destination
				)}${getBackgroundInlineStyleForDestination(this.destination)}
                 transform:scale(0); z-index:1000;"></div>
            `,
				this.copyAnchor
			);

			const card = document.getElementById(`animated-destination-card-${this.destination.id}`);
			this.actions.start?.(this.destination);

			const cardBR = card.getBoundingClientRect();
			/*const x = cardBR.x / this.zoom;
			const y = cardBR.y / this.zoom;
			card.style.transform = `translate(${x}px, ${y}px) scale(${this.initialSize})`;
			console.log(`animate transform = translate(${x}px, ${y}px) scale(${this.initialSize})`);
*/
			this.game.setSelectedDestination(this.destination, true);

			setTimeout(() => {
				card.classList.add("animated");
				card.style.transform = `scale(1)`;
				setTimeout(() => {
					card.style.transform = ``;
					this.markComplete(card, cardBR, resolve);
				}, 200);
			}, 100);
		});
	}

	private markComplete(card: HTMLElement, cardBR: DOMRect, resolve: any) {
		setTimeout(() => {
			card.classList.add(this.state); //marks card completed or not
			this.actions.change?.(this.destination);
			setTimeout(() => {
				const toBR = document.getElementById(this.toId).getBoundingClientRect();
				const x = (toBR.x - cardBR.x) / this.zoom;
				const y = (toBR.y - cardBR.y) / this.zoom;
				card.style.transform = `translate(${x}px, ${y}px) scale(${this.initialSize})`;
				setTimeout(() => this.endAnimation(resolve, card), 850);
			}, 800);//blocked time, before moving
		}, 750);//time before marking it as done
	}

	private endAnimation(resolve: any, card: HTMLElement) {
		this.game.setSelectedDestination(this.destination, false);

		resolve(this);

		this.actions.end?.(this.destination);
		this.game.endAnimation(this);
		card.parentElement.removeChild(card);
	}

	private getCardPosition(destination: Destination) {
		const positions = [destination.to].map((cityId) => CITIES.find((city) => city.id == cityId));
		let x = positions[0].x;
		let y = positions[0].y;

		//return `left: ${x - CARD_WIDTH / 2}px; top: ${y - CARD_HEIGHT / 2}px;`;
		return `left: ${x}px; top: ${y}px;`;
	}
}
