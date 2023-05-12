const DRAG_AUTO_ZOOM_DELAY = 2000;

const SIDES = ["left", "right", "top", "bottom"];
const CORNERS = ["bottom-left", "bottom-right", "top-left", "top-right"];

const MAP_WIDTH = 1744;
const MAP_HEIGHT = 1321;
const DECK_WIDTH = 250;
const PLAYER_WIDTH = 305;
const PLAYER_HEIGHT = 257; // avg height (4 destination cards)

const BOTTOM_RATIO = (MAP_WIDTH + DECK_WIDTH) / (MAP_HEIGHT + PLAYER_HEIGHT);
const LEFT_RATIO = (PLAYER_WIDTH + MAP_WIDTH + DECK_WIDTH) / MAP_HEIGHT;

/**
 * Manager for in-map zoom.
 */
class InMapZoomManager {
	private mapZoomDiv: HTMLDivElement;
	private mapDiv: HTMLDivElement;
	private pos = { dragging: false, top: 0, left: 0, x: 0, y: 0 }; // for map drag (if zoomed)
	private zoomed = false; // indicates if in-map zoom is active

	private hoveredRoute: Route;
	private autoZoomTimeout: number;
	private dragClientX: number;
	private dragClientY: number;

	constructor() {
		this.mapZoomDiv = document.getElementById("map-zoom") as HTMLDivElement;
		this.mapDiv = document.getElementById("map") as HTMLDivElement;
		// Attach the handler
		this.mapDiv.addEventListener("mousedown", (e) => this.mouseDownHandler(e));
		document.addEventListener("mousemove", (e) => this.mouseMoveHandler(e));
		document.addEventListener("mouseup", (e) => this.mouseUpHandler());
		document.getElementById("zoom-button").addEventListener("click", () => this.toggleZoom());

		this.mapDiv.addEventListener("dragover", (e) => {
			if (e.offsetX !== this.dragClientX || e.offsetY !== this.dragClientY) {
				this.dragClientX = e.offsetX;
				this.dragClientY = e.offsetY;
				this.dragOverMouseMoved(e.offsetX, e.offsetY);
			}
		});
		this.mapDiv.addEventListener("dragleave", (e) => {
			clearTimeout(this.autoZoomTimeout);
			this.autoZoomTimeout = null;
		});
		this.mapDiv.addEventListener("drop", (e) => {
			clearTimeout(this.autoZoomTimeout);
			this.autoZoomTimeout = null;
		});
	}

	private dragOverMouseMoved(clientX: number, clientY: number) {
		if (this.autoZoomTimeout) {
			clearTimeout(this.autoZoomTimeout);
		}
		this.autoZoomTimeout = setTimeout(() => {
			if (!this.hoveredRoute) {
				// do not automatically change the zoom when player is dragging over a route!
				this.toggleZoom(clientX / this.mapDiv.clientWidth, clientY / this.mapDiv.clientHeight);
			}
			this.autoZoomTimeout = null;
		}, DRAG_AUTO_ZOOM_DELAY);
	}

	/**
	 * Handle click on zoom button. Toggle between full map and in-map zoom.
	 */
	private toggleZoom(scrollRatioX: number = null, scrollRatioY: number = null) {
		this.zoomed = !this.zoomed;
		this.mapDiv.style.transform = this.zoomed ? `scale(1.8)` : "";
		dojo.toggleClass("zoom-button", "zoomed", this.zoomed);
		dojo.toggleClass("map-zoom", "scrollable", this.zoomed);

		this.mapDiv.style.cursor = this.zoomed ? "grab" : "default";

		if (this.zoomed) {
			if (scrollRatioX && scrollRatioY) {
				this.mapZoomDiv.scrollLeft = (this.mapZoomDiv.scrollWidth - this.mapZoomDiv.clientWidth) * scrollRatioX;
				this.mapZoomDiv.scrollTop =
					(this.mapZoomDiv.scrollHeight - this.mapZoomDiv.clientHeight) * scrollRatioY;
			}
		} else {
			this.mapZoomDiv.scrollTop = 0;
			this.mapZoomDiv.scrollLeft = 0;
		}
	}

	/**
	 * Handle mouse down, to grap map and scroll in it (imitate mobile touch scroll).
	 */
	private mouseDownHandler(e: MouseEvent) {
		if (!this.zoomed) {
			return;
		}
		this.mapDiv.style.cursor = "grabbing";

		this.pos = {
			dragging: true,
			left: this.mapDiv.scrollLeft,
			top: this.mapDiv.scrollTop,
			// Get the current mouse position
			x: e.clientX,
			y: e.clientY,
		};
	}

	/**
	 * Handle mouse move, to grap map and scroll in it (imitate mobile touch scroll).
	 */
	private mouseMoveHandler(e: MouseEvent) {
		if (!this.zoomed || !this.pos.dragging) {
			return;
		}

		// How far the mouse has been moved
		const dx = e.clientX - this.pos.x;
		const dy = e.clientY - this.pos.y;

		const factor = 0.1;

		// Scroll the element
		this.mapZoomDiv.scrollTop -= dy * factor;
		this.mapZoomDiv.scrollLeft -= dx * factor;
	}

	/**
	 * Handle mouse up, to grap map and scroll in it (imitate mobile touch scroll).
	 */
	private mouseUpHandler() {
		if (!this.zoomed || !this.pos.dragging) {
			return;
		}

		this.mapDiv.style.cursor = "grab";
		this.pos.dragging = false;
	}

	setHoveredRoute(route: Route | null) {
		this.hoveredRoute = route;
	}
}

/**
 * Map creation and in-map zoom handler.
 */
class TtrMap {
	private scale: number;
	private inMapZoomManager: InMapZoomManager;
	private resizedDiv: HTMLDivElement;
	private mapDiv: HTMLDivElement;

	/**
	 * Place map corner illustration and borders, cities, routes, and bind events.
	 */
	constructor(
		private game: ExpeditionsGame,
		private players: ExpeditionsPlayer[],
		claimedRoutes: ClaimedRoute[],
		revealedDestinations: Map<ExpeditionsPlayer, Destination[]>
	) {
		// map border
		dojo.place(
			`
            <div id="cities"></div>
            <div id="route-spaces"></div>
            <div id="train-cars"></div>
        `,
			"map",
			"first"
		);
		SIDES.forEach((side) => dojo.place(`<div class="side ${side}"></div>`, "map-and-borders"));
		CORNERS.forEach((corner) => dojo.place(`<div class="corner ${corner}"></div>`, "map-and-borders"));

		CITIES.forEach((city) =>
			dojo.place(
				`<div id="city${city.id}" class="city" 
                style="transform: translate(${city.x}px, ${city.y}px)"
                title="${this.getLocationName(city.id)}"
            ></div>`,
				"cities"
			)
		);

		this.createRouteSpaces();
		this.showRevealedDestinations(revealedDestinations);
		this.setClaimedRoutes(claimedRoutes, null);

		this.resizedDiv = document.getElementById("resized") as HTMLDivElement;
		this.mapDiv = document.getElementById("map") as HTMLDivElement;

		this.inMapZoomManager = new InMapZoomManager();
	}

	public getAllRoutes(): Route[] {
		return ROUTES;
	}

	private getRoute(routeId: number): Route {
		return ROUTES[routeId];
	}

	private isCityOnMapEdge(city: City): boolean {
		return this.getCitiesOnMapEdge().indexOf(city.id) != -1;
	}

	private getCitiesOnMapEdge(): number[] {
		return [181, 182, 183];
	}

	private getXCoord(city: City, route: Route): number {
		if (this.isCityOnMapEdge(city)) {
			return this.getEdgeFromRoute(city, route) == "left" ? 0 : 1742; //right edge position
		} else {
			return city.x;
		}
	}

	private getEdgeFromRoute(redEdgecity: City, route: Route): "left" | "right" {
		let cityConnectedToRedPoint = route.from == redEdgecity.id ? route.to : route.from;
		const citiesOnTheLeft = [101, 105, 108, 111, 124, 126, 202]; //list of cites connected to edges on the left
		return citiesOnTheLeft.indexOf(cityConnectedToRedPoint) != -1 ? "left" : "right";
	}

	private getClaimedArrowBackgroundClass(route: Route, claimed: ClaimedRoute) {
		const origin = CITIES.find((city) => city.id == this.game.getRouteOrigin(route, claimed));
		const destination = CITIES.find((city) => city.id == this.game.getRouteDestination(route, claimed));
		const originX = this.getXCoord(origin, route);
		const destinationX = this.getXCoord(destination, route);
		let reverse = destinationX < originX;
		//let reverse = Math.abs(destinationX - originX) > 5 ? destinationX < originX : destination.y < origin.y;
		/*console.log(
			"reversedArrow ?",
			reverse,
			":",
			route.id,
			"destX - originX) > 5",
			Math.abs(destinationX - originX) > 5,
			"destinationX < originX",
			destinationX < originX,
			"destination.y < origin.y",
			destination.y < origin.y,
			"destinationX",
			destinationX,
			"originX",
			originX,
			"destination.x",
			destination.x,
			"dest",
			destination,
			"originYX",
			origin.y,
			"destination.y",
			destination.y
		);*/

		return `arrow${this.getArrowSize(route)}${reverse ? "R" : "N"}${getColor(route.color, false)
			.charAt(0)
			.toUpperCase()}`;
	}

	private getColorShift(route: Route, baseShift: number, shortRoutesShift: number) {
		switch (route.color) {
			case BLUE:
				return this.isShortRoute(route) ? -shortRoutesShift : -baseShift;
			case RED:
				return this.isShortRoute(route) ? shortRoutesShift : baseShift;
			case YELLOW:
				return 0;
		}
	}

	private isShortRoute(route: Route) {
		const angle = route.spaces[0].angle;
		//console.log("isShortRoute", route.id, angle > 35 && angle < 65);
		return angle >= 35 && angle < 65;
		//return false;
	}
	private createRouteSpaces() {
		const destination = "route-spaces";
		this.getAllRoutes().forEach((route) =>
			route.spaces.forEach((space, spaceIndex) => {
				const coords = this.getShiftedCoords(route, this.getColorShift(route, 20, 30));
				dojo.place(
					`<div id="${destination}-route${route.id}-space${spaceIndex}" class="route-space" 
                    style="transform-origin:left center; transform: translate(${coords.x}px, ${coords.y}px) rotate(${
						space.angle
					}deg); width:${space.length}px"
                    title="${dojo.string.substitute(_("${from} to ${to}"), {
						from: this.getLocationName(route.from),
						to: this.getLocationName(route.to),
					})}, ${getColor(route.color)}"
                    data-route="${route.id}" data-color="${route.color}"
                ></div>`,
					destination
				);
				const spaceDiv = document.getElementById(`${destination}-route${route.id}-space${spaceIndex}`);
				this.setSpaceClickEvents(spaceDiv, route);
			})
		);
	}

	private getArrowSize(route: Route): String {
		let size = "U";
		route.spaces.forEach((space) => {
			let length = space.length;
			if (length <= 60) {
				size = "S";
			}
			if (length <= 95) {
				size = "M";
			}
			size = "L";
		});
		return size;
	}

	/**
	 * Bind click events to route space.
	 */
	private setSpaceClickEvents(spaceDiv: HTMLElement, route: Route) {
		spaceDiv.addEventListener("click", () => this.game.clickedRoute(route));
	}

	/**
	 * Highlight selectable route spaces.
	 */
	public setSelectableRoutes(selectable: boolean, possibleRoutes: Route[]) {
		dojo.query(".route-space").removeClass("selectable");

		if (selectable) {
			possibleRoutes.forEach((route) =>
				this.getAllRoutes()
					.find((r) => r.id == route.id)
					.spaces.forEach((_, index) =>
						document
							.getElementById(`route-spaces-route${route.id}-space${index}`)
							?.classList.add("selectable")
					)
			);
		}
	}

	/**
	 * Highlight removable route wagons.
	 */
	public setRemovableRoutes(removable: boolean, routes: Route[]) {
		dojo.query(".route-space").removeClass("removable");
		if (removable) {
			routes.forEach((route) => {
				this.getAllRoutes()
					.find((r) => r.id == route.id)
					.spaces.forEach((_, index) => {
						let space = document.getElementById(`route-spaces-route${route.id}-space${index}`);
						if (space) {
							space.classList.add("removable");
							this.createRemoveArrowHandle(route);
						}
					});
			});
		}
	}

	public createRemoveArrowHandle(route: Route): void {
		const index = 0;
		let space = document.getElementById(`route-spaces-route${route.id}-space${index}`);
		let id = `remove-arrow-handle-${route.id}`;
		dojo.place(
			`
            <div id=${id} class="remove-arrow-handle" transform="translate(-50%, -50%)">&#10060;</div>
            `,
			space.id
		);
		$(id).addEventListener("click", () => this.game.clickedRemovableRoute(route));
	}

	/**
	 * Place train cars on claimed routes.
	 * fromPlayerId is for animation (null for no animation)
	 */
	public setClaimedRoutes(claimedRoutes: ClaimedRoute[], fromPlayerId: number) {
		claimedRoutes.forEach((claimedRoute) => {
			const route = this.getAllRoutes().find((r) => r.id == claimedRoute.routeId);
			this.claimRoute(claimedRoute, route);
			this.shiftArrowIfNeeded(route, claimedRoutes);
		});
	}

	private claimRoute(claimedRoute, route) {
		const routeDiv = document.getElementById(`route-spaces-route${route.id}-space${0}`);
		routeDiv.classList.add(this.getClaimedArrowBackgroundClass(route, claimedRoute));
		routeDiv.dataset.revert = claimedRoute.reverseDirection.toString();
	}
	/**
	 * Add a new claimed route to the existing ones. Shift arrow if needed.
	 */
	public addClaimedRoute(claimedRoute: ClaimedRoute, claimedRoutes: ClaimedRoute[]) {
		const route = this.getAllRoutes().find((r) => r.id == claimedRoute.routeId);
		this.claimRoute(claimedRoute, route);
		this.shiftArrowIfNeeded(route, claimedRoutes);
	}

	/**
	 * Removes the arrow from a route.
	 * @param route
	 */
	public unclaimRoute(route: Route) {
		const routeDiv = document.getElementById(`route-spaces-route${route.id}-space${0}`);
		dojo.removeClass(`route-spaces-route${route.id}-space${0}`, ARROW_CLASSES_PERMUTATIONS.join(" "));
	}

	private animateWagonFromCounter(playerId: number, wagonId: string, toX: number, toY: number) {
		const wagon = document.getElementById(wagonId);
		const wagonBR = wagon.getBoundingClientRect();

		const fromBR = document
			.getElementById(`revealed-tokens-back-counter-${playerId}-wrapper`)
			.getBoundingClientRect();

		const zoom = this.game.getZoom();
		const fromX = (fromBR.x - wagonBR.x) / zoom;
		const fromY = (fromBR.y - wagonBR.y) / zoom;

		wagon.style.transform = `translate(${fromX + toX}px, ${fromY + toY}px)`;
		setTimeout(() => {
			wagon.style.transition = "transform 0.5s";
			wagon.style.transform = `translate(${toX}px, ${toY}px`;
		}, 0);
	}

	private shiftArrowIfNeeded(route: Route, allClaimedRoutes: ClaimedRoute[]): void {
		if (route.color === YELLOW) {
			return;
		}
		const shift: number = route.color === BLUE ? 15 : -15;
		this.shiftArrow(route, -shift);
	}

	private getShiftedCoords(route: Route, shift: number): Coords {
		const space = route.spaces[0];
		let angle = -space.angle;
		//console.log("*******angle", angle);
		while (angle < 0) {
			angle += 180;
			//console.log("angle", angle);
		}
		while (angle >= 180) {
			angle -= 180;
			//console.log("angle", angle);
		}
		let x = space.x;
		let y = space.y;

		//console.log("shift amount", shift, "angle", angle);

		//console.log("x", Math.round(shift * Math.abs(Math.sin((angle * Math.PI) / 180))));
		//console.log("y", Math.round(shift * Math.abs(Math.cos((angle * Math.PI) / 180))));

		let shiftX = shift;
		if (this.isShortRoute(route)) {
			shiftX = shiftX * 1.5;
		}

		// we shift a little the train car to let the other route visible
		x += Math.round(shiftX * Math.abs(Math.sin((angle * Math.PI) / 180)));
		y += Math.round(shiftX * Math.abs(Math.cos((angle * Math.PI) / 180)));

		/*
		any horizontal shift with a 0° rotation becomes a 0
		a 10 horizontal shift with a 45° rotation becomes a 7
		a 20 horizontal shift with a 45° rotation becomes a 14
		a 30 horizontal shift with a 45° rotation becomes a 21
		a 10 horizontal shift with a 90° rotation becomes a 10
		a 20 horizontal shift with a 90° rotation becomes a 20
		a 30 horizontal shift with a 90° rotation becomes a 30
		*/
		//console.log("route", route.id, "color", route.color, "x", space.x, "y", space.y, "=>x", x, "y", y);

		return { x: x, y: y };
	}

	/**
	 * Shifts given arrow if it has not been shifted before.
	 */
	private shiftArrow(route: Route, shift: number) {
		const routeDiv = document.getElementById(`route-spaces-route${route.id}-space${0}`);

		const space = route.spaces[0];
		let angle = -space.angle;
		while (angle < 0) {
			angle += 180;
		}
		while (angle >= 180) {
			angle -= 180;
		}
		let x = space.x;
		let y = space.y;

		// we shift a little the train car to let the other route visible
		x += Math.round(shift * Math.abs(Math.sin((angle * Math.PI) / 180)));
		y += Math.round(shift * Math.abs(Math.cos((angle * Math.PI) / 180)));

		let oldTransform = routeDiv.style.transform;
		let newTransform = oldTransform.replace(new RegExp(`translate\(.*px, .*px\)`), `translate(${x}px, ${y}px`);
		routeDiv.style.transform = newTransform;
	}
	/**
	 * Place train car on a route space.
	 * fromPlayerId is for animation (null for no animation)
	 * Phantom is for dragging over a route : wagons are showns translucent.
	 */
	private setWagon(
		route: Route,
		space: RouteSpace,
		spaceIndex: number,
		player: ExpeditionsPlayer,
		fromPlayerId: number,
		phantom: boolean,
		isLowestFromDoubleHorizontalRoute: boolean
	) {
		const id = `wagon-route${route.id}-space${spaceIndex}${phantom ? "-phantom" : ""}`;
		if (document.getElementById(id)) {
			return;
		}

		let angle = -space.angle;
		while (angle < 0) {
			angle += 180;
		}
		while (angle >= 180) {
			angle -= 180;
		}
		let x = space.x;
		let y = space.y;
		const EASE_WEIGHT = 0.75;
		const angleOnOne =
			(Math.acos((-2 * angle) / 180 + 1) / Math.PI) * EASE_WEIGHT + (angle / 180) * (1 - EASE_WEIGHT);
		const angleClassNumber = Math.round(angleOnOne * 36);

		const alreadyPlacedWagons = Array.from(document.querySelectorAll(".wagon")) as HTMLDivElement[];
		const xy = x + y;

		if (isLowestFromDoubleHorizontalRoute) {
			// we shift a little the train car to let the other route visible
			x += 10 * Math.abs(Math.sin((angle * Math.PI) / 180));
			y += 10 * Math.abs(Math.cos((angle * Math.PI) / 180));
		}
		const wagonHtml = `<div id="${id}" class="wagon angle${angleClassNumber} ${phantom ? "phantom" : ""} ${
			space.top ? "top" : ""
		}" data-player-color="${route.color}" data-color-blind-player-no="${
			player.playerNo
		}" data-xy="${xy}" style="transform: translate(${x}px, ${y}px)"></div>`;
		// we consider a wagon must be more visible than another if its X + Y is > as the other
		if (!alreadyPlacedWagons.length) {
			dojo.place(wagonHtml, "train-cars");
		} else {
			let placed = false;
			for (let i = 0; i < alreadyPlacedWagons.length; i++) {
				if (Number(alreadyPlacedWagons[i].dataset.xy) > xy) {
					dojo.place(wagonHtml, alreadyPlacedWagons[i].id, "before");
					placed = true;
					break;
				}
			}

			if (!placed) {
				dojo.place(wagonHtml, "train-cars");
			}
		}

		if (fromPlayerId) {
			this.animateWagonFromCounter(fromPlayerId, id, x, y);
		}
	}

	/**
	 * Place train cars on a route.
	 * fromPlayerId is for animation (null for no animation)
	 * Phantom is for dragging over a route : wagons are showns translucent.
	 */
	/*private setWagons(route: Route, player: ExpeditionsPlayer, fromPlayerId: number, phantom: boolean) {
		if (!phantom) {
			route.spaces.forEach((space, spaceIndex) => {
				const spaceDiv = document.getElementById(`route-spaces-route${route.id}-space${spaceIndex}`);
				//spaceDiv?.parentElement.removeChild(spaceDiv);
			});
		}

		const isLowestFromDoubleHorizontalRoute = this.isLowestFromDoubleHorizontalRoute(route);

		if (fromPlayerId) {
			route.spaces.forEach((space, spaceIndex) => {
				setTimeout(() => {
					this.setWagon(
						route,
						space,
						spaceIndex,
						player,
						fromPlayerId,
						phantom,
						isLowestFromDoubleHorizontalRoute
					);
					playSound(`ttr-placed-train-car`);
				}, 200 * spaceIndex);
			});
			(this.game as any).disableNextMoveSound();
		} else {
			route.spaces.forEach((space, spaceIndex) =>
				this.setWagon(
					route,
					space,
					spaceIndex,
					player,
					fromPlayerId,
					phantom,
					isLowestFromDoubleHorizontalRoute
				)
			);
		}
	}*/

	/**
	 * Check if the route is mostly horizontal, and the lowest from a double route
	 */
	private isLowestFromDoubleHorizontalRoute(route: Route) {
		const otherRoute = this.getAllRoutes().find(
			(r) => route.from == r.from && route.to == r.to && route.id != r.id
		);
		if (!otherRoute) {
			// not a double route
			return false;
		}

		const routeAvgX = route.spaces.map((space) => space.x).reduce((a, b) => a + b, 0);
		const routeAvgY = route.spaces.map((space) => space.y).reduce((a, b) => a + b, 0);
		const otherRouteAvgX = otherRoute.spaces.map((space) => space.x).reduce((a, b) => a + b, 0);
		const otherRouteAvgY = otherRoute.spaces.map((space) => space.y).reduce((a, b) => a + b, 0);

		if (Math.abs(routeAvgX - otherRouteAvgX) > Math.abs(routeAvgY - otherRouteAvgY)) {
			// not mostly horizontal
			return false;
		}

		if (routeAvgY <= otherRouteAvgY) {
			// not the lowest one
			return false;
		}

		return true;
	}

	/**
	 * Set map size, depending on available screen size.
	 * Player table will be placed left or bottom, depending on window ratio.
	 */
	public setAutoZoom() {
		if (!this.mapDiv.clientWidth) {
			setTimeout(() => this.setAutoZoom(), 200);
			return;
		}

		const screenRatio = document.getElementById("game_play_area").clientWidth / (window.innerHeight - 80);
		const leftDistance = Math.abs(LEFT_RATIO - screenRatio);
		const bottomDistance = Math.abs(BOTTOM_RATIO - screenRatio);
		const left = leftDistance < bottomDistance || (this.game as any).isSpectator;
		this.game.setPlayerTablePosition(left);

		const gameWidth = (left ? PLAYER_WIDTH : 0) + MAP_WIDTH + DECK_WIDTH;
		const gameHeight = MAP_HEIGHT + (left ? 0 : PLAYER_HEIGHT * 0.75);

		const horizontalScale = document.getElementById("game_play_area").clientWidth / gameWidth;
		const verticalScale = (window.innerHeight - 80) / gameHeight;
		this.scale = Math.min(1, horizontalScale, verticalScale);

		this.resizedDiv.style.transform = this.scale === 1 ? "" : `scale(${this.scale})`;
		this.resizedDiv.style.marginBottom = `-${(1 - this.scale) * gameHeight}px`;
	}

	/**
	 * Get current zoom.
	 */
	public getZoom(): number {
		return this.scale;
	}

	/**
	 * Highlight active destination.
	 */
	public setActiveDestination(destination: Destination, previousDestination: Destination = null) {
		if (previousDestination) {
			if (previousDestination.id === destination.id) {
				return;
			}

			[previousDestination.to].forEach(
				(city) => (document.getElementById(`city${city}`).dataset.selectedDestination = "false")
			);
		}

		if (destination) {
			[destination.to].forEach(
				(city) => (document.getElementById(`city${city}`).dataset.selectedDestination = "true")
			);
		}
	}

	/**
	 * Highlight hovered route (when dragging train cars).
	 */
	/*public setHoveredRoute(route: Route | null, valid: boolean | null = null) {
		this.inMapZoomManager.setHoveredRoute(route);

		if (route) {
			[route.from, route.to].forEach((city) => {
				const cityDiv = document.getElementById(`city${city}`);
				cityDiv.dataset.hovered = "true";
				cityDiv.dataset.valid = valid.toString();
			});

			if (valid) {
				this.setWagons(route, this.game.getCurrentPlayer(), null, true);
			}
		} else {
			this.getAllRoutes().forEach((r) =>
				[r.from, r.to].forEach((city) => (document.getElementById(`city${city}`).dataset.hovered = "false"))
			);

			// remove phantom wagons
			this.mapDiv
				.querySelectorAll(".wagon.phantom")
				.forEach((spaceDiv) => spaceDiv.parentElement.removeChild(spaceDiv));
		}
	}*/

	/**
	 * Highlight cities of selectable destination.
	 */
	public setSelectableDestination(destination: Destination, visible: boolean): void {
		[destination.to].forEach((city) => {
			//console.log("search ", `city${city}`);

			document.getElementById(`city${city}`).dataset.selectable = "" + visible;
		});
	}

	/**
	 * Sets a destination as toConnect and selectable.
	 */
	public showNewDestination(destination: Destination, visible: boolean = true) {
		const div = document.getElementById(`city${destination.to}`);
		div.dataset.selectable = visible.toString();
		div.dataset.toConnect = visible.toString();
	}

	/**
	 * Highlight cities of selected destination.
	 */
	public setSelectedDestination(destination: Destination, visible: boolean): void {
		[destination.to].forEach((city) => {
			document.getElementById(`city${city}`).dataset.selected = "" + visible;
		});
	}

	/**
	 * Highlight cities player must reach for its objectives.
	 */
	public setDestinationsToConnect(destinations: Destination[]): void {
		this.mapDiv
			.querySelectorAll(`.city[data-to-connect]:not([data-revealed-by])`)
			.forEach((city: HTMLElement) => (city.dataset.toConnect = "false"));
		const cities = [];
		destinations.forEach((destination) => cities.push(destination.to));
		cities.forEach((city) => (document.getElementById(`city${city}`).dataset.toConnect = "true"));
	}

	/**
	 * Highlight destination (on destination mouse over).
	 */
	public setHighligthedDestination(destination: Destination | null): void {
		const visible = Boolean(destination).toString();
		const shadow = document.getElementById("map-destination-highlight-shadow");
		shadow.dataset.visible = visible;

		let cities: (string | number)[];
		if (destination) {
			shadow.dataset.to = "" + destination.to;
			cities = [destination.to];
		} else {
			cities = [shadow.dataset.to];
		}
		cities.forEach((city) => (document.getElementById(`city${city}`).dataset.highlight = visible));
	}

	/**
	 * Sets a player token next to the destination.
	 */
	public revealDestination(player: ExpeditionsPlayer, destination: Destination, temporary: boolean = false) {
		//remove old temporary ones
		dojo.query("[data-temporary=true]").forEach((div) => {
			div.removeAttribute("data-revealed-by");
			div.removeAttribute("data-temporary");
		});

		if (destination) {
			const div = document.getElementById(`city${destination.to}`);
			if (div.dataset.revealedBy) {
				//destination unselected
				div.removeAttribute("data-revealed-by");
				div.removeAttribute("data-temporary");
			} else {
				//destination selected
				div.dataset.revealedBy = player.color;
				div.dataset.temporary = temporary.toString();
			}
		}
	}

	/**
	 * Sets a marker on all revealed destinations to indicate to which player the destination belongs.
	 */
	public showRevealedDestinations(destinationsByPlayer: Map<ExpeditionsPlayer, Destination[]>) {
		destinationsByPlayer.forEach(function (destinations, player) {
			destinations.forEach((d) => {
				document.getElementById(`city${d.to}`).dataset.revealedBy = player.color;
				document.getElementById(`city${d.to}`).dataset.toConnect = "true";
			});
		});
	}

	/**
	 * Removes player ownership marker.
	 */
	public removeRevealedDestination(dest: Destination) {
		let div = document.getElementById(`city${dest.to}`);
		div.removeAttribute("data-revealed-by");
		div.dataset.toConnect = "false";
		div.dataset.selectable = "false";
	}

	/**
	 * Sets a marker to indicate that the destination is shared.
	 */
	public showSharedDestinations(destinations: Destination[]) {
		destinations.forEach((d) => {
			document.getElementById(`city${d.to}`).dataset.revealedBy = "shared";
			document.getElementById(`city${d.to}`).dataset.toConnect = "true";
		});
	}

	/**
	 * Locations are not only green cities, but also blue and red points.
	 */
	public getLocationColor(cityId: number): number {
		let color = 0;
		if (cityId >= 100 && cityId <= 180) {
			color = GREEN;
		} else if (cityId >= 181 && cityId <= 201) {
			color = RED;
		} else if (cityId >= 182 && cityId <= 221) {
			color = BLUE;
		}
		return color;
	}

	public getLocationName(cityId: number) {
		let color = this.getLocationColor(cityId);
		switch (color) {
			case RED:
				return _("red point");
			case BLUE:
				return _("blue point");
			case GREEN:
				return CITIES_NAMES[cityId - 100];
		}
	}
}
