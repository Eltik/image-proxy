"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ImageProxy {
    getImage = async (url, options) => {
        const response = await axios_1.default.get(url, {
            responseType: "arraybuffer",
            ...options,
        });
        return response.data;
    };
    setHeaders(reply) {
        reply.setHeader("Content-Type", "image/jpeg");
        reply.setHeader("Cache-Control", "public, max-age=31536000");
        reply.setHeader("Access-Control-Allow-Origin", "*");
        reply.setHeader("Access-Control-Allow-Methods", "GET");
        reply.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        reply.setHeader("Access-Control-Allow-Credentials", "true");
    }
    async proxyImage(request, reply) {
        const { url } = request.query;
        const { headers } = request.query;
        if (!url || !headers) {
            reply.status(400).send("No URL provided");
            return;
        }
        this.setHeaders(reply);
        try {
            const imageBuffer = await this.getImage(url, { headers: JSON.parse(headers) });
            reply.send(imageBuffer);
        }
        catch (error) {
            reply.status(500).send("Error fetching image");
        }
    }
}
exports.default = ImageProxy;
