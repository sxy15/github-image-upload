export interface Uploader {
    upload(asset: Buffer): Promise<String>;
}
