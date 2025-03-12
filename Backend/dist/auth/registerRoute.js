"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerRoute = (0, express_1.Router)();
registerRoute.get("/patient", (req, res) => {
    res.status(200).json({
        message: "hi there!"
    });
});
registerRoute.get("/doctor", (req, res) => {
    res.status(200).json({
        message: "hi there2!"
    });
});
exports.default = registerRoute;
