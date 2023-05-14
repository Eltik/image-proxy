import dotenv from "dotenv";
dotenv.config();

import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressDomainMiddleware from "express-domain-middleware";

import colors from "colors";
import ImageProxy from "./imageProxy";

const port = parseInt(process.env.PORT as string) || 3000;

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressDomainMiddleware);
app.use(cookieParser());

app.get("/", async (request, reply) => {
    /**
     * @api {get} / API Root
     * @apiDescription Returns the API documentation root.
     * @apiName GetRoot
     * @apiGroup API
     *
     * @apiSuccess {Object} ImageProxy Documentation for the ImageProxy class.
     * @apiSuccessExample Success Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "ImageProxy": {
     *             "getImage": "Fetches an image from a given URL with provided options.",
     *             "setHeaders": "Sets the headers for the HTTP response.",
     *             "proxyImage": "Proxies an image from a given URL, setting the appropriate headers."
     *         }
     *     }
     */
    const documentation = {
        ImageProxy: {
            getImage: "Fetches an image from a given URL with provided options.",
            setHeaders: "Sets the headers for the HTTP response.",
            proxyImage: "Proxies an image from a given URL, setting the appropriate headers."
        }
    };
    return reply.json(documentation);
});


app.get("/image-proxy", async (request, reply) => {
    return await new ImageProxy().proxyImage(request, reply);
});

export const start = async () => {
    app.listen({ port: port }, function (err, address) {
        if (err) {
            process.exit(1);
        }

        console.log(colors.blue(`Server is now listening on ${port}`));
    });
};

start();