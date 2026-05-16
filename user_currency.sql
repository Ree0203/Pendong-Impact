-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2026 at 04:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `user_currency`
--

CREATE TABLE `user_currency` (
  `user_id` int(11) NOT NULL,
  `gems` int(11) DEFAULT NULL,
  `coins` int(11) DEFAULT NULL,
  `pity` int(11) DEFAULT NULL,
  `four_star_pity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_currency`
--

INSERT INTO `user_currency` (`user_id`, `gems`, `coins`, `pity`, `four_star_pity`) VALUES
(17, 0, 0, 0, 0),
(18, 512, 8300, 6, 7),
(20, 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_currency`
--
ALTER TABLE `user_currency`
  ADD PRIMARY KEY (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
