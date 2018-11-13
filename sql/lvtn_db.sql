-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2018 at 11:26 AM
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
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `settings` text COLLATE utf8_unicode_ci NOT NULL,
  `gad_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `first_name`, `last_name`, `settings`, `gad_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'khanhpro20145@gmail.com', '04f96727bb95e8cd75455822a7472e99a3fa14ce8098ffc5ce4a73ef07dde3fe', 'Nguyen', 'Khanh', '', 1, 1, '2018-11-12 23:52:19', '2018-11-13 02:14:40'),
(2, 'khanhit197@gmail.com', '04f96727bb95e8cd75455822a7472e99a3fa14ce8098ffc5ce4a73ef07dde3fe', 'Nguyen', 'Khanh', '', 1, 0, '2018-11-13 00:17:39', '2018-11-13 03:22:18');

-- --------------------------------------------------------

--
-- Table structure for table `admin_group`
--

CREATE TABLE `admin_group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin_group`
--

INSERT INTO `admin_group` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Supper Admin', '2018-11-12 23:51:37', '2018-11-12 23:51:37'),
(4, 'Editer Admin', '2018-11-13 01:17:48', '2018-11-13 01:17:48'),
(5, 'Writer Admin', '2018-11-13 01:18:03', '2018-11-13 01:18:03');

-- --------------------------------------------------------

--
-- Table structure for table `admin_group_permission`
--

CREATE TABLE `admin_group_permission` (
  `gad_id` int(11) NOT NULL,
  `per_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin_group_permission`
--

INSERT INTO `admin_group_permission` (`gad_id`, `per_id`, `created_at`, `updated_at`) VALUES
(1, 4, '2018-11-12 23:51:37', '2018-11-12 23:51:37'),
(4, 3, '2018-11-13 01:17:48', '2018-11-13 01:17:48'),
(5, 2, '2018-11-13 01:18:03', '2018-11-13 01:18:03');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `seo_des` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `seo_des`, `seo_title`, `created_at`, `updated_at`) VALUES
('cat000001', 'Phim Lẻ', 'phim-le', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'gooogle', '123123213123', '2018-11-13 02:24:03', '2018-11-13 02:24:03');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `seo_des` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `slug`, `seo_des`, `seo_title`, `created_at`, `updated_at`) VALUES
('cot000001', 'Việt Nam', 'viet-nam', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `episode`
--

CREATE TABLE `episode` (
  `id` int(11) NOT NULL,
  `mov_id` int(11) NOT NULL,
  `link_play` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `seo_des` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`, `slug`, `seo_des`, `seo_title`, `created_at`, `updated_at`) VALUES
('gen000001', 'Phim Hành Động', 'phim-hanh-dong', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `max_id`
--

CREATE TABLE `max_id` (
  `id` int(11) NOT NULL,
  `table_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `max_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `max_id`
--

INSERT INTO `max_id` (`id`, `table_name`, `max_id`) VALUES
(1, 'category', 'cat000001'),
(2, 'country', 'cot000001'),
(3, 'genre', 'gen000001');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sub_menu` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `slug`, `sub_menu`, `created_at`, `updated_at`) VALUES
(1, 'Phim lẻ', 'phim-le', 'gen000001,cot000001', '2018-11-13 02:46:45', '2018-11-13 02:46:45');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `is_hot` tinyint(4) NOT NULL,
  `is_new` tinyint(4) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `short_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `long_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `runtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `release_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `total_rate` int(11) NOT NULL,
  `avg_rate` double NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `epi_num` int(11) NOT NULL,
  `cat_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ad_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie_country`
--

CREATE TABLE `movie_country` (
  `cot_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mov_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie_genre`
--

CREATE TABLE `movie_genre` (
  `gen_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mov_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `canRead` tinyint(4) NOT NULL,
  `canWrite` tinyint(4) NOT NULL,
  `canDelete` tinyint(4) NOT NULL,
  `canUpdate` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `canRead`, `canWrite`, `canDelete`, `canUpdate`, `created_at`, `updated_at`) VALUES
(1, 'Đọc', 1, 0, 0, 0, '2018-11-13 06:44:24', '0000-00-00 00:00:00'),
(2, 'Ghi', 1, 1, 0, 0, '2018-11-13 06:44:24', '0000-00-00 00:00:00'),
(3, 'Sửa', 1, 1, 0, 1, '2018-11-13 10:11:44', '0000-00-00 00:00:00'),
(4, 'Xóa', 1, 1, 1, 1, '2018-11-13 06:45:47', '0000-00-00 00:00:00');

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
('aakHQwB5SgJ5sMoegZHPmuDh2ZwXj6SVsVcSMLwH', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36', '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', 1542104591),
('QYM9FASj3TPtpzj1WiXkXVGwRCRGpwUir07qX0kk', NULL, NULL, NULL, 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRFNQOUVwbXV6TDhDRmpRcnVJYnFOY0tTWm9NMWxvVW5ZRjJyVWFXQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9kZXYubHZ0bi9hZG1pbi9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1542104553);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_social` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_end_times_episode`
--

CREATE TABLE `user_end_times_episode` (
  `user_id` int(11) NOT NULL,
  `epi_id` int(11) NOT NULL,
  `time_watched` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_rating_movie`
--

CREATE TABLE `user_rating_movie` (
  `user_id` int(11) NOT NULL,
  `mov_id` int(11) NOT NULL,
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
  ADD KEY `admin_admin_group` (`gad_id`);

--
-- Indexes for table `admin_group`
--
ALTER TABLE `admin_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_group_permission`
--
ALTER TABLE `admin_group_permission`
  ADD PRIMARY KEY (`gad_id`),
  ADD KEY `admin_group_permission_permission` (`per_id`);

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
  ADD KEY `movies_episode` (`mov_id`);

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
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_admin` (`ad_id`),
  ADD KEY `movie_category` (`cat_id`);

--
-- Indexes for table `movie_country`
--
ALTER TABLE `movie_country`
  ADD KEY `movie_country_country` (`cot_id`),
  ADD KEY `movie_country_movie` (`mov_id`);

--
-- Indexes for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD KEY `genre_movie_genre` (`gen_id`),
  ADD KEY `genre_movie_movie` (`mov_id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_end_times_episode`
--
ALTER TABLE `user_end_times_episode`
  ADD KEY `user_history_movies` (`epi_id`),
  ADD KEY `user_history_user` (`user_id`);

--
-- Indexes for table `user_rating_movie`
--
ALTER TABLE `user_rating_movie`
  ADD KEY `user_rating_episode` (`mov_id`),
  ADD KEY `user_rating_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admin_group`
--
ALTER TABLE `admin_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `episode`
--
ALTER TABLE `episode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `max_id`
--
ALTER TABLE `max_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_admin_group` FOREIGN KEY (`gad_id`) REFERENCES `admin_group` (`id`);

--
-- Constraints for table `admin_group_permission`
--
ALTER TABLE `admin_group_permission`
  ADD CONSTRAINT `admin_group_permission_admin_group` FOREIGN KEY (`gad_id`) REFERENCES `admin_group` (`id`),
  ADD CONSTRAINT `admin_group_permission_permission` FOREIGN KEY (`per_id`) REFERENCES `permission` (`id`);

--
-- Constraints for table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `movies_episode` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`);

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `movie_admin` FOREIGN KEY (`ad_id`) REFERENCES `admin` (`id`),
  ADD CONSTRAINT `movie_category` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `movie_country`
--
ALTER TABLE `movie_country`
  ADD CONSTRAINT `movie_country_country` FOREIGN KEY (`cot_id`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `movie_country_movie` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`);

--
-- Constraints for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `genre_movie_genre` FOREIGN KEY (`gen_id`) REFERENCES `genre` (`id`),
  ADD CONSTRAINT `genre_movie_movie` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`);

--
-- Constraints for table `user_end_times_episode`
--
ALTER TABLE `user_end_times_episode`
  ADD CONSTRAINT `user_history_movies` FOREIGN KEY (`epi_id`) REFERENCES `episode` (`id`),
  ADD CONSTRAINT `user_history_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_rating_movie`
--
ALTER TABLE `user_rating_movie`
  ADD CONSTRAINT `user_rating_episode` FOREIGN KEY (`mov_id`) REFERENCES `movie` (`id`),
  ADD CONSTRAINT `user_rating_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
