#!/usr/bin/env -S node

import chalk from "chalk";
import marked from "marked";
import toHtml from "./to-html.js";

const md = `
Line1 //
Line2

Line1 //
Line 2

---

Line1,
Line2

Line1,
Line2 [Link1]

[Link1]: https://example.com
`.trim();

const html = marked(md);
console.log(chalk.red(html));
const result = toHtml(html);
console.log(chalk.green(result));
console.log(typeof result);
