-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: novitas
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `description` text,
  `tree` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Body 1',1,NULL,'combat'),(2,'Body 2',2,NULL,'combat'),(4,'Body 3',3,NULL,'combat'),(5,'Body 4',4,NULL,'combat'),(6,'Buckler Fighting',1,NULL,'combat'),(7,'Shield Fighting',1,NULL,'combat'),(8,'Melee Training',2,NULL,'combat'),(9,'Melee Proficiency',3,NULL,'combat'),(10,'Melee Expert',4,NULL,'combat'),(11,'Melee Master',5,NULL,'combat'),(12,'Two Weapon Fighting',2,NULL,'combat'),(13,'Two Weapon Expert',3,NULL,'combat'),(14,'Two Weapon Master',4,NULL,'combat'),(15,'Great Weapon Training',2,NULL,'combat'),(16,'Missile Training',2,NULL,'combat'),(17,'Missile Proficiency',2,NULL,'combat'),(18,'Missile Expert',2,NULL,'combat'),(19,'Missile Master',2,NULL,'combat'),(20,'Thrown Weapons',2,NULL,'combat'),(21,'Thrown Weapon Master',3,NULL,'combat'),(22,'Alchemy 1',1,NULL,'production'),(23,'Alchemy 2',2,NULL,'production'),(24,'Alchemy 3',3,NULL,'production'),(25,'Alchemy 4',4,NULL,'production'),(26,'Alchemy 5',5,NULL,'production'),(27,'Brew Potion',2,NULL,'production'),(28,'Ornamenter 1',4,NULL,'production'),(29,'Ornamenter 2',2,NULL,'production'),(30,'Ornamenter 3',3,NULL,'production'),(31,'Ornamenter 4',4,NULL,'production'),(32,'Ornamenter 5',5,NULL,'production'),(33,'Scribe Scroll',4,NULL,'production'),(34,'Tinkerer 1',4,NULL,'production'),(35,'Tinkerer 2',2,NULL,'production'),(36,'Tinkerer 3',3,NULL,'production'),(37,'Tinkerer 4',4,NULL,'production'),(38,'Tinkerer 5',5,NULL,'production'),(39,'Weaponsmith 1',4,NULL,'production'),(40,'Weaponsmith 2',2,NULL,'production'),(41,'Weaponsmith 3',3,NULL,'production'),(42,'Weaponsmith 4',4,NULL,'production'),(43,'Weaponsmith 5',5,NULL,'production'),(44,'Chosen 1',4,NULL,'roleplaying'),(45,'Chosen 2',4,NULL,'roleplaying'),(46,'Chosen 3',4,NULL,'roleplaying'),(47,'Chosen 4',4,NULL,'roleplaying'),(48,'Chosen 5',4,NULL,'roleplaying'),(49,'Druid 1',4,NULL,'roleplaying'),(50,'Druid 2',4,NULL,'roleplaying'),(51,'Druid 3',4,NULL,'roleplaying'),(52,'Druid 4',4,NULL,'roleplaying'),(53,'Druid 5',4,NULL,'roleplaying'),(54,'Medium 1',4,NULL,'roleplaying'),(55,'Medium 2',4,NULL,'roleplaying'),(56,'Medium 3',4,NULL,'roleplaying'),(57,'Medium 4',4,NULL,'roleplaying'),(58,'Medium 5',4,NULL,'roleplaying'),(59,'Merchant 1',4,NULL,'roleplaying'),(60,'Merchant 2',4,NULL,'roleplaying'),(61,'Merchant 3',4,NULL,'roleplaying'),(62,'Merchant 4',4,NULL,'roleplaying'),(63,'Merchant 5',4,NULL,'roleplaying'),(64,'Status 1',4,NULL,'roleplaying'),(65,'Status 2',4,NULL,'roleplaying'),(66,'Status 3',4,NULL,'roleplaying'),(67,'Status 4',4,NULL,'roleplaying'),(68,'Status 5',4,NULL,'roleplaying'),(69,'Estimate Value',2,NULL,'general'),(70,'First Aid',1,NULL,'general'),(71,'Herbalist',2,NULL,'general'),(72,'Identify Magic',2,NULL,'general'),(73,'Language: Andaranian',1,NULL,'general'),(74,'Language: Draconian ',1,NULL,'general'),(75,'Language: Elven',1,NULL,'general'),(76,'Language: Snow Goblin',1,NULL,'general'),(77,'Language: Sylvan',1,NULL,'general'),(78,'Language: Terran',1,NULL,'general'),(79,'Language: ',1,NULL,'general'),(80,'Lore',2,NULL,'general'),(81,'Advanced Lore',3,NULL,'general'),(82,'Read Magic',2,NULL,'general'),(83,'Rituals of Protection',1,NULL,'aegis'),(84,'Magic Armor',1,NULL,'aegis'),(85,'Toughness',1,NULL,'aegis'),(86,'Anti-Magic Shield',2,NULL,'aegis'),(87,'Spirit Shield',2,NULL,'aegis'),(88,'Improved Magic Armor',3,NULL,'aegis'),(89,'Sanctuary',3,NULL,'aegis'),(90,'Anti-Magic Aura',4,NULL,'aegis'),(91,'Synchronize',4,NULL,'aegis'),(92,'Aura of Reflection',5,NULL,'aegis'),(93,'Poison Immunity',5,NULL,'aegis'),(94,'Rituals of Battle',1,NULL,'battle'),(95,'Magic Strike',1,NULL,'battle'),(96,'Strength',1,NULL,'battle'),(97,'Mageblade',2,NULL,'battle'),(98,'Magic Swarm',2,NULL,'battle'),(99,'Slaying Swarm',3,NULL,'battle'),(100,'Spellstore',3,NULL,'battle'),(101,'Maelstrom',4,NULL,'battle'),(102,'Ruin',4,NULL,'battle'),(103,'Battle Mastery',5,NULL,'battle'),(104,'Devastation',5,NULL,'battle'),(105,'Rituals of Nature',1,NULL,'nature'),(106,'Grounding',1,NULL,'nature'),(107,'Mend Armor',1,NULL,'nature'),(108,'Dissipate',2,NULL,'nature'),(109,'Natural Repulsion',2,NULL,'nature'),(110,'Elemental Dart',3,NULL,'nature'),(111,'Elemental Weapon',3,NULL,'nature'),(112,'Banish',4,NULL,'nature'),(113,'Nature\'s Command',4,NULL,'nature'),(114,'Ley Lines',5,NULL,'nature'),(115,'Primal Form',5,NULL,'nature'),(116,'Rituals of Necromancy',1,NULL,'necromancy'),(117,'Ghastly Visage',1,NULL,'necromancy'),(118,'Reap Spirit',1,NULL,'necromancy'),(119,'Creeping Rot',2,NULL,'necromancy'),(120,'Repel Undead',2,NULL,'necromancy'),(121,'Brackish Boon',3,NULL,'necromancy'),(122,'Curse',3,NULL,'necromancy'),(123,'Detect Spark',4,NULL,'necromancy'),(124,'Enfeeble',4,NULL,'necromancy'),(125,'Abomination',5,NULL,'necromancy'),(126,'Dreadlord',5,NULL,'necromancy'),(127,'Rituals of Compulsion',1,NULL,'compulsion'),(128,'Disengage',1,NULL,'compulsion'),(129,'Weaken',1,NULL,'compulsion'),(130,'Charm',2,NULL,'compulsion'),(131,'Silence',2,NULL,'compulsion'),(132,'Memory Loss',3,NULL,'compulsion'),(133,'Pin',3,NULL,'compulsion'),(134,'Fear',4,NULL,'compulsion'),(135,'Stun',4,NULL,'compulsion'),(136,'Dominate',5,NULL,'compulsion'),(137,'Mind Blank',5,NULL,'compulsion'),(138,'Rituals of Restoration',1,NULL,'restoration'),(139,'Diagnosis',1,NULL,'restoration'),(140,'Heal Body',1,NULL,'restoration'),(141,'Purify Spirit',2,NULL,'restoration'),(142,'Restore Limbs',2,NULL,'restoration'),(143,'Heal Mortal Wound',3,NULL,'restoration'),(144,'Resilience',3,NULL,'restoration'),(145,'Panacea',4,NULL,'restoration'),(146,'Triage',4,NULL,'restoration'),(147,'Revive',5,NULL,'restoration'),(148,'Second Breath',5,NULL,'restoration'),(149,'Rituals of Enchantment',1,NULL,'enchantment'),(150,'Enhance Armor',1,NULL,'enchantment'),(151,'Magic Lock',1,NULL,'enchantment'),(152,'Enchant Shield ',2,NULL,'enchantment'),(153,'Silvershine',2,NULL,'enchantment'),(154,'Enchant Weapon',3,NULL,'enchantment'),(155,'Spellburst',3,NULL,'enchantment'),(156,'Ablative Armor',4,NULL,'enchantment'),(157,'Dispel Magic',4,NULL,'enchantment'),(158,'Shadowskin',5,NULL,'enchantment'),(159,'Wraithbane',5,NULL,'enchantment'),(160,'Production',2,NULL,'resource'),(161,'Craft',2,NULL,'resource'),(162,'Magic Power',1,NULL,'resource');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-14  4:44:02
