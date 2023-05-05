type TicketAnimationCallback = (city: City) => void;

/**
 * Destination animation : ticket appears growing over the map next to its city slides towards counter.
 */
class TicketAnimation extends ExpeditionsAnimation {
	constructor(
		game: ExpeditionsGame,
		private city: City,
		private actions: {
			start?: TicketAnimationCallback;
			change?: TicketAnimationCallback;
			end?: TicketAnimationCallback;
		},
		private playerId: number,
		private copyAnchor: string
	) {
		super(game);
		this.copyAnchor = copyAnchor;
	}

	public animate(): Promise<ExpeditionsAnimation> {
		console.log("ticket animate", this.city, this.getTicketPosition(this.city));

		return new Promise((resolve) => {
			dojo.place(
				`
            <div id="animated-ticket-${this.city.id}" class="expTicket animated-ticket" style="${this.getTicketPosition(this.city)}
                 transform:scale(0); z-index:1000;"></div>
            `,
				this.copyAnchor
			);

			const ticket = document.getElementById(`animated-ticket-${this.city.id}`);
			this.actions.start?.(this.city);

			const ticketBR = ticket.getBoundingClientRect();
			setTimeout(() => {
				ticket.classList.add("animated");
				ticket.style.transform = `scale(3)`;
				setTimeout(() => {
					ticket.style.transform = ``;
					this.moveToPlayerBoard(ticket, ticketBR, resolve);
				}, 200);
			}, 100);
		});
	}

	private moveToPlayerBoard(ticket: HTMLElement, ticketBR: DOMRect, resolve: any) {
		setTimeout(() => {
			this.actions.change?.(this.city);
			setTimeout(() => {
				const toBR = document
					.getElementById(`tickets-counter-${this.playerId}-wrapper`)
					.getBoundingClientRect();
				const x = (toBR.x - ticketBR.x) / this.zoom;
				const y = (toBR.y - ticketBR.y) / this.zoom;
				ticket.style.transform = `translate(${x}px, ${y}px) scale(1)`;
				setTimeout(() => this.endAnimation(resolve, ticket), 500);
			}, 500);
		}, 750);
	}

	private endAnimation(resolve: any, ticket: HTMLElement) {
		resolve(this);
		this.actions.end?.(this.city);
		//ticket.parentElement.removeChild(ticket);
	}

	private getTicketPosition(city: City) {
		let x = city.x;
		let y = city.y;

		return `position:absolute; left: ${x - 23 / 2}px; top: ${y - 36 / 2}px;`;
		//return `left: ${x}px; top: ${y}px;`;
	}
}
