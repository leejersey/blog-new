-- ------------------------------------------------------
-- 博客系统数据库初始化脚本
-- 默认数据库名称: react_blog
-- ------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `react_blog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `react_blog`;

-- 1. 创建分类表 type
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `typeName` varchar(50) NOT NULL COMMENT '分类名称',
  `icon` varchar(50) DEFAULT NULL COMMENT '分类展示的 Antd 图标名称',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入默认分类数据
INSERT INTO `type` (`Id`, `typeName`, `icon`) VALUES 
(1, '视频教程', 'youtube'),
(2, '技术分享', 'message'),
(3, '生活随笔', 'smile');

-- 2. 创建文章表 article
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `type_id` int(11) NOT NULL COMMENT '所属分类ID',
  `title` varchar(100) NOT NULL COMMENT '文章标题',
  `introduce` text COMMENT '文章简介',
  `article_content` text COMMENT '文章详细内容',
  `addTime` int(11) NOT NULL COMMENT '文章发布时间 (Unix时间戳)',
  `view_count` int(11) DEFAULT '0' COMMENT '浏览次数',
  PRIMARY KEY (`id`),
  KEY `fk_type` (`type_id`),
  CONSTRAINT `fk_type` FOREIGN KEY (`type_id`) REFERENCES `type` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入一篇测试文章
INSERT INTO `article` (`id`, `type_id`, `title`, `introduce`, `article_content`, `addTime`, `view_count`) VALUES 
(1, 2, '欢迎使用全栈博客系统', '这是一篇自动生成的测试博客简介。', '# 欢迎使用全栈博客系统\n\n您已经成功部署并拉起了项目！这里是 Markdown 内容的测试。', 1799999999, 10);

-- 3. 创建管理员表 admin_user
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入默认管理员账号密码
INSERT INTO `admin_user` (`Id`, `userName`, `password`) VALUES 
(1, 'admin', '123456');
