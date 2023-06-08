type CityAnimationCallback = (city: City) => void;
const TICKET_WIDTH = 50;
const TICKET_HEIGHT = 29;

const REPLAY_WIDTH = 40;
const REPLAY_HEIGHT = 40;
/**
 * City animation : an element (for exemple, a ticket or play again symbol…) appears growing over the city and then disappears (css).//checkmark:&#x2705;
 */
class CityAnimation extends ExpeditionsAnimation {
	constructor(
		game: ExpeditionsGame,
		private city: City,
		private actions: {
			start?: CityAnimationCallback;
			change?: CityAnimationCallback;
			end?: CityAnimationCallback;
		},
		private copyAnchor: string,
		private elementType: string,
		private classes: string[],
		private elementWidth: number,
		private elementHeight: number
	) {
		super(game);
	}

	public animate(): Promise<ExpeditionsAnimation> {
		return new Promise((resolve) => {
			dojo.place(
				`
            <div id="animated-${this.elementType}-${this.city.id}" class="${this.classes.join(
					" "
				)}" style="${this.getElementPosition(this.city)}"></div>
            `,
				this.copyAnchor
			);
			const element = document.getElementById(`animated-${this.elementType}-${this.city.id}`);
			setTimeout(() => this.endAnimation(resolve, element), 2000); //animation duration
		});
	}

	private endAnimation(resolve: any, ticket: HTMLElement) {
		resolve(this);
		this.game.endAnimation(this);
		this.actions.end?.(this.city);
		ticket.parentElement.removeChild(ticket);
	}

	private getElementPosition(city: City) {
		let x = city.x;
		let y = city.y;
		return `left: ${x - this.elementWidth / 2}px; top: ${y - this.elementHeight / 2}px;`;
	}
}

/**
 * Gained ticket animation.
 */
class TicketAnimation extends CityAnimation {
	constructor(
		game: ExpeditionsGame,
		city: City,
		actions: {
			start?: CityAnimationCallback;
			change?: CityAnimationCallback;
			end?: CityAnimationCallback;
		},
		copyAnchor: string
	) {
		super(
			game,
			city,
			actions,
			copyAnchor,
			"ticket",
			["expTicket", "animated-element"],
			TICKET_WIDTH,
			TICKET_HEIGHT
		);
	}
}

/**
 * Blue point reached animation.
 */
class ReplayAnimation extends CityAnimation {
	constructor(
		game: ExpeditionsGame,
		city: City,
		actions: {
			start?: CityAnimationCallback;
			change?: CityAnimationCallback;
			end?: CityAnimationCallback;
		},
		copyAnchor: string
	) {
		super(game, city, actions, copyAnchor, "replay", ["replay", "animated-element", "fa", "fa-refresh", "fa-2x"], REPLAY_WIDTH, REPLAY_HEIGHT);
	}
}