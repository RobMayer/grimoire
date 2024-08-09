import { writeFile } from "fs/promises";
import { Sample } from "./books/sample";
import { Grimoire } from "./util/grimoire";

const doTheThing = async () => {
    // const browser = await puppeteer.launch({ headless: true });
    // const window = await browser.newPage();

    await writeFile("./tmp/sample.html", (await (<Sample.main />)) ?? "");
    // await window.setContent(content, { waitUntil: "networkidle2" });
    // await window.goto(`file://${__dirname}/../tmp/sample.htm`, { waitUntil: "networkidle2" });
    // await window.pdf({
    //     path: "./tmp/sample.pdf",
    //     format: "letter",
    //     margin: {
    //         top: "0.25in",
    //         left: "0.25in",
    //         right: "0.25in",
    //         bottom: "0.375in",
    //     },
    //     displayHeaderFooter: true,
    //     footerTemplate: (await Sample.footer) ?? "<div />",
    //     headerTemplate: (await Sample.header) ?? "<div />",
    //     printBackground: true,
    //     outline: true,
    // });

    // await browser.close();
};

doTheThing()
    .then(() => {
        console.log("done");
    })
    .catch((e) => {
        console.error(e);
    });
