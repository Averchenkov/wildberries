import { basket, priceFormat } from "./fillBasket.js";

const accordionButtonContol = [...document.getElementsByClassName("basket-goods__control-button")]

accordionButtonContol.forEach(header => header.addEventListener("click", function() {
    this.classList.toggle("basket-goods__control-button_hidden");
    const accordionContent = this.parentElement.nextElementSibling;
    accordionContent.classList.toggle("goods-list_hidden")
    if (this.classList.contains("basket-goods__control-button_hidden")){
        accordionContent.style.maxHeight = 0;
    } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    }
}))

accordionButtonContol[0].addEventListener("click", function() {
    const briefInformation = this.previousElementSibling
    console.dir(this);
    if (this.classList.contains("basket-goods__control-button_hidden")){
        briefInformation.textContent = `${basket.totalCount} товаров · ${priceFormat(basket.totalPrice)} сом`
    } else {
        briefInformation.textContent = ""
    }
})
  