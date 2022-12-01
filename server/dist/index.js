"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
//Local imports
const api_routes_1 = require("./api_routes");
const categories_1 = require("./api_routes/categories");
// console.log(CategoryAPI);
//Initialize app
const app = (0, express_1.default)();
//Initialize and connect to database
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(process.env.DATABASE_URL);
        // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
    });
}
connectDB()
    .then(() => console.log("Connected to MongoDB+Mongoose"))
    .catch(error => console.log(error));
////////////// MIDDLEWARE
//For testing HTTP req/res cycles
function logger(req, res, next) {
    console.log(req);
    next();
}
// app.use(logger);
//Standard middleware
const corsOptions = {
    origin: ["http://127.0.0.1:5173/", "http://localhost:3000"],
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(express_1.default.static('../client/dist'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
//API routes
app.use('/api/home', api_routes_1.router);
app.use('/api/categories', categories_1.router);
//Server main endpoints --> used to serve React frontend logic
app.get('/*', (req, res) => {
    //   res.redirect('/'); //OJUUUUUUUUUU
    res.sendFile('/index.html', { root: '../client/dist' });
});
//Listen app
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map