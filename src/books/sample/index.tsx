import { readFile } from "fs/promises";
import { resetCSS, Grimoire } from "../../util/grimoire";
import { Lipsum } from "../../widgets/lipsum";
import { fixStyles, pageStyles } from "./pagestyles";

const Sample = async () => {
    const styles = await readFile(`${__dirname}/assets/styles.css`, "utf-8");

    return (
        <html>
            <head>
                <style>{resetCSS}</style>
                <style>{styles}</style>
                {/* <script src={"https://unpkg.com/pagedjs@0.5.0-beta.1/dist/paged.polyfill.min.js"}></script> */}
                <title>Style Document Test</title>
            </head>
            <body>
                <hgroup>
                    <h1>Book Title</h1>
                    <p>Book Subtitle</p>
                    <address>Author</address>
                    <div className="version">v1.0</div>
                </hgroup>
                <header>
                    <nav>
                        <h2>Tabele of Contents</h2>
                        <ul>
                            <li>
                                <a href="#">Chapter 1</a>
                            </li>
                            <li>
                                <a href="#">I.1: Section 1</a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <h2>Table of Figures</h2>
                        <ul>
                            <li>
                                <a href="#">I: Chapter 1</a>
                            </li>
                            <li>
                                <a href="#">I.1: Figure 1</a>
                            </li>
                        </ul>
                    </nav>
                    <article>
                        <h2>Preface or Intro</h2>
                    </article>
                </header>
                <main>
                    <article>
                        <h2>Chapter 1</h2>
                        <p>Paragraph</p>
                        <section>
                            <h3>Section 1</h3>
                            <p>Paragraph</p>
                        </section>
                    </article>
                    <article>
                        <h2>Chapter 2</h2>
                        <p>Paragraph</p>
                        <section>
                            <h3>Section 1</h3>
                            <p>Paragraph</p>
                        </section>
                    </article>
                </main>
                <footer>
                    <nav>
                        <h2>Index</h2>
                        <ul>
                            <li>
                                <a href="#">Some Text</a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <h2>Glossary</h2>
                        <dl>
                            <dt>Word</dt>
                            <dd>Definition</dd>
                        </dl>
                    </nav>
                    <article>
                        <h2>Aftwrward</h2>
                        <p>Paragraph</p>
                    </article>
                </footer>
            </body>
        </html>
    );
};

export { Sample };
