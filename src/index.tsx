import { writeFile } from "fs/promises";
import { Sample } from "./books/sample";
import { Grimoire } from "./util/grimoire";

const doTheThing = async () => {
    const thing = Grimoire.render(await Sample());

    writeFile("./tmp/sample.html", thing ?? "");
};

doTheThing()
    .then(() => {
        console.log("html file generated");
    })
    .catch((e) => {
        console.error(e);
    });
