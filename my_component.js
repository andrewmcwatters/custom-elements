class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.error = null;
    this.isLoaded = false;
    this.items = [];
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});

    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.items = result;
          this.render();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.isLoaded = true;
          this.error = error;
          this.render();
        }
      )
  }

  render() {
    const { error, isLoaded, items, shadowRoot } = this;
    if (error) {
      shadowRoot.innerHTML = `<div>Error: ${error.message}</div>`;
    } else if (!isLoaded) {
      shadowRoot.innerHTML = `<div>Loading...</div>`;
    } else {
      shadowRoot.innerHTML = (
        `<ul>
          ${items.map(item => (
            `<li>
              ${item.name} ${item.price}
            </li>`
          )).join('')}
        </ul>`
      );
    }
  }
}

customElements.define('my-component', MyComponent);