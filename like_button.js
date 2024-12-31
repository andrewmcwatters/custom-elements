// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
// Create a class for the element
class LikeButton extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.liked = false;

    // Create a shadow root
    /* const shadow = */ this.attachShadow({mode: 'open'});
    this.render();
  }

  setLiked(value) {
    this.liked = value;
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;

    if (this.liked) {
      shadow.innerHTML = 'You liked this.'
      return;
    }

    shadow.innerHTML = `<button onclick="this.parentNode.host.setLiked(true)">
  Like
</button>`;
  }
}

// Define the new element
customElements.define('like-button', LikeButton);