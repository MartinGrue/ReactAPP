-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               8.0.18 - MySQL Community Server - GPL
-- Server Betriebssystem:        Linux
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportiere Datenbank Struktur für react
CREATE DATABASE IF NOT EXISTS `react` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `react`;

-- Exportiere Struktur von Tabelle react.Activities
CREATE TABLE IF NOT EXISTS `Activities` (
  `Id` char(36) NOT NULL,
  `Title` longtext,
  `Description` longtext,
  `Category` longtext,
  `Date` datetime(6) NOT NULL,
  `City` longtext,
  `Venue` longtext,
  `Latitute` double NOT NULL DEFAULT '0',
  `Longitute` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.Activities: ~11 rows (ungefähr)
DELETE FROM `Activities`;
/*!40000 ALTER TABLE `Activities` DISABLE KEYS */;
INSERT INTO `Activities` (`Id`, `Title`, `Description`, `Category`, `Date`, `City`, `Venue`, `Latitute`, `Longitute`) VALUES
	('08d7798d-39af-5864-652b-2e9ddfcb099c', 'Past Activity 1', 'Activity 2 months ago', 'Drinks', '2019-10-05 15:12:56.119386', 'London', 'Pub', 51.5073509, -0.12775829999998223),
	('08d7798d-39b4-752f-fa4d-e5cf356643ac', 'Past Activity 2', 'Activity 1 month ago', 'Culture', '2019-11-05 15:12:56.119649', 'Paris', 'The Louvre', 48.856614, 2.3522219000000177),
	('08d7798d-39b4-b59d-dcc9-8b0f1fd322ef', 'Future Activity 1', 'Activity 1 month in future', 'Music', '2020-01-05 15:12:56.119654', 'Braunschweig', 'Eintracht-Stadion', 52.2688736, 10.526769599999966),
	('08d7798d-39b4-b906-d954-c89bbf0f3797', 'Future Activity 2', 'Activity 2 months in future', 'Food', '2020-02-05 15:12:56.119655', 'Berlin', 'Italian Food', 52.52000659999999, 13.404953999999975),
	('08d7798d-39b4-bc03-581d-2effd9db919c', 'Future Activity 3', 'Activity 3 months in future', 'Drinks', '2020-03-05 15:12:56.119656', 'London', 'Pub', 51.5073509, -0.12775829999998223),
	('08d7798d-39b4-bedb-a421-27ae94117954', 'Future Activity 4', 'Activity 4 months in future', 'Culture', '2020-04-05 15:12:56.119657', 'Paris', 'Eiffel Tower', 48.856614, 2.3522219000000177),
	('08d7798d-39b4-c0c0-7423-1cf325932dd0', 'Future Activity 5', 'Activity 5 months in future', 'Drinks', '2020-05-05 15:12:56.119658', 'Brunswick', 'Brunswick castle', 52.2688736, 10.526769599999966),
	('08d7798d-39b4-c397-c8e5-50489db5c05b', 'Future Activity 6', 'Activity 6 months in future', 'Music', '2020-06-05 15:12:56.119658', 'Berlin', 'Brandenburg Gate', 52.52000659999999, 13.404953999999975),
	('08d7798d-39b4-c6c1-bb66-bb3d0bbf97bf', 'Future Activity 7', 'Activity 7 months in future', 'Travel', '2020-07-05 15:12:56.119659', 'Berlin', 'Berlin Television Tower', 52.52000659999999, 13.404953999999975),
	('08d7798d-39b4-c989-f05f-e885587de99c', 'Future Activity 8', 'Activity 8 months in future', 'Drinks', '2020-08-05 15:12:56.119660', 'Berlin', 'Berlin Cathedral', 52.52000659999999, 13.404953999999975),
	('08d7798d-39b4-cc86-29c9-a5b74ae5583e', 'Future Activity 9', 'Activity 8 months in future', 'Drinks', '2020-08-05 15:12:56.119661', 'Berlin', 'Kurfürstendamm', 52.52000659999999, 13.404953999999975);
/*!40000 ALTER TABLE `Activities` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.AspNetRoleClaims
CREATE TABLE IF NOT EXISTS `AspNetRoleClaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext,
  `ClaimValue` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.AspNetRoleClaims: ~0 rows (ungefähr)
DELETE FROM `AspNetRoleClaims`;
/*!40000 ALTER TABLE `AspNetRoleClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetRoleClaims` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.AspNetRoles
CREATE TABLE IF NOT EXISTS `AspNetRoles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.AspNetRoles: ~0 rows (ungefähr)
DELETE FROM `AspNetRoles`;
/*!40000 ALTER TABLE `AspNetRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetRoles` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.AspNetUserClaims
CREATE TABLE IF NOT EXISTS `AspNetUserClaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext,
  `ClaimValue` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetUserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.AspNetUserClaims: ~0 rows (ungefähr)
DELETE FROM `AspNetUserClaims`;
/*!40000 ALTER TABLE `AspNetUserClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserClaims` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.AspNetUserLogins
CREATE TABLE IF NOT EXISTS `AspNetUserLogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext,
  `UserId` varchar(255) NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.AspNetUserLogins: ~0 rows (ungefähr)
DELETE FROM `AspNetUserLogins`;
/*!40000 ALTER TABLE `AspNetUserLogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserLogins` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.AspNetUserRoles
CREATE TABLE IF NOT EXISTS `AspNetUserRoles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.AspNetUserRoles: ~0 rows (ungefähr)
DELETE FROM `AspNetUserRoles`;
/*!40000 ALTER TABLE `AspNetUserRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserRoles` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.AspNetUsers
CREATE TABLE IF NOT EXISTS `AspNetUsers` (
  `Id` varchar(255) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` bit(1) NOT NULL,
  `PasswordHash` longtext,
  `SecurityStamp` longtext,
  `ConcurrencyStamp` longtext,
  `PhoneNumber` longtext,
  `PhoneNumberConfirmed` bit(1) NOT NULL,
  `TwoFactorEnabled` bit(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` bit(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  `DisplayName` longtext,
  `Bio` longtext,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.AspNetUsers: ~3 rows (ungefähr)
DELETE FROM `AspNetUsers`;
/*!40000 ALTER TABLE `AspNetUsers` DISABLE KEYS */;
INSERT INTO `AspNetUsers` (`Id`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`, `DisplayName`, `Bio`) VALUES
	('a', 'bob', 'BOB', 'bob@test.com', 'BOB@TEST.COM', b'0', 'AQAAAAEAACcQAAAAEBKmaIhwVkVgPPbDNI+Y+z+Rv0jegKRyZix3mdplW/ZLc61AHUf8rd0vDoHjnuT3rg==', '5WOVM6TBCT2CYH725NO3LTE6DHCE24YM', '793d459a-d1dd-4fe9-9664-d25a92c10eb0', NULL, b'0', b'0', NULL, b'1', 0, 'Bob', NULL),
	('b', 'jane', 'JANE', 'jane@test.com', 'JANE@TEST.COM', b'0', 'AQAAAAEAACcQAAAAELIMOIGtIVUzXKZEJNuZ6vJmYU35lctlmj/tX4GDKHgxJKinn2O1J04veNC61HAepg==', 'ZKWATD4O67YAKASIBA7NAAQ5A5IUIZFD', 'ffc23ca6-153f-4e0c-9061-0b95753f46ac', NULL, b'0', b'0', NULL, b'1', 0, 'Jane', NULL),
	('c', 'tom', 'TOM', 'tom@test.com', 'TOM@TEST.COM', b'0', 'AQAAAAEAACcQAAAAELEe5lJykPQw3uxjsK+PKiQ+sRMIm47EaLjFxBwzNr+iSIB8cBv6XnEQAqqZI9jXAw==', 'FPMJXHTXAQQO5KETLEHNHQQPJJ2KMLDU', '65d3fa1a-f90d-4257-aa17-da8a4ad730c9', NULL, b'0', b'0', NULL, b'1', 0, 'Tom', NULL);
/*!40000 ALTER TABLE `AspNetUsers` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.AspNetUserTokens
CREATE TABLE IF NOT EXISTS `AspNetUserTokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.AspNetUserTokens: ~0 rows (ungefähr)
DELETE FROM `AspNetUserTokens`;
/*!40000 ALTER TABLE `AspNetUserTokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserTokens` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.Comments
CREATE TABLE IF NOT EXISTS `Comments` (
  `Id` char(36) NOT NULL,
  `Body` longtext,
  `AuthorId` varchar(255) DEFAULT NULL,
  `ActivityId` char(36) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Comments_ActivityId` (`ActivityId`),
  KEY `IX_Comments_AuthorId` (`AuthorId`),
  CONSTRAINT `FK_Comments_Activities_ActivityId` FOREIGN KEY (`ActivityId`) REFERENCES `Activities` (`Id`),
  CONSTRAINT `FK_Comments_AspNetUsers_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `AspNetUsers` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.Comments: ~0 rows (ungefähr)
DELETE FROM `Comments`;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.FollowerFollowings
CREATE TABLE IF NOT EXISTS `FollowerFollowings` (
  `UserAId` varchar(255) NOT NULL,
  `UserBId` varchar(255) NOT NULL,
  PRIMARY KEY (`UserAId`,`UserBId`),
  KEY `IX_FollowerFollowings_UserBId` (`UserBId`),
  CONSTRAINT `FK_FollowerFollowings_AspNetUsers_UserAId` FOREIGN KEY (`UserAId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_FollowerFollowings_AspNetUsers_UserBId` FOREIGN KEY (`UserBId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.FollowerFollowings: ~5 rows (ungefähr)
DELETE FROM `FollowerFollowings`;
/*!40000 ALTER TABLE `FollowerFollowings` DISABLE KEYS */;
INSERT INTO `FollowerFollowings` (`UserAId`, `UserBId`) VALUES
	('b', 'a'),
	('c', 'a'),
	('a', 'b'),
	('c', 'b'),
	('a', 'c');
/*!40000 ALTER TABLE `FollowerFollowings` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.Photos
CREATE TABLE IF NOT EXISTS `Photos` (
  `Id` varchar(255) NOT NULL,
  `Url` longtext,
  `IsMain` bit(1) NOT NULL,
  `AppUserId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Photos_AppUserId` (`AppUserId`),
  CONSTRAINT `FK_Photos_AspNetUsers_AppUserId` FOREIGN KEY (`AppUserId`) REFERENCES `AspNetUsers` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.Photos: ~15 rows (ungefähr)
DELETE FROM `Photos`;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
INSERT INTO `Photos` (`Id`, `Url`, `IsMain`, `AppUserId`) VALUES
	('a8uphjyzy23peqjacksg', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555169/a8uphjyzy23peqjacksg.jpg', b'0', 'b'),
	('asca9fpk8klxrjgt7yzg', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555173/asca9fpk8klxrjgt7yzg.jpg', b'0', 'c'),
	('ausbnltw2d3obwcvxsia', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555165/ausbnltw2d3obwcvxsia.jpg', b'0', 'a'),
	('c04vbpvgtyw37mtuqble', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555168/c04vbpvgtyw37mtuqble.jpg', b'0', 'b'),
	('f1oelcydniwd2c0ioamo', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555167/f1oelcydniwd2c0ioamo.jpg', b'0', 'b'),
	('inukjqhtmji4mgr44bm1', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555163/inukjqhtmji4mgr44bm1.jpg', b'0', 'a'),
	('jan5mhr7kzduqi6lwazi', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555166/jan5mhr7kzduqi6lwazi.jpg', b'1', 'b'),
	('knphhllq9djuz1e5ghhc', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555172/knphhllq9djuz1e5ghhc.jpg', b'0', 'c'),
	('mglmzc84fzcrmiw3f9tq', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555174/mglmzc84fzcrmiw3f9tq.jpg', b'0', 'c'),
	('mvx625ipdfiq5qseoyhz', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555165/mvx625ipdfiq5qseoyhz.jpg', b'0', 'a'),
	('nl3elvrrfpusijtyzmvm', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555162/nl3elvrrfpusijtyzmvm.jpg', b'1', 'a'),
	('ourhrp8weyb6dttikawx', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555169/ourhrp8weyb6dttikawx.jpg', b'0', 'b'),
	('rnhld4sxtzlxwtsfpm43', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555170/rnhld4sxtzlxwtsfpm43.jpg', b'1', 'c'),
	('svxmkarflr0tgufnptsi', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555164/svxmkarflr0tgufnptsi.jpg', b'0', 'a'),
	('v5wr8s2u1qz99vwlyinz', 'https://res.cloudinary.com/dvzlb9xco/image/upload/v1575555171/v5wr8s2u1qz99vwlyinz.jpg', b'0', 'c');
/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.UserActivity
CREATE TABLE IF NOT EXISTS `UserActivity` (
  `AppUserId` varchar(255) NOT NULL,
  `ActivityId` char(36) NOT NULL,
  `DateJoined` datetime(6) NOT NULL,
  `IsHost` bit(1) NOT NULL,
  PRIMARY KEY (`AppUserId`,`ActivityId`),
  KEY `IX_UserActivity_ActivityId` (`ActivityId`),
  CONSTRAINT `FK_UserActivity_Activities_ActivityId` FOREIGN KEY (`ActivityId`) REFERENCES `Activities` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_UserActivity_AspNetUsers_AppUserId` FOREIGN KEY (`AppUserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.UserActivity: ~20 rows (ungefähr)
DELETE FROM `UserActivity`;
/*!40000 ALTER TABLE `UserActivity` DISABLE KEYS */;
INSERT INTO `UserActivity` (`AppUserId`, `ActivityId`, `DateJoined`, `IsHost`) VALUES
	('a', '08d7798d-39af-5864-652b-2e9ddfcb099c', '2019-10-05 15:12:56.119593', b'1'),
	('a', '08d7798d-39b4-752f-fa4d-e5cf356643ac', '2019-11-05 15:12:56.119654', b'0'),
	('a', '08d7798d-39b4-b59d-dcc9-8b0f1fd322ef', '2020-01-05 15:12:56.119655', b'0'),
	('a', '08d7798d-39b4-b906-d954-c89bbf0f3797', '2020-02-05 15:12:56.119656', b'0'),
	('a', '08d7798d-39b4-bedb-a421-27ae94117954', '2020-04-05 15:12:56.119657', b'1'),
	('a', '08d7798d-39b4-c397-c8e5-50489db5c05b', '2020-06-05 15:12:56.119659', b'1'),
	('a', '08d7798d-39b4-c6c1-bb66-bb3d0bbf97bf', '2020-07-05 15:12:56.119660', b'1'),
	('a', '08d7798d-39b4-c989-f05f-e885587de99c', '2020-08-05 15:12:56.119661', b'0'),
	('b', '08d7798d-39b4-752f-fa4d-e5cf356643ac', '2019-11-05 15:12:56.119653', b'1'),
	('b', '08d7798d-39b4-b59d-dcc9-8b0f1fd322ef', '2020-01-05 15:12:56.119654', b'1'),
	('b', '08d7798d-39b4-bc03-581d-2effd9db919c', '2020-03-05 15:12:56.119656', b'1'),
	('b', '08d7798d-39b4-c0c0-7423-1cf325932dd0', '2020-05-05 15:12:56.119658', b'0'),
	('b', '08d7798d-39b4-c397-c8e5-50489db5c05b', '2020-06-05 15:12:56.119659', b'0'),
	('b', '08d7798d-39b4-c989-f05f-e885587de99c', '2020-08-05 15:12:56.119660', b'1'),
	('b', '08d7798d-39b4-cc86-29c9-a5b74ae5583e', '2020-08-05 15:12:56.119661', b'1'),
	('c', '08d7798d-39b4-b906-d954-c89bbf0f3797', '2020-02-05 15:12:56.119655', b'1'),
	('c', '08d7798d-39b4-bc03-581d-2effd9db919c', '2020-03-05 15:12:56.119657', b'0'),
	('c', '08d7798d-39b4-c0c0-7423-1cf325932dd0', '2020-05-05 15:12:56.119658', b'1'),
	('c', '08d7798d-39b4-c6c1-bb66-bb3d0bbf97bf', '2020-07-05 15:12:56.119660', b'0'),
	('c', '08d7798d-39b4-cc86-29c9-a5b74ae5583e', '2020-08-05 15:12:56.119662', b'0');
/*!40000 ALTER TABLE `UserActivity` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.Values
CREATE TABLE IF NOT EXISTS `Values` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.Values: ~3 rows (ungefähr)
DELETE FROM `Values`;
/*!40000 ALTER TABLE `Values` DISABLE KEYS */;
INSERT INTO `Values` (`Id`, `Name`) VALUES
	(1, 'Value01'),
	(2, 'Value02'),
	(3, 'Value03');
/*!40000 ALTER TABLE `Values` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle react.__EFMigrationsHistory
CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle react.__EFMigrationsHistory: ~8 rows (ungefähr)
DELETE FROM `__EFMigrationsHistory`;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) VALUES
	('20190918210541_Init', '2.2.6-servicing-10079'),
	('20190920111824_Activity', '2.2.6-servicing-10079'),
	('20191025115001_AddedIdentity', '2.2.6-servicing-10079'),
	('20191105163936_AddedUserActivity', '2.2.6-servicing-10079'),
	('20191107210500_AddedPhotos', '2.2.6-servicing-10079'),
	('20191115124527_AddedComments', '2.2.6-servicing-10079'),
	('20191116134848_AddedFollowerFollowings', '2.2.6-servicing-10079'),
	('20191120131542_ModifiedActivitiesWithLongLat', '2.2.6-servicing-10079');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
