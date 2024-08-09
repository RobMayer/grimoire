import { readFile } from "fs/promises";
import { resetCSS, Grimoire } from "../../util/grimoire";
import { Lipsum } from "../../widgets/lipsum";
import { fixStyles, pageStyles } from "./pagestyles";

const Sample = async () => {
    const styles = await readFile(`${__dirname}/assets/styles.css`, "utf-8");

    return (
        <html>
            <head>
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
                <nav>
                    <h2>Tabele of Contents</h2>
                    <ul>
                        <li>
                            <a href="#">Ch Ref</a>
                        </li>
                        <li>
                            <a href="#">Sec Ref</a>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <h2>Table of Figures</h2>
                    <ul>
                        <li>
                            <a href="#">Ch Ref</a>
                        </li>
                        <li>
                            <a href="#">Fig Ref</a>
                        </li>
                    </ul>
                </nav>
                <header>
                    <h2>Preface or Intro</h2>
                    <p>Paragraph</p>
                </header>
                <main>
                    <h2>Chapter 1</h2>
                    <p>Paragraph</p>
                    <section>
                        <h3>Section 1</h3>
                        <p>Paragraph</p>
                    </section>
                </main>
                <main>
                    <h2>Chapter 2</h2>
                    <p>Paragraph</p>
                    <section>
                        <h3>Section 1</h3>
                        <p>Paragraph</p>
                    </section>
                    <section>
                        <h3>Section 2</h3>
                        <p>Paragraph</p>
                        <figure>
                            <figcaption>Some Image</figcaption>
                        </figure>

                        <table>
                            <caption>Some Table</caption>
                            <thead>
                                <tr>
                                    <th>Column 1</th>
                                    <th>Column 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1,1</td>
                                    <td>2,1</td>
                                </tr>
                                <tr>
                                    <td>1,2</td>
                                    <td>2,2</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </main>
                <aside>
                    <h2>Interlude</h2>
                </aside>
                <main>
                    <h2>Chapter 3</h2>
                    <p>Paragraph</p>
                    <section>
                        <h3>Section 1</h3>
                        <p>Paragraph</p>
                    </section>
                    <section>
                        <h3>Section 2</h3>
                        <p>Paragraph</p>
                    </section>
                </main>
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
                <footer>
                    <h2>Aftwrward</h2>
                    <p>Paragraph</p>
                </footer>
            </body>
        </html>
    );
};

export { Sample };
