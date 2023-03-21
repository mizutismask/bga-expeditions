const CARD_WIDTH = 150;
const CARD_HEIGHT = 209;
const DESTINATION_CARD_SHIFT = 32;

function setupTrainCarCards(stock: Stock) {
	const trainCarsUrl = `${g_gamethemeurl}img/train-cards.jpg`;
	for (let type = 0; type <= 8; type++) {
		stock.addItemType(type, type, trainCarsUrl, type);
	}
}

function setupDestinationCards(stock: Stock) {
	const destinationsUrl = `${g_gamethemeurl}img/destinations.jpg`;
	for (let id = 1; id <= 80; id++) {
		stock.addItemType(100 + id, 100 + id, destinationsUrl, id - 1);
	}
}

const BLUE = 1;
const YELLOW = 2;
const RED = 3;

function getColor(color: number, type: "route" | "train-car") {
	switch (color) {
		case 1:
			return _("Blue");
		case 2:
			return _("Yellow");
		case 3:
			return _("Red");
	}
}

function setupTrainCarCardDiv(cardDiv: HTMLDivElement, cardTypeId) {
	cardDiv.title = getColor(Number(cardTypeId), "train-car");
}

class DestinationCard {
	constructor(public id: number, public to: number) {}
}

const CITIES_NAMES = [
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
const DESTINATIONS = [
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

function setupDestinationCardDiv(
	cardDiv: HTMLDivElement,
	cardUniqueId: number
) {
	const destination = DESTINATIONS.find((d) => d.id == cardUniqueId);
	cardDiv.title = `${dojo.string.substitute(_("${to}"), {
		to: getCityName(destination.to),
	})}`;
}

function getCityName(cityId: number) {
	console.log("getCityName result", cityId, "=", CITIES_NAMES[cityId - 100]);
	return CITIES_NAMES[cityId - 100];
}

function getBackgroundInlineStyleForDestination(destination: Destination) {
	let file;
	switch (destination.type) {
		case 1:
			file = "destinations.jpg";
			break;
	}

	const imagePosition = destination.type_arg - 1;
	const row = Math.floor(imagePosition / IMAGE_ITEMS_PER_ROW);
	const xBackgroundPercent =
		(imagePosition - row * IMAGE_ITEMS_PER_ROW) * 100;
	const yBackgroundPercent = row * 100;
	return `background-image: url('${g_gamethemeurl}img/${file}'); background-position: -${xBackgroundPercent}% -${yBackgroundPercent}%;`;
}
