-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2026 at 01:04 PM
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
CREATE DATABASE IF NOT EXISTS `pendong_impact` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pendong_impact`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp(),
  `last_login` datetime NOT NULL DEFAULT current_timestamp(),
  `profile_pic` varchar(50) NOT NULL DEFAULT 'default-profile.png',
  `message` varchar(255) DEFAULT 'Hello! This is my profile!',
  `wins` int(11) NOT NULL DEFAULT 0,
  `loses` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters` (
  `character_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `rarity` int(11) NOT NULL,
  `attack` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `speed` int(11) NOT NULL,
  `luck` int(11) NOT NULL,
  `picture` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`character_id`, `first_name`, `last_name`, `rarity`, `attack`, `defense`, `speed`, `luck`, `picture`) VALUES
(1, 'Jayson', 'Bustaleño', 5, 140, 50, 130, 80, 'jayson.png'),
(2, 'Demy', 'Moya', 5, 80, 80, 90, 150, 'demy.png'),
(3, 'James', 'Santos', 5, 110, 110, 70, 80, 'james.png'),
(5, 'Ryan', 'Donceras', 4, 60, 140, 60, 60, 'ryan.png'),
(6, 'Johanes', 'Leyran', 4, 130, 60, 70, 60, 'johan.png'),
(7, 'Tayog', 'Basallo', 4, 80, 70, 120, 50, 'tayog.png'),
(8, 'Lawrence', 'Mojica', 4, 70, 60, 70, 120, 'lawrence.png'),
(9, 'Chlowen', 'Patambang', 4, 80, 80, 80, 80, 'chlowen.png'),
(10, 'Marcus', 'Matic', 4, 95, 65, 85, 75, 'marcus.png');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `user_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `date_acquired` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_currency`
--

DROP TABLE IF EXISTS `user_currency`;
CREATE TABLE `user_currency` (
  `user_id` int(11) NOT NULL,
  `gems` int(11) DEFAULT NULL,
  `coins` int(11) DEFAULT NULL,
  `pity` int(11) DEFAULT NULL,
  `four_star_pity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `emailunique` (`email`);

--
-- Indexes for table `account_favorites`
--
ALTER TABLE `account_favorites`
  ADD PRIMARY KEY (`user_id`,`position`),
  ADD UNIQUE KEY `user_id` (`user_id`,`character_id`),
  ADD KEY `character_id` (`character_id`);

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`character_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`user_id`,`character_id`),
  ADD KEY `character_id` (`character_id`);

--
-- Indexes for table `user_currency`
--
ALTER TABLE `user_currency`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `character_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_favorites`
--
ALTER TABLE `account_favorites`
  ADD CONSTRAINT `account_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `account_favorites_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `characters` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `characters` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
