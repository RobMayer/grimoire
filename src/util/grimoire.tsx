export namespace Grimoire {
    const escapeAttrib = (value: any) => {
        return (value ?? false) !== false ? `${value}`.replace(/"/g, '\\"') : undefined;
    };

    const SELF_CLOSING = ["img", "meta", "link", "hr", "br", "wbr"];
    const ATTR_ALIASES: { [key: string]: string } = {
        className: "class",
    };

    const parse = async (element: any): Promise<string> => {
        const content = await element;
        if (content === false || content === null || content === undefined) {
            return "";
        }
        return Array.isArray(content) ? (await Promise.all(content)).map(parse).join("") : content;
    };

    export const jsxElement = async (tag: any, props: Record<string, any> = {}, ...children: any[]) => {
        const parsedChildren = await jsxFragment({ children });
        if (typeof tag === "function") {
            return await tag({ children: parsedChildren, ...props });
        }

        const attributes = Object.entries(props ?? {})
            .map(([name, value]) => `${name in ATTR_ALIASES ? ATTR_ALIASES[name] : name}="${escapeAttrib(value)}"`)
            .join(" ");

        if (SELF_CLOSING.includes(tag)) {
            return attributes ? `<${tag} ${attributes} />` : `<${tag} />`;
        } else {
            return attributes ? `<${tag} ${attributes}>${parsedChildren}</${tag}>` : `<${tag}>${parsedChildren}</${tag}>`;
        }
    };

    export const jsxFragment = async ({ children }: any) => {
        return (await Promise.all((Array.isArray(children) ? children : [children]).map(parse))).join("");
    };

    export type Element = JSX.Element;
    export namespace JSX {
        export type Element = string | null | Promise<string | null>;
        export interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

export const css = (str: TemplateStringsArray, ...args: any[]) => `<style> @scope { :scope {${str.reduce((acc, each) => `${acc}${args.shift()}${each}`)}}}</style>`;

export const resetCSS = `
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: content-box;
                    font-size: 100%;
                    vertical-align: baseline;
                    font: inherit;
                    text-decoration: none;
                    font-weight: normal;
                    font-style: normal;
                    white-space: normal;
                    line-height: inherit;
                }
                html {
                    line-height: 1;
                }
                ol, ul {
                    list-style: none;
                }
                q, blockquote {
                    quotes: none;
                }
                blockquote:before, blockquote:after,
                q:before, q:after {
	                content: '';
	                content: none;
                }
                table {
	                border-collapse: collapse;
	                border-spacing: 0;
                }
                mark {
                    background: none;
                }
                hr {
                    border-color: currentColor;
                }
            `;

const generateStyled = (tag: string) => {
    return (str: TemplateStringsArray, ...args: any[]) => {
        const parsedCss = css(str, ...args);
        return ({ children, ...props }: any) => Grimoire.jsxElement(tag, props, parsedCss, children);
    };
};

export const styled = {
    div: generateStyled("div"),
    span: generateStyled("span"),

    h1: generateStyled("h1"),
    h2: generateStyled("h2"),
    h3: generateStyled("h3"),
    h4: generateStyled("h4"),
    h5: generateStyled("h5"),
    h6: generateStyled("h6"),
    hgroup: generateStyled("hgroup"),

    hr: generateStyled("hr"),

    ul: generateStyled("ul"),
    ol: generateStyled("ol"),
    dl: generateStyled("dl"),
    dt: generateStyled("dt"),
    dd: generateStyled("dd"),
    li: generateStyled("li"),

    body: generateStyled("body"),
    main: generateStyled("main"),
    section: generateStyled("section"),
    aside: generateStyled("aside"),
    article: generateStyled("article"),
    nav: generateStyled("nav"),
    figure: generateStyled("figure"),
    figcaption: generateStyled("figcaption"),

    p: generateStyled("p"),
    blockquote: generateStyled("blockquote"),
    a: generateStyled("a"),

    q: generateStyled("q"),
    s: generateStyled("s"),
    mark: generateStyled("mark"),
    strong: generateStyled("strong"),
    em: generateStyled("em"),
    code: generateStyled("code"),
    var: generateStyled("var"),

    del: generateStyled("del"),
    ins: generateStyled("ins"),
    sub: generateStyled("sub"),
    sup: generateStyled("sup"),
    u: generateStyled("u"),

    footer: generateStyled("footer"),
    header: generateStyled("header"),
    img: generateStyled("img"),
    svg: generateStyled("svg"),

    table: generateStyled("table"),
    tr: generateStyled("tr"),
    th: generateStyled("th"),
    td: generateStyled("td"),
    thead: generateStyled("thead"),
    tfoot: generateStyled("tfoot"),
    br: generateStyled("br"),
    wbr: generateStyled("wbr"),
};
