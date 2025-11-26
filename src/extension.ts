import * as vscode from 'vscode';
import { GitHubUploader } from './github-uploader.js';

export function activate(context: vscode.ExtensionContext) {
    
    // 注册上传图片命令
    const uploadCommand = vscode.commands.registerCommand('github-image-upload.uploadImage', async () => {
        try {
            // 获取配置
            const config = vscode.workspace.getConfiguration('github-image-upload');
            
            // 检查必要配置
            const accessToken = config.get('githubAccessToken');
            const repository = config.get('githubRepository');
            
            if (!accessToken || !repository) {
                vscode.window.showErrorMessage('请先配置GitHub访问令牌和仓库信息');
                return;
            }
            
            const uploader = new GitHubUploader(config);
            
            // 选择图片文件
            const fileUris = await vscode.window.showOpenDialog({
                canSelectMany: false,
                openLabel: '选择图片',
                filters: {
                    'Images': ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'avif']
                }
            });

            if (!fileUris || fileUris.length === 0) {
                return;
            }

            const fileUri = fileUris[0];
            const filePath = fileUri.fsPath;
            
            // 读取文件并上传
            const fs = await import('fs');
            const fileContent = fs.readFileSync(filePath);
            
            const imageUrl = await uploader.upload(fileContent) as string;
            
            // 复制 markdown 格式图片 到剪贴板
            const name = imageUrl.split('/').pop() || 'image';
            await vscode.env.clipboard.writeText(`![${name}](${imageUrl})`);
            vscode.window.showInformationMessage(`图片上传成功! URL已复制到剪贴板: ${imageUrl}`);
            
        } catch (error: any) {
            vscode.window.showErrorMessage(`上传失败: ${error.message}`);
        }
    });

    context.subscriptions.push(uploadCommand);
}

export function deactivate() {
    console.log('GitHub Image Upload extension is now deactivated!');
}
