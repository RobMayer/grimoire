const prefaceLeft = `
    @bottom-left-corner {
        content: counter(trh-page, lower-roman);
        border-right: 1px solid #444;
        margin: 4pt;
    }
    @left-top {
        content: string(preface-title);
        color: #444;
        border-right: 1px solid #444;
        white-space: nowrap;
        text-orientation: mixed;
        writing-mode: vertical-rl;
        place-content: center start;
        display: grid;
        block-size: fit-content;
        justify-self: center;
        align-self: start;
        padding-block: 0.25em;
        padding-inline: 0.5em 3em;
        margin-inline: -4pt 0;
        font-size: 16pt;
        font-variant: small-caps;
    }
    @top-left-corner {
        content: counter(preface-indicator, upper-latin);
        text-align: center;
        vertical-align: middle;
        background: #aaa;
        color: black;
        font-size: 16pt;
        margin: 0 4pt 4pt 0;
        padding: 4pt 0 0 4pt;
    }
`;

const prefaceRight = `
    @bottom-right-corner {
        content: counter(trh-page, lower-roman);
        border-left: 1px solid #444;
        margin: 4pt;
    }
    @right-top {
        content: string(preface-title);
        color: #444;
        border-right: 1px solid #444;
        rotate: 180deg;
        white-space: nowrap;
        text-orientation: mixed;
        writing-mode: vertical-rl;
        place-content: center start;
        display: grid;
        block-size: fit-content;
        justify-self: center;
        align-self: start;
        padding-block: 0.25em;
        padding-inline: 3em 0.5em;
        font-size: 16pt;
        font-variant: small-caps;
        margin-inline: -4pt 0;
    }
    @top-right-corner {
        content: counter(preface-indicator, upper-latin);
        text-align: center;
        vertical-align: middle;
        background: #aaa;
        color: black;
        font-size: 16pt;
        margin: 0 0 4pt 4pt;
        padding: 4pt 4pt 0 0;
    }
`;

const prefaceFirst = `
    @right-top {
        background: none;
        content: none;
        border: none;
    }
    @left-top {
        background: none;
        content: none;
        border: none;
    }
    @top-left-corner {
        background: none;
        content: none;
        border: none;
    }
    @top-right-corner {
        background: none;
        content: none;
        border: none;
    }
`;


const mainLeft = `
    @bottom-left-corner {
            content: counter(trh-page);
            border-right: 1px solid #444;
            margin: 4pt;
        }
        @left-top {
            content: string(chapter-title);
            color: #048;
            border-right: 1px solid #048;
            white-space: nowrap;
            text-orientation: mixed;
            writing-mode: vertical-rl;
            place-content: center start;
            display: grid;
            block-size: fit-content;
            justify-self: center;
            align-self: start;
            padding-block: 0.25em;
            padding-inline: 0.5em 3em;
            margin-inline: -4pt 0;
            font-size: 16pt;
            font-variant: small-caps;
        }
        @top-left-corner {
            content: counter(chapter-indicator, upper-roman);
            text-align: center;
            vertical-align: middle;
            background: #048;
            color: white;
            font-size: 16pt;
            margin: 0 4pt 4pt 0;
        }
        @bottom-left {
            content: counter(chapter-indicator, upper-roman) "." counter(section-indicator) " - " string(section-title, first);
            vertical-align: middle;
            padding-left: 4pt;
            margin-block: 4pt;
        }
`;

const mainRight = `
    @bottom-right-corner {
        content: counter(trh-page);
        border-left: 1px solid #048;
        margin: 4pt;
    }
    @right-top {
        content: string(chapter-title);
        color: #048;
        border-right: 1px solid #048;
        rotate: 180deg;
        white-space: nowrap;
        text-orientation: mixed;
        writing-mode: vertical-rl;
        place-content: center start;
        display: grid;
        block-size: fit-content;
        justify-self: center;
        align-self: start;
        padding-block: 0.25em;
        padding-inline: 3em 0.5em;
        font-size: 16pt;
        font-variant: small-caps;
        margin-inline: -4pt 0;
    }
    @top-right-corner {
        content: counter(chapter-indicator, upper-roman);
        text-align: center;
        vertical-align: middle;
        background: #048;
        color: white;
        font-size: 16pt;
        margin: 0 0 4pt 4pt;
        padding: 4pt 4pt 0 0;
    }
    @bottom-right {
        content: counter(chapter-indicator, upper-roman) "." counter(section-indicator) " - " string(section-title, first);
        vertical-align: middle;
        padding-right: 4pt;
        margin-block: 4pt;
    }
`;

const mainFirst = `
    @left-top {
        border: none;
        content: none;
        background: none;
    }
    @right-top {
        border: none;
        content: none;
        background: none;
    }
    @top-right-corner {
        border: none;
        content: none;
        background: none;
    }
    @top-left-corner {
        border: none;
        content: none;
        background: none;
    }
`;

const pageStyles = `
    html {
        counter-set: chapter-number 0 chapter-indicator 0 section-indicator 0 preface-indicator 0 trh-page 0;
    }

    @page {
        size: letter;
        margin: 0.5in;
        @bottom-left-corner {
            text-align: center;
            vertical-align: middle;
        }
        @bottom-right-corner {
            text-align: center;
            vertical-align: middle;
        }
    }

    @page main:left {${mainLeft}}
    @page main-init:left {${mainLeft}}
    @page main:right {${mainRight}}
    @page main-init:right {${mainRight}}
    @page main:first {${mainFirst}}
    @page main-init:first {${mainFirst}}

    @page preface:left {${prefaceLeft}}
    @page preface-init:left {${prefaceLeft}}
    @page preface:right {${prefaceRight}}
    @page preface-init:right {${prefaceRight}}
    @page preface:first {${prefaceFirst}}
    @page preface-init:first {${prefaceFirst}}
`;

const fixStyles = `div.pagedjs_page {
                    counter-increment: trh-page 1;
                }

                div.pagedjs_main-init_first_page {
                    counter-set: trh-page 1;
                }

                .pagedjs_sheet:has(main h2) {
                    counter-increment: chapter-indicator;
                    counter-set: section-indicator 0;
                }
                
                .pagedjs_sheet:has(header h2) {
                    counter-increment: preface-indicator;
                }
                .pagedjs_sheet:has(main h2) {
                    counter-increment: chapter-indicator;
                    counter-set: section-indicator 0;
                }
                .pagedjs_sheet:has(main h3) {
                    counter-increment: section-indicator;
                }
                .pagedjs_sheet:has(main h3):has(main h2) {
                    counter-increment: chapter-indicator;
                    counter-set: section-indicator 1;
                }`

export { pageStyles, fixStyles };
