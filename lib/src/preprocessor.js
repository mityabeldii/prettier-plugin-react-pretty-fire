"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessor = void 0;
var parser_1 = require("@babel/parser");
var traverse_1 = __importDefault(require("@babel/traverse"));
var lodash_1 = require("lodash");
var preprocessor = function (code) {
    var parserOptions = {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
    };
    var ast = (0, parser_1.parse)(code, parserOptions);
    var attributesValuesToReplace = [];
    (0, traverse_1.default)(ast, {
        JSXAttribute: function (path) {
            var _a, _b, _c, _d;
            var start = ((_b = (_a = path.node.value) === null || _a === void 0 ? void 0 : _a.loc) === null || _b === void 0 ? void 0 : _b.start).index;
            var end = ((_d = (_c = path.node.value) === null || _c === void 0 ? void 0 : _c.loc) === null || _d === void 0 ? void 0 : _d.end).index;
            var attributeValue = code.slice(start, end);
            var isTemplateLiteral = (0, lodash_1.get)(path, "node.value.expression.type") === "TemplateLiteral";
            if (isTemplateLiteral) {
                var isReallyTemplateLiteral = attributeValue.includes("${");
                if (!isReallyTemplateLiteral) {
                    attributesValuesToReplace.push(attributeValue);
                }
            }
            else {
                if (attributeValue.startsWith("{'") || attributeValue.startsWith('{"')) {
                    attributesValuesToReplace.push(attributeValue);
                }
            }
        },
    });
    attributesValuesToReplace.forEach(function (value) {
        code = code.replace(value, "\"" + value.slice(2, -2) + "\"");
    });
    return code;
};
exports.preprocessor = preprocessor;
