export namespace GrimoireTmp {
    const escapeAttrib = (value: any) => {
        return (value ?? false) !== false ? `${value}`.replace(/"/g, '\\"') : undefined;
    };

    const SELF_CLOSING = ["img", "meta", "link", "hr", "br", "wbr"];
    const ATTR_ALIASES: { [key: string]: string } = {
        className: "class",
    };

    const parse = (element: any): string => {
        const content = element;
        if (content === false || content === null || content === undefined) {
            return "";
        }
        return Array.isArray(content) ? content.map(parse).join("") : content;
    };

    export const jsxElement = (tag: any, props: Record<string, any> = {}, ...children: any[]) => {
        const parsedChildren = jsxFragment({ children });
        if (typeof tag === "function") {
            return tag({ children: parsedChildren, ...props });
        }

        console.log({ tag });

        const attributes = Object.entries(props ?? {})
            .map(([name, value]) => `${name in ATTR_ALIASES ? ATTR_ALIASES[name] : name}="${escapeAttrib(value)}"`)
            .join(" ");

        if (SELF_CLOSING.includes(tag)) {
            return attributes ? `<${tag} ${attributes} />` : `<${tag} />`;
        } else {
            return attributes ? `<${tag} ${attributes}>${parsedChildren}</${tag}>` : `<${tag}>${parsedChildren}</${tag}>`;
        }
    };

    export const jsxFragment = ({ children }: any) => {
        return (Array.isArray(children) ? children : [children]).map(parse).join("");
    };

    export type Element = JSX.Element;
    export namespace JSX {
        export type Element = string | null;
        export interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}
