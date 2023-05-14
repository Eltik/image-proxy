import axios from "axios";

class ImageProxy {
    private getImage = async (url: string, options: any): Promise<Buffer> => {
        const response = await axios.get(url, {
            responseType: "arraybuffer",
            ...options,
        });

        return response.data;
    };

    private setHeaders(reply) {
        reply.setHeader("Content-Type", "image/jpeg");
        reply.setHeader("Cache-Control", "public, max-age=31536000");
        reply.setHeader("Access-Control-Allow-Origin", "*");
        reply.setHeader("Access-Control-Allow-Methods", "GET");
        reply.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        reply.setHeader("Access-Control-Allow-Credentials", "true");
    }

    public async proxyImage(request, reply) {
        const { url } = request.query as { url: string };
        const { headers } = request.query as { headers: any };

        if (!url || !headers) {
            reply.status(400).send("No URL provided");
            return;
        }

        this.setHeaders(reply);
        try {
            const imageBuffer = await this.getImage(url, { headers: JSON.parse(headers) });
            reply.send(imageBuffer);
        } catch (error) {
            reply.status(500).send("Error fetching image");
        }
    }
}

export default ImageProxy;
