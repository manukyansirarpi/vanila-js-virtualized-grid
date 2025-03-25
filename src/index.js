import { fetchPhotos } from "./api.js";
import VirtualList from "./virtual-list.js";

const ImageVirtualList = new VirtualList(document.getElementById("main"));
ImageVirtualList.render();
