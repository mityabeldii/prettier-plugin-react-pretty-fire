import { ImportDeclaration } from '@babel/types';
import { naturalSort } from '../natural-sort';

export const getSortedNodesGroup = (imports: ImportDeclaration[]) => {
    return imports.sort((a, b) => {
        return naturalSort(a.source.value, b.source.value);
    });
};
