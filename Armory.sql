-- MySQL dump 10.19  Distrib 10.3.31-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: Armory
-- ------------------------------------------------------
-- Server version	10.3.31-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Ammo`
--

DROP TABLE IF EXISTS `Ammo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ammo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Manufacturer` int(11) DEFAULT NULL,
  `Caliber` int(11) DEFAULT NULL,
  `BulletWeight` int(11) DEFAULT NULL,
  `Casing` varchar(100) DEFAULT NULL,
  `BulletType` varchar(100) DEFAULT NULL,
  `MuzzleVelocity` int(11) DEFAULT NULL,
  `Rounds` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ammo`
--

LOCK TABLES `Ammo` WRITE;
/*!40000 ALTER TABLE `Ammo` DISABLE KEYS */;
INSERT INTO `Ammo` VALUES (1,6,1,124,'Brass','FMJ (Copper)',0,1120),(2,2,3,62,'Brass','FMJ',3000,800),(3,3,2,55,'Steel','FMJ',2953,920),(4,4,1,122,'Steel','FMJ',2396,1140),(5,5,1,122,'Steel','FMJ',2309,140),(6,1,1,0,'Unknown','Unknown',0,396),(7,11,4,115,'Brass','FMJ',1150,400),(8,10,4,115,'Brass','FMJ',1145,50),(9,8,4,115,'Brass','FMJ',1280,50),(10,9,4,115,'Brass','FMJ',1180,50),(11,9,4,124,'Brass','FMJ',1150,50),(12,9,4,135,'Brass','Hydra-Shok',1150,40),(13,7,5,124,'Brass','FMJ',1140,32),(14,12,4,115,'Brass','TMJ',0,145),(15,12,6,180,'Brass','TMJ',0,248),(16,1,3,0,'Unknown','Unknown',0,100);
/*!40000 ALTER TABLE `Ammo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AmmoPurchase`
--

DROP TABLE IF EXISTS `AmmoPurchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AmmoPurchase` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Ammo` int(11) NOT NULL,
  `Vendor` int(11) NOT NULL,
  `Rounds` int(11) NOT NULL DEFAULT 0,
  `Price` decimal(13,2) NOT NULL,
  `DatePurchased` datetime DEFAULT NULL,
  `DateReceived` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AmmoPurchase`
--

LOCK TABLES `AmmoPurchase` WRITE;
/*!40000 ALTER TABLE `AmmoPurchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `AmmoPurchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Caliber`
--

DROP TABLE IF EXISTS `Caliber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Caliber` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Label` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Caliber`
--

LOCK TABLES `Caliber` WRITE;
/*!40000 ALTER TABLE `Caliber` DISABLE KEYS */;
INSERT INTO `Caliber` VALUES (1,'7.62x39'),(2,'.223 REM'),(3,'5.56x45 Nato'),(4,'9mm Luger'),(5,'9mm Nato'),(6,'.40 S&W'),(7,'12 Gauge');
/*!40000 ALTER TABLE `Caliber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Manufacturer`
--

DROP TABLE IF EXISTS `Manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Manufacturer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Website` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Manufacturer`
--

LOCK TABLES `Manufacturer` WRITE;
/*!40000 ALTER TABLE `Manufacturer` DISABLE KEYS */;
INSERT INTO `Manufacturer` VALUES (1,'Unknown',NULL),(2,'Oman Munition Production Company','https://ompc.om/'),(3,'The Tula Cartridge Works','https://tulammo.ru/en/'),(4,'WOLF Performance Ammunition','http://www.wolfammo.com/'),(5,'Red Army Standard','https://www.centuryarms.com/red-army-standard'),(6,'Igman Arsenal',NULL),(7,'Winchester Repeating Arms','https://www.winchesterguns.com/'),(8,'Sellier & Bellot','https://www.sellierbellot.us/'),(9,'Federal Ammunition','https://www.federalpremium.com/'),(10,'Remington','https://www.remington.com/'),(11,'Grind Hard Ammo','https://grindhardammo.com/'),(12,'Tennessee Cartridge',NULL);
/*!40000 ALTER TABLE `Manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shoot`
--

DROP TABLE IF EXISTS `Shoot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shoot` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FireArm` int(11) NOT NULL,
  `Ammo` int(11) NOT NULL,
  `Rounds` int(11) NOT NULL DEFAULT 0,
  `Created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shoot`
--

LOCK TABLES `Shoot` WRITE;
/*!40000 ALTER TABLE `Shoot` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shoot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendor`
--

DROP TABLE IF EXISTS `Vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vendor` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Website` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendor`
--

LOCK TABLES `Vendor` WRITE;
/*!40000 ALTER TABLE `Vendor` DISABLE KEYS */;
INSERT INTO `Vendor` VALUES (1,'Tactical Shit','https://shop.tacticalshit.com');
/*!40000 ALTER TABLE `Vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-10  1:00:16
