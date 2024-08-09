class handlers extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    beforeParsed(content) {
        createToc(content);
    }
}
Paged.registerHandlers(handlers);

function createToc(content) {
    const tocElement = "nav#toc";
    const titleElements = ["main h2", "main h3"];

    let tocElementDiv = content.querySelector(tocElement);
    let ul = document.createElement("ul");
    tocElementDiv.appendChild(ul);

    let tocCount = 0;
    let tocLevel = 0;

    const tocEntries = titleElements.reduce((acc, query) => {
        tocLevel++;
        const elems = content.querySelectorAll(query);
        elems.forEach((el) => {
            tocCount++;
            el.id = "toc-" + tocCount;
            el.setAttribute("data-toc-level", tocLevel);
        });
        acc.push(...elems);
        return acc;
    }, []);

    const gathered = content.querySelectorAll(titleElements.join(", "));

    gathered.forEach((el) => {
        const li = document.createElement("li");
        li.setAttribute("data-toc-level", el.dataset.tocLevel);
        li.innerHTML = `<a href="#${el.id}">${el.innerHTML}</a>`;
        ul.appendChild(li);
    });
}
