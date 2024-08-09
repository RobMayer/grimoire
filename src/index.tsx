import { writeFile } from "fs/promises";
import { Sample } from "./books/sample";
import { Grimoire } from "./util/grimoire";

const doTheThing = async () => {
    writeFile("./tmp/sample.html", (await (<Sample />)) ?? "");
};

doTheThing()
    .then(() => {
        console.log("html file generated");
    })
    .catch((e) => {
        console.error(e);
    });
