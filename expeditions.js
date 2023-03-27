/**
 * Animation to move a card to a player's counter (the destroy animated card).
 */
function animateCardToCounterAndDestroy(game, cardOrCardId, destinationId) {
    var card = typeof (cardOrCardId) === 'string' ? document.getElementById(cardOrCardId) : cardOrCardId;
    card.classList.add('animated', 'transform-origin-top-left');
    var cardBR = card.getBoundingClientRect();
    var toBR = document.getElementById(destinationId).getBoundingClientRect();
    var zoom = game.getZoom();
    var x = (toBR.x - cardBR.x) / zoom;
    var y = (toBR.y - cardBR.y) / zoom;
    card.style.transform = "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(0.15 / zoom, ")");
    setTimeout(function () { var _a; return (_a = card.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(card); }, 500);
}
var CARD_WIDTH = 150;
var CARD_HEIGHT = 209;
var DESTINATION_CARD_SHIFT = 32;
function setupTrainCarCards(stock) {
    var trainCarsUrl = "".concat(g_gamethemeurl, "img/train-cards.jpg");
    for (var type = 0; type <= 8; type++) {
        stock.addItemType(type, type, trainCarsUrl, type);
    }
}
function setupDestinationCards(stock) {
    var destinationsUrl = "".concat(g_gamethemeurl, "img/destinations.jpg");
    for (var id = 1; id <= 80; id++) {
        stock.addItemType(100 + id, 100 + id, destinationsUrl, id - 1);
    }
}
var BLUE = 1;
var YELLOW = 2;
var RED = 3;
function getColor(color, type) {
    switch (color) {
        case 1:
            return _("Blue");
        case 2:
            return _("Yellow");
        case 3:
            return _("Red");
    }
}
function setupTrainCarCardDiv(cardDiv, cardTypeId) {
    cardDiv.title = getColor(Number(cardTypeId), "train-car");
}
var DestinationCard = /** @class */ (function () {
    function DestinationCard(id, to) {
        this.id = id;
        this.to = to;
    }
    return DestinationCard;
}());
var CITIES_NAMES = [
    "Starting point",
    "Denali",
    "Mackenzie Delta",
    "Northwest Passage",
    "Banff",
    "Crater Lake",
    "Old Faithful",
    "Puerto Rico",
    "Grand Canyon",
    "Niagara Falls",
    "Louisiana",
    "Teotihuacan",
    "Tikal",
    "Newfoundland",
    "Greenland",
    "Angel Falls",
    "Marajó",
    "Amazon Rainforest",
    "Machu Picchu",
    "Aripuanã",
    "Salvador de Bahia",
    "Altiplano",
    "Iguazú Falls",
    "Atacama",
    "Galápagos Islands",
    "Pacific Ocean",
    "Rapa Nui",
    "Tierra del Fuego",
    "Graham Land",
    "Svalbard",
    "Thingvellir",
    "Stonehenge",
    "Rome",
    "Athens",
    "Timgad",
    "Canary Islands",
    "Sahara",
    "Gizeh",
    "Timbuktu",
    "Kush",
    "Aksum",
    "Elmina",
    "Douala",
    "Virunga",
    "Victoria Falls",
    "Omatako",
    "Atlantic Ocean",
    "Madagascar",
    "Indian Ocean",
    "Petra",
    "Babylon",
    "Persepolis",
    "Sanaa",
    "Caspian Sea",
    "Zagorsk",
    "Putorana Plateau",
    "Novosibirsk",
    "Harappa",
    "Sakha",
    "Lake Baikal",
    "Great Wall",
    "Mount Everest",
    "Taj Mahal",
    "Sigiriya",
    "Bagan",
    "Angkor Wat",
    "Xi’an",
    "Amur River",
    "Kolyma",
    "Bering Strait",
    "Mont Fuji",
    "Borobudur",
    "Sulawesi",
    "Papua",
    "Arnhem Land",
    "Bungle Bungle Range",
    "Great Barrier Reef",
    "Uluru",
    "Perth",
    "Tasmania",
    "Fiordland National Park",
];
var DESTINATIONS = [
    new DestinationCard(100, 100),
    new DestinationCard(101, 101),
    new DestinationCard(102, 102),
    new DestinationCard(103, 103),
    new DestinationCard(104, 104),
    new DestinationCard(105, 105),
    new DestinationCard(106, 106),
    new DestinationCard(107, 107),
    new DestinationCard(108, 108),
    new DestinationCard(109, 109),
    new DestinationCard(110, 110),
    new DestinationCard(111, 111),
    new DestinationCard(112, 112),
    new DestinationCard(113, 113),
    new DestinationCard(114, 114),
    new DestinationCard(115, 115),
    new DestinationCard(116, 116),
    new DestinationCard(117, 117),
    new DestinationCard(118, 118),
    new DestinationCard(119, 119),
    new DestinationCard(120, 120),
    new DestinationCard(121, 121),
    new DestinationCard(122, 122),
    new DestinationCard(123, 123),
    new DestinationCard(124, 124),
    new DestinationCard(125, 125),
    new DestinationCard(126, 126),
    new DestinationCard(127, 127),
    new DestinationCard(128, 128),
    new DestinationCard(129, 129),
    new DestinationCard(130, 130),
    new DestinationCard(131, 131),
    new DestinationCard(132, 132),
    new DestinationCard(133, 133),
    new DestinationCard(134, 134),
    new DestinationCard(135, 135),
    new DestinationCard(136, 136),
    new DestinationCard(137, 137),
    new DestinationCard(138, 138),
    new DestinationCard(139, 139),
    new DestinationCard(140, 140),
    new DestinationCard(141, 141),
    new DestinationCard(142, 142),
    new DestinationCard(143, 143),
    new DestinationCard(144, 144),
    new DestinationCard(145, 145),
    new DestinationCard(146, 146),
    new DestinationCard(147, 147),
    new DestinationCard(148, 148),
    new DestinationCard(149, 149),
    new DestinationCard(150, 150),
    new DestinationCard(151, 151),
    new DestinationCard(152, 152),
    new DestinationCard(153, 153),
    new DestinationCard(154, 154),
    new DestinationCard(155, 155),
    new DestinationCard(156, 156),
    new DestinationCard(157, 157),
    new DestinationCard(158, 158),
    new DestinationCard(159, 159),
    new DestinationCard(160, 160),
    new DestinationCard(161, 161),
    new DestinationCard(162, 162),
    new DestinationCard(163, 163),
    new DestinationCard(164, 164),
    new DestinationCard(165, 165),
    new DestinationCard(166, 166),
    new DestinationCard(167, 167),
    new DestinationCard(168, 168),
    new DestinationCard(169, 169),
    new DestinationCard(170, 170),
    new DestinationCard(171, 171),
    new DestinationCard(172, 172),
    new DestinationCard(173, 173),
    new DestinationCard(174, 174),
    new DestinationCard(175, 175),
    new DestinationCard(176, 176),
    new DestinationCard(177, 177),
    new DestinationCard(178, 178),
    new DestinationCard(179, 179),
    new DestinationCard(180, 180),
];
function setupDestinationCardDiv(cardDiv, cardUniqueId) {
    var destination = DESTINATIONS.find(function (d) { return d.id == cardUniqueId; });
    //console.log("setupDestinationCardDiv", cardDiv, cardUniqueId, destination);
    cardDiv.title = "".concat(dojo.string.substitute(_("${to}"), {
        to: getCityName(destination.to),
    }));
}
function getCityName(cityId) {
    return CITIES_NAMES[cityId - 100];
}
function getBackgroundInlineStyleForDestination(destination) {
    var file;
    switch (destination.type) {
        case 1:
            file = "destinations.jpg";
            break;
    }
    var imagePosition = destination.type_arg - 1;
    var row = Math.floor(imagePosition / IMAGE_ITEMS_PER_ROW);
    var xBackgroundPercent = (imagePosition - row * IMAGE_ITEMS_PER_ROW) * 100;
    var yBackgroundPercent = row * 100;
    return "background-image: url('".concat(g_gamethemeurl, "img/").concat(file, "'); background-position: -").concat(xBackgroundPercent, "% -").concat(yBackgroundPercent, "%;");
}
/**
 * Animation with highlighted wagons.
 */
var WagonsAnimation = /** @class */ (function () {
    function WagonsAnimation(game, destinationRoutes) {
        var _this = this;
        this.game = game;
        this.wagons = [];
        this.zoom = this.game.getZoom();
        this.shadowDiv = document.getElementById('map-destination-highlight-shadow');
        destinationRoutes === null || destinationRoutes === void 0 ? void 0 : destinationRoutes.forEach(function (route) {
            var _a;
            return (_a = _this.wagons).push.apply(_a, Array.from(document.querySelectorAll("[id^=\"wagon-route".concat(route.id, "-space\"]"))));
        });
    }
    WagonsAnimation.prototype.setWagonsVisibility = function (visible) {
        this.shadowDiv.dataset.visible = visible ? 'true' : 'false';
        this.wagons.forEach(function (wagon) { return wagon.classList.toggle('highlight', visible); });
    };
    return WagonsAnimation;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Destination animation : destination slides over the map, wagons used by destination are highlighted, destination is mark "done" or "uncomplete", and card slides back to original place.
 */
var DestinationCompleteAnimation = /** @class */ (function (_super) {
    __extends(DestinationCompleteAnimation, _super);
    function DestinationCompleteAnimation(game, destination, destinationRoutes, fromId, toId, actions, state, initialSize) {
        if (initialSize === void 0) { initialSize = 1; }
        var _this = _super.call(this, game, destinationRoutes) || this;
        _this.destination = destination;
        _this.fromId = fromId;
        _this.toId = toId;
        _this.actions = actions;
        _this.state = state;
        _this.initialSize = initialSize;
        return _this;
    }
    DestinationCompleteAnimation.prototype.animate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b;
            var fromBR = document.getElementById(_this.fromId).getBoundingClientRect();
            dojo.place("\n            <div id=\"animated-destination-card-".concat(_this.destination.id, "\" class=\"destination-card\" style=\"").concat(_this.getCardPosition(_this.destination)).concat(getBackgroundInlineStyleForDestination(_this.destination), "\"></div>\n            "), 'map');
            var card = document.getElementById("animated-destination-card-".concat(_this.destination.id));
            (_b = (_a = _this.actions).start) === null || _b === void 0 ? void 0 : _b.call(_a, _this.destination);
            var cardBR = card.getBoundingClientRect();
            var x = (fromBR.x - cardBR.x) / _this.zoom;
            var y = (fromBR.y - cardBR.y) / _this.zoom;
            card.style.transform = "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(_this.initialSize, ")");
            _this.setWagonsVisibility(true);
            _this.game.setSelectedDestination(_this.destination, true);
            setTimeout(function () {
                card.classList.add('animated');
                card.style.transform = "";
                _this.markComplete(card, cardBR, resolve);
            }, 100);
        });
    };
    DestinationCompleteAnimation.prototype.markComplete = function (card, cardBR, resolve) {
        var _this = this;
        setTimeout(function () {
            var _a, _b;
            card.classList.add(_this.state);
            (_b = (_a = _this.actions).change) === null || _b === void 0 ? void 0 : _b.call(_a, _this.destination);
            setTimeout(function () {
                var toBR = document.getElementById(_this.toId).getBoundingClientRect();
                var x = (toBR.x - cardBR.x) / _this.zoom;
                var y = (toBR.y - cardBR.y) / _this.zoom;
                card.style.transform = "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(_this.initialSize, ")");
                setTimeout(function () { return _this.endAnimation(resolve, card); }, 500);
            }, 500);
        }, 750);
    };
    DestinationCompleteAnimation.prototype.endAnimation = function (resolve, card) {
        var _a, _b;
        this.setWagonsVisibility(false);
        this.game.setSelectedDestination(this.destination, false);
        resolve(this);
        this.game.endAnimation(this);
        (_b = (_a = this.actions).end) === null || _b === void 0 ? void 0 : _b.call(_a, this.destination);
        card.parentElement.removeChild(card);
    };
    DestinationCompleteAnimation.prototype.getCardPosition = function (destination) {
        var positions = [destination.from, destination.to].map(function (cityId) { return CITIES.find(function (city) { return city.id == cityId; }); });
        var x = (positions[0].x + positions[1].x) / 2;
        var y = (positions[0].y + positions[1].y) / 2;
        return "left: ".concat(x - CARD_WIDTH / 2, "px; top: ").concat(y - CARD_HEIGHT / 2, "px;");
    };
    return DestinationCompleteAnimation;
}(WagonsAnimation));
/**
 * Longest path animation : wagons used by longest path are highlighted, and length is displayed over the map.
 */
var LongestPathAnimation = /** @class */ (function (_super) {
    __extends(LongestPathAnimation, _super);
    function LongestPathAnimation(game, routes, length, playerColor, actions) {
        var _this = _super.call(this, game, routes) || this;
        _this.routes = routes;
        _this.length = length;
        _this.playerColor = playerColor;
        _this.actions = actions;
        return _this;
    }
    LongestPathAnimation.prototype.animate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            dojo.place("\n            <div id=\"longest-path-animation\" style=\"color: #".concat(_this.playerColor, ";").concat(_this.getCardPosition(), "\">").concat(_this.length, "</div>\n            "), 'map');
            _this.setWagonsVisibility(true);
            setTimeout(function () { return _this.endAnimation(resolve); }, 1900);
        });
    };
    LongestPathAnimation.prototype.endAnimation = function (resolve) {
        var _a, _b;
        this.setWagonsVisibility(false);
        var number = document.getElementById('longest-path-animation');
        number.parentElement.removeChild(number);
        resolve(this);
        this.game.endAnimation(this);
        (_b = (_a = this.actions).end) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    LongestPathAnimation.prototype.getCardPosition = function () {
        var x = 100;
        var y = 100;
        if (this.routes.length) {
            var positions = [this.routes[0].from, this.routes[this.routes.length - 1].to].map(function (cityId) { return CITIES.find(function (city) { return city.id == cityId; }); });
            x = (positions[0].x + positions[1].x) / 2;
            y = (positions[0].y + positions[1].y) / 2;
        }
        return "left: ".concat(x, "px; top: ").concat(y, "px;");
    };
    return LongestPathAnimation;
}(WagonsAnimation));
var City = /** @class */ (function () {
    function City(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
    return City;
}());
var RouteSpace = /** @class */ (function () {
    function RouteSpace(x, y, length, angle, top) {
        if (top === void 0) { top = false; }
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
        this.top = top;
    }
    return RouteSpace;
}());
var Route = /** @class */ (function () {
    function Route(id, from, to, spaces, color) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.spaces = spaces;
        this.color = color;
    }
    return Route;
}());
/**
 * Named cities : 100 <= id <= 180
 * Red points :  181 <= id <= 201
 * Blue points :  202 <= id <= 221
 */
var CITIES = [
    new City(101, 114, 86),
    new City(102, 248, 36),
    new City(103, 489, 95),
    new City(104, 224, 195),
    new City(105, 117, 215),
    new City(106, 173, 255),
    new City(107, 359, 532),
    new City(108, 114, 353),
    new City(109, 365, 295),
    new City(110, 253, 418),
    new City(111, 156, 517),
    new City(112, 236, 548),
    new City(113, 534, 253),
    new City(114, 639, 30),
    new City(115, 364, 644),
    new City(116, 460, 721),
    new City(117, 392, 763),
    new City(118, 278, 824),
    new City(119, 420, 839),
    new City(120, 537, 853),
    new City(121, 359, 902),
    new City(122, 436, 960),
    new City(123, 351, 1034),
    new City(124, 156, 717),
    new City(125, 72, 854),
    new City(126, 59, 1035),
    new City(127, 400, 1216),
    new City(128, 567, 1299),
    new City(129, 837, 23),
    new City(130, 739, 110),
    new City(131, 713, 245),
    new City(132, 808, 333),
    new City(133, 883, 380),
    new City(134, 760, 398),
    new City(135, 601, 462),
    new City(136, 827, 518),
    new City(137, 918, 444),
    new City(138, 698, 550),
    new City(139, 931, 603),
    new City(140, 1003, 588),
    new City(141, 699, 674),
    new City(142, 800, 705),
    new City(143, 941, 746),
    new City(144, 914, 901),
    new City(145, 850, 923),
    new City(146, 807, 1041),
    new City(147, 1084, 915),
    new City(148, 937, 1111),
    new City(149, 984, 442),
    new City(150, 1101, 397),
    new City(151, 1120, 446),
    new City(152, 1069, 585),
    new City(153, 1068, 295),
    new City(154, 1031, 163),
    new City(155, 1184, 48),
    new City(156, 1185, 245),
    new City(157, 1225, 398),
    new City(158, 1363, 82),
    new City(159, 1423, 181),
    new City(160, 1517, 334),
    new City(161, 1369, 426),
    new City(162, 1306, 495),
    new City(163, 1349, 660),
    new City(164, 1432, 549),
    new City(165, 1490, 623),
    new City(166, 1538, 398),
    new City(167, 1596, 205),
    new City(168, 1509, 52),
    new City(169, 1708, 53),
    new City(170, 1712, 348),
    new City(171, 1494, 843),
    new City(172, 1579, 791),
    new City(173, 1716, 909),
    new City(174, 1579, 961),
    new City(175, 1528, 1020),
    new City(176, 1685, 1041),
    new City(177, 1537, 1110),
    new City(178, 1388, 1145),
    new City(179, 1524, 1271),
    new City(180, 1648, 1275),
    new City(100, 818, 211),
    new City(181, 0, 134),
    new City(182, 0, 664),
    new City(183, 0, 1135),
    new City(184, 256, 692),
    new City(185, 200, 977),
    new City(186, 267, 1272),
    new City(187, 401, 183),
    new City(188, 487, 531),
    new City(189, 673, 808),
    new City(190, 604, 1074),
    new City(191, 844, 809),
    new City(192, 825, 1179),
    new City(193, 992, 49),
    new City(194, 1057, 1040),
    new City(195, 1064, 1278),
    new City(196, 1280, 155),
    new City(197, 1138, 69),
    new City(198, 1241, 1084),
    new City(199, 1224, 1265),
    new City(200, 1337, 811),
    new City(201, 627, 677),
    new City(202, 110, 1230),
    new City(203, 379, 30),
    new City(204, 474, 386),
    new City(205, 45, 1084),
    new City(206, 597, 155),
    new City(207, 671, 329),
    new City(208, 575, 691),
    new City(209, 664, 954),
    new City(210, 673, 1187),
    new City(211, 735, 1291),
    new City(212, 949, 275),
    new City(213, 1024, 783),
    new City(214, 918, 1283),
    new City(215, 1117, 1165),
    new City(216, 1377, 277),
    new City(217, 1201, 831),
    new City(218, 1342, 954),
    new City(219, 1369, 1277),
    new City(220, 1679, 512),
    new City(221, 1690, 783), //
];
var ROUTES = [
    //routes from the starting point (compass)
    //other routes between cities
    new Route(1, 100, 129, [new RouteSpace(819, 179, 143, -82)], RED),
    new Route(2, 100, 130, [new RouteSpace(751, 123, 86, 55)], RED),
    new Route(3, 100, 131, [new RouteSpace(727, 238, 80, -13)], RED),
    new Route(4, 100, 132, [new RouteSpace(813, 318, 78, -86)], RED),
    new Route(5, 100, 133, [new RouteSpace(826, 229, 142, 69)], RED),
    new Route(6, 101, 102, [new RouteSpace(126, 81, 113, -22)], RED),
    new Route(7, 101, 105, [new RouteSpace(116, 101, 98, 90)], RED),
    new Route(8, 103, 114, [new RouteSpace(501, 83, 133, -21)], RED),
    new Route(9, 104, 105, [new RouteSpace(133, 213, 78, -13)], RED),
    new Route(10, 104, 109, [new RouteSpace(234, 204, 142, 33)], RED),
    new Route(11, 105, 108, [new RouteSpace(111, 229, 108, 88)], RED),
    new Route(12, 106, 108, [new RouteSpace(122, 340, 84, -60)], RED),
    new Route(13, 106, 109, [new RouteSpace(188, 254, 165, 13)], RED),
    new Route(14, 107, 110, [new RouteSpace(263, 429, 126, 45)], RED),
    new Route(15, 107, 112, [new RouteSpace(250, 546, 93, -7)], RED),
    new Route(16, 108, 111, [new RouteSpace(116, 369, 139, 76)], RED),
    new Route(17, 109, 110, [new RouteSpace(263, 406, 132, -46)], RED),
    new Route(18, 110, 111, [new RouteSpace(169, 503, 103, -46)], RED),
    new Route(19, 111, 112, [new RouteSpace(169, 523, 56, 24)], RED),
    new Route(20, 112, 124, [new RouteSpace(162, 703, 158, -67)], RED),
    new Route(21, 112, 115, [new RouteSpace(242, 559, 133, 33)], RED),
    new Route(22, 113, 131, [new RouteSpace(550, 251, 147, -3)], RED),
    new Route(23, 114, 130, [new RouteSpace(651, 37, 100, 39)], RED),
    new Route(24, 115, 116, [new RouteSpace(378, 652, 90, 42)], RED),
    new Route(25, 115, 117, [new RouteSpace(367, 657, 98, 77)], RED),
    new Route(26, 116, 119, [new RouteSpace(426, 824, 92, -70)], RED),
    new Route(27, 116, 120, [new RouteSpace(467, 735, 122, 61)], RED),
    new Route(28, 117, 118, [new RouteSpace(293, 818, 95, -29)], RED),
    new Route(29, 117, 121, [new RouteSpace(363, 885, 110, -77)], RED),
    new Route(30, 118, 121, [new RouteSpace(289, 833, 82, 47)], RED),
    new Route(31, 118, 125, [new RouteSpace(86, 853, 179, -9)], RED),
    new Route(32, 119, 122, [new RouteSpace(421, 851, 92, 80)], RED),
    new Route(33, 120, 122, [new RouteSpace(449, 950, 115, -46)], RED),
    new Route(34, 121, 123, [new RouteSpace(355, 1019, 101, -90)], RED),
    new Route(35, 122, 123, [new RouteSpace(365, 1027, 85, -43)], RED),
    new Route(36, 123, 127, [new RouteSpace(355, 1049, 159, 75)], RED),
    new Route(37, 124, 125, [new RouteSpace(82, 839, 126, -61)], RED),
    new Route(38, 125, 126, [new RouteSpace(65, 1020, 154, -86)], RED),
    new Route(39, 127, 128, [new RouteSpace(412, 1227, 157, 23)], RED),
    new Route(40, 130, 131, [new RouteSpace(711, 228, 108, -78)], RED),
    new Route(41, 133, 134, [new RouteSpace(775, 397, 95, -11)], RED),
    new Route(42, 133, 137, [new RouteSpace(891, 393, 44, 62)], RED),
    new Route(43, 133, 149, [new RouteSpace(898, 384, 87, 35)], RED),
    new Route(44, 134, 136, [new RouteSpace(769, 410, 105, 61)], RED),
    new Route(45, 134, 137, [new RouteSpace(776, 402, 131, 16)], RED),
    new Route(46, 134, 138, [new RouteSpace(701, 533, 133, -66)], RED),
    new Route(47, 136, 139, [new RouteSpace(838, 527, 10, 39)], RED),
    new Route(48, 136, 142, [new RouteSpace(800, 688, 159, -81)], RED),
    new Route(49, 136, 137, [new RouteSpace(838, 505, 84, -34)], RED),
    new Route(50, 137, 140, [new RouteSpace(930, 457, 135, 61)], RED),
    new Route(51, 138, 141, [new RouteSpace(697, 659, 97, -88)], RED),
    new Route(52, 139, 143, [new RouteSpace(934, 617, 113, 89)], RED),
    new Route(53, 140, 143, [new RouteSpace(949, 731, 138, -67)], RED),
    new Route(54, 141, 142, [new RouteSpace(712, 679, 76, 16)], RED),
    new Route(55, 142, 143, [new RouteSpace(814, 709, 114, 16)], RED),
    new Route(56, 143, 144, [new RouteSpace(915, 885, 126, -79)], RED),
    new Route(57, 144, 147, [new RouteSpace(927, 903, 141, 2)], RED),
    new Route(58, 145, 146, [new RouteSpace(811, 1023, 88, -70)], RED),
    new Route(59, 146, 148, [new RouteSpace(821, 1044, 115, 29)], RED),
    new Route(60, 149, 150, [new RouteSpace(1000, 438, 92, -23)], RED),
    new Route(61, 149, 151, [new RouteSpace(999, 444, 104, 2)], RED),
    new Route(62, 149, 152, [new RouteSpace(987, 457, 133, 59)], RED),
    new Route(63, 150, 153, [new RouteSpace(103, 309, 5, 73)], RED),
    new Route(64, 150, 157, [new RouteSpace(1115, 395, 93, 2)], RED),
    new Route(65, 151, 152, [new RouteSpace(1073, 569, 116, -67)], RED),
    new Route(66, 151, 162, [new RouteSpace(1136, 450, 161, 15)], RED),
    new Route(67, 153, 156, [new RouteSpace(1083, 284, 91, -22)], RED),
    new Route(68, 154, 155, [new RouteSpace(1045, 155, 157, -37)], RED),
    new Route(69, 155, 156, [new RouteSpace(1183, 63, 167, 90)], RED),
    new Route(70, 155, 158, [new RouteSpace(1199, 49, 151, 9)], RED),
    new Route(71, 157, 161, [new RouteSpace(1239, 400, 115, 13)], RED),
    new Route(72, 157, 162, [new RouteSpace(1238, 409, 94, 53)], RED),
    new Route(73, 158, 159, [new RouteSpace(1375, 93, 83, 59)], RED),
    new Route(74, 158, 168, [new RouteSpace(1377, 77, 119, -11)], RED),
    new Route(75, 159, 167, [new RouteSpace(1438, 181, 144, 8)], RED),
    new Route(76, 159, 168, [new RouteSpace(1433, 168, 125, -58)], RED),
    new Route(77, 160, 167, [new RouteSpace(1523, 319, 116, -58)], RED),
    new Route(78, 160, 170, [new RouteSpace(1534, 337, 161, 4)], RED),
    new Route(79, 161, 166, [new RouteSpace(1385, 422, 139, -8)], RED),
    new Route(80, 162, 163, [new RouteSpace(1311, 511, 140, 75)], RED),
    new Route(81, 162, 164, [new RouteSpace(1322, 503, 102, 22)], RED),
    new Route(82, 163, 164, [new RouteSpace(1357, 646, 107, -50)], RED),
    new Route(83, 163, 165, [new RouteSpace(1367, 656, 108, -14)], RED),
    new Route(84, 164, 166, [new RouteSpace(1443, 535, 151, -54)], RED),
    new Route(85, 165, 172, [new RouteSpace(1497, 635, 160, 63)], RED),
    new Route(86, 168, 169, [new RouteSpace(1525, 49, 169, 0)], RED),
    new Route(87, 171, 174, [new RouteSpace(1501, 856, 114, 54)], RED),
    new Route(88, 171, 175, [new RouteSpace(1495, 860, 148, 78)], RED),
    new Route(89, 172, 173, [new RouteSpace(1594, 799, 145, 43)], RED),
    new Route(90, 173, 174, [new RouteSpace(1590, 943, 117, -19)], RED),
    new Route(91, 174, 176, [new RouteSpace(1591, 967, 102, 38)], RED),
    new Route(92, 175, 177, [new RouteSpace(1530, 1037, 56, 84)], RED),
    new Route(93, 177, 178, [new RouteSpace(1404, 1143, 122, -14)], RED),
    new Route(94, 177, 179, [new RouteSpace(1525, 1255, 129, -86)], RED),
    new Route(95, 179, 180, [new RouteSpace(1543, 1270, 93, 2)], RED),
    //routes from red points
    //routes from blue points
];
var DRAG_AUTO_ZOOM_DELAY = 2000;
var SIDES = ["left", "right", "top", "bottom"];
var CORNERS = ["bottom-left", "bottom-right", "top-left", "top-right"];
var MAP_WIDTH = 1744;
var MAP_HEIGHT = 1321;
var DECK_WIDTH = 250;
var PLAYER_WIDTH = 305;
var PLAYER_HEIGHT = 257; // avg height (4 destination cards)
var BOTTOM_RATIO = (MAP_WIDTH + DECK_WIDTH) / (MAP_HEIGHT + PLAYER_HEIGHT);
var LEFT_RATIO = (PLAYER_WIDTH + MAP_WIDTH + DECK_WIDTH) / MAP_HEIGHT;
/**
 * Manager for in-map zoom.
 */
var InMapZoomManager = /** @class */ (function () {
    function InMapZoomManager() {
        var _this = this;
        this.pos = { dragging: false, top: 0, left: 0, x: 0, y: 0 }; // for map drag (if zoomed)
        this.zoomed = false; // indicates if in-map zoom is active
        this.mapZoomDiv = document.getElementById("map-zoom");
        this.mapDiv = document.getElementById("map");
        // Attach the handler
        this.mapDiv.addEventListener("mousedown", function (e) {
            return _this.mouseDownHandler(e);
        });
        document.addEventListener("mousemove", function (e) { return _this.mouseMoveHandler(e); });
        document.addEventListener("mouseup", function (e) { return _this.mouseUpHandler(); });
        document
            .getElementById("zoom-button")
            .addEventListener("click", function () { return _this.toggleZoom(); });
        this.mapDiv.addEventListener("dragover", function (e) {
            if (e.offsetX !== _this.dragClientX ||
                e.offsetY !== _this.dragClientY) {
                _this.dragClientX = e.offsetX;
                _this.dragClientY = e.offsetY;
                _this.dragOverMouseMoved(e.offsetX, e.offsetY);
            }
        });
        this.mapDiv.addEventListener("dragleave", function (e) {
            clearTimeout(_this.autoZoomTimeout);
            _this.autoZoomTimeout = null;
        });
        this.mapDiv.addEventListener("drop", function (e) {
            clearTimeout(_this.autoZoomTimeout);
            _this.autoZoomTimeout = null;
        });
    }
    InMapZoomManager.prototype.dragOverMouseMoved = function (clientX, clientY) {
        var _this = this;
        if (this.autoZoomTimeout) {
            clearTimeout(this.autoZoomTimeout);
        }
        this.autoZoomTimeout = setTimeout(function () {
            if (!_this.hoveredRoute) {
                // do not automatically change the zoom when player is dragging over a route!
                _this.toggleZoom(clientX / _this.mapDiv.clientWidth, clientY / _this.mapDiv.clientHeight);
            }
            _this.autoZoomTimeout = null;
        }, DRAG_AUTO_ZOOM_DELAY);
    };
    /**
     * Handle click on zoom button. Toggle between full map and in-map zoom.
     */
    InMapZoomManager.prototype.toggleZoom = function (scrollRatioX, scrollRatioY) {
        if (scrollRatioX === void 0) { scrollRatioX = null; }
        if (scrollRatioY === void 0) { scrollRatioY = null; }
        this.zoomed = !this.zoomed;
        this.mapDiv.style.transform = this.zoomed ? "scale(1.8)" : "";
        dojo.toggleClass("zoom-button", "zoomed", this.zoomed);
        dojo.toggleClass("map-zoom", "scrollable", this.zoomed);
        this.mapDiv.style.cursor = this.zoomed ? "grab" : "default";
        if (this.zoomed) {
            if (scrollRatioX && scrollRatioY) {
                this.mapZoomDiv.scrollLeft =
                    (this.mapZoomDiv.scrollWidth -
                        this.mapZoomDiv.clientWidth) *
                        scrollRatioX;
                this.mapZoomDiv.scrollTop =
                    (this.mapZoomDiv.scrollHeight -
                        this.mapZoomDiv.clientHeight) *
                        scrollRatioY;
            }
        }
        else {
            this.mapZoomDiv.scrollTop = 0;
            this.mapZoomDiv.scrollLeft = 0;
        }
    };
    /**
     * Handle mouse down, to grap map and scroll in it (imitate mobile touch scroll).
     */
    InMapZoomManager.prototype.mouseDownHandler = function (e) {
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
    };
    /**
     * Handle mouse move, to grap map and scroll in it (imitate mobile touch scroll).
     */
    InMapZoomManager.prototype.mouseMoveHandler = function (e) {
        if (!this.zoomed || !this.pos.dragging) {
            return;
        }
        // How far the mouse has been moved
        var dx = e.clientX - this.pos.x;
        var dy = e.clientY - this.pos.y;
        var factor = 0.1;
        // Scroll the element
        this.mapZoomDiv.scrollTop -= dy * factor;
        this.mapZoomDiv.scrollLeft -= dx * factor;
    };
    /**
     * Handle mouse up, to grap map and scroll in it (imitate mobile touch scroll).
     */
    InMapZoomManager.prototype.mouseUpHandler = function () {
        if (!this.zoomed || !this.pos.dragging) {
            return;
        }
        this.mapDiv.style.cursor = "grab";
        this.pos.dragging = false;
    };
    InMapZoomManager.prototype.setHoveredRoute = function (route) {
        this.hoveredRoute = route;
    };
    return InMapZoomManager;
}());
/**
 * Map creation and in-map zoom handler.
 */
var TtrMap = /** @class */ (function () {
    /**
     * Place map corner illustration and borders, cities, routes, and bind events.
     */
    function TtrMap(game, players, claimedRoutes, revealedDestinations) {
        this.game = game;
        this.players = players;
        this.dragOverlay = null;
        this.crosshairTarget = null;
        this.crosshairHalfSize = 0;
        this.crosshairShift = 0;
        // map border
        dojo.place("\n            <div id=\"cities\"></div>\n            <div id=\"route-spaces\"></div>\n            <div id=\"train-cars\"></div>\n        ", "map", "first");
        SIDES.forEach(function (side) {
            return dojo.place("<div class=\"side ".concat(side, "\"></div>"), "map-and-borders");
        });
        CORNERS.forEach(function (corner) {
            return dojo.place("<div class=\"corner ".concat(corner, "\"></div>"), "map-and-borders");
        });
        CITIES.forEach(function (city) {
            return dojo.place("<div id=\"city".concat(city.id, "\" class=\"city\" \n                style=\"transform: translate(").concat(city.x, "px, ").concat(city.y, "px)\"\n                title=\"").concat(getCityName(city.id), "\"\n            ></div>"), "cities");
        });
        this.createRouteSpaces("route-spaces");
        this.showRevealedDestinations(revealedDestinations);
        this.setClaimedRoutes(claimedRoutes, null);
        this.resizedDiv = document.getElementById("resized");
        this.mapDiv = document.getElementById("map");
        this.inMapZoomManager = new InMapZoomManager();
        this.game.setTooltip("destination-deck-hidden-pile", "<strong>".concat(_("Destinations deck"), "</strong><br><br>\n        ").concat(_("Click here to take three new destination cards (keep at least one)")));
    }
    TtrMap.prototype.createRouteSpaces = function (destination, shiftX, shiftY) {
        var _this = this;
        if (shiftX === void 0) { shiftX = 0; }
        if (shiftY === void 0) { shiftY = 0; }
        ROUTES.forEach(function (route) {
            return route.spaces.forEach(function (space, spaceIndex) {
                dojo.place("<div id=\"".concat(destination, "-route").concat(route.id, "-space").concat(spaceIndex, "\" class=\"route-space\" \n                    style=\"transform-origin:left center; transform: translate(").concat(space.x + shiftX, "px, ").concat(space.y + shiftY, "px) rotate(").concat(space.angle, "deg); width:").concat(space.length, "px\"\n                    title=\"").concat(dojo.string.substitute(_("${from} to ${to}"), {
                    from: _this.getCityName(route.from),
                    to: _this.getCityName(route.to),
                }), ", ").concat(route.spaces.length, " ").concat(getColor(route.color, "route"), "\"\n                    data-route=\"").concat(route.id, "\" data-color=\"").concat(route.color, "\"\n                ></div>"), destination);
                var spaceDiv = document.getElementById("".concat(destination, "-route").concat(route.id, "-space").concat(spaceIndex));
                if (destination == "route-spaces") {
                    _this.setSpaceClickEvents(spaceDiv, route);
                }
                else {
                    _this.setSpaceDragEvents(spaceDiv, route);
                }
            });
        });
    };
    /**
     * Handle dragging train car cards over a route.
     */
    TtrMap.prototype.routeDragOver = function (e, route) { };
    /**
     * Handle dropping train car cards over a route.
     */
    TtrMap.prototype.routeDragDrop = function (e, route) {
        e.preventDefault();
    };
    /**
     * Bind click events to route space.
     */
    TtrMap.prototype.setSpaceClickEvents = function (spaceDiv, route) {
        var _this = this;
        spaceDiv.addEventListener("dragenter", function (e) {
            return _this.routeDragOver(e, route);
        });
        spaceDiv.addEventListener("dragover", function (e) {
            return _this.routeDragOver(e, route);
        });
        spaceDiv.addEventListener("dragleave", function (e) {
            return _this.setHoveredRoute(null);
        });
        spaceDiv.addEventListener("drop", function (e) { return _this.routeDragDrop(e, route); });
        spaceDiv.addEventListener("click", function () { return _this.game.clickedRoute(route); });
    };
    /**
     * Bind drag events to route space.
     */
    TtrMap.prototype.setSpaceDragEvents = function (spaceDiv, route) {
        var _this = this;
        spaceDiv.addEventListener("dragenter", function (e) {
            return _this.routeDragOver(e, route);
        });
        spaceDiv.addEventListener("dragover", function (e) {
            return _this.routeDragOver(e, route);
        });
        spaceDiv.addEventListener("dragleave", function (e) {
            return _this.setHoveredRoute(null);
        });
        spaceDiv.addEventListener("drop", function (e) { return _this.routeDragDrop(e, route); });
    };
    /**
     * Highlight selectable route spaces.
     */
    TtrMap.prototype.setSelectableRoutes = function (selectable, possibleRoutes) {
        dojo.query(".route-space").removeClass("selectable");
        if (selectable) {
            possibleRoutes.forEach(function (route) {
                return ROUTES.find(function (r) { return r.id == route.id; }).spaces.forEach(function (_, index) {
                    var _a;
                    return (_a = document
                        .getElementById("route-spaces-route".concat(route.id, "-space").concat(index))) === null || _a === void 0 ? void 0 : _a.classList.add("selectable");
                });
            });
        }
    };
    /**
     * Place train cars on claimed routes.
     * fromPlayerId is for animation (null for no animation)
     */
    TtrMap.prototype.setClaimedRoutes = function (claimedRoutes, fromPlayerId) {
        var _this = this;
        claimedRoutes.forEach(function (claimedRoute) {
            var route = ROUTES.find(function (r) { return r.id == claimedRoute.routeId; });
            var player = _this.players.find(function (player) { return Number(player.id) == claimedRoute.playerId; });
            _this.setWagons(route, player, fromPlayerId, false);
            if (_this.game.isDoubleRouteForbidden()) {
                var otherRoute_1 = ROUTES.find(function (r) {
                    return route.from == r.from &&
                        route.to == r.to &&
                        route.id != r.id;
                });
                otherRoute_1 === null || otherRoute_1 === void 0 ? void 0 : otherRoute_1.spaces.forEach(function (space, spaceIndex) {
                    var spaceDiv = document.getElementById("route-spaces-route".concat(otherRoute_1.id, "-space").concat(spaceIndex));
                    if (spaceDiv) {
                        spaceDiv.classList.add("forbidden");
                        _this.game.setTooltip(spaceDiv.id, "<strong><span style=\"color: darkred\">".concat(_("Important Note:"), "</span> \n                        ").concat(_("In 2 or 3 player games, only one of the Double-Routes can be used."), "</strong>"));
                    }
                });
            }
        });
    };
    TtrMap.prototype.animateWagonFromCounter = function (playerId, wagonId, toX, toY) {
        var wagon = document.getElementById(wagonId);
        var wagonBR = wagon.getBoundingClientRect();
        var fromBR = document
            .getElementById("train-car-counter-".concat(playerId, "-wrapper"))
            .getBoundingClientRect();
        var zoom = this.game.getZoom();
        var fromX = (fromBR.x - wagonBR.x) / zoom;
        var fromY = (fromBR.y - wagonBR.y) / zoom;
        wagon.style.transform = "translate(".concat(fromX + toX, "px, ").concat(fromY + toY, "px)");
        setTimeout(function () {
            wagon.style.transition = "transform 0.5s";
            wagon.style.transform = "translate(".concat(toX, "px, ").concat(toY, "px");
        }, 0);
    };
    /**
     * Place train car on a route space.
     * fromPlayerId is for animation (null for no animation)
     * Phantom is for dragging over a route : wagons are showns translucent.
     */
    TtrMap.prototype.setWagon = function (route, space, spaceIndex, player, fromPlayerId, phantom, isLowestFromDoubleHorizontalRoute) {
        var id = "wagon-route".concat(route.id, "-space").concat(spaceIndex).concat(phantom ? "-phantom" : "");
        if (document.getElementById(id)) {
            return;
        }
        var angle = -space.angle;
        while (angle < 0) {
            angle += 180;
        }
        while (angle >= 180) {
            angle -= 180;
        }
        var x = space.x;
        var y = space.y;
        var EASE_WEIGHT = 0.75;
        var angleOnOne = (Math.acos((-2 * angle) / 180 + 1) / Math.PI) * EASE_WEIGHT +
            (angle / 180) * (1 - EASE_WEIGHT);
        var angleClassNumber = Math.round(angleOnOne * 36);
        var alreadyPlacedWagons = Array.from(document.querySelectorAll(".wagon"));
        var xy = x + y;
        if (isLowestFromDoubleHorizontalRoute) {
            // we shift a little the train car to let the other route visible
            x += 10 * Math.abs(Math.sin((angle * Math.PI) / 180));
            y += 10 * Math.abs(Math.cos((angle * Math.PI) / 180));
        }
        var wagonHtml = "<div id=\"".concat(id, "\" class=\"wagon angle").concat(angleClassNumber, " ").concat(phantom ? "phantom" : "", " ").concat(space.top ? "top" : "", "\" data-player-color=\"").concat(player.color, "\" data-color-blind-player-no=\"").concat(player.playerNo, "\" data-xy=\"").concat(xy, "\" style=\"transform: translate(").concat(x, "px, ").concat(y, "px)\"></div>");
        // we consider a wagon must be more visible than another if its X + Y is > as the other
        if (!alreadyPlacedWagons.length) {
            dojo.place(wagonHtml, "train-cars");
        }
        else {
            var placed = false;
            for (var i = 0; i < alreadyPlacedWagons.length; i++) {
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
    };
    /**
     * Place train cars on a route.
     * fromPlayerId is for animation (null for no animation)
     * Phantom is for dragging over a route : wagons are showns translucent.
     */
    TtrMap.prototype.setWagons = function (route, player, fromPlayerId, phantom) {
        var _this = this;
        if (!phantom) {
            route.spaces.forEach(function (space, spaceIndex) {
                var spaceDiv = document.getElementById("route-spaces-route".concat(route.id, "-space").concat(spaceIndex));
                spaceDiv === null || spaceDiv === void 0 ? void 0 : spaceDiv.parentElement.removeChild(spaceDiv);
            });
        }
        var isLowestFromDoubleHorizontalRoute = this.isLowestFromDoubleHorizontalRoute(route);
        if (fromPlayerId) {
            route.spaces.forEach(function (space, spaceIndex) {
                setTimeout(function () {
                    _this.setWagon(route, space, spaceIndex, player, fromPlayerId, phantom, isLowestFromDoubleHorizontalRoute);
                    playSound("ttr-placed-train-car");
                }, 200 * spaceIndex);
            });
            this.game.disableNextMoveSound();
        }
        else {
            route.spaces.forEach(function (space, spaceIndex) {
                return _this.setWagon(route, space, spaceIndex, player, fromPlayerId, phantom, isLowestFromDoubleHorizontalRoute);
            });
        }
    };
    /**
     * Check if the route is mostly horizontal, and the lowest from a double route
     */
    TtrMap.prototype.isLowestFromDoubleHorizontalRoute = function (route) {
        var otherRoute = ROUTES.find(function (r) { return route.from == r.from && route.to == r.to && route.id != r.id; });
        if (!otherRoute) {
            // not a double route
            return false;
        }
        var routeAvgX = route.spaces
            .map(function (space) { return space.x; })
            .reduce(function (a, b) { return a + b; }, 0);
        var routeAvgY = route.spaces
            .map(function (space) { return space.y; })
            .reduce(function (a, b) { return a + b; }, 0);
        var otherRouteAvgX = otherRoute.spaces
            .map(function (space) { return space.x; })
            .reduce(function (a, b) { return a + b; }, 0);
        var otherRouteAvgY = otherRoute.spaces
            .map(function (space) { return space.y; })
            .reduce(function (a, b) { return a + b; }, 0);
        if (Math.abs(routeAvgX - otherRouteAvgX) >
            Math.abs(routeAvgY - otherRouteAvgY)) {
            // not mostly horizontal
            return false;
        }
        if (routeAvgY <= otherRouteAvgY) {
            // not the lowest one
            return false;
        }
        return true;
    };
    /**
     * Set map size, depending on available screen size.
     * Player table will be placed left or bottom, depending on window ratio.
     */
    TtrMap.prototype.setAutoZoom = function () {
        var _this = this;
        if (!this.mapDiv.clientWidth) {
            setTimeout(function () { return _this.setAutoZoom(); }, 200);
            return;
        }
        var screenRatio = document.getElementById("game_play_area").clientWidth /
            (window.innerHeight - 80);
        var leftDistance = Math.abs(LEFT_RATIO - screenRatio);
        var bottomDistance = Math.abs(BOTTOM_RATIO - screenRatio);
        var left = leftDistance < bottomDistance || this.game.isSpectator;
        this.game.setPlayerTablePosition(left);
        var gameWidth = (left ? PLAYER_WIDTH : 0) + MAP_WIDTH + DECK_WIDTH;
        var gameHeight = MAP_HEIGHT + (left ? 0 : PLAYER_HEIGHT * 0.75);
        var horizontalScale = document.getElementById("game_play_area").clientWidth / gameWidth;
        var verticalScale = (window.innerHeight - 80) / gameHeight;
        this.scale = Math.min(1, horizontalScale, verticalScale);
        this.resizedDiv.style.transform =
            this.scale === 1 ? "" : "scale(".concat(this.scale, ")");
        this.resizedDiv.style.marginBottom = "-".concat((1 - this.scale) * gameHeight, "px");
        this.setOutline();
    };
    /**
     * Get current zoom.
     */
    TtrMap.prototype.getZoom = function () {
        return this.scale;
    };
    /**
     * Highlight active destination.
     */
    TtrMap.prototype.setActiveDestination = function (destination, previousDestination) {
        if (previousDestination === void 0) { previousDestination = null; }
        if (previousDestination) {
            if (previousDestination.id === destination.id) {
                return;
            }
            [previousDestination.to].forEach(function (city) {
                return (document.getElementById("city".concat(city)).dataset.selectedDestination = "false");
            });
        }
        if (destination) {
            [destination.to].forEach(function (city) {
                return (document.getElementById("city".concat(city)).dataset.selectedDestination = "true");
            });
        }
    };
    /**
     * Highlight hovered route (when dragging train cars).
     */
    TtrMap.prototype.setHoveredRoute = function (route, valid) {
        if (valid === void 0) { valid = null; }
        this.inMapZoomManager.setHoveredRoute(route);
        if (route) {
            [route.from, route.to].forEach(function (city) {
                var cityDiv = document.getElementById("city".concat(city));
                cityDiv.dataset.hovered = "true";
                cityDiv.dataset.valid = valid.toString();
            });
            if (valid) {
                this.setWagons(route, this.game.getCurrentPlayer(), null, true);
            }
        }
        else {
            ROUTES.forEach(function (r) {
                return [r.from, r.to].forEach(function (city) {
                    return (document.getElementById("city".concat(city)).dataset.hovered = "false");
                });
            });
            // remove phantom wagons
            this.mapDiv
                .querySelectorAll(".wagon.phantom")
                .forEach(function (spaceDiv) {
                return spaceDiv.parentElement.removeChild(spaceDiv);
            });
        }
    };
    /**
     * Highlight cities of selectable destination.
     */
    TtrMap.prototype.setSelectableDestination = function (destination, visible) {
        [destination.to].forEach(function (city) {
            console.log("search ", "city".concat(city));
            document.getElementById("city".concat(city)).dataset.selectable =
                "" + visible;
        });
    };
    /**
     * Highlight cities of selected destination.
     */
    TtrMap.prototype.setSelectedDestination = function (destination, visible) {
        [destination.to].forEach(function (city) {
            document.getElementById("city".concat(city)).dataset.selected =
                "" + visible;
        });
    };
    /**
     * Highlight cities player must connect for its objectives.
     */
    TtrMap.prototype.setDestinationsToConnect = function (destinations) {
        this.mapDiv
            .querySelectorAll(".city[data-to-connect]:not([data-revealed-by])")
            .forEach(function (city) { return (city.dataset.toConnect = "false"); });
        var cities = [];
        destinations.forEach(function (destination) { return cities.push(destination.to); });
        cities.forEach(function (city) {
            return (document.getElementById("city".concat(city)).dataset.toConnect =
                "true");
        });
    };
    /**
     * Highlight destination (on destination mouse over).
     */
    TtrMap.prototype.setHighligthedDestination = function (destination) {
        var visible = Boolean(destination).toString();
        var shadow = document.getElementById("map-destination-highlight-shadow");
        shadow.dataset.visible = visible;
        var cities;
        if (destination) {
            shadow.dataset.to = "" + destination.to;
            cities = [destination.to];
        }
        else {
            cities = [shadow.dataset.to];
        }
        cities.forEach(function (city) {
            return (document.getElementById("city".concat(city)).dataset.highlight =
                visible);
        });
    };
    /**
     * Sets a player token next to the destination.
     */
    TtrMap.prototype.revealDestination = function (player, destination) {
        var div = document.getElementById("city".concat(destination.to));
        if (div.dataset.revealedBy) {
            div.removeAttribute("data-revealed-by");
        }
        else {
            div.dataset.revealedBy = player.color;
            document.getElementById("city".concat(destination.to)).dataset.toConnect =
                "true";
        }
    };
    /**
     * Sets a marker on all revealed destinations to indicate to which player the destination belongs.
     */
    TtrMap.prototype.showRevealedDestinations = function (destinationsByPlayer) {
        destinationsByPlayer.forEach(function (destinations, player) {
            destinations.forEach(function (d) {
                document.getElementById("city".concat(d.to)).dataset.revealedBy =
                    player.color;
                document.getElementById("city".concat(d.to)).dataset.toConnect =
                    "true";
            });
        });
    };
    /**
     * Sets a marker to indicate that the destination is shared.
     */
    TtrMap.prototype.showSharedDestinations = function (destinations) {
        console.log("showSharedDestinations", destinations);
        destinations.forEach(function (d) {
            document.getElementById("city".concat(d.to)).dataset.revealedBy =
                "shared";
            document.getElementById("city".concat(d.to)).dataset.toConnect = "true";
        });
    };
    /**
     * Create the crosshair target when drag starts over the drag overlay.
     */
    TtrMap.prototype.overlayDragEnter = function (e) {
        if (!this.crosshairTarget) {
            this.crosshairTarget = document.createElement("div");
            this.crosshairTarget.id = "map-drag-target";
            this.crosshairTarget.style.left = e.offsetX + "px";
            this.crosshairTarget.style.top = e.offsetY + "px";
            this.crosshairTarget.style.width =
                this.crosshairHalfSize * 2 + "px";
            this.crosshairTarget.style.height =
                this.crosshairHalfSize * 2 + "px";
            this.crosshairTarget.style.marginLeft =
                -(this.crosshairHalfSize + this.crosshairShift) + "px";
            this.crosshairTarget.style.marginTop =
                -(this.crosshairHalfSize + this.crosshairShift) + "px";
            this.dragOverlay.appendChild(this.crosshairTarget);
        }
    };
    /**
     * Move the crosshair target.
     */
    TtrMap.prototype.overlayDragMove = function (e) {
        if (this.crosshairTarget &&
            e.target.id === this.dragOverlay.id) {
            this.crosshairTarget.style.left = e.offsetX + "px";
            this.crosshairTarget.style.top = e.offsetY + "px";
        }
    };
    /**
     * Create a div overlay when dragging starts.
     * This allow to create a crosshair target on it, and to make it shifted from mouse position.
     * In touch mode, crosshair must be shifted from finger to see the target. For this, the drag zones on the overlay are shifted in accordance.
     * If there isn't touch support, the crosshair is centered on the mouse.
     */
    TtrMap.prototype.addDragOverlay = function () {
        var _this = this;
        var id = "map-drag-overlay";
        this.dragOverlay = document.createElement("div");
        this.dragOverlay.id = id;
        document.getElementById("map").appendChild(this.dragOverlay);
        this.crosshairHalfSize = CROSSHAIR_SIZE / this.game.getZoom();
        var touchDevice = "ontouchstart" in window;
        this.crosshairShift = touchDevice ? this.crosshairHalfSize : 0;
        this.createRouteSpaces(id, 100 + this.crosshairShift, 100 + this.crosshairShift);
        this.dragOverlay.addEventListener("dragenter", function (e) {
            return _this.overlayDragEnter(e);
        });
        var debounceTimer = null;
        var lastEvent = null;
        this.dragOverlay.addEventListener("dragover", function (e) {
            lastEvent = e;
            if (!debounceTimer) {
                debounceTimer = setTimeout(function () {
                    _this.overlayDragMove(lastEvent);
                    debounceTimer = null;
                }, 50);
            }
        });
    };
    /**
     * Detroy the div overlay when dragging ends.
     */
    TtrMap.prototype.removeDragOverlay = function () {
        this.crosshairTarget = null;
        document.getElementById("map").removeChild(this.dragOverlay);
        this.dragOverlay = null;
    };
    /**
     * Set outline for train cars on the map, according to preferences.
     */
    TtrMap.prototype.setOutline = function () {
        var _a, _b;
        var preference = Number((_a = this.game.prefs[203]) === null || _a === void 0 ? void 0 : _a.value);
        var outline = preference === 1 ||
            (preference === 2 &&
                ((_b = this.mapDiv) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().width) < 1000);
        this.mapDiv.dataset.bigShadows = outline.toString();
    };
    TtrMap.prototype.getCityName = function (cityId) {
        return CITIES_NAMES[cityId - 100];
    };
    return TtrMap;
}());
/**
 * Selection of new destinations.
 */
var DestinationSelection = /** @class */ (function () {
    /**
     * Init stock.
     */
    function DestinationSelection(game) {
        var _this = this;
        this.game = game;
        /** Minimum number of selected destinations to enable the confirm selection button */
        this.minimumDestinations = 1;
        this.destinations = new ebg.stock();
        this.destinations.setSelectionAppearance("class");
        this.destinations.selectionClass = "selected";
        this.destinations.setSelectionMode(1);
        this.destinations.create(game, $("destination-stock"), CARD_WIDTH, CARD_HEIGHT);
        this.destinations.onItemCreate = function (cardDiv, cardUniqueId) { return setupDestinationCardDiv(cardDiv, Number(cardUniqueId)); };
        this.destinations.image_items_per_row = 10;
        this.destinations.centerItems = true;
        this.destinations.item_margin = 20;
        dojo.connect(this.destinations, "onChangeSelection", this, function () {
            return _this.selectionChange();
        });
        setupDestinationCards(this.destinations);
    }
    /**
     * Set visible destination cards.
     */
    DestinationSelection.prototype.setCards = function (destinations) {
        var _this = this;
        dojo.removeClass("destination-deck", "hidden");
        destinations.forEach(function (destination) {
            _this.destinations.addToStockWithId(destination.type * 100 + destination.type_arg, "" + destination.id);
            var cardDiv = document.getElementById("destination-stock_item_".concat(destination.id));
            // when mouse hover destination, highlight it on the map
            cardDiv.addEventListener("mouseenter", function () {
                return _this.game.setHighligthedDestination(destination);
            });
            cardDiv.addEventListener("mouseleave", function () {
                return _this.game.setHighligthedDestination(null);
            });
            // when destinatin is selected, another highlight on the map
            cardDiv.addEventListener("click", function () {
                return _this.game.setSelectedDestination(destination, _this.destinations
                    .getSelectedItems()
                    .some(function (item) { return Number(item.id) == destination.id; }));
            });
        });
    };
    /**
     * Hide destination selector.
     */
    DestinationSelection.prototype.hide = function () {
        this.destinations.removeAll();
        dojo.addClass("destination-deck", "hidden");
    };
    /**
     * Get selected destinations ids.
     */
    DestinationSelection.prototype.getSelectedDestinationsIds = function () {
        return this.destinations
            .getSelectedItems()
            .map(function (item) { return Number(item.id); });
    };
    /**
     * Toggle activation of confirm selection buttons, depending on minimumDestinations.
     */
    DestinationSelection.prototype.selectionChange = function () {
        var _a, _b;
        (_a = document
            .getElementById("chooseInitialDestinations_button")) === null || _a === void 0 ? void 0 : _a.classList.toggle("disabled", this.destinations.getSelectedItems().length <
            this.minimumDestinations);
        (_b = document
            .getElementById("chooseAdditionalDestinations_button")) === null || _b === void 0 ? void 0 : _b.classList.toggle("disabled", this.destinations.getSelectedItems().length <
            this.minimumDestinations);
    };
    return DestinationSelection;
}());
/**
 * Stock of shared destinations.
 */
var SharedDestinationDeck = /** @class */ (function () {
    /**
     * Init stock.
     */
    function SharedDestinationDeck(game) {
        this.game = game;
        this.sharedDestinations = new ebg.stock();
        this.sharedDestinations.setSelectionAppearance("class");
        this.sharedDestinations.selectionClass = "selected";
        this.sharedDestinations.setSelectionMode(0);
        this.sharedDestinations.create(game, $("shared-destination-stock"), CARD_WIDTH, CARD_HEIGHT);
        this.sharedDestinations.onItemCreate = function (cardDiv, cardUniqueId) { return setupDestinationCardDiv(cardDiv, Number(cardUniqueId)); };
        this.sharedDestinations.image_items_per_row = 10;
        this.sharedDestinations.centerItems = true;
        this.sharedDestinations.item_margin = 20;
        //this.sharedDestinations.setOverlap(-1, 20);// = 20; // overlap
        //this.sharedDestinations.horizontal_overlap = -1; // current bug in stock - this is needed to enable z-index on overlapping items
        //this.sharedDestinations.item_margin = 0; // has to be 0 if using overlap
        //this.sharedDestinations.set
        setupDestinationCards(this.sharedDestinations);
    }
    /**
     * Set visible destination cards.
     */
    SharedDestinationDeck.prototype.setCards = function (destinations) {
        var _this = this;
        dojo.removeClass("destination-deck", "hidden");
        destinations.forEach(function (destination) {
            /*console.log(
                "add shared",
                destination.type * 100 + destination.type_arg
            );*/
            _this.sharedDestinations.addToStockWithId(destination.type * 100 + destination.type_arg, "" + destination.id);
            var cardDiv = document.getElementById("shared-destination-stock_item_".concat(destination.id));
            // when mouse hover destination, highlight it on the map
            cardDiv.addEventListener("mouseenter", function () {
                return _this.game.setHighligthedDestination(destination);
            });
            cardDiv.addEventListener("mouseleave", function () {
                return _this.game.setHighligthedDestination(null);
            });
            // when destinatin is selected, another highlight on the map
            cardDiv.addEventListener("click", function () {
                return _this.game.setSelectedDestination(destination, _this.sharedDestinations
                    .getSelectedItems()
                    .some(function (item) { return Number(item.id) == destination.id; }));
            });
        });
    };
    /**
     * Hide destination selector.
     */
    SharedDestinationDeck.prototype.hide = function () {
        this.sharedDestinations.removeAll();
        dojo.addClass("shared-destination-deck", "hidden");
    };
    return SharedDestinationDeck;
}());
var DBL_CLICK_TIMEOUT = 300;
var SPOTS_COUNT = 6;
/**
 * Level of cards in deck indicator.
 */
var Gauge = /** @class */ (function () {
    function Gauge(containerId, className, max) {
        this.max = max;
        dojo.place("\n        <div id=\"gauge-".concat(className, "\" class=\"gauge ").concat(className, "\">\n            <div class=\"inner\" id=\"gauge-").concat(className, "-level\"></div>\n        </div>"), containerId);
        this.levelDiv = document.getElementById("gauge-".concat(className, "-level"));
    }
    Gauge.prototype.setCount = function (count) {
        this.levelDiv.style.height = "".concat((100 * count) / this.max, "%");
    };
    return Gauge;
}());
/**
 * Selection of new train cars and destination cards.
 */
var TrainCarSelection = /** @class */ (function () {
    /**
     * Init stocks and gauges.
     */
    function TrainCarSelection(game, visibleCards, sharedDestinationDeck, destinationDeckCount, destinationDeckMaxCount) {
        var _this = this;
        this.game = game;
        this.visibleCards = [];
        this.dblClickTimeout = null;
        this.sharedDestinationDeck = sharedDestinationDeck;
        console.log("const", this.sharedDestinationDeck);
        document
            .getElementById("destination-deck-hidden-pile")
            .addEventListener("click", function () { return _this.game.drawDestinations(); });
        /*for (let i = 1; i <= SPOTS_COUNT; i++) {
            this.visibleCardsSpots[i] = new VisibleCardSpot(game, i);
        }*/
        //console.log("new TrainCarSelection", visibleCards);
        this.visibleCards = Object.values(visibleCards);
        //	this.setNewCardsOnTable(visibleCards, false);
        this.setNewSharedCardsOnTable(visibleCards, false);
        this.destinationGauge = new Gauge("destination-deck-hidden-pile", "destination", destinationDeckMaxCount);
        this.setDestinationCount(destinationDeckCount);
    }
    /**
     * Set selection of hidden cards deck.
     */
    TrainCarSelection.prototype.setSelectableTopDeck = function (selectable, number) {
        if (number === void 0) { number = 0; }
        /*dojo.toggleClass(
            "train-car-deck-hidden-pile",
            "selectable",
            selectable
        );*/
    };
    /**
     * Set selectable visible cards (locomotive can't be selected if 1 visible card has been picked).
     */
    TrainCarSelection.prototype.setSelectableVisibleCards = function (availableVisibleCards) {
        for (var i = 1; i <= SPOTS_COUNT; i++) {
            /*this.visibleCardsSpots[i].setSelectableVisibleCards(
                availableVisibleCards
            );*/
        }
    };
    /**
     * Reset visible cards state.
     */
    TrainCarSelection.prototype.removeSelectableVisibleCards = function () {
        for (var i = 1; i <= SPOTS_COUNT; i++) {
            /*this.visibleCardsSpots[i].removeSelectableVisibleCards();*/
        }
    };
    /**
     * Set new visible cards.
     */
    TrainCarSelection.prototype.setNewCardsOnTable = function (spotsCards, fromDeck) {
        Object.keys(spotsCards).forEach(function (spot) {
            var card = spotsCards[spot];
            /*this.visibleCardsSpots[spot].setNewCardOnTable(card, fromDeck);*/
        });
    };
    /**
     * Set new visible cards.
     */
    TrainCarSelection.prototype.setNewSharedCardsOnTable = function (spotsCards, fromDeck) {
        this.sharedDestinationDeck.setCards(spotsCards);
        this.game.showSharedDestinations(spotsCards);
    };
    /**
     * Update destination gauge.
     */
    TrainCarSelection.prototype.setDestinationCount = function (count) {
        this.destinationGauge.setCount(count);
        document.getElementById("destination-deck-level").dataset.level = "".concat(Math.min(10, Math.ceil(count / 10)));
    };
    /**
     * Get HTML Element represented by "origin" (0 means invisible, 1 to 5 are visible cards).
     */
    TrainCarSelection.prototype.getStockElement = function (origin) {
        return origin === 0
            ? document.getElementById("train-car-deck-hidden-pile")
            : document.getElementById("visible-train-cards-stock".concat(origin));
    };
    /**
     * Animation when train car cards are picked by another player.
     */
    TrainCarSelection.prototype.moveTrainCarCardToPlayerBoard = function (playerId, from, number) {
        var _this = this;
        if (number === void 0) { number = 1; }
        if (from > 0) {
            /*this.visibleCardsSpots[from].moveTrainCarCardToPlayerBoard(
                playerId
            );*/
        }
        else {
            var _loop_1 = function (i) {
                setTimeout(function () {
                    dojo.place("\n                    <div id=\"animated-train-car-card-0-".concat(i, "\" class=\"animated train-car-card from-hidden-pile\"></div>\n                    "), document.getElementById("train-car-deck-hidden-pile"));
                    animateCardToCounterAndDestroy(_this.game, "animated-train-car-card-0-".concat(i), "train-car-card-counter-".concat(playerId, "-wrapper"));
                }, 200 * i);
            };
            for (var i = 0; i < number; i++) {
                _loop_1(i);
            }
        }
    };
    /**
     * Animation when destination cards are picked by another player.
     */
    TrainCarSelection.prototype.moveDestinationCardToPlayerBoard = function (playerId, number) {
        var _this = this;
        var _loop_2 = function (i) {
            setTimeout(function () {
                dojo.place("\n                <div id=\"animated-destination-card-".concat(i, "\" class=\"animated-destination-card\"></div>\n                "), "destination-deck-hidden-pile");
                animateCardToCounterAndDestroy(_this.game, "animated-destination-card-".concat(i), "destinations-counter-".concat(playerId, "-wrapper"));
            }, 200 * i);
        };
        for (var i = 0; i < number; i++) {
            _loop_2(i);
        }
    };
    /**
     * List visible cards colors.
     */
    TrainCarSelection.prototype.getVisibleColors = function () {
        /*return this.visibleCardsSpots.map((stock) => stock.getVisibleColor());//*/
        return [2];
    };
    /**
     * Animate the 3 visible locomotives (bump) before they are replaced.
     */
    TrainCarSelection.prototype.highlightVisibleLocomotives = function () {
        /*	this.visibleCardsSpots
            .filter((stock) => stock.getVisibleColor() === 0)
            .forEach((stock) => {
                const cardDiv = stock.getCardDiv();
                if (cardDiv) {
                    cardDiv.classList.remove("highlight-locomotive");
                    cardDiv.classList.add("highlight-locomotive");
                }
            });*/
    };
    /**
     * Show the 3 cards drawn for the tunnel claim. Clear them if called with empty array.
     */
    TrainCarSelection.prototype.showTunnelCards = function (tunnelCards) {
        if (tunnelCards === null || tunnelCards === void 0 ? void 0 : tunnelCards.length) {
            dojo.place("<div id=\"tunnel-cards\"></div>", "train-car-deck-hidden-pile");
            tunnelCards.forEach(function (card, index) {
                dojo.place("<div id=\"tunnel-card-".concat(index, "\" class=\"train-car-card tunnel-card animated\" data-color=\"").concat(card.type, "\"></div>"), "tunnel-cards");
                var element = document.getElementById("tunnel-card-".concat(index));
                setTimeout(function () {
                    return (element.style.transform = "translateY(".concat(55 * (index - 1), "px) scale(0.33)"));
                });
            });
        }
        else {
            this.game.fadeOutAndDestroy("tunnel-cards");
            //document.getElementById('tunnel-cards')?.remove();
        }
    };
    return TrainCarSelection;
}());
/**
 * Player table : destination cards.
 */
var PlayerTable = /** @class */ (function () {
    function PlayerTable(game, player, destinations, completedDestinations) {
        var html = "\n            <div id=\"player-table\" class=\"player-table\">\n                <div id=\"player-table-".concat(player.id, "-destinations\" class=\"player-table-destinations\"></div>\n            </div>\n        ");
        dojo.place(html, 'resized');
        this.playerDestinations = new PlayerDestinations(game, player, destinations, completedDestinations);
    }
    /**
     * Place player table to the left or the bottom of the map.
     */
    PlayerTable.prototype.setPosition = function (left) {
        var playerHandDiv = document.getElementById("player-table");
        if (left) {
            document.getElementById('main-line').prepend(playerHandDiv);
        }
        else {
            document.getElementById('resized').appendChild(playerHandDiv);
        }
        playerHandDiv.classList.toggle('left', left);
    };
    PlayerTable.prototype.addDestinations = function (destinations, originStock) {
        this.playerDestinations.addDestinations(destinations, originStock);
    };
    PlayerTable.prototype.markDestinationComplete = function (destination, destinationRoutes) {
        this.playerDestinations.markDestinationComplete(destination, destinationRoutes);
    };
    return PlayerTable;
}());
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var IMAGE_ITEMS_PER_ROW = 10;
/**
 * Player's destination cards.
 */
var PlayerDestinations = /** @class */ (function () {
    function PlayerDestinations(game, player, destinations, completedDestinations) {
        var _this = this;
        this.game = game;
        /** Highlighted destination on the map */
        this.selectedDestination = null;
        /** Destinations in "to do" column */
        this.destinationsTodo = [];
        /** Destinations in "done" column */
        this.destinationsDone = [];
        this.playerId = Number(player.id);
        var html = "\n        <div id=\"player-table-".concat(player.id, "-destinations-todo\" class=\"player-table-destinations-column todo\"></div>\n        <div id=\"player-table-").concat(player.id, "-destinations-done\" class=\"player-table-destinations-column done\"></div>\n        ");
        dojo.place(html, "player-table-".concat(player.id, "-destinations"));
        this.addDestinations(destinations);
        destinations
            .filter(function (destination) {
            return completedDestinations.some(function (d) { return d.id == destination.id; });
        })
            .forEach(function (destination) {
            return _this.markDestinationComplete(destination);
        });
        // highlight the first "to do" destination
        this.activateNextDestination(this.destinationsTodo);
    }
    /**
     * Add destinations to player's hand.
     */
    PlayerDestinations.prototype.addDestinations = function (destinations, originStock) {
        var _a;
        var _this = this;
        destinations.forEach(function (destination) {
            var html = "\n            <div id=\"destination-card-".concat(destination.id, "\" class=\"destination-card\" style=\"").concat(getBackgroundInlineStyleForDestination(destination), "\"></div>\n            ");
            dojo.place(html, "player-table-".concat(_this.playerId, "-destinations-todo"));
            var card = document.getElementById("destination-card-".concat(destination.id));
            setupDestinationCardDiv(card, destination.type * 100 + destination.type_arg);
            card.addEventListener("click", function () {
                return _this.game.revealDestination(destination);
            });
            // highlight destination's cities on the map, on mouse over
            card.addEventListener("mouseenter", function () {
                return _this.game.setHighligthedDestination(destination);
            });
            card.addEventListener("mouseleave", function () {
                return _this.game.setHighligthedDestination(null);
            });
            if (originStock) {
                _this.addAnimationFrom(card, document.getElementById("".concat(originStock.container_div.id, "_item_").concat(destination.id)));
            }
        });
        originStock === null || originStock === void 0 ? void 0 : originStock.removeAll();
        (_a = this.destinationsTodo).push.apply(_a, destinations);
        this.destinationColumnsUpdated();
    };
    /**
     * Mark destination as complete (place it on the "complete" column).
     */
    PlayerDestinations.prototype.markDestinationCompleteNoAnimation = function (destination) {
        var index = this.destinationsTodo.findIndex(function (d) { return d.id == destination.id; });
        if (index !== -1) {
            this.destinationsTodo.splice(index, 1);
        }
        this.destinationsDone.push(destination);
        document
            .getElementById("player-table-".concat(this.playerId, "-destinations-done"))
            .appendChild(document.getElementById("destination-card-".concat(destination.id)));
        this.destinationColumnsUpdated();
    };
    /**
     * Add an animation to mark a destination as complete.
     */
    PlayerDestinations.prototype.markDestinationCompleteAnimation = function (destination, destinationRoutes) {
        var _this = this;
        var newDac = new DestinationCompleteAnimation(this.game, destination, destinationRoutes, "destination-card-".concat(destination.id), "destination-card-".concat(destination.id), {
            start: function (d) {
                return document
                    .getElementById("destination-card-".concat(d.id))
                    .classList.add("hidden-for-animation");
            },
            change: function (d) { return _this.markDestinationCompleteNoAnimation(d); },
            end: function (d) {
                return document
                    .getElementById("destination-card-".concat(d.id))
                    .classList.remove("hidden-for-animation");
            },
        }, "completed");
        this.game.addAnimation(newDac);
    };
    /**
     * Mark a destination as complete.
     */
    PlayerDestinations.prototype.markDestinationComplete = function (destination, destinationRoutes) {
        if (destinationRoutes &&
            !(document.visibilityState === "hidden" ||
                this.game.instantaneousMode)) {
            this.markDestinationCompleteAnimation(destination, destinationRoutes);
        }
        else {
            this.markDestinationCompleteNoAnimation(destination);
        }
    };
    /**
     * Highlight another destination.
     */
    PlayerDestinations.prototype.activateNextDestination = function (destinationList) {
        var _this = this;
        var oldSelectedDestination = this.selectedDestination;
        if (this.selectedDestination &&
            destinationList.some(function (d) { return d.id == _this.selectedDestination.id; }) &&
            destinationList.length > 1) {
            destinationList.splice.apply(destinationList, __spreadArray([destinationList.length,
                0], destinationList.splice(0, 1), false));
        }
        this.selectedDestination = destinationList[0];
        this.game.setActiveDestination(this.selectedDestination, oldSelectedDestination);
        document
            .getElementById("player-table-".concat(this.playerId, "-destinations-todo"))
            .classList.toggle("front", destinationList == this.destinationsTodo);
        document
            .getElementById("player-table-".concat(this.playerId, "-destinations-done"))
            .classList.toggle("front", destinationList == this.destinationsDone);
        this.destinationColumnsUpdated();
    };
    /**
     * Update destination cards placement when there is a change.
     */
    PlayerDestinations.prototype.destinationColumnsUpdated = function () {
        var doubleColumn = this.destinationsTodo.length > 0 &&
            this.destinationsDone.length > 0;
        var destinationsDiv = document.getElementById("player-table-".concat(this.playerId, "-destinations"));
        var maxBottom = Math.max(this.placeCards(this.destinationsTodo, doubleColumn ? DESTINATION_CARD_SHIFT : 0), this.placeCards(this.destinationsDone));
        /* const height = `${maxBottom + CARD_HEIGHT}px`;
        destinationsDiv.style.height = height;
        document.getElementById(`player-table-${this.playerId}-train-cars`).style.height = height;
*/
        /*	const col1 = document.getElementById(
                `player-table-${this.playerId}-destinations-todo`
            );
            const col2 = document.getElementById(
                `player-table-${this.playerId}-destinations-todo`
            );
            const destinationCount =
                this.destinationsTodo.length + this.destinationsDone.length;
            col1.style.width =
                (this.destinationsTodo.length * 100 / destinationCount) + "%";
            col2.style.width =
                (this.destinationsDone.length * 100) / destinationCount + "%";*/
        this.game.setDestinationsToConnect(this.destinationsTodo);
    };
    /**
     * Place cards on a column.
     */
    PlayerDestinations.prototype.placeCards = function (list, originalBottom) {
        if (originalBottom === void 0) { originalBottom = 0; }
        var maxBottom = 0;
        list.forEach(function (destination, index) {
            var bottom = originalBottom + index * DESTINATION_CARD_SHIFT;
            var card = document.getElementById("destination-card-".concat(destination.id));
            card.parentElement.prepend(card);
            /*card.style.bottom = `${bottom}px`;

            if (bottom > maxBottom) {
                maxBottom = bottom;
            }*/
        });
        return maxBottom;
    };
    /**
     * Add an animation to the card (when it is created).
     */
    PlayerDestinations.prototype.addAnimationFrom = function (card, from) {
        if (document.visibilityState === "hidden" ||
            this.game.instantaneousMode) {
            return;
        }
        var destinationBR = card.getBoundingClientRect();
        var originBR = from.getBoundingClientRect();
        var deltaX = destinationBR.left - originBR.left;
        var deltaY = destinationBR.top - originBR.top;
        card.style.zIndex = "10";
        card.style.transition = "transform 0.5s linear";
        var zoom = this.game.getZoom();
        card.style.transform = "translate(".concat(-deltaX / zoom, "px, ").concat(-deltaY / zoom, "px)");
        setTimeout(function () { return (card.style.transform = null); });
        setTimeout(function () {
            card.style.zIndex = null;
            card.style.transition = null;
        }, 500);
    };
    return PlayerDestinations;
}());
var CROSSHAIR_SIZE = 20;
/**
 * Colored arrows.
 */
var Arrow = /** @class */ (function () {
    function Arrow(game, color) {
        this.game = game;
        this.route = null;
    }
    return Arrow;
}());
/**
 * End score board.
 * It will start empty, and notifications will update it and start animations one by one.
 */
var EndScore = /** @class */ (function () {
    function EndScore(game, players, 
    /** fromReload: if a player refresh when game is over, we skip animations (as there will be no notifications to animate the score board) */
    fromReload, 
    /** bestScore is the top score for the game, so progression shown as train moving forward is relative to best score */
    bestScore) {
        var _this = this;
        this.game = game;
        this.players = players;
        this.bestScore = bestScore;
        /** Player scores (key is player id) */
        this.scoreCounters = [];
        /** Unrevealed destinations counters (key is player id) */
        this.destinationCounters = [];
        /** Complete destinations counters (key is player id) */
        this.completedDestinationCounters = [];
        /** Uncomplete destinations counters (key is player id) */
        this.uncompletedDestinationCounters = [];
        players.forEach(function (player) {
            var playerId = Number(player.id);
            dojo.place("<tr id=\"score".concat(player.id, "\">\n                <td id=\"score-name-").concat(player.id, "\" class=\"player-name\" style=\"color: #").concat(player.color, "\">").concat(player.name, "<div id=\"bonus-card-icons-").concat(player.id, "\" class=\"bonus-card-icons\"></div></td>\n                <td id=\"destinations-score-").concat(player.id, "\" class=\"destinations\">\n                    <div class=\"icons-grid\">\n                        <div id=\"destination-counter-").concat(player.id, "\" class=\"icon destination-card\"></div>\n                        <div id=\"completed-destination-counter-").concat(player.id, "\" class=\"icon completed-destination\"></div>\n                        <div id=\"uncompleted-destination-counter-").concat(player.id, "\" class=\"icon uncompleted-destination\"></div>\n                    </div>\n                </td>\n                <td id=\"train-score-").concat(player.id, "\" class=\"train\">\n                    <div id=\"train-image-").concat(player.id, "\" class=\"train-image\" data-player-color=\"").concat(player.color, "\"></div>\n                </td>\n                <td id=\"end-score-").concat(player.id, "\" class=\"total\"></td>\n            </tr>"), 'score-table-body');
            var destinationCounter = new ebg.counter();
            destinationCounter.create("destination-counter-".concat(player.id));
            destinationCounter.setValue(fromReload ? 0 : _this.game.destinationCardCounters[player.id].getValue());
            _this.destinationCounters[playerId] = destinationCounter;
            var completedDestinationCounter = new ebg.counter();
            completedDestinationCounter.create("completed-destination-counter-".concat(player.id));
            completedDestinationCounter.setValue(fromReload ? player.completedDestinations.length : 0);
            _this.completedDestinationCounters[playerId] = completedDestinationCounter;
            var uncompletedDestinationCounter = new ebg.counter();
            uncompletedDestinationCounter.create("uncompleted-destination-counter-".concat(player.id));
            uncompletedDestinationCounter.setValue(fromReload ? player.uncompletedDestinations.length : 0);
            _this.uncompletedDestinationCounters[playerId] = uncompletedDestinationCounter;
            var scoreCounter = new ebg.counter();
            scoreCounter.create("end-score-".concat(player.id));
            scoreCounter.setValue(_this.game.getPlayerScore(playerId));
            _this.scoreCounters[playerId] = scoreCounter;
            _this.moveTrain(playerId);
        });
        // if we are at reload of end state, we display values, else we wait for notifications
        if (fromReload) {
            var longestPath_1 = Math.max.apply(Math, players.map(function (player) { return player.longestPathLength; }));
            this.setBestScore(bestScore);
            var maxCompletedDestinations_1 = players.map(function (player) { return player.completedDestinations.length; }).reduce(function (a, b) { return (a > b) ? a : b; }, 0);
            players.forEach(function (player) {
                if (Number(player.score) == bestScore) {
                    _this.highlightWinnerScore(player.id);
                }
                if (_this.game.isLongestPathBonusActive() && player.longestPathLength == longestPath_1) {
                    _this.setLongestPathWinner(player.id, longestPath_1);
                }
                if (_this.game.isGlobetrotterBonusActive() && player.completedDestinations.length == maxCompletedDestinations_1) {
                    _this.setGlobetrotterWinner(player.id, maxCompletedDestinations_1);
                }
                _this.updateDestinationsTooltip(player);
            });
        }
    }
    /**
     * Add golden highlight to top score player(s)
     */
    EndScore.prototype.highlightWinnerScore = function (playerId) {
        document.getElementById("score".concat(playerId)).classList.add('highlight');
        document.getElementById("score-name-".concat(playerId)).style.color = '';
    };
    /**
     * Save best score so we can move trains.
     */
    EndScore.prototype.setBestScore = function (bestScore) {
        var _this = this;
        this.bestScore = bestScore;
        this.players.forEach(function (player) { return _this.moveTrain(Number(player.id)); });
    };
    /**
     * Set score, and animate train to new score.
     */
    EndScore.prototype.setPoints = function (playerId, points) {
        this.scoreCounters[playerId].toValue(points);
        this.moveTrain(playerId);
    };
    /**
     * Move train to represent score progression.
     */
    EndScore.prototype.moveTrain = function (playerId) {
        var scorePercent = 100 * this.scoreCounters[playerId].getValue() / Math.max(50, this.bestScore);
        document.getElementById("train-image-".concat(playerId)).style.right = "".concat(100 - scorePercent, "%");
    };
    /**
     * Show score animation for a revealed destination.
     */
    EndScore.prototype.scoreDestination = function (playerId, destination, destinationRoutes, isFastEndScoring) {
        var _this = this;
        if (isFastEndScoring === void 0) { isFastEndScoring = false; }
        var state = destinationRoutes ? 'completed' : 'uncompleted';
        var endFunction = function () {
            (destinationRoutes ? _this.completedDestinationCounters : _this.uncompletedDestinationCounters)[playerId].incValue(1);
            _this.destinationCounters[playerId].incValue(-1);
            if (_this.destinationCounters[playerId].getValue() == 0) {
                document.getElementById("destination-counter-".concat(playerId)).classList.add('hidden');
            }
        };
        if (isFastEndScoring) {
            endFunction();
            return;
        }
        var newDac = new DestinationCompleteAnimation(this.game, destination, destinationRoutes, "destination-counter-".concat(playerId), "".concat(destinationRoutes ? 'completed' : 'uncompleted', "-destination-counter-").concat(playerId), {
            change: function () {
                playSound("ttr-".concat(destinationRoutes ? 'completed' : 'uncompleted', "-end"));
                _this.game.disableNextMoveSound();
            },
            end: endFunction,
        }, state, 0.15 / this.game.getZoom());
        this.game.addAnimation(newDac);
    };
    EndScore.prototype.updateDestinationsTooltip = function (player) {
        var _a, _b;
        var html = "<div class=\"destinations-flex\">\n            <div>\n                ".concat((_a = player.completedDestinations) === null || _a === void 0 ? void 0 : _a.map(function (destination) {
            return "<div class=\"destination-card completed\" style=\"".concat(getBackgroundInlineStyleForDestination(destination), "\"></div>");
        }), "\n            </div>\n            <div>\n                ").concat((_b = player.uncompletedDestinations) === null || _b === void 0 ? void 0 : _b.map(function (destination) {
            return "<div class=\"destination-card uncompleted\" style=\"".concat(getBackgroundInlineStyleForDestination(destination), "\"></div>");
        }), "\n            </div>\n        </div>");
        if (document.getElementById("destinations-score-".concat(player.id))) {
            this.game.setTooltip("destinations-score-".concat(player.id), html);
        }
    };
    /**
     * Show longest path animation for a player.
     */
    EndScore.prototype.showLongestPath = function (playerColor, routes, length, isFastEndScoring) {
        var _this = this;
        if (isFastEndScoring === void 0) { isFastEndScoring = false; }
        if (isFastEndScoring) {
            return;
        }
        var newDac = new LongestPathAnimation(this.game, routes, length, playerColor, {
            end: function () {
                playSound("ttr-longest-line-scoring");
                _this.game.disableNextMoveSound();
            }
        });
        this.game.addAnimation(newDac);
    };
    /**
     * Add Globetrotter badge to the Globetrotter winner(s).
     */
    EndScore.prototype.setGlobetrotterWinner = function (playerId, length) {
        dojo.place("<div id=\"globetrotter-bonus-card-".concat(playerId, "\" class=\"globetrotter bonus-card bonus-card-icon\"></div>"), "bonus-card-icons-".concat(playerId));
        this.game.setTooltip("globetrotter-bonus-card-".concat(playerId), "\n        <div><strong>".concat(/* TODO1910_*/ ('Most Completed Tickets'), " : ").concat(length, "</strong></div>\n        <div>").concat(/* TODO1910_*/ ('The player who completed the most Destination tickets receives this special bonus card and adds 15 points to his score.'), "</div>\n        <div class=\"globetrotter bonus-card\"></div>\n        "));
    };
    /**
     * Add longest path badge to the longest path winner(s).
     */
    EndScore.prototype.setLongestPathWinner = function (playerId, length) {
        dojo.place("<div id=\"longest-path-bonus-card-".concat(playerId, "\" class=\"longest-path bonus-card bonus-card-icon\"></div>"), "bonus-card-icons-".concat(playerId));
        this.game.setTooltip("longest-path-bonus-card-".concat(playerId), "\n        <div><strong>".concat(_('Longest path'), " : ").concat(length, "</strong></div>\n        <div>").concat(_('The player who has the Longest Continuous Path of routes receives this special bonus card and adds 10 points to his score.'), "</div>\n        <div class=\"longest-path bonus-card\"></div>\n        "));
    };
    return EndScore;
}());
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ANIMATION_MS = 500;
var SCORE_MS = 1500;
var isDebug = window.location.host == "studio.boardgamearena.com";
var log = isDebug ? console.log.bind(window.console) : function () { };
var ACTION_TIMER_DURATION = 8;
var Expeditions = /** @class */ (function () {
    function Expeditions() {
        this.playerTable = null;
        this.trainCarCounters = [];
        this.trainCarCardCounters = [];
        this.destinationCardCounters = [];
        this.animations = [];
        this.isTouch = window.matchMedia("(hover: none)").matches;
        this.routeToConfirm = null;
        this.actionTimerId = null;
        this.TOOLTIP_DELAY = document.body.classList.contains("touch-device")
            ? 1500
            : undefined;
    }
    /*
        setup:

        This method must set up the game user interface according to current game situation specified
        in parameters.

        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)

        "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
    */
    Expeditions.prototype.setup = function (gamedatas) {
        var _this = this;
        log("Starting game setup");
        this.gamedatas = gamedatas;
        log("gamedatas", gamedatas);
        this.map = new TtrMap(this, Object.values(gamedatas.players), gamedatas.claimedRoutes, this.getDestinationsByPlayer(this.gamedatas.revealedDestinations));
        this.destinationSelection = new DestinationSelection(this);
        this.sharedDestinations = new SharedDestinationDeck(this);
        this.trainCarSelection = new TrainCarSelection(this, gamedatas.visibleTrainCards, this.sharedDestinations, gamedatas.destinationDeckCount, gamedatas.destinationDeckMaxCount);
        var player = gamedatas.players[this.getPlayerId()];
        if (player) {
            this.playerTable = new PlayerTable(this, player, gamedatas.handDestinations, gamedatas.completedDestinations);
        }
        this.createPlayerPanels(gamedatas);
        if (gamedatas.lastTurn) {
            this.notif_lastTurn(false);
        }
        if (Number(gamedatas.gamestate.id) >= 90) {
            // score or end
            this.onEnteringEndScore(true);
        }
        this.setupNotifications();
        this.setupPreferences();
        this.onScreenWidthChange = function () { return _this.map.setAutoZoom(); };
        log("Ending game setup");
    };
    ///////////////////////////////////////////////////
    //// Game & client states
    // onEnteringState: this method is called each time we are entering into a new game state.
    //                  You can use this method to perform some user interface changes at this moment.
    //
    Expeditions.prototype.onEnteringState = function (stateName, args) {
        var _this = this;
        var _a, _b, _c;
        log("Entering state: " + stateName, args.args);
        switch (stateName) {
            case "privateChooseInitialDestinations":
            case "chooseInitialDestinations":
            case "chooseAdditionalDestinations":
                if (args === null || args === void 0 ? void 0 : args.args) {
                    var chooseDestinationsArgs = args.args;
                    var destinations = chooseDestinationsArgs.destinations ||
                        ((_a = chooseDestinationsArgs._private) === null || _a === void 0 ? void 0 : _a.destinations);
                    if (destinations && this.isCurrentPlayerActive()) {
                        destinations.forEach(function (destination) {
                            return _this.map.setSelectableDestination(destination, true);
                        });
                        this.destinationSelection.setCards(destinations);
                        this.destinationSelection.selectionChange();
                    }
                }
                break;
            case "revealDestination":
                if (args === null || args === void 0 ? void 0 : args.args) {
                    var revealDestinationArgs = args.args;
                    var possibleDestinations = (_b = revealDestinationArgs._private) === null || _b === void 0 ? void 0 : _b.possibleDestinations;
                    var allDestinations = (_c = revealDestinationArgs._private) === null || _c === void 0 ? void 0 : _c.allDestinations;
                    if (allDestinations &&
                        this.isCurrentPlayerActive()) {
                        possibleDestinations.forEach(function (destination) {
                            return _this.map.setSelectableDestination(destination, true);
                        });
                        this.destinationSelection.setCards(allDestinations);
                        this.destinationSelection.selectionChange();
                    }
                }
                break;
            case "chooseAction":
                this.onEnteringChooseAction(args.args);
                break;
            case "drawSecondCard":
                this.onEnteringDrawSecondCard(args.args);
                break;
            case "confirmTunnel":
                this.onEnteringConfirmTunnel(args.args);
                break;
            case "endScore":
                this.onEnteringEndScore();
                break;
        }
    };
    /**
     * Show selectable routes, and make train car draggable.
     */
    Expeditions.prototype.onEnteringChooseAction = function (args) {
        this.setGamestateDescription(args.canTakeTrainCarCards ? "" : "NoTrainCarsCards");
        var currentPlayerActive = this.isCurrentPlayerActive();
        this.trainCarSelection.setSelectableTopDeck(currentPlayerActive, args.maxHiddenCardsPick);
        this.map.setSelectableRoutes(currentPlayerActive, args.possibleRoutes);
    };
    /**
     * Allow to pick a second card (locomotives will be grayed).
     */
    Expeditions.prototype.onEnteringDrawSecondCard = function (args) {
        this.trainCarSelection.setSelectableTopDeck(this.isCurrentPlayerActive(), args.maxHiddenCardsPick);
        this.trainCarSelection.setSelectableVisibleCards(args.availableVisibleCards);
    };
    Expeditions.prototype.onEnteringConfirmTunnel = function (args) {
        var route = ROUTES.find(function (route) { return route.id == args.tunnelAttempt.routeId; });
        this.map.setHoveredRoute(route, true);
        this.trainCarSelection.showTunnelCards(args.tunnelAttempt.tunnelCards);
    };
    /**
     * Show score board.
     */
    Expeditions.prototype.onEnteringEndScore = function (fromReload) {
        if (fromReload === void 0) { fromReload = false; }
        var lastTurnBar = document.getElementById("last-round");
        if (lastTurnBar) {
            lastTurnBar.style.display = "none";
        }
        document.getElementById("score").style.display = "flex";
        this.endScore = new EndScore(this, Object.values(this.gamedatas.players), fromReload, this.gamedatas.bestScore);
    };
    // onLeavingState: this method is called each time we are leaving a game state.
    //                 You can use this method to perform some user interface changes at this moment.
    //
    Expeditions.prototype.onLeavingState = function (stateName) {
        log("Leaving state: " + stateName);
        switch (stateName) {
            case "revealDestination":
                this.map.setHighligthedDestination(null);
                break;
            case "privateChooseInitialDestinations":
            case "chooseInitialDestinations":
            case "chooseAdditionalDestinations":
                this.destinationSelection.hide();
                var mapDiv = document.getElementById("map");
                mapDiv
                    .querySelectorAll(".city[data-selectable]")
                    .forEach(function (city) {
                    return (city.dataset.selectable = "false");
                });
                mapDiv
                    .querySelectorAll(".city[data-selected]")
                    .forEach(function (city) { return (city.dataset.selected = "false"); });
                break;
            case "multiChooseInitialDestinations":
                Array.from(document.getElementsByClassName("player-turn-order")).forEach(function (elem) { return elem.remove(); });
                break;
            case "chooseAction":
                this.map.setSelectableRoutes(false, []);
                document
                    .getElementById("destination-deck-hidden-pile")
                    .classList.remove("selectable");
                Array.from(document.getElementsByClassName("train-car-group hide")).forEach(function (group) { return group.classList.remove("hide"); });
                break;
            case "drawSecondCard":
                this.trainCarSelection.removeSelectableVisibleCards();
                break;
            case "confirmTunnel":
                this.map.setHoveredRoute(null);
                this.trainCarSelection.showTunnelCards([]);
                break;
        }
    };
    // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
    //                        action status bar (ie: the HTML links in the status bar).
    //
    Expeditions.prototype.onUpdateActionButtons = function (stateName, args) {
        var _this = this;
        if (this.isCurrentPlayerActive()) {
            switch (stateName) {
                case "privateChooseInitialDestinations":
                    this.addActionButton("chooseInitialDestinations_button", _("Keep selected destinations"), function () { return _this.chooseInitialDestinations(); });
                    this.destinationSelection.selectionChange();
                    break;
                case "revealDestination":
                    this.addActionButton("revealDestination_button", _("Reveal this destination"), function () { return _this.doRevealDestination(); });
                    break;
                case "chooseAction":
                    var chooseActionArgs = args;
                    if (chooseActionArgs.maxDestinationsPick) {
                        document
                            .getElementById("destination-deck-hidden-pile")
                            .classList.add("selectable");
                    }
                    this.setActionBarChooseAction(false);
                    break;
                case "chooseAdditionalDestinations":
                    this.addActionButton("chooseAdditionalDestinations_button", _("Keep selected destinations"), function () { return _this.chooseAdditionalDestinations(); });
                    dojo.addClass("chooseAdditionalDestinations_button", "disabled");
                    break;
                case "confirmTunnel":
                    var confirmTunnelArgs = args;
                    var confirmLabel = 
                    /* TODO MAPS _*/ "Confirm tunnel claim" +
                        (confirmTunnelArgs.canPay
                            ? ""
                            : " (".concat(
                            /* TODO MAPS _*/ "You don't have enough cards", ")"));
                    this.addActionButton("claimTunnel_button", confirmLabel, function () { return _this.claimTunnel(); });
                    this.addActionButton("skipTunnel_button", 
                    /* TODO MAPS _*/ "Skip tunnel claim", function () { return _this.skipTunnel(); }, null, null, "gray");
                    if (!confirmTunnelArgs.canPay) {
                        dojo.addClass("claimTunnel_button", "disabled");
                    }
                    break;
            }
        }
    };
    ///////////////////////////////////////////////////
    //// Utility methods
    ///////////////////////////////////////////////////
    Expeditions.prototype.getDestinationsByPlayer = function (destinations) {
        var _this = this;
        var destinationsByPlayer = this.groupBy(destinations, function (p) { return p.location_arg; });
        var typedDestinationsByPlayer = new Map();
        Object.entries(destinationsByPlayer).forEach(function (e) {
            var playerId = e[0], destinations = e[1];
            typedDestinationsByPlayer.set(_this.gamedatas.players[playerId], destinations);
        });
        return typedDestinationsByPlayer;
    };
    Expeditions.prototype.groupBy = function (arr, fn) {
        return arr.reduce(function (prev, curr) {
            var _a;
            var groupKey = fn(curr);
            var group = prev[groupKey] || [];
            group.push(curr);
            return __assign(__assign({}, prev), (_a = {}, _a[groupKey] = group, _a));
        }, {});
    };
    Expeditions.prototype.isGlobetrotterBonusActive = function () {
        return this.gamedatas.isGlobetrotterBonusActive;
    };
    Expeditions.prototype.isLongestPathBonusActive = function () {
        return this.gamedatas.isLongestPathBonusActive;
    };
    Expeditions.prototype.setTooltip = function (id, html) {
        this.addTooltipHtml(id, html, this.TOOLTIP_DELAY);
    };
    Expeditions.prototype.setTooltipToClass = function (className, html) {
        this.addTooltipHtmlToClass(className, html, this.TOOLTIP_DELAY);
    };
    Expeditions.prototype.setGamestateDescription = function (property) {
        if (property === void 0) { property = ""; }
        var originalState = this.gamedatas.gamestates[this.gamedatas.gamestate.id];
        this.gamedatas.gamestate.description =
            originalState["description" + property];
        this.gamedatas.gamestate.descriptionmyturn =
            originalState["descriptionmyturn" + property];
        this.updatePageTitle();
    };
    /**
     * Handle user preferences changes.
     */
    Expeditions.prototype.setupPreferences = function () {
        var _this = this;
        // Extract the ID and value from the UI control
        var onchange = function (e) {
            var match = e.target.id.match(/^preference_[cf]ontrol_(\d+)$/);
            if (!match) {
                return;
            }
            var prefId = +match[1];
            var prefValue = +e.target.value;
            _this.prefs[prefId].value = prefValue;
            _this.onPreferenceChange(prefId, prefValue);
        };
        // Call onPreferenceChange() when any value changes
        dojo.query(".preference_control").connect("onchange", onchange);
        // Call onPreferenceChange() now
        dojo.forEach(dojo.query("#ingame_menu_content .preference_control"), function (el) { return onchange({ target: el }); });
    };
    /**
     * Handle user preferences changes.
     */
    Expeditions.prototype.onPreferenceChange = function (prefId, prefValue) {
        switch (prefId) {
            case 203:
                this.map.setOutline();
                break;
        }
    };
    Expeditions.prototype.isColorBlindMode = function () {
        var _a;
        return Number((_a = this.prefs[204]) === null || _a === void 0 ? void 0 : _a.value) === 1;
    };
    Expeditions.prototype.getPlayerId = function () {
        return Number(this.player_id);
    };
    Expeditions.prototype.getPlayerScore = function (playerId) {
        var _a, _b;
        return ((_b = (_a = this.scoreCtrl[playerId]) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : Number(this.gamedatas.players[playerId].score));
    };
    Expeditions.prototype.isDoubleRouteForbidden = function () {
        return Object.values(this.gamedatas.players).length <= 3;
    };
    /**
     * Place counters on player panels.
     */
    Expeditions.prototype.createPlayerPanels = function (gamedatas) {
        var _this = this;
        Object.values(gamedatas.players).forEach(function (player) {
            var playerId = Number(player.id);
            document.getElementById("overall_player_board_".concat(player.id)).dataset.playerColor = player.color;
            // public counters
            dojo.place("<div class=\"counters\">\n                <div id=\"train-car-counter-".concat(player.id, "-wrapper\" class=\"counter train-car-counter\">\n                    <div class=\"icon train\" data-player-color=\"").concat(player.color, "\" data-color-blind-player-no=\"").concat(player.playerNo, "\"></div> \n                    <span id=\"train-car-counter-").concat(player.id, "\"></span>\n                </div>\n                <div id=\"train-car-card-counter-").concat(player.id, "-wrapper\" class=\"counter train-car-card-counter\">\n                    <div class=\"icon train-car-card-icon\"></div> \n                    <span id=\"train-car-card-counter-").concat(player.id, "\"></span>\n                </div>\n                <div id=\"destinations-counter-").concat(player.id, "-wrapper\" class=\"counter destinations-counter\">\n                    <div class=\"icon destination-card\"></div> \n                    <span id=\"completed-destinations-counter-").concat(player.id, "\">").concat(_this.getPlayerId() !== playerId ? "?" : "", "</span>/<span id=\"destination-card-counter-").concat(player.id, "\"></span>\n                </div>\n            </div>"), "player_board_".concat(player.id));
            var trainCarCounter = new ebg.counter();
            trainCarCounter.create("train-car-counter-".concat(player.id));
            trainCarCounter.setValue(player.remainingTrainCarsCount);
            _this.trainCarCounters[playerId] = trainCarCounter;
            var trainCarCardCounter = new ebg.counter();
            trainCarCardCounter.create("train-car-card-counter-".concat(player.id));
            trainCarCardCounter.setValue(player.trainCarsCount);
            _this.trainCarCardCounters[playerId] = trainCarCardCounter;
            var destinationCardCounter = new ebg.counter();
            destinationCardCounter.create("destination-card-counter-".concat(player.id));
            destinationCardCounter.setValue(player.destinationsCount);
            _this.destinationCardCounters[playerId] = destinationCardCounter;
            // private counters
            if (_this.getPlayerId() === playerId) {
                _this.completedDestinationsCounter = new ebg.counter();
                _this.completedDestinationsCounter.create("completed-destinations-counter-".concat(player.id));
                _this.completedDestinationsCounter.setValue(gamedatas.completedDestinations.length);
            }
            if (gamedatas.showTurnOrder && gamedatas.gamestate.id < 30) {
                // don't show turn order if game is already started (refresh or TB game)
                dojo.place("<div class=\"player-turn-order\">".concat(_("Player ${number}").replace("${number}", "<strong>".concat(player.playerNo, "</strong>")), "</div>"), "player_board_".concat(player.id));
            }
        });
        this.setTooltipToClass("train-car-counter", _("Remaining train cars"));
        this.setTooltipToClass("train-car-card-counter", _("Train cars cards"));
        this.setTooltipToClass("destinations-counter", _("Completed / Total destination cards"));
    };
    /**
     * Update player score.
     */
    Expeditions.prototype.setPoints = function (playerId, points) {
        var _a;
        (_a = this.scoreCtrl[playerId]) === null || _a === void 0 ? void 0 : _a.toValue(points);
    };
    /**
     * Highlight active destination.
     */
    Expeditions.prototype.setActiveDestination = function (destination, previousDestination) {
        if (previousDestination === void 0) { previousDestination = null; }
        this.map.setActiveDestination(destination, previousDestination);
    };
    /**
     * Check if a route can be claimed with dragged cards.
     */
    Expeditions.prototype.canClaimRoute = function (route, cardsColor) {
        return ((route.color == 0 ||
            cardsColor == 0 ||
            route.color == cardsColor) &&
            this.gamedatas.gamestate.args.possibleRoutes.some(function (pr) { return pr.id == route.id; }));
    };
    /**
     * Highlight destination (on destination mouse over).
     */
    Expeditions.prototype.setHighligthedDestination = function (destination) {
        this.map.setHighligthedDestination(destination);
    };
    /**
     * Sets or remove a player marker on the destination.
     */
    Expeditions.prototype.revealDestination = function (destination) {
        if (!this.isCurrentPlayerActive()) {
            return;
        }
        this.destinationToReveal == destination
            ? (this.destinationToReveal = null)
            : (this.destinationToReveal = destination);
        this.map.setHighligthedDestination(destination);
        this.map.revealDestination(this.getCurrentPlayer(), destination);
    };
    /**
     * Sets a player marker on the destination.
     */
    Expeditions.prototype.showRevealedDestination = function (player, destination) {
        if (player.id != this.getCurrentPlayer().id) {
            this.map.setHighligthedDestination(destination);
            this.map.revealDestination(player, destination);
        }
    };
    Expeditions.prototype.showSharedDestinations = function (destinations) {
        this.map.showSharedDestinations(destinations);
    };
    /**
     * Highlight cities of selected destination.
     */
    Expeditions.prototype.setSelectedDestination = function (destination, visible) {
        this.map.setSelectedDestination(destination, visible);
    };
    /**
     * Highlight cities player must connect for its objectives.
     */
    Expeditions.prototype.setDestinationsToConnect = function (destinations) {
        this.map.setDestinationsToConnect(destinations);
    };
    /**
     * Place player table to the left or the bottom of the map.
     */
    Expeditions.prototype.setPlayerTablePosition = function (left) {
        var _a;
        (_a = this.playerTable) === null || _a === void 0 ? void 0 : _a.setPosition(left);
    };
    /**
     * Get current zoom.
     */
    Expeditions.prototype.getZoom = function () {
        return this.map.getZoom();
    };
    /**
     * Get current player.
     */
    Expeditions.prototype.getCurrentPlayer = function () {
        return this.gamedatas.players[this.getPlayerId()];
    };
    /**
     * Add an animation to the animation queue, and start it if there is no current animations.
     */
    Expeditions.prototype.addAnimation = function (animation) {
        this.animations.push(animation);
        if (this.animations.length === 1) {
            this.animations[0].animate();
        }
    };
    /**
     * Start the next animation in animation queue.
     */
    Expeditions.prototype.endAnimation = function (ended) {
        var index = this.animations.indexOf(ended);
        if (index !== -1) {
            this.animations.splice(index, 1);
        }
        if (this.animations.length >= 1) {
            this.animations[0].animate();
        }
    };
    Expeditions.prototype.selectedColorChanged = function (selectedColor) {
        if (!this.isCurrentPlayerActive() ||
            this.gamedatas.gamestate.name !== "chooseAction") {
            return;
        }
        var args = this.gamedatas.gamestate.args;
        if (selectedColor === null || selectedColor === 0) {
            this.map.setSelectableRoutes(true, args.possibleRoutes);
        }
        else {
            this.map.setSelectableRoutes(true, args.possibleRoutes.filter(function (route) {
                return route.color === selectedColor || route.color === 0;
            }));
        }
    };
    /**
     * Handle route click.
     */
    Expeditions.prototype.clickedRoute = function (route, needToCheckDoubleRoute) {
        if (!this.isCurrentPlayerActive()) {
            return;
        }
        if (needToCheckDoubleRoute === undefined) {
            needToCheckDoubleRoute = this.askDoubleRouteActive();
        }
        var otherRoute = ROUTES.find(function (r) { return route.from == r.from && route.to == r.to && route.id != r.id; });
        if (!this.canClaimRoute(route, 0)) {
            return;
        }
        document
            .querySelectorAll("[id^=\"claimRouteWithColor_button\"]")
            .forEach(function (button) { return button.parentElement.removeChild(button); });
        /*
        const selectedColor = this.playerTable.getSelectedColor();

        if (selectedColor !== null) {
            this.askRouteClaimConfirmation(route, selectedColor);
        } else {
            const possibleColors: number[] =
                this.playerTable?.getPossibleColors(route) || [];

            if (possibleColors.length == 1) {
                this.askRouteClaimConfirmation(route, possibleColors[0]);
            } else if (possibleColors.length > 1) {
                possibleColors.forEach((color) => {
                    const label = dojo.string.substitute(_("Use ${color}"), {
                        color: `<div class="train-car-color icon" data-color="${color}"></div> ${getColor(
                            color,
                            "train-car"
                        )}`,
                    });
                    (this as any).addActionButton(
                        `claimRouteWithColor_button${color}`,
                        label,
                        () => this.askRouteClaimConfirmation(route, color)
                    );
                });

                this.playerTable.setSelectableTrainCarColors(
                    route,
                    possibleColors
                );
            }
        }*/
    };
    /**
     * Timer for Confirm button
     */
    Expeditions.prototype.startActionTimer = function (buttonId, time) {
        var _this = this;
        var _a;
        if (this.actionTimerId) {
            window.clearInterval(this.actionTimerId);
        }
        if (Number((_a = this.prefs[207]) === null || _a === void 0 ? void 0 : _a.value) == 2) {
            return false;
        }
        var button = document.getElementById(buttonId);
        var _actionTimerLabel = button.innerHTML;
        var _actionTimerSeconds = time;
        var actionTimerFunction = function () {
            var button = document.getElementById(buttonId);
            if (button == null) {
                window.clearInterval(_this.actionTimerId);
            }
            else if (_actionTimerSeconds-- > 1) {
                button.innerHTML =
                    _actionTimerLabel + " (" + _actionTimerSeconds + ")";
            }
            else {
                window.clearInterval(_this.actionTimerId);
                button.click();
            }
        };
        actionTimerFunction();
        this.actionTimerId = window.setInterval(function () { return actionTimerFunction(); }, 1000);
    };
    Expeditions.prototype.setChooseActionGamestateDescription = function (newText) {
        if (!this.originalTextChooseAction) {
            this.originalTextChooseAction =
                document.getElementById("pagemaintitletext").innerHTML;
        }
        document.getElementById("pagemaintitletext").innerHTML =
            newText !== null && newText !== void 0 ? newText : this.originalTextChooseAction;
    };
    /**
     * Sets the action bar (title and buttons) for Choose action.
     */
    Expeditions.prototype.setActionBarChooseAction = function (fromCancel) {
        var _this = this;
        document.getElementById("generalactions").innerHTML = "";
        if (fromCancel) {
            this.setChooseActionGamestateDescription();
        }
        if (this.actionTimerId) {
            window.clearInterval(this.actionTimerId);
        }
        var chooseActionArgs = this.gamedatas.gamestate
            .args;
        this.addActionButton("drawDestinations_button", dojo.string.substitute(_("Draw ${number} destination tickets"), {
            number: chooseActionArgs.maxDestinationsPick,
        }), function () { return _this.drawDestinations(); }, null, null, "red");
        dojo.toggleClass("drawDestinations_button", "disabled", !chooseActionArgs.maxDestinationsPick);
        if (chooseActionArgs.canPass) {
            this.addActionButton("pass_button", _("Pass"), function () {
                return _this.pass();
            });
        }
    };
    /**
     * Check if player should be asked for the color he wants when he clicks on a double route.
     */
    Expeditions.prototype.askDoubleRouteActive = function () {
        var _a;
        var preferenceValue = Number((_a = this.prefs[209]) === null || _a === void 0 ? void 0 : _a.value);
        return preferenceValue === 1;
    };
    Expeditions.prototype.getCityName = function (cityId) {
        return CITIES_NAMES[cityId - 100];
    };
    /**
     * Apply destination selection (initial objectives).
     */
    Expeditions.prototype.chooseInitialDestinations = function () {
        if (!this.checkAction("chooseInitialDestinations")) {
            return;
        }
        var destinationsIds = this.destinationSelection.getSelectedDestinationsIds();
        this.takeAction("chooseInitialDestinations", {
            destinationsIds: destinationsIds.join(","),
        });
    };
    /**
     * Apply destination reveal.
     */
    Expeditions.prototype.doRevealDestination = function () {
        if (!this.checkAction("revealDestination")) {
            return;
        }
        if (this.destinationToReveal) {
            this.takeAction("revealDestination", {
                destinationId: this.destinationToReveal.id,
            });
        }
    };
    /**
     * Pick destinations.
     */
    Expeditions.prototype.drawDestinations = function () {
        var _this = this;
        var _a;
        if (!this.checkAction("drawDestinations")) {
            return;
        }
        var confirmation = ((_a = this.prefs[206]) === null || _a === void 0 ? void 0 : _a.value) !== 2;
        if (confirmation && this.gamedatas.gamestate.args.maxDestinationsPick) {
            this.confirmationDialog(_("Are you sure you want to take new destinations?"), function () {
                _this.takeAction("drawDestinations");
            });
        }
        else {
            this.takeAction("drawDestinations");
        }
    };
    /**
     * Apply destination selection (additional objectives).
     */
    Expeditions.prototype.chooseAdditionalDestinations = function () {
        if (!this.checkAction("chooseAdditionalDestinations")) {
            return;
        }
        var destinationsIds = this.destinationSelection.getSelectedDestinationsIds();
        this.takeAction("chooseAdditionalDestinations", {
            destinationsIds: destinationsIds.join(","),
        });
    };
    /**
     * Pick hidden train car(s).
     */
    Expeditions.prototype.onHiddenTrainCarDeckClick = function (number) {
        var action = this.gamedatas.gamestate.name === "drawSecondCard"
            ? "drawSecondDeckCard"
            : "drawDeckCards";
        if (!this.checkAction(action)) {
            return;
        }
        this.takeAction(action, {
            number: number,
        });
    };
    /**
     * Pick visible train car.
     */
    Expeditions.prototype.onVisibleTrainCarCardClick = function (id) {
        var action = this.gamedatas.gamestate.name === "drawSecondCard"
            ? "drawSecondTableCard"
            : "drawTableCard";
        if (!this.checkAction(action)) {
            return;
        }
        this.takeAction(action, {
            id: id,
        });
    };
    /**
     * Claim a route.
     */
    Expeditions.prototype.claimRoute = function (routeId, color) {
        if (!this.checkAction("claimRoute")) {
            return;
        }
        this.takeAction("claimRoute", {
            routeId: routeId,
            color: color,
        });
    };
    /**
     * Pass (in case of no possible action).
     */
    Expeditions.prototype.pass = function () {
        if (!this.checkAction("pass")) {
            return;
        }
        this.takeAction("pass");
    };
    /**
     * Claim a tunnel (confirm paying extra cost).
     */
    Expeditions.prototype.claimTunnel = function () {
        if (!this.checkAction("claimTunnel")) {
            return;
        }
        this.takeAction("claimTunnel");
    };
    /**
     * Skip a tunnel (deny paying extra cost).
     */
    Expeditions.prototype.skipTunnel = function () {
        if (!this.checkAction("skipTunnel")) {
            return;
        }
        this.takeAction("skipTunnel");
    };
    Expeditions.prototype.takeAction = function (action, data) {
        data = data || {};
        data.lock = true;
        this.ajaxcall("/expeditions/expeditions/".concat(action, ".html"), data, this, function () { });
    };
    Expeditions.prototype.isFastEndScoring = function () {
        var _a;
        return Number((_a = this.prefs[208]) === null || _a === void 0 ? void 0 : _a.value) == 2;
    };
    ///////////////////////////////////////////////////
    //// Reaction to cometD notifications
    /*
        setupNotifications:

        In this method, you associate each of your game notifications with your local method to handle it.

        Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                your azul.game.php file.

    */
    Expeditions.prototype.setupNotifications = function () {
        //log( 'notifications subscriptions setup' );
        var _this = this;
        var skipEndOfGameAnimations = this.isFastEndScoring();
        var notifs = [
            ["newCardsOnTable", ANIMATION_MS],
            ["claimedRoute", ANIMATION_MS],
            ["destinationCompleted", ANIMATION_MS],
            ["points", 1],
            ["destinationsPicked", 1],
            //["trainCarPicked", ANIMATION_MS],
            ["freeTunnel", 2000],
            ["highlightVisibleLocomotives", 1000],
            ["notEnoughTrainCars", 1],
            ["lastTurn", 1],
            ["bestScore", 1],
            ["destinationRevealed", 1],
            ["scoreDestination", skipEndOfGameAnimations ? 1 : 2000],
            ["longestPath", skipEndOfGameAnimations ? 1 : 2000],
            ["longestPathWinner", skipEndOfGameAnimations ? 1 : 1500],
            ["globetrotterWinner", skipEndOfGameAnimations ? 1 : 1500],
            ["highlightWinnerScore", 1],
        ];
        notifs.forEach(function (notif) {
            dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
            _this.notifqueue.setSynchronous(notif[0], notif[1]);
        });
        /*(this as any).notifqueue.setIgnoreNotificationCheck(
            "trainCarPicked",
            (notif: Notif<NotifTrainCarsPickedArgs>) =>
                notif.args.playerId == this.getPlayerId() && !notif.args.cards
        );*/
    };
    /**
     * Update player score.
     */
    Expeditions.prototype.notif_points = function (notif) {
        var _a;
        this.setPoints(notif.args.playerId, notif.args.points);
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.setPoints(notif.args.playerId, notif.args.points);
    };
    /**
     * Update player score.
     */
    Expeditions.prototype.notif_destinationRevealed = function (notif) {
        this.showRevealedDestination(this.gamedatas.players[notif.args.playerId], notif.args.destination);
    };
    /**
     * Update player destinations.
     */
    Expeditions.prototype.notif_destinationsPicked = function (notif) {
        var _a, _b;
        this.destinationCardCounters[notif.args.playerId].incValue(notif.args.number);
        var destinations = (_b = (_a = notif.args._private) === null || _a === void 0 ? void 0 : _a[this.getPlayerId()]) === null || _b === void 0 ? void 0 : _b.destinations;
        if (destinations) {
            this.playerTable.addDestinations(destinations, this.destinationSelection.destinations);
        }
        else {
            this.trainCarSelection.moveDestinationCardToPlayerBoard(notif.args.playerId, notif.args.number);
        }
        this.trainCarSelection.setDestinationCount(notif.args.remainingDestinationsInDeck);
    };
    /**
     * Update visible cards.
     */
    Expeditions.prototype.notif_newCardsOnTable = function (notif) {
        if (notif.args.locomotiveRefill) {
            playSound("ttr-clear-train-car-cards");
            this.disableNextMoveSound();
        }
        this.trainCarSelection.setNewCardsOnTable(notif.args.spotsCards, true);
    };
    /**
     * Animate the 3 visible locomotives (bump) before they are replaced.
     */
    Expeditions.prototype.notif_highlightVisibleLocomotives = function () {
        this.trainCarSelection.highlightVisibleLocomotives();
    };
    /**
     * Update claimed routes.
     */
    Expeditions.prototype.notif_claimedRoute = function (notif) {
        var playerId = notif.args.playerId;
        var route = notif.args.route;
        this.trainCarCardCounters[playerId].incValue(-route.number);
        this.trainCarCounters[playerId].incValue(-route.number);
        this.map.setClaimedRoutes([
            {
                playerId: playerId,
                routeId: route.id,
            },
        ], playerId);
    };
    /**
     * Mark a destination as complete.
     */
    Expeditions.prototype.notif_destinationCompleted = function (notif) {
        var destination = notif.args.destination;
        this.completedDestinationsCounter.incValue(1);
        this.gamedatas.completedDestinations.push(destination);
        this.playerTable.markDestinationComplete(destination, notif.args.destinationRoutes);
        playSound("ttr-completed-in-game");
        this.disableNextMoveSound();
    };
    /**
     * Show the 3 cards when attempting a tunnel (case withno extra cards required, play automatically).
     */
    Expeditions.prototype.notif_freeTunnel = function (notif) {
        var _this = this;
        if (document.visibilityState !== "hidden" &&
            !this.instantaneousMode) {
            this.trainCarSelection.showTunnelCards(notif.args.tunnelCards);
            setTimeout(function () { return _this.trainCarSelection.showTunnelCards([]); }, 2000);
        }
    };
    /**
     * Show an error message and animate train car counter to show the player can't take the route because he doesn't have enough train cars left.
     */
    Expeditions.prototype.notif_notEnoughTrainCars = function () { };
    /**
     * Show last turn banner.
     */
    Expeditions.prototype.notif_lastTurn = function (animate) {
        if (animate === void 0) { animate = true; }
        dojo.place("<div id=\"last-round\">\n            <span class=\"last-round-text ".concat(animate ? "animate" : "", "\">").concat(_("This is the final round!"), "</span>\n        </div>"), "page-title");
    };
    /**
     * Save best score for end score animations.
     */
    Expeditions.prototype.notif_bestScore = function (notif) {
        var _a;
        this.gamedatas.bestScore = notif.args.bestScore;
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.setBestScore(notif.args.bestScore);
    };
    /**
     * Animate a destination for end score.
     */
    Expeditions.prototype.notif_scoreDestination = function (notif) {
        var _a, _b, _c;
        var playerId = notif.args.playerId;
        var player = this.gamedatas.players[playerId];
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.scoreDestination(playerId, notif.args.destination, notif.args.destinationRoutes, this.isFastEndScoring());
        if (notif.args.destinationRoutes) {
            player.completedDestinations.push(notif.args.destination);
        }
        else {
            player.uncompletedDestinations.push(notif.args.destination);
            (_b = document
                .getElementById("destination-card-".concat(notif.args.destination.id))) === null || _b === void 0 ? void 0 : _b.classList.add("uncompleted");
        }
        (_c = this.endScore) === null || _c === void 0 ? void 0 : _c.updateDestinationsTooltip(player);
    };
    /**
     * Add Globetrotter badge for end score.
     */
    Expeditions.prototype.notif_globetrotterWinner = function (notif) {
        var _a;
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.setGlobetrotterWinner(notif.args.playerId, notif.args.length);
    };
    /**
     * Animate longest path for end score.
     */
    Expeditions.prototype.notif_longestPath = function (notif) {
        var _a;
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.showLongestPath(this.gamedatas.players[notif.args.playerId].color, notif.args.routes, notif.args.length, this.isFastEndScoring());
    };
    /**
     * Add longest path badge for end score.
     */
    Expeditions.prototype.notif_longestPathWinner = function (notif) {
        var _a;
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.setLongestPathWinner(notif.args.playerId, notif.args.length);
    };
    /**
     * Highlight winner for end score.
     */
    Expeditions.prototype.notif_highlightWinnerScore = function (notif) {
        var _a;
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.highlightWinnerScore(notif.args.playerId);
        playSound("ttr-scoring-end");
        this.disableNextMoveSound();
    };
    /* This enable to inject translatable styled things to logs or action bar */
    /* @Override */
    Expeditions.prototype.format_string_recursive = function (log, args) {
        try {
            if (log && args && !args.processed) {
                if (typeof args.color == "number") {
                    args.color = "<div class=\"train-car-color icon\" data-color=\"".concat(args.color, "\"></div>");
                }
                if (typeof args.colors == "object") {
                    args.colors = args.colors
                        .map(function (color) {
                        return "<div class=\"train-car-color icon\" data-color=\"".concat(color, "\"></div>");
                    })
                        .join("");
                }
                // make cities names in bold
                ["from", "to", "count", "extraCards", "pickedCards"].forEach(function (field) {
                    if (args[field] !== null &&
                        args[field] !== undefined &&
                        args[field][0] != "<") {
                        args[field] = "<strong>".concat(_(args[field]), "</strong>");
                    }
                });
                ["you", "actplayer", "player_name"].forEach(function (field) {
                    if (typeof args[field] === "string" &&
                        args[field].indexOf("#df74b2;") !== -1 &&
                        args[field].indexOf("text-shadow") === -1) {
                        args[field] = args[field].replace("#df74b2;", "#df74b2; text-shadow: 0 0 1px black, 0 0 2px black, 0 0 3px black;");
                    }
                });
            }
        }
        catch (e) {
            console.error(log, args, "Exception thrown", e.stack);
        }
        return this.inherited(arguments);
    };
    return Expeditions;
}());
define([
    "dojo",
    "dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock",
], function (dojo, declare) {
    return declare("bgagame.expeditions", ebg.core.gamegui, new Expeditions());
});
