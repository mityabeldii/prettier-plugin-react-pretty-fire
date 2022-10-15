import { parse as babelParser, ParserOptions } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { JSXAttribute, SourceLocation } from '@babel/types';

type SourceLocationExtended = SourceLocation['start'] & {
    index: number;
};

export const preprocessor = (code: string): string => {
    const parserOptions: ParserOptions = {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
    };

    const ast = babelParser(code, parserOptions);

    traverse(ast as any, {
        JSXAttribute(path: NodePath<JSXAttribute>) {
            const isTemplateLiteral =
                (path.node.value as any)?.expression.type === 'TemplateLiteral';
            if (isTemplateLiteral) {
                const { index: start } = path.node.value?.loc
                    ?.start as SourceLocationExtended;
                const { index: end } = path.node.value?.loc
                    ?.end as SourceLocationExtended;
                const className = code.slice(start + 2, end - 2);
                const isReallyTemplateLiteral = className.includes('${');
                if (!isReallyTemplateLiteral) {
                    code = code.replace(
                        code.slice(start, end),
                        `"${className}"`,
                    );
                }
            }
        },
    });

    return code;
};
