-- Adminer 4.0.3 MySQL dump

SET NAMES utf8;
SET foreign_key_checks = 0;
SET time_zone = '+00:00';
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `btr_assignment`;
CREATE TABLE `btr_assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) DEFAULT NULL,
  `awardedto` int(11) DEFAULT NULL,
  `assignedon` double DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `completiondate` date DEFAULT NULL,
  `rating` enum('0','1','2','3','4','5') DEFAULT '0',
  `feedback` text,
  `feedbackowner` text,
  `actualcompletion` double DEFAULT NULL,
  `termsaccepted` enum('0','1') DEFAULT '0',
  `projectowner` int(11) DEFAULT NULL,
  `terms` text,
  `amount` double DEFAULT NULL,
  `status` enum('0','1','2','3','4','5','6') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_assignment` (`id`, `projectId`, `awardedto`, `assignedon`, `startdate`, `completiondate`, `rating`, `feedback`, `feedbackowner`, `actualcompletion`, `termsaccepted`, `projectowner`, `terms`, `amount`, `status`) VALUES
(1,	7,	6,	1415349419,	'2014-11-07',	'2014-11-07',	'0',	NULL,	NULL,	NULL,	'1',	5,	'no terms',	50,	'0'),
(2,	19,	6,	1415360219,	'2014-11-07',	'0000-00-00',	'0',	NULL,	NULL,	NULL,	'1',	8,	'complet it asap',	324,	'0'),
(3,	17,	8,	1415362149,	'2014-11-07',	'2014-11-07',	'0',	NULL,	NULL,	NULL,	'0',	6,	'fewfwe',	89,	'0');

DROP TABLE IF EXISTS `btr_attachments`;
CREATE TABLE `btr_attachments` (
  `attchId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `attchpath` varchar(255) DEFAULT NULL,
  `attachmenttype` varchar(10) DEFAULT NULL,
  `projectId` int(11) DEFAULT '0',
  `bidId` int(11) DEFAULT '0',
  `attachedon` double DEFAULT NULL,
  `msgId` int(11) DEFAULT '0',
  PRIMARY KEY (`attchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `btr_attachments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `btr_users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `btr_bids`;
CREATE TABLE `btr_bids` (
  `bidId` int(11) NOT NULL AUTO_INCREMENT,
  `bidfrom` int(11) DEFAULT NULL,
  `bidon` double DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `bidcontent` text,
  `isselected` enum('0','1') DEFAULT '0',
  `haveattachment` enum('0','1') DEFAULT '0',
  `bidprice` double DEFAULT NULL,
  `updatedon` double DEFAULT NULL,
  PRIMARY KEY (`bidId`),
  KEY `bidfrom` (`bidfrom`,`projectId`),
  KEY `projectId` (`projectId`),
  CONSTRAINT `btr_bids_ibfk_1` FOREIGN KEY (`bidfrom`) REFERENCES `btr_users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `btr_bids_ibfk_2` FOREIGN KEY (`projectId`) REFERENCES `btr_projects` (`prjId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_bids` (`bidId`, `bidfrom`, `bidon`, `projectId`, `bidcontent`, `isselected`, `haveattachment`, `bidprice`, `updatedon`) VALUES
(1,	6,	1415340699,	9,	'sasas',	'0',	'0',	50,	NULL),
(2,	5,	1415346545,	9,	'my bid',	'0',	'0',	1,	NULL),
(3,	6,	1415349309,	7,	'test',	'0',	'0',	50,	NULL),
(4,	8,	1415351873,	16,	'sdsdsdsdsd',	'0',	'0',	90,	NULL),
(5,	8,	1415351927,	17,	'didid ddid did',	'0',	'0',	89,	NULL),
(6,	5,	1415352214,	16,	'my bid',	'0',	'0',	123,	NULL),
(7,	1,	1415352588,	18,	'Jai Ho :)',	'0',	'0',	1234556,	NULL),
(8,	6,	1415352610,	18,	'ewdew',	'0',	'0',	234,	NULL),
(9,	6,	1415360176,	19,	'teest',	'0',	'0',	324,	NULL);

DROP TABLE IF EXISTS `btr_countries`;
CREATE TABLE `btr_countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `countryname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `countrycode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `btr_countries` (`id`, `countryname`, `countrycode`) VALUES
(1,	'AFGHANISTAN',	'AF'),
(2,	'ALAND ISLANDS',	'AX'),
(3,	'ALBANIA',	'AL'),
(4,	'ALGERIA',	'DZ'),
(5,	'AMERICAN SAMOA',	'AS'),
(6,	'ANDORRA',	'AD'),
(7,	'ANGOLA',	'AO'),
(8,	'ANGUILLA',	'AI'),
(9,	'ANTARCTICA',	'AQ'),
(10,	'ANTIGUA AND BARBUDA',	'AG'),
(11,	'ARGENTINA',	'AR'),
(12,	'ARMENIA',	'AM'),
(13,	'ARUBA',	'AW'),
(14,	'AUSTRALIA',	'AU'),
(15,	'AUSTRIA',	'AT'),
(16,	'AZERBAIJAN',	'AZ'),
(17,	'BAHAMAS',	'BS'),
(18,	'BAHRAIN',	'BH'),
(19,	'BANGLADESH',	'BD'),
(20,	'BARBADOS',	'BB'),
(21,	'BELARUS',	'BY'),
(22,	'BELGIUM',	'BE'),
(23,	'BELIZE',	'BZ'),
(24,	'BENIN',	'BJ'),
(25,	'BERMUDA',	'BM'),
(26,	'BHUTAN',	'BT'),
(27,	'BOLIVIA, PLURINATIONAL STATE OF',	'BO'),
(28,	'BOSNIA AND HERZEGOVINA',	'BA'),
(29,	'BOTSWANA',	'BW'),
(30,	'BOUVET ISLAND',	'BV'),
(31,	'BRAZIL',	'BR'),
(32,	'BRITISH INDIAN OCEAN TERRITORY',	'IO'),
(33,	'BRUNEI DARUSSALAM',	'BN'),
(34,	'BULGARIA',	'BG'),
(35,	'BURKINA FASO',	'BF'),
(36,	'BURUNDI',	'BI'),
(37,	'CAMBODIA',	'KH'),
(38,	'CAMEROON',	'CM'),
(39,	'CANADA',	'CA'),
(40,	'CAPE VERDE',	'CV'),
(41,	'CAYMAN ISLANDS',	'KY'),
(42,	'CENTRAL AFRICAN REPUBLIC',	'CF'),
(43,	'CHAD',	'TD'),
(44,	'CHILE',	'CL'),
(45,	'CHINA',	'CN'),
(46,	'COCOS (KEELING) ISLANDS',	'CC'),
(47,	'COLOMBIA',	'CO'),
(48,	'COMOROS',	'KM'),
(49,	'CONGO',	'CG'),
(50,	'CONGO, THE DEMOCRATIC REPUBLIC OF THE',	'CD'),
(51,	'COOK ISLANDS',	'CK'),
(52,	'COSTA RICA',	'CR'),
(53,	'CROATIA',	'HR'),
(54,	'CURACAO',	'CW'),
(55,	'CYPRUS',	'CY'),
(56,	'CZECH REPUBLIC',	'CZ'),
(57,	'DENMARK',	'DK'),
(58,	'DJIBOUTI',	'DJ'),
(59,	'DOMINICA',	'DM'),
(60,	'DOMINICAN REPUBLIC',	'DO'),
(61,	'ECUADOR',	'EC'),
(62,	'EGYPT',	'EG'),
(63,	'EL SALVADOR',	'SV'),
(64,	'EQUATORIAL GUINEA',	'GQ'),
(65,	'ERITREA',	'ER'),
(66,	'ESTONIA',	'EE'),
(67,	'ETHIOPIA',	'ET'),
(68,	'FALKLAND ISLANDS (MALVINAS)',	'FK'),
(69,	'FAROE ISLANDS',	'FO'),
(70,	'FIJI',	'FJ'),
(71,	'FINLAND',	'FI'),
(72,	'FRANCE',	'FR'),
(73,	'FRENCH GUIANA',	'GF'),
(74,	'FRENCH POLYNESIA',	'PF'),
(75,	'GABON',	'GA'),
(76,	'GAMBIA',	'GM'),
(77,	'GEORGIA',	'GE'),
(78,	'GERMANY',	'DE'),
(79,	'GHANA',	'GH'),
(80,	'GIBRALTAR',	'GI'),
(81,	'GREECE',	'GR'),
(82,	'GREENLAND',	'GL'),
(83,	'GRENADA',	'GD'),
(84,	'GUADELOUPE',	'GP'),
(85,	'GUAM',	'GU'),
(86,	'GUATEMALA',	'GT'),
(87,	'GUERNSEY',	'GG'),
(88,	'GUINEA',	'GN'),
(89,	'GUINEA-BISSAU',	'GW'),
(90,	'GUYANA',	'GY'),
(91,	'HAITI',	'HT'),
(92,	'HOLY SEE (VATICAN CITY STATE)',	'VA'),
(93,	'HONDURAS',	'HN'),
(94,	'HONG KONG',	'HK'),
(95,	'HUNGARY',	'HU'),
(96,	'ICELAND',	'IS'),
(97,	'INDIA',	'IN'),
(98,	'INDONESIA',	'ID'),
(99,	'IRAN, ISLAMIC REPUBLIC OF',	'IR'),
(100,	'IRAQ',	'IQ'),
(101,	'IRELAND',	'IE'),
(102,	'ISLE OF MAN',	'IM'),
(103,	'ISRAEL',	'IL'),
(104,	'ITALY',	'IT'),
(105,	'JAMAICA',	'JM'),
(106,	'JAPAN',	'JP'),
(107,	'JERSEY',	'JE'),
(108,	'JORDAN',	'JO'),
(109,	'KAZAKHSTAN',	'KZ'),
(110,	'KENYA',	'KE'),
(111,	'KIRIBATI',	'KI'),
(112,	'KOREA, REPUBLIC OF',	'KR'),
(113,	'KUWAIT',	'KW'),
(114,	'KYRGYZSTAN',	'KG'),
(115,	'LATVIA',	'LV'),
(116,	'LEBANON',	'LB'),
(117,	'LESOTHO',	'LS'),
(118,	'LIBERIA',	'LR'),
(119,	'LIBYA',	'LY'),
(120,	'LIECHTENSTEIN',	'LI'),
(121,	'LITHUANIA',	'LT'),
(122,	'LUXEMBOURG',	'LU'),
(123,	'MACAO',	'MO'),
(124,	'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',	'MK'),
(125,	'MADAGASCAR',	'MG'),
(126,	'MALAWI',	'MW'),
(127,	'MALAYSIA',	'MY'),
(128,	'MALDIVES',	'MV'),
(129,	'MALI',	'ML'),
(130,	'MALTA',	'MT'),
(131,	'MARSHALL ISLANDS',	'MH'),
(132,	'MARTINIQUE',	'MQ'),
(133,	'MAURITANIA',	'MR'),
(134,	'MAURITIUS',	'MU'),
(135,	'MAYOTTE',	'YT'),
(136,	'MEXICO',	'MX'),
(137,	'MICRONESIA, FEDERATED STATES OF',	'FM'),
(138,	'MOLDOVA, REPUBLIC OF',	'MD'),
(139,	'MONACO',	'MC'),
(140,	'MONGOLIA',	'MN'),
(141,	'MONTENEGRO',	'ME'),
(142,	'MOROCCO',	'MA'),
(143,	'MOZAMBIQUE',	'MZ'),
(144,	'MYANMAR',	'MM'),
(145,	'NAMIBIA',	'NA'),
(146,	'NAURU',	'NR'),
(147,	'NEPAL',	'NP'),
(148,	'NETHERLANDS',	'NL'),
(149,	'NEW CALEDONIA',	'NC'),
(150,	'NEW ZEALAND',	'NZ'),
(151,	'NICARAGUA',	'NI'),
(152,	'NIGER',	'NE'),
(153,	'NIGERIA',	'NG'),
(154,	'NIUE',	'NU'),
(155,	'NORTHERN MARIANA ISLANDS',	'MP'),
(156,	'NORWAY',	'NO'),
(157,	'OMAN',	'OM'),
(158,	'PAKISTAN',	'PK'),
(159,	'PALAU',	'PW'),
(160,	'PALESTINIAN, STATE OF',	'PS'),
(161,	'PANAMA',	'PA'),
(162,	'PAPUA NEW GUINEA',	'PG'),
(163,	'PARAGUAY',	'PY'),
(164,	'PERU',	'PE'),
(165,	'PHILIPPINES',	'PH'),
(166,	'POLAND',	'PL'),
(167,	'PORTUGAL',	'PT'),
(168,	'PUERTO RICO',	'PR'),
(169,	'QATAR',	'QA'),
(170,	'REUNION',	'RE'),
(171,	'ROMANIA',	'RO'),
(172,	'RUSSIAN FEDERATION',	'RU'),
(173,	'RWANDA',	'RW'),
(174,	'SAINT KITTS AND NEVIS',	'KN'),
(175,	'SAINT LUCIA',	'LC'),
(176,	'SAINT MARTIN (FRENCH PART)',	'MF'),
(177,	'SAINT PIERRE AND MIQUELON',	'PM'),
(178,	'SAINT VINCENT AND THE GRENADINES',	'VC'),
(179,	'SAMOA',	'WS'),
(180,	'SAN MARINO',	'SM'),
(181,	'SAUDI ARABIA',	'SA'),
(182,	'SENEGAL',	'SN'),
(183,	'SERBIA',	'RS'),
(184,	'SEYCHELLES',	'SC'),
(185,	'SIERRA LEONE',	'SL'),
(186,	'SINGAPORE',	'SG'),
(187,	'SINT MAARTEN (DUTCH PART)',	'SX'),
(188,	'SLOVAKIA',	'SK'),
(189,	'SLOVENIA',	'SI'),
(190,	'SOLOMON ISLANDS',	'SB'),
(191,	'SOMALIA',	'SO'),
(192,	'SOUTH AFRICA',	'ZA'),
(193,	'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',	'GS'),
(194,	'SOUTH SUDAN',	'SS'),
(195,	'SPAIN',	'ES'),
(196,	'SRI LANKA',	'LK'),
(197,	'SUDAN',	'SD'),
(198,	'SURINAME',	'SR'),
(199,	'SVALBARD AND JAN MAYEN',	'SJ'),
(200,	'SWAZILAND',	'SZ'),
(201,	'SWEDEN',	'SE'),
(202,	'SWITZERLAND',	'CH'),
(203,	'SYRIAN ARAB REPUBLIC',	'SY'),
(204,	'TAIWAN, PROVINCE OF CHINA',	'TW'),
(205,	'TAJIKISTAN',	'TJ'),
(206,	'TANZANIA, UNITED REPUBLIC OF',	'TZ'),
(207,	'THAILAND',	'TH'),
(208,	'TIMOR-LESTE',	'TL'),
(209,	'TOGO',	'TG'),
(210,	'TOKELAU',	'TK'),
(211,	'TONGA',	'TO'),
(212,	'TRINIDAD AND TOBAGO',	'TT'),
(213,	'TUNISIA',	'TN'),
(214,	'TURKEY',	'TR'),
(215,	'TURKMENISTAN',	'TM'),
(216,	'TURKS AND CAICOS ISLANDS',	'TC'),
(217,	'UGANDA',	'UG'),
(218,	'UKRAINE',	'UA'),
(219,	'UNITED ARAB EMIRATES',	'AE'),
(220,	'UNITED KINGDOM',	'GB'),
(221,	'UNITED STATES',	'US'),
(222,	'URUGUAY',	'UY'),
(223,	'UZBEKISTAN',	'UZ'),
(224,	'VANUATU',	'VU'),
(225,	'VENEZUELA, BOLIVARIAN REPUBLIC OF',	'VE'),
(226,	'VIET NAM',	'VN'),
(227,	'VIRGIN ISLANDS, BRITISH',	'VG'),
(228,	'VIRGIN ISLANDS, U.S.',	'VI'),
(229,	'WALLIS AND FUTUNA',	'WF'),
(230,	'WESTERN SAHARA',	'EH'),
(231,	'YEMEN',	'YE'),
(232,	'ZAMBIA',	'ZM'),
(233,	'ZIMBABWE',	'ZW');

DROP TABLE IF EXISTS `btr_invites`;
CREATE TABLE `btr_invites` (
  `inviteid` int(11) NOT NULL AUTO_INCREMENT,
  `invitefrom` int(11) DEFAULT NULL,
  `inviteto` int(11) DEFAULT NULL,
  `inviteon` date DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`inviteid`),
  KEY `invitefrom` (`invitefrom`,`inviteto`),
  KEY `inviteto` (`inviteto`),
  CONSTRAINT `btr_invites_ibfk_1` FOREIGN KEY (`invitefrom`) REFERENCES `btr_users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `btr_invites_ibfk_2` FOREIGN KEY (`inviteto`) REFERENCES `btr_users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `btr_messages`;
CREATE TABLE `btr_messages` (
  `msgId` int(11) NOT NULL AUTO_INCREMENT,
  `msgfrom` int(11) DEFAULT NULL,
  `msgto` int(11) DEFAULT NULL,
  `msgcontent` text,
  `haveattachment` enum('0','1') DEFAULT '0',
  `msgon` double DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `isread` enum('0','1') DEFAULT '0',
  `msgtype` enum('d','r') NOT NULL DEFAULT 'd',
  `reportid` int(11) DEFAULT NULL,
  PRIMARY KEY (`msgId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_messages` (`msgId`, `msgfrom`, `msgto`, `msgcontent`, `haveattachment`, `msgon`, `projectId`, `isread`, `msgtype`, `reportid`) VALUES
(1,	6,	1,	'Hello User <br />\n											  You have recieved a new proposal on your gig aafsdsaf.<br />\n											  Details are following<br />\n											  Username- saurabh841undre<br />\n											  Amount 50<br />\n											  Content sasas<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415340702,	9,	'1',	'r',	NULL),
(2,	1,	6,	'Jai Ho :)',	'0',	1415340761,	9,	'1',	'd',	NULL),
(3,	6,	1,	'hi.. hello... jai ho',	'0',	1415341021,	9,	'1',	'd',	NULL),
(4,	5,	1,	'Hello User <br />\n											  You have recieved a new proposal on your gig aafsdsaf.<br />\n											  Details are following<br />\n											  Username- meaahe<br />\n											  Amount 1<br />\n											  Content my bid<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415346547,	9,	'1',	'r',	NULL),
(5,	1,	5,	'This is dummy test message from rohit',	'0',	1415346684,	9,	'1',	'd',	NULL),
(6,	5,	1,	'reply message',	'0',	1415346775,	9,	'1',	'd',	NULL),
(7,	6,	5,	'Hello User <br />\n											  You have recieved a new proposal on your gig aaa.<br />\n											  Details are following<br />\n											  Username- saurabh841undre<br />\n											  Amount 50<br />\n											  Content test<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415349312,	7,	'1',	'r',	NULL),
(8,	6,	5,	'&lt;p&gt;Hello meaahe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;You have recieved a new status report on your project &lt;strong&gt;aaa&lt;/strong&gt; from &lt;strong&gt;saurabh841undre&lt;/strong&gt;&lt;/p&gt;&lt;br/&gt;&lt;p&gt;Here are details about it.&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Message&lt;/strong&gt;&lt;br/&gt;10percent&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Comletion Status &lt;/strong&gt;&lt;br/&gt;40 %&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Regards&lt;/strong&gt;&lt;br/&gt;Gigster&lt;/p&gt;',	'0',	1415349600,	7,	'0',	'r',	5),
(9,	6,	5,	'&lt;p&gt;Hello meaahe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;You have recieved a new status report on your project &lt;strong&gt;aaa&lt;/strong&gt; from &lt;strong&gt;saurabh841undre&lt;/strong&gt;&lt;/p&gt;&lt;br/&gt;&lt;p&gt;Here are details about it.&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Message&lt;/strong&gt;&lt;br/&gt;10&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Comletion Status &lt;/strong&gt;&lt;br/&gt;10 %&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Regards&lt;/strong&gt;&lt;br/&gt;Gigster&lt;/p&gt;',	'0',	1415349637,	7,	'0',	'r',	6),
(10,	6,	5,	'&lt;p&gt;Hello meaahe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;You have recieved a new status report on your project &lt;strong&gt;aaa&lt;/strong&gt; from &lt;strong&gt;saurabh841undre&lt;/strong&gt;&lt;/p&gt;&lt;br/&gt;&lt;p&gt;Here are details about it.&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Message&lt;/strong&gt;&lt;br/&gt;10&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Comletion Status &lt;/strong&gt;&lt;br/&gt;20 %&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Regards&lt;/strong&gt;&lt;br/&gt;Gigster&lt;/p&gt;',	'0',	1415349693,	7,	'0',	'r',	7),
(11,	6,	5,	'&lt;p&gt;Hello meaahe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;You have recieved a new status report on your project &lt;strong&gt;aaa&lt;/strong&gt; from &lt;strong&gt;saurabh841undre&lt;/strong&gt;&lt;/p&gt;&lt;br/&gt;&lt;p&gt;Here are details about it.&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Message&lt;/strong&gt;&lt;br/&gt;wwewewe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Comletion Status &lt;/strong&gt;&lt;br/&gt;60 %&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Regards&lt;/strong&gt;&lt;br/&gt;Gigster&lt;/p&gt;',	'0',	1415349763,	7,	'0',	'r',	8),
(12,	1,	5,	'This is second message',	'0',	1415351134,	9,	'1',	'd',	NULL),
(13,	5,	1,	'yes got it',	'0',	1415351159,	9,	'1',	'd',	NULL),
(14,	8,	7,	'Hello User <br />\n											  You have recieved a new proposal on your gig Testing nl2br.<br />\n											  Details are following<br />\n											  Username- amolvhankalas<br />\n											  Amount 90<br />\n											  Content sdsdsdsdsd<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415351877,	16,	'1',	'r',	NULL),
(15,	8,	6,	'Hello User <br />\n											  You have recieved a new proposal on your gig test.<br />\n											  Details are following<br />\n											  Username- amolvhankalas<br />\n											  Amount 89<br />\n											  Content didid ddid did<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415351930,	17,	'1',	'r',	NULL),
(16,	6,	8,	'hello sir',	'0',	1415351958,	17,	'1',	'd',	NULL),
(17,	5,	7,	'Hello User <br />\n											  You have recieved a new proposal on your gig Testing nl2br.<br />\n											  Details are following<br />\n											  Username- meaahe<br />\n											  Amount 123<br />\n											  Content my bid<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415352216,	16,	'1',	'r',	NULL),
(18,	1,	5,	'Hello User <br />\n											  You have recieved a new proposal on your gig test inbox.<br />\n											  Details are following<br />\n											  Username- rohitbanna<br />\n											  Amount 1234556<br />\n											  Content Jai Ho :)<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415352591,	18,	'1',	'r',	NULL),
(19,	6,	5,	'Hello User <br />\n											  You have recieved a new proposal on your gig test inbox.<br />\n											  Details are following<br />\n											  Username- saurabh841undre<br />\n											  Amount 234<br />\n											  Content ewdew<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415352612,	18,	'1',	'r',	NULL),
(20,	6,	5,	'&lt;p&gt;Hello meaahe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;You have recieved a new status report on your project &lt;strong&gt;aaa&lt;/strong&gt; from &lt;strong&gt;saurabh841undre&lt;/strong&gt;&lt;/p&gt;&lt;br/&gt;&lt;p&gt;Here are details about it.&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Message&lt;/strong&gt;&lt;br/&gt;qwe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Comletion Status &lt;/strong&gt;&lt;br/&gt;30 %&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Regards&lt;/strong&gt;&lt;br/&gt;Gigster&lt;/p&gt;',	'0',	1415352953,	7,	'0',	'r',	9),
(21,	6,	5,	'&lt;p&gt;Hello meaahe&lt;/p&gt;&lt;br/&gt;&lt;p&gt;You have recieved a new status report on your project &lt;strong&gt;aaa&lt;/strong&gt; from &lt;strong&gt;saurabh841undre&lt;/strong&gt;&lt;/p&gt;&lt;br/&gt;&lt;p&gt;Here are details about it.&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Message&lt;/strong&gt;&lt;br/&gt;w&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Comletion Status &lt;/strong&gt;&lt;br/&gt;10 %&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Regards&lt;/strong&gt;&lt;br/&gt;Gigster&lt;/p&gt;',	'0',	1415352967,	7,	'0',	'r',	10),
(22,	6,	8,	'Hello User <br />\n											  You have recieved a new proposal on your gig test by amol.<br />\n											  Details are following<br />\n											  Username- saurabh841undre<br />\n											  Amount 324<br />\n											  Content teest<br />\n											  &nbsp;<br />\n											  Regards<br />\n											  Gigster',	'0',	1415360178,	19,	'1',	'r',	NULL),
(23,	6,	8,	'&lt;p&gt;Hello amolvhankalas&lt;/p&gt;&lt;br/&gt;&lt;p&gt;You have recieved a new status report on your project &lt;strong&gt;test by amol&lt;/strong&gt; from &lt;strong&gt;saurabh841undre&lt;/strong&gt;&lt;/p&gt;&lt;br/&gt;&lt;p&gt;Here are details about it.&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Message&lt;/strong&gt;&lt;br/&gt;sa&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Comletion Status &lt;/strong&gt;&lt;br/&gt;40 %&lt;/p&gt;&lt;br/&gt;&lt;p&gt;&lt;strong&gt;Regards&lt;/strong&gt;&lt;br/&gt;Gigster&lt;/p&gt;',	'0',	1415362088,	19,	'0',	'r',	11);

DROP TABLE IF EXISTS `btr_projects`;
CREATE TABLE `btr_projects` (
  `prjId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `prjTitle` varchar(255) DEFAULT NULL,
  `prjdesc` text,
  `skills` varchar(255) DEFAULT NULL,
  `postedon` double DEFAULT NULL,
  `proposedbudget` float DEFAULT NULL,
  `haveattachment` enum('0','1') DEFAULT '0',
  `bidfrom` date DEFAULT NULL,
  `bidto` date DEFAULT NULL,
  `status` enum('0','1','2','3','4','5','6') NOT NULL DEFAULT '0',
  `keywords` text NOT NULL,
  `jobtype` enum('h','f') NOT NULL DEFAULT 'f',
  PRIMARY KEY (`prjId`),
  KEY `userId` (`userId`),
  CONSTRAINT `btr_projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `btr_users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_projects` (`prjId`, `userId`, `prjTitle`, `prjdesc`, `skills`, `postedon`, `proposedbudget`, `haveattachment`, `bidfrom`, `bidto`, `status`, `keywords`, `jobtype`) VALUES
(1,	1,	'This is my first dummy gig',	'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',	NULL,	1415265105,	250,	'0',	'2014-11-06',	'2014-11-29',	'0',	'php,mysql,javascript,html5,css',	'f'),
(3,	5,	'my first gig ',	'my first gig 6/11/2014',	NULL,	1415266530,	20,	'0',	'2014-11-06',	'2014-11-06',	'0',	'mysql',	'h'),
(4,	5,	'gig 2',	'gig 2',	NULL,	1415266664,	11,	'0',	'2014-11-06',	'2014-11-07',	'0',	'javascript',	'f'),
(5,	5,	'testing new gig',	'testing new gig',	NULL,	1415273087,	10,	'0',	'2014-11-06',	'2014-11-07',	'0',	'javascript',	'h'),
(6,	2,	'my 1st gig',	'my 1st gig',	NULL,	1415273251,	1000,	'0',	'2014-11-06',	'2014-11-15',	'0',	'everything',	'f'),
(7,	5,	'aaa',	'aaa',	NULL,	1415273805,	11,	'0',	'2014-11-06',	'2014-11-07',	'2',	'html5',	'h'),
(8,	1,	'dfsfasdf',	'asdfsadfa',	NULL,	1415280417,	221,	'0',	'2014-11-06',	'2014-11-25',	'0',	'php',	'f'),
(9,	1,	'aafsdsaf',	'fasdfsadf',	NULL,	1415283216,	12312,	'0',	'2014-11-06',	'2014-11-28',	'0',	'fasdf',	'f'),
(10,	7,	'Test Gig 2',	'This is gig description for our company',	NULL,	1415287585,	100,	'0',	'2014-11-06',	'2014-11-08',	'0',	'photographer',	'f'),
(11,	9,	'Nov7',	'Nov7',	NULL,	1415327884,	1,	'0',	'2014-11-07',	'0000-00-00',	'0',	'',	'f'),
(12,	9,	'Nov7a',	'',	NULL,	1415328053,	333,	'0',	'2014-11-07',	'0000-00-00',	'0',	'',	'f'),
(13,	12,	'Commission Based Consultant (Testing Project)',	'We are Hiring a commission based consultant in Singapore , Only Singaporean need to apply',	NULL,	1415330098,	2000,	'0',	'2014-11-07',	'0000-00-00',	'0',	'Interpersonal skills',	'f'),
(14,	7,	'Gig - By Amol',	'This is still in testing',	NULL,	1415330842,	1000,	'0',	'2014-11-07',	'2014-11-14',	'0',	'php',	'f'),
(15,	7,	'Friday , we need an event guy.',	'We are looking for an event organizer.',	NULL,	1415331494,	10,	'0',	'2014-11-07',	'2014-11-08',	'0',	'event organiser',	'h'),
(16,	7,	'Testing nl2br',	'This is a test bid. \r\n\r\nWe want to make sure that the best people can gig over here.',	NULL,	1415334144,	1000,	'0',	'2014-11-07',	'2014-11-08',	'0',	'event organiser',	'f'),
(17,	6,	'test',	'dasdas',	NULL,	1415351907,	200,	'0',	'2014-11-07',	'2014-10-28',	'1',	'html5',	'h'),
(18,	5,	'test inbox',	'test inbox',	NULL,	1415352529,	100,	'0',	'2014-11-07',	'2014-11-08',	'0',	'mysql',	'f'),
(19,	8,	'test by amol',	'test by amol amamamam',	NULL,	1415359111,	89,	'0',	'2014-11-07',	'2014-11-29',	'2',	'event organiser',	'h');

DROP TABLE IF EXISTS `btr_reports`;
CREATE TABLE `btr_reports` (
  `rpId` int(11) NOT NULL AUTO_INCREMENT,
  `rpdate` double DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `reportto` int(11) DEFAULT NULL,
  `reportfrom` int(11) DEFAULT NULL,
  `description` text,
  `isapproved` enum('0','1') DEFAULT '0',
  `completion` int(11) DEFAULT NULL,
  PRIMARY KEY (`rpId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_reports` (`rpId`, `rpdate`, `projectId`, `reportto`, `reportfrom`, `description`, `isapproved`, `completion`) VALUES
(1,	1415328254,	11,	9,	10,	'',	'0',	30),
(2,	1415330737,	13,	12,	7,	'Clicking on status bar',	'0',	30),
(3,	1415331203,	14,	7,	5,	'complted',	'0',	30),
(4,	1415332127,	15,	7,	5,	'done',	'0',	50),
(5,	1415349600,	7,	5,	6,	'10percent',	'0',	40),
(6,	1415349637,	7,	5,	6,	'10',	'0',	10),
(7,	1415349693,	7,	5,	6,	'10',	'0',	20),
(8,	1415349763,	7,	5,	6,	'wwewewe',	'0',	60),
(9,	1415352953,	7,	5,	6,	'qwe',	'0',	30),
(10,	1415352967,	7,	5,	6,	'w',	'0',	10),
(11,	1415362088,	19,	8,	6,	'sa',	'0',	40);

DROP TABLE IF EXISTS `btr_reviews`;
CREATE TABLE `btr_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ratefrom` int(11) DEFAULT NULL,
  `rateto` int(11) DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `feedback` text,
  `rating` enum('0','1','2','3','4','5') DEFAULT '0',
  `ratedon` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_reviews` (`id`, `ratefrom`, `rateto`, `projectId`, `feedback`, `rating`, `ratedon`) VALUES
(1,	7,	5,	14,	'Awesome job! Marked as completed.',	'3',	1415331240),
(2,	7,	5,	15,	'Thank you for a great event',	'5',	1415332230);

DROP TABLE IF EXISTS `btr_revisions`;
CREATE TABLE `btr_revisions` (
  `rvId` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) DEFAULT NULL,
  `description` text,
  `revisedon` double DEFAULT NULL,
  PRIMARY KEY (`rvId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `btr_skills`;
CREATE TABLE `btr_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill` varchar(50) DEFAULT NULL,
  `addedon` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `btr_tags`;
CREATE TABLE `btr_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_tags` (`id`, `tag`) VALUES
(1,	'php'),
(2,	'mysql'),
(3,	'javascript'),
(4,	'html5'),
(5,	'css'),
(6,	'everything'),
(7,	'fasdf'),
(8,	'photographer'),
(9,	''),
(10,	'Interpersonal skills'),
(11,	'event organiser');

DROP TABLE IF EXISTS `btr_userprofile`;
CREATE TABLE `btr_userprofile` (
  `prfId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `aboutus` text,
  `skills` text,
  `gender` enum('m','f') DEFAULT 'm',
  `contactno` varchar(25) DEFAULT NULL,
  `overview` text,
  `tagline` varchar(255) DEFAULT NULL,
  `services` text,
  PRIMARY KEY (`prfId`),
  KEY `userId` (`userId`),
  CONSTRAINT `btr_userprofile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `btr_users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_userprofile` (`prfId`, `userId`, `fname`, `lname`, `address`, `city`, `zipcode`, `country`, `aboutus`, `skills`, `gender`, `contactno`, `overview`, `tagline`, `services`) VALUES
(1,	1,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(2,	2,	'Aman',	'Bishnoi',	NULL,	'Jaipur',	NULL,	97,	'Don\'t underestimate me.',	NULL,	'm',	NULL,	'I have worked in every field.',	NULL,	NULL),
(4,	4,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(5,	5,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(6,	6,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(7,	7,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(8,	8,	'Amol',	'Vhanakalas',	NULL,	NULL,	NULL,	1,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(9,	9,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(10,	10,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(11,	12,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL),
(12,	13,	'',	'',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'm',	NULL,	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `btr_users`;
CREATE TABLE `btr_users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `usermail` varchar(255) DEFAULT NULL,
  `userpass` varchar(255) DEFAULT NULL,
  `fbId` varchar(255) DEFAULT NULL,
  `gId` varchar(255) DEFAULT NULL,
  `profileimage` varchar(255) DEFAULT NULL,
  `usertype` enum('u','a') DEFAULT 'u',
  `joinedon` double DEFAULT NULL,
  `authkey` varchar(255) DEFAULT NULL,
  `twittid` varchar(255) DEFAULT NULL,
  `linkedinid` varchar(255) DEFAULT NULL,
  `isactive` enum('0','1') DEFAULT '0',
  `username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `btr_users` (`userId`, `usermail`, `userpass`, `fbId`, `gId`, `profileimage`, `usertype`, `joinedon`, `authkey`, `twittid`, `linkedinid`, `isactive`, `username`) VALUES
(1,	'rohitbanna@gmail.com',	NULL,	'10204762368236102',	NULL,	'1.jpg',	'u',	1415259912,	'bc554ecf2b33458ff1f152433cd4c813',	NULL,	NULL,	'1',	'rohitbanna'),
(2,	'aman29forever@gmail.com',	NULL,	'859224530775652',	NULL,	'2.jpg',	'u',	1415260096,	'1102774157837fdba32b0df0811ab9ea',	NULL,	NULL,	'1',	'aman29forever'),
(4,	'rohit.purohit@yahoo.co.in',	NULL,	'822536544434124',	NULL,	'4.jpg',	'u',	1415264863,	'b969542c2f6cba75156ffed773cf5801',	NULL,	NULL,	'1',	'rohit.purohit'),
(5,	'meaahe@gmail.com',	NULL,	'10152764127611108',	NULL,	'5.jpg',	'u',	1415266482,	'3534b2282023a8d4926ef7a7cd09532c',	NULL,	NULL,	'1',	'meaahe'),
(6,	'saurabh841undre@gmail.com',	NULL,	'948729701821864',	NULL,	'6.jpg',	'u',	1415281498,	'd875d51eba70514e60c5ab64c06ab787',	NULL,	NULL,	'1',	'saurabh841undre'),
(7,	'amol.chawathe@fountaintechies.com',	NULL,	'10152838832775962',	NULL,	'7.jpg',	'u',	1415287533,	'6d4a9729cf2b82952d4264f8a2cb38f9',	NULL,	NULL,	'1',	'amol.chawathe'),
(8,	'amolvhankalas@gmail.com',	NULL,	'734933016559730',	NULL,	'8.jpg',	'u',	1415290491,	'cdc1fcf2f64a1f7812b7c996746a8e6b',	NULL,	NULL,	'1',	'amolvhankalas'),
(9,	'james@parasolwonder.com',	NULL,	'1512332319015130',	NULL,	'9.jpg',	'u',	1415327806,	'efab2bd8be82756b83f81546ba7ef72b',	NULL,	NULL,	'1',	'james'),
(10,	'james@gigstergo.com',	NULL,	'1536680499911082',	NULL,	'10.jpg',	'u',	1415327856,	'390c972810d60eecfe5f621f8e8d8ff4',	NULL,	NULL,	'1',	'james'),
(11,	NULL,	NULL,	NULL,	NULL,	'11.jpeg',	'u',	1415327942,	'c7916c9600109ef3c10758b7d4b497b2',	'2655535854',	NULL,	'0',	NULL),
(12,	'vikaspatidar41@yahoo.com',	NULL,	'781138608609695',	NULL,	'12.jpg',	'u',	1415329767,	'807830583e5c28483ed24e3741e678a3',	NULL,	NULL,	'1',	'vikaspatidar41'),
(13,	'lomteankush2@gmail.com',	NULL,	'745564635523591',	NULL,	'13.jpg',	'u',	1415360477,	'7734ce8650e7c59c80adfc543fec73d8',	NULL,	NULL,	'1',	'lomteankush2');

DROP TABLE IF EXISTS `btr_userskills`;
CREATE TABLE `btr_userskills` (
  `skillId` int(11) NOT NULL AUTO_INCREMENT,
  `skill` varchar(255) DEFAULT NULL,
  `expertiselevel` int(11) DEFAULT '0',
  PRIMARY KEY (`skillId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2014-11-07 12:20:40

