# 博客系统 (blog-new)

本项目是一个基于前后端分离架构的全栈博客系统，包含前台展示页面、后台管理模板以及 Egg.js 后端服务。

---

## 目录结构与项目职责

本项目的代码库被划分为三个核心子目录：

- **[blog](file:///Users/lizexi/Documents/code/blog-new/blog)** (前台展示)：基于 **Next.js** + React 构建的服务端渲染（SSR）博客前端，主要用于面向读者的博客内容展示，对 SEO 友好。默认运行于 `http://localhost:3000`。
- **[service](file:///Users/lizexi/Documents/code/blog-new/service)** (后端服务)：基于 **Egg.js** + **MySQL** 构建的后端 API 服务，为前后台系统提供数据接口支持。默认运行于 `http://localhost:7001`。
- **[admin](file:///Users/lizexi/Documents/code/blog-new/admin)** (管理后台)：基于 **React** (Create React App) + **Ant Design** 构建的博客后台管理系统（*当前为脚手架初始化的基础模板，可在此基础上开发后台管理业务逻辑*）。默认运行于 `http://localhost:8001`。

---

## 核心技术栈

### 1. 前台展示 ([blog](file:///Users/lizexi/Documents/code/blog-new/blog))
- **核心框架**：Next.js (v9.x) + React (v16.x)
- **UI 组件库**：Ant Design (v3.x)
- **请求库**：Axios
- **Markdown 解析**：Marked + React Markdown
- **代码高亮**：Highlight.js
- **目录生成**：Markdown Navbar

### 2. 后台管理 ([admin](file:///Users/lizexi/Documents/code/blog-new/admin))
- **核心框架**：React (v16.x) (由 `react-scripts` 管理构建)
- **UI 组件库**：Ant Design (v3.x)

### 3. 后端服务 ([service](file:///Users/lizexi/Documents/code/blog-new/service))
- **核心框架**：Egg.js (v2.x)
- **数据库连接**：`egg-mysql` (支持与 MySQL 数据库交互)
- **跨域支持**：`egg-cors`
- **代码规范**：ESLint (集成 `eslint-config-egg`)

---

## 数据库准备与配置

本项目使用 MySQL 存储数据，数据库配置位于 `service/config/config.default.js`。

### 1. 配置数据库连接
请打开 [config.default.js](file:///Users/lizexi/Documents/code/blog-new/service/config/config.default.js#L21-L39) 并根据您的本地环境修改数据库连接参数（用户名、密码、地址等）。默认配置为：
```javascript
config.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456', // 请修改为您的 MySQL 密码
    database: 'react_blog', // 数据库名称
  },
  app: true,
  agent: false,
};
```

### 2. 初始化数据库结构
在 MySQL 中创建名为 `react_blog` 的数据库，并根据代码中的查询逻辑创建以下三张核心表：

#### ① 分类表 `type`
存储文章的分类信息，用于前台导航栏的生成：
```sql
CREATE TABLE `type` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `typeName` varchar(50) NOT NULL COMMENT '分类名称',
  `icon` varchar(50) DEFAULT NULL COMMENT '分类展示的 Antd 图标名称',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### ② 文章表 `article`
存储博客文章的核心内容与属性：
```sql
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
```

#### ③ 管理员用户表 `admin_user`
用于管理后台登录凭证校验：
```sql
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入默认管理员测试数据 (用户名: admin, 密码: 123456)
INSERT INTO `admin_user` (`userName`, `password`) VALUES ('admin', '123456');
```

---

## 本地开发与快速启动

请按以下顺序安装依赖并启动服务：

### 第一步：启动后端服务 ([service](file:///Users/lizexi/Documents/code/blog-new/service))
1. 确保 MySQL 数据库已运行，且配置正确。
2. 进入 `service` 目录安装依赖并启动：
   ```bash
   cd service
   npm install   # 或者 yarn install
   npm run dev   # 开发环境启动在 http://localhost:7001
   ```

### 第二步：启动展示前台 ([blog](file:///Users/lizexi/Documents/code/blog-new/blog))
1. 默认前台通过 `http://127.0.0.1:7001/default/` 请求后端接口（可在 [apiUrl.js](file:///Users/lizexi/Documents/code/blog-new/blog/config/apiUrl.js) 中修改配置）。
2. 进入 `blog` 目录安装依赖并启动：
   ```bash
   cd blog
   npm install   # 或者 yarn install
   npm run dev   # 启动在 http://localhost:3000
   ```

### 第三步：启动后台管理 ([admin](file:///Users/lizexi/Documents/code/blog-new/admin))
1. 进入 `admin` 目录安装依赖并启动：
   ```bash
   cd admin
   npm install   # 或者 yarn install
   npm start     # 开发环境默认启动在 http://localhost:8001
   ```

---

## 生产部署说明

### 服务端部署 ([service](file:///Users/lizexi/Documents/code/blog-new/service))
使用 `egg-scripts` 进行生产环境下的启动与停止：
- 启动服务：`npm start`
- 停止服务：`npm stop`

### 前台部署 ([blog](file:///Users/lizexi/Documents/code/blog-new/blog))
Next.js 项目打包构建：
- 构建项目：`npm run build`
- 生产启动：`npm start`

