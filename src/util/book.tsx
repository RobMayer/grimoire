import { Grimoire } from "./grimoire";

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

    const dataContext = {
        table: 0,
        diagram: 0,
        figure: 0,
    };

    const resetContext = () => {
        Object.keys(dataContext).forEach((k) => {
            dataContext[k as keyof typeof dataContext] = 0;
        });
    };

    const outlineCounter: number[] = [];
    const tlTokens: string[] = [];

    const byFamilyCounters = {
        sidematter: 0,
        chapter: 0,
        interlude: 0,
    };

    const typeToFamily = {
        supplemental: "sidematter",
        referential: "sidematter",
        chapter: "chapter",
        interlude: "interlude",
    } as const;

    const tokenByFamily = {
        sidematter: (n: number) => toLatin(n),
        chapter: (n: number) => toRoman(n),
        interlude: (n: number) => toLatin(n).toLowerCase(),
    };

    const prefixByType = {
        table: "Table",
        figure: "Figure",
        diagram: "Diagram",
    };

    const TopLevel = ({ children, title, className, type }: { children?: Grimoire.Element; title: string; className?: string; type: "supplemental" | "referential" | "chapter" | "interlude" }) => {
        const family = typeToFamily[type];
        byFamilyCounters[family]++;

        if (outlineCounter.length < 1) {
            outlineCounter.push(...Array(1 - outlineCounter.length).fill(0, 0));
        }
        outlineCounter.splice(1);
        const tlCounter = ++outlineCounter[0];

        const fmCounter = byFamilyCounters[family];
        const token = tokenByFamily[family](fmCounter);

        tlTokens.push(token);
        resetContext();

        return (
            <article className={`${type} ${className ?? ""}`} data-outline-depth={`${type} outline section subsection figure table diagram`}>
                <h2
                    id={`outline-${[token, 0].join("_")}`}
                    data-outline-target={`${type} subsection section outline`}
                    data-outline-sort={[tlCounter, 0].join(".")}
                    data-outline-slug={`${token} - ${title}`}
                    data-outline-token={token}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-region-title={title}
                    data-running-region-counter={tlCounter}
                    data-running-region-iter={fmCounter}
                    data-running-region-token={token}
                    data-running-region-slug={`${[token, 0].join(".")} - ${title}`}
                >
                    {title}
                </h2>
                {children}
            </article>
        );
    };

    export const Supplemental = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => (
        <TopLevel title={title} className={className} type={"supplemental"}>
            {children}
        </TopLevel>
    );
    export const Referential = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => (
        <TopLevel title={title} className={className} type={"referential"}>
            {children}
        </TopLevel>
    );
    export const Chapter = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => (
        <TopLevel title={title} className={className} type={"chapter"}>
            {children}
        </TopLevel>
    );
    export const Interlude = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => (
        <TopLevel title={title} className={className} type={"interlude"}>
            {children}
        </TopLevel>
    );

    export const Section = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        if (outlineCounter.length < 2) {
            outlineCounter.push(...Array(2 - outlineCounter.length).fill(0, 0));
        }
        outlineCounter.splice(2);
        const scCounter = ++outlineCounter[1];
        const tlCounter = outlineCounter[0];
        const tlToken = tlTokens[tlCounter - 1];

        return (
            <section className={`section ${className ?? ""}`} data-outline-depth={"section subsection outline"}>
                <h3
                    id={`outline-${[tlToken, scCounter].join("_")}`}
                    data-outline-target={"subsection section outline"}
                    data-outline-sort={[tlToken, scCounter].join(".")}
                    data-outline-slug={`${[tlToken, scCounter].join(".")} - ${title}`}
                    data-outline-token={[tlToken, scCounter].join(".")}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-section-slug={`${[tlToken, scCounter].join(".")} - ${title}`}
                    data-running-section-title={title}
                    data-running-section-token={[tlToken, scCounter].join(".")}
                >
                    {title}
                </h3>
                {children}
            </section>
        );
    };

    export const Subsection = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        if (outlineCounter.length < 3) {
            outlineCounter.push(...Array(3 - outlineCounter.length).fill(0, 0));
        }
        outlineCounter.splice(3);
        const subSectionCounter = ++outlineCounter[2];
        const sectionCounter = outlineCounter[1];
        const tlCounter = outlineCounter[0];
        const tlToken = tlTokens[tlCounter - 1];

        return (
            <section className={`subsection ${className ?? ""}`} data-outline-depth={"subsection outline"}>
                <h4
                    id={`subsection-${[tlToken, sectionCounter, subSectionCounter].join("_")}`}
                    data-outline-target={"subsection outline"}
                    data-outline-sort={[tlToken, sectionCounter, subSectionCounter].join(".")}
                    data-outline-slug={`${[tlToken, sectionCounter, subSectionCounter].join(".")} - ${title}`}
                    data-outline-token={[tlToken, sectionCounter, subSectionCounter].join(".")}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-section-slug={`${[tlToken, sectionCounter, subSectionCounter].join(".")} - ${title}`}
                    data-running-section-title={title}
                    data-running-section-token={[tlToken, sectionCounter, subSectionCounter].join(".")}
                >
                    {title}
                </h4>
                {children}
            </section>
        );
    };

    const DataElement = ({ children, title, className, type }: { children?: Grimoire.Element; title: string; className?: string; type: keyof typeof dataContext }) => {
        const tlCounter = outlineCounter[0];
        const tlToken = tlTokens[tlCounter - 1];
        const deCounter = ++dataContext[type];
        const prefix = prefixByType[type];

        return (
            <figure className={`${type} ${className ?? ""}`}>
                <figcaption
                    id={`${type}-${[tlToken, deCounter].join("_")}`}
                    data-outline-target={type}
                    data-outline-sort={[tlCounter, deCounter].join(".")}
                    data-outline-slug={`${prefix} ${[tlToken, deCounter].join(".")} - ${title}`}
                    data-outline-token={[tlToken, deCounter].join(".")}
                    data-outline-title={title}
                    data-outline-prefix={prefix}
                >
                    {title}
                </figcaption>
                {children}
            </figure>
        );
    };

    export const Figure = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => (
        <DataElement title={title} className={className} type={"figure"}>
            {children}
        </DataElement>
    );
    export const Table = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => (
        <DataElement title={title} className={className} type={"table"}>
            <table>{children}</table>
        </DataElement>
    );

    export const Sidebar = ({ children, title, className }: { children?: Grimoire.Element; title?: string; className?: string }) => {
        return (
            <aside className={className}>
                {title ? <figcaption>{title}</figcaption> : null}
                {children}
            </aside>
        );
    };
}
