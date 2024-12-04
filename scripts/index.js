"use strict";
let Program = class {
    static main() {
        App.Page.Para.updateText("Hello, World!");
    }
};
let App = class {
    static Page = class {
        static Para = class {
            static element = document.getElementById("para");
            static updateText(text) {
                this.element.innerText = text;
            }
        };
        static Body = class {
            static element = document.getElementById("body");
        };
    };
};
Program.main();
