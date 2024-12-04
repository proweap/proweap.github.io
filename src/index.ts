
let Program = class
{
    public static main(): void
    {
        App.Page.Para.updateText("Hello, World!");       
    }
}

let App = class
{
    public static Page = class
    {
        public static Para = class
        {
            public static readonly element: HTMLParagraphElement = document.getElementById("para") as HTMLParagraphElement;
            public static updateText(text: string): void
            {
                this.element.innerText = text;
            }
        }
        public static Body = class
        {
            public static readonly element: HTMLBodyElement = document.getElementById("body") as HTMLBodyElement;
        }
    }
}

Program.main();

