-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2026 at 06:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pendong_impact`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_favorites`
--

DROP TABLE IF EXISTS `account_favorites`;
CREATE TABLE `account_favorites` (
  `user_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `character_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account_favorites`
--

INSERT INTO `account_favorites` (`user_id`, `position`, `character_id`) VALUES
(4, 1, 1),
(4, 2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_favorites`
--
ALTER TABLE `account_favorites`
  ADD PRIMARY KEY (`user_id`,`position`),
  ADD UNIQUE KEY `user_id` (`user_id`,`character_id`),
  ADD KEY `character_id` (`character_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_favorites`
--
ALTER TABLE `account_favorites`
  ADD CONSTRAINT `account_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `account_favorites_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `characters` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
