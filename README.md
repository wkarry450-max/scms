📜 SCMS - 证书管理系统（Certificate Management System）

A full-stack certificate management system generated with RadSystems and customized for academic certificate workflow management.

🧩 项目简介

SCMS（Student Certificate Management System）是一套基于低代码平台 RadSystems 构建，并进行二次定制开发的证书管理系统。

系统主要用于：

学生上传证书材料

教师/管理员审核证书

证书分类管理

审批流程控制

角色与权限管理

数据统计与可视化展示

本项目展示了低代码平台在实际业务系统中的应用能力，并结合自定义逻辑实现完整的证书审核流程。

🚀 技术栈
前端

Vue.js

PrimeVue UI

Chart.js（统计图表）

Axios

后端

Node.js

Express.js

Sequelize ORM

MySQL

工具

RadSystems (Low-code Generator)

RESTful API 架构

JWT 登录认证

📌 核心功能模块
🏠 仪表盘（Dashboard）

用户数量统计图

证书审批状态饼图

数据可视化展示

📄 证书管理

新增/编辑/删除证书

文件上传（PDF/图片）

交易哈希记录

区块号记录

时间戳存储

🔍 审批流程

审批状态：待审核 / 已通过 / 已拒绝 / 已撤回

审核记录追踪

审批流程可配置

📰 证书公告管理

发布证书通知

系统公告展示

发布时间与发布者记录

👥 用户与角色管理

用户管理

角色管理

权限分配

RBAC 权限控制模型

🔐 权限控制

接口级权限控制

页面级权限显示

角色绑定权限列表

🗂 项目结构
scms/
│
├── frontend/                # Vue 前端项目
│
├── nodejs-express-api/      # Express 后端 API
│   ├── models/              # Sequelize 数据模型
│   ├── controllers/
│   ├── routes/
│   ├── helpers/
│
├── package.json
└── README.md

⚙️ 本地运行方式
1️⃣ 克隆项目
git clone https://github.com/wkarry450-max/scms.git
cd scms

2️⃣ 配置数据库

创建 MySQL 数据库，例如：

CREATE DATABASE scms;


在 nodejs-express-api 目录中创建 .env 文件：

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=scms
JWT_SECRET=your_secret

3️⃣ 启动后端
cd nodejs-express-api
npm install
npm run start

4️⃣ 启动前端
cd frontend
npm install
npm run serve


访问：

http://localhost:8050

🧠 项目亮点

使用低代码平台快速构建基础架构

基于 RBAC 的权限管理系统

审批流程可配置化设计

数据可视化统计分析

文件上传与业务记录结合

清晰的前后端分离结构

📈 可扩展方向

集成区块链证书存证

IPFS 文件存储

Docker 容器化部署

CI/CD 自动部署

Redis 缓存优化

审批流程可视化设计器

📷 系统截图

<img width="2548" height="1402" alt="image" src="https://github.com/user-attachments/assets/043d7ef5-4287-4ce2-8d96-a6c9d3a58ec6" />
<img width="2548" height="1402" alt="image" src="https://github.com/user-attachments/assets/7a752fb6-bae9-493c-bc81-d0ba943884ad" />
<img width="2548" height="1402" alt="image" src="https://github.com/user-attachments/assets/5cbaa8a6-003a-4f95-ac72-e6a0c95039d5" />
<img width="2548" height="1402" alt="image" src="https://github.com/user-attachments/assets/915d6f2b-620a-4c29-ba74-88ce6eb4cb51" />
<img width="2548" height="1402" alt="image" src="https://github.com/user-attachments/assets/c0cf8f56-6951-4ba2-a8ef-b13c184d8f92" />





📄 License

MIT License

