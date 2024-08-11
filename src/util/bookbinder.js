(() => {
    class Block extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.innerHTML = `<style>:host {display: block;}</style><slot></slot>`;
        }
    }

    class TitlePage extends Block {}
    class Interlude extends Block {}
    class Chapter extends Block {}
    class Supplemental extends Block {}
    class Referential extends Block {}

    class Author extends Block {}
    class Edition extends Block {}
    class Notes extends Block {}

    customElements.define("g-titlepage", TitlePage);
    customElements.define("g-interlude", Interlude);
    customElements.define("g-chapter", Chapter);
    customElements.define("g-supplemental", Supplemental);
    customElements.define("g-referential", Referential);

    customElements.define("b-author", Author);
    customElements.define("b-edition", Edition);

    customElements.define("p-notes", Notes);
})();
