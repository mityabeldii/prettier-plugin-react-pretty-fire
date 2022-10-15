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
    importOrderCaseInsensitive: {
        type: 'boolean',
        category: 'Global',
        default: false,
        description: 'Provide a case sensitivity boolean flag',
    },
    importOrderParserPlugins: {
        type: 'path',
        category: 'Global',
        array: true,
        // By default, we add ts and jsx as parsers but if users define something
        // we take that option
        default: [{ value: ['typescript', 'jsx'] }],
        description: 'Provide a list of plugins for special syntax',
    },
    importOrderSeparation: {
        type: 'boolean',
        category: 'Global',
        default: false,
        description: 'Should imports be separated by new line?',
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
