declare let Program: {
    new (): {};
    main(): void;
    Element: {
        new (): {};
        readonly para: HTMLParagraphElement;
        readonly body: HTMLBodyElement;
        updateParaText(text: string): void;
    };
};
