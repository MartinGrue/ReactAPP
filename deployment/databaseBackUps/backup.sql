-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: react
-- ------------------------------------------------------
-- Server version	8.0.22

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Activities`
--

LOCK TABLES `Activities` WRITE;
/*!40000 ALTER TABLE `Activities` DISABLE KEYS */;
INSERT INTO `Activities` VALUES ('08d8d8c8-d9f7-ce85-3efe-793dc8008b00','Past Activity 1','Activity 2 days ago','Drinks','2021-02-22 13:34:03.471540','London Downtown','Pub',51.5073509,-0.12775829999998223),('08d8d8c8-d9fc-cc78-0823-009e36e734fa','Past Activity 2','Activity 1 month ago','Culture','2021-02-23 13:34:03.471835','Paris','The Louvre',48.856614,2.3522219000000177),('08d8d8c8-d9fc-f5be-0648-6059a9d20c9a','Future Activity 1','Activity 1 month in future','Music','2021-02-25 13:34:03.471844','Braunschweig','Eintracht-Stadion',52.2688736,10.526769599999966),('08d8d8c8-d9fc-fb00-5983-64579f1a11f9','Future Activity 2','Activity 2 days in future','Food','2021-02-26 13:34:03.471845','Berlin','Italian Food',52.52000659999999,13.404953999999975),('08d8d8c8-d9fd-00bb-e6c0-abdc245d8b12','Future Activity 3','Activity 3 days in future','Drinks','2021-02-27 13:34:03.471846','London','Pub',51.5073509,-0.12775829999998223),('08d8d8c8-d9fd-0537-3734-cd41da34f6a0','Future Activity 4','Activity 4 days in future','Culture','2021-02-28 13:34:03.471846','Paris','Eiffel Tower',48.856614,2.3522219000000177),('08d8d8c8-d9fd-0807-a205-e8b706854a69','Future Activity 5','Activity 5 days in future','Drinks','2021-03-01 13:34:03.471847','Brunswick','Brunswick castle',52.2688736,10.526769599999966),('08d8d8c8-d9fd-0c8e-6662-16bb538bd497','Future Activity 6','Activity 6 days in future','Music','2021-03-02 13:34:03.471847','Berlin','Brandenburg Gate',52.52000659999999,13.404953999999975),('08d8d8c8-d9fd-10d1-8b7c-c4623f413017','Future Activity 7','Activity 7 days in future','Travel','2021-03-03 13:34:03.471848','Berlin','Berlin Television Tower',52.52000659999999,13.404953999999975),('08d8d8c8-d9fd-154e-2049-8dd74a25471e','Future Activity 8','Activity 8 days in future','Drinks','2021-03-04 13:34:03.471848','Berlin','Berlin Cathedral',52.52000659999999,13.404953999999975),('08d8d8c8-d9fd-1a24-ce27-3bfcb00ae025','Future Activity 9','Activity 8 days in future','Drinks','2021-03-04 13:34:03.471855','Berlin','Kurfürstendamm',52.52000659999999,13.404953999999975);
/*!40000 ALTER TABLE `Activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetRoleClaims`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetRoleClaims`
--

LOCK TABLES `AspNetRoleClaims` WRITE;
/*!40000 ALTER TABLE `AspNetRoleClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetRoleClaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetRoles`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetRoles`
--

LOCK TABLES `AspNetRoles` WRITE;
/*!40000 ALTER TABLE `AspNetRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserClaims`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserClaims`
--

LOCK TABLES `AspNetUserClaims` WRITE;
/*!40000 ALTER TABLE `AspNetUserClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserClaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserLogins`
--

DROP TABLE IF EXISTS `AspNetUserLogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserLogins` (
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderDisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserLogins`
--

LOCK TABLES `AspNetUserLogins` WRITE;
/*!40000 ALTER TABLE `AspNetUserLogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserLogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserRoles`
--

DROP TABLE IF EXISTS `AspNetUserRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserRoles` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserRoles`
--

LOCK TABLES `AspNetUserRoles` WRITE;
/*!40000 ALTER TABLE `AspNetUserRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserTokens`
--

DROP TABLE IF EXISTS `AspNetUserTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserTokens` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserTokens`
--

LOCK TABLES `AspNetUserTokens` WRITE;
/*!40000 ALTER TABLE `AspNetUserTokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUsers`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUsers`
--

LOCK TABLES `AspNetUsers` WRITE;
/*!40000 ALTER TABLE `AspNetUsers` DISABLE KEYS */;
INSERT INTO `AspNetUsers` VALUES ('a','bob','BOB','bob@test.com','BOB@TEST.COM',0,'AQAAAAEAACcQAAAAEI+y896+yhrZhQxJC7XlMDjChC+MYbuLoedT7nA/x2Ap2WsbfiNECpIxEEqLmBpLsQ==','CK74GICRQ535RMZCY7H5YYF7EOC6JX6D','a111d380-2db1-4652-b932-1c31fc1b6699',NULL,0,0,NULL,1,0,'Bob',NULL),('b','jane','JANE','jane@test.com','JANE@TEST.COM',0,'AQAAAAEAACcQAAAAEAImD6Sa1lsvnvrAxWsoiTg5YGsz3bSoI2cNl84qfHU8I028oMSyH9VIkarXnyCMjA==','GFIOYQ3YCB35QPYOXZVID3CVQDY6IQ43','1c8d544d-68c3-4b3c-8e74-02349f5c4bc7',NULL,0,0,NULL,1,0,'Jane',NULL),('c','tom','TOM','tom@test.com','TOM@TEST.COM',0,'AQAAAAEAACcQAAAAEL5NxtWmqit8tKge9Y0YEZWPW4Gm/le6WBfaNlKfAjO5SdfghXn10Yq72jl8eGpNDA==','YAVBN4FLZ5JOBFVHI4RWXOQ7ISBEBUSB','56e3dd69-c091-4943-a2c4-e22e7227d6fc',NULL,0,0,NULL,1,0,'Tom',NULL);
/*!40000 ALTER TABLE `AspNetUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FollowerFollowings`
--

DROP TABLE IF EXISTS `FollowerFollowings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FollowerFollowings` (
  `UserAId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserBId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`UserAId`,`UserBId`),
  KEY `IX_FollowerFollowings_UserBId` (`UserBId`),
  CONSTRAINT `FK_FollowerFollowings_AspNetUsers_UserAId` FOREIGN KEY (`UserAId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_FollowerFollowings_AspNetUsers_UserBId` FOREIGN KEY (`UserBId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FollowerFollowings`
--

LOCK TABLES `FollowerFollowings` WRITE;
/*!40000 ALTER TABLE `FollowerFollowings` DISABLE KEYS */;
INSERT INTO `FollowerFollowings` VALUES ('b','a'),('c','a'),('a','b'),('c','b'),('a','c');
/*!40000 ALTER TABLE `FollowerFollowings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Photos`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
INSERT INTO `Photos` VALUES ('avzsk70l6bx2vooc1eeg','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173630/Reactivities/avzsk70l6bx2vooc1eeg.jpg',1,'a'),('bwu2fu05tnoz1vhnfgti','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173637/Reactivities/bwu2fu05tnoz1vhnfgti.jpg',0,'b'),('cgaat55bnn6bc6nq0qsr','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173636/Reactivities/cgaat55bnn6bc6nq0qsr.jpg',0,'b'),('dapaeldrql5o2ktkpbgp','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173638/Reactivities/dapaeldrql5o2ktkpbgp.jpg',0,'b'),('e3mv9rxgow008pzd2bmn','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173637/Reactivities/e3mv9rxgow008pzd2bmn.jpg',0,'b'),('fwvf4r9ujtbqrls0x9ip','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173633/Reactivities/fwvf4r9ujtbqrls0x9ip.jpg',0,'a'),('ns7hpdrpouzultyxzjw4','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173642/Reactivities/ns7hpdrpouzultyxzjw4.jpg',0,'c'),('otfx6a3u1wqpkfmty03v','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173642/Reactivities/otfx6a3u1wqpkfmty03v.jpg',0,'c'),('ouokt3knnlzyurvvxcve','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173640/Reactivities/ouokt3knnlzyurvvxcve.jpg',0,'c'),('pr2alx0m0wipurxf55ae','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173641/Reactivities/pr2alx0m0wipurxf55ae.jpg',0,'c'),('qn5kusmm13ev6skyyxya','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173631/Reactivities/qn5kusmm13ev6skyyxya.jpg',0,'a'),('qvfa4qribklbkmisrq9x','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173634/Reactivities/qvfa4qribklbkmisrq9x.jpg',0,'a'),('rpdlhfxwjoa9kmryz4sg','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173635/Reactivities/rpdlhfxwjoa9kmryz4sg.jpg',1,'b'),('rsptsifih5ahxp1zxt08','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173639/Reactivities/rsptsifih5ahxp1zxt08.jpg',1,'c'),('xuh8utsvgep0zgpe5clg','https://res.cloudinary.com/dvzlb9xco/image/upload/v1614173632/Reactivities/xuh8utsvgep0zgpe5clg.jpg',0,'a');
/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserActivity`
--

DROP TABLE IF EXISTS `UserActivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserActivity` (
  `AppUserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ActivityId` char(36) NOT NULL,
  `DateJoined` datetime(6) NOT NULL,
  `IsHost` tinyint(1) NOT NULL,
  PRIMARY KEY (`AppUserId`,`ActivityId`),
  KEY `IX_UserActivity_ActivityId` (`ActivityId`),
  CONSTRAINT `FK_UserActivity_Activities_ActivityId` FOREIGN KEY (`ActivityId`) REFERENCES `Activities` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_UserActivity_AspNetUsers_AppUserId` FOREIGN KEY (`AppUserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserActivity`
--

LOCK TABLES `UserActivity` WRITE;
/*!40000 ALTER TABLE `UserActivity` DISABLE KEYS */;
INSERT INTO `UserActivity` VALUES ('a','08d8d8c8-d9f7-ce85-3efe-793dc8008b00','2021-02-22 13:34:03.471781',1),('a','08d8d8c8-d9fc-cc78-0823-009e36e734fa','2021-02-23 13:34:03.471844',0),('a','08d8d8c8-d9fc-f5be-0648-6059a9d20c9a','2021-02-25 13:34:03.471845',0),('a','08d8d8c8-d9fc-fb00-5983-64579f1a11f9','2021-02-26 13:34:03.471845',0),('a','08d8d8c8-d9fd-0537-3734-cd41da34f6a0','2021-02-28 13:34:03.471847',1),('a','08d8d8c8-d9fd-0c8e-6662-16bb538bd497','2021-03-02 13:34:03.471847',1),('a','08d8d8c8-d9fd-10d1-8b7c-c4623f413017','2021-03-03 13:34:03.471848',1),('a','08d8d8c8-d9fd-154e-2049-8dd74a25471e','2021-03-04 13:34:03.471855',0),('b','08d8d8c8-d9fc-cc78-0823-009e36e734fa','2021-02-23 13:34:03.471843',1),('b','08d8d8c8-d9fc-f5be-0648-6059a9d20c9a','2021-02-25 13:34:03.471845',1),('b','08d8d8c8-d9fd-00bb-e6c0-abdc245d8b12','2021-02-27 13:34:03.471846',1),('b','08d8d8c8-d9fd-0807-a205-e8b706854a69','2021-03-01 13:34:03.471847',0),('b','08d8d8c8-d9fd-0c8e-6662-16bb538bd497','2021-03-02 13:34:03.471848',0),('b','08d8d8c8-d9fd-154e-2049-8dd74a25471e','2021-03-04 13:34:03.471848',1),('b','08d8d8c8-d9fd-1a24-ce27-3bfcb00ae025','2021-03-04 13:34:03.471855',1),('c','08d8d8c8-d9fc-fb00-5983-64579f1a11f9','2021-02-26 13:34:03.471845',1),('c','08d8d8c8-d9fd-00bb-e6c0-abdc245d8b12','2021-02-27 13:34:03.471846',0),('c','08d8d8c8-d9fd-0807-a205-e8b706854a69','2021-03-01 13:34:03.471847',1),('c','08d8d8c8-d9fd-10d1-8b7c-c4623f413017','2021-03-03 13:34:03.471848',0),('c','08d8d8c8-d9fd-1a24-ce27-3bfcb00ae025','2021-03-04 13:34:03.471855',0);
/*!40000 ALTER TABLE `UserActivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Values`
--

DROP TABLE IF EXISTS `Values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Values` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Values`
--

LOCK TABLES `Values` WRITE;
/*!40000 ALTER TABLE `Values` DISABLE KEYS */;
INSERT INTO `Values` VALUES (1,'Value01'),(2,'Value02'),(3,'Value03');
/*!40000 ALTER TABLE `Values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__EFMigrationsHistory`
--

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__EFMigrationsHistory`
--

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES ('20190918210541_Init','3.0.0'),('20190920111824_Activity','3.0.0'),('20191025115001_AddedIdentity','3.0.0'),('20191105163936_AddedUserActivity','3.0.0'),('20191107210500_AddedPhotos','3.0.0'),('20191115124527_AddedComments','3.0.0'),('20191116134848_AddedFollowerFollowings','3.0.0'),('20191120131542_ModifiedActivitiesWithLongLat','3.0.0');
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

-- Dump completed on 2021-02-24 13:35:19
