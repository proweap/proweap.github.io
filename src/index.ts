
let Program = class
{
    public static main(): void
    {
        this.Element.updateParaText("Hello World from TypeScript");        
    }
    public static Element = class
    {
        public static readonly para: HTMLParagraphElement = document.getElementById("para") as HTMLParagraphElement;
        public static readonly body: HTMLBodyElement = document.getElementById("body") as HTMLBodyElement;
        public static updateParaText(text: string): void
        {
            this.para.innerText = text;
        }
    }
}

Program.main();

