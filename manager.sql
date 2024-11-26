-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 26 2024 г., 20:43
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
(12, 'dsfsd', 'описаниеsdfdf', 2, '2024-11-30', '2024-12-08', '{\"doers\": [\"3\"]}', 'created', '2024-11-22 09:36:39'),
(13, 'проект без босса', 'или с боссом?', 5, '2024-11-26', '2024-11-28', '{\"doers\": [\"3\"]}', 'in_process', '2024-11-25 20:24:52');

-- --------------------------------------------------------

--
-- Структура таблицы `reports`
--

CREATE TABLE `reports` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint UNSIGNED NOT NULL,
  `stats` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(13, 'Задача 2', 'описание 2', 9, 3, 'middle', '2024-11-19', '2027-12-10', 'created', '{\"18:43:44 25.11.2024\": \"1\"}', '2024-11-18 21:00:00'),
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
(33, 'Задача 0016', 'описание', 9, 3, 'low', '2024-11-27', '2024-11-28', 'created', NULL, '2024-11-26 18:46:30');

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `reports`
--
ALTER TABLE `reports`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

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
  ADD CONSTRAINT `reports_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
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
