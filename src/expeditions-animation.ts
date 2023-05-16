/**
 * Base class for animations.
 */
abstract class ExpeditionsAnimation {
	protected zoom: number;

	constructor(protected game: ExpeditionsGame) {
		this.zoom = this.game.getZoom();
	}

	public abstract animate(): Promise<ExpeditionsAnimation>;
}
