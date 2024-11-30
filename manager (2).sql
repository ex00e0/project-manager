-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 30 2024 г., 08:45
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `manager`
--

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2024_10_23_095520_create_projects_table', 1),
(4, '2024_10_23_105034_create_tasks_table', 1),
(5, '2024_10_23_115558_create_reports_table', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `boss_id` bigint UNSIGNED NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `team` json NOT NULL,
  `status` enum('created','in_process','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'created',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `name`, `description`, `boss_id`, `start`, `end`, `team`, `status`, `created_at`) VALUES
(9, 'Проект 233', 'описание 23', 2, '2024-11-22', '2024-11-23', '{\"doers\": [\"3\", \"4\"]}', 'completed', '2024-11-18 09:49:09'),
(10, 'Новый проект', 'очень длинное описание нового проекта.........................................', 2, '2024-11-23', '2024-11-30', '{\"doers\": [\"3\", \"4\"]}', 'created', '2024-11-22 09:34:35'),
(12, 'Проект 002', 'описаниеsdfdf', 2, '2024-11-30', '2024-12-08', '{\"doers\": [\"3\"]}', 'created', '2024-11-22 09:36:39'),
(13, 'проект без босса', 'или с боссом?', 5, '2024-11-26', '2024-11-28', '{\"doers\": [\"3\"]}', 'completed', '2024-11-25 20:24:52'),
(14, 'empty', 'empty', 2, '2024-12-04', '2024-12-14', '{\"doers\": [\"4\", \"6\"]}', 'in_process', '2024-11-30 08:37:23');

-- --------------------------------------------------------

--
-- Структура таблицы `reports`
--

CREATE TABLE `reports` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint UNSIGNED NOT NULL,
  `type` enum('projects','doers','bosses') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stats` json DEFAULT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `reports`
--

INSERT INTO `reports` (`id`, `project_id`, `created_at`, `user_id`, `type`, `stats`, `start`, `end`) VALUES
(2, NULL, '2024-11-29 09:34:06', 1, 'projects', '{\"count\": 0, \"projects\": []}', '2024-11-07', '2024-11-16'),
(3, NULL, '2024-11-29 10:15:47', 1, 'projects', '{\"count\": 2, \"projects\": [{\"all\": 37, \"name\": \"Проект 233\", \"status\": \"completed\", \"completed\": 2, \"in_process\": 3}, {\"all\": 1, \"name\": \"проект без босса\", \"status\": \"completed\", \"completed\": 0, \"in_process\": 0}]}', '2024-11-01', '2024-11-29'),
(5, NULL, '2024-11-29 11:02:21', 1, 'doers', '{\"count\": 3, \"users\": [{\"all\": 3, \"name\": \"Полина\", \"completed\": 2, \"in_process\": 0}, {\"all\": 0, \"name\": \"doer2\", \"completed\": 0, \"in_process\": 0}]}', '2024-11-15', '2024-11-24'),
(6, NULL, '2024-11-29 11:22:03', 1, 'bosses', '{\"count\": 4, \"users\": [{\"all\": 0, \"name\": \"boss\", \"completed\": 0, \"in_process\": 0}, {\"all\": 0, \"name\": \"boss_boss222\", \"completed\": 0, \"in_process\": 0}]}', '2024-11-14', '2024-11-21'),
(7, NULL, '2024-11-29 11:47:27', 1, 'bosses', '{\"count\": 4, \"users\": [{\"all\": 1, \"name\": \"boss\", \"completed\": 1, \"in_process\": 0}, {\"all\": 1, \"name\": \"boss_boss222\", \"completed\": 1, \"in_process\": 0}]}', '2024-10-29', '2024-11-29'),
(11, 'Проект 233', '2024-11-29 18:25:33', 2, NULL, '{\"count\": 1, \"tasks\": [{\"id\": 16, \"end\": \"2024-11-20\", \"name\": \"Отдыхай\", \"start\": \"2024-11-19\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"13:44:2 25.11.2024\\\": \\\"new\\\", \\\"13:44:6 25.11.2024\\\": \\\"new2\\\", \\\"10:00:00 20.12.2024\\\": \\\"text\\\", \\\"13:34:11 25.10.2024\\\": \\\"55\\\", \\\"13:35:28 25.10.2024\\\": \\\"55\\\", \\\"13:35:48 25.11.2024\\\": \\\"d\\\", \\\"13:43:48 25.11.2024\\\": \\\"new\\\", \\\"13:43:53 25.11.2024\\\": \\\"new\\\", \\\"13:45:42 25.11.2024\\\": \\\"77\\\", \\\"13:45:47 25.11.2024\\\": \\\"77232\\\", \\\"13:45:50 25.11.2024\\\": \\\"7723213\\\", \\\"13:52:42 25.11.2024\\\": \\\"999\\\"}\", \"priority\": \"high\", \"created_at\": \"2024-11-19 06:27:08\", \"project_id\": 9, \"description\": \"описание 585\", \"name_of_doer\": \"Полина\"}]}', '2024-11-08', '2024-11-22'),
(12, 'Проект 233', '2024-11-29 18:30:02', 2, NULL, '{\"count\": 8, \"tasks\": [{\"id\": 11, \"end\": \"2024-11-23\", \"name\": \"Задача 1\", \"start\": \"2024-11-22\", \"status\": \"created\", \"doer_id\": 3, \"comments\": \"{\\\"18:37:49 25.11.2024\\\": \\\"555\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 05:27:40\", \"project_id\": 9, \"description\": \"описание 1\", \"name_of_doer\": \"Полина\"}, {\"id\": 15, \"end\": \"2024-11-23\", \"name\": \"Задача 452\", \"start\": \"2024-11-21\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"12:13:1 26.11.2024\\\": \\\"dsdf\\\", \\\"18:33:16 25.11.2024\\\": \\\"666\\\", \\\"18:37:41 25.11.2024\\\": \\\"555\\\", \\\"18:38:35 25.11.2024\\\": \\\"w35o4j\\\", \\\"18:42:10 25.11.2024\\\": \\\"6\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 06:22:54\", \"project_id\": 9, \"description\": \"описание 444\", \"name_of_doer\": \"Полина\"}, {\"id\": 16, \"end\": \"2024-11-20\", \"name\": \"Отдыхай\", \"start\": \"2024-11-19\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"13:44:2 25.11.2024\\\": \\\"new\\\", \\\"13:44:6 25.11.2024\\\": \\\"new2\\\", \\\"10:00:00 20.12.2024\\\": \\\"text\\\", \\\"13:34:11 25.10.2024\\\": \\\"55\\\", \\\"13:35:28 25.10.2024\\\": \\\"55\\\", \\\"13:35:48 25.11.2024\\\": \\\"d\\\", \\\"13:43:48 25.11.2024\\\": \\\"new\\\", \\\"13:43:53 25.11.2024\\\": \\\"new\\\", \\\"13:45:42 25.11.2024\\\": \\\"77\\\", \\\"13:45:47 25.11.2024\\\": \\\"77232\\\", \\\"13:45:50 25.11.2024\\\": \\\"7723213\\\", \\\"13:52:42 25.11.2024\\\": \\\"999\\\"}\", \"priority\": \"high\", \"created_at\": \"2024-11-19 06:27:08\", \"project_id\": 9, \"description\": \"описание 585\", \"name_of_doer\": \"Полина\"}, {\"id\": 25, \"end\": \"2024-11-28\", \"name\": \"массовка 1\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 4, \"comments\": null, \"priority\": \"high\", \"created_at\": \"2024-11-26 18:07:09\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"doer2\"}, {\"id\": 27, \"end\": \"2024-11-28\", \"name\": \"массовка 3\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 3, \"comments\": null, \"priority\": \"high\", \"created_at\": \"2024-11-26 18:11:18\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"Полина\"}, {\"id\": 28, \"end\": \"2024-11-29\", \"name\": \"Задача 0011\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 4, \"comments\": null, \"priority\": \"middle\", \"created_at\": \"2024-11-26 18:12:38\", \"project_id\": 9, \"description\": \"11\", \"name_of_doer\": \"doer2\"}, {\"id\": 29, \"end\": \"2024-11-29\", \"name\": \"Задача 0012\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 4, \"comments\": null, \"priority\": \"middle\", \"created_at\": \"2024-11-26 18:12:57\", \"project_id\": 9, \"description\": \"12\", \"name_of_doer\": \"doer2\"}, {\"id\": 33, \"end\": \"2024-11-28\", \"name\": \"Задача 0016\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 3, \"comments\": null, \"priority\": \"low\", \"created_at\": \"2024-11-26 18:46:30\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"Полина\"}]}', '2024-11-01', '2024-11-29'),
(13, 'Проект 233', '2024-11-29 18:32:18', 2, NULL, '{\"count\": 8, \"tasks\": [{\"id\": 11, \"end\": \"2024-11-23\", \"name\": \"Задача 1\", \"start\": \"2024-11-22\", \"status\": \"created\", \"doer_id\": 3, \"comments\": \"{\\\"18:37:49 25.11.2024\\\": \\\"555\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 05:27:40\", \"project_id\": 9, \"description\": \"описание 1\", \"name_of_doer\": \"Полина\"}, {\"id\": 15, \"end\": \"2024-11-23\", \"name\": \"Задача 452\", \"start\": \"2024-11-21\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"12:13:1 26.11.2024\\\": \\\"dsdf\\\", \\\"18:33:16 25.11.2024\\\": \\\"666\\\", \\\"18:37:41 25.11.2024\\\": \\\"555\\\", \\\"18:38:35 25.11.2024\\\": \\\"w35o4j\\\", \\\"18:42:10 25.11.2024\\\": \\\"6\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 06:22:54\", \"project_id\": 9, \"description\": \"описание 444\", \"name_of_doer\": \"Полина\"}, {\"id\": 16, \"end\": \"2024-11-20\", \"name\": \"Отдыхай\", \"start\": \"2024-11-19\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"13:44:2 25.11.2024\\\": \\\"new\\\", \\\"13:44:6 25.11.2024\\\": \\\"new2\\\", \\\"10:00:00 20.12.2024\\\": \\\"text\\\", \\\"13:34:11 25.10.2024\\\": \\\"55\\\", \\\"13:35:28 25.10.2024\\\": \\\"55\\\", \\\"13:35:48 25.11.2024\\\": \\\"d\\\", \\\"13:43:48 25.11.2024\\\": \\\"new\\\", \\\"13:43:53 25.11.2024\\\": \\\"new\\\", \\\"13:45:42 25.11.2024\\\": \\\"77\\\", \\\"13:45:47 25.11.2024\\\": \\\"77232\\\", \\\"13:45:50 25.11.2024\\\": \\\"7723213\\\", \\\"13:52:42 25.11.2024\\\": \\\"999\\\"}\", \"priority\": \"high\", \"created_at\": \"2024-11-19 06:27:08\", \"project_id\": 9, \"description\": \"описание 585\", \"name_of_doer\": \"Полина\"}, {\"id\": 25, \"end\": \"2024-11-28\", \"name\": \"массовка 1\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 4, \"comments\": null, \"priority\": \"high\", \"created_at\": \"2024-11-26 18:07:09\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"doer2\"}, {\"id\": 27, \"end\": \"2024-11-28\", \"name\": \"массовка 3\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 3, \"comments\": null, \"priority\": \"high\", \"created_at\": \"2024-11-26 18:11:18\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"Полина\"}, {\"id\": 28, \"end\": \"2024-11-29\", \"name\": \"Задача 0011\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 4, \"comments\": null, \"priority\": \"middle\", \"created_at\": \"2024-11-26 18:12:38\", \"project_id\": 9, \"description\": \"11\", \"name_of_doer\": \"doer2\"}, {\"id\": 29, \"end\": \"2024-11-29\", \"name\": \"Задача 0012\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 4, \"comments\": null, \"priority\": \"middle\", \"created_at\": \"2024-11-26 18:12:57\", \"project_id\": 9, \"description\": \"12\", \"name_of_doer\": \"doer2\"}, {\"id\": 33, \"end\": \"2024-11-28\", \"name\": \"Задача 0016\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 3, \"comments\": null, \"priority\": \"low\", \"created_at\": \"2024-11-26 18:46:30\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"Полина\"}]}', '2024-10-04', '2024-11-29'),
(14, 'dsfsd', '2024-11-29 18:33:27', 2, NULL, '{\"count\": 0, \"tasks\": []}', '2024-11-22', '2024-11-23'),
(16, NULL, '2024-11-29 19:06:20', 3, NULL, '{\"count\": 0, \"tasks\": []}', '2024-11-01', '2024-11-16'),
(17, NULL, '2024-11-29 19:23:19', 3, NULL, '{\"count\": 5, \"tasks\": [{\"id\": 11, \"end\": \"2024-11-23\", \"name\": \"Задача 1\", \"start\": \"2024-11-22\", \"status\": \"created\", \"doer_id\": 3, \"comments\": \"{\\\"18:37:49 25.11.2024\\\": \\\"555\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 05:27:40\", \"project_id\": 9, \"description\": \"описание 1\", \"name_of_doer\": \"Полина\"}, {\"id\": 15, \"end\": \"2024-11-23\", \"name\": \"Задача 452\", \"start\": \"2024-11-21\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"12:13:1 26.11.2024\\\": \\\"dsdf\\\", \\\"18:33:16 25.11.2024\\\": \\\"666\\\", \\\"18:37:41 25.11.2024\\\": \\\"555\\\", \\\"18:38:35 25.11.2024\\\": \\\"w35o4j\\\", \\\"18:42:10 25.11.2024\\\": \\\"6\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 06:22:54\", \"project_id\": 9, \"description\": \"описание 444\", \"name_of_doer\": \"Полина\"}, {\"id\": 16, \"end\": \"2024-11-20\", \"name\": \"Отдыхай\", \"start\": \"2024-11-19\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"13:44:2 25.11.2024\\\": \\\"new\\\", \\\"13:44:6 25.11.2024\\\": \\\"new2\\\", \\\"10:00:00 20.12.2024\\\": \\\"text\\\", \\\"13:34:11 25.10.2024\\\": \\\"55\\\", \\\"13:35:28 25.10.2024\\\": \\\"55\\\", \\\"13:35:48 25.11.2024\\\": \\\"d\\\", \\\"13:43:48 25.11.2024\\\": \\\"new\\\", \\\"13:43:53 25.11.2024\\\": \\\"new\\\", \\\"13:45:42 25.11.2024\\\": \\\"77\\\", \\\"13:45:47 25.11.2024\\\": \\\"77232\\\", \\\"13:45:50 25.11.2024\\\": \\\"7723213\\\", \\\"13:52:42 25.11.2024\\\": \\\"999\\\"}\", \"priority\": \"high\", \"created_at\": \"2024-11-19 06:27:08\", \"project_id\": 9, \"description\": \"описание 585\", \"name_of_doer\": \"Полина\"}, {\"id\": 27, \"end\": \"2024-11-28\", \"name\": \"массовка 3\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 3, \"comments\": null, \"priority\": \"high\", \"created_at\": \"2024-11-26 18:11:18\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"Полина\"}, {\"id\": 33, \"end\": \"2024-11-28\", \"name\": \"Задача 0016\", \"start\": \"2024-11-27\", \"status\": \"created\", \"doer_id\": 3, \"comments\": null, \"priority\": \"low\", \"created_at\": \"2024-11-26 18:46:30\", \"project_id\": 9, \"description\": \"описание\", \"name_of_doer\": \"Полина\"}]}', '2024-09-12', '2024-11-29'),
(18, NULL, '2024-11-29 19:24:25', 3, NULL, '{\"count\": 1, \"tasks\": [{\"id\": 16, \"end\": \"2024-11-20\", \"name\": \"Отдыхай\", \"start\": \"2024-11-19\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"13:44:2 25.11.2024\\\": \\\"new\\\", \\\"13:44:6 25.11.2024\\\": \\\"new2\\\", \\\"10:00:00 20.12.2024\\\": \\\"text\\\", \\\"13:34:11 25.10.2024\\\": \\\"55\\\", \\\"13:35:28 25.10.2024\\\": \\\"55\\\", \\\"13:35:48 25.11.2024\\\": \\\"d\\\", \\\"13:43:48 25.11.2024\\\": \\\"new\\\", \\\"13:43:53 25.11.2024\\\": \\\"new\\\", \\\"13:45:42 25.11.2024\\\": \\\"77\\\", \\\"13:45:47 25.11.2024\\\": \\\"77232\\\", \\\"13:45:50 25.11.2024\\\": \\\"7723213\\\", \\\"13:52:42 25.11.2024\\\": \\\"999\\\"}\", \"priority\": \"high\", \"created_at\": \"2024-11-19 06:27:08\", \"project_id\": 9, \"description\": \"описание 585\", \"name_of_doer\": \"Полина\"}]}', '2024-11-01', '2024-11-22'),
(19, NULL, '2024-11-29 19:25:58', 3, NULL, '{\"count\": 0, \"tasks\": []}', '2024-11-08', '2024-11-16'),
(20, NULL, '2024-11-29 19:27:24', 3, NULL, '{\"count\": 3, \"tasks\": [{\"id\": 11, \"end\": \"2024-11-23\", \"name\": \"Задача 1\", \"start\": \"2024-11-22\", \"status\": \"created\", \"doer_id\": 3, \"comments\": \"{\\\"18:37:49 25.11.2024\\\": \\\"555\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 05:27:40\", \"project_id\": 9, \"description\": \"описание 1\", \"name_of_doer\": \"Полина\"}, {\"id\": 15, \"end\": \"2024-11-23\", \"name\": \"Задача 452\", \"start\": \"2024-11-21\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"12:13:1 26.11.2024\\\": \\\"dsdf\\\", \\\"18:33:16 25.11.2024\\\": \\\"666\\\", \\\"18:37:41 25.11.2024\\\": \\\"555\\\", \\\"18:38:35 25.11.2024\\\": \\\"w35o4j\\\", \\\"18:42:10 25.11.2024\\\": \\\"6\\\"}\", \"priority\": \"middle\", \"created_at\": \"2024-11-19 06:22:54\", \"project_id\": 9, \"description\": \"описание 444\", \"name_of_doer\": \"Полина\"}, {\"id\": 16, \"end\": \"2024-11-20\", \"name\": \"Отдыхай\", \"start\": \"2024-11-19\", \"status\": \"completed\", \"doer_id\": 3, \"comments\": \"{\\\"13:44:2 25.11.2024\\\": \\\"new\\\", \\\"13:44:6 25.11.2024\\\": \\\"new2\\\", \\\"10:00:00 20.12.2024\\\": \\\"text\\\", \\\"13:34:11 25.10.2024\\\": \\\"55\\\", \\\"13:35:28 25.10.2024\\\": \\\"55\\\", \\\"13:35:48 25.11.2024\\\": \\\"d\\\", \\\"13:43:48 25.11.2024\\\": \\\"new\\\", \\\"13:43:53 25.11.2024\\\": \\\"new\\\", \\\"13:45:42 25.11.2024\\\": \\\"77\\\", \\\"13:45:47 25.11.2024\\\": \\\"77232\\\", \\\"13:45:50 25.11.2024\\\": \\\"7723213\\\", \\\"13:52:42 25.11.2024\\\": \\\"999\\\"}\", \"priority\": \"high\", \"created_at\": \"2024-11-19 06:27:08\", \"project_id\": 9, \"description\": \"описание 585\", \"name_of_doer\": \"Полина\"}]}', '2024-11-15', '2024-11-24');

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `project_id` bigint UNSIGNED NOT NULL,
  `doer_id` bigint UNSIGNED NOT NULL,
  `priority` enum('low','middle','high') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `status` enum('created','in_process','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'created',
  `comments` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `description`, `project_id`, `doer_id`, `priority`, `start`, `end`, `status`, `comments`, `created_at`) VALUES
(11, 'Задача 1', 'описание 1', 9, 3, 'middle', '2024-11-22', '2024-11-23', 'created', '{\"18:37:49 25.11.2024\": \"555\"}', '2024-11-19 05:27:40'),
(13, 'Задача 2', 'описание 2', 9, 3, 'middle', '2024-11-19', '2027-12-10', 'in_process', '{\"18:43:44 25.11.2024\": \"1\"}', '2024-11-18 21:00:00'),
(14, 'Новый год', 'happy new year', 9, 3, 'high', '2024-11-19', '2024-12-31', 'in_process', NULL, '2024-11-18 21:00:00'),
(15, 'Задача 452', 'описание 444', 9, 3, 'middle', '2024-11-21', '2024-11-23', 'completed', '{\"12:13:1 26.11.2024\": \"dsdf\", \"18:33:16 25.11.2024\": \"666\", \"18:37:41 25.11.2024\": \"555\", \"18:38:35 25.11.2024\": \"w35o4j\", \"18:42:10 25.11.2024\": \"6\"}', '2024-11-19 06:22:54'),
(16, 'Отдыхай', 'описание 585', 9, 3, 'high', '2024-11-19', '2024-11-20', 'completed', '{\"13:44:2 25.11.2024\": \"new\", \"13:44:6 25.11.2024\": \"new2\", \"10:00:00 20.12.2024\": \"text\", \"13:34:11 25.10.2024\": \"55\", \"13:35:28 25.10.2024\": \"55\", \"13:35:48 25.11.2024\": \"d\", \"13:43:48 25.11.2024\": \"new\", \"13:43:53 25.11.2024\": \"new\", \"13:45:42 25.11.2024\": \"77\", \"13:45:47 25.11.2024\": \"77232\", \"13:45:50 25.11.2024\": \"7723213\", \"13:52:42 25.11.2024\": \"999\"}', '2024-11-19 06:27:08'),
(17, 'задача без босса', 'или с боссом', 13, 3, 'low', '2024-11-27', '2024-11-30', 'created', NULL, '2024-11-25 20:25:28'),
(22, 'Задача 666', 'описание 666', 9, 3, 'middle', '2024-11-28', '2024-12-01', 'in_process', NULL, '2024-11-26 12:01:04'),
(24, 'задача888', 'описание88', 9, 3, 'low', '2024-11-29', '2024-12-08', 'in_process', NULL, '2024-11-26 12:08:27'),
(25, 'массовка 1', 'описание', 9, 4, 'high', '2024-11-27', '2024-11-28', 'created', NULL, '2024-11-26 18:07:09'),
(26, 'массовка 2', 'описание', 9, 4, 'middle', '2024-11-27', '2024-11-30', 'created', NULL, '2024-11-26 18:10:18'),
(27, 'массовка 3', 'описание', 9, 3, 'high', '2024-11-27', '2024-11-28', 'created', NULL, '2024-11-26 18:11:18'),
(28, 'Задача 0011', '11', 9, 4, 'middle', '2024-11-27', '2024-11-29', 'created', NULL, '2024-11-26 18:12:38'),
(29, 'Задача 0012', '12', 9, 4, 'middle', '2024-11-27', '2024-11-29', 'created', NULL, '2024-11-26 18:12:57'),
(30, 'Задача 0013', '13', 9, 3, 'high', '2024-12-07', '2024-12-20', 'created', NULL, '2024-11-26 18:13:15'),
(31, 'Задача 0014', '14', 9, 4, 'low', '2024-11-28', '2024-12-06', 'created', NULL, '2024-11-26 18:13:31'),
(32, 'Задача 0015', '15', 9, 4, 'middle', '2024-11-29', '2024-11-30', 'created', NULL, '2024-11-26 18:13:48'),
(33, 'Задача 0016', 'описание', 9, 3, 'low', '2024-11-27', '2024-11-28', 'created', NULL, '2024-11-26 18:46:30'),
(34, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:12:52'),
(35, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:19'),
(38, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:19'),
(39, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:19'),
(40, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:19'),
(41, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:19'),
(42, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:30'),
(43, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:30'),
(44, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:30'),
(45, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:30'),
(46, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:30'),
(47, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:30'),
(48, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 08:13:30'),
(49, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:00:25'),
(50, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:00:25'),
(51, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:00:25'),
(52, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:00:25'),
(53, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:00:25'),
(54, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:00:25'),
(55, 'задача', 'задача', 9, 3, 'low', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:00:25'),
(56, '9954', 'описание', 9, 3, 'middle', '2024-11-28', '2024-11-30', 'created', NULL, '2024-11-27 09:06:36'),
(57, 'Задача 1', 'описание0', 14, 4, 'middle', '2024-12-06', '2024-12-13', 'created', NULL, '2024-11-30 08:37:50');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','boss','doer') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `created_at`) VALUES
(1, 'admin', 'admin@admin.ru', '$2y$10$7brmrMzmeulYKKoFR9.vKOJj/AW.r7Udyht7uL50Yn8i2qdO1pMTi', 'admin', 'active', '2024-11-14 06:45:00'),
(2, 'boss', 'boss@boss.ru', '$2y$10$7brmrMzmeulYKKoFR9.vKOJj/AW.r7Udyht7uL50Yn8i2qdO1pMTi', 'boss', 'active', '2024-11-14 09:46:46'),
(3, 'Полина', 'doer@doer.ru', '$2y$10$7brmrMzmeulYKKoFR9.vKOJj/AW.r7Udyht7uL50Yn8i2qdO1pMTi', 'doer', 'active', '2024-11-14 09:47:20'),
(4, 'doer2', 'doer2@doer.ru', '$2y$10$7brmrMzmeulYKKoFR9.vKOJj/AW.r7Udyht7uL50Yn8i2qdO1pMTi', 'doer', 'active', '2024-11-14 10:21:45'),
(5, 'boss_boss222', 'boss_boss2@boss.boss', '$2y$10$7brmrMzmeulYKKoFR9.vKOJj/AW.r7Udyht7uL50Yn8i2qdO1pMTi', 'boss', 'active', '2024-11-21 20:52:00'),
(6, 'user12', 'user@user.ru', '$2y$10$QUEsftX0bfbHlVh76IESNOTdQ8k8vXJHe3egiyHY1WrTptjpA5vfW', 'doer', 'active', '2024-11-26 08:56:01'),
(7, 'user01', 'user0@user.ru', '$2y$10$.DcRIYJLS/hsAGkU5EDEOuOCxY01N0f10M7Bza/7PCJ3/NCaUzGsO', 'boss', 'active', '2024-11-26 08:57:08'),
(8, 'user1', 'user1@user.ru', '$2y$10$f.Qlr9FugUz.u0xUM3NypuA/909ihF.ODY11f1BpHWiYm4jVW2YRy', 'boss', 'deleted', '2024-11-26 08:58:08'),
(9, 'ivan', 'ivan@mail.ru', '$2y$10$sYYMr7rAM75d4dKw6sSXYueXQuu6BNyXHLRlMydrLP6dWtfYrOXG6', 'boss', 'active', '2024-11-26 10:21:33'),
(10, 'ivan2', 'ivan2@mail.ru', '$2y$10$0w3hPmMuKZeWEt8LeEtWkuasnhhdNuFVbm9A86gEEIEKXVwFKhVVa', 'doer', 'deleted', '2024-11-26 10:21:57');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Индексы таблицы `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_name_unique` (`name`),
  ADD KEY `projects_boss_id_foreign` (`boss_id`);

--
-- Индексы таблицы `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_project_id_foreign` (`project_id`),
  ADD KEY `reports_user_id_foreign` (`user_id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_project_id_foreign` (`project_id`),
  ADD KEY `tasks_doer_id_foreign` (`doer_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `reports`
--
ALTER TABLE `reports`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_boss_id_foreign` FOREIGN KEY (`boss_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_doer_id_foreign` FOREIGN KEY (`doer_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
