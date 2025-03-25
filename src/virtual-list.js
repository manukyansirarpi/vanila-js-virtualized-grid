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

  render() {
    const observer = new IntersectionObserver((entries, observer) => {
      this.renderList(this.page++);
    });
    const target = this.root.querySelector("#bottom-observer");

    observer.observe(target);
  }
}

export default VirtualList;
