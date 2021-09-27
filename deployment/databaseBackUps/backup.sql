/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- Exportiere Datenbank Struktur für react
CREATE DATABASE IF NOT EXISTS `react` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `react`;
--
-- Table structure for table `Activities`
--

DROP TABLE IF EXISTS `Activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Activities` (
  `Id` char(36) NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Category` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Date` datetime(6) NOT NULL,
  `City` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Venue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Latitute` double NOT NULL DEFAULT '0',
  `Longitute` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `Activities` WRITE;
/*!40000 ALTER TABLE `Activities` DISABLE KEYS */;
INSERT INTO
  `Activities`
VALUES
  (
    '08d98118-a38a-6d66-4257-cdbfc3e1fb57',
    'Past Activity 1',
    'Activity 2 days ago',
    'Drinks',
    '2021-09-22 15:48:36.392000',
    'London Downtown',
    'Pub',
    51.5073509,
    51.5073509
  ),(
    '08d98118-a38b-5dba-ae65-2199b0d791bc',
    'Past Activity 2',
    'Activity 1 month ago',
    'Culture',
    '2021-09-21 15:48:36.392000',
    'Paris',
    'The Louvre',
    48.856614,
    48.856614
  ),(
    '08d98118-a38b-683e-a1a3-5aa66a333831',
    'Future Activity 1',
    'Activity 1 Day in future',
    'Music',
    '2021-09-23 15:48:36.392000',
    'Braunschweig',
    'Eintracht-Stadion',
    52.2688736,
    52.2688736
  ),(
    '08d98118-a38b-6e20-5800-4e95f6cf4a32',
    'Future Activity 2',
    'Activity 2 days in future',
    'Food',
    '2021-09-24 15:48:36.392000',
    'Berlin',
    'Italian Food',
    52.52000659999999,
    52.52000659999999
  ),(
    '08d98118-a38b-7486-ce5b-073ea7aeaf83',
    'Future Activity 3',
    'Activity 3 days in future',
    'Drinks',
    '2021-09-25 15:48:36.392000',
    'London',
    'Pub',
    51.5073509,
    51.5073509
  ),(
    '08d98118-a38b-7a13-0714-105fbb1828fc',
    'Future Activity 4',
    'Activity 4 days in future',
    'Culture',
    '2021-09-26 15:48:36.392000',
    'Paris',
    'Eiffel Tower',
    48.856614,
    48.856614
  ),(
    '08d98118-a38b-7da8-1893-2208bcbad559',
    'Future Activity 5',
    'Activity 5 days in future',
    'Drinks',
    '2021-09-27 15:48:36.392000',
    'Brunswick',
    'Brunswick castle',
    52.2688736,
    52.2688736
  ),(
    '08d98118-a38b-832e-9b3a-ec4cdcad28e2',
    'Future Activity 6',
    'Activity 6 days in future',
    'Music',
    '2021-09-28 15:48:36.392000',
    'Berlin',
    'Brandenburg Gate',
    52.52000659999999,
    52.52000659999999
  ),(
    '08d98118-a38b-88b8-8e1d-07e8a458c48d',
    'Future Activity 7',
    'Activity 7 days in future',
    'Travel',
    '2021-09-29 15:48:36.392000',
    'Berlin',
    'Berlin Television Tower',
    52.52000659999999,
    52.52000659999999
  ),(
    '08d98118-a38b-8e88-1718-6dde4d80118f',
    'Future Activity 8',
    'Activity 8 days in future',
    'Drinks',
    '2021-09-30 15:48:36.392000',
    'Berlin',
    'Berlin Cathedral',
    52.52000659999999,
    52.52000659999999
  ),(
    '08d98118-a38b-944f-0b58-ef62d6079348',
    'Future Activity 9',
    'Activity 8 days in future',
    'Drinks',
    '2021-09-30 15:48:36.392000',
    'Berlin',
    'Kurfürstendamm',
    52.52000659999999,
    52.52000659999999
  );
  /*!40000 ALTER TABLE `Activities` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `AspNetRoleClaims`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoleClaims` (
    `Id` int NOT NULL,
    `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (`Id`),
    KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
    CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `AspNetRoleClaims` WRITE;
  /*!40000 ALTER TABLE `AspNetRoleClaims` DISABLE KEYS */;
  /*!40000 ALTER TABLE `AspNetRoleClaims` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `AspNetRoles`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoles` (
    `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `NormalizedName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (`Id`),
    UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `AspNetRoles` WRITE;
  /*!40000 ALTER TABLE `AspNetRoles` DISABLE KEYS */;
  /*!40000 ALTER TABLE `AspNetRoles` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `AspNetUserClaims`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserClaims` (
    `Id` int NOT NULL,
    `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (`Id`),
    KEY `IX_AspNetUserClaims_UserId` (`UserId`),
    CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `AspNetUserClaims` WRITE;
  /*!40000 ALTER TABLE `AspNetUserClaims` DISABLE KEYS */;
  /*!40000 ALTER TABLE `AspNetUserClaims` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `AspNetUserLogins`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserLogins` (
    `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `ProviderKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `ProviderDisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (`LoginProvider`, `ProviderKey`),
    KEY `IX_AspNetUserLogins_UserId` (`UserId`),
    CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `AspNetUserLogins` WRITE;
  /*!40000 ALTER TABLE `AspNetUserLogins` DISABLE KEYS */;
  /*!40000 ALTER TABLE `AspNetUserLogins` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `AspNetUserRoles`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserRoles` (
    `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (`UserId`, `RoleId`),
    KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
    CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `AspNetUserRoles` WRITE;
  /*!40000 ALTER TABLE `AspNetUserRoles` DISABLE KEYS */;
  /*!40000 ALTER TABLE `AspNetUserRoles` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `AspNetUserTokens`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserTokens` (
    `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (`UserId`, `LoginProvider`, `Name`),
    CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `AspNetUserTokens` WRITE;
  /*!40000 ALTER TABLE `AspNetUserTokens` DISABLE KEYS */;
  /*!40000 ALTER TABLE `AspNetUserTokens` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `AspNetUsers`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUsers` (
    `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `UserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `EmailConfirmed` tinyint(1) NOT NULL,
    `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `SecurityStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `PhoneNumberConfirmed` tinyint(1) NOT NULL,
    `TwoFactorEnabled` tinyint(1) NOT NULL,
    `LockoutEnd` datetime(6) DEFAULT NULL,
    `LockoutEnabled` tinyint(1) NOT NULL,
    `AccessFailedCount` int NOT NULL,
    `DisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `Bio` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (`Id`),
    UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
    KEY `EmailIndex` (`NormalizedEmail`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `AspNetUsers` WRITE;
  /*!40000 ALTER TABLE `AspNetUsers` DISABLE KEYS */;
INSERT INTO
  `AspNetUsers`
VALUES
  (
    'a',
    'bob',
    'BOB',
    'bob@test.com',
    'BOB@TEST.COM',
    0,
    'AQAAAAEAACcQAAAAEMSImBxvQNVDNekQh5ekdo6y44zEnl6ecwO/3/Vz/JqatdK/7I/mntajAJRGsZFBCg==',
    'VNAWUWS3KL5XG4Q5MUNWZWGVRAO653GT',
    '2ce45860-e08e-4fd2-abc8-26d6de8747bf',
    NULL,
    0,
    0,
    NULL,
    1,
    0,
    'Bob',
    NULL
  ),(
    'b',
    'jane',
    'JANE',
    'jane@test.com',
    'JANE@TEST.COM',
    0,
    'AQAAAAEAACcQAAAAEGgnHjAn7qURktHX47iS1/0vzPIVA4wZ56fMWpj1Y+c0PPsVDOaOFKaD0LWUIfNdmA==',
    'XMEUADV5GJNVDQQ4B2MJ7YPRMJFY4DXO',
    '68e3225d-65a4-427d-a8fb-ad9ccd7b7bbc',
    NULL,
    0,
    0,
    NULL,
    1,
    0,
    'Jane',
    NULL
  ),(
    'c',
    'tom',
    'TOM',
    'tom@test.com',
    'TOM@TEST.COM',
    0,
    'AQAAAAEAACcQAAAAEGdVcfAa6wUVXcEshhUFLJeimWBxhElgF6SLxfqjRRzSxFceHAgVpwZouoAMvtXz/w==',
    'UN7MZ3HNG6SO4DJ3RZIVV3B5AF7HROQC',
    '5d4613fa-2ef9-45aa-b176-b26603f8c140',
    NULL,
    0,
    0,
    NULL,
    1,
    0,
    'Tom',
    NULL
  );
  /*!40000 ALTER TABLE `AspNetUsers` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Comments`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
    `Id` char(36) NOT NULL,
    `Body` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `AuthorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `ActivityId` char(36) DEFAULT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    PRIMARY KEY (`Id`),
    KEY `IX_Comments_ActivityId` (`ActivityId`),
    KEY `IX_Comments_AuthorId` (`AuthorId`),
    CONSTRAINT `FK_Comments_Activities_ActivityId` FOREIGN KEY (`ActivityId`) REFERENCES `Activities` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_Comments_AspNetUsers_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE RESTRICT
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `Comments` WRITE;
  /*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
  /*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `FollowerFollowings`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FollowerFollowings` (
    `UserAId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `UserBId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (`UserAId`, `UserBId`),
    KEY `IX_FollowerFollowings_UserBId` (`UserBId`),
    CONSTRAINT `FK_FollowerFollowings_AspNetUsers_UserAId` FOREIGN KEY (`UserAId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_FollowerFollowings_AspNetUsers_UserBId` FOREIGN KEY (`UserBId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `FollowerFollowings` WRITE;
  /*!40000 ALTER TABLE `FollowerFollowings` DISABLE KEYS */;
INSERT INTO
  `FollowerFollowings`
VALUES
  ('c', 'a'),('a', 'b'),('c', 'b'),('a', 'c'),('b', 'c');
  /*!40000 ALTER TABLE `FollowerFollowings` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Photos`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Photos` (
    `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `Url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `IsMain` tinyint(1) NOT NULL,
    `AppUserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    PRIMARY KEY (`Id`),
    KEY `IX_Photos_AppUserId` (`AppUserId`),
    CONSTRAINT `FK_Photos_AspNetUsers_AppUserId` FOREIGN KEY (`AppUserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE RESTRICT
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `Photos` WRITE;
  /*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
INSERT INTO
  `Photos`
VALUES
  (
    'arqz8bivpqtodn3qa1qr',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679681/Reactivities/arqz8bivpqtodn3qa1qr.jpg',
    1,
    'b'
  ),(
    'dzjwhufpim5oevuf8low',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679685/Reactivities/dzjwhufpim5oevuf8low.jpg',
    1,
    'c'
  ),(
    'euwrovri3gsjvofof7ux',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679686/Reactivities/euwrovri3gsjvofof7ux.jpg',
    0,
    'c'
  ),(
    'fqimwngqqpouvrxizubl',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679678/Reactivities/fqimwngqqpouvrxizubl.jpg',
    0,
    'a'
  ),(
    'iyytghdpyrg4zp2wzkp9',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679682/Reactivities/iyytghdpyrg4zp2wzkp9.jpg',
    0,
    'b'
  ),(
    'ngla6bnrt9j6rep4omze',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679678/Reactivities/ngla6bnrt9j6rep4omze.jpg',
    0,
    'a'
  ),(
    'oc8cwuncnzd7fpdhwmrx',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679683/Reactivities/oc8cwuncnzd7fpdhwmrx.jpg',
    0,
    'b'
  ),(
    'ont4lcuyeyfpxgvjxr7h',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679689/Reactivities/ont4lcuyeyfpxgvjxr7h.jpg',
    0,
    'c'
  ),(
    'prm622z8kzhqgks9uwzw',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679685/Reactivities/prm622z8kzhqgks9uwzw.jpg',
    0,
    'b'
  ),(
    'tiuwx0roe4exkxjkaxhl',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679679/Reactivities/tiuwx0roe4exkxjkaxhl.jpg',
    0,
    'a'
  ),(
    'tpuevgn7huiipzyi8gj9',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679680/Reactivities/tpuevgn7huiipzyi8gj9.jpg',
    0,
    'a'
  ),(
    'tzybaehh4wglbmrddasl',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679677/Reactivities/tzybaehh4wglbmrddasl.jpg',
    1,
    'a'
  ),(
    'wgfo6dldynxydzbm7jps',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679684/Reactivities/wgfo6dldynxydzbm7jps.jpg',
    0,
    'b'
  ),(
    'wvks31kuotzm7n9mbes3',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679687/Reactivities/wvks31kuotzm7n9mbes3.jpg',
    0,
    'c'
  ),(
    'x7auyoywusolmtjom1xg',
    'https://res.cloudinary.com/dvzlb9xco/image/upload/v1632679688/Reactivities/x7auyoywusolmtjom1xg.jpg',
    0,
    'c'
  );
  /*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `UserActivity`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserActivity` (
    `AppUserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `ActivityId` char(36) NOT NULL,
    `DateJoined` datetime(6) NOT NULL,
    `IsHost` tinyint(1) NOT NULL,
    PRIMARY KEY (`AppUserId`, `ActivityId`),
    KEY `IX_UserActivity_ActivityId` (`ActivityId`),
    CONSTRAINT `FK_UserActivity_Activities_ActivityId` FOREIGN KEY (`ActivityId`) REFERENCES `Activities` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_UserActivity_AspNetUsers_AppUserId` FOREIGN KEY (`AppUserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `UserActivity` WRITE;
  /*!40000 ALTER TABLE `UserActivity` DISABLE KEYS */;
INSERT INTO
  `UserActivity`
VALUES
  (
    'a',
    '08d98118-a38a-6d66-4257-cdbfc3e1fb57',
    '2021-09-22 15:48:36.392000',
    1
  ),(
    'a',
    '08d98118-a38b-5dba-ae65-2199b0d791bc',
    '2021-09-20 15:48:36.392000',
    0
  ),(
    'a',
    '08d98118-a38b-683e-a1a3-5aa66a333831',
    '2021-09-23 15:48:36.392000',
    0
  ),(
    'a',
    '08d98118-a38b-6e20-5800-4e95f6cf4a32',
    '2021-09-24 15:48:36.392000',
    0
  ),(
    'a',
    '08d98118-a38b-7a13-0714-105fbb1828fc',
    '2021-09-26 15:48:36.392000',
    1
  ),(
    'a',
    '08d98118-a38b-832e-9b3a-ec4cdcad28e2',
    '2021-09-28 15:48:36.392000',
    1
  ),(
    'a',
    '08d98118-a38b-88b8-8e1d-07e8a458c48d',
    '2021-09-29 15:48:36.392000',
    1
  ),(
    'a',
    '08d98118-a38b-8e88-1718-6dde4d80118f',
    '2021-09-30 15:48:36.392000',
    0
  ),(
    'b',
    '08d98118-a38b-5dba-ae65-2199b0d791bc',
    '2021-09-21 15:48:36.392000',
    1
  ),(
    'b',
    '08d98118-a38b-683e-a1a3-5aa66a333831',
    '2021-09-23 15:48:36.392000',
    1
  ),(
    'b',
    '08d98118-a38b-7486-ce5b-073ea7aeaf83',
    '2021-09-25 15:48:36.392000',
    1
  ),(
    'b',
    '08d98118-a38b-7da8-1893-2208bcbad559',
    '2021-09-27 15:48:36.392000',
    0
  ),(
    'b',
    '08d98118-a38b-832e-9b3a-ec4cdcad28e2',
    '2021-09-28 15:48:36.392000',
    0
  ),(
    'b',
    '08d98118-a38b-8e88-1718-6dde4d80118f',
    '2021-09-30 15:48:36.392000',
    1
  ),(
    'b',
    '08d98118-a38b-944f-0b58-ef62d6079348',
    '2021-09-30 15:48:36.392000',
    1
  ),(
    'c',
    '08d98118-a38b-6e20-5800-4e95f6cf4a32',
    '2021-09-24 15:48:36.392000',
    1
  ),(
    'c',
    '08d98118-a38b-7486-ce5b-073ea7aeaf83',
    '2021-09-25 15:48:36.392000',
    0
  ),(
    'c',
    '08d98118-a38b-7da8-1893-2208bcbad559',
    '2021-09-27 15:48:36.392000',
    1
  ),(
    'c',
    '08d98118-a38b-88b8-8e1d-07e8a458c48d',
    '2021-09-29 15:48:36.392000',
    0
  ),(
    'c',
    '08d98118-a38b-944f-0b58-ef62d6079348',
    '2021-09-30 15:48:36.392000',
    0
  );
  /*!40000 ALTER TABLE `UserActivity` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Values`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Values` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    PRIMARY KEY (`Id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `Values` WRITE;
  /*!40000 ALTER TABLE `Values` DISABLE KEYS */;
INSERT INTO
  `Values`
VALUES
  (1, 'Value01'),(2, 'Value02'),(3, 'Value03');
  /*!40000 ALTER TABLE `Values` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `__EFMigrationsHistory`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__EFMigrationsHistory` (
    `MigrationId` varchar(95) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    PRIMARY KEY (`MigrationId`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `__EFMigrationsHistory` WRITE;
  /*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO
  `__EFMigrationsHistory`
VALUES
  ('20190918210541_Init', '3.0.0'),('20190920111824_Activity', '3.0.0'),('20191025115001_AddedIdentity', '3.0.0'),('20191105163936_AddedUserActivity', '3.0.0'),('20191107210500_AddedPhotos', '3.0.0'),('20191115124527_AddedComments', '3.0.0'),(
    '20191116134848_AddedFollowerFollowings',
    '3.0.0'
  ),(
    '20191120131542_ModifiedActivitiesWithLongLat',
    '3.0.0'
  );
  /*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;