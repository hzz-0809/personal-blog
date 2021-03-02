/*
Navicat MySQL Data Transfer

Source Server         : 云服务器mysql
Source Server Version : 50733
Source Host           : 115.29.177.15:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50733
File Encoding         : 65001

Date: 2021-03-02 17:04:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'EvanZhao', 'a1823931512');

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `blog_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 NOT NULL,
  `favor` int(255) DEFAULT NULL,
  `opposition` int(255) DEFAULT NULL,
  `create_time` bigint(255) NOT NULL,
  PRIMARY KEY (`blog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog
-- ----------------------------

-- ----------------------------
-- Table structure for blog_resolution
-- ----------------------------
DROP TABLE IF EXISTS `blog_resolution`;
CREATE TABLE `blog_resolution` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `blog_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `status` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blog_resolution_username` (`username`) USING BTREE,
  KEY `blog_resolution_blog_id` (`blog_id`) USING BTREE,
  CONSTRAINT `blog_resolution_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`blog_id`),
  CONSTRAINT `blog_resolution_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_resolution
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` varchar(255) NOT NULL,
  `blog_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `content` text CHARACTER SET utf8mb4,
  `favor` int(255) DEFAULT NULL,
  `opposition` int(255) DEFAULT NULL,
  `create_time` bigint(255) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_username` (`username`) USING BTREE,
  KEY `comment_blog_id` (`blog_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`blog_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for comment_resolution
-- ----------------------------
DROP TABLE IF EXISTS `comment_resolution`;
CREATE TABLE `comment_resolution` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `status` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_resolution_username` (`username`) USING BTREE,
  KEY `comment_resolution_comment_id` (`comment_id`) USING BTREE,
  CONSTRAINT `comment_resolution_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `comment_resolution_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_resolution
-- ----------------------------

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `email` varchar(255) NOT NULL,
  `email_code` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email
-- ----------------------------

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `blog_id` varchar(255) DEFAULT NULL,
  `tag_name` varchar(255) NOT NULL,
  `tag_type` int(10) NOT NULL,
  KEY `tag_blog_id` (`blog_id`) USING BTREE,
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`blog_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` int(10) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `account_create_time` bigint(255) NOT NULL,
  PRIMARY KEY (`id`,`email`,`username`),
  KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1823931512@qq.com', 'evz_1', 'a1823931512', '1', '随便写写。', '1998-08-08T16:00:00.000Z', 'EvanZhao', null, '1614444460103');
