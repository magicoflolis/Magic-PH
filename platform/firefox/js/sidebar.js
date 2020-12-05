import { cfg, debug } from "./core.js";
import '../libs/jquery.js';
let $ = window.$

$(".Blur").click(() => {
    cfg.blur = true;
    console.log(debug + "Blur set to " + cfg.blur);
});