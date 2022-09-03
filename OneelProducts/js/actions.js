const d = document;
//* MENU *//
const menuMb = d.querySelector(".menu-mb");
const openMenuMb = d.querySelector(".open-menu-mb");
const closeMenuMb = d.querySelector(".close-menu-mb");

const openViewShop = d.querySelectorAll(".open-view-shop");
const shoppingCard = d.querySelector(".shopping-card");
const btnShopClose = d.querySelector(".btn-close-shop");

for (let i = 0; i < openViewShop.length; i++) {
  openViewShop[i].addEventListener("click", () => {
    shoppingCard.style.left = "0px";
  });
}
btnShopClose.addEventListener("click", () => {
  shoppingCard.style.left = "-350px";
});

openMenuMb.addEventListener("click", () => {
  menuMb.style.left = "0px";
});

closeMenuMb.addEventListener("click", () => {
  menuMb.style.left = "-280px";
});

//* SEARCH *//
const searchMb = d.querySelector(".search-mb");
const openSearchMb = d.querySelector(".open-search-mb");
const closeSearchMb = d.querySelector(".close-search-mb");
const inputSearchMb = d.querySelector(".input-search-mb");

openSearchMb.addEventListener("click", () => {
  searchMb.style.right = "0%";
  inputSearchMb.focus();
});

closeSearchMb.addEventListener("click", () => {
  searchMb.style.right = "-100%";
});
