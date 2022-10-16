import { parsers as typescriptParsers } from "prettier/parser-typescript";

import { preprocessor } from "./preprocessor";

module.exports = {
    parsers: {
        typescript: {
            ...typescriptParsers.typescript,
            preprocess: preprocessor,
        },
    },
};
