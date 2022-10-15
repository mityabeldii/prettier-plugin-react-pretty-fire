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
    importOrderParserPlugins: {
        type: 'path',
        category: 'Global',
        array: true,
        // By default, we add ts and jsx as parsers but if users define something
        // we take that option
        default: [{ value: ['typescript', 'jsx'] }],
        description: 'Provide a list of plugins for special syntax',
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
