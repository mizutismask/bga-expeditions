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
function setupDestinationCards(stock) {
    var destinationsUrl = "".concat(g_gamethemeurl, "img/destinations.jpg");
    for (var id = 1; id <= 80; id++) {
        stock.addItemType(100 + id, 100 + id, destinationsUrl, id - 1);
    }
}
var BLUE = 1;
var YELLOW = 2;
var RED = 3;
var COLORS = [BLUE, YELLOW, RED];
function getColor(color, translatable) {
    if (translatable === void 0) { translatable = true; }
    if (translatable) {
        switch (color) {
            case 1:
                return _("Blue");
            case 2:
                return _("Yellow");
            case 3:
                return _("Red");
        }
    }
    else {
        switch (color) {
            case 1:
                return "blue";
            case 2:
                return "yellow";
            case 3:
                return "red";
        }
    }
}
function setupTrainCarCardDiv(cardDiv, cardTypeId) {
    cardDiv.title = getColor(Number(cardTypeId));
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
var CITIES_LOCATIONS = [
    "",
    "UNITED STATES - North America",
    "CANADA - North America",
    "ARCTIC OCEAN",
    "CANADA - North America",
    "UNITED STATES - North America",
    "UNITED STATES - North America",
    "UNITED STATES - North America",
    "UNITED STATES - North America",
    "CANADA, UNITED STATES - North America",
    "UNITED STATES - North America",
    "MEXICO - North America",
    "GUATEMALA - Central America",
    "CANADA - North America",
    "North America",
    "VENEZUELA - South America",
    "BRAZIL - South America",
    "AMAZON - South America",
    "PERU - South America",
    "BRAZIL - South America",
    "BRAZIL - South America",
    "BOLIVIA - South America",
    "ARGENTINA, BRAZIL - South America",
    "CHILE, PERU - South America",
    "ECUADOR - South America",
    "",
    "CHILE - South America",
    "ARGENTINA, CHILE - South America",
    "ANTARCTIC PENINSULA",
    "NORWAY - Europe",
    "ICELAND - Europe",
    "UNITED KINGDOM - Europe",
    "ITALY - Europe",
    "GREECE - Europe",
    "ALGERIA - Africa",
    "SPAIN - Europe",
    "Africa",
    "EGYPT - Africa",
    "MALI - Africa",
    "SUDAN, EGYPT - Africa",
    "ETHIOPIA - Africa",
    "GHANA - Africa",
    "CAMEROON - Africa",
    "DEMOCRATIC REPUBLIC OF THE CONGO – Africa",
    "ZAMBIA - Africa",
    "NAMIBIA - Africa",
    "",
    "Africa",
    "",
    "JORDAN - Asia",
    "IRAQ - Asia",
    "IRAN - Asia",
    "YEMEN - Asia",
    "Asia",
    "RUSSIA - Asia",
    "Putorana Plateau - RUSSIA - Asia",
    "RUSSIA - Asia",
    "PAKISTAN - Asia",
    "RUSSIA - Asia",
    "RUSSIA - Asia",
    "CHINA - Asia",
    "NEPAL, CHINA- Asia",
    "INDIA - Asia",
    "SRI LANKA - Asia",
    "MYANMAR - Asia",
    "CAMBODIA - Asia",
    "CHINA - Asia",
    "CHINA, RUSSIA - Asia",
    "RUSSIA - Asia",
    "UNITED STATES, RUSSIA - Asia",
    "JAPAN - Asia",
    "INDONESIA - Asia",
    "INDONESIA - Asia",
    "INDONESIA - Oceania",
    "AUSTRALIA - Oceania",
    "AUSTRALIA - Oceania",
    "AUSTRALIA - Oceania",
    "AUSTRALIA - Oceania",
    "AUSTRALIA - Oceania",
    "AUSTRALIA - Oceania",
    "NEW ZEALAND - Oceania",
];
var CITIES_DESCRIPTIONS = [
    "",
    "The highest summit in North America reaches 6,190 m. Long named Mount McKinley (1896–2015), Denali means “the tall one” in the Koyukon Athabaskan (Native Alaskan) language.",
    "The Mackenzie is Canada’s longest river. It stays frozen about 5 months per year. The delta forms a 13,500 km² swamp, and shelters an important population of migratory birds.",
    "The famous Northwest Passage allows ships to connect from the Atlantic Ocean to the Pacific Ocean. Since the 15th Century CE, numerous explorers have tried to traverse it with varying degrees of success.",
    "Established in 1885, Banff National Park (listed as a UNESCO World Heritage Site) is Canada’s oldest national park; it is among the most frequented in the world, thanks to its varied and sumptuous landscapes.",
    "A lake that formed in a crater of the volcano Mount Mazama in Oregon, it is the deepest in the United States (592 m), and has water so clear that objects up to 37 m deep can be seen with the naked eye.",
    "This geyser situated in Yellowstone National Park is one of the largest jets of hot water and steam in the world. Very hot water (90°C) shoots up to 50 m high every 88 minutes, on average.",
    "A free state, but associated with the United States; Christopher Columbus made it known to the world, naming it San Juan Bautista in honor of Saint John the Baptist. Today, San Juan is the name of its capital.",
    "“In the Grand Canyon, Arizona has a natural wonder which is in kind absolutely unparalleled throughout the rest of the world.” Theodore Roosevelt.",
    "Comprising 3 waterfalls (Horseshoe Falls, American Falls, and Bridal Veil Falls), these form not only a major tourist attraction, but a source of hydroelectric energy.",
    "This state (sold by Napoleon to the United States in 1803) is known for its bayous: large extremely humid marshes formed by the Mississippi River Delta Basin.",
    "An archaeological site in the Valley of Mexico, this city was one of the largest cities in the world in its heyday (around 500 CE), with around 200,000 inhabitants.",
    "This city is one of the best known of the great Mayan cities, and is a major archaeological site in Central America. The heart of the city centers around a concentration of temples around the Great Plaza.",
    "This large island became Canadian in 1949. Its capital, St. John’s, which is at the eastern end of the island, is the easternmost point in North America.",
    "It is the least densely populated country in the world, with just over 50,000 inhabitants in an area 4 times the size of France. The capital is Nuuk, and the statue ofHans Egede, its founder, watches over the city.",
    "This waterfall in Venezuela is the highest in the world (807 m), and owes its name to the aviator Jimmy Angel, who saw it in 1933 while panning for gold.",
    "Marajó Island is the largest coastal island in Brazil, and its local police do not use horses to patrol, but rather… water buffalo.",
    "400 billion trees (13% of the trees on Earth) of 16,000 different species, as well as 14,000 species of other plants, 2,200 species of fish, 1,300 species of birds…. This is the largest reservoir of biodiversity in the world.",
    "This ancient Incan city from the 15th Century CE perches atop a mountain more than 2,400 m above sea level (its name means “old mountain”). Access to it is by foot, and is subject to strict control.",
    "The Aripuanã National Forest is still home to a few indigenous tribes, including the Surui, who call themselves Paiter, which means “real people, ourselves”.",
    "Consisting of two parts, Upper Town and Lower Town, the traditional way to go from one to the other is to take the Lacerda Elevator, which was built in 1873, and is 72 m high.",
    "This region, which has been inhabited for more than 10,000 years, extends over 4 countries, but most of it is in Bolivia. Its average altitude of 3,330 m makes it the 2nd highest inhabited region in the world (after the Tibetan plateau).",
    "These waterfalls are among the most impressive in the world, comprising 275 individual falls, and forming a front about 3 km long, 80% of which is in Argentina, 20% of which is in Brazil.",
    "The Hand of the Desert in Chile is an 11 m tall sculpture created in 1992 by Chilean artist Mario Irarrázabal, which leaves the visitor free to make their own interpretation.",
    "This archipelago, composed of 127 islands, islets, and rocks (29 of which are large) was annexed by Ecuador in 1832. “Islas de los Galápagos” in Spanish means “Islands of the Giant Tortoises”.",
    "It is the largest ocean on Earth, covering 1/3 of Earth’s surface, and larger than the surface of Mars. Its depth in places is as great as 10,000 m.",
    "This polynesian island is the most isolated inhabited place in the world (the nearest inhabited island is more than 2,000 km away). It is known for its impressive statues (moai).",
    "This archipelago was named by the first European explorers to arrive, who saw fires moving in the darkness; it was the indigenous people using fire for warmth.",
    "Graham Land is the least icy region of Antarctica, and is therefore home to numerous scientific bases.",
    "One of the best places to observe polar bears; today, there are 3,500 in the region.",
    "Thingvellir National Park is one of Iceland’s most famous sites. From 930 to 1798, it housed the Althingi, considered to be the oldest parliament in Europe.",
    "Stonehenge is one of the most impressive prehistoric monuments in the world, due to the size of its megaliths, the complexity of its concentric plan, and its architectural design.",
    "The Colosseum is the largest amphitheater in the Roman world. With its ovoid shape and extraordinary dimensions, it can accommodate as many spectators as the Stade de France.",
    "It is the oldest European city, and the cradle of democracy. The name comes from Athena, protective goddess of the city, who knew how to stand up to Poseidon.",
    "Founded by Trajan in 100 CE as a military colony, this ancient Roman city in Algeria is nicknamed “Pompeii of North Africa”.",
    "This archipelago, located off the coast of Morocco, is composed of 7 main islands of volcanic origin. The last eruption of the volcano Cumbre Vieja occurred in September 2021.",
    "The Sahara has 20% sandy surfaces and 80% rocky surfaces. It gets 5 to 10 mm of rain per year, which makes it the driest region in the world.",
    "In 1798, at the foot of the pyramids of Giza, Bonaparte pronounced decisively, “Think of it, soldiers: From the summit of these pyramids, forty centuries look down upon you.”",
    "Founded in the 5th Century CE, this Malian city is full of mosques and mausoleums to perpetuate the memory of pious men, earning the city its nickname, “the city of 333 saints”.",
    "Meroë became the capital of the Kingdom of Kush in the 4th Century BCE (after Kerma and Napata). The pyramids found there host the sepulchers of deceased royalty.",
    "According to archaeologists, the Aksumite stelae mark the site of the tombs of Aksumite rulers. Their empire was an important state in the Horn of Africa from the 1st through 4th Century CE.",
    "São Jorge da Mina Castle, which was built by the Portuguese in 1482, was a commercial center on the Gold Coast before unfortunately becoming a hub for slave trade.",
    "In this economic capital of Cameroon, La Nouvelle Liberté statue in the Deido suburb, restored in 2007, is today considered the symbol of the city.",
    "This national park is home to more than a thousand species of mammals, birds, reptiles, and amphibians, as well as a third of the world’s endangered mountain gorillas. ",
    "Among the most impressive waterfalls in the world. Situated on the Zambezi River, they are 1,700 m wide, and reach as high as 108 m.",
    "A pair of mountains with an appearance similar to a pair of buttocks, which is precisely what they are named in Herero, the local language: Omatako.",
    "From the 5th to the 15th Century CE, Europeans called it the Ocean Sea. Christopher Columbus, the first to cross the Atlantic in 1492, was nicknamed “the Admiral of the Ocean Sea”.",
    "The isolation of the island has generated a very high rate of endemism in animal and plant species. Among the numerous unique species is a baobab that is emblematic of the island; it is a gigantic bottletree that can live for more than 2,000 years.",
    "Formerly known to Europe as the Eastern Ocean, and to China as the Western Ocean, it covers 20% of the globe. Most of the waters in this ocean are tropical, making it the warmest ocean on the planet.",
    "Al-Khazneh, the most famous of the monuments in the city, is believed to be the tomb of a king or queen, and was long the target of attacks by Bedouins who thought they’d find some important treasure there.",
    "The Lion of Babylon is a statue made of black basalt. It was discovered at the site in 1876, and is an important symbol of Mesopotamia that is used by several Iraqi organizations.",
    "This former capital of Persia was constructed under Darius I around 500 BCE. The Gate of All Nations, built by his son Xerxes, is one of the major remains of the ancient city.",
    "An artistic and architectural masterpiece, this city has been inhabited for more than 3,000 years, and today still has 106 mosques and 3,500 houses dating from before the 11th Century CE.",
    "It is the largest closed sea in the world, bordered by 5 countries. Its large quantity of fish, especially sturgeon, makes it the leading caviar-producing region of the world.",
    "The city is best known for its huge Orthodox monastery, founded in the 14th Century CE (Trinity Lavra of Saint Sergius), considered the heart of Russian Orthodoxy.",
    "This plateau is part of the Putorana Nature Reserve; its lakes and rivers belong to an ecosystem untouched by humans, and make it a protected territory.",
    "Culture in this city in Western Siberia is considered very important, including the Opera and Ballet Theater, the largest in Russia.",
    "Terracotta pottery is typical in this archaeological site of a Bronze-Age walled city that spanned the period of the Indus Valley civilization, or Harappan, named after the city.",
    "Recent studies of the Pleistocene Park, in the Sakha region, have made it possible to reconstruct the woolly mammoth’s food and uses of the Siberian steppe.",
    "336 rivers flow into this lake, which represents the largest reservoir of fresh water on the planet. It has exceptional aquatic fauna, with more than 1,500 animal species.",
    "Although it is the longest human construction, the legend that it is visible from the moon is false: Its width (equivalent to a highway) is too narrow!",
    "Nearly 6,000 people have successfully reached the summit at 8,848 m above sea level, including a 13-year-old boy, someone blind, a 73-year-old woman, and an 80-year-old man!",
    "The Muslim Mughal emperor Shah Jahan had this white marble mausoleum built in homage to his wife, Arjumand Banu Begum, who died giving birth to their fourteenth child.",
    "An immense rock, 370 m high, dubbed “Lion Rock”. To reach the fortress of King Kassapa at its summit, you must climb more than 1,300 steps.",
    "Buddhists have made pilgrimages to this location for centuries. The site still has 2,834 monuments (temples, stupas, pagodas) today, but only a few dozen are maintained.",
    "This temple, first dedicated to the god Vishnu, became a place of Buddhist worship at the end of the 12th Century CE. It is the largest religious monument in the world, and the best preserved in Angkor.",
    "The mausoleum of Emperor Qin hosts an array of nearly 8,000 life-size terracotta statues of soldiers and horses meant to protect the late emperor.",
    "The name Amur comes from a Mongolian dialect, and means “mud”. Its current name in Mongolian means “black river”. As its names suggest, this is a black and muddy river.",
    "A major mining center in the 20th Century CE, this region had many forced labor camps, which were particularly feared by prisoners, due to the climate and working conditions.",
    "The 83 km wide strait separates Alaska from Russia, and was nicknamed the “Ice Curtain” during the Cold War. The two Diomede Islands form the strait, separated by 3 km; each belongs to one of the countries.",
    "The sacred mountain (in reality made of 3 volcanoes) is a historical and cultural emblem in Japan. Its conical shape with perfect symmetry is linked to the last volcanic eruption in 1707.",
    "This Buddhist temple was built around 800 CE, then abandoned around 1100 for unknown reasons. Rediscovered in 1814, it took 200 men 2 months to update the monument.",
    "The traditional houses of Tana Toraja have roofs reminiscent of the shape of buffalo horns, which are a sacred animal in the community, sacrificed during funeral ceremonies.",
    "Most of the country is on the island of New Guinea. It is essentially mountainous and covered with tropical forests, very dense with trees and vegetation.",
    "This vast wild expanse is rich with aboriginal culture, and is one of the best fishing spots in the world. The didgeridoo, a traditional Australian musical instrument, was also born here.",
    "This unique, orange-colored formation is made up of a set of towers and beehive-shaped cones, with steep sides, and a surface streaked with gray bands.",
    "The coral that makes up the Great Barrier Reef is 18 million years old, and cannot live deeper than 30 m, because it needs sunlight to live.",
    "Uluru is an inselberg (isolated relief, hill, or small mountain, which significantly dominates a plain or plateau). The site is home to watering holes, caves, and cave paintings.",
    "The Elizabeth Quay Bridge, at 22 m high, allows pedestrians and cyclists to cross the Swan River, and connects downtown Perth to the business district.",
    "This island is separated from the Australian mainland by the Bass Strait. The Freycinet National Park is home to the famous Wineglass Bay and its heavenly beaches.",
    "This is the place with spectacular landscapes that Peter Jackson chose as the filming location for many scenes of his “The Lord of the Rings” film trilogy.",
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
function getCityDescription(cityId) {
    return CITIES_DESCRIPTIONS[cityId - 100];
}
function getCityLocation(cityId) {
    return CITIES_LOCATIONS[cityId - 100];
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
    new Route(1, 100, 129, [new RouteSpace(819, 179, 143, -82)], BLUE),
    new Route(2, 100, 129, [new RouteSpace(819, 179, 143, -82)], YELLOW),
    new Route(3, 100, 129, [new RouteSpace(819, 179, 143, -82)], RED),
    new Route(4, 100, 130, [new RouteSpace(751, 123, 86, 55)], BLUE),
    new Route(5, 100, 130, [new RouteSpace(751, 123, 86, 55)], YELLOW),
    new Route(6, 100, 130, [new RouteSpace(751, 123, 86, 55)], RED),
    new Route(7, 100, 131, [new RouteSpace(727, 238, 80, -13)], BLUE),
    new Route(8, 100, 131, [new RouteSpace(727, 238, 80, -13)], YELLOW),
    new Route(9, 100, 131, [new RouteSpace(727, 238, 80, -13)], RED),
    new Route(10, 100, 132, [new RouteSpace(813, 318, 78, -86)], BLUE),
    new Route(11, 100, 132, [new RouteSpace(813, 318, 78, -86)], YELLOW),
    new Route(12, 100, 132, [new RouteSpace(813, 318, 78, -86)], RED),
    new Route(13, 100, 133, [new RouteSpace(826, 229, 142, 69)], BLUE),
    new Route(14, 100, 133, [new RouteSpace(826, 229, 142, 69)], YELLOW),
    new Route(15, 100, 133, [new RouteSpace(826, 229, 142, 69)], RED),
    new Route(16, 101, 102, [new RouteSpace(126, 81, 113, -22)], BLUE),
    new Route(17, 101, 102, [new RouteSpace(126, 81, 113, -22)], YELLOW),
    new Route(18, 101, 102, [new RouteSpace(126, 81, 113, -22)], RED),
    new Route(19, 101, 105, [new RouteSpace(116, 101, 98, 90)], BLUE),
    new Route(20, 101, 105, [new RouteSpace(116, 101, 98, 90)], YELLOW),
    new Route(21, 101, 105, [new RouteSpace(116, 101, 98, 90)], RED),
    new Route(22, 103, 114, [new RouteSpace(497, 82, 136, -21)], BLUE),
    new Route(23, 103, 114, [new RouteSpace(497, 82, 136, -21)], YELLOW),
    new Route(24, 103, 114, [new RouteSpace(497, 82, 136, -21)], RED),
    new Route(25, 104, 105, [new RouteSpace(133, 213, 78, -13)], BLUE),
    new Route(26, 104, 105, [new RouteSpace(133, 213, 78, -13)], YELLOW),
    new Route(27, 104, 105, [new RouteSpace(133, 213, 78, -13)], RED),
    new Route(28, 104, 109, [new RouteSpace(234, 204, 142, 33)], BLUE),
    new Route(29, 104, 109, [new RouteSpace(234, 204, 142, 33)], YELLOW),
    new Route(30, 104, 109, [new RouteSpace(234, 204, 142, 33)], RED),
    new Route(31, 105, 108, [new RouteSpace(111, 229, 108, 88)], BLUE),
    new Route(32, 105, 108, [new RouteSpace(111, 229, 108, 88)], YELLOW),
    new Route(33, 105, 108, [new RouteSpace(111, 229, 108, 88)], RED),
    new Route(34, 106, 108, [new RouteSpace(122, 340, 84, -60)], BLUE),
    new Route(35, 106, 108, [new RouteSpace(122, 340, 84, -60)], YELLOW),
    new Route(36, 106, 108, [new RouteSpace(122, 340, 84, -60)], RED),
    new Route(37, 106, 109, [new RouteSpace(188, 254, 165, 13)], BLUE),
    new Route(38, 106, 109, [new RouteSpace(188, 254, 165, 13)], YELLOW),
    new Route(39, 106, 109, [new RouteSpace(188, 254, 165, 13)], RED),
    new Route(40, 107, 110, [new RouteSpace(263, 429, 126, 45)], BLUE),
    new Route(41, 107, 110, [new RouteSpace(263, 429, 126, 45)], YELLOW),
    new Route(42, 107, 110, [new RouteSpace(263, 429, 126, 45)], RED),
    new Route(43, 107, 112, [new RouteSpace(250, 546, 93, -7)], BLUE),
    new Route(44, 107, 112, [new RouteSpace(250, 546, 93, -7)], YELLOW),
    new Route(45, 107, 112, [new RouteSpace(250, 546, 93, -7)], RED),
    new Route(46, 108, 111, [new RouteSpace(116, 369, 139, 76)], BLUE),
    new Route(47, 108, 111, [new RouteSpace(116, 369, 139, 76)], YELLOW),
    new Route(48, 108, 111, [new RouteSpace(116, 369, 139, 76)], RED),
    new Route(49, 109, 110, [new RouteSpace(263, 406, 132, -46)], BLUE),
    new Route(50, 109, 110, [new RouteSpace(263, 406, 132, -46)], YELLOW),
    new Route(51, 109, 110, [new RouteSpace(263, 406, 132, -46)], RED),
    new Route(52, 110, 111, [new RouteSpace(169, 503, 103, -46)], BLUE),
    new Route(53, 110, 111, [new RouteSpace(169, 503, 103, -46)], YELLOW),
    new Route(54, 110, 111, [new RouteSpace(169, 503, 103, -46)], RED),
    new Route(55, 111, 112, [new RouteSpace(169, 523, 56, 24)], BLUE),
    new Route(56, 111, 112, [new RouteSpace(169, 523, 56, 24)], YELLOW),
    new Route(57, 111, 112, [new RouteSpace(169, 523, 56, 24)], RED),
    new Route(58, 112, 124, [new RouteSpace(162, 703, 158, -67)], BLUE),
    new Route(59, 112, 124, [new RouteSpace(162, 703, 158, -67)], YELLOW),
    new Route(60, 112, 124, [new RouteSpace(162, 703, 158, -67)], RED),
    new Route(61, 112, 115, [new RouteSpace(242, 559, 133, 33)], BLUE),
    new Route(62, 112, 115, [new RouteSpace(242, 559, 133, 33)], YELLOW),
    new Route(63, 112, 115, [new RouteSpace(242, 559, 133, 33)], RED),
    new Route(64, 113, 131, [new RouteSpace(550, 251, 147, -3)], BLUE),
    new Route(65, 113, 131, [new RouteSpace(550, 251, 147, -3)], YELLOW),
    new Route(66, 113, 131, [new RouteSpace(550, 251, 147, -3)], RED),
    new Route(67, 114, 130, [new RouteSpace(651, 37, 100, 39)], BLUE),
    new Route(68, 114, 130, [new RouteSpace(651, 37, 100, 39)], YELLOW),
    new Route(69, 114, 130, [new RouteSpace(651, 37, 100, 39)], RED),
    new Route(70, 115, 116, [new RouteSpace(378, 652, 90, 42)], BLUE),
    new Route(71, 115, 116, [new RouteSpace(378, 652, 90, 42)], YELLOW),
    new Route(72, 115, 116, [new RouteSpace(378, 652, 90, 42)], RED),
    new Route(73, 115, 117, [new RouteSpace(367, 657, 98, 77)], BLUE),
    new Route(74, 115, 117, [new RouteSpace(367, 657, 98, 77)], YELLOW),
    new Route(75, 115, 117, [new RouteSpace(367, 657, 98, 77)], RED),
    new Route(76, 116, 119, [new RouteSpace(426, 824, 92, -70)], BLUE),
    new Route(77, 116, 119, [new RouteSpace(426, 824, 92, -70)], YELLOW),
    new Route(78, 116, 119, [new RouteSpace(426, 824, 92, -70)], RED),
    new Route(79, 116, 120, [new RouteSpace(467, 735, 122, 61)], BLUE),
    new Route(80, 116, 120, [new RouteSpace(467, 735, 122, 61)], YELLOW),
    new Route(81, 116, 120, [new RouteSpace(467, 735, 122, 61)], RED),
    new Route(82, 117, 118, [new RouteSpace(293, 818, 95, -29)], BLUE),
    new Route(83, 117, 118, [new RouteSpace(293, 818, 95, -29)], YELLOW),
    new Route(84, 117, 118, [new RouteSpace(293, 818, 95, -29)], RED),
    new Route(85, 117, 121, [new RouteSpace(363, 885, 110, -77)], BLUE),
    new Route(86, 117, 121, [new RouteSpace(363, 885, 110, -77)], YELLOW),
    new Route(87, 117, 121, [new RouteSpace(363, 885, 110, -77)], RED),
    new Route(88, 118, 121, [new RouteSpace(289, 833, 82, 47)], BLUE),
    new Route(89, 118, 121, [new RouteSpace(289, 833, 82, 47)], YELLOW),
    new Route(90, 118, 121, [new RouteSpace(289, 833, 82, 47)], RED),
    new Route(91, 118, 125, [new RouteSpace(86, 853, 179, -9)], BLUE),
    new Route(92, 118, 125, [new RouteSpace(86, 853, 179, -9)], YELLOW),
    new Route(93, 118, 125, [new RouteSpace(86, 853, 179, -9)], RED),
    new Route(94, 119, 122, [new RouteSpace(421, 851, 92, 80)], BLUE),
    new Route(95, 119, 122, [new RouteSpace(421, 851, 92, 80)], YELLOW),
    new Route(96, 119, 122, [new RouteSpace(421, 851, 92, 80)], RED),
    new Route(97, 120, 122, [new RouteSpace(449, 950, 115, -46)], BLUE),
    new Route(98, 120, 122, [new RouteSpace(449, 950, 115, -46)], YELLOW),
    new Route(99, 120, 122, [new RouteSpace(449, 950, 115, -46)], RED),
    new Route(100, 121, 123, [new RouteSpace(355, 1019, 101, -90)], BLUE),
    new Route(101, 121, 123, [new RouteSpace(355, 1019, 101, -90)], YELLOW),
    new Route(102, 121, 123, [new RouteSpace(355, 1019, 101, -90)], RED),
    new Route(103, 122, 123, [new RouteSpace(365, 1027, 85, -43)], BLUE),
    new Route(104, 122, 123, [new RouteSpace(365, 1027, 85, -43)], YELLOW),
    new Route(105, 122, 123, [new RouteSpace(365, 1027, 85, -43)], RED),
    new Route(106, 123, 127, [new RouteSpace(355, 1049, 159, 75)], BLUE),
    new Route(107, 123, 127, [new RouteSpace(355, 1049, 159, 75)], YELLOW),
    new Route(108, 123, 127, [new RouteSpace(355, 1049, 159, 75)], RED),
    new Route(109, 124, 125, [new RouteSpace(82, 839, 126, -61)], BLUE),
    new Route(110, 124, 125, [new RouteSpace(82, 839, 126, -61)], YELLOW),
    new Route(111, 124, 125, [new RouteSpace(82, 839, 126, -61)], RED),
    new Route(112, 125, 126, [new RouteSpace(65, 1020, 154, -86)], BLUE),
    new Route(113, 125, 126, [new RouteSpace(65, 1020, 154, -86)], YELLOW),
    new Route(114, 125, 126, [new RouteSpace(65, 1020, 154, -86)], RED),
    new Route(115, 127, 128, [new RouteSpace(412, 1227, 157, 23)], BLUE),
    new Route(116, 127, 128, [new RouteSpace(412, 1227, 157, 23)], YELLOW),
    new Route(117, 127, 128, [new RouteSpace(412, 1227, 157, 23)], RED),
    new Route(118, 130, 131, [new RouteSpace(711, 228, 108, -78)], BLUE),
    new Route(119, 130, 131, [new RouteSpace(711, 228, 108, -78)], YELLOW),
    new Route(120, 130, 131, [new RouteSpace(711, 228, 108, -78)], RED),
    new Route(121, 133, 134, [new RouteSpace(775, 397, 95, -11)], BLUE),
    new Route(122, 133, 134, [new RouteSpace(775, 397, 95, -11)], YELLOW),
    new Route(123, 133, 134, [new RouteSpace(775, 397, 95, -11)], RED),
    new Route(124, 133, 137, [new RouteSpace(891, 393, 44, 62)], BLUE),
    new Route(125, 133, 137, [new RouteSpace(891, 393, 44, 62)], YELLOW),
    new Route(126, 133, 137, [new RouteSpace(891, 393, 44, 62)], RED),
    new Route(127, 133, 149, [new RouteSpace(898, 384, 87, 35)], BLUE),
    new Route(128, 133, 149, [new RouteSpace(898, 384, 87, 35)], YELLOW),
    new Route(129, 133, 149, [new RouteSpace(898, 384, 87, 35)], RED),
    new Route(130, 134, 136, [new RouteSpace(769, 410, 105, 61)], BLUE),
    new Route(131, 134, 136, [new RouteSpace(769, 410, 105, 61)], YELLOW),
    new Route(132, 134, 136, [new RouteSpace(769, 410, 105, 61)], RED),
    new Route(133, 134, 137, [new RouteSpace(776, 402, 131, 16)], BLUE),
    new Route(134, 134, 137, [new RouteSpace(776, 402, 131, 16)], YELLOW),
    new Route(135, 134, 137, [new RouteSpace(776, 402, 131, 16)], RED),
    new Route(136, 134, 138, [new RouteSpace(701, 533, 133, -66)], BLUE),
    new Route(137, 134, 138, [new RouteSpace(701, 533, 133, -66)], YELLOW),
    new Route(138, 134, 138, [new RouteSpace(701, 533, 133, -66)], RED),
    new Route(139, 136, 139, [new RouteSpace(838, 527, 105, 39)], BLUE),
    new Route(140, 136, 139, [new RouteSpace(838, 527, 105, 39)], YELLOW),
    new Route(141, 136, 139, [new RouteSpace(838, 527, 105, 39)], RED),
    new Route(142, 136, 142, [new RouteSpace(800, 688, 159, -81)], BLUE),
    new Route(143, 136, 142, [new RouteSpace(800, 688, 159, -81)], YELLOW),
    new Route(144, 136, 142, [new RouteSpace(800, 688, 159, -81)], RED),
    new Route(145, 136, 137, [new RouteSpace(838, 505, 84, -34)], BLUE),
    new Route(146, 136, 137, [new RouteSpace(838, 505, 84, -34)], YELLOW),
    new Route(147, 136, 137, [new RouteSpace(838, 505, 84, -34)], RED),
    new Route(148, 137, 140, [new RouteSpace(930, 457, 135, 61)], BLUE),
    new Route(149, 137, 140, [new RouteSpace(930, 457, 135, 61)], YELLOW),
    new Route(150, 137, 140, [new RouteSpace(930, 457, 135, 61)], RED),
    new Route(151, 138, 141, [new RouteSpace(697, 659, 97, -88)], BLUE),
    new Route(152, 138, 141, [new RouteSpace(697, 659, 97, -88)], YELLOW),
    new Route(153, 138, 141, [new RouteSpace(697, 659, 97, -88)], RED),
    new Route(154, 139, 143, [new RouteSpace(934, 617, 113, 89)], BLUE),
    new Route(155, 139, 143, [new RouteSpace(934, 617, 113, 89)], YELLOW),
    new Route(156, 139, 143, [new RouteSpace(934, 617, 113, 89)], RED),
    new Route(157, 140, 143, [new RouteSpace(949, 731, 138, -67)], BLUE),
    new Route(158, 140, 143, [new RouteSpace(949, 731, 138, -67)], YELLOW),
    new Route(159, 140, 143, [new RouteSpace(949, 731, 138, -67)], RED),
    new Route(160, 141, 142, [new RouteSpace(712, 679, 76, 16)], BLUE),
    new Route(161, 141, 142, [new RouteSpace(712, 679, 76, 16)], YELLOW),
    new Route(162, 141, 142, [new RouteSpace(712, 679, 76, 16)], RED),
    new Route(163, 142, 143, [new RouteSpace(814, 709, 114, 16)], BLUE),
    new Route(164, 142, 143, [new RouteSpace(814, 709, 114, 16)], YELLOW),
    new Route(165, 142, 143, [new RouteSpace(814, 709, 114, 16)], RED),
    new Route(166, 143, 144, [new RouteSpace(915, 885, 126, -79)], BLUE),
    new Route(167, 143, 144, [new RouteSpace(915, 885, 126, -79)], YELLOW),
    new Route(168, 143, 144, [new RouteSpace(915, 885, 126, -79)], RED),
    new Route(169, 144, 147, [new RouteSpace(927, 903, 141, 2)], BLUE),
    new Route(170, 144, 147, [new RouteSpace(927, 903, 141, 2)], YELLOW),
    new Route(171, 144, 147, [new RouteSpace(927, 903, 141, 2)], RED),
    new Route(172, 145, 146, [new RouteSpace(811, 1023, 88, -70)], BLUE),
    new Route(173, 145, 146, [new RouteSpace(811, 1023, 88, -70)], YELLOW),
    new Route(174, 145, 146, [new RouteSpace(811, 1023, 88, -70)], RED),
    new Route(175, 146, 148, [new RouteSpace(821, 1044, 115, 29)], BLUE),
    new Route(176, 146, 148, [new RouteSpace(821, 1044, 115, 29)], YELLOW),
    new Route(177, 146, 148, [new RouteSpace(821, 1044, 115, 29)], RED),
    new Route(178, 149, 150, [new RouteSpace(1000, 438, 92, -23)], BLUE),
    new Route(179, 149, 150, [new RouteSpace(1000, 438, 92, -23)], YELLOW),
    new Route(180, 149, 150, [new RouteSpace(1000, 438, 92, -23)], RED),
    new Route(181, 149, 151, [new RouteSpace(999, 444, 104, 2)], BLUE),
    new Route(182, 149, 151, [new RouteSpace(999, 444, 104, 2)], YELLOW),
    new Route(183, 149, 151, [new RouteSpace(999, 444, 104, 2)], RED),
    new Route(184, 149, 152, [new RouteSpace(987, 457, 133, 59)], BLUE),
    new Route(185, 149, 152, [new RouteSpace(987, 457, 133, 59)], YELLOW),
    new Route(186, 149, 152, [new RouteSpace(987, 457, 133, 59)], RED),
    new Route(187, 150, 153, [new RouteSpace(1073, 309, 77, 73)], BLUE),
    new Route(188, 150, 153, [new RouteSpace(1073, 309, 77, 73)], YELLOW),
    new Route(189, 150, 153, [new RouteSpace(1073, 309, 77, 73)], RED),
    new Route(190, 150, 157, [new RouteSpace(1115, 395, 93, 2)], BLUE),
    new Route(191, 150, 157, [new RouteSpace(1115, 395, 93, 2)], YELLOW),
    new Route(192, 150, 157, [new RouteSpace(1115, 395, 93, 2)], RED),
    new Route(193, 151, 152, [new RouteSpace(1073, 569, 116, -67)], BLUE),
    new Route(194, 151, 152, [new RouteSpace(1073, 569, 116, -67)], YELLOW),
    new Route(195, 151, 152, [new RouteSpace(1073, 569, 116, -67)], RED),
    new Route(196, 151, 162, [new RouteSpace(1136, 450, 161, 15)], BLUE),
    new Route(197, 151, 162, [new RouteSpace(1136, 450, 161, 15)], YELLOW),
    new Route(198, 151, 162, [new RouteSpace(1136, 450, 161, 15)], RED),
    new Route(199, 153, 156, [new RouteSpace(1083, 284, 91, -22)], BLUE),
    new Route(200, 153, 156, [new RouteSpace(1083, 284, 91, -22)], YELLOW),
    new Route(201, 153, 156, [new RouteSpace(1083, 284, 91, -22)], RED),
    new Route(202, 154, 155, [new RouteSpace(1045, 155, 157, -37)], BLUE),
    new Route(203, 154, 155, [new RouteSpace(1045, 155, 157, -37)], YELLOW),
    new Route(204, 154, 155, [new RouteSpace(1045, 155, 157, -37)], RED),
    new Route(205, 155, 156, [new RouteSpace(1183, 63, 167, 90)], BLUE),
    new Route(206, 155, 156, [new RouteSpace(1183, 63, 167, 90)], YELLOW),
    new Route(207, 155, 156, [new RouteSpace(1183, 63, 167, 90)], RED),
    new Route(208, 155, 158, [new RouteSpace(1199, 49, 151, 9)], BLUE),
    new Route(209, 155, 158, [new RouteSpace(1199, 49, 151, 9)], YELLOW),
    new Route(210, 155, 158, [new RouteSpace(1199, 49, 151, 9)], RED),
    new Route(211, 157, 161, [new RouteSpace(1239, 400, 115, 13)], BLUE),
    new Route(212, 157, 161, [new RouteSpace(1239, 400, 115, 13)], YELLOW),
    new Route(213, 157, 161, [new RouteSpace(1239, 400, 115, 13)], RED),
    new Route(214, 157, 162, [new RouteSpace(1238, 409, 94, 53)], BLUE),
    new Route(215, 157, 162, [new RouteSpace(1238, 409, 94, 53)], YELLOW),
    new Route(216, 157, 162, [new RouteSpace(1238, 409, 94, 53)], RED),
    new Route(217, 158, 159, [new RouteSpace(1375, 93, 83, 59)], BLUE),
    new Route(218, 158, 159, [new RouteSpace(1375, 93, 83, 59)], YELLOW),
    new Route(219, 158, 159, [new RouteSpace(1375, 93, 83, 59)], RED),
    new Route(220, 158, 168, [new RouteSpace(1377, 77, 119, -11)], BLUE),
    new Route(221, 158, 168, [new RouteSpace(1377, 77, 119, -11)], YELLOW),
    new Route(222, 158, 168, [new RouteSpace(1377, 77, 119, -11)], RED),
    new Route(223, 159, 167, [new RouteSpace(1438, 181, 144, 8)], BLUE),
    new Route(224, 159, 167, [new RouteSpace(1438, 181, 144, 8)], YELLOW),
    new Route(225, 159, 167, [new RouteSpace(1438, 181, 144, 8)], RED),
    new Route(226, 159, 168, [new RouteSpace(1433, 168, 125, -58)], BLUE),
    new Route(227, 159, 168, [new RouteSpace(1433, 168, 125, -58)], YELLOW),
    new Route(228, 159, 168, [new RouteSpace(1433, 168, 125, -58)], RED),
    new Route(229, 160, 167, [new RouteSpace(1523, 319, 116, -58)], BLUE),
    new Route(230, 160, 167, [new RouteSpace(1523, 319, 116, -58)], YELLOW),
    new Route(231, 160, 167, [new RouteSpace(1523, 319, 116, -58)], RED),
    new Route(232, 160, 170, [new RouteSpace(1534, 337, 161, 4)], BLUE),
    new Route(233, 160, 170, [new RouteSpace(1534, 337, 161, 4)], YELLOW),
    new Route(234, 160, 170, [new RouteSpace(1534, 337, 161, 4)], RED),
    new Route(235, 161, 166, [new RouteSpace(1385, 422, 139, -8)], BLUE),
    new Route(236, 161, 166, [new RouteSpace(1385, 422, 139, -8)], YELLOW),
    new Route(237, 161, 166, [new RouteSpace(1385, 422, 139, -8)], RED),
    new Route(238, 162, 163, [new RouteSpace(1311, 511, 140, 75)], BLUE),
    new Route(239, 162, 163, [new RouteSpace(1311, 511, 140, 75)], YELLOW),
    new Route(240, 162, 163, [new RouteSpace(1311, 511, 140, 75)], RED),
    new Route(241, 162, 164, [new RouteSpace(1322, 503, 102, 22)], BLUE),
    new Route(242, 162, 164, [new RouteSpace(1322, 503, 102, 22)], YELLOW),
    new Route(243, 162, 164, [new RouteSpace(1322, 503, 102, 22)], RED),
    new Route(244, 163, 164, [new RouteSpace(1357, 646, 107, -50)], BLUE),
    new Route(245, 163, 164, [new RouteSpace(1357, 646, 107, -50)], YELLOW),
    new Route(246, 163, 164, [new RouteSpace(1357, 646, 107, -50)], RED),
    new Route(247, 163, 165, [new RouteSpace(1367, 656, 108, -14)], BLUE),
    new Route(248, 163, 165, [new RouteSpace(1367, 656, 108, -14)], YELLOW),
    new Route(249, 163, 165, [new RouteSpace(1367, 656, 108, -14)], RED),
    new Route(250, 164, 166, [new RouteSpace(1443, 535, 151, -54)], BLUE),
    new Route(251, 164, 166, [new RouteSpace(1443, 535, 151, -54)], YELLOW),
    new Route(252, 164, 166, [new RouteSpace(1443, 535, 151, -54)], RED),
    new Route(253, 165, 172, [new RouteSpace(1497, 635, 160, 63)], BLUE),
    new Route(254, 165, 172, [new RouteSpace(1497, 635, 160, 63)], YELLOW),
    new Route(255, 165, 172, [new RouteSpace(1497, 635, 160, 63)], RED),
    new Route(256, 168, 169, [new RouteSpace(1525, 49, 169, 0)], BLUE),
    new Route(257, 168, 169, [new RouteSpace(1525, 49, 169, 0)], YELLOW),
    new Route(258, 168, 169, [new RouteSpace(1525, 49, 169, 0)], RED),
    new Route(259, 171, 174, [new RouteSpace(1501, 856, 114, 54)], BLUE),
    new Route(260, 171, 174, [new RouteSpace(1501, 856, 114, 54)], YELLOW),
    new Route(261, 171, 174, [new RouteSpace(1501, 856, 114, 54)], RED),
    new Route(262, 171, 175, [new RouteSpace(1495, 860, 148, 78)], BLUE),
    new Route(263, 171, 175, [new RouteSpace(1495, 860, 148, 78)], YELLOW),
    new Route(264, 171, 175, [new RouteSpace(1495, 860, 148, 78)], RED),
    new Route(265, 172, 173, [new RouteSpace(1594, 799, 145, 43)], BLUE),
    new Route(266, 172, 173, [new RouteSpace(1594, 799, 145, 43)], YELLOW),
    new Route(267, 172, 173, [new RouteSpace(1594, 799, 145, 43)], RED),
    new Route(268, 173, 174, [new RouteSpace(1590, 943, 117, -19)], BLUE),
    new Route(269, 173, 174, [new RouteSpace(1590, 943, 117, -19)], YELLOW),
    new Route(270, 173, 174, [new RouteSpace(1590, 943, 117, -19)], RED),
    new Route(271, 174, 176, [new RouteSpace(1591, 967, 102, 38)], BLUE),
    new Route(272, 174, 176, [new RouteSpace(1591, 967, 102, 38)], YELLOW),
    new Route(273, 174, 176, [new RouteSpace(1591, 967, 102, 38)], RED),
    new Route(274, 175, 177, [new RouteSpace(1530, 1037, 56, 84)], BLUE),
    new Route(275, 175, 177, [new RouteSpace(1530, 1037, 56, 84)], YELLOW),
    new Route(276, 175, 177, [new RouteSpace(1530, 1037, 56, 84)], RED),
    new Route(277, 177, 178, [new RouteSpace(1404, 1143, 122, -14)], BLUE),
    new Route(278, 177, 178, [new RouteSpace(1404, 1143, 122, -14)], YELLOW),
    new Route(279, 177, 178, [new RouteSpace(1404, 1143, 122, -14)], RED),
    new Route(280, 177, 179, [new RouteSpace(1525, 1255, 129, -86)], BLUE),
    new Route(281, 177, 179, [new RouteSpace(1525, 1255, 129, -86)], YELLOW),
    new Route(282, 177, 179, [new RouteSpace(1525, 1255, 129, -86)], RED),
    new Route(283, 179, 180, [new RouteSpace(1543, 1270, 93, 2)], BLUE),
    new Route(284, 179, 180, [new RouteSpace(1543, 1270, 93, 2)], YELLOW),
    new Route(285, 179, 180, [new RouteSpace(1543, 1270, 93, 2)], RED),
    new Route(286, 101, 181, [new RouteSpace(14, 135, 93, -25)], BLUE),
    new Route(287, 101, 181, [new RouteSpace(14, 135, 93, -25)], YELLOW),
    new Route(288, 101, 181, [new RouteSpace(14, 135, 93, -25)], RED),
    new Route(289, 105, 181, [new RouteSpace(13, 139, 114, 35)], BLUE),
    new Route(290, 105, 181, [new RouteSpace(13, 139, 114, 35)], YELLOW),
    new Route(291, 105, 181, [new RouteSpace(13, 139, 114, 35)], RED),
    new Route(292, 108, 181, [new RouteSpace(10, 145, 217, 64)], BLUE),
    new Route(293, 108, 181, [new RouteSpace(10, 145, 217, 64)], YELLOW),
    new Route(294, 108, 181, [new RouteSpace(10, 145, 217, 64)], RED),
    new Route(295, 111, 182, [new RouteSpace(13, 654, 180, -45)], BLUE),
    new Route(296, 111, 182, [new RouteSpace(13, 654, 180, -45)], YELLOW),
    new Route(297, 111, 182, [new RouteSpace(13, 654, 180, -45)], RED),
    new Route(298, 124, 182, [new RouteSpace(14, 669, 132, 20)], BLUE),
    new Route(299, 124, 182, [new RouteSpace(14, 669, 132, 20)], YELLOW),
    new Route(300, 124, 182, [new RouteSpace(14, 669, 132, 20)], RED),
    new Route(301, 126, 183, [new RouteSpace(8, 1121, 83, -57)], BLUE),
    new Route(302, 126, 183, [new RouteSpace(8, 1121, 83, -57)], YELLOW),
    new Route(303, 126, 183, [new RouteSpace(8, 1121, 83, -57)], RED),
    new Route(304, 183, 202, [new RouteSpace(10, 1146, 115, 39)], BLUE),
    new Route(305, 183, 202, [new RouteSpace(10, 1146, 115, 39)], YELLOW),
    new Route(306, 183, 202, [new RouteSpace(10, 1146, 115, 39)], RED),
    new Route(307, 104, 187, [new RouteSpace(239, 194, 148, -4)], BLUE),
    new Route(308, 104, 187, [new RouteSpace(239, 194, 148, -4)], YELLOW),
    new Route(309, 104, 187, [new RouteSpace(239, 194, 148, -4)], RED),
    new Route(310, 109, 187, [new RouteSpace(371, 281, 88, -73)], BLUE),
    new Route(311, 109, 187, [new RouteSpace(371, 281, 88, -73)], YELLOW),
    new Route(312, 109, 187, [new RouteSpace(371, 281, 88, -73)], RED),
    new Route(313, 187, 203, [new RouteSpace(381, 43, 126, 83)], BLUE),
    new Route(314, 187, 203, [new RouteSpace(381, 43, 126, 83)], YELLOW),
    new Route(315, 187, 203, [new RouteSpace(381, 43, 126, 83)], RED),
    new Route(316, 188, 204, [new RouteSpace(474, 400, 117, 83)], BLUE),
    new Route(317, 188, 204, [new RouteSpace(474, 400, 117, 83)], YELLOW),
    new Route(318, 188, 204, [new RouteSpace(474, 400, 117, 83)], RED),
    new Route(319, 107, 188, [new RouteSpace(373, 529, 98, 1)], BLUE),
    new Route(320, 107, 188, [new RouteSpace(373, 529, 98, 1)], YELLOW),
    new Route(321, 107, 188, [new RouteSpace(373, 529, 98, 1)], RED),
    new Route(322, 135, 188, [new RouteSpace(502, 527, 101, -34)], BLUE),
    new Route(323, 135, 188, [new RouteSpace(502, 527, 101, -34)], YELLOW),
    new Route(324, 135, 188, [new RouteSpace(502, 527, 101, -34)], RED),
    new Route(325, 138, 188, [new RouteSpace(502, 533, 180, 4)], BLUE),
    new Route(326, 138, 188, [new RouteSpace(502, 533, 180, 4)], YELLOW),
    new Route(327, 138, 188, [new RouteSpace(502, 533, 180, 4)], RED),
    new Route(328, 188, 208, [new RouteSpace(493, 544, 152, 62)], BLUE),
    new Route(329, 188, 208, [new RouteSpace(493, 544, 152, 62)], YELLOW),
    new Route(330, 188, 208, [new RouteSpace(493, 544, 152, 62)], RED),
    new Route(331, 141, 189, [new RouteSpace(678, 792, 105, -81)], BLUE),
    new Route(332, 141, 189, [new RouteSpace(678, 792, 105, -81)], YELLOW),
    new Route(333, 141, 189, [new RouteSpace(678, 792, 105, -81)], RED),
    new Route(334, 120, 189, [new RouteSpace(552, 848, 112, -19)], BLUE),
    new Route(335, 120, 189, [new RouteSpace(552, 848, 112, -19)], YELLOW),
    new Route(336, 120, 189, [new RouteSpace(552, 848, 112, -19)], RED),
    new Route(337, 189, 208, [new RouteSpace(581, 704, 120, 49)], BLUE),
    new Route(338, 189, 208, [new RouteSpace(581, 704, 120, 49)], YELLOW),
    new Route(339, 189, 208, [new RouteSpace(581, 704, 120, 49)], RED),
    new Route(340, 189, 191, [new RouteSpace(687, 807, 139, 0)], BLUE),
    new Route(341, 189, 191, [new RouteSpace(687, 807, 139, 0)], YELLOW),
    new Route(342, 189, 191, [new RouteSpace(687, 807, 139, 0)], RED),
    new Route(343, 189, 209, [new RouteSpace(665, 939, 119, -86)], BLUE),
    new Route(344, 189, 209, [new RouteSpace(665, 939, 119, -86)], YELLOW),
    new Route(345, 189, 209, [new RouteSpace(665, 939, 119, -86)], RED),
    new Route(346, 190, 209, [new RouteSpace(612, 1059, 102, -64)], BLUE),
    new Route(347, 190, 209, [new RouteSpace(612, 1059, 102, -64)], YELLOW),
    new Route(348, 190, 209, [new RouteSpace(612, 1059, 102, -64)], RED),
    new Route(349, 190, 205, [new RouteSpace(449, 1084, 140, -4)], BLUE),
    new Route(350, 190, 205, [new RouteSpace(449, 1084, 140, -4)], YELLOW),
    new Route(351, 190, 205, [new RouteSpace(449, 1084, 140, -4)], RED),
    new Route(352, 190, 210, [new RouteSpace(612, 1086, 101, 60)], BLUE),
    new Route(353, 190, 210, [new RouteSpace(612, 1086, 101, 60)], YELLOW),
    new Route(354, 190, 210, [new RouteSpace(612, 1086, 101, 60)], RED),
    new Route(355, 142, 191, [new RouteSpace(805, 716, 85, 66)], BLUE),
    new Route(356, 142, 191, [new RouteSpace(805, 716, 85, 66)], YELLOW),
    new Route(357, 142, 191, [new RouteSpace(805, 716, 85, 66)], RED),
    new Route(358, 145, 191, [new RouteSpace(847, 824, 84, 89)], BLUE),
    new Route(359, 145, 191, [new RouteSpace(847, 824, 84, 89)], YELLOW),
    new Route(360, 145, 191, [new RouteSpace(847, 824, 84, 89)], RED),
    new Route(361, 148, 192, [new RouteSpace(837, 1170, 102, -29)], BLUE),
    new Route(362, 148, 192, [new RouteSpace(837, 1170, 102, -29)], YELLOW),
    new Route(363, 148, 192, [new RouteSpace(837, 1170, 102, -29)], RED),
    new Route(364, 192, 210, [new RouteSpace(688, 1185, 121, -5)], BLUE),
    new Route(365, 192, 210, [new RouteSpace(688, 1185, 121, -5)], YELLOW),
    new Route(366, 192, 210, [new RouteSpace(688, 1185, 121, -5)], RED),
    new Route(367, 192, 211, [new RouteSpace(742, 1277, 113, -52)], BLUE),
    new Route(368, 192, 211, [new RouteSpace(742, 1277, 113, -52)], YELLOW),
    new Route(369, 192, 211, [new RouteSpace(742, 1277, 113, -52)], RED),
    new Route(370, 192, 214, [new RouteSpace(835, 1191, 107, 49)], BLUE),
    new Route(371, 192, 214, [new RouteSpace(835, 1191, 107, 49)], YELLOW),
    new Route(372, 192, 214, [new RouteSpace(835, 1191, 107, 49)], RED),
    new Route(373, 129, 193, [new RouteSpace(853, 25, 128, 10)], BLUE),
    new Route(374, 129, 193, [new RouteSpace(853, 25, 128, 10)], YELLOW),
    new Route(375, 129, 193, [new RouteSpace(853, 25, 128, 10)], RED),
    new Route(376, 155, 193, [new RouteSpace(1006, 50, 162, -1)], BLUE),
    new Route(377, 155, 193, [new RouteSpace(1006, 50, 162, -1)], YELLOW),
    new Route(378, 155, 193, [new RouteSpace(1006, 50, 162, -1)], RED),
    new Route(379, 154, 193, [new RouteSpace(993, 62, 94, 69)], BLUE),
    new Route(380, 154, 193, [new RouteSpace(993, 62, 94, 69)], YELLOW),
    new Route(381, 154, 193, [new RouteSpace(993, 62, 94, 69)], RED),
    new Route(382, 147, 194, [new RouteSpace(1057, 1025, 99, -78)], BLUE),
    new Route(383, 147, 194, [new RouteSpace(1057, 1025, 99, -78)], YELLOW),
    new Route(384, 147, 194, [new RouteSpace(1057, 1025, 99, -78)], RED),
    new Route(385, 148, 194, [new RouteSpace(952, 1104, 108, -34)], BLUE),
    new Route(386, 148, 194, [new RouteSpace(952, 1104, 108, -34)], YELLOW),
    new Route(387, 148, 194, [new RouteSpace(952, 1104, 108, -34)], RED),
    new Route(388, 194, 215, [new RouteSpace(1063, 1053, 108, 66)], BLUE),
    new Route(389, 194, 215, [new RouteSpace(1063, 1053, 108, 66)], YELLOW),
    new Route(390, 194, 215, [new RouteSpace(1063, 1053, 108, 66)], RED),
    new Route(391, 195, 199, [new RouteSpace(1078, 1279, 130, -6)], BLUE),
    new Route(392, 195, 199, [new RouteSpace(1078, 1279, 130, -6)], YELLOW),
    new Route(393, 195, 199, [new RouteSpace(1078, 1279, 130, -6)], RED),
    new Route(394, 195, 214, [new RouteSpace(932, 1284, 113, -2)], BLUE),
    new Route(395, 195, 214, [new RouteSpace(932, 1284, 113, -2)], YELLOW),
    new Route(396, 195, 214, [new RouteSpace(932, 1284, 113, -2)], RED),
    new Route(397, 155, 196, [new RouteSpace(1194, 60, 112, 48)], BLUE),
    new Route(398, 155, 196, [new RouteSpace(1194, 60, 112, 48)], YELLOW),
    new Route(399, 155, 196, [new RouteSpace(1194, 60, 112, 48)], RED),
    new Route(400, 158, 196, [new RouteSpace(1291, 145, 79, -40)], BLUE),
    new Route(401, 158, 196, [new RouteSpace(1291, 145, 79, -40)], YELLOW),
    new Route(402, 158, 196, [new RouteSpace(1291, 145, 79, -40)], RED),
    new Route(403, 196, 216, [new RouteSpace(1280, 169, 99, 73)], BLUE),
    new Route(404, 196, 216, [new RouteSpace(1280, 169, 99, 73)], YELLOW),
    new Route(405, 196, 216, [new RouteSpace(1280, 169, 99, 73)], RED),
    new Route(406, 140, 197, [new RouteSpace(1014, 598, 141, 38)], BLUE),
    new Route(407, 140, 197, [new RouteSpace(1014, 598, 141, 38)], YELLOW),
    new Route(408, 140, 197, [new RouteSpace(1014, 598, 141, 38)], RED),
    new Route(409, 152, 197, [new RouteSpace(1076, 600, 96, 56)], BLUE),
    new Route(410, 152, 197, [new RouteSpace(1076, 600, 96, 56)], YELLOW),
    new Route(411, 152, 197, [new RouteSpace(1076, 600, 96, 56)], RED),
    new Route(412, 197, 213, [new RouteSpace(1036, 773, 114, -39)], BLUE),
    new Route(413, 197, 213, [new RouteSpace(1036, 773, 114, -39)], YELLOW),
    new Route(414, 197, 213, [new RouteSpace(1036, 773, 114, -39)], RED),
    new Route(415, 197, 217, [new RouteSpace(1143, 704, 123, 66)], BLUE),
    new Route(416, 197, 217, [new RouteSpace(1143, 704, 123, 66)], YELLOW),
    new Route(417, 197, 217, [new RouteSpace(1143, 704, 123, 66)], RED),
    new Route(418, 178, 198, [new RouteSpace(1254, 1088, 130, 24)], BLUE),
    new Route(419, 178, 198, [new RouteSpace(1254, 1088, 130, 24)], YELLOW),
    new Route(420, 178, 198, [new RouteSpace(1254, 1088, 130, 24)], RED),
    new Route(421, 199, 215, [new RouteSpace(1125, 1176, 117, 42)], BLUE),
    new Route(422, 199, 215, [new RouteSpace(1125, 1176, 117, 42)], YELLOW),
    new Route(423, 199, 215, [new RouteSpace(1125, 1176, 117, 42)], RED),
    new Route(424, 199, 219, [new RouteSpace(1238, 1266, 115, 5)], BLUE),
    new Route(425, 199, 219, [new RouteSpace(1238, 1266, 115, 5)], YELLOW),
    new Route(426, 199, 219, [new RouteSpace(1238, 1266, 115, 5)], RED),
    new Route(427, 171, 200, [new RouteSpace(1349, 816, 133, 10)], BLUE),
    new Route(428, 171, 200, [new RouteSpace(1349, 816, 133, 10)], YELLOW),
    new Route(429, 171, 200, [new RouteSpace(1349, 816, 133, 10)], RED),
    new Route(430, 163, 200, [new RouteSpace(1335, 793, 119, -85)], BLUE),
    new Route(431, 163, 200, [new RouteSpace(1335, 793, 119, -85)], YELLOW),
    new Route(432, 163, 200, [new RouteSpace(1335, 793, 119, -85)], RED),
    new Route(433, 200, 217, [new RouteSpace(1216, 829, 106, -8)], BLUE),
    new Route(434, 200, 217, [new RouteSpace(1216, 829, 106, -8)], YELLOW),
    new Route(435, 200, 217, [new RouteSpace(1216, 829, 106, -8)], RED),
    new Route(436, 200, 218, [new RouteSpace(1332, 823, 116, 86)], BLUE),
    new Route(437, 200, 218, [new RouteSpace(1332, 823, 116, 86)], YELLOW),
    new Route(438, 200, 218, [new RouteSpace(1332, 823, 116, 86)], RED),
    new Route(439, 172, 201, [new RouteSpace(1590, 782, 93, -71)], BLUE),
    new Route(440, 172, 201, [new RouteSpace(1590, 782, 93, -71)], YELLOW),
    new Route(441, 172, 201, [new RouteSpace(1590, 782, 93, -71)], RED),
    new Route(442, 165, 201, [new RouteSpace(1503, 631, 115, 20)], BLUE),
    new Route(443, 165, 201, [new RouteSpace(1503, 631, 115, 20)], YELLOW),
    new Route(444, 165, 201, [new RouteSpace(1503, 631, 115, 20)], RED),
    new Route(445, 201, 220, [new RouteSpace(1626, 662, 143, -72)], BLUE),
    new Route(446, 201, 220, [new RouteSpace(1626, 662, 143, -72)], YELLOW),
    new Route(447, 201, 220, [new RouteSpace(1626, 662, 143, -72)], RED),
    new Route(448, 182, 201, [new RouteSpace(1640, 676, 90, -9)], BLUE),
    new Route(449, 182, 201, [new RouteSpace(1640, 676, 90, -9)], YELLOW),
    new Route(450, 182, 201, [new RouteSpace(1640, 676, 90, -9)], RED),
    new Route(451, 103, 203, [new RouteSpace(392, 35, 99, 31)], BLUE),
    new Route(452, 103, 203, [new RouteSpace(392, 35, 99, 31)], YELLOW),
    new Route(453, 103, 203, [new RouteSpace(392, 35, 99, 31)], RED),
    new Route(454, 109, 204, [new RouteSpace(379, 302, 110, 41)], BLUE),
    new Route(455, 109, 204, [new RouteSpace(379, 302, 110, 41)], YELLOW),
    new Route(456, 109, 204, [new RouteSpace(379, 302, 110, 41)], RED),
    new Route(457, 113, 204, [new RouteSpace(480, 370, 115, -66)], BLUE),
    new Route(458, 113, 204, [new RouteSpace(480, 370, 115, -66)], YELLOW),
    new Route(459, 113, 204, [new RouteSpace(480, 370, 115, -66)], RED),
    new Route(460, 122, 205, [new RouteSpace(436, 1067, 94, -87)], BLUE),
    new Route(461, 122, 205, [new RouteSpace(436, 1067, 94, -87)], YELLOW),
    new Route(462, 122, 205, [new RouteSpace(436, 1067, 94, -87)], RED),
    new Route(463, 127, 205, [new RouteSpace(405, 1199, 106, -76)], BLUE),
    new Route(464, 127, 205, [new RouteSpace(405, 1199, 106, -76)], YELLOW),
    new Route(465, 127, 205, [new RouteSpace(405, 1199, 106, -76)], RED),
    new Route(466, 103, 206, [new RouteSpace(501, 102, 94, 30)], BLUE),
    new Route(467, 103, 206, [new RouteSpace(501, 102, 94, 30)], YELLOW),
    new Route(468, 103, 206, [new RouteSpace(501, 102, 94, 30)], RED),
    new Route(469, 113, 206, [new RouteSpace(543, 241, 86, -58)], BLUE),
    new Route(470, 113, 206, [new RouteSpace(543, 241, 86, -58)], YELLOW),
    new Route(471, 113, 206, [new RouteSpace(543, 241, 86, -58)], RED),
    new Route(472, 130, 206, [new RouteSpace(610, 154, 122, -18)], BLUE),
    new Route(473, 130, 206, [new RouteSpace(610, 154, 122, -18)], YELLOW),
    new Route(474, 130, 206, [new RouteSpace(610, 154, 122, -18)], RED),
    new Route(475, 113, 207, [new RouteSpace(545, 258, 128, 29)], BLUE),
    new Route(476, 113, 207, [new RouteSpace(545, 258, 128, 29)], YELLOW),
    new Route(477, 113, 207, [new RouteSpace(545, 258, 128, 29)], RED),
    new Route(478, 134, 207, [new RouteSpace(683, 339, 82, 36)], BLUE),
    new Route(479, 134, 207, [new RouteSpace(683, 339, 82, 36)], YELLOW),
    new Route(480, 134, 207, [new RouteSpace(683, 339, 82, 36)], RED),
    new Route(481, 135, 207, [new RouteSpace(606, 448, 120, -62)], BLUE),
    new Route(482, 135, 207, [new RouteSpace(606, 448, 120, -62)], YELLOW),
    new Route(483, 135, 207, [new RouteSpace(606, 448, 120, -62)], RED),
    new Route(484, 141, 208, [new RouteSpace(590, 687, 94, -5)], BLUE),
    new Route(485, 141, 208, [new RouteSpace(590, 687, 94, -5)], YELLOW),
    new Route(486, 141, 208, [new RouteSpace(590, 687, 94, -5)], RED),
    new Route(487, 120, 209, [new RouteSpace(548, 862, 131, 38)], BLUE),
    new Route(488, 120, 209, [new RouteSpace(548, 862, 131, 38)], YELLOW),
    new Route(489, 120, 209, [new RouteSpace(548, 862, 131, 38)], RED),
    new Route(490, 145, 209, [new RouteSpace(678, 950, 159, -9)], BLUE),
    new Route(491, 145, 209, [new RouteSpace(678, 950, 159, -9)], YELLOW),
    new Route(492, 145, 209, [new RouteSpace(678, 950, 159, -9)], RED),
    new Route(493, 146, 209, [new RouteSpace(675, 962, 139, 29)], BLUE),
    new Route(494, 146, 209, [new RouteSpace(675, 962, 139, 29)], YELLOW),
    new Route(495, 146, 209, [new RouteSpace(675, 962, 139, 29)], RED),
    new Route(496, 128, 211, [new RouteSpace(581, 1292, 138, -1)], BLUE),
    new Route(497, 128, 211, [new RouteSpace(581, 1292, 138, -1)], YELLOW),
    new Route(498, 128, 211, [new RouteSpace(581, 1292, 138, -1)], RED),
    new Route(499, 211, 214, [new RouteSpace(751, 1289, 151, -2)], BLUE),
    new Route(500, 211, 214, [new RouteSpace(751, 1289, 151, -2)], YELLOW),
    new Route(501, 211, 214, [new RouteSpace(751, 1289, 151, -2)], RED),
    new Route(502, 144, 213, [new RouteSpace(925, 891, 130, -48)], BLUE),
    new Route(503, 144, 213, [new RouteSpace(925, 891, 130, -48)], YELLOW),
    new Route(504, 144, 213, [new RouteSpace(925, 891, 130, -48)], RED),
    new Route(505, 147, 213, [new RouteSpace(1028, 796, 116, 66)], BLUE),
    new Route(506, 147, 213, [new RouteSpace(1028, 796, 116, 66)], YELLOW),
    new Route(507, 147, 213, [new RouteSpace(1028, 796, 116, 66)], RED),
    new Route(508, 156, 216, [new RouteSpace(1199, 249, 106, 16)], BLUE),
    new Route(509, 156, 216, [new RouteSpace(1199, 249, 106, 16)], YELLOW),
    new Route(510, 156, 216, [new RouteSpace(1199, 249, 106, 16)], RED),
    new Route(511, 160, 216, [new RouteSpace(1333, 281, 176, 16)], BLUE),
    new Route(512, 160, 216, [new RouteSpace(1333, 281, 176, 16)], YELLOW),
    new Route(513, 160, 216, [new RouteSpace(1333, 281, 176, 16)], RED),
    new Route(514, 161, 216, [new RouteSpace(1321, 292, 126, 71)], BLUE),
    new Route(515, 161, 216, [new RouteSpace(1321, 292, 126, 71)], YELLOW),
    new Route(516, 161, 216, [new RouteSpace(1321, 292, 126, 71)], RED),
    new Route(517, 147, 217, [new RouteSpace(1093, 902, 113, -33)], BLUE),
    new Route(518, 147, 217, [new RouteSpace(1093, 902, 113, -33)], YELLOW),
    new Route(519, 147, 217, [new RouteSpace(1093, 902, 113, -33)], RED),
    new Route(520, 175, 218, [new RouteSpace(1355, 957, 171, 20)], BLUE),
    new Route(521, 175, 218, [new RouteSpace(1355, 957, 171, 20)], YELLOW),
    new Route(522, 175, 218, [new RouteSpace(1355, 957, 171, 20)], RED),
    new Route(523, 178, 219, [new RouteSpace(1370, 1260, 104, -82)], BLUE),
    new Route(524, 178, 219, [new RouteSpace(1370, 1260, 104, -82)], YELLOW),
    new Route(525, 178, 219, [new RouteSpace(1370, 1260, 104, -82)], RED),
    new Route(526, 179, 219, [new RouteSpace(1384, 1279, 126, -4)], BLUE),
    new Route(527, 179, 219, [new RouteSpace(1384, 1279, 126, -4)], YELLOW),
    new Route(528, 179, 219, [new RouteSpace(1384, 1279, 126, -4)], RED),
    new Route(529, 166, 220, [new RouteSpace(1550, 409, 149, 41)], BLUE),
    new Route(530, 166, 220, [new RouteSpace(1550, 409, 149, 41)], YELLOW),
    new Route(531, 166, 220, [new RouteSpace(1550, 409, 149, 41)], RED),
    new Route(532, 170, 220, [new RouteSpace(1681, 495, 135, -78)], BLUE),
    new Route(533, 170, 220, [new RouteSpace(1681, 495, 135, -78)], YELLOW),
    new Route(534, 170, 220, [new RouteSpace(1681, 495, 135, -78)], RED),
    new Route(535, 173, 221, [new RouteSpace(1697, 794, 100, 81)], BLUE),
    new Route(536, 173, 221, [new RouteSpace(1697, 794, 100, 81)], YELLOW),
    new Route(537, 173, 221, [new RouteSpace(1697, 794, 100, 81)], RED),
    new Route(538, 100, 212, [new RouteSpace(834, 221, 111, 23)], BLUE),
    new Route(539, 100, 212, [new RouteSpace(834, 221, 111, 23)], YELLOW),
    new Route(540, 100, 212, [new RouteSpace(834, 221, 111, 23)], RED),
    new Route(541, 153, 212, [new RouteSpace(965, 276, 90, 9)], BLUE),
    new Route(542, 153, 212, [new RouteSpace(965, 276, 90, 9)], YELLOW),
    new Route(543, 153, 212, [new RouteSpace(965, 276, 90, 9)], RED),
    new Route(544, 154, 212, [new RouteSpace(958, 260, 106, -53)], BLUE),
    new Route(545, 154, 212, [new RouteSpace(958, 260, 106, -53)], YELLOW),
    new Route(546, 154, 212, [new RouteSpace(958, 260, 106, -53)], RED),
    new Route(547, 126, 185, [new RouteSpace(74, 1033, 123, -25)], BLUE),
    new Route(548, 126, 185, [new RouteSpace(74, 1033, 123, -25)], YELLOW),
    new Route(549, 126, 185, [new RouteSpace(74, 1033, 123, -25)], RED),
    new Route(550, 118, 185, [new RouteSpace(207, 962, 141, -63)], BLUE),
    new Route(551, 118, 185, [new RouteSpace(207, 962, 141, -63)], YELLOW),
    new Route(552, 118, 185, [new RouteSpace(207, 962, 141, -63)], RED),
    new Route(553, 123, 185, [new RouteSpace(212, 983, 133, 21)], BLUE),
    new Route(554, 123, 185, [new RouteSpace(212, 983, 133, 21)], YELLOW),
    new Route(555, 123, 185, [new RouteSpace(212, 983, 133, 21)], RED),
    new Route(556, 115, 184, [new RouteSpace(271, 684, 86, -22)], BLUE),
    new Route(557, 115, 184, [new RouteSpace(271, 684, 86, -22)], YELLOW),
    new Route(558, 115, 184, [new RouteSpace(271, 684, 86, -22)], RED),
    new Route(559, 163, 197, [new RouteSpace(1152, 691, 185, -10)], BLUE),
    new Route(560, 163, 197, [new RouteSpace(1152, 691, 185, -10)], YELLOW),
    new Route(561, 163, 197, [new RouteSpace(1152, 691, 185, -10)], RED),
    new Route(562, 167, 181, [new RouteSpace(1609, 197, 133, -27)], BLUE),
    new Route(563, 167, 181, [new RouteSpace(1609, 197, 133, -27)], YELLOW),
    new Route(564, 167, 181, [new RouteSpace(1609, 197, 133, -27)], RED),
    new Route(565, 169, 181, [new RouteSpace(1714, 66, 59, 68)], BLUE),
    new Route(566, 169, 181, [new RouteSpace(1714, 66, 59, 68)], YELLOW),
    new Route(567, 169, 181, [new RouteSpace(1714, 66, 59, 68)], RED),
    new Route(568, 127, 186, [new RouteSpace(280, 1264, 115, -21)], BLUE),
    new Route(569, 127, 186, [new RouteSpace(280, 1264, 115, -21)], YELLOW),
    new Route(570, 127, 186, [new RouteSpace(280, 1264, 115, -21)], RED),
    new Route(571, 186, 202, [new RouteSpace(124, 1229, 133, 15)], BLUE),
    new Route(572, 186, 202, [new RouteSpace(124, 1229, 133, 15)], YELLOW),
    new Route(573, 186, 202, [new RouteSpace(124, 1229, 133, 15)], RED),
    new Route(574, 182, 220, [new RouteSpace(1684, 526, 133, 69)], BLUE),
    new Route(575, 182, 220, [new RouteSpace(1684, 526, 133, 69)], YELLOW),
    new Route(576, 182, 220, [new RouteSpace(1684, 526, 133, 69)], RED),
    new Route(577, 182, 221, [new RouteSpace(1700, 768, 98, -72)], BLUE),
    new Route(578, 182, 221, [new RouteSpace(1700, 768, 98, -72)], YELLOW),
    new Route(579, 182, 221, [new RouteSpace(1700, 768, 98, -72)], RED),
    new Route(580, 176, 183, [new RouteSpace(1692, 1054, 80, 57)], BLUE),
    new Route(581, 176, 183, [new RouteSpace(1692, 1054, 80, 57)], YELLOW),
    new Route(582, 176, 183, [new RouteSpace(1692, 1054, 80, 57)], RED),
    new Route(583, 180, 183, [new RouteSpace(1657, 1261, 138, -57)], BLUE),
    new Route(584, 180, 183, [new RouteSpace(1657, 1261, 138, -57)], YELLOW),
    new Route(585, 180, 183, [new RouteSpace(1657, 1261, 138, -57)], RED),
    new Route(586, 198, 215, [new RouteSpace(1127, 1155, 118, -33)], BLUE),
    new Route(587, 198, 215, [new RouteSpace(1127, 1155, 118, -33)], YELLOW),
    new Route(588, 198, 215, [new RouteSpace(1127, 1155, 118, -33)], RED),
    new Route(589, 198, 218, [new RouteSpace(1251, 1071, 132, -54)], BLUE),
    new Route(590, 198, 218, [new RouteSpace(1251, 1071, 132, -54)], YELLOW),
    new Route(591, 198, 218, [new RouteSpace(1251, 1071, 132, -54)], RED),
    new Route(592, 170, 181, [new RouteSpace(1714, 335, 188, -82)], BLUE),
    new Route(593, 170, 181, [new RouteSpace(1714, 335, 188, -82)], YELLOW),
    new Route(594, 170, 181, [new RouteSpace(1714, 335, 188, -82)], RED),
    new Route(595, 195, 215, [new RouteSpace(1071, 1264, 91, -64)], BLUE),
    new Route(596, 195, 215, [new RouteSpace(1071, 1264, 91, -64)], YELLOW),
    new Route(597, 195, 215, [new RouteSpace(1071, 1264, 91, -64)], RED),
    new Route(598, 113, 187, [new RouteSpace(415, 191, 120, 27)], BLUE),
    new Route(599, 113, 187, [new RouteSpace(415, 191, 120, 27)], YELLOW),
    new Route(600, 113, 187, [new RouteSpace(415, 191, 120, 27)], RED),
    new Route(601, 132, 207, [new RouteSpace(685, 328, 107, 3)], BLUE),
    new Route(602, 132, 207, [new RouteSpace(685, 328, 107, 3)], YELLOW),
    new Route(603, 132, 207, [new RouteSpace(685, 328, 107, 3)], RED),
    new Route(604, 102, 203, [new RouteSpace(262, 35, 103, -3)], BLUE),
    new Route(605, 102, 203, [new RouteSpace(262, 35, 103, -3)], YELLOW),
    new Route(606, 102, 203, [new RouteSpace(262, 35, 103, -3)], RED),
    new Route(607, 159, 216, [new RouteSpace(1328, 264, 109, -40)], BLUE),
    new Route(608, 159, 216, [new RouteSpace(1328, 264, 109, -40)], YELLOW),
    new Route(609, 159, 216, [new RouteSpace(1328, 264, 109, -40)], RED),
    new Route(610, 118, 184, [new RouteSpace(255, 705, 104, 80)], BLUE),
    new Route(611, 118, 184, [new RouteSpace(255, 705, 104, 80)], YELLOW),
    new Route(612, 118, 184, [new RouteSpace(255, 705, 104, 80)], RED),
    new Route(613, 103, 187, [new RouteSpace(411, 170, 93, -45)], BLUE),
    new Route(614, 103, 187, [new RouteSpace(411, 170, 93, -45)], YELLOW),
    new Route(615, 103, 187, [new RouteSpace(411, 170, 93, -45)], RED),
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
        this.mapDiv.addEventListener("mousedown", function (e) { return _this.mouseDownHandler(e); });
        document.addEventListener("mousemove", function (e) { return _this.mouseMoveHandler(e); });
        document.addEventListener("mouseup", function (e) { return _this.mouseUpHandler(); });
        document.getElementById("zoom-button").addEventListener("click", function () { return _this.toggleZoom(); });
        this.mapDiv.addEventListener("dragover", function (e) {
            if (e.offsetX !== _this.dragClientX || e.offsetY !== _this.dragClientY) {
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
                this.mapZoomDiv.scrollLeft = (this.mapZoomDiv.scrollWidth - this.mapZoomDiv.clientWidth) * scrollRatioX;
                this.mapZoomDiv.scrollTop =
                    (this.mapZoomDiv.scrollHeight - this.mapZoomDiv.clientHeight) * scrollRatioY;
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
        // map border
        dojo.place("\n            <div id=\"cities\"></div>\n            <div id=\"route-spaces\"></div>\n            <div id=\"train-cars\"></div>\n        ", "map", "first");
        SIDES.forEach(function (side) { return dojo.place("<div class=\"side ".concat(side, "\"></div>"), "map-and-borders"); });
        CORNERS.forEach(function (corner) { return dojo.place("<div class=\"corner ".concat(corner, "\"></div>"), "map-and-borders"); });
        CITIES.forEach(function (city) {
            return dojo.place("<div id=\"city".concat(city.id, "\" class=\"city\" \n                style=\"transform: translate(").concat(city.x, "px, ").concat(city.y, "px)\"\n                title=\"").concat(getCityName(city.id), "\"\n            ></div>"), "cities");
        });
        this.createRouteSpaces();
        this.showRevealedDestinations(revealedDestinations);
        this.setClaimedRoutes(claimedRoutes, null);
        this.resizedDiv = document.getElementById("resized");
        this.mapDiv = document.getElementById("map");
        this.inMapZoomManager = new InMapZoomManager();
    }
    TtrMap.prototype.getAllRoutes = function () {
        return ROUTES;
    };
    TtrMap.prototype.getRoute = function (routeId) {
        return ROUTES[routeId];
    };
    TtrMap.prototype.isCityOnMapEdge = function (city) {
        return this.getCitiesOnMapEdge().indexOf(city.id) != -1;
    };
    TtrMap.prototype.getCitiesOnMapEdge = function () {
        return [181, 182, 183];
    };
    TtrMap.prototype.getXCoord = function (city, route) {
        if (this.isCityOnMapEdge(city)) {
            return this.getEdgeFromRoute(city, route) == "left" ? 0 : 1742; //right edge position
        }
        else {
            return city.x;
        }
    };
    TtrMap.prototype.getEdgeFromRoute = function (redEdgecity, route) {
        var cityConnectedToRedPoint = route.from == redEdgecity.id ? route.to : route.from;
        var citiesOnTheLeft = [101, 105, 108, 111, 124, 126, 202]; //list of cites connected to edges on the left
        return citiesOnTheLeft.indexOf(cityConnectedToRedPoint) != -1 ? "left" : "right";
    };
    TtrMap.prototype.getClaimedArrowBackgroundClass = function (route, claimed) {
        var _this = this;
        var origin = CITIES.find(function (city) { return city.id == _this.getRouteOrigin(route, claimed); });
        var destination = CITIES.find(function (city) { return city.id == _this.getRouteDestination(route, claimed); });
        var originX = this.getXCoord(origin, route);
        var destinationX = this.getXCoord(destination, route);
        var reverse = Math.abs(destinationX - originX) > 5 ? destinationX < originX : destination.y < origin.y;
        return "arrow".concat(this.getArrowSize(route)).concat(reverse ? "R" : "N").concat(getColor(route.color, false)
            .charAt(0)
            .toUpperCase());
    };
    TtrMap.prototype.getRouteOrigin = function (route, claimed) {
        return claimed.reverseDirection ? route.to : route.from;
    };
    TtrMap.prototype.getRouteDestination = function (route, claimed) {
        return claimed.reverseDirection ? route.from : route.to;
    };
    TtrMap.prototype.getColorShift = function (route, baseShift, shortRoutesShift) {
        switch (route.color) {
            case BLUE:
                return this.isShortRoute(route) ? -shortRoutesShift : -baseShift;
            case RED:
                return this.isShortRoute(route) ? shortRoutesShift : baseShift;
            case YELLOW:
                return 0;
        }
    };
    TtrMap.prototype.isShortRoute = function (route) {
        var angle = route.spaces[0].angle;
        console.log("isShortRoute", route.id, angle > 35 && angle < 65);
        return angle >= 35 && angle < 65;
        //return false;
    };
    TtrMap.prototype.createRouteSpaces = function () {
        var _this = this;
        var destination = "route-spaces";
        this.getAllRoutes().forEach(function (route) {
            return route.spaces.forEach(function (space, spaceIndex) {
                var coords = _this.getShiftedCoords(route, _this.getColorShift(route, 20, 30));
                dojo.place("<div id=\"".concat(destination, "-route").concat(route.id, "-space").concat(spaceIndex, "\" class=\"route-space\" \n                    style=\"transform-origin:left center; transform: translate(").concat(coords.x, "px, ").concat(coords.y, "px) rotate(").concat(space.angle, "deg); width:").concat(space.length, "px\"\n                    title=\"").concat(dojo.string.substitute(_("${from} to ${to}"), {
                    from: _this.getCityName(route.from),
                    to: _this.getCityName(route.to),
                }), ", ").concat(route.spaces.length, " ").concat(getColor(route.color), "\"\n                    data-route=\"").concat(route.id, "\" data-color=\"").concat(route.color, "\"\n                ></div>"), destination);
                var spaceDiv = document.getElementById("".concat(destination, "-route").concat(route.id, "-space").concat(spaceIndex));
                _this.setSpaceClickEvents(spaceDiv, route);
            });
        });
    };
    TtrMap.prototype.getArrowSize = function (route) {
        var size = "U";
        route.spaces.forEach(function (space) {
            var length = space.length;
            if (length <= 60) {
                size = "S";
            }
            if (length <= 95) {
                size = "M";
            }
            size = "L";
        });
        return size;
    };
    /**
     * Bind click events to route space.
     */
    TtrMap.prototype.setSpaceClickEvents = function (spaceDiv, route) {
        var _this = this;
        spaceDiv.addEventListener("click", function () { return _this.game.clickedRoute(route); });
    };
    /**
     * Highlight selectable route spaces.
     */
    TtrMap.prototype.setSelectableRoutes = function (selectable, possibleRoutes) {
        var _this = this;
        dojo.query(".route-space").removeClass("selectable");
        if (selectable) {
            possibleRoutes.forEach(function (route) {
                return _this.getAllRoutes()
                    .find(function (r) { return r.id == route.id; })
                    .spaces.forEach(function (_, index) {
                    var _a;
                    return (_a = document
                        .getElementById("route-spaces-route".concat(route.id, "-space").concat(index))) === null || _a === void 0 ? void 0 : _a.classList.add("selectable");
                });
            });
        }
    };
    /**
     * Highlight removable route wagons.
     */
    TtrMap.prototype.setRemovableRoutes = function (removable, routes) {
        var _this = this;
        dojo.query(".route-space").removeClass("removable");
        if (removable) {
            routes.forEach(function (route) {
                _this.getAllRoutes()
                    .find(function (r) { return r.id == route.id; })
                    .spaces.forEach(function (_, index) {
                    var _a;
                    return (_a = document
                        .getElementById("route-spaces-route".concat(route.id, "-space").concat(index))) === null || _a === void 0 ? void 0 : _a.classList.add("removable");
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
            var route = _this.getAllRoutes().find(function (r) { return r.id == claimedRoute.routeId; });
            _this.claimRoute(claimedRoute, route);
            _this.shiftArrowIfNeeded(route, claimedRoutes);
        });
    };
    TtrMap.prototype.claimRoute = function (claimedRoute, route) {
        var routeDiv = document.getElementById("route-spaces-route".concat(route.id, "-space").concat(0));
        routeDiv.classList.add(this.getClaimedArrowBackgroundClass(route, claimedRoute));
        routeDiv.dataset.revert = claimedRoute.reverseDirection.toString();
    };
    /**
     * Add a new claimed route to the existing ones. Shift arrow if needed.
     */
    TtrMap.prototype.addClaimedRoute = function (claimedRoute, claimedRoutes) {
        var route = this.getAllRoutes().find(function (r) { return r.id == claimedRoute.routeId; });
        this.claimRoute(claimedRoute, route);
        this.shiftArrowIfNeeded(route, claimedRoutes);
    };
    /**
     * Removes the arrow from a route.
     * @param route
     */
    TtrMap.prototype.unclaimRoute = function (route) {
        var routeDiv = document.getElementById("route-spaces-route".concat(route.id, "-space").concat(0));
        dojo.removeClass("route-spaces-route".concat(route.id, "-space").concat(0), ARROW_CLASSES_PERMUTATIONS.join(" "));
    };
    TtrMap.prototype.animateWagonFromCounter = function (playerId, wagonId, toX, toY) {
        var wagon = document.getElementById(wagonId);
        var wagonBR = wagon.getBoundingClientRect();
        var fromBR = document
            .getElementById("revealed-tokens-back-counter-".concat(playerId, "-wrapper"))
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
    TtrMap.prototype.shiftArrowIfNeeded = function (route, allClaimedRoutes) {
        if (route.color === YELLOW) {
            return;
        }
        var shift = route.color === BLUE ? -15 : 15;
        this.shiftArrow(route, -shift);
    };
    TtrMap.prototype.getShiftedCoords = function (route, shift) {
        var space = route.spaces[0];
        var angle = -space.angle;
        console.log("*******angle", angle);
        while (angle < 0) {
            angle += 180;
            console.log("angle", angle);
        }
        while (angle >= 180) {
            angle -= 180;
            console.log("angle", angle);
        }
        var x = space.x;
        var y = space.y;
        console.log("shift amount", shift, "angle", angle);
        console.log("x", Math.round(shift * Math.abs(Math.sin((angle * Math.PI) / 180))));
        console.log("y", Math.round(shift * Math.abs(Math.cos((angle * Math.PI) / 180))));
        var shiftX = shift;
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
        console.log("route", route.id, "color", route.color, "x", space.x, "y", space.y, "=>x", x, "y", y);
        return { x: x, y: y };
    };
    /**
     * Shifts given arrow if it has not been shifted before.
     */
    TtrMap.prototype.shiftArrow = function (route, shift) {
        var routeDiv = document.getElementById("route-spaces-route".concat(route.id, "-space").concat(0));
        var space = route.spaces[0];
        var angle = -space.angle;
        while (angle < 0) {
            angle += 180;
        }
        while (angle >= 180) {
            angle -= 180;
        }
        var x = space.x;
        var y = space.y;
        // we shift a little the train car to let the other route visible
        x += Math.round(shift * Math.abs(Math.sin((angle * Math.PI) / 180)));
        y += Math.round(shift * Math.abs(Math.cos((angle * Math.PI) / 180)));
        var oldTransform = routeDiv.style.transform;
        var newTransform = oldTransform.replace(new RegExp("translate(.*px, .*px)"), "translate(".concat(x, "px, ").concat(y, "px"));
        routeDiv.style.transform = newTransform;
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
        var angleOnOne = (Math.acos((-2 * angle) / 180 + 1) / Math.PI) * EASE_WEIGHT + (angle / 180) * (1 - EASE_WEIGHT);
        var angleClassNumber = Math.round(angleOnOne * 36);
        var alreadyPlacedWagons = Array.from(document.querySelectorAll(".wagon"));
        var xy = x + y;
        if (isLowestFromDoubleHorizontalRoute) {
            // we shift a little the train car to let the other route visible
            x += 10 * Math.abs(Math.sin((angle * Math.PI) / 180));
            y += 10 * Math.abs(Math.cos((angle * Math.PI) / 180));
        }
        var wagonHtml = "<div id=\"".concat(id, "\" class=\"wagon angle").concat(angleClassNumber, " ").concat(phantom ? "phantom" : "", " ").concat(space.top ? "top" : "", "\" data-player-color=\"").concat(route.color, "\" data-color-blind-player-no=\"").concat(player.playerNo, "\" data-xy=\"").concat(xy, "\" style=\"transform: translate(").concat(x, "px, ").concat(y, "px)\"></div>");
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
    TtrMap.prototype.isLowestFromDoubleHorizontalRoute = function (route) {
        var otherRoute = this.getAllRoutes().find(function (r) { return route.from == r.from && route.to == r.to && route.id != r.id; });
        if (!otherRoute) {
            // not a double route
            return false;
        }
        var routeAvgX = route.spaces.map(function (space) { return space.x; }).reduce(function (a, b) { return a + b; }, 0);
        var routeAvgY = route.spaces.map(function (space) { return space.y; }).reduce(function (a, b) { return a + b; }, 0);
        var otherRouteAvgX = otherRoute.spaces.map(function (space) { return space.x; }).reduce(function (a, b) { return a + b; }, 0);
        var otherRouteAvgY = otherRoute.spaces.map(function (space) { return space.y; }).reduce(function (a, b) { return a + b; }, 0);
        if (Math.abs(routeAvgX - otherRouteAvgX) > Math.abs(routeAvgY - otherRouteAvgY)) {
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
        var screenRatio = document.getElementById("game_play_area").clientWidth / (window.innerHeight - 80);
        var leftDistance = Math.abs(LEFT_RATIO - screenRatio);
        var bottomDistance = Math.abs(BOTTOM_RATIO - screenRatio);
        var left = leftDistance < bottomDistance || this.game.isSpectator;
        this.game.setPlayerTablePosition(left);
        var gameWidth = (left ? PLAYER_WIDTH : 0) + MAP_WIDTH + DECK_WIDTH;
        var gameHeight = MAP_HEIGHT + (left ? 0 : PLAYER_HEIGHT * 0.75);
        var horizontalScale = document.getElementById("game_play_area").clientWidth / gameWidth;
        var verticalScale = (window.innerHeight - 80) / gameHeight;
        this.scale = Math.min(1, horizontalScale, verticalScale);
        this.resizedDiv.style.transform = this.scale === 1 ? "" : "scale(".concat(this.scale, ")");
        this.resizedDiv.style.marginBottom = "-".concat((1 - this.scale) * gameHeight, "px");
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
            [previousDestination.to].forEach(function (city) { return (document.getElementById("city".concat(city)).dataset.selectedDestination = "false"); });
        }
        if (destination) {
            [destination.to].forEach(function (city) { return (document.getElementById("city".concat(city)).dataset.selectedDestination = "true"); });
        }
    };
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
    TtrMap.prototype.setSelectableDestination = function (destination, visible) {
        [destination.to].forEach(function (city) {
            //console.log("search ", `city${city}`);
            document.getElementById("city".concat(city)).dataset.selectable = "" + visible;
        });
    };
    /**
     * Highlight cities of selected destination.
     */
    TtrMap.prototype.setSelectedDestination = function (destination, visible) {
        [destination.to].forEach(function (city) {
            document.getElementById("city".concat(city)).dataset.selected = "" + visible;
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
        cities.forEach(function (city) { return (document.getElementById("city".concat(city)).dataset.toConnect = "true"); });
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
        cities.forEach(function (city) { return (document.getElementById("city".concat(city)).dataset.highlight = visible); });
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
            document.getElementById("city".concat(destination.to)).dataset.toConnect = "true";
        }
    };
    /**
     * Sets a marker on all revealed destinations to indicate to which player the destination belongs.
     */
    TtrMap.prototype.showRevealedDestinations = function (destinationsByPlayer) {
        destinationsByPlayer.forEach(function (destinations, player) {
            destinations.forEach(function (d) {
                document.getElementById("city".concat(d.to)).dataset.revealedBy = player.color;
                document.getElementById("city".concat(d.to)).dataset.toConnect = "true";
            });
        });
    };
    /**
     * Removes player ownership marker.
     */
    TtrMap.prototype.removeRevealedDestination = function (dest) {
        var dataset = document.getElementById("city".concat(dest.to)).dataset;
        dataset.revealedBy = "";
        dataset.toConnect = "false";
    };
    /**
     * Sets a marker to indicate that the destination is shared.
     */
    TtrMap.prototype.showSharedDestinations = function (destinations) {
        destinations.forEach(function (d) {
            document.getElementById("city".concat(d.to)).dataset.revealedBy = "shared";
            document.getElementById("city".concat(d.to)).dataset.toConnect = "true";
        });
    };
    TtrMap.prototype.getCityName = function (cityId) {
        return cityId - 100 < CITIES_NAMES.length ? CITIES_NAMES[cityId - 100] : "unknown";
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
        this.destinations = new ebg.stock();
        this.destinations.setSelectionAppearance("class");
        this.destinations.selectionClass = "selected";
        this.destinations.setSelectionMode(1);
        this.destinations.create(game, $("destination-stock"), CARD_WIDTH, CARD_HEIGHT);
        this.destinations.onItemCreate = function (cardDiv, cardUniqueId) {
            return setupDestinationCardDiv(cardDiv, Number(cardUniqueId));
        };
        this.destinations.image_items_per_row = 10;
        this.destinations.centerItems = true;
        this.destinations.item_margin = 20;
        dojo.connect(this.destinations, "onChangeSelection", this, function () { return _this.selectionChange(); });
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
            cardDiv.addEventListener("mouseenter", function () { return _this.game.setHighligthedDestination(destination); });
            cardDiv.addEventListener("mouseleave", function () { return _this.game.setHighligthedDestination(null); });
            // when destinatin is selected, another highlight on the map
            cardDiv.addEventListener("click", function () {
                return _this.game.setSelectedDestination(destination, _this.destinations.getSelectedItems().some(function (item) { return Number(item.id) == destination.id; }));
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
        return this.destinations.getSelectedItems().map(function (item) { return Number(item.id); });
    };
    /**
     * Toggle activation of confirm selection buttons, depending on minimumDestinations.
     */
    DestinationSelection.prototype.selectionChange = function () {
        this.game.destinationSelectionChanged(this.getSelectedDestinationsIds());
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
        /*	this.sharedDestinations = new ebg.stock() as Stock;
        this.sharedDestinations.setSelectionAppearance("class");
        this.sharedDestinations.selectionClass = "selected";
        this.sharedDestinations.setSelectionMode(0);
        this.sharedDestinations.create(
            game,
            $(`shared-destination-stock`),
            CARD_WIDTH,
            CARD_HEIGHT
        );
        this.sharedDestinations.onItemCreate = (
            cardDiv: HTMLDivElement,
            cardUniqueId
        ) => setupDestinationCardDiv(cardDiv, Number(cardUniqueId));
        this.sharedDestinations.image_items_per_row = 10;
        this.sharedDestinations.centerItems = true;
        this.sharedDestinations.item_margin = 20;

        //this.sharedDestinations.setOverlap(-1, 20);// = 20; // overlap
        //this.sharedDestinations.horizontal_overlap = -1; // current bug in stock - this is needed to enable z-index on overlapping items
        //this.sharedDestinations.item_margin = 0; // has to be 0 if using overlap
        //this.sharedDestinations.set

        setupDestinationCards(this.sharedDestinations);*/
        var _this = this;
        this.game = game;
        var stock = new LineStockWithEvents(this.game.destinationCardsManager, $("shared-destination-stock"), {
            center: true,
            gap: "10px",
            direction: "column",
            wrap: "nowrap",
        });
        stock.setSelectionMode("none");
        // highlight destination's cities on the map, on mouse over
        stock.onCardMouseOver = function (dest) { return _this.game.setHighligthedDestination(dest); };
        stock.onCardMouseOut = function (dest) { return _this.game.setHighligthedDestination(null); };
        /*stock.onCardClick = (dest: Destination) =>
            this.game.setSelectedDestination(
                dest,
                stock.getSelection().some((item) => Number(item.id) == dest.id)
            );*/
        this.sharedDestinationsStock = stock;
    }
    /**
     * Set visible destination cards.
     */
    SharedDestinationDeck.prototype.setCards = function (destinations) {
        //dojo.removeClass("destination-deck", "hidden");
        this.sharedDestinationsStock.addCards(destinations);
        /*	destinations.forEach((destination) => {

            this.sharedDestinations.addToStockWithId(
                destination.type * 100 + destination.type_arg,
                "" + destination.id
            );

            const cardDiv = document.getElementById(`shared-destination-stock_item_${destination.id}`);
            // when mouse hover destination, highlight it on the map
            cardDiv.addEventListener("mouseenter", () => this.game.setHighligthedDestination(destination));
            cardDiv.addEventListener("mouseleave", () => this.game.setHighligthedDestination(null));
            // when destinatin is selected, another highlight on the map
            cardDiv.addEventListener("click", () =>
                this.game.setSelectedDestination(
                    destination,
                    this.sharedDestinations.getSelectedItems().some((item) => Number(item.id) == destination.id)
                )
            );
        });*/
    };
    /**
     * Hide destination selector.
     */
    SharedDestinationDeck.prototype.hide = function () {
        this.sharedDestinations.removeAll();
        //dojo.addClass("shared-destination-deck", "hidden");
    };
    SharedDestinationDeck.prototype.removeCard = function (destination) {
        this.sharedDestinationsStock.removeCard(destination);
    };
    return SharedDestinationDeck;
}());
var DBL_CLICK_TIMEOUT = 300;
var SPOTS_COUNT = 6;
/**
 * Selection of new train cars and destination cards.
 */
var TrainCarSelection = /** @class */ (function () {
    /**
     * Init stocks.
     */
    function TrainCarSelection(game, visibleCards, sharedDestinationDeck, destinationDeckCount, destinationDeckMaxCount) {
        this.game = game;
        this.visibleCards = [];
        this.dblClickTimeout = null;
        this.sharedDestinationDeck = sharedDestinationDeck;
        /*for (let i = 1; i <= SPOTS_COUNT; i++) {
            this.visibleCardsSpots[i] = new VisibleCardSpot(game, i);
        }*/
        //console.log("new TrainCarSelection", visibleCards);
        this.visibleCards = Object.values(visibleCards);
        this.setNewSharedCardsOnTable(visibleCards, false);
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
    TrainCarSelection.prototype.setNewSharedCardsOnTable = function (spotsCards, fromDeck) {
        this.sharedDestinationDeck.setCards(spotsCards);
        this.game.showSharedDestinations(spotsCards);
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
                    animateCardToCounterAndDestroy(_this.game, "animated-train-car-card-0-".concat(i), "tickets-counter-".concat(playerId, "-wrapper"));
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
                dojo.place("\n                <div id=\"animated-destination-card-".concat(i, "\" class=\"animated-destination-card\"></div>\n                "), "overall_player_board_" + playerId);
                animateCardToCounterAndDestroy(_this.game, "animated-destination-card-".concat(i), "destinations-counter-".concat(playerId, "-wrapper"));
            }, 200 * i);
        };
        for (var i = 0; i < number; i++) {
            _loop_2(i);
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
        dojo.place(html, "destination-deck", "before");
        this.playerDestinations = new PlayerDestinations(game, player, destinations, completedDestinations);
    }
    /**
     * Place player table to the left or the bottom of the map.
     */
    PlayerTable.prototype.setPosition = function (left) {
        var playerHandDiv = document.getElementById("player-table");
        if (left) {
            document.getElementById("main-line").prepend(playerHandDiv);
        }
        else {
            document.getElementById("resized").appendChild(playerHandDiv);
        }
        playerHandDiv.classList.toggle("left", left);
    };
    PlayerTable.prototype.addDestinations = function (destinations, originStock) {
        this.playerDestinations.addDestinations(destinations, originStock);
    };
    PlayerTable.prototype.markDestinationComplete = function (destination, destinationRoutes) {
        this.playerDestinations.markDestinationComplete(destination, destinationRoutes);
    };
    PlayerTable.prototype.setToDoSelectionMode = function (selectionMode) {
        this.playerDestinations.setToDoSelectionMode(selectionMode);
    };
    PlayerTable.prototype.setToDoSelectableCards = function (possibleDestinations) {
        this.playerDestinations.setToDoSelectableCards(possibleDestinations);
    };
    PlayerTable.prototype.getSelectedToDoDestinations = function () {
        return this.playerDestinations.getSelectedToDoDestinations();
    };
    PlayerTable.prototype.removeDestination = function (destination) {
        this.playerDestinations.removeCard(destination);
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
        this.initDestinationStocks([
            document.getElementById("player-table-".concat(this.playerId, "-destinations-todo")),
            document.getElementById("player-table-".concat(this.playerId, "-destinations-done")),
        ]);
        this.destinationsDoneStock.setSelectionMode("none");
        this.destinationsToDoStock.onSelectionChange = function (selection, lastChange) {
            return _this.game.toDoDestinationSelectionChanged(selection, lastChange);
        };
        this.addDestinations(destinations);
        destinations
            .filter(function (destination) { return completedDestinations.some(function (d) { return d.id == destination.id; }); })
            .forEach(function (destination) { return _this.markDestinationComplete(destination); });
        // highlight the first "to do" destination
        this.activateNextDestination(this.destinationsTodo);
    }
    /**
     * Add destinations to player's hand.
     */
    PlayerDestinations.prototype.addDestinations = function (destinations, originStock) {
        var _a;
        var _this = this;
        this.destinationsToDoStock.addCards(destinations);
        destinations.forEach(function (destination) {
            var card = document.getElementById("destination-card-".concat(destination.id));
            /*	let html = `
            <div id="destination-card-${
                destination.id
            }" class="destination-card" style="${getBackgroundInlineStyleForDestination(destination)}"></div>
            `;

            dojo.place(html, `player-table-${this.playerId}-destinations-todo`);

            setupDestinationCardDiv(card, destination.type * 100 + destination.type_arg);

            card.addEventListener("click", () => this.game.revealDestination(destination));

            // highlight destination's cities on the map, on mouse over
            card.addEventListener("mouseenter", () => this.game.setHighligthedDestination(destination));
            card.addEventListener("mouseleave", () => this.game.setHighligthedDestination(null));
*/
            if (originStock) {
                _this.addAnimationFrom(card, document.getElementById("".concat(originStock.container_div.id, "_item_").concat(destination.id)));
            }
        });
        originStock === null || originStock === void 0 ? void 0 : originStock.removeAll();
        (_a = this.destinationsTodo).push.apply(_a, destinations);
        this.destinationColumnsUpdated();
    };
    PlayerDestinations.prototype.setToDoSelectableCards = function (possibleDestinations) {
        this.destinationsToDoStock.setSelectableCards(possibleDestinations);
    };
    /**
     * Mark destination as complete (place it on the "complete" column).
     */
    PlayerDestinations.prototype.markDestinationCompleteNoAnimation = function (destination) {
        //console.log("markDestinationComplete");
        var index = this.destinationsTodo.findIndex(function (d) { return d.id == destination.id; });
        if (index !== -1) {
            this.destinationsTodo.splice(index, 1);
            this.destinationsToDoStock.removeCard(destination);
        }
        this.destinationsDone.push(destination);
        // fromStock: this.destinationsToDoStock
        this.destinationsDoneStock.addCard(destination, {}, {});
        /*document
                .getElementById(`player-table-${this.playerId}-destinations-done`)
                .appendChild(document.getElementById(`destination-card-${destination.id}`));*/
        this.destinationColumnsUpdated();
    };
    /**
     * Add an animation to mark a destination as complete.
     */
    PlayerDestinations.prototype.markDestinationCompleteAnimation = function (destination, destinationRoutes) {
        var _this = this;
        var newDac = new DestinationCompleteAnimation(this.game, destination, destinationRoutes, "destination-card-".concat(destination.id), "destination-card-".concat(destination.id), {
            start: function (d) { return document.getElementById("destination-card-".concat(d.id)).classList.add("hidden-for-animation"); },
            change: function (d) { return _this.markDestinationCompleteNoAnimation(d); },
            end: function (d) {
                return document.getElementById("destination-card-".concat(d.id)).classList.remove("hidden-for-animation");
            },
        }, "completed");
        this.game.addAnimation(newDac);
    };
    /**
     * Mark a destination as complete.
     */
    PlayerDestinations.prototype.markDestinationComplete = function (destination, destinationRoutes) {
        if (destinationRoutes && !(document.visibilityState === "hidden" || this.game.instantaneousMode)) {
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
            destinationList.splice.apply(destinationList, __spreadArray([destinationList.length, 0], destinationList.splice(0, 1), false));
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
    PlayerDestinations.prototype.setToDoSelectionMode = function (selectionMode) {
        this.destinationsToDoStock.setSelectionMode(selectionMode);
    };
    PlayerDestinations.prototype.getSelectedToDoDestinations = function () {
        return this.destinationsToDoStock.getSelection();
    };
    PlayerDestinations.prototype.removeCard = function (destination) {
        this.destinationsToDoStock.removeCard(destination);
        var index = this.destinationsTodo.findIndex(function (d) { return d.id == destination.id; });
        if (index !== -1) {
            this.destinationsTodo.splice(index, 1);
        }
    };
    /**
     * Update destination cards placement when there is a change.
     */
    PlayerDestinations.prototype.destinationColumnsUpdated = function () {
        var doubleColumn = this.destinationsTodo.length > 0 && this.destinationsDone.length > 0;
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
        if (document.visibilityState === "hidden" || this.game.instantaneousMode) {
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
    PlayerDestinations.prototype.initDestinationStocks = function (divs) {
        var _this = this;
        var stockSettings = {
            center: false,
            gap: "10px",
            direction: "row",
            wrap: "nowrap",
        };
        divs.forEach(function (stockToCreate, index) {
            var stock = new LineStockWithEvents(_this.game.destinationCardsManager, stockToCreate, stockSettings);
            index == 0 ? (_this.destinationsToDoStock = stock) : (_this.destinationsDoneStock = stock);
            stock.setSelectionMode("single");
            // highlight destination's cities on the map, on mouse over
            stock.onCardMouseOver = function (dest) { return _this.game.setHighligthedDestination(dest); };
            stock.onCardMouseOut = function (dest) { return _this.game.setHighligthedDestination(null); };
        });
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
        var headers = document.getElementById("scoretr");
        if (!headers.childElementCount) {
            dojo.place("\n                <th></th>\n                <th id=\"th-destination-reached-score\" class=\"\">".concat(_("Destinations reached"), "</th>\n                <th id=\"th-revealed-tokens-back-score\" class=\"\">").concat(_("Revealed destinations reached"), "</th>\n                <th id=\"th-destination-unreached-score\" class=\"\">").concat(_("Destinations not reached"), "</th>\n                <th id=\"th-revelead-tokens-left-score\" class=\"\">").concat(_("Reveled destinations not reached"), "</th>\n                <th id=\"th-total-score\" class=\"\">").concat(_("Total"), "</th>\n            "), headers);
        }
        players.forEach(function (player) {
            var _a;
            var playerId = Number(player.id);
            dojo.place("<tr id=\"score".concat(player.id, "\">\n                    <td id=\"score-name-").concat(player.id, "\" class=\"player-name\" style=\"color: #").concat(player.color, "\">").concat(player.name, "</td>\n                    <td id=\"destination-reached").concat(player.id, "\" class=\"score-number\">").concat(player.completedDestinations.length + player.sharedCompletedDestinationsCount, "</td>\n                    <td id=\"revealed-tokens-back").concat(player.id, "\" class=\"score-number\">").concat(player.revealedTokensBackCount, "</td>\n                    <td id=\"destination-unreached").concat(player.id, "\" class=\"score-number\">-").concat((_a = player.uncompletedDestinations) === null || _a === void 0 ? void 0 : _a.length, "</td>\n                    <td id=\"revealed-tokens-left").concat(player.id, "\" class=\"score-number\">-").concat(player.revealedTokensLeftCount, "</td>\n                    <td id=\"total").concat(player.id, "\" class=\"score-number total\">").concat(player.score, "</td>\n                </tr>"), "score-table-body");
        });
        this.setBestScore(bestScore);
        players.forEach(function (player) {
            if (Number(player.score) == bestScore) {
                _this.highlightWinnerScore(player.id);
            }
            _this.updateDestinationsTooltip(player);
        });
    }
    EndScore.prototype.updateScores = function (players) {
        players.forEach(function (p) {
            var _a;
            document.getElementById("destination-reached".concat(p.id)).innerHTML = (p.completedDestinations.length + p.sharedCompletedDestinationsCount).toString();
            document.getElementById("revealed-tokens-back".concat(p.id)).innerHTML = p.revealedTokensBackCount.toString();
            document.getElementById("destination-unreached".concat(p.id)).innerHTML = "-" + ((_a = p.uncompletedDestinations) === null || _a === void 0 ? void 0 : _a.length);
            document.getElementById("revealed-tokens-left".concat(p.id)).innerHTML = "-" + p.revealedTokensLeftCount;
            document.getElementById("total".concat(p.id)).innerHTML = p.score.toString();
        });
    };
    /**
     * Add golden highlight to top score player(s)
     */
    EndScore.prototype.highlightWinnerScore = function (playerId) {
        document.getElementById("score".concat(playerId)).classList.add("highlight");
        document.getElementById("score-name-".concat(playerId)).style.color = "";
    };
    /**
     * Save best score so we can move trains.
     */
    EndScore.prototype.setBestScore = function (bestScore) {
        this.bestScore = bestScore;
    };
    /**
     * Set score, and animate train to new score.
     */
    EndScore.prototype.setPoints = function (playerId, points) {
        this.scoreCounters[playerId].toValue(points);
    };
    EndScore.prototype.updateDestinationsTooltip = function (player) {
        var _a;
        var html = "<div class=\"destinations-flex\">\n            <div>\n                ".concat(player.completedDestinations.map(function (destination) {
            return "<div class=\"destination-card completed\" style=\"".concat(getBackgroundInlineStyleForDestination(destination), "\"></div>");
        }), "\n            </div>\n            <div>\n                ").concat((_a = player.uncompletedDestinations) === null || _a === void 0 ? void 0 : _a.map(function (destination) {
            return "<div class=\"destination-card uncompleted\" style=\"".concat(getBackgroundInlineStyleForDestination(destination), "\"></div>");
        }), "\n            </div>\n        </div>");
        if (document.getElementById("destinations-score-".concat(player.id))) {
            this.game.setTooltip("destinations-score-".concat(player.id), html);
        }
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
var ARROW_CLASSES_PERMUTATIONS = [
    "arrowLRB",
    "arrowLRY",
    "arrowLRR",
    "arrowLNB",
    "arrowLNY",
    "arrowLNR",
    "arrowMRB",
    "arrowMRY",
    "arrowMRR",
    "arrowMNB",
    "arrowMNY",
    "arrowMNR",
    "arrowSRB",
    "arrowSRY",
    "arrowSRR",
    "arrowSNB",
    "arrowSNY",
    "arrowSNR",
];
var Expeditions = /** @class */ (function () {
    function Expeditions() {
        this.playerTable = null;
        this.revealedTokensBackCounters = [];
        this.ticketsCounters = [];
        this.destinationCardCounters = [];
        this.completedDestinationsCounters = [];
        this.commonCompletedDestinationsCounters = [];
        this.animations = [];
        this.isTouch = window.matchMedia("(hover: none)").matches;
        this.routeToConfirm = null;
        this.actionTimerId = null;
        this.TOOLTIP_DELAY = document.body.classList.contains("touch-device") ? 1500 : undefined;
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
        this.destinationCardsManager = new CardsManager(this);
        this.sharedDestinations = new SharedDestinationDeck(this);
        this.animationManager = new AnimationManager(this);
        this.trainCarSelection = new TrainCarSelection(this, gamedatas.visibleTrainCards, this.sharedDestinations, gamedatas.destinationDeckCount, gamedatas.destinationDeckMaxCount);
        var player = gamedatas.players[this.getPlayerId()];
        if (player) {
            this.playerTable = new PlayerTable(this, player, gamedatas.handDestinations, gamedatas.completedDestinations);
        }
        this.destinationSelection = new DestinationSelection(this);
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
        var _a, _b, _c, _d, _e;
        log("Entering state: " + stateName, args.args);
        switch (stateName) {
            case "privateChooseInitialDestinations":
            case "chooseInitialDestinations":
            case "chooseAdditionalDestinations":
                if (args === null || args === void 0 ? void 0 : args.args) {
                    var chooseDestinationsArgs = args.args;
                    var destinations = chooseDestinationsArgs.destinations || ((_a = chooseDestinationsArgs._private) === null || _a === void 0 ? void 0 : _a.destinations);
                    if (destinations && this.isCurrentPlayerActive()) {
                        destinations.forEach(function (destination) { return _this.map.setSelectableDestination(destination, true); });
                        this.destinationSelection.setCards(destinations);
                        this.destinationSelection.selectionChange();
                    }
                    (_b = this.playerTable) === null || _b === void 0 ? void 0 : _b.setToDoSelectionMode("single");
                    this.toggleDisableButtonTrade(false); //no selection is valid to say no trade
                }
                break;
            case "revealDestination":
                if (args === null || args === void 0 ? void 0 : args.args) {
                    var revealDestinationArgs = args.args;
                    var possibleDestinations = (_c = revealDestinationArgs._private) === null || _c === void 0 ? void 0 : _c.possibleDestinations;
                    var allDestinations = (_d = revealDestinationArgs._private) === null || _d === void 0 ? void 0 : _d.allDestinations;
                    if (allDestinations && this.isCurrentPlayerActive()) {
                        possibleDestinations.forEach(function (destination) {
                            return _this.map.setSelectableDestination(destination, true);
                        });
                        //this.destinationSelection.setCards(allDestinations);
                        //this.destinationSelection.setSelectableCards(possibleDestinations);
                        (_e = this.playerTable) === null || _e === void 0 ? void 0 : _e.setToDoSelectableCards(possibleDestinations);
                    }
                }
                break;
            case "chooseAction":
                this.onEnteringChooseAction(args.args);
                break;
            case "useTicket":
                this.onEnteringUseTicket(args.args);
                break;
            case "endScore":
                this.onEnteringEndScore();
                break;
        }
    };
    /**
     * Show selectable routes, and unclaimable routes.
     */
    Expeditions.prototype.onEnteringUseTicket = function (args) {
        var currentPlayerActive = this.isCurrentPlayerActive();
        //this.map.setSelectableRoutes(currentPlayerActive, args.possibleRoutes);
        this.map.setRemovableRoutes(currentPlayerActive, args.unclaimableRoutes);
    };
    /**
     * Show selectable routes, and make train car draggable.
     */
    Expeditions.prototype.onEnteringChooseAction = function (args) {
        if (args.loopToResolve) {
            this.setGamestateDescription("Loop");
        }
        else {
            this.selectedArrowColor = 0;
            this.setGamestateDescription(args.mainActionDone && args.canPass ? "MainActionDone" : "");
        }
        var currentPlayerActive = this.isCurrentPlayerActive();
        //this.map.setSelectableRoutes(currentPlayerActive, args.possibleRoutes);
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
        var _a;
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
                    .forEach(function (city) { return (city.dataset.selectable = "false"); });
                mapDiv
                    .querySelectorAll(".city[data-selected]")
                    .forEach(function (city) { return (city.dataset.selected = "false"); });
                (_a = this.playerTable) === null || _a === void 0 ? void 0 : _a.setToDoSelectionMode("none");
                break;
            case "multiChooseInitialDestinations":
                Array.from(document.getElementsByClassName("player-turn-order")).forEach(function (elem) {
                    return elem.remove();
                });
                break;
            case "chooseAction":
                this.map.setSelectableRoutes(false, []);
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
                    this.addActionButton("revealDestination_button", _("Reveal this destination"), function () {
                        return _this.doRevealDestination();
                    });
                    dojo.addClass("revealDestination_button", "disabled");
                    break;
                case "chooseAction":
                    var chooseActionArgs = args;
                    this.setActionBarChooseAction(false);
                    break;
                case "useTicket":
                    this.setActionBarUseTicket(false);
                    break;
                case "chooseAdditionalDestinations":
                    this.addActionButton("chooseAdditionalDestinations_button", _("Trade selected destinations"), function () { return _this.chooseAdditionalDestinations(); });
                    dojo.addClass("chooseAdditionalDestinations_button", "disabled");
                    break;
            }
        }
    };
    ///////////////////////////////////////////////////
    //// Utility methods
    ///////////////////////////////////////////////////
    /**
     * This method can be used instead of addActionButton, to add a button which is an image (i.e. resource). Can be useful when player
     * need to make a choice of resources or tokens.
     */
    Expeditions.prototype.addImageActionButton = function (id, div, color, tooltip, handler, parentClass) {
        if (color === void 0) { color = "gray"; }
        if (parentClass === void 0) { parentClass = ""; }
        // this will actually make a transparent button
        this.addActionButton(id, div, handler, "", false, color);
        // remove boarder, for images it better without
        dojo.style(id, "border", "none");
        // but add shadow style (box-shadow, see css)
        dojo.addClass(id, "shadow bgaimagebutton " + parentClass);
        // you can also add addition styles, such as background
        if (tooltip)
            dojo.attr(id, "title", tooltip);
        return $(id);
    };
    Expeditions.prototype.createDiv = function (classes, id, value) {
        if (id === void 0) { id = ""; }
        if (value === void 0) { value = ""; }
        if (typeof value == "undefined")
            value = "";
        var node = dojo.create("div", { class: classes, innerHTML: value });
        if (id)
            node.id = id;
        return node.outerHTML;
    };
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
    Expeditions.prototype.setTooltip = function (id, html) {
        this.addTooltipHtml(id, html, this.TOOLTIP_DELAY);
    };
    Expeditions.prototype.setTooltipToClass = function (className, html) {
        this.addTooltipHtmlToClass(className, html, this.TOOLTIP_DELAY);
    };
    Expeditions.prototype.setGamestateDescription = function (property) {
        if (property === void 0) { property = ""; }
        var originalState = this.gamedatas.gamestates[this.gamedatas.gamestate.id];
        this.gamedatas.gamestate.description = originalState["description" + property];
        this.gamedatas.gamestate.descriptionmyturn = originalState["descriptionmyturn" + property];
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
        }
    };
    Expeditions.prototype.getPlayerId = function () {
        return Number(this.player_id);
    };
    Expeditions.prototype.getPlayerScore = function (playerId) {
        var _a, _b;
        return (_b = (_a = this.scoreCtrl[playerId]) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : Number(this.gamedatas.players[playerId].score);
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
            dojo.place("<div class=\"counters\">\n\t\t\t\t<div id=\"tickets-counter-".concat(player.id, "-wrapper\" class=\"counter tickets-counter\">\n                    <div class=\"icon expTicket\"></div> \n                    <span id=\"tickets-counter-").concat(player.id, "\"></span>\n                </div>\n                <div id=\"destinations-counter-").concat(player.id, "-wrapper\" class=\"counter destinations-counter\">\n                    <div class=\"icon destination-card\"></div> \n                    <span id=\"completed-destinations-counter-").concat(player.id, "\">").concat(_this.getPlayerId() !== playerId ? "?" : "", "</span>/<span id=\"destination-card-counter-").concat(player.id, "\"></span>\n                </div>\n                <div id=\"revealed-tokens-back-counter-").concat(player.id, "-wrapper\" class=\"counter revealed-tokens-back-counter\">\n                    <div class=\"icon token\" data-player-color=\"").concat(player.color, "\"></div> \n                    <span id=\"revealed-tokens-back-counter-").concat(player.id, "\"></span> / 4\n                </div>\n                \n\t\t\t\t</div>\n\t\t\t\t<div id=\"additional-info-").concat(player.id, "\" class=\"counters additional-info\">\n\t\t\t\t\t<div id=\"common-destinations-counter-").concat(player.id, "-wrapper\" class=\"counter common-destinations-counter\">\n\t\t\t\t\t\t<div class=\"icon destination-card shared-destination\"></div> \n\t\t\t\t\t\t<span id=\"common-completed-destinations-counter-").concat(player.id, "\">").concat(_this.getPlayerId() !== playerId ? "?" : "", "</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>"), "player_board_".concat(player.id));
            var revealedTokensBackCounter = new ebg.counter();
            revealedTokensBackCounter.create("revealed-tokens-back-counter-".concat(player.id));
            revealedTokensBackCounter.setValue(player.revealedTokensBackCount);
            _this.revealedTokensBackCounters[playerId] = revealedTokensBackCounter;
            var ticketsCounter = new ebg.counter();
            ticketsCounter.create("tickets-counter-".concat(player.id));
            ticketsCounter.setValue(player.ticketsCount);
            _this.ticketsCounters[playerId] = ticketsCounter;
            var destinationCardCounter = new ebg.counter();
            destinationCardCounter.create("destination-card-counter-".concat(player.id));
            destinationCardCounter.setValue(player.destinationsCount);
            _this.destinationCardCounters[playerId] = destinationCardCounter;
            var completedDestinationsCounter = new ebg.counter();
            completedDestinationsCounter.create("completed-destinations-counter-".concat(player.id));
            completedDestinationsCounter.setValue(gamedatas.players[player.id].completedDestinations.length);
            _this.completedDestinationsCounters[playerId] = completedDestinationsCounter;
            var commonCompletedDestinationsCounter = new ebg.counter();
            commonCompletedDestinationsCounter.create("common-completed-destinations-counter-".concat(player.id));
            commonCompletedDestinationsCounter.setValue(gamedatas.players[player.id].sharedCompletedDestinationsCount);
            _this.commonCompletedDestinationsCounters[playerId] = commonCompletedDestinationsCounter;
            if (_this.getPlayerId() === playerId) {
                dojo.place("<div id=\"player-help\" class=\"css-icon xpd-help-icon\">?</div>", "additional-info-".concat(player.id));
            }
            if (player.playerNo === 1) {
                dojo.place("<div id=\"firstPlayerIcon\" class=\"css-icon player-turn-order\">1</div>", "additional-info-".concat(player.id), "last");
            }
        });
        this.setTooltipToClass("revealed-tokens-back-counter", _("Revealed destinations reached"));
        this.setTooltipToClass("tickets-counter", _("Remaining tickets"));
        this.setTooltipToClass("destinations-counter", _("Completed / Total destination cards"));
        this.setTooltipToClass("common-destinations-counter", _("Shared destinations reached"));
        this.setTooltipToClass("xpd-help-icon", "<div class=\"help-card recto\"></div>");
        this.setTooltipToClass("fa-star", "<div class=\"help-card verso\"></div>");
        this.setTooltipToClass("player-turn-order", _("First player"));
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
        return ((route.color == 0 || cardsColor == 0 || route.color == cardsColor) &&
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
        dojo.toggleClass("revealDestination_button", "disabled", this.destinationToReveal == null);
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
            (this.gamedatas.gamestate.name !== "chooseAction" && this.gamedatas.gamestate.name !== "useTicket")) {
            return;
        }
        var args = this.gamedatas.gamestate.args;
        if (selectedColor) {
            this.map.setSelectableRoutes(true, args.possibleRoutes.filter(function (route) { return route.color === selectedColor; }));
        }
    };
    /**
     * Handle route click.
     */
    Expeditions.prototype.clickedRoute = function (route, needToCheckDoubleRoute) {
        var _this = this;
        if (!this.isCurrentPlayerActive()) {
            return;
        }
        //const otherRoute = getAllRoutes().find((r) => route.from == r.from && route.to == r.to && route.id != r.id);
        if (!this.canClaimRoute(route, 0) && !dojo.hasClass("route-spaces-route".concat(route.id, "-space0"), "removable")) {
            return;
        }
        document
            .querySelectorAll("[id^=\"claimRouteWithColor_button\"]")
            .forEach(function (button) { return button.parentElement.removeChild(button); });
        if (dojo.hasClass("route-spaces-route".concat(route.id, "-space0"), "removable")) {
            if (!$("unclaimRouteConfirm_button")) {
                this.addActionButton("unclaimRouteConfirm_button", _("Confirm"), function () {
                    dojo.destroy("unclaimRouteConfirm_button");
                    _this.unclaimRoute(route.id);
                });
            }
            this.startActionTimer("unclaimRouteConfirm_button", 1);
        }
        else {
            if (this.selectedArrowColor != route.color) {
                console.log("clic on the wrong color:", this.selectArrowColor, "instead of", route.color);
                return;
            }
            if (!$("claimRouteConfirm_button")) {
                this.addActionButton("claimRouteConfirm_button", _("Confirm"), function () {
                    dojo.destroy("claimRouteConfirm_button");
                    _this.claimRoute(route.id, _this.selectedArrowColor);
                });
            }
            this.startActionTimer("claimRouteConfirm_button", 1);
        }
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
    Expeditions.prototype.toDoDestinationSelectionChanged = function (selection, lastChange) {
        if (this.gamedatas.gamestate.name == "revealDestination") {
            this.revealDestination(lastChange);
        }
        else if (this.gamedatas.gamestate.name == "chooseAdditionalDestinations") {
            this.toggleDisableButtonTrade(this.destinationSelection.getSelectedDestinationsIds().length != selection.length);
        }
    };
    Expeditions.prototype.toggleDisableButtonTrade = function (disable) {
        var _a;
        (_a = document.getElementById("chooseAdditionalDestinations_button")) === null || _a === void 0 ? void 0 : _a.classList.toggle("disabled", disable);
    };
    Expeditions.prototype.destinationSelectionChanged = function (selectedIds) {
        this.toggleDisableButtonTrade(this.playerTable.getSelectedToDoDestinations().length != selectedIds.length);
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
                button.innerHTML = _actionTimerLabel + " (" + _actionTimerSeconds + ")";
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
            this.originalTextChooseAction = document.getElementById("pagemaintitletext").innerHTML;
        }
        document.getElementById("pagemaintitletext").innerHTML = newText !== null && newText !== void 0 ? newText : this.originalTextChooseAction;
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
        var chooseActionArgs = this.gamedatas.gamestate.args;
        if (!chooseActionArgs.canPass) {
            this.addArrowsColoredButtons(chooseActionArgs.remainingArrows, chooseActionArgs.possibleRoutes);
        }
        this.addImageActionButton("useTicket_button", this.createDiv("expTicket", "expTicket"), "blue", _("Use a ticket to place another arrow, remove the last one of any expedition or exchange a card"), function () {
            _this.useTicket();
        });
        $("expTicket").parentElement.style.padding = "0";
        dojo.toggleClass("useTicket_button", "disabled", !chooseActionArgs.canUseTicket);
        if (chooseActionArgs.canPass) {
            this.addActionButton("pass_button", _("End my turn"), function () { return _this.pass(); });
        }
    };
    /**
     * Sets the action bar (title and buttons) for Use ticket action.
     */
    Expeditions.prototype.setActionBarUseTicket = function (fromCancel) {
        var _this = this;
        document.getElementById("generalactions").innerHTML = "";
        if (fromCancel) {
            this.setChooseActionGamestateDescription();
        }
        if (this.actionTimerId) {
            window.clearInterval(this.actionTimerId);
        }
        var stateArgs = this.gamedatas.gamestate.args;
        this.addArrowsColoredButtons(stateArgs.remainingArrows, stateArgs.possibleRoutes);
        this.addActionButton("drawDestinations_button", _("Trade one destination"), function () { return _this.drawDestinations(); }, null, null, "blue");
    };
    Expeditions.prototype.selectArrowColor = function (color) {
        this.selectedArrowColor = color;
        this.selectedColorChanged(color);
        dojo.query(".place-arrow-button.selected").removeClass("selected");
        dojo.toggleClass("placeArrow_button_" + getColor(color, false), "selected", this.selectedArrowColor != 0);
    };
    Expeditions.prototype.addArrowsColoredButtons = function (remainingArrows, possibleRoutes) {
        var _this = this;
        COLORS.forEach(function (color) {
            var colorName = getColor(color);
            var rawColorName = getColor(color, false);
            var label = dojo.string.substitute(_("Continue the ${colorName} expedition"), {
                colorName: "".concat(colorName),
            });
            _this.addImageActionButton("placeArrow_button_" + rawColorName, _this.createDiv("arrow " + rawColorName), colorName, label, function () {
                _this.selectArrowColor(color);
            }, "place-arrow-button");
            dojo.place(dojo.create("span", {
                class: "remaining-arrows-count",
                innerHTML: "x" + remainingArrows[color],
            }).outerHTML, "placeArrow_button_" + rawColorName, "after");
        });
        //disable buttons if no more arrows or not possible to use a certain color
        var colors = possibleRoutes.map(function (r) { return r.color; });
        COLORS.forEach(function (c) {
            return dojo.toggleClass("placeArrow_button_" + getColor(c, false), "disabled", !colors.find(function (pc) { return pc == c; }) || remainingArrows[c] == 0);
        });
        //auto select color if there is only one possible
        var enabledButtons = dojo.query(".place-arrow-button:not(.disabled)");
        if (enabledButtons.length == 1) {
            enabledButtons[0].click();
        }
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
        if (confirmation) {
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
            keptDestinationId: destinationsIds.pop(),
            discardedDestinationId: this.playerTable.getSelectedToDoDestinations().pop().id,
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
     * Unclaim a route (with a ticket).
     */
    Expeditions.prototype.unclaimRoute = function (routeId) {
        if (!this.checkAction("unclaimRoute")) {
            return;
        }
        this.takeAction("unclaimRoute", {
            routeId: routeId,
        });
    };
    /**
     * Use ticket.
     */
    Expeditions.prototype.useTicket = function () {
        if (!this.checkAction("useTicket")) {
            return;
        }
        this.takeAction("useTicket");
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
    Expeditions.prototype.takeAction = function (action, data) {
        data = data || {};
        data.lock = true;
        this.ajaxcall("/expeditions/expeditions/".concat(action, ".html"), data, this, function () { });
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
        var notifs = [
            ["claimedRoute", ANIMATION_MS],
            ["unclaimedRoute", ANIMATION_MS],
            ["destinationCompleted", ANIMATION_MS],
            ["points", 1],
            ["ticketUsed", 1],
            ["destinationsPicked", 1],
            ["newSharedDestinationsOnTable", 1],
            ["lastTurn", 1],
            ["bestScore", 1],
            ["destinationRevealed", 1],
            ["highlightWinnerScore", 1],
        ];
        notifs.forEach(function (notif) {
            dojo.subscribe(notif[0], _this, "notif_".concat(notif[0]));
            _this.notifqueue.setSynchronous(notif[0], notif[1]);
        });
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
     * Shows a revealed destination.
     */
    Expeditions.prototype.notif_destinationRevealed = function (notif) {
        this.showRevealedDestination(this.gamedatas.players[notif.args.playerId], notif.args.destination);
    };
    /**
     * Adds shared destinations.
     */
    Expeditions.prototype.notif_newSharedDestinationsOnTable = function (notif) {
        this.sharedDestinations.setCards(notif.args.sharedDestinations);
        this.map.showSharedDestinations(notif.args.sharedDestinations);
    };
    /**
     * Update player destinations.
     */
    Expeditions.prototype.notif_destinationsPicked = function (notif) {
        var _a, _b, _c, _d, _e, _f;
        this.destinationCardCounters[notif.args.playerId].incValue(notif.args.number);
        var destinations = (_b = (_a = notif.args._private) === null || _a === void 0 ? void 0 : _a[this.getPlayerId()]) === null || _b === void 0 ? void 0 : _b.destinations;
        var discarded = (_d = (_c = notif.args._private) === null || _c === void 0 ? void 0 : _c[this.getPlayerId()]) === null || _d === void 0 ? void 0 : _d.discardedDestination;
        if (destinations) {
            (_e = this.playerTable) === null || _e === void 0 ? void 0 : _e.addDestinations(destinations, this.destinationSelection.destinations);
            (_f = this.playerTable) === null || _f === void 0 ? void 0 : _f.removeDestination(discarded);
        }
        else {
            this.trainCarSelection.moveDestinationCardToPlayerBoard(notif.args.playerId, notif.args.number);
        }
        //this.trainCarSelection.setDestinationCount(notif.args.remainingDestinationsInDeck);
    };
    /**
     * Update claimed routes.
     */
    Expeditions.prototype.notif_claimedRoute = function (notif) {
        var playerId = notif.args.playerId;
        var route = notif.args.route;
        this.ticketsCounters[playerId].incValue(notif.args.ticketsGained);
        this.gamedatas.claimedRoutes = notif.args.claimedRoutes;
        this.map.addClaimedRoute({
            playerId: playerId,
            routeId: route.id,
            reverseDirection: notif.args.reverseDirection,
        }, this.gamedatas.claimedRoutes);
    };
    /**
     * Update unclaimed route.
     */
    Expeditions.prototype.notif_unclaimedRoute = function (notif) {
        var playerId = notif.args.playerId;
        var route = notif.args.route;
        this.map.unclaimRoute(route);
        this.ticketsCounters[playerId].incValue(notif.args.ticketsGained);
    };
    /**
     * Update unclaimed routes.
     */
    Expeditions.prototype.notif_ticketUsed = function (notif) {
        var playerId = notif.args.playerId;
        this.ticketsCounters[playerId].incValue(-1);
    };
    /**
     * Mark a destination as complete.
     */
    Expeditions.prototype.notif_destinationCompleted = function (notif) {
        var _a;
        var playerId = notif.args.playerId;
        var destination = notif.args.destination;
        if (destination.location == "sharedCompleted") {
            this.commonCompletedDestinationsCounters[playerId].incValue(1);
            this.map.removeRevealedDestination(destination);
            this.sharedDestinations.removeCard(destination);
        }
        else {
            this.completedDestinationsCounters[playerId].incValue(1);
        }
        this.gamedatas.completedDestinations.push(destination);
        (_a = this.playerTable) === null || _a === void 0 ? void 0 : _a.markDestinationComplete(destination, notif.args.destinationRoutes);
        this.revealedTokensBackCounters[playerId].incValue(notif.args.revealedTokenBack);
        playSound("ttr-completed-in-game");
        this.disableNextMoveSound();
    };
    /**
     * Show last turn banner.
     */
    Expeditions.prototype.notif_lastTurn = function (animate) {
        if (animate === void 0) { animate = true; }
        dojo.place("<div id=\"last-round\">\n            <span class=\"last-round-text ".concat(animate ? "animate" : "", "\">").concat(_("Finishing round before end of game!"), "</span>\n        </div>"), "page-title");
    };
    /**
     * Save best score for end score animations.
     */
    Expeditions.prototype.notif_bestScore = function (notif) {
        var _a, _b;
        this.gamedatas.bestScore = notif.args.bestScore;
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.setBestScore(notif.args.bestScore);
        (_b = this.endScore) === null || _b === void 0 ? void 0 : _b.updateScores(notif.args.players);
    };
    /**
     * Highlight winner for end score.
     */
    Expeditions.prototype.notif_highlightWinnerScore = function (notif) {
        var _a;
        (_a = this.endScore) === null || _a === void 0 ? void 0 : _a.highlightWinnerScore(notif.args.playerId);
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
                        .map(function (color) { return "<div class=\"train-car-color icon\" data-color=\"".concat(color, "\"></div>"); })
                        .join("");
                }
                // make cities names in bold
                ["from", "to", "count", "extraCards", "pickedCards"].forEach(function (field) {
                    if (args[field] !== null && args[field] !== undefined && args[field][0] != "<") {
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
var DEFAULT_ZOOM_LEVELS = [0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
var ZoomManager = /** @class */ (function () {
    /**
     * Place the settings.element in a zoom wrapper and init zoomControls.
     *
     * @param settings: a `ZoomManagerSettings` object
     */
    function ZoomManager(settings) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        this.settings = settings;
        if (!settings.element) {
            throw new DOMException('You need to set the element to wrap in the zoom element');
        }
        this.zoomLevels = (_a = settings.zoomLevels) !== null && _a !== void 0 ? _a : DEFAULT_ZOOM_LEVELS;
        this._zoom = this.settings.defaultZoom || 1;
        if (this.settings.localStorageZoomKey) {
            var zoomStr = localStorage.getItem(this.settings.localStorageZoomKey);
            if (zoomStr) {
                this._zoom = Number(zoomStr);
            }
        }
        this.wrapper = document.createElement('div');
        this.wrapper.id = 'bga-zoom-wrapper';
        this.wrapElement(this.wrapper, settings.element);
        this.wrapper.appendChild(settings.element);
        settings.element.classList.add('bga-zoom-inner');
        if ((_b = settings.smooth) !== null && _b !== void 0 ? _b : true) {
            settings.element.dataset.smooth = 'true';
            settings.element.addEventListener('transitionend', function () { return _this.zoomOrDimensionChanged(); });
        }
        if ((_d = (_c = settings.zoomControls) === null || _c === void 0 ? void 0 : _c.visible) !== null && _d !== void 0 ? _d : true) {
            this.initZoomControls(settings);
        }
        if (this._zoom !== 1) {
            this.setZoom(this._zoom);
        }
        window.addEventListener('resize', function () {
            var _a;
            _this.zoomOrDimensionChanged();
            if ((_a = _this.settings.autoZoom) === null || _a === void 0 ? void 0 : _a.expectedWidth) {
                _this.setAutoZoom();
            }
        });
        if (window.ResizeObserver) {
            new ResizeObserver(function () { return _this.zoomOrDimensionChanged(); }).observe(settings.element);
        }
        if ((_e = this.settings.autoZoom) === null || _e === void 0 ? void 0 : _e.expectedWidth) {
            this.setAutoZoom();
        }
    }
    Object.defineProperty(ZoomManager.prototype, "zoom", {
        /**
         * Returns the zoom level
         */
        get: function () {
            return this._zoom;
        },
        enumerable: false,
        configurable: true
    });
    ZoomManager.prototype.setAutoZoom = function () {
        var _this = this;
        var _a, _b, _c;
        var zoomWrapperWidth = document.getElementById('bga-zoom-wrapper').clientWidth;
        if (!zoomWrapperWidth) {
            setTimeout(function () { return _this.setAutoZoom(); }, 200);
            return;
        }
        var expectedWidth = (_a = this.settings.autoZoom) === null || _a === void 0 ? void 0 : _a.expectedWidth;
        var newZoom = this.zoom;
        while (newZoom > this.zoomLevels[0] && newZoom > ((_c = (_b = this.settings.autoZoom) === null || _b === void 0 ? void 0 : _b.minZoomLevel) !== null && _c !== void 0 ? _c : 0) && zoomWrapperWidth / newZoom < expectedWidth) {
            newZoom = this.zoomLevels[this.zoomLevels.indexOf(newZoom) - 1];
        }
        if (this._zoom == newZoom) {
            if (this.settings.localStorageZoomKey) {
                localStorage.setItem(this.settings.localStorageZoomKey, '' + this._zoom);
            }
        }
        else {
            this.setZoom(newZoom);
        }
    };
    /**
     * Set the zoom level. Ideally, use a zoom level in the zoomLevels range.
     * @param zoom zool level
     */
    ZoomManager.prototype.setZoom = function (zoom) {
        var _a, _b, _c, _d;
        if (zoom === void 0) { zoom = 1; }
        this._zoom = zoom;
        if (this.settings.localStorageZoomKey) {
            localStorage.setItem(this.settings.localStorageZoomKey, '' + this._zoom);
        }
        var newIndex = this.zoomLevels.indexOf(this._zoom);
        (_a = this.zoomInButton) === null || _a === void 0 ? void 0 : _a.classList.toggle('disabled', newIndex === this.zoomLevels.length - 1);
        (_b = this.zoomOutButton) === null || _b === void 0 ? void 0 : _b.classList.toggle('disabled', newIndex === 0);
        this.settings.element.style.transform = zoom === 1 ? '' : "scale(".concat(zoom, ")");
        (_d = (_c = this.settings).onZoomChange) === null || _d === void 0 ? void 0 : _d.call(_c, this._zoom);
        this.zoomOrDimensionChanged();
    };
    /**
     * Call this method for the browsers not supporting ResizeObserver, everytime the table height changes, if you know it.
     * If the browsert is recent enough (>= Safari 13.1) it will just be ignored.
     */
    ZoomManager.prototype.manualHeightUpdate = function () {
        if (!window.ResizeObserver) {
            this.zoomOrDimensionChanged();
        }
    };
    /**
     * Everytime the element dimensions changes, we update the style. And call the optional callback.
     */
    ZoomManager.prototype.zoomOrDimensionChanged = function () {
        var _a, _b;
        this.settings.element.style.width = "".concat(this.wrapper.getBoundingClientRect().width / this._zoom, "px");
        this.wrapper.style.height = "".concat(this.settings.element.getBoundingClientRect().height, "px");
        (_b = (_a = this.settings).onDimensionsChange) === null || _b === void 0 ? void 0 : _b.call(_a, this._zoom);
    };
    /**
     * Simulates a click on the Zoom-in button.
     */
    ZoomManager.prototype.zoomIn = function () {
        if (this._zoom === this.zoomLevels[this.zoomLevels.length - 1]) {
            return;
        }
        var newIndex = this.zoomLevels.indexOf(this._zoom) + 1;
        this.setZoom(newIndex === -1 ? 1 : this.zoomLevels[newIndex]);
    };
    /**
     * Simulates a click on the Zoom-out button.
     */
    ZoomManager.prototype.zoomOut = function () {
        if (this._zoom === this.zoomLevels[0]) {
            return;
        }
        var newIndex = this.zoomLevels.indexOf(this._zoom) - 1;
        this.setZoom(newIndex === -1 ? 1 : this.zoomLevels[newIndex]);
    };
    /**
     * Changes the color of the zoom controls.
     */
    ZoomManager.prototype.setZoomControlsColor = function (color) {
        if (this.zoomControls) {
            this.zoomControls.dataset.color = color;
        }
    };
    /**
     * Set-up the zoom controls
     * @param settings a `ZoomManagerSettings` object.
     */
    ZoomManager.prototype.initZoomControls = function (settings) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        this.zoomControls = document.createElement('div');
        this.zoomControls.id = 'bga-zoom-controls';
        this.zoomControls.dataset.position = (_b = (_a = settings.zoomControls) === null || _a === void 0 ? void 0 : _a.position) !== null && _b !== void 0 ? _b : 'top-right';
        this.zoomOutButton = document.createElement('button');
        this.zoomOutButton.type = 'button';
        this.zoomOutButton.addEventListener('click', function () { return _this.zoomOut(); });
        if ((_c = settings.zoomControls) === null || _c === void 0 ? void 0 : _c.customZoomOutElement) {
            settings.zoomControls.customZoomOutElement(this.zoomOutButton);
        }
        else {
            this.zoomOutButton.classList.add("bga-zoom-out-icon");
        }
        this.zoomInButton = document.createElement('button');
        this.zoomInButton.type = 'button';
        this.zoomInButton.addEventListener('click', function () { return _this.zoomIn(); });
        if ((_d = settings.zoomControls) === null || _d === void 0 ? void 0 : _d.customZoomInElement) {
            settings.zoomControls.customZoomInElement(this.zoomInButton);
        }
        else {
            this.zoomInButton.classList.add("bga-zoom-in-icon");
        }
        this.zoomControls.appendChild(this.zoomOutButton);
        this.zoomControls.appendChild(this.zoomInButton);
        this.wrapper.appendChild(this.zoomControls);
        this.setZoomControlsColor((_f = (_e = settings.zoomControls) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : 'black');
    };
    /**
     * Wraps an element around an existing DOM element
     * @param wrapper the wrapper element
     * @param element the existing element
     */
    ZoomManager.prototype.wrapElement = function (wrapper, element) {
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
    };
    return ZoomManager;
}());
/**
 * Linear slide of the card from origin to destination.
 *
 * @param element the element to animate. The element should be attached to the destination element before the animation starts.
 * @param settings an `AnimationSettings` object
 * @returns a promise when animation ends
 */
function slideAnimation(element, settings) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d, _e;
        // should be checked at the beginning of every animation
        if (!shouldAnimate(settings)) {
            success(false);
            return promise;
        }
        var _f = getDeltaCoordinates(element, settings), x = _f.x, y = _f.y;
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        element.style.zIndex = "".concat((_b = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _b !== void 0 ? _b : 10);
        element.style.transition = null;
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_c = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _c !== void 0 ? _c : 0, "deg)");
        (_d = settings.animationStart) === null || _d === void 0 ? void 0 : _d.call(settings, element);
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            var _a;
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            (_a = settings.animationEnd) === null || _a === void 0 ? void 0 : _a.call(settings, element);
            success(true);
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionCancel);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms linear");
        element.offsetHeight;
        element.style.transform = (_e = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _e !== void 0 ? _e : null;
        // safety in case transitionend and transitioncancel are not called
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
function shouldAnimate(settings) {
    var _a;
    return document.visibilityState !== 'hidden' && !((_a = settings === null || settings === void 0 ? void 0 : settings.game) === null || _a === void 0 ? void 0 : _a.instantaneousMode);
}
/**
 * Return the x and y delta, based on the animation settings;
 *
 * @param settings an `AnimationSettings` object
 * @returns a promise when animation ends
 */
function getDeltaCoordinates(element, settings) {
    var _a;
    if (!settings.fromDelta && !settings.fromRect && !settings.fromElement) {
        throw new Error("[bga-animation] fromDelta, fromRect or fromElement need to be set");
    }
    var x = 0;
    var y = 0;
    if (settings.fromDelta) {
        x = settings.fromDelta.x;
        y = settings.fromDelta.y;
    }
    else {
        var originBR = (_a = settings.fromRect) !== null && _a !== void 0 ? _a : settings.fromElement.getBoundingClientRect();
        // TODO make it an option ?
        var originalTransform = element.style.transform;
        element.style.transform = '';
        var destinationBR = element.getBoundingClientRect();
        element.style.transform = originalTransform;
        x = (destinationBR.left + destinationBR.right) / 2 - (originBR.left + originBR.right) / 2;
        y = (destinationBR.top + destinationBR.bottom) / 2 - (originBR.top + originBR.bottom) / 2;
    }
    if (settings.scale) {
        x /= settings.scale;
        y /= settings.scale;
    }
    return { x: x, y: y };
}
function logAnimation(element, settings) {
    console.log(element, element.getBoundingClientRect(), element.style.transform, settings);
    return Promise.resolve(false);
}
var AnimationManager = /** @class */ (function () {
    /**
     * @param game the BGA game class, usually it will be `this`
     * @param settings: a `AnimationManagerSettings` object
     */
    function AnimationManager(game, settings) {
        this.game = game;
        this.settings = settings;
        this.zoomManager = settings === null || settings === void 0 ? void 0 : settings.zoomManager;
    }
    /**
     * Attach an element to a parent, then play animation from element's origin to its new position.
     *
     * @param element the element to animate
     * @param toElement the destination parent
     * @param fn the animation function
     * @param settings the animation settings
     * @returns a promise when animation ends
     */
    AnimationManager.prototype.attachWithAnimation = function (element, toElement, fn, settings) {
        var _a, _b, _c, _d, _e, _f;
        var fromRect = element.getBoundingClientRect();
        toElement.appendChild(element);
        (_a = settings === null || settings === void 0 ? void 0 : settings.afterAttach) === null || _a === void 0 ? void 0 : _a.call(settings, element, toElement);
        return (_f = fn(element, __assign(__assign({ duration: (_c = (_b = this.settings) === null || _b === void 0 ? void 0 : _b.duration) !== null && _c !== void 0 ? _c : 500, scale: (_e = (_d = this.zoomManager) === null || _d === void 0 ? void 0 : _d.zoom) !== null && _e !== void 0 ? _e : undefined }, settings !== null && settings !== void 0 ? settings : {}), { game: this.game, fromRect: fromRect }))) !== null && _f !== void 0 ? _f : Promise.resolve(false);
    };
    /**
     * Attach an element to a parent with a slide animation.
     *
     * @param card the card informations
     */
    AnimationManager.prototype.attachWithSlideAnimation = function (element, toElement, settings) {
        return this.attachWithAnimation(element, toElement, slideAnimation, settings);
    };
    /**
     * Attach an element to a parent with a slide animation.
     *
     * @param card the card informations
     */
    AnimationManager.prototype.attachWithShowToScreenAnimation = function (element, toElement, settingsOrSettingsArray) {
        var _this = this;
        var cumulatedAnimation = function (element, settings) { return cumulatedAnimations(element, [
            showScreenCenterAnimation,
            pauseAnimation,
            function (element) { return _this.attachWithSlideAnimation(element, toElement); },
        ], settingsOrSettingsArray); };
        return this.attachWithAnimation(element, toElement, cumulatedAnimation, null);
    };
    /**
     * Slide from an element.
     *
     * @param element the element to animate
     * @param fromElement the origin element
     * @param settings the animation settings
     * @returns a promise when animation ends
     */
    AnimationManager.prototype.slideFromElement = function (element, fromElement, settings) {
        var _a, _b, _c, _d, _e;
        return (_e = slideAnimation(element, __assign(__assign({ duration: (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.duration) !== null && _b !== void 0 ? _b : 500, scale: (_d = (_c = this.zoomManager) === null || _c === void 0 ? void 0 : _c.zoom) !== null && _d !== void 0 ? _d : undefined }, settings !== null && settings !== void 0 ? settings : {}), { game: this.game, fromElement: fromElement }))) !== null && _e !== void 0 ? _e : Promise.resolve(false);
    };
    AnimationManager.prototype.getZoomManager = function () {
        return this.zoomManager;
    };
    /**
     * Set the zoom manager, to get the scale of the current game.
     *
     * @param zoomManager the zoom manager
     */
    AnimationManager.prototype.setZoomManager = function (zoomManager) {
        this.zoomManager = zoomManager;
    };
    AnimationManager.prototype.getSettings = function () {
        return this.settings;
    };
    return AnimationManager;
}());
/**
 * The abstract stock. It shouldn't be used directly, use stocks that extends it.
 */
var CardStock = /** @class */ (function () {
    /**
     * @param manager the card manager
     * @param element the stock element (should be an empty HTML Element)
     */
    function CardStock(manager, element, settings) {
        this.manager = manager;
        this.element = element;
        this.cards = [];
        this.selectedCards = [];
        this.selectionMode = 'none';
        manager.addStock(this);
        element === null || element === void 0 ? void 0 : element.classList.add('card-stock' /*, this.constructor.name.split(/(?=[A-Z])/).join('-').toLowerCase()* doesn't work in production because of minification */);
        this.bindClick();
        this.sort = settings === null || settings === void 0 ? void 0 : settings.sort;
    }
    /**
     * @returns the cards on the stock
     */
    CardStock.prototype.getCards = function () {
        return this.cards.slice();
    };
    /**
     * @returns if the stock is empty
     */
    CardStock.prototype.isEmpty = function () {
        return !this.cards.length;
    };
    /**
     * @returns the selected cards
     */
    CardStock.prototype.getSelection = function () {
        return this.selectedCards.slice();
    };
    /**
     * @param card a card
     * @returns if the card is present in the stock
     */
    CardStock.prototype.contains = function (card) {
        var _this = this;
        return this.cards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
    };
    // TODO keep only one ?
    CardStock.prototype.cardInStock = function (card) {
        var element = document.getElementById(this.manager.getId(card));
        return element ? this.cardElementInStock(element) : false;
    };
    CardStock.prototype.cardElementInStock = function (element) {
        return (element === null || element === void 0 ? void 0 : element.parentElement) == this.element;
    };
    /**
     * @param card a card in the stock
     * @returns the HTML element generated for the card
     */
    CardStock.prototype.getCardElement = function (card) {
        return document.getElementById(this.manager.getId(card));
    };
    /**
     * Checks if the card can be added. By default, only if it isn't already present in the stock.
     *
     * @param card the card to add
     * @param settings the addCard settings
     * @returns if the card can be added
     */
    CardStock.prototype.canAddCard = function (card, settings) {
        return !this.cardInStock(card);
    };
    /**
     * Add a card to the stock.
     *
     * @param card the card to add
     * @param animation a `CardAnimation` object
     * @param settings a `AddCardSettings` object
     * @returns the promise when the animation is done (true if it was animated, false if it wasn't)
     */
    CardStock.prototype.addCard = function (card, animation, settings) {
        var _a, _b;
        if (!this.canAddCard(card, settings)) {
            return Promise.resolve(false);
        }
        var promise;
        // we check if card is in stock then we ignore animation
        var currentStock = this.manager.getCardStock(card);
        var index = this.getNewCardIndex(card);
        var settingsWithIndex = __assign({ index: index }, (settings !== null && settings !== void 0 ? settings : {}));
        if (currentStock === null || currentStock === void 0 ? void 0 : currentStock.cardInStock(card)) {
            var element = document.getElementById(this.manager.getId(card));
            promise = this.moveFromOtherStock(card, element, __assign(__assign({}, animation), { fromStock: currentStock }), settingsWithIndex);
            element.dataset.side = ((_a = settingsWithIndex === null || settingsWithIndex === void 0 ? void 0 : settingsWithIndex.visible) !== null && _a !== void 0 ? _a : true) ? 'front' : 'back';
        }
        else if ((animation === null || animation === void 0 ? void 0 : animation.fromStock) && animation.fromStock.cardInStock(card)) {
            var element = document.getElementById(this.manager.getId(card));
            promise = this.moveFromOtherStock(card, element, animation, settingsWithIndex);
        }
        else {
            var element = this.manager.createCardElement(card, ((_b = settingsWithIndex === null || settingsWithIndex === void 0 ? void 0 : settingsWithIndex.visible) !== null && _b !== void 0 ? _b : true));
            promise = this.moveFromElement(card, element, animation, settingsWithIndex);
        }
        this.setSelectableCard(card, this.selectionMode != 'none');
        if (settingsWithIndex.index !== null && settingsWithIndex.index !== undefined) {
            this.cards.splice(index, 0, card);
        }
        else {
            this.cards.push(card);
        }
        if (!promise) {
            console.warn("CardStock.addCard didn't return a Promise");
            return Promise.resolve(false);
        }
        return promise;
    };
    CardStock.prototype.getNewCardIndex = function (card) {
        if (this.sort) {
            var otherCards = this.getCards();
            for (var i = 0; i < otherCards.length; i++) {
                var otherCard = otherCards[i];
                if (this.sort(card, otherCard) < 0) {
                    return i;
                }
            }
            return otherCards.length;
        }
        else {
            return undefined;
        }
    };
    CardStock.prototype.addCardElementToParent = function (cardElement, settings) {
        var _a;
        var parent = (_a = settings === null || settings === void 0 ? void 0 : settings.forceToElement) !== null && _a !== void 0 ? _a : this.element;
        if ((settings === null || settings === void 0 ? void 0 : settings.index) === null || (settings === null || settings === void 0 ? void 0 : settings.index) === undefined || !parent.children.length || (settings === null || settings === void 0 ? void 0 : settings.index) >= parent.children.length) {
            parent.appendChild(cardElement);
        }
        else {
            parent.insertBefore(cardElement, parent.children[settings.index]);
        }
    };
    CardStock.prototype.moveFromOtherStock = function (card, cardElement, animation, settings) {
        var promise;
        this.addCardElementToParent(cardElement, settings);
        cardElement.classList.remove('selectable', 'selected', 'disabled');
        promise = this.animationFromElement(cardElement, animation.fromStock.element, {
            originalSide: animation.originalSide,
            rotationDelta: animation.rotationDelta,
            animation: animation.animation,
        });
        // in the case the card was move inside the same stock we don't remove it
        if (animation.fromStock != this) {
            animation.fromStock.removeCard(card);
        }
        if (!promise) {
            console.warn("CardStock.moveFromOtherStock didn't return a Promise");
            promise = Promise.resolve(false);
        }
        return promise;
    };
    CardStock.prototype.moveFromElement = function (card, cardElement, animation, settings) {
        var promise;
        this.addCardElementToParent(cardElement, settings);
        if (animation) {
            if (animation.fromStock) {
                promise = this.animationFromElement(cardElement, animation.fromStock.element, {
                    originalSide: animation.originalSide,
                    rotationDelta: animation.rotationDelta,
                    animation: animation.animation,
                });
                animation.fromStock.removeCard(card);
            }
            else if (animation.fromElement) {
                promise = this.animationFromElement(cardElement, animation.fromElement, {
                    originalSide: animation.originalSide,
                    rotationDelta: animation.rotationDelta,
                    animation: animation.animation,
                });
            }
        }
        else {
            promise = Promise.resolve(false);
        }
        if (!promise) {
            console.warn("CardStock.moveFromElement didn't return a Promise");
            promise = Promise.resolve(false);
        }
        return promise;
    };
    /**
     * Add an array of cards to the stock.
     *
     * @param cards the cards to add
     * @param animation a `CardAnimation` object
     * @param settings a `AddCardSettings` object
     * @param shift if number, the number of milliseconds between each card. if true, chain animations
     */
    CardStock.prototype.addCards = function (cards, animation, settings, shift) {
        var _this = this;
        if (shift === void 0) { shift = false; }
        if (shift === true) {
            if (cards.length) {
                this.addCard(cards[0], animation, settings).then(function () { return _this.addCards(cards.slice(1), animation, settings, shift); });
            }
            return;
        }
        if (shift) {
            var _loop_3 = function (i) {
                setTimeout(function () { return _this.addCard(cards[i], animation, settings); }, i * shift);
            };
            for (var i = 0; i < cards.length; i++) {
                _loop_3(i);
            }
        }
        else {
            cards.forEach(function (card) { return _this.addCard(card, animation, settings); });
        }
    };
    /**
     * Remove a card from the stock.
     *
     * @param card the card to remove
     */
    CardStock.prototype.removeCard = function (card) {
        if (this.cardInStock(card)) {
            this.manager.removeCard(card);
        }
        this.cardRemoved(card);
    };
    CardStock.prototype.cardRemoved = function (card) {
        var _this = this;
        var index = this.cards.findIndex(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
        if (index !== -1) {
            this.cards.splice(index, 1);
        }
        if (this.selectedCards.find(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); })) {
            this.unselectCard(card);
        }
    };
    /**
     * Remove a set of card from the stock.
     *
     * @param cards the cards to remove
     */
    CardStock.prototype.removeCards = function (cards) {
        var _this = this;
        cards.forEach(function (card) { return _this.removeCard(card); });
    };
    /**
     * Remove all cards from the stock.
     */
    CardStock.prototype.removeAll = function () {
        var _this = this;
        var cards = this.getCards(); // use a copy of the array as we iterate and modify it at the same time
        cards.forEach(function (card) { return _this.removeCard(card); });
    };
    CardStock.prototype.setSelectableCard = function (card, selectable) {
        var element = this.getCardElement(card);
        element.classList.toggle('selectable', selectable);
    };
    /**
     * Set if the stock is selectable, and if yes if it can be multiple.
     * If set to 'none', it will unselect all selected cards.
     *
     * @param selectionMode the selection mode
     */
    CardStock.prototype.setSelectionMode = function (selectionMode) {
        var _this = this;
        if (selectionMode === 'none') {
            this.unselectAll(true);
        }
        this.cards.forEach(function (card) { return _this.setSelectableCard(card, selectionMode != 'none'); });
        this.element.classList.toggle('selectable', selectionMode != 'none');
        this.selectionMode = selectionMode;
    };
    /**
     * Set selected state to a card.
     *
     * @param card the card to select
     */
    CardStock.prototype.selectCard = function (card, silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        if (this.selectionMode == 'none') {
            return;
        }
        if (this.selectionMode === 'single') {
            this.cards.filter(function (c) { return _this.manager.getId(c) != _this.manager.getId(card); }).forEach(function (c) { return _this.unselectCard(c, true); });
        }
        var element = this.getCardElement(card);
        element.classList.add('selected');
        this.selectedCards.push(card);
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), card);
        }
    };
    /**
     * Set unselected state to a card.
     *
     * @param card the card to unselect
     */
    CardStock.prototype.unselectCard = function (card, silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        var element = this.getCardElement(card);
        element.classList.remove('selected');
        var index = this.selectedCards.findIndex(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
        if (index !== -1) {
            this.selectedCards.splice(index, 1);
        }
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), card);
        }
    };
    /**
     * Select all cards
     */
    CardStock.prototype.selectAll = function (silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        if (this.selectionMode == 'none') {
            return;
        }
        this.cards.forEach(function (c) { return _this.selectCard(c, true); });
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), null);
        }
    };
    /**
     * Unelect all cards
     */
    CardStock.prototype.unselectAll = function (silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        var cards = this.getCards(); // use a copy of the array as we iterate and modify it at the same time
        cards.forEach(function (c) { return _this.unselectCard(c, true); });
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), null);
        }
    };
    CardStock.prototype.bindClick = function () {
        var _this = this;
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
            var cardDiv = event.target.closest('.card');
            if (!cardDiv) {
                return;
            }
            var card = _this.cards.find(function (c) { return _this.manager.getId(c) == cardDiv.id; });
            if (!card) {
                return;
            }
            _this.cardClick(card);
        });
    };
    CardStock.prototype.cardClick = function (card) {
        var _this = this;
        var _a;
        if (this.selectionMode != 'none') {
            var alreadySelected = this.selectedCards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
            if (alreadySelected) {
                this.unselectCard(card);
            }
            else {
                this.selectCard(card);
            }
        }
        (_a = this.onCardClick) === null || _a === void 0 ? void 0 : _a.call(this, card);
    };
    /**
     * @param element The element to animate. The element is added to the destination stock before the animation starts.
     * @param fromElement The HTMLElement to animate from.
     */
    CardStock.prototype.animationFromElement = function (element, fromElement, settings) {
        var _a, _b, _c, _d, _e, _f;
        var side = element.dataset.side;
        if (settings.originalSide && settings.originalSide != side) {
            var cardSides_1 = element.getElementsByClassName('card-sides')[0];
            cardSides_1.style.transition = 'none';
            element.dataset.side = settings.originalSide;
            setTimeout(function () {
                cardSides_1.style.transition = null;
                element.dataset.side = side;
            });
        }
        var animation = (_a = settings.animation) !== null && _a !== void 0 ? _a : slideAnimation;
        return (_f = animation(element, __assign(__assign({ duration: (_c = (_b = this.manager.animationManager.getSettings()) === null || _b === void 0 ? void 0 : _b.duration) !== null && _c !== void 0 ? _c : 500, scale: (_e = (_d = this.manager.animationManager.getZoomManager()) === null || _d === void 0 ? void 0 : _d.zoom) !== null && _e !== void 0 ? _e : undefined }, settings !== null && settings !== void 0 ? settings : {}), { game: this.manager.game, fromElement: fromElement }))) !== null && _f !== void 0 ? _f : Promise.resolve(false);
    };
    /**
     * Set the card to its front (visible) or back (not visible) side.
     *
     * @param card the card informations
     */
    CardStock.prototype.setCardVisible = function (card, visible, settings) {
        this.manager.setCardVisible(card, visible, settings);
    };
    /**
     * Flips the card.
     *
     * @param card the card informations
     */
    CardStock.prototype.flipCard = function (card, settings) {
        this.manager.flipCard(card, settings);
    };
    return CardStock;
}());
/**
 * Abstract stock to represent a deck. (pile of cards, with a fake 3d effect of thickness).
 */
var Deck = /** @class */ (function (_super) {
    __extends(Deck, _super);
    function Deck(manager, element, settings) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, manager, element) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('deck');
        _this.element.style.setProperty('--width', settings.width + 'px');
        _this.element.style.setProperty('--height', settings.height + 'px');
        _this.thicknesses = (_a = settings.thicknesses) !== null && _a !== void 0 ? _a : [0, 2, 5, 10, 20, 30];
        _this.setCardNumber((_b = settings.cardNumber) !== null && _b !== void 0 ? _b : 52);
        _this.autoUpdateCardNumber = (_c = settings.autoUpdateCardNumber) !== null && _c !== void 0 ? _c : true;
        var shadowDirection = (_d = settings.shadowDirection) !== null && _d !== void 0 ? _d : 'bottom-right';
        var shadowDirectionSplit = shadowDirection.split('-');
        var xShadowShift = shadowDirectionSplit.includes('right') ? 1 : (shadowDirectionSplit.includes('left') ? -1 : 0);
        var yShadowShift = shadowDirectionSplit.includes('bottom') ? 1 : (shadowDirectionSplit.includes('top') ? -1 : 0);
        _this.element.style.setProperty('--xShadowShift', '' + xShadowShift);
        _this.element.style.setProperty('--yShadowShift', '' + yShadowShift);
        return _this;
    }
    Deck.prototype.setCardNumber = function (cardNumber) {
        var _this = this;
        this.cardNumber = cardNumber;
        this.element.dataset.empty = (this.cardNumber == 0).toString();
        var thickness = 0;
        this.thicknesses.forEach(function (threshold, index) {
            if (_this.cardNumber >= threshold) {
                thickness = index;
            }
        });
        this.element.style.setProperty('--thickness', thickness + 'px');
    };
    Deck.prototype.addCard = function (card, animation, settings) {
        return _super.prototype.addCard.call(this, card, animation, settings);
    };
    Deck.prototype.cardRemoved = function (card) {
        if (this.autoUpdateCardNumber) {
            this.setCardNumber(this.cardNumber - 1);
        }
        _super.prototype.cardRemoved.call(this, card);
    };
    return Deck;
}(CardStock));
/**
 * A basic stock for a list of cards, based on flex.
 */
var LineStock = /** @class */ (function (_super) {
    __extends(LineStock, _super);
    /**
     * @param manager the card manager
     * @param element the stock element (should be an empty HTML Element)
     * @param settings a `LineStockSettings` object
     */
    function LineStock(manager, element, settings) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('line-stock');
        element.dataset.center = ((_a = settings === null || settings === void 0 ? void 0 : settings.center) !== null && _a !== void 0 ? _a : true).toString();
        element.style.setProperty('--wrap', (_b = settings === null || settings === void 0 ? void 0 : settings.wrap) !== null && _b !== void 0 ? _b : 'wrap');
        element.style.setProperty('--direction', (_c = settings === null || settings === void 0 ? void 0 : settings.direction) !== null && _c !== void 0 ? _c : 'row');
        element.style.setProperty('--gap', (_d = settings === null || settings === void 0 ? void 0 : settings.gap) !== null && _d !== void 0 ? _d : '8px');
        return _this;
    }
    return LineStock;
}(CardStock));
/**
 * A stock with fixed slots (some can be empty)
 */
var SlotStock = /** @class */ (function (_super) {
    __extends(SlotStock, _super);
    /**
     * @param manager the card manager
     * @param element the stock element (should be an empty HTML Element)
     * @param settings a `SlotStockSettings` object
     */
    function SlotStock(manager, element, settings) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        _this.slotsIds = [];
        _this.slots = [];
        element.classList.add('slot-stock');
        _this.mapCardToSlot = settings.mapCardToSlot;
        _this.slotsIds = (_a = settings.slotsIds) !== null && _a !== void 0 ? _a : [];
        _this.slotClasses = (_b = settings.slotClasses) !== null && _b !== void 0 ? _b : [];
        _this.slotsIds.forEach(function (slotId) {
            _this.createSlot(slotId);
        });
        return _this;
    }
    SlotStock.prototype.createSlot = function (slotId) {
        var _a;
        this.slots[slotId] = document.createElement("div");
        this.slots[slotId].dataset.slotId = slotId;
        this.element.appendChild(this.slots[slotId]);
        (_a = this.slots[slotId].classList).add.apply(_a, __spreadArray(['slot'], this.slotClasses, true));
    };
    /**
     * Add a card to the stock.
     *
     * @param card the card to add
     * @param animation a `CardAnimation` object
     * @param settings a `AddCardToSlotSettings` object
     * @returns the promise when the animation is done (true if it was animated, false if it wasn't)
     */
    SlotStock.prototype.addCard = function (card, animation, settings) {
        var _a, _b;
        var slotId = (_a = settings === null || settings === void 0 ? void 0 : settings.slot) !== null && _a !== void 0 ? _a : (_b = this.mapCardToSlot) === null || _b === void 0 ? void 0 : _b.call(this, card);
        if (slotId === undefined) {
            throw new Error("Impossible to add card to slot : no SlotId. Add slotId to settings or set mapCardToSlot to SlotCard constructor.");
        }
        if (!this.slots[slotId]) {
            throw new Error("Impossible to add card to slot \"".concat(slotId, "\" : slot \"").concat(slotId, "\" doesn't exists."));
        }
        var newSettings = __assign(__assign({}, settings), { forceToElement: this.slots[slotId] });
        return _super.prototype.addCard.call(this, card, animation, newSettings);
    };
    /**
     * Change the slots ids. Will empty the stock before re-creating the slots.
     *
     * @param slotsIds the new slotsIds. Will replace the old ones.
     */
    SlotStock.prototype.setSlotsIds = function (slotsIds) {
        var _this = this;
        if (slotsIds.length == this.slotsIds.length && slotsIds.every(function (slotId, index) { return _this.slotsIds[index] === slotId; })) {
            // no change
            return;
        }
        this.removeAll();
        this.element.innerHTML = '';
        this.slotsIds = slotsIds !== null && slotsIds !== void 0 ? slotsIds : [];
        this.slotsIds.forEach(function (slotId) {
            _this.createSlot(slotId);
        });
    };
    SlotStock.prototype.cardElementInStock = function (element) {
        return (element === null || element === void 0 ? void 0 : element.parentElement.parentElement) == this.element;
    };
    SlotStock.prototype.canAddCard = function (card, settings) {
        var _a, _b;
        if (!this.cardInStock(card)) {
            return true;
        }
        else {
            var currentCardSlot = this.getCardElement(card).closest('.slot').dataset.slotId;
            var slotId = (_a = settings === null || settings === void 0 ? void 0 : settings.slot) !== null && _a !== void 0 ? _a : (_b = this.mapCardToSlot) === null || _b === void 0 ? void 0 : _b.call(this, card);
            return currentCardSlot != slotId;
        }
    };
    return SlotStock;
}(LineStock));
var HiddenDeck = /** @class */ (function (_super) {
    __extends(HiddenDeck, _super);
    function HiddenDeck(manager, element, settings) {
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('hidden-deck');
        _this.element.appendChild(_this.manager.createCardElement({ id: "".concat(element.id, "-hidden-deck-back") }, false));
        return _this;
    }
    HiddenDeck.prototype.addCard = function (card, animation, settings) {
        var _a;
        var newSettings = __assign(__assign({}, settings), { visible: (_a = settings === null || settings === void 0 ? void 0 : settings.visible) !== null && _a !== void 0 ? _a : false });
        return _super.prototype.addCard.call(this, card, animation, newSettings);
    };
    return HiddenDeck;
}(Deck));
var VisibleDeck = /** @class */ (function (_super) {
    __extends(VisibleDeck, _super);
    function VisibleDeck(manager, element, settings) {
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('visible-deck');
        return _this;
    }
    VisibleDeck.prototype.addCard = function (card, animation, settings) {
        var _this = this;
        var currentCard = this.cards[this.cards.length - 1];
        if (currentCard) {
            // we remove the card under, only when the animation is done. TODO use promise result
            setTimeout(function () {
                _this.removeCard(currentCard);
                // counter the autoUpdateCardNumber as the card isn't really removed, we just remove it from the dom so player cannot see it's content.
                if (_this.autoUpdateCardNumber) {
                    _this.setCardNumber(_this.cardNumber + 1);
                }
            }, 600);
        }
        return _super.prototype.addCard.call(this, card, animation, settings);
    };
    return VisibleDeck;
}(Deck));
var AllVisibleDeck = /** @class */ (function (_super) {
    __extends(AllVisibleDeck, _super);
    function AllVisibleDeck(manager, element, settings) {
        var _this = this;
        var _a;
        _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('all-visible-deck');
        element.style.setProperty('--width', settings.width);
        element.style.setProperty('--height', settings.height);
        element.style.setProperty('--shift', (_a = settings.shift) !== null && _a !== void 0 ? _a : '3px');
        return _this;
    }
    AllVisibleDeck.prototype.addCard = function (card, animation, settings) {
        var promise;
        var order = this.cards.length;
        promise = _super.prototype.addCard.call(this, card, animation, settings);
        var cardId = this.manager.getId(card);
        var cardDiv = document.getElementById(cardId);
        cardDiv.style.setProperty('--order', '' + order);
        this.element.style.setProperty('--tile-count', '' + this.cards.length);
        return promise;
    };
    /**
     * Set opened state. If true, all cards will be entirely visible.
     *
     * @param opened indicate if deck must be always opened. If false, will open only on hover/touch
     */
    AllVisibleDeck.prototype.setOpened = function (opened) {
        this.element.classList.toggle('opened', opened);
    };
    AllVisibleDeck.prototype.cardRemoved = function (card) {
        var _this = this;
        _super.prototype.cardRemoved.call(this, card);
        this.cards.forEach(function (c, index) {
            var cardId = _this.manager.getId(c);
            var cardDiv = document.getElementById(cardId);
            cardDiv.style.setProperty('--order', '' + index);
        });
        this.element.style.setProperty('--tile-count', '' + this.cards.length);
    };
    return AllVisibleDeck;
}(CardStock));
var CardManager = /** @class */ (function () {
    /**
     * @param game the BGA game class, usually it will be `this`
     * @param settings: a `CardManagerSettings` object
     */
    function CardManager(game, settings) {
        var _a;
        this.game = game;
        this.settings = settings;
        this.stocks = [];
        this.animationManager = (_a = settings.animationManager) !== null && _a !== void 0 ? _a : new AnimationManager(game);
    }
    CardManager.prototype.addStock = function (stock) {
        this.stocks.push(stock);
    };
    /**
     * @param card the card informations
     * @return the id for a card
     */
    CardManager.prototype.getId = function (card) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.settings).getId) === null || _b === void 0 ? void 0 : _b.call(_a, card)) !== null && _c !== void 0 ? _c : "card-".concat(card.id);
    };
    CardManager.prototype.createCardElement = function (card, visible) {
        var _a, _b, _c, _d, _e, _f;
        if (visible === void 0) { visible = true; }
        var id = this.getId(card);
        var side = visible ? 'front' : 'back';
        // TODO check if exists
        var element = document.createElement("div");
        element.id = id;
        element.dataset.side = '' + side;
        element.innerHTML = "\n            <div class=\"card-sides\">\n                <div class=\"card-side front\">\n                </div>\n                <div class=\"card-side back\">\n                </div>\n            </div>\n        ";
        element.classList.add('card');
        document.body.appendChild(element);
        (_b = (_a = this.settings).setupDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element);
        (_d = (_c = this.settings).setupFrontDiv) === null || _d === void 0 ? void 0 : _d.call(_c, card, element.getElementsByClassName('front')[0]);
        (_f = (_e = this.settings).setupBackDiv) === null || _f === void 0 ? void 0 : _f.call(_e, card, element.getElementsByClassName('back')[0]);
        document.body.removeChild(element);
        return element;
    };
    /**
     * @param card the card informations
     * @return the HTML element of an existing card
     */
    CardManager.prototype.getCardElement = function (card) {
        return document.getElementById(this.getId(card));
    };
    CardManager.prototype.removeCard = function (card) {
        var _a;
        var id = this.getId(card);
        var div = document.getElementById(id);
        if (!div) {
            return;
        }
        // if the card is in a stock, notify the stock about removal
        (_a = this.getCardStock(card)) === null || _a === void 0 ? void 0 : _a.cardRemoved(card);
        div.id = "deleted".concat(id);
        // TODO this.removeVisibleInformations(div);
        div.remove();
    };
    /**
     * @param card the card informations
     * @return the stock containing the card
     */
    CardManager.prototype.getCardStock = function (card) {
        return this.stocks.find(function (stock) { return stock.contains(card); });
    };
    /**
     * Set the card to its front (visible) or back (not visible) side.
     *
     * @param card the card informations
     */
    CardManager.prototype.setCardVisible = function (card, visible, settings) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        var element = this.getCardElement(card);
        if (!element) {
            return;
        }
        element.dataset.side = visible ? 'front' : 'back';
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.updateFront) !== null && _a !== void 0 ? _a : true) {
            (_c = (_b = this.settings).setupFrontDiv) === null || _c === void 0 ? void 0 : _c.call(_b, card, element.getElementsByClassName('front')[0]);
        }
        if ((_d = settings === null || settings === void 0 ? void 0 : settings.updateBack) !== null && _d !== void 0 ? _d : false) {
            (_f = (_e = this.settings).setupBackDiv) === null || _f === void 0 ? void 0 : _f.call(_e, card, element.getElementsByClassName('back')[0]);
        }
        if ((_g = settings === null || settings === void 0 ? void 0 : settings.updateData) !== null && _g !== void 0 ? _g : true) {
            // card data has changed
            var stock = this.getCardStock(card);
            var cards = stock.getCards();
            var cardIndex = cards.findIndex(function (c) { return _this.getId(c) === _this.getId(card); });
            if (cardIndex !== -1) {
                stock.cards.splice(cardIndex, 1, card);
            }
        }
    };
    /**
     * Flips the card.
     *
     * @param card the card informations
     */
    CardManager.prototype.flipCard = function (card, settings) {
        var element = this.getCardElement(card);
        var currentlyVisible = element.dataset.side === 'front';
        this.setCardVisible(card, !currentlyVisible, settings);
    };
    return CardManager;
}());
var CardsManager = /** @class */ (function (_super) {
    __extends(CardsManager, _super);
    function CardsManager(game) {
        var _this = _super.call(this, game, {
            animationManager: game.animationManager,
            getId: function (card) { return "destination-card-".concat(card.id); },
            setupDiv: function (card, div) {
                div.classList.add("destination-card");
                div.dataset.cardId = "" + card.id;
                div.dataset.cardType = "" + card.type;
            },
            setupFrontDiv: function (card, div) {
                _this.setFrontBackground(div, card.type_arg);
                //this.setDivAsCard(div as HTMLDivElement, card.type);
                div.id = "".concat(_super.prototype.getId.call(_this, card), "-front");
                _this.game.addTooltipHtml(div.id, _this.getTooltip(card.type * 100 + card.type_arg));
            },
            setupBackDiv: function (card, div) {
                div.style.backgroundImage = "url('".concat(g_gamethemeurl, "img/destination-card-background.jpg')");
            },
        }) || this;
        _this.game = game;
        return _this;
    }
    CardsManager.prototype.setupCards = function (stocks) {
        stocks.forEach(function (stock) {
            var destinationsUrl = "".concat(g_gamethemeurl, "img/destinations.jpg");
            for (var id = 1; id <= 80; id++) {
                stock.addItemType(100 + id, 100 + id, destinationsUrl, id - 1);
            }
        });
    };
    CardsManager.prototype.addCardsToStock = function (stock, cards, from) {
        if (!cards.length) {
            return;
        }
        cards.forEach(function (card) {
            stock.addToStockWithId(card.type, "".concat(card.id), from);
        });
    };
    CardsManager.prototype.moveToAnotherStock = function (sourceStock, destinationStock, card) {
        if (sourceStock === destinationStock) {
            return;
        }
        var sourceStockItemId = "".concat(sourceStock.container_div.id, "_item_").concat(card.id);
        if (document.getElementById(sourceStockItemId)) {
            this.addCardsToStock(destinationStock, [card], sourceStockItemId);
            //destinationStock.addToStockWithId(uniqueId, cardId, sourceStockItemId);
            sourceStock.removeFromStockById("".concat(card.id));
        }
        else {
            console.warn("".concat(sourceStockItemId, " not found in "), sourceStock);
            //destinationStock.addToStockWithId(uniqueId, cardId, sourceStock.container_div.id);
            this.addCardsToStock(destinationStock, [card], sourceStock.container_div.id);
        }
    };
    CardsManager.prototype.getCardName = function (cardTypeId) {
        return getCityName(cardTypeId);
    };
    CardsManager.prototype.getTooltip = function (cardUniqueId) {
        var destination = DESTINATIONS.find(function (d) { return d.id == cardUniqueId; });
        var tooltip = "<div class=\"xpd-city\">".concat(dojo.string.substitute(_("${to}"), {
            to: getCityName(destination.to),
        }), "</div>\n\t\t<div class=\"xpd-location\">").concat(dojo.string.substitute(_("${location}"), {
            location: getCityLocation(destination.to),
        }), "</div>\n\t\t<div class=\"xpd-city-desc\"><p>").concat(dojo.string.substitute(_("${description}"), {
            description: getCityDescription(destination.to),
        }), "</p></div>\n\t\t");
        return tooltip;
    };
    CardsManager.prototype.setupNewCard = function (cardDiv, cardType) {
        this.game.addTooltipHtml(cardDiv.id, this.getTooltip(cardType));
        cardDiv.dataset.cardId = cardDiv.id.split("_")[2];
        cardDiv.dataset.cardType = "" + cardType;
    };
    CardsManager.prototype.setFrontBackground = function (cardDiv, cardType) {
        var destinationsUrl = "".concat(g_gamethemeurl, "img/destinations.jpg");
        cardDiv.style.backgroundImage = "url('".concat(destinationsUrl, "')");
        var imagePosition = cardType - 1;
        var row = Math.floor(imagePosition / IMAGE_ITEMS_PER_ROW);
        var xBackgroundPercent = (imagePosition - row * IMAGE_ITEMS_PER_ROW) * 100;
        var yBackgroundPercent = row * 100;
        cardDiv.style.backgroundPositionX = "-".concat(xBackgroundPercent, "%");
        cardDiv.style.backgroundPositionY = "-".concat(yBackgroundPercent, "%");
    };
    CardsManager.prototype.generateCardDiv = function (card) {
        var tempDiv = document.createElement("div");
        tempDiv.classList.add("stockitem");
        tempDiv.style.width = "".concat(CARD_WIDTH, "px");
        tempDiv.style.height = "".concat(CARD_HEIGHT, "px");
        tempDiv.style.position = "relative";
        tempDiv.style.backgroundImage = "url('".concat(g_gamethemeurl, "img/destinations.jpg')");
        var imagePosition = (card.type % 100) - 1;
        var image_items_per_row = 10;
        var row = Math.floor(imagePosition / image_items_per_row);
        var xBackgroundPercent = (imagePosition - row * image_items_per_row) * 100;
        var yBackgroundPercent = row * 100;
        tempDiv.style.backgroundPosition = "-".concat(xBackgroundPercent, "% -").concat(yBackgroundPercent, "%");
        document.body.appendChild(tempDiv);
        //this.setDivAsCard(tempDiv, card.type);
        //document.body.removeChild(tempDiv);
        return tempDiv;
    };
    return CardsManager;
}(CardManager));
/**
 * A normal LineStock, but handling more events from the mouse.
 * Also allows to make some cards unselectable.
 */
var LineStockWithEvents = /** @class */ (function (_super) {
    __extends(LineStockWithEvents, _super);
    /**
     * @param manager the card manager
     * @param element the stock element (should be an empty HTML Element)
     * @param settings a `LineStockSettings` object
     */
    function LineStockWithEvents(manager, element, settings) {
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        _this.bindMouseEvents();
        return _this;
    }
    LineStockWithEvents.prototype.bindMouseEvents = function () {
        var _this = this;
        var _a, _b;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener("mouseover", function (event) {
            var cardDiv = event.target.closest(".card");
            if (!cardDiv) {
                return;
            }
            var card = _this.cards.find(function (c) { return _this.manager.getId(c) == cardDiv.id; });
            if (!card) {
                return;
            }
            _this.onCardMouseOver(card);
        });
        (_b = this.element) === null || _b === void 0 ? void 0 : _b.addEventListener("mouseout", function (event) {
            var cardDiv = event.target.closest(".card");
            if (!cardDiv) {
                return;
            }
            var card = _this.cards.find(function (c) { return _this.manager.getId(c) == cardDiv.id; });
            if (!card) {
                return;
            }
            _this.onCardMouseOut(card);
        });
    };
    LineStockWithEvents.prototype.setSelectableCards = function (selectableCards) {
        var _this = this;
        this.cards.forEach(function (card) {
            return _this.setSelectableCard(card, selectableCards.find(function (sc) { return _this.manager.getId(sc) == _this.manager.getId(card); }) != undefined);
        });
    };
    LineStockWithEvents.prototype.cardClick = function (card) {
        var div = this.getCardElement(card);
        if (div && div.classList.contains("selectable")) {
            _super.prototype.cardClick.call(this, card);
        }
    };
    return LineStockWithEvents;
}(LineStock));
