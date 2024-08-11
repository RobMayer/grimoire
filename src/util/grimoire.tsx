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

/*


    running-region-title:
        chapter name
    running-region-counter:
        3 (does not reset during regions)
    running-region-token:
        I
    running-region-iter:
        1 (does reset between regions)
    
    running-focus-slug:
        I.0 - chapter name
        I.1 - section name
    running-focus-token:
        I.0
    running-focus-title:
        chapter name
    
    outline-type:
        "content", "figure", "table", "diagram"
    outline slug: (prefix, token, title)
        I - chapter name
        I.1 - secion name
        Figure I.1.1 - figure name
    sorter:
        1.1.1



    page-number-style:
        roman,
        arabic

    toQuery:
        outline: chapters and sections
        referenec: chapters, tables, figures, diagrams

*/

export namespace Book {
    const toLatin = (idx: number) => {
        const UPPER_LATIN = "ABCDEFGHJKMNPQRSTUVWXYZ";
        return UPPER_LATIN[idx - 1];
    };

    function toRoman(num: number) {
        // Define the Roman numeral mappings
        const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const syb = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

        let roman = "";

        // Iterate over the value array
        for (let i = 0; i < val.length; i++) {
            // Determine the number of times the symbol can be used
            while (num >= val[i]) {
                roman += syb[i];
                num -= val[i];
            }
        }

        return roman;
    }

    let sidematterCounter = 0;
    let chapterCounter = 0;
    let sectionCounter = 0;
    let figureCounter = 0;
    let tableCounter = 0;
    let interludeCounter = 0;

    let topLevelToken = "A";
    let topLevelCount = 0;

    export const Supplemental = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        sidematterCounter++;
        topLevelCount++;

        sectionCounter = 0;
        tableCounter = 0;
        figureCounter = 0;

        topLevelToken = toLatin(sidematterCounter);

        return (
            <article className={`supplemental ${className ?? ""}`} data-outline-depth={"sidematter supplemental outline section figure table diagram"}>
                <h2
                    id={`outline-${[topLevelToken, 0].join("_")}`}
                    data-outline-target={"supplemental outline"}
                    data-outline-sort={[topLevelCount, 0].join(".")}
                    data-outline-slug={`${topLevelToken} - ${title}`}
                    data-outline-token={topLevelToken}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-region-title={title}
                    data-running-region-counter={topLevelCount}
                    data-running-region-iter={sidematterCounter}
                    data-running-region-token={topLevelToken}
                    data-running-region-slug={`${[topLevelToken, 0].join(".")} - ${title}`}
                >
                    {title}
                </h2>
                {children}
            </article>
        );
    };

    export const Referential = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        sidematterCounter++;
        topLevelCount++;
        sectionCounter = 0;
        tableCounter = 0;
        figureCounter = 0;

        topLevelToken = toLatin(sidematterCounter);

        return (
            <article className={`referential ${className ?? ""}`} data-outline-depth={"sidematter referential outline section figure table diagram"}>
                <h2
                    id={`outline-${[topLevelToken, 0].join("_")}`}
                    data-outline-target={"referential outline"}
                    data-outline-sort={[topLevelCount, 0].join(".")}
                    data-outline-slug={`${topLevelToken} - ${title}`}
                    data-outline-token={topLevelToken}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-region-title={title}
                    data-running-region-counter={topLevelCount}
                    data-running-region-iter={sidematterCounter}
                    data-running-region-token={topLevelToken}
                    data-running-region-slug={`${[topLevelToken, 0].join(".")} - ${title}`}
                >
                    {title}
                </h2>
                {children}
            </article>
        );
    };

    export const Chapter = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        chapterCounter++;
        topLevelCount++;
        sectionCounter = 0;
        tableCounter = 0;
        figureCounter = 0;

        topLevelToken = toRoman(chapterCounter);

        return (
            <article className={`chapter ${className ?? ""}`} data-outline-depth={"bodymatter chapter outline section figure table diagram"}>
                <h2
                    id={`outline-${[topLevelToken, 0].join("_")}`}
                    data-outline-target={"chapter outline"}
                    data-outline-sort={[topLevelCount, 0].join(".")}
                    data-outline-slug={`${topLevelToken} - ${title}`}
                    data-outline-token={topLevelToken}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-region-title={title}
                    data-running-region-counter={topLevelCount}
                    data-running-region-iter={sidematterCounter}
                    data-running-region-token={topLevelToken}
                    data-running-region-slug={`${[topLevelToken, 0].join(".")} - ${title}`}
                >
                    {title}
                </h2>
                {children}
            </article>
        );
    };

    export const Interlude = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        interludeCounter++;
        topLevelCount++;
        sectionCounter = 0;
        tableCounter = 0;
        figureCounter = 0;

        topLevelToken = toRoman(interludeCounter).toLocaleLowerCase();

        return (
            <article className={`interlude ${className ?? ""}`} data-outline-depth={"bodymatter interlude outline section figure table diagram"}>
                <h2
                    id={`outline-${[topLevelToken, 0].join("_")}`}
                    data-outline-target={"interlude outline"}
                    data-outline-sort={[topLevelCount, 0].join(".")}
                    data-outline-slug={`${topLevelToken} - ${title}`}
                    data-outline-token={topLevelToken}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-region-title={title}
                    data-running-region-counter={topLevelCount}
                    data-running-region-iter={sidematterCounter}
                    data-running-region-token={topLevelToken}
                    data-running-region-slug={`${[topLevelToken, 0].join(".")} - ${title}`}
                >
                    {title}
                </h2>
                {children}
            </article>
        );
    };

    export const Section = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        sectionCounter++;
        tableCounter = 0;
        figureCounter = 0;

        return (
            <section className={`section ${className ?? ""}`} data-outline-depth={"section outline"}>
                <h3
                    id={`outline-${[topLevelToken, sectionCounter].join("_")}`}
                    data-outline-target={"section outline"}
                    data-outline-sort={[topLevelCount, sectionCounter].join(".")}
                    data-outline-slug={`${[topLevelToken, sectionCounter].join(".")} - ${title}`}
                    data-outline-token={[topLevelToken, sectionCounter].join(".")}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-section-slug={`${[topLevelToken, sectionCounter].join(".")} - ${title}`}
                    data-running-section-title={title}
                    data-running-section-token={[topLevelToken, sectionCounter].join(".")}
                >
                    {title}
                </h3>
                {children}
            </section>
        );
    };

    export const Figure = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        figureCounter++;

        return (
            <figure className={`figure ${className ?? ""}`}>
                <figcaption
                    id={`figure-${[topLevelToken, sectionCounter].join("_")}`}
                    data-outline-target={"figure"}
                    data-outline-sort={[topLevelCount, sectionCounter, figureCounter].join(".")}
                    data-outline-slug={`Figure ${[topLevelToken, sectionCounter, figureCounter].join(".")} - ${title}`}
                    data-outline-token={[topLevelToken, sectionCounter, figureCounter].join(".")}
                    data-outline-title={title}
                    data-outline-prefix={"Figure"}
                >
                    {title}
                </figcaption>
                {children}
            </figure>
        );
    };

    export const Table = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        tableCounter++;

        return (
            <figure className={`table ${className ?? ""}`}>
                <figcaption
                    id={`table-${[topLevelToken, sectionCounter].join("_")}`}
                    data-outline-target={"table"}
                    data-outline-sort={[topLevelCount, sectionCounter, tableCounter].join(".")}
                    data-outline-slug={`Table ${[topLevelToken, sectionCounter, tableCounter].join(".")} - ${title}`}
                    data-outline-token={[topLevelToken, sectionCounter, tableCounter].join(".")}
                    data-outline-title={title}
                    data-outline-prefix={"Table"}
                >
                    {title}
                </figcaption>
                <table>{children}</table>
            </figure>
        );
    };
}
