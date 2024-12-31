class LikeButton extends HTMLElement {
  constructor() {
    super();
    this.liked = false;
    this.attachShadow({mode: 'open'});
    this.render();
  }

  setLiked(value) {
    this.liked = value;
    this.render();
  }

  connectCallback() {
  }

  render() {
    const { liked, shadowRoot } = this;

    if (liked) {
      shadowRoot.innerHTML = 'You liked this.'
      return;
    }

    shadowRoot.innerHTML = `<button onclick="this.getRootNode().host.setLiked(true)">
  Like
</button>`;
  }
}

customElements.define('like-button', LikeButton);