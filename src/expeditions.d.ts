declare const define;
declare const ebg;
declare const $;
declare const dojo: Dojo;
declare const _;
declare const g_gamethemeurl;

interface Card {
	id: number;
	type: number;
	type_arg: number;
	location: string;
	location_arg: number;
}

interface TrainCar extends Card {}

interface Destination extends Card {
	to: number;
}

interface Route {
	id: number;
	from: number;
	to: number;
	spaces: RouteSpace[];
	number?: number;
	color: number;
}

interface ClaimedRoute {
	routeId: number;
	playerId: number;
	reverseDirection: boolean;
}

interface Coords {
	x: number;
	y: number;
}

interface ExpeditionsPlayer extends Player {
	playerNo: number;
	ticketsCount: number;
	destinationsCount: number;
	revealedTokensBackCount: number;
	completedDestinations: Destination[];
	sharedCompletedDestinationsCount: number;

	// for end score
	revealedTokensLeftCount: number;
	uncompletedDestinations?: Destination[];
}

/**
 * Your game interfaces
 */

interface ExpeditionsGamedatas {
	current_player_id: string;
	decision: { decision_type: string };
	game_result_neutralized: string;
	gamestate: Gamestate;
	gamestates: { [gamestateId: number]: Gamestate };
	neutralized_player_id: string;
	notifications: { last_packet_id: string; move_nbr: string };
	playerorder: (string | number)[];
	players: { [playerId: number]: ExpeditionsPlayer };
	tablespeed: string;

	// Add here variables you set up in getAllDatas
	claimedRoutes: ClaimedRoute[];
	visibleTrainCards: Destination[];
	revealedDestinationsToDo: Destination[];

	// private informations for current player only
	handTrainCars: TrainCar[];
	handDestinations: Destination[];
	completedDestinations: Destination[];

	// counters
	destinationDeckCount: number;
	destinationDeckMaxCount: number;
	lastTurn: boolean;
	bestScore: number;

	showTurnOrder: boolean;
}

interface ExpeditionsGame extends Game {
	map: TtrMap;
	animationManager: AnimationManager;
	destinationCardsManager: CardsManager;
	clickedRoute(route: Route): void;
	toDoDestinationSelectionChanged(selection: Destination[], lastChange: Destination): void;
	destinationSelectionChanged(selectedIds: number[]): void;
	setPlayerTablePosition(left: boolean): void;
	getZoom(): number;
	getCurrentPlayer(): ExpeditionsPlayer;
	setDestinationsToConnect(destinations: Destination[]): void;
	getPlayerId(): number;
	getPlayerScore(playerId: number): number;
	setActiveDestination(destination: Destination, previousDestination?: Destination): void;
	canClaimRoute(route: Route, cardsColor: number): boolean;
	setHighligthedDestination(destination: Destination | null): void;
	revealDestination(destination: Destination): void;
	showSharedDestinations(destinations: Destination[]): void;
	setSelectedDestination(destination: Destination, visible: boolean): void;
	addAnimation(animation: WagonsAnimation): void;
	endAnimation(ended: WagonsAnimation): void;
	selectedColorChanged(selectedColor: number | null): void;
	setTooltip(id: string, html: string): void;
	setTooltipToClass(className: string, html: string): void;
}

interface EnteringChooseDestinationsArgs {
	_private?: {
		destinations: Destination[];
	};
	destinations?: Destination[];
	minimum: number;
}

interface EnteringRevealDestinationArgs {
	_private?: {
		allDestinations: Destination[];
		possibleDestinations: Destination[];
	};
}

interface EnteringChooseActionArgs {
	possibleRoutes: Route[];
	canTakeTrainCarCards: boolean;
	canPass: boolean;
	canUseTicket: boolean;
	canPlaceArrow: boolean;
	remainingArrows: { [color: number]: number };
	loopToResolve: boolean;
	mainActionDone: boolean;
}

interface EnteringUseTicketArgs {
	possibleRoutes: Route[];
	unclaimableRoutes: Route[];
	remainingArrows: { [color: number]: number };
}

interface NotifPointsArgs {
	playerId: number;
	points: number;
}

interface NotifDestinationRevealedArgs {
	playerId: number;
	destination: Destination;
}

interface NotifNewSharedDestinationsOnTableArgs {
	sharedDestinations: Destination[];
}

interface NotifDestinationsPickedArgs {
	playerId: number;
	number: number;
	count: number;
	remainingDestinationsInDeck: number;
	_private: {
		[playerId: number]: {
			destinations: Destination[];
			discardedDestination: Destination;
		};
	};
}

interface NotifClaimedRouteArgs {
	playerId: number;
	route: Route;
	removeCards: TrainCar[];
	reverseDirection: boolean;
	ticketsGained: number;
	claimedRoutes: ClaimedRoute[]; //to figure if the new route should be shifted or not
}

interface NotifUnclaimedRouteArgs {
	playerId: number;
	route: Route;
	ticketsGained: number;
}

interface NotifTicketUsedArgs {
	playerId: number;
}

interface NotifDestinationCompletedArgs {
	playerId: number;
	destination: Destination;
	revealedTokenBack: number;
}

interface NotifBestScoreArgs {
	bestScore: number;
	players: ExpeditionsPlayer[];
}

interface NotifScorePointArgs {
	playerId: number;
	points: number;
}

interface NotifLongestPathArgs {
	playerId: number;
}

interface NotifBadgeArgs {
	playerId: number;
	length: number;
}
