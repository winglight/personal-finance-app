# FinTrack：个人财务管理系统（前端）

## FinTrack是什么？
该项目是一个基于React前端和Flask后端（[Personal Finance](https://github.com/winglight/Personal-Finance)）构建的开源个人财务管理系统。它为用户提供了一个全面的工具来跟踪支出、收入和整体财务健康状况（未来）。

## 特别说明

本代码80%来自AI（Claudie）的协助生成，另有文档说明整个过程：[AI助我写代码（9）：个人记账 - FinTrack（前端））](https://www.broyustudio.com/2024/09/06/AI-Help-Personal-Finance.html)


## 主要功能

- 交易记录跟踪
- 支出和收入分类
- 多账户管理
- 统计分析和可视化
- 可自定义的类别和账户
- 适用于桌面和移动设备的响应式设计

## 为什么选择FinTrack？

### 优势

1. **开源**: 完全可定制且免费使用。
2. **注重隐私**: 您的财务数据保存在自己的服务器上。
3. **灵活**: 支持多种货币和账户类型。
4. **洞察力强**: 提供详细的财务统计和可视化。
5. **用户友好**: 直观的界面，便于导航和数据录入。

### 适用场景

- 个人预算和支出跟踪
- 小型企业财务管理
- 财务目标设定和监控
- 自由职业者的收入和支出分析

## 安装指南

### 前提条件

- Node.js (v14或更高版本)
- Python (v3.7或更高版本)
- pip (Python包管理器)

### 前端设置

1. 克隆仓库：
   ```
   git clone https://github.com/winglight/personal-finance-app
   cd personal-finance-app
   ```

2. 安装依赖：
   ```
   npm install
   ```

3. 修改src/api.js中的后端地址：
   ```
   baseURL: 'http://127.0.0.1:5000/'
   ```

### 后端设置

参考后端项目：[Readme](https://github.com/winglight/Personal-Finance)

## 使用指南

1. 在后端项目命令行中，启动后端服务器：
   ```
   python main.py
   ```

2. 在前端项目目录中，启动前端开发服务器：
   ```
   npm start
   ```

3. 打开浏览器并访问 `http://localhost:3000`

4. 在设置页面保存后端config中的用户token。

5. 在设置页面设置支出/收入类别。

6. 点击加号按钮，添加交易记录，并探索统计页面以深入了解您的财务习惯。

## 许可证

本项目采用MIT许可证 - 详情请见 [LICENSE.md](LICENSE.md) 文件。

## 支持

如果您遇到任何问题或有任何疑问，请在我们的GitHub页面上提交issue。

---

祝您使用FinTrack愉快，财务管理更轻松！