import { writeFile } from "fs/promises";
import { Sample } from "./books/sample";
import { Grimoire } from "./util/grimoire";

writeFile("./tmp/sample.html", (await (<Sample />)) ?? "")
    .then(() => {
        console.log("html file generated");
    })
    .catch((e) => {
        console.error(e);
    });
