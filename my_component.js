class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this._renderId = null;
    this._controller = null;
    this.error = null;
    this.isLoaded = false;
    this._items = [];
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
    this._scheduleRender();
  }

  connectedCallback() {
    this.error = null;
    this.isLoaded = false;
    this._items = [];
    this._controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('https://api.example.com/items', {
          signal: this._controller.signal,
        });
        if (!res.ok) throw new Error(await res.text());
        const result = await res.json();
        this.isLoaded = true;
        this.items = result;
      } catch (error) {
        if (error.name === 'AbortError') return;
        this.isLoaded = true;
        this.error = error;
        this._scheduleRender();
      }
    })();
  }

  disconnectedCallback() {
    if (this._controller) {
      this._controller.abort();
      this._controller = null;
    }
    if (this._renderId) {
      cancelAnimationFrame(this._renderId);
      this._renderId = null;
    }
  }

  _scheduleRender() {
    if (!this.isConnected) return;
    if (!this._renderId) {
      this._renderId = requestAnimationFrame(() => {
        this._renderId = null;
        this.render();
      });
    }
  }

  render() {
    const { error, isLoaded, items, shadowRoot } = this;
    if (error) {
      shadowRoot.innerHTML = /* html */ `<div>Error: ${error.message}</div>`;
    } else if (!isLoaded) {
      shadowRoot.innerHTML = /* html */ `<div>Loading...</div>`;
    } else {
      shadowRoot.innerHTML = /* html */ `<ul>
${items.map((item) => `  <li>${item.name} ${item.price}</li>
`).join('')}
</ul>`;
    }
  }
}

customElements.define('my-component', MyComponent);