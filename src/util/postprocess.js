(() => {
    const MODES = {
        title: "special",
        supplemental: "sidematter",
        referential: "sidematter",
        main: "bodymatter",
        interlude: "bodymatter",
    };

    function toRoman(num) {
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

    function UUID() {
        var d = new Date().getTime();
        if (typeof performance !== "undefined" && typeof performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    }

    function depthQuery(element, query) {
        let count = 0;
        let ancestor = element.parentElement;

        while (ancestor) {
            if (ancestor.matches(query)) {
                count++;
            }
            ancestor = ancestor.parentElement;
        }

        return count;
    }

    function ancestorQuery(element, query) {
        let res = [];
        let ancestor = element.parentElement;

        while (ancestor) {
            if (ancestor.matches(query)) {
                res.push(ancestor);
            }
            ancestor = ancestor.parentElement;
        }

        console.log(res);

        return res;
    }

    class handlers extends Paged.Handler {
        constructor(chunker, polisher, caller) {
            super(chunker, polisher, caller);
        }

        beforeParsed(content) {
            // setup TOC
            setupToc(content);
            setupTof(content);
            setupIndex(content);
        }

        afterRendered(pages) {
            processPages(pages);

            // populate page numbers in all xref page
            document.querySelectorAll("[data-xref-page]").forEach((el) => {
                const target = document.getElementById(el.dataset.xrefPage);
                if (target) {
                    const p = target.closest("[data-trh-page-token]");
                    if (p) {
                        el.innerHTML = p.dataset.trhPageToken;
                    }
                }
            });

            //link page on all of link-page
            document.querySelectorAll("a[data-link-page]").forEach((el) => {
                const target = document.getElementById(el.dataset.linkPage);
                if (target) {
                    const p = target.closest("[data-page-number]");
                    if (p) {
                        el.href = `#${p.id}`;
                    }
                }
            });

            // uniqify and populate page numbers in xref index

            document.querySelectorAll("[data-xref-index]").forEach((el) => {
                console.log(el);
                const toList = {};
                const ids = el.dataset.xrefIndex.split("|").map((e) => e.trim());
                ids.forEach((id) => {
                    const target = document.getElementById(id);
                    const page = target.closest("[data-trh-page-token]");
                    const pageToken = page.dataset.trhPageToken;
                    const pageId = page.id;

                    toList[pageId] = pageToken;
                });

                const pageIds = Object.keys(toList).sort((a, b) => a.localeCompare(b));

                const linkList = pageIds.map((pg) => {
                    const tkn = toList[pg];
                    return `<a href="#${pg}">${tkn}</a>`;
                });

                console.log(toList);

                el.innerHTML = linkList.join(", ");
            });

            // setup sidenotes within asides and figures
            document.querySelectorAll("aside cite, figure cite").forEach((el, i) => {
                const theId = UUID();

                const target = el.closest("aside, figure");
                if (!target.matches(":has(div.sidenote)")) {
                    const fn = document.createElement("div");
                    fn.classList.add("sidenote");
                    fn.dataset.sidenoteContainer = "";
                    target.appendChild(fn);
                }
                const area = target.querySelector("div.sidenote");
                if (area) {
                    const ref = document.createElement("a");
                    ref.dataset.sidenoteCall = theId;
                    el.id = "sidenote-" + theId;
                    ref.href = "#sidenote-" + theId;
                    el.replaceWith(ref);

                    el.dataset.sidenoteMarker = i + 1;
                    area.appendChild(el);
                }
            });
        }
    }

    function setupToc(content) {
        const outlineElements = [...content.querySelectorAll("[data-outline-target~=section]")];
        const target = content.querySelector("nav#target-toc");
        const listItems = outlineElements
            .map((each) => {
                const depth = depthQuery(each, "[data-outline-depth~=section]");
                return `<a data-link-page="${each.id}" data-navlist-depth="${depth}" style="--trh-outline-depth: ${depth};">
                    <span class="title" data-marker-token="${each.dataset.outlineToken}" data-marker-prefix="${each.dataset.outlinePrefix}">${each.dataset.outlineTitle}</span>
                    <span class="leader"></span>
                    <span class="page" data-xref-page="${each.id}"></span>
                </a>`;
            })
            .join("");
        target.innerHTML = `${listItems}`;
    }

    function setupTof(content) {
        const outlineElements = [...content.querySelectorAll("[data-outline-target~=table],[data-outline-target~=figure],[data-outline-target~=diagram]")];
        const target = content.querySelector("nav#target-tof");
        const renderedAncestors = new Set();

        const listItems = outlineElements
            .map((each) => {
                const ancestors = ancestorQuery(each, "[data-outline-depth~=figure],[data-outline-depth~=table],[data-outline-depth~=diagram]");
                const depth = ancestors.length;

                return ancestors.reduce(
                    (acc, ancestor, i) => {
                        if (!renderedAncestors.has(ancestor)) {
                            renderedAncestors.add(ancestor);

                            const tgt = ancestor.querySelector(":scope > [data-outline-title]");

                            if (tgt) {
                                return `
                                <a data-link-page="${tgt.id}" data-navlist-depth="${depth - i}" style="--trh-outline-depth: ${depth - i};">
                                    <span class="title" data-marker-token="${tgt.dataset.outlineToken}" data-marker-prefix="${tgt.dataset.outlinePrefix}">${tgt.dataset.outlineTitle}</span>
                                    <span class="leader"></span>
                                    <span class="page" data-xref-page="${tgt.id}"></span>
                                </a>
                            ${acc}`;
                            }
                            return acc;
                        }
                        return acc;
                    },
                    `<a data-link-page="${each.id}" data-navlist-depth="${depth + 1}" style="--trh-outline-depth: ${depth + 1};">
                        <span class="title" data-marker-token="${each.dataset.outlineToken}" data-marker-prefix="${each.dataset.outlinePrefix}">${each.dataset.outlineTitle}</span>
                        <span class="leader"></span>
                        <span class="page" data-xref-page="${each.id}"></span>
                    </a>`
                );
            })
            .join("");
        target.innerHTML = `${listItems}`;
    }

    function setupIndex(content) {
        const indexElements = [...content.querySelectorAll("dfn[data-index-term]")];
        const lookups = {};

        indexElements.forEach((el) => {
            const d = el.dataset.indexTerm;
            el.id = "idx-" + UUID();
            d.split("|").forEach((entry) => {
                let [topic, subtopic] = entry.split(",");
                topic = topic.trim();
                subtopic = subtopic?.trim() ?? "";
                if (!(topic in lookups)) {
                    lookups[topic] = {
                        refs: [],
                        subTopics: {},
                    };
                }

                if (subtopic === "") {
                    lookups[topic].refs.push(el.id);
                } else {
                    if (!(subtopic in lookups[topic].subTopics)) {
                        lookups[topic].subTopics[subtopic] = [];
                    }
                    lookups[topic].subTopics[subtopic].push(el.id);
                }
            });
        });

        console.log(lookups);

        const target = content.querySelector("nav#target-idx");

        const keys = Object.keys(lookups).sort();

        const listItems = keys.reduce((acc, k) => {
            const res = [];
            if (lookups[k].refs.length === 0) {
                res.push(`<div class="topic noEntries"><span class="title">${k}</span></div>`);
            } else {
                const directRefs = lookups[k].refs.join("|");
                res.push(`<div class="topic"><span class="title">${k}</span><span class="leader"></span><span class="pagelist" data-xref-index="${directRefs}"></span></div>`);
            }
            if ("subTopics" in lookups[k]) {
                const subkeys = Object.keys(lookups[k].subTopics).sort();
                subkeys.forEach((subkey) => {
                    const subRefs = lookups[k].subTopics[subkey].join("|");
                    res.push(`<div class="subtopic"><span class="title">${subkey}</span><span class="leader"></span><span class="pagelist" data-xref-index="${subRefs}"></span></div>`);
                });
            }
            return `${acc} ${res.join("")}`;
        }, "");

        target.innerHTML = listItems;
    }

    function processPages(pages) {
        let mode = "";
        let counters = {
            special: 0,
            sidematter: 0,
            bodymatter: 0,
        };

        pages.forEach((page) => {
            // renumber
            const nMode = MODES[page.name];
            counters[nMode]++;
            const ct = counters[nMode];
            page.element.dataset.trhPageNumber = ct;
            if (mode !== nMode) {
                page.element.dataset.trhPageModechange = "";
            }
            page.element.dataset.trhPageToken = nMode === "sidematter" ? toRoman(ct).toLowerCase() : ct;
            page.element.style.setProperty("counter-set", "trh-page " + ct);

            const runningTitle =
                page.element.querySelector("[data-running-section-slug]")?.dataset?.runningSectionSlug ?? page.element.querySelector("[data-running-region-slug]")?.dataset?.runningRegionSlug;

            if (runningTitle) {
                page.element.style.setProperty("--pagedjs-string-first-focus-slug", `"${runningTitle}"`);
            } else {
                page.element.style.setProperty("--pagedjs-string-first-focus-slug", `${page.element.style.getPropertyValue("--pagedjs-string-first-section-slug-fallback")}`);
            }

            console.log(page);

            mode = nMode;
        });
    }

    Paged.registerHandlers(handlers);

    // function prepDataForOutline(content) {
    //     content.querySelectorAll("g-supplemental, g-referential").forEach((division, divNo) => {
    //         division.dataset.outlineNumber = divNo + 1;
    //         division.dataset.outlineDepth = 1;
    //         division.dataset.outlineMarker = toLatin(divNo + 1);

    //         division.querySelectorAll("section").forEach((section, secNo) => {
    //             section.dataset.outlineNumber = secNo + 1;
    //             section.dataset.outlineDepth = 2;
    //             section.dataset.outlineMarker = divNo + 1;
    //         });
    //     });

    //     content.querySelectorAll("g-chapter").forEach((division, cnt) => {
    //         division.dataset.outlineNumber = cnt + 1;
    //         division.dataset.outlineDepth = 1;
    //         division.dataset.outlineMarker = toRoman(cnt + 1);

    //         division.querySelectorAll("section").forEach((section, secNo) => {
    //             section.dataset.outlineNumber = secNo + 1;
    //             section.dataset.outlineDepth = 2;
    //             section.dataset.outlineMarker = divNo + 1;
    //         });
    //     });

    //     content.querySelectorAll("g-interlude").forEach((division, cnt) => {
    //         division.dataset.outlineNumber = cnt + 1;
    //         division.dataset.outlineDepth = 1;
    //         division.dataset.outlineMarker = toRoman(cnt + 1).toLowerCase();

    //         division.querySelectorAll("section").forEach((section, secNo) => {
    //             section.dataset.outlineNumber = secNo + 1;
    //             section.dataset.outlineDepth = 2;
    //             section.dataset.outlineMarker = divNo + 1;
    //         });
    //     });

    //     const chapters = content.querySelectorAll("g-chapter");
    //     chapters.forEach((chapter, chNo) => {
    //         chapter.dataset.chapterNumber = chNo + 1;
    //         const title = chapter.querySelectorAll(":scope > h2");
    //         chapter.dataset.chapterName = title?.innerText ?? "";

    //         chapter.querySelectorAll("section").forEach((section, seNo) => {
    //             section.dataset.sectionNumber = seNo + 1;
    //             const title = chapter.querySelectorAll(":scope > h3");
    //             chapter.dataset.sectionName = title?.innerText ?? "";
    //         });
    //     });
    // }

    // function handleNotes(content) {
    //     const elements = content.querySelectorAll("figure:has(cite), aside:has(cite)");

    //     elements.forEach((el) => {
    //         let idx = 0;
    //         el.querySelectorAll("cite").forEach((ref) => {
    //             idx++;
    //             const a = document.createElement("a");
    //         });
    //     });
    // }
})();
