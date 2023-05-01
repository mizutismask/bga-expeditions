
/**
 * Animation with highlighted wagons.
 */ 
abstract class WagonsAnimation {
    protected wagons: Element[] = [];
    protected zoom: number;

    constructor(
        protected game: ExpeditionsGame,
    ) {
        this.zoom = this.game.getZoom();
    }

    public abstract animate(): Promise<WagonsAnimation>;
}
