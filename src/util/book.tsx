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

    type Ctx = {
        table: number;
        diagram: number;
        figure: number;
    };

    const outlineContext: {
        token: string;
        sections: Ctx[];
    }[] = [];

    const byFamilyCounters = {
        sidematter: 0,
        chapter: 0,
        interlude: 0,
    };

    let tlCounter = 0;
    let scCounter = 0;

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

    const TopLevel = ({ children, title, className, type }: { children?: Grimoire.Element; title: string; className?: string; type: "supplemental" | "referential" | "chapter" | "interlude" }) => {
        const family = typeToFamily[type];
        byFamilyCounters[family]++;
        tlCounter++;

        const typeCounter = byFamilyCounters[family];

        const token = tokenByFamily[family](typeCounter);

        outlineContext.push({
            token,
            sections: [
                {
                    table: 0,
                    diagram: 0,
                    figure: 0,
                },
            ],
        });
        scCounter = 0;

        return (
            <article className={`${type} ${className ?? ""}`} data-outline-depth={`${type} outline section figure table diagram`}>
                <h2
                    id={`outline-${[token, 0].join("_")}`}
                    data-outline-target={`${type} outline`}
                    data-outline-sort={[tlCounter, 0].join(".")}
                    data-outline-slug={`${token} - ${title}`}
                    data-outline-token={token}
                    data-outline-title={title}
                    data-outline-prefix={""}
                    data-running-region-title={title}
                    data-running-region-counter={tlCounter}
                    data-running-region-iter={typeCounter}
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
        scCounter++;
        outlineContext[tlCounter - 1].sections.push({
            table: 0,
            diagram: 0,
            figure: 0,
        });
        const tlToken = outlineContext[tlCounter - 1].token;

        return (
            <section className={`section ${className ?? ""}`} data-outline-depth={"section outline"}>
                <h3
                    id={`outline-${[tlToken, scCounter].join("_")}`}
                    data-outline-target={"section outline"}
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

    export const Figure = ({ children, title, className }: { children?: Grimoire.Element; title: string; className?: string }) => {
        const figureCounter = ++outlineContext[tlCounter - 1].sections[scCounter].figure;
        const tlToken = outlineContext[tlCounter - 1].token;

        return (
            <figure className={`figure ${className ?? ""}`}>
                <figcaption
                    id={`figure-${[tlToken, scCounter, figureCounter].join("_")}`}
                    data-outline-target={"figure"}
                    data-outline-sort={[tlCounter, scCounter, figureCounter].join(".")}
                    data-outline-slug={`Figure ${[tlToken, scCounter, figureCounter].join(".")} - ${title}`}
                    data-outline-token={[tlToken, scCounter, figureCounter].join(".")}
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
        const tableCounter = ++outlineContext[tlCounter - 1].sections[scCounter].table;
        const tlToken = outlineContext[tlCounter - 1].token;

        return (
            <figure className={`table ${className ?? ""}`}>
                <figcaption
                    id={`table-${[tlToken, scCounter, tableCounter].join("_")}`}
                    data-outline-target={"table"}
                    data-outline-sort={[tlCounter, scCounter, tableCounter].join(".")}
                    data-outline-slug={`Table ${[tlToken, scCounter, tableCounter].join(".")} - ${title}`}
                    data-outline-token={[tlToken, scCounter, tableCounter].join(".")}
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
