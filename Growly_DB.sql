CREATE DATABASE  IF NOT EXISTS `growly` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `growly`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: growly
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `actualizaciones_proyecto`
--

DROP TABLE IF EXISTS `actualizaciones_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actualizaciones_proyecto` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_proyecto` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actualizaciones_proyecto`
--

LOCK TABLES `actualizaciones_proyecto` WRITE;
/*!40000 ALTER TABLE `actualizaciones_proyecto` DISABLE KEYS */;
INSERT INTO `actualizaciones_proyecto` VALUES (1,'Pruebas piloto exitosas','Las pruebas piloto han mostrado una reducción promedio del 35% en el consumo energético. Los usuarios reportan alta satisfacción con la interfaz y funcionalidades.','2025-06-03 17:04:24',1),(2,'Nuevas funcionalidades en desarrolloNuevas funcionalidades en desarrollo','Estamos trabajando en la integración con paneles solares y sistemas de almacenamiento de energía. Esto permitirá una gestión aún más eficiente de la energía renovable.','2025-06-03 17:04:24',1),(3,'¡Alcanzamos el 75% de financiación!','Estamos emocionados de anunciar que hemos superado las tres cuartas partes de nuestro objetivo. Gracias a todos nuestros inversores por confiar en nuestro proyecto.','2025-06-03 17:04:24',1),(4,'Prueba','Prueba Desc','2025-06-03 17:16:14',1),(5,'? Nuevas funcionalidades en desarrollo','Las pruebas internas muestran una mejora del 40% en la eficiencia energética. Esperamos lanzar esta característica en la versión beta del próximo mes.','2025-06-03 21:11:33',3),(6,'? Nuevas funcionalidades en desarrollo','Nuestro equipo de desarrollo ha completado la integración con paneles solares y sistemas de almacenamiento de energía. Esta nueva funcionalidad permitirá a nuestros usuarios gestionar no solo el consumo, sino también la generación y almacenamiento de energía renovable. Las pruebas internas muestran una mejora del 40% en la eficiencia energética. Esperamos lanzar esta característica en la versión beta del próximo mes.','2025-06-03 21:13:38',13),(7,'Avances en la puesta en piloto de la aplicacion','Hemos conseguido nuevos proveedores en la empresa sfsdjfkosdjfkñsd','2025-06-08 18:30:10',1);
/*!40000 ALTER TABLE `actualizaciones_proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educacion`
--

DROP TABLE IF EXISTS `educacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombre_institucion` varchar(100) NOT NULL,
  `url_logo_institucion` varchar(255) DEFAULT NULL,
  `grado` varchar(100) NOT NULL,
  `campo_estudio` varchar(100) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descripcion` text,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_educacion_usuario` (`usuario_id`),
  CONSTRAINT `educacion_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educacion`
--

LOCK TABLES `educacion` WRITE;
/*!40000 ALTER TABLE `educacion` DISABLE KEYS */;
INSERT INTO `educacion` VALUES (6,27,'Universidad de Madrid',NULL,'Grado en Ingeniería Informática 2.0','Ingeniería Informática','2015-08-31','2019-06-29','Enfoque en desarrollo de software, algoritmos y bases de datos.',NULL,'2025-05-13 18:46:00'),(11,44,'Universidad de Madrid',NULL,'Grado en Ingeniería Informática ',NULL,'2020-09-09','2025-09-05','',NULL,NULL),(13,45,'Universidad de Salamanca',NULL,'Ingeniería Informática',NULL,'2008-09-04','2012-09-10','',NULL,'2025-06-11 18:08:01'),(14,46,'Universidad Politécnica De Valencia',NULL,'Ingeniería Industrial',NULL,'2020-09-09','2025-07-06','',NULL,NULL);
/*!40000 ALTER TABLE `educacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo_fundador`
--

DROP TABLE IF EXISTS `equipo_fundador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipo_fundador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proyecto_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo_fundador`
--

LOCK TABLES `equipo_fundador` WRITE;
/*!40000 ALTER TABLE `equipo_fundador` DISABLE KEYS */;
INSERT INTO `equipo_fundador` VALUES (1,1,'Ana Martínez','CEO & Fundadora','15 años en energías renovables'),(2,1,'Carlos López','CTO & Co-fundador','Experto en IoT y Machine Learning'),(3,1,'Laura García','CFO','MBA en Finanzas, ex-Goldman Sachs'),(6,1,'Ana Muñozz','CTO Growly','Hace cosas'),(7,1,'Ana Maria Gonzalez Muñoz','CTO Growxly','Hace muchas cosas'),(8,1,'Farouk','Lider en tech','Experto en ventas tecnológicas'),(9,6,'Juan Manuel González','CEO','Jefe de departamento de salud'),(10,9,'Ugo Fontis','CEO de CryptoSecure','Experto en el mundo crypto'),(11,8,'Juan Carlos Ruiz','CEO de RenewEnergy','Experto en energias renovables'),(12,7,'Ana María Zugari','CEO de EdTech','Graduado en magisterio'),(13,5,'Omar Errandi','CEO de SmartCity','Experto en ciudades inteligentes'),(14,4,'Pablo Berlanga','CEO de EcoPackaging','Experto en embalajes de cartón'),(15,3,'Guillermo Díaz','CEO FinTech Pro','Líder en tecnología');
/*!40000 ALTER TABLE `equipo_fundador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencias_laborales`
--

DROP TABLE IF EXISTS `experiencias_laborales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencias_laborales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombre_empresa` varchar(100) NOT NULL,
  `url_logo_empresa` varchar(255) DEFAULT NULL,
  `puesto` varchar(100) NOT NULL,
  `tipo_empleo` varchar(50) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `en_curso` tinyint(1) DEFAULT '0',
  `ubicacion` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_experiencias_usuario` (`usuario_id`),
  CONSTRAINT `experiencias_laborales_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencias_laborales`
--

LOCK TABLES `experiencias_laborales` WRITE;
/*!40000 ALTER TABLE `experiencias_laborales` DISABLE KEYS */;
INSERT INTO `experiencias_laborales` VALUES (5,27,'Open AISS',NULL,'Ingeniero del GPT 2.0','jornada_completa','2025-05-10',NULL,1,'Madrid, España','Lideré el desarrollo de nuevas funcionalidades en la plataforma principal, coordinando un equipo de 4 ingenieros.',NULL,'2025-06-17 01:28:53'),(6,27,'Growly 2.0',NULL,'Ingeniero del GPT4o Adfil','media_jornada','2024-11-04',NULL,1,'Málaga, España','CEO de Growly.',NULL,'2025-05-11 21:13:09'),(12,44,'Open AI',NULL,'Ingeniero del GPT 2.0','autonomo','2023-01-03',NULL,1,'Madrid, España','Ingeniero de prompts',NULL,NULL),(13,45,'Revolut',NULL,'Backend Engineer','jornada_completa','2016-06-10',NULL,1,'Málaga, España','Experto en tecnologías backend SpringBoot y NodeJS.',NULL,'2025-06-11 18:04:37'),(14,46,'Capgemini',NULL,'Engineer','jornada_completa','2022-05-03',NULL,1,'Barcelona, España','Trabajo con grandes datos, para realizar informes de alto valor para la toma de decisiones de la empresa',NULL,'2025-06-12 19:43:16');
/*!40000 ALTER TABLE `experiencias_laborales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower` int NOT NULL,
  `following` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (17,44,40),(18,44,27),(19,45,44),(20,45,41),(21,45,40),(22,45,27),(23,46,45),(24,46,44),(25,46,40),(29,27,40),(33,41,44),(61,47,44),(63,27,45),(65,27,44),(66,27,41),(67,47,27);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilidades`
--

DROP TABLE IF EXISTS `habilidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades`
--

LOCK TABLES `habilidades` WRITE;
/*!40000 ALTER TABLE `habilidades` DISABLE KEYS */;
INSERT INTO `habilidades` VALUES (3,'Node JS',27),(6,'Experto en Boomboklat',27),(8,'asd',28),(9,'TTTT',28),(10,'asdasd',27),(11,'Saudi PRO',27),(12,'React',44),(19,'Node JSA',44),(25,'NodeJS',45),(26,'Java SpringBoot',45),(27,'Private Equity',45),(28,'Experto en ventas',46),(29,'My SQL',46);
/*!40000 ALTER TABLE `habilidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inversiones`
--

DROP TABLE IF EXISTS `inversiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inversiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_proyecto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_usuario_proyecto` (`id_usuario`,`id_proyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inversiones`
--

LOCK TABLES `inversiones` WRITE;
/*!40000 ALTER TABLE `inversiones` DISABLE KEYS */;
INSERT INTO `inversiones` VALUES (20,39,1),(32,39,2),(33,39,3),(34,39,5),(19,40,1),(38,41,1),(36,41,2),(41,41,9),(37,41,11),(43,44,1),(44,44,2),(46,44,4),(45,44,6),(42,44,9);
/*!40000 ALTER TABLE `inversiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentor`
--

DROP TABLE IF EXISTS `mentor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentor` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `especializacion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor`
--

LOCK TABLES `mentor` WRITE;
/*!40000 ALTER TABLE `mentor` DISABLE KEYS */;
INSERT INTO `mentor` VALUES (4,44,'E-commerce','5 años de experiencia en e-commerce creando marcas con más de 5 millones en facturación.'),(5,27,'Inteligencia Artificial','Creador de herramientas de éxito como QuickTok y Escribelo AI.');
/*!40000 ALTER TABLE `mentor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,27,44,'Hola tio','2025-06-09 17:42:40'),(2,44,27,'Hola hermano','2025-06-09 17:42:53'),(3,27,44,'Prueba de post','2025-06-09 19:14:04'),(4,27,44,'Prueba en front','2025-06-09 19:16:57'),(5,27,44,'adasd','2025-06-09 19:17:06'),(6,27,44,'ads','2025-06-09 19:17:31'),(7,27,44,'aaaa','2025-06-09 19:17:39'),(8,27,44,'aaa','2025-06-09 19:17:53'),(9,44,27,'Que pasa bro','2025-06-09 19:18:27'),(10,44,27,'ae','2025-06-09 19:18:39'),(11,27,44,'Holis','2025-06-10 11:12:05'),(12,27,41,'Hola','2025-06-10 22:02:36'),(13,45,44,'Buenas Farouko, me comentan que usted es mentor experto en ventas. Estaría interesado en adquirir una mentoría suya. Muchas gracias','2025-06-11 19:59:02'),(14,46,44,'Hola Farouk, estaría interesado en una mentoría sobre E-Commerce','2025-06-12 21:48:52'),(15,47,44,'Buenas tardes Farouk','2025-06-16 01:20:29'),(16,47,44,'Qué tal está?','2025-06-16 01:20:37'),(17,27,41,'Holaaa','2025-06-16 21:47:37'),(18,27,46,'Hola Adil','2025-06-17 02:46:57'),(19,47,27,'Hola Omar','2025-06-17 02:48:11');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `autor` int DEFAULT NULL,
  `contenido` text NOT NULL,
  `fecha_publicacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `imagen` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT '0',
  `comentarios` int DEFAULT '0',
  `compartidos` int DEFAULT '0',
  `etiquetas` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `visibilidad` enum('público','privado','amigos') DEFAULT 'público',
  `hashtags` varchar(255) DEFAULT NULL,
  `localizacion` varchar(255) DEFAULT NULL,
  `archivo_adjunto` varchar(255) DEFAULT NULL,
  `estado` enum('activo','inactivo','eliminado') DEFAULT 'activo',
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_publicaciones_usuario` (`autor`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (23,27,'Publi Omar','2025-05-22 22:38:24',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-05-22 20:38:24'),(24,27,'Hoola Farouk','2025-05-23 18:20:40',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-05-23 16:20:39'),(25,27,'Holaalaaaaaa','2025-05-25 00:02:10',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-05-24 22:02:10'),(26,27,'Khfjdshkf','2025-05-27 23:00:35',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-05-27 21:00:34'),(27,27,'Reload?','2025-05-28 10:21:44',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-05-28 08:21:44'),(28,27,'VAMOIS','2025-05-28 14:44:45',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-05-28 12:44:45'),(29,39,'asas','2025-05-29 19:19:04',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-05-29 17:19:03'),(30,41,'SOY iLIAS Y HAgo un post','2025-06-07 11:15:38',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-07 09:15:38'),(31,41,'ahora otro post de ilias\n','2025-06-07 11:15:47',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-07 09:15:46'),(32,41,'dad','2025-06-08 03:35:10',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-08 01:35:09'),(33,41,'aas','2025-06-08 03:42:59',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-08 01:42:59'),(34,44,'Hola buenas tardes','2025-06-08 18:24:54',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-08 16:24:53'),(35,44,'HOLAAA','2025-06-08 18:43:58',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-08 16:43:57'),(36,44,'Prueba','2025-06-08 18:54:08',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-08 16:54:08'),(37,44,'fdsfsdfds','2025-06-08 19:56:22',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-08 17:56:22'),(38,27,'Hola','2025-06-09 16:00:44',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-09 14:00:43'),(39,27,'dsds','2025-06-09 16:07:57',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-09 14:07:57'),(40,27,'Hola','2025-06-09 16:08:08',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-09 14:08:08'),(41,27,'sdfads','2025-06-09 16:10:48',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-09 14:10:47'),(42,45,'Buenas, soy Tarek Errandi. Inversor en private equity con mas de 5 años de experiencia','2025-06-11 19:39:46',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-11 17:39:46'),(43,45,'Ilusionado de formar parte de esta aplicación y poder buscar nuevas inversiones','2025-06-11 19:58:09',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-11 17:58:09'),(44,46,'Agradecido de formar parte de esta maravillosa aplicación','2025-06-12 21:44:17',NULL,0,0,0,NULL,NULL,'público',NULL,'Málaga',NULL,'activo','2025-06-12 19:44:16');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problema`
--

DROP TABLE IF EXISTS `problema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `problema` varchar(500) DEFAULT NULL,
  `id_proyecto` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problema`
--

LOCK TABLES `problema` WRITE;
/*!40000 ALTER TABLE `problema` DISABLE KEYS */;
INSERT INTO `problema` VALUES (1,'Alto consumo energético en hogares y empresas',1),(2,'Falta de visibilidad sobre el uso de energía',1),(3,'Dificultad para identificar oportunidades de ahorro',1),(4,'Desc desc desc problema',1),(5,'Desperdicio de alimentos en restaurantes y supermercados',1),(6,'Falta de acceso a financiamiento para pequeños emprendedores',6),(7,'Inconsistencia crypto',13),(8,'Investigación de nuevos tratamientos basados en biotecnología para enfermedades crónicas.',6),(9,'Dificultad para encontrar tratamientos',6),(10,'Falta de acceso a financiamiento para pequeños emprendedores',9),(11,'Falta de acceso a financiamiento en energías renovables',8),(12,'Desperdicio de alimentos en restaurantes y supermercados',7),(13,'Alta delincuencia',5),(14,'Falta de embalajes ',4),(15,'Falta de acceso a financiamiento en proyectos IA',3);
/*!40000 ALTER TABLE `problema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `descripcion` text NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `imagen_url` text,
  `es_destacado` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `meta_financiacion` decimal(12,2) NOT NULL,
  `recaudado` decimal(12,2) NOT NULL DEFAULT '0.00',
  `inversores` int NOT NULL DEFAULT '0',
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_usuario` int DEFAULT NULL,
  `sitio_web` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `sobre_proyecto` varchar(10000) DEFAULT NULL,
  `inversion_minima` int DEFAULT NULL,
  `retorno_minimo` int DEFAULT NULL,
  `retorno_maximo` int DEFAULT NULL,
  `plazo_de` int DEFAULT NULL,
  `plazo_hasta` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `chk_financiacion` CHECK ((`recaudado` <= `meta_financiacion`))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Construcción de Parque Infantil','Proyecto para crear un parque infantil en el barrio con zona de juegos y áreas verdes.','Comunitario','https://barcelona.impacthub.net/wp-content/uploads/2024/06/Dia-internacional-del-medioambiente.png',1,'2025-06-01','2025-12-01',50000.00,15000.00,26,'2025-05-24 14:47:35','2025-06-08 16:29:30',27,'www.ecotech-solutions.com','info@ecotech-solutions.com','+34 123 456 789','Madrid, España','EcoTech Solutions es una plataforma revolucionaria de gestión energética que utiliza inteligencia artificial y IoT para optimizar el consumo de energía en hogares y empresas. Nuestro sistema aprende de los patrones de uso y automatiza el control de dispositivos para reducir el consumo hasta en un 40%.',100,15,20,3,5),(2,'AgroSmart','Sistema de agricultura inteligente para optimizar cultivos y reducir el uso de recursos.','Alimentación','https://www.airtecnics.com/media/webstructure/news/parque-eolico.jpg',1,'2025-05-24','2025-06-11',60000.00,35000.00,64,'2025-05-24 15:40:05','2025-06-17 17:05:13',27,NULL,NULL,NULL,NULL,'Sistema de agricultura inteligente para optimizar cultivos y reducir el uso de recursos.',100,15,20,3,5),(3,'FinTech Pro','Plataforma de gestión financiera personal con IA para optimizar ahorros e inversiones.','Finanzas','https://globalenergy.mx/wp-content/uploads/2019/02/Siemens-turbine_H-class-1024x685.jpg',1,'2025-05-24','2025-05-29',100000.00,85000.00,142,'2025-05-24 15:40:05','2025-06-17 17:05:13',27,NULL,NULL,NULL,NULL,'Plataforma de gestión financiera personal con IA para optimizar ahorros e inversiones.',100,10,20,3,5),(4,'EcoPackaging','Embalajes biodegradables a partir de residuos agrícolas para reducir el impacto ambiental.','Sostenibilidad','https://packhelp-landing-assets.s3.eu-central-1.amazonaws.com/wp-content/uploads/2022/08/18114916/homepage-hero-main.png',0,'2025-05-24','2025-06-18',50000.00,28000.00,53,'2025-05-24 15:40:05','2025-06-17 17:05:13',27,NULL,NULL,NULL,NULL,'Embalajes biodegradables a partir de residuos agrícolas para reducir el impacto ambiental.',100,15,20,3,5),(5,'SmartCity Solutions','Sensores inteligentes para optimizar el tráfico y reducir la contaminación en entornos urbanos.','Tecnología','https://concepto.de/wp-content/uploads/2014/08/tecnologia-e1551386720574-800x412.jpg',0,'2025-05-24','2025-06-23',120000.00,65000.00,98,'2025-05-24 15:40:05','2025-06-17 17:05:13',27,NULL,NULL,NULL,NULL,'Sensores inteligentes para optimizar el tráfico y reducir la contaminación en entornos urbanos.',100,15,25,3,5),(6,'BioTech Research','Investigación de nuevos tratamientos basados en biotecnología para enfermedades crónicas.','Salud','https://www.noticiasensalud.com/wp-content/uploads/2021/04/Medios-actuales-para-cuidar-de-la-salud-bienestar-fisico-y-mental.jpg',0,'2025-05-24','2025-06-05',200000.00,150000.00,187,'2025-05-24 15:40:05','2025-06-17 17:05:13',46,NULL,NULL,NULL,NULL,'Investigación de nuevos tratamientos basados en biotecnología para enfermedades crónicas.',100,10,25,3,5),(7,'EdTech Academy','Plataforma de aprendizaje adaptativo que personaliza la educación según las necesidades de cada estudiante.','Educación','https://te-feccoo.es/wp-content/uploads/2020/01/derechoeducacion.jpg',1,'2025-05-24','2025-06-13',70000.00,42000.00,76,'2025-05-24 15:40:05','2025-06-17 17:05:13',46,NULL,NULL,NULL,NULL,'Plataforma de aprendizaje adaptativo que personaliza la educación según las necesidades de cada estudiante.',100,15,20,3,5),(8,'RenewEnergy','Soluciones de energía renovable para comunidades rurales sin acceso a la red eléctrica.','Sostenibilidad','https://www.officemadrid.es//wp-content/uploads/elementor/thumbs/sostenibilidad-empresarial-scaled-pw5e2k9slszvs5vc6sd9mrdbr9b1u6gk9a7upszo20.jpg',0,'2025-05-24','2025-06-08',90000.00,55000.00,92,'2025-05-24 15:40:05','2025-06-17 17:05:13',46,NULL,NULL,NULL,NULL,'Soluciones de energía renovable para comunidades rurales sin acceso a la red eléctrica.',100,10,20,3,5),(9,'CryptoSecure','Plataforma de seguridad para activos digitales con tecnología blockchain avanzada.','Finanzas','https://a.c-dn.net/c/content/dam/publicsites/sgx/images/Email/Trading_Cryptocurrencies_Effectively_Using_PriceAction.jpg/jcr:content/renditions/original-size.webp',0,'2025-05-24','2025-06-01',120000.00,95000.00,156,'2025-05-24 15:40:05','2025-06-17 17:04:14',46,NULL,NULL,NULL,NULL,'Plataforma de seguridad para activos digitales con tecnología blockchain avanzada.',100,10,20,3,5);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap_proyecto`
--

DROP TABLE IF EXISTS `roadmap_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap_proyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Fecha` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Titulo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_proyecto` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_proyecto`
--

LOCK TABLES `roadmap_proyecto` WRITE;
/*!40000 ALTER TABLE `roadmap_proyecto` DISABLE KEYS */;
INSERT INTO `roadmap_proyecto` VALUES (1,'Q1 2024',' Desarrollo del MVP','Desarrollo de la plataforma base y sensores',1),(2,'Q2 2024','Pruebas Piloto','Testing con 50 hogares y 10 empresas',1),(3,'Q3 2024','Lanzamiento Comercial','Lanzamiento en el mercado español',1),(4,'Q4 2024','Expansión','Expansión a Portugal y Francia',1),(6,'Q1-2025','Lanzamiento en mercado americano','Desarrollo de la versión mínima viable de la plataforma con funcionalidades básicas: registro de usuarios, sistema de búsqueda y panel de control. Incluye pruebas con 50 usuarios beta para validar la usabilidad y recopilar feedback inicial.',1),(8,'Q1 2026',' Lanzamiento Comercial','Lanzamiento oficial de la plataforma al mercado español con campaña de marketing digital. Implementación del sistema de pagos y modelo de suscripción premium. ',6),(9,'Q1 2024',' Desarrollo del MVP','Desarrollo de la versión mínima viable de la plataforma con funcionalidades básicas: registro de usuarios, sistema de búsqueda y panel de control. Incluye pruebas con 50 usuarios beta para validar la usabilidad y recopilar feedback inicial.',9);
/*!40000 ALTER TABLE `roadmap_proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(3,'EMPRENDEDOR'),(2,'INVERSOR');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solucion`
--

DROP TABLE IF EXISTS `solucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solucion` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `solucion` varchar(255) NOT NULL,
  `id_proyecto` int unsigned NOT NULL,
  `solucion_desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solucion`
--

LOCK TABLES `solucion` WRITE;
/*!40000 ALTER TABLE `solucion` DISABLE KEYS */;
INSERT INTO `solucion` VALUES (1,'Monitoreo en tiempo real',1,'Seguimiento continuo del consumo energético con alertas automáticas'),(2,'Automatización inteligente',1,'Control automático de dispositivos basado en patrones de uso'),(3,'Análisis predictivo',1,'Predicción de consumo y recomendaciones de optimización'),(4,'Interfaz intuitiva',1,'Dashboard fácil de usar para todos los niveles técnicos'),(6,'Plataforma de microcréditos P2P para pequeños emprendedores',1,'Nuestra plataforma conecta directamente a inversores con pequeños emprendedores, eliminando intermediarios y reduciendo costos. Utilizamos un algoritmo de evaluación de riesgo basado en IA que analiza múltiples factores más allá del historial crediticio tradicional'),(7,'Fabricación de antídotos y medicamentos',6,'Se desarrollan estudios para fabricar nuevos medicamentos'),(8,'Monitoreo en tiempo real',8,'Seguimiento continuo del consumo energético con alertas automáticas'),(9,'Automatización inteligente',7,'Control automático de dispositivos basado en patrones de uso'),(10,'Monitoreo en tiempo real',5,'Seguimiento continuo de los ciudadanos'),(11,'Creación de embalajes sostenibles',4,'Fabricamos embalajes usando material reciclado'),(12,'Plataforma de gestión financiera',3,'Gracias a herramientas como la IA , desarrollamos una plataforma de gestión financiera para los empleados');
/*!40000 ALTER TABLE `solucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `titulo_profesional` varchar(100) DEFAULT NULL,
  `acerca_de` text,
  `url_imagen_perfil` varchar(255) DEFAULT NULL,
  `url_imagen_cabecera` varchar(255) DEFAULT NULL,
  `ciudad` varchar(50) DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `sitio_web` varchar(100) DEFAULT NULL,
  `configuracion_privacidad` enum('todos','solo_amigos','privado') DEFAULT 'todos',
  `contador_conexiones` int DEFAULT '0',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `experiencia_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `isMentor` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (27,'Omar','Errandi','o@m.es','2002-06-12','$2b$10$Rb4iAgmmV.LIqqUSAK8zYO5bsGXhR9n21jZXfFP9O5JrSdKRdVuKC','Ingeniero de Software','Ingeniero con mucha ambición de crear proyectos nuevos',NULL,NULL,'Madrid','España','+34 612 345 678','https://miweb.comm',NULL,NULL,'2025-06-17 01:44:35','2025-06-17 01:44:35',NULL,3,1),(40,'Omar','Errandox','errandommsss@mail.com','2002-06-25','$2b$10$xGiHmfNoYFBUqmOon5XVT.t.UQ5IxXdtNf2AZ8l3xMKgbSQw/RK26','Emprendedor',NULL,'https://github.com/shadcn.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-08 21:38:07',NULL,3,0),(41,'Ilias','Afailal','afailal@gmail.com','2002-06-25','$2b$10$C40TmwDjM/zQqznv.o6P5eQ7QdnsmqCvMCDiLVrAJB3sWbIlxVhby','Inversor',NULL,NULL,NULL,'Sevilla','España','655123123',NULL,NULL,NULL,'2025-06-15 21:51:13','2025-06-15 21:51:13',NULL,2,0),(44,'Farouko','Chajri','farouk@gmail.com','2002-05-12','$2b$10$UftkIr6FeDODU3vKadAZv.HDcPtn4o4q8OcqCCRc3gLFilXawnLAm','Inversor','Experto en backend en javascript',NULL,NULL,'Madrid','España',NULL,NULL,NULL,NULL,'2025-06-08 18:03:39','2025-06-08 21:17:35',NULL,2,1),(45,'Tarek','Errandi','tarek@gmail.com','1961-05-26','$2b$10$lBh5lSK8ib/HBiWUWKDvguidzTJxu1bNbiEKyO5Ofhc7H0sHhVg6W','Inversor','Inversor con mas de 5 años de experiencia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-11 18:03:42',NULL,2,0),(46,'Adil','Essaoudi','adil@gmail.comm','2002-11-24','$2b$10$wJ/epgoXqMrR0DAK37CQCOrMR7rC6NJKeI20k6nyDjcU8bv6R9hG.','Emprendedor','Un humilde chaval que emprende por pasión.',NULL,NULL,'Barcelona','España','+45 643 234 543','https://adil.com',NULL,NULL,'2025-06-12 19:41:37','2025-06-12 19:41:54',NULL,3,0),(47,'Juan','Martínez','juan@gmail.com','2001-01-09','$2b$10$7V.ogAoS6mK806IDLYnr4u7ywYwXRXsHtCWsLqzYDzLZaJ.TAejFW','Inversor',NULL,NULL,NULL,'Valencia','España',NULL,NULL,NULL,NULL,'2025-06-15 23:23:27','2025-06-15 23:23:27',NULL,2,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_proyectos`
--

DROP TABLE IF EXISTS `vw_proyectos`;
/*!50001 DROP VIEW IF EXISTS `vw_proyectos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_proyectos` AS SELECT 
 1 AS `id`,
 1 AS `titulo`,
 1 AS `descripcion`,
 1 AS `categoria`,
 1 AS `imagen_url`,
 1 AS `es_destacado`,
 1 AS `fecha_inicio`,
 1 AS `fecha_fin`,
 1 AS `meta_financiacion`,
 1 AS `recaudado`,
 1 AS `inversores`,
 1 AS `creado_en`,
 1 AS `actualizado_en`,
 1 AS `dias_restantes`,
 1 AS `porcentaje_avance`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'growly'
--

--
-- Dumping routines for database 'growly'
--

--
-- Final view structure for view `vw_proyectos`
--

/*!50001 DROP VIEW IF EXISTS `vw_proyectos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_proyectos` AS select `p`.`id` AS `id`,`p`.`titulo` AS `titulo`,`p`.`descripcion` AS `descripcion`,`p`.`categoria` AS `categoria`,`p`.`imagen_url` AS `imagen_url`,`p`.`es_destacado` AS `es_destacado`,`p`.`fecha_inicio` AS `fecha_inicio`,`p`.`fecha_fin` AS `fecha_fin`,`p`.`meta_financiacion` AS `meta_financiacion`,`p`.`recaudado` AS `recaudado`,`p`.`inversores` AS `inversores`,`p`.`creado_en` AS `creado_en`,`p`.`actualizado_en` AS `actualizado_en`,greatest((to_days(`p`.`fecha_fin`) - to_days(curdate())),0) AS `dias_restantes`,(case when (`p`.`meta_financiacion` > 0) then least(((`p`.`recaudado` / `p`.`meta_financiacion`) * 100),100) else 0 end) AS `porcentaje_avance` from `proyectos` `p` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 19:28:19
