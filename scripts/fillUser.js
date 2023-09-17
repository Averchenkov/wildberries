import User from "./User.js"
import { createAddressHTML, createCardHTML } from "./createDomElement.js"
import readJSON from "./readJson.js"

const inputNameHTML = document.getElementById("input-name")
const inputSurnameHTML = document.getElementById("input-surname")
const inputEmailHTML = document.getElementById("input-email")
const inputPhoneNumberHTML = document.getElementById("input-phone-number")
const inputInnHTML = document.getElementById("input-inn")

export const user = new User()

inputNameHTML.addEventListener("focusout", (event) => user.setName(event.target.value)) 
inputSurnameHTML.addEventListener("focusout", (event) => user.setSurname(event.target.value)) 
inputEmailHTML.addEventListener("focusout", (event) => user.setEmail(event.target.value)) 
inputPhoneNumberHTML.addEventListener("focusout", (event) => user.setPhoneNumber(event.target.value)) 
inputInnHTML.addEventListener("focusout", (event) => user.setInn(event.target.value)) 

fillUser()

async function fillUser() {
    await readJSON("./pickPointAddresses.json").then(addressList => {
        user.setPickPointAddressList(addressList)
    })
    await readJSON("./userAddresses.json").then(addressList => {
        user.setPersonalAddressList(addressList)
    })
    await readJSON("./cards.json").then(cardList => {
        user.setCardList(cardList)
    })
    
    
    user.setSelectedAddress({ id: 2, type: "pick-point" })
    user.setSelectedCardId(0)
    render()
}

export function render() {
    const selectedAdrressHTML = createAddressHTML(user.selectedAddress, user.getSelectedAddressType())
    const orderAddressHTML = document.getElementById("order-address")
    const resultAddressHTML = document.getElementById("result-address")

    orderAddressHTML.innerHTML = selectedAdrressHTML.innerHTML
    resultAddressHTML.textContent = user.selectedAddress.name

    const selectedCardHTML = createCardHTML(user.selectedCard)
    const cardsHTML = [...document.getElementsByTagName("main")[0].getElementsByClassName("card")]
    cardsHTML.forEach(cardHTML => {
        cardHTML.innerHTML = selectedCardHTML.innerHTML
    });
}
