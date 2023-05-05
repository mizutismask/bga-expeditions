type TicketAnimationCallback = (city: City) => void;

const TICKET_WIDTH = 50;
const TICKET_HEIGHT = 29;
/**
 * Destination animation : ticket appears growing over the city and disappears (css).
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
		private copyAnchor: string
	) {
		super(game);
		this.copyAnchor = copyAnchor;
	}

	public animate(): Promise<ExpeditionsAnimation> {
		return new Promise((resolve) => {
			dojo.place(
				`
            <div id="animated-ticket-${this.city.id}" class="expTicket animated-ticket" style="${this.getTicketPosition(this.city)}"></div>
            `,
				this.copyAnchor
			);
			const ticket = document.getElementById(`animated-ticket-${this.city.id}`);
			setTimeout(() => this.endAnimation(resolve, ticket), 2000); //ticketAnimation duration
		});
	}

	private endAnimation(resolve: any, ticket: HTMLElement) {
		resolve(this);
		this.actions.end?.(this.city);
		ticket.parentElement.removeChild(ticket);
	}

	private getTicketPosition(city: City) {
		let x = city.x;
		let y = city.y;
		return `left: ${x - TICKET_WIDTH / 2}px; top: ${y - TICKET_HEIGHT / 2}px;`;
	}
}
