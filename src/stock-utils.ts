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

const COLORS = [BLUE, YELLOW, RED];

function getColor(color: number, translatable: boolean = true) {
	if (translatable) {
		switch (color) {
			case 1:
				return _("Blue");
			case 2:
				return _("Yellow");
			case 3:
				return _("Red");
		}
	} else {
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

function setupTrainCarCardDiv(cardDiv: HTMLDivElement, cardTypeId) {
	cardDiv.title = getColor(Number(cardTypeId));
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

const CITIES_LOCATIONS = [
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

const CITIES_DESCRIPTIONS = [
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

const DESTINATIONS = [
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

function setupDestinationCardDiv(cardDiv: HTMLDivElement, cardUniqueId: number) {
	const destination = DESTINATIONS.find((d) => d.id == cardUniqueId);
	//console.log("setupDestinationCardDiv", cardDiv, cardUniqueId, destination);
	cardDiv.title = `${dojo.string.substitute(_("${to}"), {
		to: getCityName(destination.to),
	})}`;
}

function getCityName(cityId: number) {
	return CITIES_NAMES[cityId - 100];
}

function getCityDescription(cityId: number) {
	return CITIES_DESCRIPTIONS[cityId - 100];
}

function getCityLocation(cityId: number) {
	return CITIES_LOCATIONS[cityId - 100];
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
	const xBackgroundPercent = (imagePosition - row * IMAGE_ITEMS_PER_ROW) * 100;
	const yBackgroundPercent = row * 100;
	return `background-image: url('${g_gamethemeurl}img/${file}'); background-position: -${xBackgroundPercent}% -${yBackgroundPercent}%;`;
}
