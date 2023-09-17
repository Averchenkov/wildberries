import { createCardHTML } from "./createDomElement.js"
import { user, render } from "./fillUser.js"
const modalPayChoiceHTML = document.getElementById("modal-pay-choice")
const cardListHTML = modalPayChoiceHTML.getElementsByClassName("radio-list")[0]
const closeBtnHTML = modalPayChoiceHTML.getElementsByClassName("modal__close-btn")[0]
const buttonHTML = modalPayChoiceHTML.getElementsByClassName("modal__button")[0]
const editPayBtnsHTML = document.getElementsByName("edit-pay")

editPayBtnsHTML.forEach(btns => btns.addEventListener("click", () => {
    openModal()
    cardListHTML.innerHTML = ""
    user.getCardList().map((card) => cardListAddItem(card))
}))

buttonHTML.addEventListener("click", () => {
    const radioList = document.getElementsByName("radio-card")
    const checkedRadio = [...radioList].find(radio => radio.checked)
    user.setSelectedCardId(checkedRadio.value)
    render()
    closeModal()
})

closeBtnHTML.addEventListener("click", closeModal)

function cardListAddItem(card) {
    const inputHTML = document.createElement("input")
    inputHTML.type = "radio"
    inputHTML.name = "radio-card"
    inputHTML.value = card.id
    const selectedCardId = user.getSelectedCardId()
    if (card.id == selectedCardId){
        inputHTML.checked = true
    }

    const cardHTML = createCardHTML(card)
    cardHTML.classList.add("card__short")

    cardListHTML.appendChild(inputHTML)
    cardListHTML.appendChild(cardHTML)
}

function openModal () {
    modalPayChoiceHTML.classList.add("modal_show")
}
function closeModal() {
    modalPayChoiceHTML.classList.remove("modal_show")
}