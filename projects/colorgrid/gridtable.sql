-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 01 feb 2021 om 13:41
-- Serverversie: 10.4.14-MariaDB
-- PHP-versie: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `colorgrid`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `gridtable`
--

CREATE TABLE `gridtable` (
  `id` int(5) NOT NULL,
  `positie_x` int(5) NOT NULL,
  `positie_y` int(5) NOT NULL,
  `kleur` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `gridtable`
--

INSERT INTO `gridtable` (`id`, `positie_x`, `positie_y`, `kleur`) VALUES
(0, 0, 0, 'rgb(128, 255, 255)'),
(1, 1, 0, 'rgb(119, 219, 237)'),
(2, 2, 0, 'rgb(110, 182, 219)'),
(3, 3, 0, 'rgb(101, 146, 201)'),
(4, 4, 0, 'rgb(91, 109, 182)'),
(5, 5, 0, 'rgb(82, 73, 164)'),
(6, 6, 0, 'rgb(73, 36, 146)'),
(7, 7, 0, 'rgb(64, 0, 128)'),
(8, 0, 1, 'rgb(146, 219, 219)'),
(9, 1, 1, 'rgb(138, 193, 206)'),
(10, 2, 1, 'rgb(131, 166, 193)'),
(11, 3, 1, 'rgb(123, 141, 180)'),
(12, 4, 1, 'rgb(114, 114, 166)'),
(13, 5, 1, 'rgb(107, 89, 154)'),
(14, 6, 1, 'rgb(99, 62, 141)'),
(15, 7, 1, 'rgb(91, 36, 128)'),
(16, 0, 2, 'rgb(164, 182, 182)'),
(17, 1, 2, 'rgb(158, 167, 174)'),
(18, 2, 2, 'rgb(151, 151, 167)'),
(19, 3, 2, 'rgb(145, 135, 159)'),
(20, 4, 2, 'rgb(138, 120, 151)'),
(21, 5, 2, 'rgb(131, 104, 143)'),
(22, 6, 2, 'rgb(125, 88, 136)'),
(23, 7, 2, 'rgb(119, 73, 128)'),
(24, 0, 3, 'rgb(182, 146, 146)'),
(25, 1, 3, 'rgb(177, 141, 143)'),
(26, 2, 3, 'rgb(172, 135, 141)'),
(27, 3, 3, 'rgb(167, 130, 138)'),
(28, 4, 3, 'rgb(161, 125, 135)'),
(29, 5, 3, 'rgb(156, 120, 133)'),
(30, 6, 3, 'rgb(151, 114, 131)'),
(31, 7, 3, 'rgb(146, 109, 128)'),
(32, 0, 4, 'rgb(201, 109, 109)'),
(33, 1, 4, 'rgb(197, 114, 112)'),
(34, 2, 4, 'rgb(193, 120, 115)'),
(35, 3, 4, 'rgb(189, 125, 118)'),
(36, 4, 4, 'rgb(185, 130, 120)'),
(37, 5, 4, 'rgb(181, 135, 122)'),
(38, 6, 4, 'rgb(177, 141, 125)'),
(39, 7, 4, 'rgb(173, 146, 128)'),
(40, 0, 5, 'rgb(219, 73, 73)'),
(41, 1, 5, 'rgb(216, 88, 81)'),
(42, 2, 5, 'rgb(214, 104, 89)'),
(43, 3, 5, 'rgb(211, 120, 97)'),
(44, 4, 5, 'rgb(208, 135, 104)'),
(45, 5, 5, 'rgb(206, 151, 112)'),
(46, 6, 5, 'rgb(203, 167, 120)'),
(47, 7, 5, 'rgb(200, 182, 128)'),
(48, 0, 6, 'rgb(237, 36, 36)'),
(49, 1, 6, 'rgb(236, 62, 49)'),
(50, 2, 6, 'rgb(234, 89, 63)'),
(51, 3, 6, 'rgb(233, 114, 76)'),
(52, 4, 6, 'rgb(232, 141, 89)'),
(53, 5, 6, 'rgb(230, 166, 101)'),
(54, 6, 6, 'rgb(229, 193, 115)'),
(55, 7, 6, 'rgb(228, 219, 128)'),
(56, 0, 7, 'rgb(255, 0, 0)'),
(57, 1, 7, 'rgb(255, 36, 18)'),
(58, 2, 7, 'rgb(255, 73, 37)'),
(59, 3, 7, 'rgb(255, 109, 55)'),
(60, 4, 7, 'rgb(255, 146, 73)'),
(61, 5, 7, 'rgb(255, 182, 91)'),
(62, 6, 7, 'rgb(255, 219, 110)'),
(63, 7, 7, 'rgb(255, 255, 128)');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `gridtable`
--
ALTER TABLE `gridtable`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
