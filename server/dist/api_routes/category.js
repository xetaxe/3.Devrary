"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
router.get('/getAllCategories', (req, res) => {
    res.status(200).send("Everything went fine");
});
router.get('/:cat', (req, res) => {
    res.status(200).send(`Everything went fine ${req.params.cat}`);
});
router.post('/', (req, res) => {
    res.status(200).send("New category created");
});
//# sourceMappingURL=category.js.map