export namespace Grimoire {
    const escapeAttrib = (value: any) => {
        return (value ?? false) !== false ? `${value}`.replace(/"/g, '\\"') : undefined;
    };

    const SELF_CLOSING = ["img", "meta", "link", "hr", "br", "wbr"];
    const ATTR_ALIASES: { [key: string]: string } = {
        className: "class",
    };

    const parse = (children?: (JSX.Element | JSX.Element[])[]): JSX.Element[] => {
        if (children) {
            return children.reduce<JSX.Element[]>((acc, each) => {
                if (Array.isArray(each)) {
                    acc.push(...parse(each));
                } else {
                    acc.push(each);
                }
                return acc;
            }, []);
        }
        return [];
    };

    export const jsxElement = (tag: any, props: Record<string, any> = {}, ...children: JSX.Element[]): JSX.Element => {
        const parsedChildren = parse(children);
        if (typeof tag === "function") {
            return {
                func: tag,
                props,
                children: parsedChildren,
            };
        }

        const attributes = Object.entries(props ?? {}).reduce<{ [key: string]: string }>((acc, [k, v]) => {
            const name = k in ATTR_ALIASES ? ATTR_ALIASES[k] : k;
            const value = v;
            if (value !== undefined && value !== null) {
                acc[name] = value;
            }
            return acc;
        }, {});

        return {
            tag,
            attributes,
            children: SELF_CLOSING.includes(tag) ? [] : parsedChildren,
        };
    };

    export const jsxFragment = ({ children }: { children?: JSX.Element[] }): JSX.Element => {
        return {
            fragment: children ?? [],
        };
    };

    export const render = (contents: JSX.Element): string => {
        if (contents === undefined || contents === null) {
            return "";
        }
        if (typeof contents === "string") {
            return contents;
        }
        if ("fragment" in contents) {
            return contents.fragment.map(render).join("");
        }
        if ("tag" in contents) {
            const attributes = Object.entries(contents.attributes ?? {})
                .map(([name, value]) => `${name in ATTR_ALIASES ? ATTR_ALIASES[name] : name}="${escapeAttrib(value)}"`)
                .join(" ");
            if (contents.children.length === 0) {
                return `<${contents.tag} ${attributes}></${contents.tag}>`;
            }
            return `<${contents.tag} ${attributes}>${contents.children.map(render).join("")}</${contents.tag}>`;
        }
        if ("func" in contents) {
            const rendered = contents.func({ children: contents.children, ...contents.props });
            return render(rendered);
        }
        return "";
    };

    export type Element = JSX.Element;

    type PlainComponent = {
        tag: string;
        attributes: { [key: string]: string };
        children: Element[];
    };

    type Fragment = {
        fragment: Element[];
    };

    type FuncComponent = {
        func: (props: any) => Element;
        props: { [key: string]: any };
        children: Element[];
    };

    export namespace JSX {
        export type Element = string | null | PlainComponent | FuncComponent | undefined | Fragment;
        export interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

export const css = (str: TemplateStringsArray, ...args: any[]) => `<style> @scope { :scope {${str.reduce((acc, each) => `${acc}${args.shift()}${each}`)}}}</style>`;
