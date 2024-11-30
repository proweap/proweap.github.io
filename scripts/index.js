"use strict";
let Program = class {
    static main() {
        this.Element.updateParaText("Hello World from TypeScript");
    }
    static Element = class {
        static para = document.getElementById("para");
        static body = document.getElementById("body");
        static updateParaText(text) {
            this.para.innerText = text;
        }
    };
};
Program.main();
