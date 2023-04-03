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

	//routes from red points

	//routes from blue points
];
