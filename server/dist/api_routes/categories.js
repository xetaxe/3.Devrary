"use strict";
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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const category_1 = require("../models/category");
const router = express_1.default.Router();
exports.router = router;
router.get('/getAllCategories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find({});
        console.log(categories);
        res.status(200).send({ 'categories': categories });
    }
    catch (_a) {
        res.redirect('/');
    }
}));
router.get('/getCategories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let searchCategories = {};
    console.log(req.query.name);
    if (req.query.name != null && req.query.name != undefined && req.query.name !== '') {
        searchCategories.name = new RegExp((_b = req.query.name) === null || _b === void 0 ? void 0 : _b.toString(), 'i');
        // searchCategories.name = req.query.name;
    }
    try {
        const categories = yield category_1.Category.find(searchCategories);
        console.log(categories);
        const sendCategories = yield categories.map(cat => cat.name);
        res.status(200).send({ 'categories': sendCategories });
    }
    catch (_c) {
        res.redirect('/');
    }
}));
router.get('/:cat', (req, res) => {
    res.status(200).send(`Everything went fine ${req.params.cat}`);
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("My body:\n");
    console.log(req.body);
    const category = new category_1.Category({
        name: req.body.name
    });
    try {
        const newCategory = yield category.save();
        res.status(200).send({ 'message': "New category created" });
        // res.status(409).send({'message': "Category already exists"})
    }
    catch (_d) {
        res.send({ 'message': "An error occurred trying to add category" });
    }
}));
//# sourceMappingURL=categories.js.map