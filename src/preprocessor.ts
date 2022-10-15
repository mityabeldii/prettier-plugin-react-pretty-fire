import { parse as babelParser, ParserOptions } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { JSXAttribute } from '@babel/types';

export const preprocessor = (code: string): string => {
    const parserOptions: ParserOptions = {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
    };

    const ast = babelParser(code, parserOptions);
    const interpreter = ast.program.interpreter;

    traverse(ast, {
        JSXAttribute(path: NodePath<JSXAttribute>) {
            console.log(path.node);
        },
    });

    console.log(code);

    return code;
};
