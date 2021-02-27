import gallery from "./gallery-items.js";
//----------------------- REFERANCES------------------------//
const refs = {
  galleryList: document.querySelector("ul.js-gallery"),
  modal: document.querySelector("div.js-lightbox"),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector("div.lightbox__overlay"),
  largeImageModalRef: document.querySelector("img.lightbox__image")
};

//----------------------- LISTENERS ------------------------//
refs.galleryList.addEventListener("click", handleItemGallery);
refs.btnClose.addEventListener("click", handleCloseModal);
refs.overlay.addEventListener("click", handleCloseModal);

//----------------------- FUNCTIONS ------------------------//
const makeGalleryItems = items => {
  let dataIndex = 0;
  const createItems = items
    .reduce((acc, item) => {
      acc.push(
        `<li class='gallery__item'><a class='gallery__link' href='${item.original}'><img class='gallery__image' src='${item.preview}' data-source='${item.original}' data-index='${dataIndex}' alt='${item.description}'></a></li>`
      );
      dataIndex++;
      return acc;
    }, [])
    .join("");
  return createItems;
};

const addGalleryItems = gallery => {
  refs.galleryList.insertAdjacentHTML("beforeend", makeGalleryItems(gallery));
};

addGalleryItems(gallery);

function handleItemGallery(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const largeImageRef = event.target.dataset.source;
  const altImageRef = event.target.alt;
  const dataIndexRef = event.target.dataset.index;

  openModal(largeImageRef, altImageRef, dataIndexRef);
}

function openModal(src, alt, index) {
  refs.modal.classList.add("is-open");
  const currentImage = refs.largeImageModalRef;
  currentImage.src = src;
  currentImage.alt = alt;
  currentImage.dataset.index = index;

  window.addEventListener("keydown", event => handleKeyDownOnModal(event));
}

function handleCloseModal() {
  refs.modal.classList.remove("is-open");
  const largeImageModalRef = refs.modal.querySelector("img.lightbox__image");
  largeImageModalRef.src = "";
}

function handleKeyDownOnModal(event) {
  event.preventDefault();
  if (!refs.modal.classList.contains("is-open")) return;
  console.log(event.code);
  if (event.code === "Escape") return handleCloseModal();

  if (event.code === "ArrowRight") return handleArrowRightOnModal();

  if (event.code === "ArrowLeft") return handleArrowLeftOnModal();
}

function handleArrowRightOnModal() {
  const galleryItemsRef = document.querySelectorAll("img.gallery__image");
  if (+refs.largeImageModalRef.dataset.index === galleryItemsRef.length - 1) {
    refs.largeImageModalRef.src = galleryItemsRef[0].dataset.source;
    refs.largeImageModalRef.alt = galleryItemsRef[0].alt;
    refs.largeImageModalRef.dataset.index = 0;
  } else {
    refs.largeImageModalRef.src =
      galleryItemsRef[
        +refs.largeImageModalRef.dataset.index + 1
      ].dataset.source;
    refs.largeImageModalRef.alt =
      galleryItemsRef[+refs.largeImageModalRef.dataset.index + 1].alt;
    refs.largeImageModalRef.dataset.index =
      +refs.largeImageModalRef.dataset.index + 1;
  }
}

function handleArrowLeftOnModal() {
  const galleryItemsRef = document.querySelectorAll("img.gallery__image");
  if (+refs.largeImageModalRef.dataset.index === 0) {
    refs.largeImageModalRef.src =
      galleryItemsRef[+galleryItemsRef.length - 1].dataset.source;
    refs.largeImageModalRef.alt =
      galleryItemsRef[+galleryItemsRef.length - 1].alt;
    refs.largeImageModalRef.dataset.index =
      galleryItemsRef[+galleryItemsRef.length - 1].dataset.index;
  } else {
    refs.largeImageModalRef.src =
      galleryItemsRef[
        +refs.largeImageModalRef.dataset.index - 1
      ].dataset.source;
    refs.largeImageModalRef.alt =
      galleryItemsRef[+refs.largeImageModalRef.dataset.index - 1].alt;
    refs.largeImageModalRef.dataset.index =
      +refs.largeImageModalRef.dataset.index - 1;
  }
}
