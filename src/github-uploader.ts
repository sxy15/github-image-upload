import * as vscode from 'vscode'
import { guid, getTimeString } from './utils.js'
import { Octokit } from 'octokit'
import { Uploader } from './type.js'

export class GitHubUploader implements Uploader {

    private name: string
    private email: string
    private accessToken: string
    private owner: string
    private repository: string
    private folder: string

    constructor(config: vscode.WorkspaceConfiguration) {
        const fullRepository: string = config.get('githubRepository') || ''
        const [owner, repository] = fullRepository.split('/')
        this.accessToken = config.get('githubAccessToken') || ''
        this.owner = owner
        this.repository = repository
        this.folder = config.get('githubAssetFolder') || 'assets'
        this.name = config.get('githubUserName') || ''
        this.email = config.get('githubUserEmail') || ''
    }
    
    async upload(asset: Buffer): Promise<String> {
        const fileName = `${this.folder}/${guid()}.png`
        const content = asset.toString('base64')

        const octokit = new Octokit({
            auth: this.accessToken
        })

        const res = await octokit.request(`PUT /repos/${this.owner}/${this.repository}/contents/${fileName}`, {
            owner: this.owner,
            repo: this.repository,
            path: fileName,
            message: `Upload ${fileName} at ${getTimeString()}`,
            committer: {
                name: this.name,
                email: this.email
            },
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            },
            content
        })

        if(res.status === 201) {
            return res.data.content.download_url
        }
        
        throw new Error(`Upload ${fileName} failed, status: ${res.status}`)
    }
}
