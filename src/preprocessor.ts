import { parse as babelParser, ParserOptions } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { JSXAttribute, SourceLocation } from "@babel/types";
import { get } from "lodash";

type SourceLocationExtended = SourceLocation["start"] & {
    index: number;
};

export const preprocessor = (code: string): string => {
    const parserOptions: ParserOptions = {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
    };

    const ast = babelParser(code, parserOptions);

    const attributesValuesToReplace: string[] = [];

    traverse(ast, {
        JSXAttribute(path: NodePath<JSXAttribute>) {
            if (!path.node.value || !path.node.value.loc) {
                return;
            }
            const { index: start } = path.node.value?.loc?.start as SourceLocationExtended;
            const { index: end } = path.node.value?.loc?.end as SourceLocationExtended;
            const attributeValue = code.slice(start, end);
            const type = get(path, "node.value.expression.type");
            const isTemplateLiteral = type === "TemplateLiteral";
            if (isTemplateLiteral) {
                const isReallyTemplateLiteral = attributeValue.includes("${");
                if (!isReallyTemplateLiteral) {
                    attributesValuesToReplace.push(attributeValue);
                }
            } else {
                if (attributeValue.startsWith("{'") || attributeValue.startsWith('{"')) {
                    if (type === "StringLiteral") {
                        attributesValuesToReplace.push(attributeValue);
                    }
                }
            }
        },
    });

    attributesValuesToReplace.forEach((value) => {
        code = code.replace(value, `"${value.slice(2, -2)}"`);
    });

    return code;
};
