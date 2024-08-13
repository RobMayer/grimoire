import { readFile } from "fs/promises";
import { Grimoire } from "../../util/grimoire";
import { Lipsum } from "../../widgets/lipsum";
import { Book } from "../../util/book";
import { Schematic } from "../../util/schematic";

const Sample = async () => {
    const postJS = await readFile(`${__dirname}/../../util/postprocess.js`, "utf-8");

    return (
        <html>
            <head>
                <link rel={"stylesheet"} href={`${__dirname}/assets/fonts.css?cachebust=${Math.round(Math.random() * 200)}`} />
                <link rel={"stylesheet"} href={`${__dirname}/assets/pages.css?cachebust=${Math.round(Math.random() * 200)}`} />
                <link rel={"stylesheet"} href={`${__dirname}/assets/styles.css?cachebust=${Math.round(Math.random() * 200)}`} />
                <link rel={"stylesheet"} href={`${__dirname}/assets/test.css?cachebust=${Math.round(Math.random() * 200)}`} />
                <link rel={"stylesheet"} href={`${__dirname}/assets/interface.css?cachebust=${Math.round(Math.random() * 200)}`} />

                {/* <script src={"../lib/paged.polyfill.min.js"}></script> */}
                <script src={`../lib/paged.canary.polyfill.min.js?cachebust=${Math.round(Math.random() * 200)}`}></script>
                <title>Style Document Test</title>
            </head>
            <body>
                <hgroup>
                    <div>
                        <h1>Doc Test</h1>
                        <div class="subtitle">A Sandbox to test Styles in</div>
                    </div>
                    <div>
                        <div class="author" data-book-author>
                            ThatRobHuman
                        </div>
                        <div class="edition" data-book-edition>
                            v1.0
                        </div>
                    </div>
                </hgroup>
                <Book.Referential title={"Table of Contents"}>
                    <nav className={"toc"} id={"target-toc"}></nav>
                </Book.Referential>
                <Book.Referential title={"Figures and Tables"}>
                    <nav className={"tof"} id={"target-tof"}></nav>
                </Book.Referential>
                <Book.Supplemental title={"Preface"}>
                    <Lipsum count={2} />
                    <Book.Figure title={"A Formula Test"}></Book.Figure>
                    <Book.Section title={"Section One"}>
                        <Lipsum count={2} />
                    </Book.Section>
                    <Book.Figure title={"Test Schematic"} className={"fullWidth"}>
                        <Schematic></Schematic>
                    </Book.Figure>
                    <Lipsum count={2} />
                </Book.Supplemental>
                <Book.Chapter title={"Chapter 1"}>
                    <div className={"column2"}>
                        <Lipsum count={1} dropcap />
                    </div>
                    <Book.Section title={"Section 1"}>
                        This is a Section
                        <p>
                            This paragraph will contain things that <dfn data-index-term="foo,bar|baz">will show up in the Index</dfn>
                        </p>
                        <Lipsum count={1} />
                        <ul>
                            <li>Bullet List Alpha</li>
                            <li>Bullet List Bravo</li>
                            <li>Bullet List Charlie</li>
                            <li>Bullet List Delta</li>
                        </ul>
                        <ol>
                            <li>Numbered List Alpha</li>
                            <li>Numbered List Bravo</li>
                            <li>Numbered List Charlie</li>
                            <li>Numbered List Delta</li>
                        </ol>
                        <dl>
                            <dt>Foo</dt>
                            <dd>Definition of Foo</dd>
                            <dt>Bar</dt>
                            <dd>Definition of Bar</dd>
                            <dt>A longer term to define</dt>
                            <dd>This is a definition</dd>
                            <dt>Test</dt>
                            <dd>
                                This is a definition with some really long text. This is a definition with some really long text. This is a definition with some really long text. This is a definition
                                with some really long text.{" "}
                            </dd>
                        </dl>
                        <Book.Subsection title={"Subsection"}>
                            <Lipsum count={3} />
                            <hr />
                            <Lipsum count={1} />
                        </Book.Subsection>
                        <Book.Table title={"A Table with a Head"}>
                            <thead>
                                <tr>
                                    <th>C1</th>
                                    <th>C2</th>
                                    <th>C3</th>
                                    <th>C3</th>
                                    <th>C3</th>
                                    <th>C3</th>
                                    <th>C3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>R1,1</td>
                                    <td>R1,2</td>
                                    <td>R1,2</td>
                                    <td>R1,2</td>
                                    <td>R1,2</td>
                                    <td>R1,2</td>
                                    <td>R1,3</td>
                                </tr>
                                <tr>
                                    <td>R3,1</td>
                                    <td>R3,1</td>
                                    <td>R3,1</td>
                                    <td>R3,1</td>
                                    <td>R3,1</td>
                                    <td>R3,2</td>
                                    <td>R3,3</td>
                                </tr>
                                <tr>
                                    <td>R3,1</td>
                                    <td>R3,2</td>
                                    <td>R3,2</td>
                                    <td>R3,2</td>
                                    <td>R3,2</td>
                                    <td>R3,2</td>
                                    <td>R3,3</td>
                                </tr>
                            </tbody>
                        </Book.Table>
                    </Book.Section>
                    <Lipsum count={2} />
                    <Book.Table title={"A table with no head"}>
                        <tr>
                            <th>R1,1</th>
                            <th>R1,2</th>
                            <th>
                                R1,3<cite>With a footnote even</cite>
                            </th>
                        </tr>
                        <tr>
                            <td>R3,1</td>
                            <td>R3,2</td>
                            <td>R3,3</td>
                        </tr>
                        <tr>
                            <td>R3,1</td>
                            <td>R3,2</td>
                            <td>R3,3</td>
                        </tr>
                    </Book.Table>
                    <Lipsum count={2} />
                </Book.Chapter>
                <Book.Interlude title={"Some Interlude"}>
                    <Lipsum />
                </Book.Interlude>
                <Book.Chapter title={"Sprockets"}>
                    <Lipsum />
                </Book.Chapter>
                <Book.Supplemental title={"Afterwords"}>
                    <Lipsum count={2} />
                </Book.Supplemental>
                <Book.Referential title={"Glossary"}>
                    <dl>
                        <dd>Foo</dd>
                        <dt>Definition of Foo</dt>
                    </dl>
                </Book.Referential>
                <Book.Referential title={"Index"}>
                    <nav className={"idx"} id={"target-idx"}></nav>
                </Book.Referential>
            </body>
            <script>{postJS}</script>
        </html>
    );
};

export { Sample };
