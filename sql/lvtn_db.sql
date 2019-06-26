-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2018 at 05:17 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lvtn_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) UNSIGNED NOT NULL,
  `gad_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `settings` text COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `gad_id`, `email`, `password`, `first_name`, `last_name`, `settings`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'admin@gmail.com', '04f96727bb95e8cd75455822a7472e99a3fa14ce8098ffc5ce4a73ef07dde3fe', 'Admin', 'Admin', '', 1, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(2, 5, 'admin123@gmail.com', '04f96727bb95e8cd75455822a7472e99a3fa14ce8098ffc5ce4a73ef07dde3fe', 'Nguyen', 'Khanh', '', 0, '2018-11-18 19:32:21', '2018-11-18 19:33:05'),
(3, 4, 'khanhit197@gmail.com', '04f96727bb95e8cd75455822a7472e99a3fa14ce8098ffc5ce4a73ef07dde3fe', 'Nguyen', 'Khanh', '', 1, '2018-11-18 19:32:49', '2018-11-18 19:42:32');

-- --------------------------------------------------------

--
-- Table structure for table `admin_group`
--

CREATE TABLE `admin_group` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin_group`
--

INSERT INTO `admin_group` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(2, 'Editer With Delete', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(3, 'Editer', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(4, 'Writer', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(5, 'Demo', '2018-11-16 16:14:02', '2018-11-16 16:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `admin_group_permission`
--

CREATE TABLE `admin_group_permission` (
  `gad_id` int(10) UNSIGNED NOT NULL,
  `per_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin_group_permission`
--

INSERT INTO `admin_group_permission` (`gad_id`, `per_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 5, 'Quản Trị', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(2, 4, 'Xóa', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(3, 3, 'Sửa', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(4, 2, 'Thêm', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(5, 1, 'Xem', '2018-11-16 16:14:02', '2018-11-16 16:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `seo_des` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `seo_des`, `seo_title`, `created_at`, `updated_at`) VALUES
('cat000001', 'Phim Bộ', 'phim-bo', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
('cat000002', 'Phim Lẻ', 'phim-le', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `seo_des` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `slug`, `seo_des`, `seo_title`, `created_at`, `updated_at`) VALUES
('cot000001', 'Phim Việt Nam', 'phim-viet-nam', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
('cot000002', 'Phim Mỹ', 'phim-my', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
('cot000003', 'Phim Trung Quốc', 'phim-trung-quot', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `episode`
--

CREATE TABLE `episode` (
  `id` int(10) UNSIGNED NOT NULL,
  `mov_id` int(10) UNSIGNED NOT NULL,
  `link_play` text COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `images` text COLLATE utf8_unicode_ci NOT NULL,
  `short_des` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `episode` int(11) NOT NULL,
  `long_des` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `episode`
--

INSERT INTO `episode` (`id`, `mov_id`, `link_play`, `slug`, `title`, `images`, `short_des`, `episode`, `long_des`, `created_at`, `updated_at`) VALUES
(2, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-2', 'Diên Hy Công Lược Tập 2', '[]', '', 2, '', '2018-11-18 02:11:49', '2018-11-18 02:11:49'),
(3, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-2', 'Gạo Nếp Gạo Tẻ Tập 2', '[]', '', 2, '', '2018-11-19 08:19:47', '2018-11-19 08:36:57'),
(4, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-1', 'Diên Hy Công Lược Tập 1', '[]', '', 1, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(5, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-3', 'Diên Hy Công Lược Tập 3', '[]', '', 3, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(6, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-4', 'Diên Hy Công Lược Tập 4', '[]', '', 4, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(7, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-5', 'Diên Hy Công Lược Tập 5', '[]', '', 5, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(8, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-6', 'Diên Hy Công Lược Tập 6', '[]', '', 6, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(9, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-7', 'Diên Hy Công Lược Tập 7', '[]', '', 7, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(10, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-8', 'Diên Hy Công Lược Tập 8', '[]', '', 8, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(11, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-9', 'Diên Hy Công Lược Tập 9', '[]', '', 9, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(12, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-10', 'Diên Hy Công Lược Tập 10', '[]', '', 10, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(13, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-11', 'Diên Hy Công Lược Tập 11', '[]', '', 11, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(14, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-12', 'Diên Hy Công Lược Tập 12', '[]', '', 12, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(15, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-13', 'Diên Hy Công Lược Tập 13', '[]', '', 13, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(16, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-14', 'Diên Hy Công Lược Tập 14', '[]', '', 14, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(17, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-15', 'Diên Hy Công Lược Tập 15', '[]', '', 15, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(18, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-16', 'Diên Hy Công Lược Tập 16', '[]', '', 16, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(19, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-17', 'Diên Hy Công Lược Tập 17', '[]', '', 17, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(20, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-18', 'Diên Hy Công Lược Tập 18', '[]', '', 18, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(21, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-19', 'Diên Hy Công Lược Tập 19', '[]', '', 19, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(22, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-20', 'Diên Hy Công Lược Tập 20', '[]', '', 20, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(23, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-21', 'Diên Hy Công Lược Tập 21', '[]', '', 21, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(24, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-22', 'Diên Hy Công Lược Tập 22', '[]', '', 22, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(25, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-23', 'Diên Hy Công Lược Tập 23', '[]', '', 23, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(26, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-24', 'Diên Hy Công Lược Tập 24', '[]', '', 24, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(27, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-25', 'Diên Hy Công Lược Tập 25', '[]', '', 25, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(28, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-26', 'Diên Hy Công Lược Tập 26', '[]', '', 26, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(29, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-27', 'Diên Hy Công Lược Tập 27', '[]', '', 27, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(30, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-28', 'Diên Hy Công Lược Tập 28', '[]', '', 28, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(31, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-29', 'Diên Hy Công Lược Tập 29', '[]', '', 29, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(32, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-30', 'Diên Hy Công Lược Tập 30', '[]', '', 30, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(33, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-31', 'Diên Hy Công Lược Tập 31', '[]', '', 31, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(34, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-32', 'Diên Hy Công Lược Tập 32', '[]', '', 32, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(35, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-33', 'Diên Hy Công Lược Tập 33', '[]', '', 33, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(36, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-34', 'Diên Hy Công Lược Tập 34', '[]', '', 34, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(37, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-35', 'Diên Hy Công Lược Tập 35', '[]', '', 35, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(38, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-36', 'Diên Hy Công Lược Tập 36', '[]', '', 36, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(39, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-37', 'Diên Hy Công Lược Tập 37', '[]', '', 37, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(40, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-38', 'Diên Hy Công Lược Tập 38', '[]', '', 38, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(41, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-39', 'Diên Hy Công Lược Tập 39', '[]', '', 39, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(42, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-40', 'Diên Hy Công Lược Tập 40', '[]', '', 40, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(43, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-41', 'Diên Hy Công Lược Tập 41', '[]', '', 41, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(44, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-42', 'Diên Hy Công Lược Tập 42', '[]', '', 42, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(45, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-43', 'Diên Hy Công Lược Tập 43', '[]', '', 43, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(46, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-44', 'Diên Hy Công Lược Tập 44', '[]', '', 44, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(47, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-45', 'Diên Hy Công Lược Tập 45', '[]', '', 45, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(48, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-46', 'Diên Hy Công Lược Tập 46', '[]', '', 46, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(49, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-47', 'Diên Hy Công Lược Tập 47', '[]', '', 47, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(50, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-48', 'Diên Hy Công Lược Tập 48', '[]', '', 48, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(51, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-49', 'Diên Hy Công Lược Tập 49', '[]', '', 49, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(52, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-50', 'Diên Hy Công Lược Tập 50', '[]', '', 50, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(53, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-51', 'Diên Hy Công Lược Tập 51', '[]', '', 51, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(54, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-52', 'Diên Hy Công Lược Tập 52', '[]', '', 52, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(55, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-53', 'Diên Hy Công Lược Tập 53', '[]', '', 53, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(56, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-54', 'Diên Hy Công Lược Tập 54', '[]', '', 54, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(57, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-55', 'Diên Hy Công Lược Tập 55', '[]', '', 55, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(58, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-56', 'Diên Hy Công Lược Tập 56', '[]', '', 56, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(59, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-57', 'Diên Hy Công Lược Tập 57', '[]', '', 57, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(60, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-58', 'Diên Hy Công Lược Tập 58', '[]', '', 58, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(61, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-59', 'Diên Hy Công Lược Tập 59', '[]', '', 59, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(62, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-60', 'Diên Hy Công Lược Tập 60', '[]', '', 60, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(63, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-61', 'Diên Hy Công Lược Tập 61', '[]', '', 61, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(64, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-62', 'Diên Hy Công Lược Tập 62', '[]', '', 62, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(65, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-63', 'Diên Hy Công Lược Tập 63', '[]', '', 63, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(66, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-64', 'Diên Hy Công Lược Tập 64', '[]', '', 64, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(67, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-65', 'Diên Hy Công Lược Tập 65', '[]', '', 65, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(68, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-66', 'Diên Hy Công Lược Tập 66', '[]', '', 66, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(69, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-67', 'Diên Hy Công Lược Tập 67', '[]', '', 67, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(70, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-68', 'Diên Hy Công Lược Tập 68', '[]', '', 68, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(71, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-69', 'Diên Hy Công Lược Tập 69', '[]', '', 69, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(72, 3, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/dien-hy-cong-luoc-vietsub-2018-s01-ep02\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":0,\"method\":\"live\",\"id\":\"15425323095bf12cd5c8c0c\"}]', 'dien-hy-cong-luoc-tap-70', 'Diên Hy Công Lược Tập 70', '[]', '', 70, '', '2018-11-19 08:37:27', '2018-11-19 08:37:27'),
(74, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-3', 'Gạo Nếp Gạo Tẻ Tập 3', '[]', '', 3, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(75, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-4', 'Gạo Nếp Gạo Tẻ Tập 4', '[]', '', 4, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(76, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-5', 'Gạo Nếp Gạo Tẻ Tập 5', '[]', '', 5, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(77, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-6', 'Gạo Nếp Gạo Tẻ Tập 6', '[]', '', 6, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(78, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-7', 'Gạo Nếp Gạo Tẻ Tập 7', '[]', '', 7, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(79, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-8', 'Gạo Nếp Gạo Tẻ Tập 8', '[]', '', 8, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(80, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-9', 'Gạo Nếp Gạo Tẻ Tập 9', '[]', '', 9, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(81, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-10', 'Gạo Nếp Gạo Tẻ Tập 10', '[]', '', 10, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(82, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-11', 'Gạo Nếp Gạo Tẻ Tập 11', '[]', '', 11, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(83, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-12', 'Gạo Nếp Gạo Tẻ Tập 12', '[]', '', 12, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(84, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-13', 'Gạo Nếp Gạo Tẻ Tập 13', '[]', '', 13, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(85, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-14', 'Gạo Nếp Gạo Tẻ Tập 14', '[]', '', 14, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(86, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-15', 'Gạo Nếp Gạo Tẻ Tập 15', '[]', '', 15, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(87, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-16', 'Gạo Nếp Gạo Tẻ Tập 16', '[]', '', 16, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(88, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-17', 'Gạo Nếp Gạo Tẻ Tập 17', '[]', '', 17, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(89, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-18', 'Gạo Nếp Gạo Tẻ Tập 18', '[]', '', 18, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(90, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-19', 'Gạo Nếp Gạo Tẻ Tập 19', '[]', '', 19, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(91, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-20', 'Gạo Nếp Gạo Tẻ Tập 20', '[]', '', 20, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(92, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-21', 'Gạo Nếp Gạo Tẻ Tập 21', '[]', '', 21, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(93, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-22', 'Gạo Nếp Gạo Tẻ Tập 22', '[]', '', 22, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(94, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-23', 'Gạo Nếp Gạo Tẻ Tập 23', '[]', '', 23, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(95, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-24', 'Gạo Nếp Gạo Tẻ Tập 24', '[]', '', 24, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(96, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-25', 'Gạo Nếp Gạo Tẻ Tập 25', '[]', '', 25, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(97, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-26', 'Gạo Nếp Gạo Tẻ Tập 26', '[]', '', 26, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(98, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-27', 'Gạo Nếp Gạo Tẻ Tập 27', '[]', '', 27, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(99, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-28', 'Gạo Nếp Gạo Tẻ Tập 28', '[]', '', 28, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(100, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-29', 'Gạo Nếp Gạo Tẻ Tập 29', '[]', '', 29, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(101, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-30', 'Gạo Nếp Gạo Tẻ Tập 30', '[]', '', 30, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(102, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-31', 'Gạo Nếp Gạo Tẻ Tập 31', '[]', '', 31, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(103, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-32', 'Gạo Nếp Gạo Tẻ Tập 32', '[]', '', 32, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(104, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-33', 'Gạo Nếp Gạo Tẻ Tập 33', '[]', '', 33, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(105, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-34', 'Gạo Nếp Gạo Tẻ Tập 34', '[]', '', 34, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(106, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-35', 'Gạo Nếp Gạo Tẻ Tập 35', '[]', '', 35, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(107, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-36', 'Gạo Nếp Gạo Tẻ Tập 36', '[]', '', 36, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(108, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-37', 'Gạo Nếp Gạo Tẻ Tập 37', '[]', '', 37, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(109, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-38', 'Gạo Nếp Gạo Tẻ Tập 38', '[]', '', 38, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(110, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-39', 'Gạo Nếp Gạo Tẻ Tập 39', '[]', '', 39, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(111, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-40', 'Gạo Nếp Gạo Tẻ Tập 40', '[]', '', 40, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(112, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-41', 'Gạo Nếp Gạo Tẻ Tập 41', '[]', '', 41, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(113, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-42', 'Gạo Nếp Gạo Tẻ Tập 42', '[]', '', 42, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(114, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-43', 'Gạo Nếp Gạo Tẻ Tập 43', '[]', '', 43, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(115, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-44', 'Gạo Nếp Gạo Tẻ Tập 44', '[]', '', 44, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(116, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-45', 'Gạo Nếp Gạo Tẻ Tập 45', '[]', '', 45, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(117, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-46', 'Gạo Nếp Gạo Tẻ Tập 46', '[]', '', 46, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(118, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-47', 'Gạo Nếp Gạo Tẻ Tập 47', '[]', '', 47, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(119, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-48', 'Gạo Nếp Gạo Tẻ Tập 48', '[]', '', 48, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(120, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-49', 'Gạo Nếp Gạo Tẻ Tập 49', '[]', '', 49, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(121, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-50', 'Gạo Nếp Gạo Tẻ Tập 50', '[]', '', 50, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(122, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-51', 'Gạo Nếp Gạo Tẻ Tập 51', '[]', '', 51, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(123, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-52', 'Gạo Nếp Gạo Tẻ Tập 52', '[]', '', 52, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(124, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-53', 'Gạo Nếp Gạo Tẻ Tập 53', '[]', '', 53, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(125, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-54', 'Gạo Nếp Gạo Tẻ Tập 54', '[]', '', 54, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(126, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-55', 'Gạo Nếp Gạo Tẻ Tập 55', '[]', '', 55, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(127, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-56', 'Gạo Nếp Gạo Tẻ Tập 56', '[]', '', 56, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(128, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-57', 'Gạo Nếp Gạo Tẻ Tập 57', '[]', '', 57, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(129, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-58', 'Gạo Nếp Gạo Tẻ Tập 58', '[]', '', 58, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(130, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-59', 'Gạo Nếp Gạo Tẻ Tập 59', '[]', '', 59, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(131, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-60', 'Gạo Nếp Gạo Tẻ Tập 60', '[]', '', 60, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(132, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-61', 'Gạo Nếp Gạo Tẻ Tập 61', '[]', '', 61, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(133, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-62', 'Gạo Nếp Gạo Tẻ Tập 62', '[]', '', 62, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(134, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-63', 'Gạo Nếp Gạo Tẻ Tập 63', '[]', '', 63, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(135, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-64', 'Gạo Nếp Gạo Tẻ Tập 64', '[]', '', 64, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(136, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-65', 'Gạo Nếp Gạo Tẻ Tập 65', '[]', '', 65, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(137, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-66', 'Gạo Nếp Gạo Tẻ Tập 66', '[]', '', 66, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(138, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-67', 'Gạo Nếp Gạo Tẻ Tập 67', '[]', '', 67, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(139, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-68', 'Gạo Nếp Gạo Tẻ Tập 68', '[]', '', 68, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(140, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-69', 'Gạo Nếp Gạo Tẻ Tập 69', '[]', '', 69, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(141, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-70', 'Gạo Nếp Gạo Tẻ Tập 70', '[]', '', 70, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(142, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-71', 'Gạo Nếp Gạo Tẻ Tập 71', '[]', '', 71, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(143, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-72', 'Gạo Nếp Gạo Tẻ Tập 72', '[]', '', 72, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(144, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-73', 'Gạo Nếp Gạo Tẻ Tập 73', '[]', '', 73, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(145, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-74', 'Gạo Nếp Gạo Tẻ Tập 74', '[]', '', 74, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02');
INSERT INTO `episode` (`id`, `mov_id`, `link_play`, `slug`, `title`, `images`, `short_des`, `episode`, `long_des`, `created_at`, `updated_at`) VALUES
(146, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep75\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426338465bf2b9767eeee\"}]', 'gao-nep-gao-te-tap-75', 'Gạo Nếp Gạo Tẻ Tập 75', '[{\"id\":\"15426337955bf2b943e409c\",\"path\":\"\\/uploaded\\/Assassin-creed-brotherhood-1542633795.jpg\"}]', '', 75, '', '2018-11-19 08:39:02', '2018-11-19 06:24:14'),
(147, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-76', 'Gạo Nếp Gạo Tẻ Tập 76', '[]', '', 76, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(148, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-77', 'Gạo Nếp Gạo Tẻ Tập 77', '[]', '', 77, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(149, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-78', 'Gạo Nếp Gạo Tẻ Tập 78', '[]', '', 78, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(150, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-79', 'Gạo Nếp Gạo Tẻ Tập 79', '[]', '', 79, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(151, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-80', 'Gạo Nếp Gạo Tẻ Tập 80', '[]', '', 80, '', '2018-11-19 08:39:02', '2018-11-19 08:39:02'),
(153, 4, '[{\"source\":\"https:\\/\\/ca02.vieplay.vn\\/vielive\\/gao-nep-gao-te-2018-s01-ep01\\/hls\\/mapper-fullhd\\/profile.m3u8\",\"from\":\"others\",\"qualify\":1080,\"method\":\"live\",\"id\":\"15426154075bf2716f67628\"}]', 'gao-nep-gao-te-tap-1', 'Gạo Nếp Gạo Tẻ Tập 1', '[]', '', 1, '', '2018-11-19 14:53:40', '2018-11-19 14:53:40');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `seo_des` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`, `slug`, `seo_des`, `seo_title`, `created_at`, `updated_at`) VALUES
('gen000001', 'Phim Tình Cảm', 'phim-tinh-cam', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
('gen000002', 'Phim Hành Động', 'phim-hanh-dong', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
('gen000003', 'Phim Khoa Học Viễn Tưởng', 'phim-khoa-hoc-vien-tuong', NULL, NULL, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
('gen000004', 'Tâm Lý Xã Hội', 'tam-ly-xa-hoi', NULL, NULL, '2018-11-19 08:30:37', '2018-11-19 08:30:37'),
('gen000005', 'Gia đình', 'gia-dinh', NULL, NULL, '2018-11-19 08:30:50', '2018-11-19 08:30:50');

-- --------------------------------------------------------

--
-- Table structure for table `max_id`
--

CREATE TABLE `max_id` (
  `id` int(10) UNSIGNED NOT NULL,
  `table_name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `max_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `max_id`
--

INSERT INTO `max_id` (`id`, `table_name`, `max_id`, `created_at`, `updated_at`) VALUES
(1, 'category', 'cat000003', '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(2, 'genre', 'gen000005', '2018-11-16 16:14:02', '2018-11-19 08:30:50'),
(3, 'country', 'cot000003', '2018-11-16 16:14:02', '2018-11-16 16:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `sub_menu` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `slug`, `sub_menu`, `created_at`, `updated_at`) VALUES
(1, 'Phim lẻ', 'phim-le', 'gen000003,gen000002,gen000001', '2018-11-19 01:03:06', '2018-11-19 01:03:06'),
(2, 'Phim Bộ', 'phim-bo', 'cot000003,cot000002,cot000001', '2018-11-19 01:03:31', '2018-11-19 01:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(73, '2018_10_28_063807_create_table_permission', 1),
(74, '2018_10_28_064030_create_table_admin_group', 1),
(75, '2018_10_28_064127_create_table_admin_group_permission', 1),
(76, '2018_10_28_064508_create_table_admin', 1),
(77, '2018_10_29_162851_create_table_country', 1),
(78, '2018_10_29_162904_create_table_genre', 1),
(79, '2018_10_29_162915_create_table_category', 1),
(80, '2018_10_29_162940_create_table_movie', 1),
(81, '2018_10_29_163431_create_table_movie_country', 1),
(82, '2018_10_29_163447_create_table_movie_genre', 1),
(83, '2018_11_05_040940_create_table_config', 1),
(84, '2018_11_05_041203_create_table_episode', 1),
(85, '2018_11_05_041402_create_table_user', 1),
(86, '2018_11_05_041619_create_table_user_end_times_episode', 1),
(87, '2018_11_05_041736_create_table_user_rating_movie', 1),
(88, '2018_11_05_042110_create_table_menu', 1),
(89, '2018_11_14_070316_create_table_sessions', 1),
(90, '2018_11_14_070514_create_table_max_id', 1);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(10) UNSIGNED NOT NULL,
  `is_hot` tinyint(4) NOT NULL,
  `is_new` tinyint(4) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `ad_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `images` text COLLATE utf8_unicode_ci NOT NULL,
  `short_des` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `long_des` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `runtime` int(11) NOT NULL,
  `release_date` double NOT NULL,
  `total_rate` int(11) NOT NULL,
  `avg_rate` double NOT NULL,
  `epi_num` int(11) NOT NULL,
  `cat_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `is_hot`, `is_new`, `type`, `ad_id`, `name`, `title`, `slug`, `images`, `short_des`, `long_des`, `runtime`, `release_date`, `total_rate`, `avg_rate`, `epi_num`, `cat_id`, `created_at`, `updated_at`) VALUES
(3, 1, 1, 1, 1, 'Diên Hy Công Lược', '', 'dien-hy-cong-luoc', '[{\"id\":\"15425312525bf128b42b223\",\"path\":\"\\/uploaded\\/wallhaven-521233-1542531252.jpg\"}]', '', '', 45, 1542412800, 0, 0, 70, 'cat000002', '2018-11-17 08:54:43', '2018-11-18 23:02:17'),
(4, 1, 0, 1, 1, 'Gạo Nếp Gạo Tẻ', '', 'gao-nep-gao-te', '[{\"id\":\"15426150155bf26fe7cff10\",\"path\":\"\\/uploaded\\/Assassin-creed-brotherhood-1542615015.jpg\"}]', '', '', 45, 1542585600, 0, 0, 80, 'cat000001', '2018-11-19 01:10:15', '2018-11-19 01:10:15');

-- --------------------------------------------------------

--
-- Table structure for table `movie_country`
--

CREATE TABLE `movie_country` (
  `cot_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mov_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movie_country`
--

INSERT INTO `movie_country` (`cot_id`, `mov_id`) VALUES
('cot000003', 3),
('cot000001', 4);

-- --------------------------------------------------------

--
-- Table structure for table `movie_genre`
--

CREATE TABLE `movie_genre` (
  `gen_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mov_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movie_genre`
--

INSERT INTO `movie_genre` (`gen_id`, `mov_id`) VALUES
('gen000001', 3),
('gen000001', 4);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `canRead` tinyint(4) NOT NULL DEFAULT '0',
  `canWrite` tinyint(4) NOT NULL DEFAULT '0',
  `canUpdate` tinyint(4) NOT NULL DEFAULT '0',
  `canDelete` tinyint(4) NOT NULL DEFAULT '0',
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `canRead`, `canWrite`, `canUpdate`, `canDelete`, `isAdmin`, `created_at`, `updated_at`) VALUES
(1, 'Đọc', 1, 0, 0, 0, 0, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(2, 'Ghi', 1, 1, 0, 0, 0, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(3, 'Sửa', 1, 1, 1, 0, 0, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(4, 'Xóa', 1, 1, 1, 1, 0, '2018-11-16 16:14:02', '2018-11-16 16:14:02'),
(5, 'Quản Trị', 1, 1, 1, 1, 1, '2018-11-16 16:14:02', '2018-11-16 16:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8_unicode_ci,
  `payload` text COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2mM7GSGHcoMSATrKMhb9EyOzBFJ2M2q6sRZKn8Kv', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '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', 1542635765),
('i3Vd9TffJXuT3FRYTucxwBS3BoHivevPoLOe6m1p', NULL, NULL, NULL, 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicmpMQnVsTHRTTDFYeU80bFdDN2FaNUI2c0lhQlVlT3RuY3dSRDNadSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9kZXYubHZ0bi9hZG1pbi9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1542801519),
('nn8KgExskpeIjVQXasFebksnqSjNM7o28mzFiuug', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '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', 1542641191);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `is_social` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_end_times_episode`
--

CREATE TABLE `user_end_times_episode` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `epi_id` int(10) UNSIGNED NOT NULL,
  `time_watched` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_rating_movie`
--

CREATE TABLE `user_rating_movie` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `mov_id` int(10) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_email_unique` (`email`),
  ADD KEY `admin_gad_id_index` (`gad_id`);

--
-- Indexes for table `admin_group`
--
ALTER TABLE `admin_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_group_permission`
--
ALTER TABLE `admin_group_permission`
  ADD UNIQUE KEY `admin_group_permission_gad_id_unique` (`gad_id`),
  ADD KEY `admin_group_permission_per_id_index` (`per_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `episode`
--
ALTER TABLE `episode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `episode_mov_id_index` (`mov_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `max_id`
--
ALTER TABLE `max_id`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movie_category` (`cat_id`),
  ADD KEY `movie_ad_id_index` (`ad_id`);

--
-- Indexes for table `movie_country`
--
ALTER TABLE `movie_country`
  ADD KEY `fk_movie_country_country` (`cot_id`),
  ADD KEY `movie_country_mov_id_index` (`mov_id`);

--
-- Indexes for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD KEY `fk_movie_genre_genre` (`gen_id`),
  ADD KEY `movie_genre_mov_id_index` (`mov_id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD UNIQUE KEY `sessions_id_unique` (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_unique` (`email`);

--
-- Indexes for table `user_end_times_episode`
--
ALTER TABLE `user_end_times_episode`
  ADD KEY `user_end_times_episode_user_id_index` (`user_id`),
  ADD KEY `user_end_times_episode_epi_id_index` (`epi_id`);

--
-- Indexes for table `user_rating_movie`
--
ALTER TABLE `user_rating_movie`
  ADD KEY `user_rating_movie_user_id_index` (`user_id`),
  ADD KEY `user_rating_movie_mov_id_index` (`mov_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin_group`
--
ALTER TABLE `admin_group`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `episode`
--
ALTER TABLE `episode`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `max_id`
--
ALTER TABLE `max_id`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_admin_admin_group` FOREIGN KEY (`gad_id`) REFERENCES `admin_group` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `admin_group_permission`
--
ALTER TABLE `admin_group_permission`
  ADD CONSTRAINT `fk_admin_group_admin_group_permisson` FOREIGN KEY (`gad_id`) REFERENCES `admin_group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_permission_admin_group_permisson` FOREIGN KEY (`per_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `fk_episode_movie` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `fk_movie_admin_` FOREIGN KEY (`ad_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_movie_category` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_country`
--
ALTER TABLE `movie_country`
  ADD CONSTRAINT `fk_movie_country_country` FOREIGN KEY (`cot_id`) REFERENCES `country` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_movie_country_movie` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `fk_movie_genre_genre` FOREIGN KEY (`gen_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_movie_genre_movie` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_end_times_episode`
--
ALTER TABLE `user_end_times_episode`
  ADD CONSTRAINT `fk_user_end_times_episode_episode` FOREIGN KEY (`epi_id`) REFERENCES `episode` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_end_times_episode_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_rating_movie`
--
ALTER TABLE `user_rating_movie`
  ADD CONSTRAINT `fk_user_rating_movie_movie` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_rating_movie_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
