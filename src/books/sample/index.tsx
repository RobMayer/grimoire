import { readFile } from "fs/promises";
import { Grimoire, Book } from "../../util/grimoire";
import { Lipsum } from "../../widgets/lipsum";

const Sample = async () => {
    const postJS = await readFile(`${__dirname}/../../util/postprocess.js`, "utf-8");

    return (
        <html>
            <head>
                <link rel={"stylesheet"} href={`${__dirname}/assets/fonts.css`} />
                <link rel={"stylesheet"} href={`${__dirname}/assets/pages.css`} />
                <link rel={"stylesheet"} href={`${__dirname}/assets/styles.css`} />
                <link data-pagedjs-ignore rel={"stylesheet"} href={`${__dirname}/assets/post.css`} />

                <script src={"./paged.polyfill.min.js"}></script>
                <title>Style Document Test</title>
            </head>
            <body>
                <hgroup>
                    <h1>PME Standards</h1>
                    <p>Volume I</p>
                    <div data-book-author>ThatRobHuman</div>
                    <div data-book-edition>v1.0</div>
                </hgroup>
                <Book.Referential title={"Table of Contents"}>
                    <nav className={"toc"} id={"target-toc"}></nav>
                </Book.Referential>
                <Book.Referential title={"Figures and Tables"}>
                    <nav className={"tof"} id={"target-tof"}></nav>
                </Book.Referential>
                <Book.Supplemental title={"Preface"}>
                    <p>This is a thing</p>
                    <Lipsum />
                    <Book.Section title={"Why"}>This is a subsection</Book.Section>
                    <Lipsum />
                    <Lipsum />
                </Book.Supplemental>
                <Book.Chapter title={"Format"}>
                    <p>
                        This is a <dfn data-index-term="chicken,roasted|popcorn">test</dfn> paragraph{" "}
                        <cite>
                            With a <dfn data-index-term="chicken,roasted|popcorn">Fooote</dfn>
                        </cite>
                    </p>
                    <Lipsum />
                    <Book.Section title={"Another"}>Subsection </Book.Section>
                    <Book.Figure title={"Test Figure"}>
                        Something With a thing <cite>With its own footnote</cite>
                    </Book.Figure>
                </Book.Chapter>
                <Book.Interlude title={"A Short Story"}>Some Interlude</Book.Interlude>
                <Book.Chapter title={"Sprockets"}>
                    <p>
                        A thing about sprockets <dfn data-index-term="chicken,roasted|popcorn">test</dfn>
                    </p>
                </Book.Chapter>
                <Book.Supplemental title={"Afterwords"}></Book.Supplemental>
                <Book.Referential title={"Glossary"}>Test Entry</Book.Referential>
                <Book.Referential title={"Index"}>
                    <nav className={"idx"} id={"target-idx"}></nav>
                </Book.Referential>
            </body>
            <script>{postJS}</script>
        </html>
    );
};

export { Sample };
