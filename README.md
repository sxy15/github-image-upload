# GitHub Image Upload - VSCode Extension

一个简单易用的VSCode扩展，可以将图片上传到GitHub仓库并自动生成Markdown格式的图片链接。

## 功能特性

- 📸 **一键上传图片** - 选择本地图片文件，自动上传到GitHub仓库
- 🔗 **自动生成链接** - 上传成功后自动复制Markdown格式的图片链接到剪贴板
- ⚙️ **灵活配置** - 可配置GitHub仓库、文件夹路径等参数
- 🚀 **快速集成** - 专为Markdown文档编写优化

## 安装方法

### 从VSIX文件安装
1. 下载最新的 `.vsix` 文件
2. 在VSCode中打开命令面板 (`Ctrl+Shift+P` 或 `Cmd+Shift+P`)
3. 输入 "Extensions: Install from VSIX"
4. 选择下载的VSIX文件进行安装

### 从源码构建
```bash
# 克隆仓库
git clone https://github.com/suxinyi/github-image-upload.git
cd github-image-upload

# 安装依赖
pnpm install

# 编译项目
pnpm run compile

# 打包扩展
pnpm run package
```

## 使用方法

### 1. 配置GitHub参数

在使用扩展前，需要先配置GitHub相关参数：

1. 打开VSCode设置 (`Ctrl+,` 或 `Cmd+,`)
2. 搜索 "GitHub Image Upload"
3. 配置以下参数：
   - **GitHub Access Token**: 您的GitHub个人访问令牌
   - **GitHub Repository**: 目标仓库（格式：owner/repository）
   - **GitHub Asset Folder**: 图片存储文件夹（可选）
   - **GitHub User Name**: 提交者名称（可选）
   - **GitHub User Email**: 提交者邮箱（可选）

### 2. 上传图片

1. 打开命令面板 (`Ctrl+Shift+P` 或 `Cmd+Shift+P`)
2. 输入 "Upload Image to GitHub"
3. 选择要上传的图片文件
4. 上传成功后，Markdown格式的图片链接会自动复制到剪贴板
5. 在Markdown文档中粘贴即可使用

## 配置说明

### 必需配置
- **githubAccessToken**: GitHub个人访问令牌（需要 `repo` 权限）
- **githubRepository**: 目标GitHub仓库（格式：用户名/仓库名）

### 可选配置
- **githubAssetFolder**: 图片存储的文件夹路径（默认：根目录）
- **githubUserName**: 提交者名称（默认：空）
- **githubUserEmail**: 提交者邮箱（默认：空）

