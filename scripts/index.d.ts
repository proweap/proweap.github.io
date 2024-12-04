declare let Program: {
    new (): {};
    main(): void;
};
declare let App: {
    new (): {};
    Page: {
        new (): {};
        Para: {
            new (): {};
            readonly element: HTMLParagraphElement;
            updateText(text: string): void;
        };
        Body: {
            new (): {};
            readonly element: HTMLBodyElement;
        };
    };
};
