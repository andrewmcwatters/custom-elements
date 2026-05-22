class LikeButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this._renderScheduled = false;
    this._renderId = null;
    this.handleClick = this.handleClick.bind(this);
    this._liked = false;
  }

  get liked() {
    return this._liked;
  }

  set liked(value) {
    if (this._liked === value) return;
    this._liked = value;
    this._scheduleRender();
  }

  connectedCallback() {
    this._liked = false;
    this._scheduleRender();
  }

  disconnectedCallback() {
    if (this._renderId) {
      cancelAnimationFrame(this._renderId);
      this._renderId = null;
      this._renderScheduled = false;
    }
  }

  handleClick() {
    this.liked = true;
  }

  _scheduleRender() {
    if (!this.isConnected) return;
    if (!this._renderScheduled) {
      this._renderScheduled = true;
      this._renderId = requestAnimationFrame(() => {
        this._renderScheduled = false;
        this.render();
      });
    }
  }

  render() {
    const { _liked: liked, shadowRoot } = this;

    if (liked) {
      shadowRoot.innerHTML = /* html */ 'You liked this.';
      return;
    }

    shadowRoot.innerHTML = /* html */ `<button>Like</button>`;
    shadowRoot.querySelector('button').addEventListener('click', this.handleClick);
  }
}

customElements.define('like-button', LikeButton);