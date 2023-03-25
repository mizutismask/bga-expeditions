const CROSSHAIR_SIZE = 20;

/** 
 * Colored arrows.
 */ 
class Arrow {
    private route: Route | null = null;
    private color: number;

    constructor(
        private game: ExpeditionsGame, 
        color: number,) {

    }
}