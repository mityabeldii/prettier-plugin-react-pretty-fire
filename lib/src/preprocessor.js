"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessor = void 0;
var parser_1 = require("@babel/parser");
var traverse_1 = __importDefault(require("@babel/traverse"));
var preprocessor = function (code) {
    var parserOptions = {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
    };
    var ast = (0, parser_1.parse)(code, parserOptions);
    (0, traverse_1.default)(ast, {
        JSXAttribute: function (path) {
            var _a, _b, _c, _d, _e;
            var isTemplateLiteral = ((_a = path.node.value) === null || _a === void 0 ? void 0 : _a.expression.type) === 'TemplateLiteral';
            if (isTemplateLiteral) {
                var start = ((_c = (_b = path.node.value) === null || _b === void 0 ? void 0 : _b.loc) === null || _c === void 0 ? void 0 : _c.start).index;
                var end = ((_e = (_d = path.node.value) === null || _d === void 0 ? void 0 : _d.loc) === null || _e === void 0 ? void 0 : _e.end).index;
                var className = code.slice(start + 2, end - 2);
                var isReallyTemplateLiteral = className.includes('${');
                if (!isReallyTemplateLiteral) {
                    code = code.replace(code.slice(start, end), "\"" + className + "\"");
                }
            }
        },
    });
    return code;
};
exports.preprocessor = preprocessor;
