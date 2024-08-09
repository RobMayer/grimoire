const breathingRoom = "6pt";

const frontmatterFirst = ``;
const frontmatterBoth = ``;
const frontmatterLeft = `
    @bottom-left-corner {
        content: counter(page-extra, lower-roman);
        border-right: 1px solid var(--color-secondary);
    }
    @left-top {
        content: string(frontmatter-title);
        color: var(--color-secondary);
        border-right: 1px solid var(--color-secondary-bg);
    }
    @bottom-right {
        content: string(book-title);
    }
    @top-left-corner {
        content: counter(frontmatter-indicator, upper-latin);
        background: var(--color-secondary-bg);
    }
`;
const frontmatterRight = `
    @bottom-right-corner {
        content: counter(page-extra, lower-roman);
        border-left: 1px solid var(--color-secondary);
    }
    @right-top {
        content: string(frontmatter-title);
        color: var(--color-secondary);
        border-right: 1px solid var(--color-secondary-bg);
    }
    @bottom-left {
        content: string(book-title);
    }
    @top-right-corner {
        content: counter(frontmatter-indicator, upper-latin);
        background: var(--color-secondary-bg);
    }
`;

const frontmatterNavFirst = `${frontmatterFirst}`;

const frontmatterNavBoth = `
    ${frontmatterBoth}
    @top-center {
        content: counter(frontmatter-indicator, upper-latin) ": " string(frontmatter-title, first);
        border-bottom: 1px solid var(--color-secondary-bg);
        font-variant: small-caps;
        font-size: 24pt;
    }
`;

const frontmatterNavLeft = `${frontmatterLeft}`;

const frontmatterNavRight = `${frontmatterRight}`;

const frontmatterContentFirst = `
    margin: 0.5in 0.75in 0.75in 0.75in;
    ${frontmatterFirst}
    @left-top {
        border: none;
        content: none;
        background: none;
    }
    @top-left {
        border: none;
        content: none;
        background: none;
    }
    @top-right {
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
const frontmatterContentBoth = `${frontmatterBoth}`;
const frontmatterContentLeft = `
    @top-right {
        content: string(frontmatter-title);
    }
    ${frontmatterLeft}
`;
const frontmatterContentRight = `
    @top-left {
        content: string(frontmatter-title);
    }
    ${frontmatterRight}
`;

const mainLeft = `
    @bottom-left-corner {
        content: counter(page-main);
        border-right: 1px solid var(--color-primary);
    }
    @top-right {
        content: string(chapter-title);
    }
    @left-top {
        content: string(chapter-title);
        color: var(--color-primary);
        border-right: 1px solid currentColor;
    }
    @top-left-corner {
        content: counter(chapter-indicator, upper-roman);
        background: var(--color-primary);
        color: white;
    }
    @bottom-right {
        content: string(book-title);
    }
    @bottom-left {
        content: counter(chapter-indicator, upper-roman) "." counter(section-indicator) " - " string(section-title, first);
    }
`;

const mainRight = `
    @bottom-right-corner {
        content: counter(page-main);
        border-left: 1px solid var(--color-primary);
    }
    @top-left {
        content: string(chapter-title);
    }
    @right-top {
        content: string(chapter-title);
        color: var(--color-primary);
        border-right: 1px solid currentColor;   
    }
    @top-right-corner {
        content: counter(chapter-indicator, upper-roman);
        background: var(--color-primary);
        color: white;
    }
    @bottom-left {
        content: string(book-title);
    }
    @bottom-right {
        content: counter(chapter-indicator, upper-roman) "." counter(section-indicator) " - " string(section-title, first);
    }
`;

const mainFirst = `
    margin: 0.5in 0.75in 0.75in 0.75in;
    @left-top {
        border: none;
        content: none;
        background: none;
    }
    @top-left {
        border: none;
        content: none;
        background: none;
    }
    @top-right {
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
        counter-set: frontmatter-number 0 chapter-number 0 chapter-indicator 0 section-indicator 0 frontmatter-indicator 0 page-main 0 page-extra 0 footnote 0 footnote-marker 0;
    }

    @page {
        @footnote {
            border-top: 1px solid var(--color-secondary-bg);
            float: bottom;
            padding: ${breathingRoom};
        }
        size: letter;
        margin: 0.75in;
        @bottom-left-corner {
            text-align: center;
            vertical-align: middle;
            margin: ${breathingRoom} ${breathingRoom} calc(${breathingRoom} * 2) calc(${breathingRoom} * 2);
        }
        
        @top-center {
            margin-block: calc(${breathingRoom} * 2);
            margin-inline: -${breathingRoom};
        }
        @bottom-right-corner {
            text-align: center;
            vertical-align: middle;
            margin: ${breathingRoom} calc(${breathingRoom} * 2) calc(${breathingRoom} * 2) ${breathingRoom};
        }
        @bottom-right {
            vertical-align: middle;
            text-align: right;
            margin-block: ${breathingRoom} calc(${breathingRoom} * 2);
            padding-inline: ${breathingRoom};
        }
        @bottom-left {
            vertical-align: middle;
            text-align: left;
            margin-block: ${breathingRoom} calc(${breathingRoom} * 2);
            padding-inline: ${breathingRoom};
        }

         @top-right {
            vertical-align: middle;
            text-align: right;
            margin-block: calc(${breathingRoom} * 2) ${breathingRoom};
            padding-inline: ${breathingRoom};
        }
        @top-left {
            vertical-align: middle;
            text-align: left;
            margin-block: calc(${breathingRoom} * 2) ${breathingRoom};
            padding-inline: ${breathingRoom};
        }

        @left-top {
            
            display: grid;
            white-space: nowrap;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            
            align-content: center;
            align-self: start;
            margin-inline: -${breathingRoom} 0;
            padding-inline: calc(${breathingRoom} * 2) 3em;
            margin-block: calc(${breathingRoom} * 2);
            
            font-size: 16pt;
            font-variant: small-caps;
            
        }
        @right-top {
            
            rotate: 180deg;
            display: grid;
            white-space: nowrap;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            
            align-self: start;
            align-content: center;
            margin-inline: -${breathingRoom} 0;
            padding-inline: 3em calc(${breathingRoom} * 2);
            margin-block: calc(${breathingRoom} * 2);
            
            font-variant: small-caps;
            font-size: 16pt;
            
            
        }
        @top-left-corner {
            text-align: center;
            vertical-align: middle;
            font-size: 16pt;
            padding: ${breathingRoom} 0 0 ${breathingRoom};
            margin: 0 ${breathingRoom} ${breathingRoom} 0;
        }
        @top-right-corner {
            text-align: center;
            vertical-align: middle;
            font-size: 16pt;
            margin: 0 0 ${breathingRoom} ${breathingRoom};
            padding: ${breathingRoom} ${breathingRoom} 0 0;
        }
    }

    @page main:left {${mainLeft}}
    @page main-init:left {${mainLeft}}
    @page main:right {${mainRight}}
    @page main-init:right {${mainRight}}
    @page main:first {${mainFirst}}
    @page main-init:first {${mainFirst}}

    @page frontmatter-content {${frontmatterContentBoth}}
    @page frontmatter-content:left {${frontmatterContentLeft}}
    @page frontmatter-content:right {${frontmatterContentRight}}
    @page frontmatter-content:first {${frontmatterContentFirst}}

    @page frontmatter-nav {${frontmatterNavBoth}}
    @page frontmatter-nav:left {${frontmatterNavLeft}}
    @page frontmatter-nav:right {${frontmatterNavRight}}
    @page frontmatter-nav:first {${frontmatterNavFirst}}

    @page backmatter-content {${frontmatterContentBoth}}
    @page backmatter-content:left {${frontmatterContentLeft}}
    @page backmatter-content:right {${frontmatterContentRight}}
    @page backmatter-content:first {${frontmatterContentFirst}}

    @page backmatter-nav {${frontmatterNavBoth}}
    @page backmatter-nav:left {${frontmatterNavLeft}}
    @page backmatter-nav:right {${frontmatterNavRight}}
    @page backmatter-nav:first {${frontmatterNavFirst}}
`;

const fixStyles = `

    div.pagedjs_sheet {
        counter-reset: footnote footnote-marker;
    }

    div.pagedjs_main_page {
        counter-increment: page-main page;
    }

    div.pagedjs_main-init_page {
        counter-reset: page;
        counter-increment: page-main page;
    }

    div.pagedjs_frontmatter-nav_page, div.pagedjs_frontmatter-content_page, div.pagedjs_backmatter-content_page, div.pagedjs_backmatter-nav_page  {
        counter-increment: page-extra page;
    }

    .pagedjs_sheet:has(main h2) {
        counter-increment: chapter-indicator;
        counter-set: section-indicator 0;
    }
    
    .pagedjs_sheet:has(header h2), 
    .pagedjs_sheet:has(footer h2) {
        counter-increment: frontmatter-indicator;
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
    }`;

export { pageStyles, fixStyles };
