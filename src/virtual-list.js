import { fetchPhotos } from "./api.js";

class VirtualList {
  constructor(root) {
    this.root = root;
    this.page = 1;
    this.template = document.querySelector("#card_template");
    this.fragment = new DocumentFragment();
  }

  createCardElement(data, element) {
    const [cardBodyImage, cardTitle] = element.querySelectorAll(
      ".card__body__image, .card__body__title"
    );
    cardTitle.textContent = data.alt_description;
    cardBodyImage.setAttribute("src", data.urls.small);
    return element;
  }

  async renderList(page) {
    const data = await fetchPhotos(page);
    for (let i = 0; i < data.length; i++) {
      const imageData = data[i];
      const card = this.template.content.cloneNode(true).firstElementChild;
      const cardElement = this.createCardElement(imageData, card);
      this.fragment.appendChild(cardElement);
    }
    this.root.querySelector("#virtual-list").appendChild(this.fragment);
  }

  handleBottomIntersection() {
    this.renderList(this.page++);
  }
  handleTopIntersection() {
    console.log("handle top intersection");
  }

  handleIntersections = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (entry.target.id == "bottom-observer") {
          this.handleBottomIntersection();
        } else if (entry.target.id == "top-observer") {
          this.handleTopIntersection();
        }
      }
    }
  };

  #effect() {
    const observer = new IntersectionObserver(this.handleIntersections, {
      threshold: 0.1,
    });
    observer.observe(this.root.querySelector("#bottom-observer"));
    observer.observe(this.root.querySelector("#top-observer"));
  }

  toHTML() {
    return `<div id="container">
        <div id="top-observer">start..</div>
        <div id="virtual-list"></div>
        <div id="bottom-observer">loading..</div>
      </div>`.trim();
  }

  render() {
    this.root.innerHTML = this.toHTML();
    this.#effect();
  }
}

export default VirtualList;
