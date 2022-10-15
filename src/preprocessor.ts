import { parse as babelParser, ParserOptions } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { ImportDeclaration, isTSModuleDeclaration } from '@babel/types';

import { PrettierOptions } from './types';
import { getCodeFromAst } from './utils/get-code-from-ast';
import { getSortedNodes } from './utils/get-sorted-nodes';

export function preprocessor(code: string, options: PrettierOptions) {
    const { importOrder } = options;

    const importNodes: ImportDeclaration[] = [];
    const parserOptions: ParserOptions = {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
    };

    const ast = babelParser(code, parserOptions);
    const interpreter = ast.program.interpreter;

    traverse(ast, {
        ImportDeclaration(path: NodePath<ImportDeclaration>) {
            const tsModuleParent = path.findParent((p) =>
                isTSModuleDeclaration(p),
            );
            if (!tsModuleParent) {
                importNodes.push(path.node);
            }
        },
    });

    // short-circuit if there are no import declaration
    if (importNodes.length === 0) return code;

    const allImports = getSortedNodes(importNodes, {
        importOrder,
    });

    return getCodeFromAst(allImports, code, interpreter);
}
