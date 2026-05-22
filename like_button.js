class LikeButton extends HTMLElement {
  constructor() {
    super();
    this.liked = false;
    this.attachShadow({mode: 'open'});
  }

  setLiked(value) {
    this.liked = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { liked, shadowRoot } = this;

    if (liked) {
      shadowRoot.innerHTML = /* html */ 'You liked this.'
      return;
    }

    shadowRoot.innerHTML = /* html */ `<button onclick="this.getRootNode().host.setLiked(true)">
  Like
</button>`;
  }
}

customElements.define('like-button', LikeButton);