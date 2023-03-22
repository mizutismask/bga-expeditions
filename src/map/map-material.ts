class City {
	constructor(public id: number, public x: number, public y: number) {}
}

class RouteSpace {
	constructor(
		public x: number,
		public y: number,
		public length: number,
		public angle: number,
		public top: boolean = false
	) {}
}

class Route {
	constructor(
		public id: number,
		public from: number,
		public to: number,
		public spaces: RouteSpace[],
		public color: number
	) {}
}

/**
 * Named cities : 100 <= id <= 180
 * Red points :  181 <= id <= 201
 * Blue points :  202 <= id <= 221
 */
const CITIES = [
	new City(101, 114, 86), //Denali
	new City(102, 248, 36), //Mackenzie Delta
	new City(103, 489, 95), //Northwest Passage
	new City(104, 224, 195), //Banff
	new City(105, 117, 215), //Crater Lake
	new City(106, 173, 255), //Old Faithful
	new City(107, 359, 532), //Puerto Rico
	new City(108, 114, 353), //Grand Canyon
	new City(109, 365, 295), //Niagara Falls
	new City(110, 253, 418), //Louisiana
	new City(111, 156, 517), //Teotihuacan
	new City(112, 236, 548), //Tikal
	new City(113, 534, 253), //Newfoundland
	new City(114, 639, 30), //Greenland
	new City(115, 364, 644), //Angel Falls
	new City(116, 460, 721), //Marajó
	new City(117, 392, 763), //Amazon Rainforest
	new City(118, 278, 824), //Machu Picchu
	new City(119, 420, 839), //Aripuanã
	new City(120, 537, 853), //Salvador de Bahia
	new City(121, 359, 902), //Altiplano
	new City(122, 436, 960), //Iguazú Falls
	new City(123, 351, 1034), //Atacama
	new City(124, 156, 717), //Galápagos Islands
	new City(125, 72, 854), //Pacific Ocean
	new City(126, 59, 1035), //Rapa Nui
	new City(127, 400, 1216), //Tierra del Fuego
	new City(128, 567, 1299), //Graham Land
	new City(129, 837, 23), //Svalbard
	new City(130, 739, 110), //Thingvellir
	new City(131, 713, 245), //Stonehenge
	new City(132, 808, 333), //Rome
	new City(133, 883, 380), //Athens
	new City(134, 760, 398), //Timgad
	new City(135, 601, 462), //Canary Islands
	new City(136, 827, 518), //Sahara
	new City(137, 918, 444), //Gizeh
	new City(138, 698, 550), //Timbuktu
	new City(139, 931, 603), //Kush
	new City(140, 1003, 588), //Aksum
	new City(141, 699, 674), //Elmina
	new City(142, 800, 705), //Douala
	new City(143, 941, 746), //Virunga
	new City(144, 914, 901), //Victoria Falls
	new City(145, 850, 923), //Omatako
	new City(146, 807, 1041), //Atlantic Ocean
	new City(147, 1084, 915), //Madagascar
	new City(148, 937, 1111), //Indian Ocean
	new City(149, 984, 442), //Petra
	new City(150, 1101, 397), //Babylon
	new City(151, 1120, 446), //Persepolis
	new City(152, 1069, 585), //Sanaa
	new City(153, 1068, 295), //Caspian Sea
	new City(154, 1031, 163), //Zagorsk
	new City(155, 1184, 48), //Putorana Plateau
	new City(156, 1185, 245), //Novosibirsk
	new City(157, 1225, 398), //Harappa
	new City(158, 1363, 82), //Sakha
	new City(159, 1423, 181), //Lake Baikal
	new City(160, 1517, 334), //Great Wall
	new City(161, 1369, 426), //Mount Everest
	new City(162, 1306, 495), //Taj Mahal
	new City(163, 1349, 660), //Sigiriya
	new City(164, 1432, 549), //Bagan
	new City(165, 1490, 623), //Angkor Wat
	new City(166, 1538, 398), //Xi’an
	new City(167, 1596, 205), //Amur River
	new City(168, 1509, 52), //Kolyma
	new City(169, 1708, 53), //Bering Strait
	new City(170, 1712, 348), //Mont Fuji
	new City(171, 1494, 843), //Borobudur
	new City(172, 1579, 791), //Sulawesi
	new City(173, 1716, 909), //Papua
	new City(174, 1579, 961), //Arnhem Land
	new City(175, 1528, 1020), //Bungle Bungle Range
	new City(176, 1685, 1041), //Great Barrier Reef
	new City(177, 1537, 1110), //Uluru
	new City(178, 1388, 1145), //Perth
	new City(179, 1524, 1271), //Tasmania
	new City(180, 1648, 1275), //Fiordland National Park
	new City(100, 818, 211), //Starting point

	new City(181, 0, 134), //
	new City(182, 0, 664), //
	new City(183, 0, 1135), //
	new City(184, 256, 692), //
	new City(185, 200, 977), //
	new City(186, 267, 1272), //
	new City(187, 401, 183), //
	new City(188, 487, 531), //
	new City(189, 673, 808), //
	new City(190, 604, 1074), //
	new City(191, 844, 809), //
	new City(192, 825, 1179), //
	new City(193, 992, 49), //
	new City(194, 1057, 1040), //
	new City(195, 1064, 1278), //
	new City(196, 1280, 155), //
	new City(197, 1138, 69), //
	new City(198, 1241, 1084), //
	new City(199, 1224, 1265), //
	new City(200, 1337, 811), //
	new City(201, 627, 677), //
	new City(202, 110, 1230), //
	new City(203, 379, 30), //
	new City(204, 474, 386), //
	new City(205, 45, 1084), //
	new City(206, 597, 155), //
	new City(207, 671, 329), //
	new City(208, 575, 691), //
	new City(209, 664, 954), //
	new City(210, 673, 1187), //
	new City(211, 735, 1291), //
	new City(212, 949, 275), //
	new City(213, 1024, 783), //
	new City(214, 918, 1283), //
	new City(215, 1117, 1165), //
	new City(216, 1377, 277), //
	new City(217, 1201, 831), //
	new City(218, 1342, 954), //
	new City(219, 1369, 1277), //
	new City(220, 1679, 512), //
	new City(221, 1690, 783), //
];

const ROUTES = [
	//routes from the starting point (compass)
	//other routes between cities
	new Route(1, 100, 129, [new RouteSpace(819, 179, 143, -82)], RED),
	new Route(2, 100, 130, [new RouteSpace(751, 123, 86, 55)], RED),
	new Route(3, 100, 131, [new RouteSpace(727, 238, 80, -13)], RED),
	new Route(4, 100, 132, [new RouteSpace(813, 318, 74, -78)], RED),
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
