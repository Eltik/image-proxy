"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_domain_middleware_1 = __importDefault(require("express-domain-middleware"));
const colors_1 = __importDefault(require("colors"));
const imageProxy_1 = __importDefault(require("./imageProxy"));
const port = parseInt(process.env.PORT) || 3000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_domain_middleware_1.default);
app.use((0, cookie_parser_1.default)());
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
    return await new imageProxy_1.default().proxyImage(request, reply);
});
const start = async () => {
    app.listen({ port: port }, function (err, address) {
        if (err) {
            process.exit(1);
        }
        console.log(colors_1.default.blue(`Server is now listening on ${port}`));
    });
};
exports.start = start;
(0, exports.start)();
