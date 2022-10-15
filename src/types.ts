import { ExpressionStatement, ImportDeclaration } from '@babel/types';
import { RequiredOptions } from 'prettier';

export interface PrettierOptions extends RequiredOptions {
    importOrder: string[];
}

export type ImportGroups = Record<string, ImportDeclaration[]>;
export type ImportOrLine = ImportDeclaration | ExpressionStatement;

export type GetSortedNodes = (
    nodes: ImportDeclaration[],
    options: Pick<PrettierOptions, 'importOrder'>,
) => ImportOrLine[];
