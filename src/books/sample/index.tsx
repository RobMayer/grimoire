import { readFile } from "fs/promises";
import { resetCSS, Grimoire } from "../../util/grimoire";
import { Lipsum } from "../../widgets/lipsum";
import { fixStyles, pageStyles } from "./pagestyles";

const Sample = async () => {
    const styles = await readFile(`${__dirname}/assets/styles.css`, "utf-8");
    const script = await readFile(`${__dirname}/../../util/toc.js`, "utf-8");

    return (
        <html>
            <head>
                <style>{resetCSS}</style>
                <style>{pageStyles}</style>
                <style>{styles}</style>
                <style data-pagedjs-ignore>{fixStyles}</style>
                <script src={"https://unpkg.com/pagedjs@0.5.0-beta.1/dist/paged.polyfill.min.js"}></script>
                <script type="text/javascript">{script}</script>
                <title>Style Document Test</title>
            </head>
            <body>
                <hgroup>
                    <h1>Book Title</h1>
                    <p>Subtitle</p>
                    <address>Author</address>
                    <var>v1.0</var>
                </hgroup>
                <header>
                    <h2>Table of Contents</h2>
                    <nav id="toc"></nav>
                </header>
                <header>
                    <h2>Table of Figures</h2>
                    <nav>This will be the TOF</nav>
                </header>
                <header>
                    <h2>Preface</h2>
                    <article>
                        <Lipsum />
                    </article>
                </header>
                <main>
                    <h2>Chapter 1 Title</h2>
                    <article>
                        <p>
                            This is a test paragraph <cite>with a footnote</cite> with more than one footenote <cite>this is the second</cite>
                        </p>
                        <Lipsum />
                        <p>
                            This is a test paragraph <cite>with a footnote</cite>
                        </p>
                        <Lipsum />
                        <h3>Section 1 Header</h3>
                        <h3>Section 2 Header</h3>
                    </article>
                </main>
                <main>
                    <h2>Chapter 2 Title</h2>
                    <Lipsum />
                    <Lipsum />
                    <h3>Section 1 Header</h3>
                    <h3>Section 2 Header</h3>
                </main>
                <footer>
                    <h2>Index</h2>
                    <nav>This will be the index</nav>
                </footer>
                <footer>
                    <h2>Glossary</h2>
                    <nav>This will be the glossary</nav>
                </footer>
                <footer>
                    <h2>Afterward</h2>
                    <Lipsum />
                </footer>
            </body>
        </html>
    );
};

export { Sample };
