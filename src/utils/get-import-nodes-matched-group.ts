import { ImportDeclaration } from '@babel/types';

import { THIRD_PARTY_MODULES_SPECIAL_WORD } from '../constants';

/**
 * Get the regexp group to keep the import nodes.
 * @param node
 */
export const getImportNodesMatchedGroup = (
    node: ImportDeclaration,
) => {
    const groupWithRegExp = []

    for (const { group, regExp } of []) {
        const matched = node.source.value.match(regExp) !== null;
        if (matched) return group;
    }

    return THIRD_PARTY_MODULES_SPECIAL_WORD;
};
