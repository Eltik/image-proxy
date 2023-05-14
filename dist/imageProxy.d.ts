declare class ImageProxy {
    private getImage;
    private setHeaders;
    proxyImage(request: any, reply: any): Promise<void>;
}
export default ImageProxy;
