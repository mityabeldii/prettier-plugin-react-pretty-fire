import { parsers as typescriptParsers } from 'prettier/parser-typescript';

import { preprocessor } from './preprocessor';

const options = {
    importOrder: {
        type: 'path',
        category: 'Global',
        array: true,
        default: [{ value: [] }],
        description: 'Provide an order to sort imports.',
    },
};

module.exports = {
    parsers: {
        typescript: {
            ...typescriptParsers.typescript,
            preprocess: preprocessor,
        },
    },
    options,
};
