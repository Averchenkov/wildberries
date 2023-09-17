import { createAddressHTML } from "./createDomElement.js"
import { render, user } from "./fillUser.js"
const modalDeliveryChoiceHTML = document.getElementById("modal-delivery-choice")
const delveryTypeBtnsHTML = [...document.getElementsByClassName("modal__delivery-type")]
const addressListHTML = modalDeliveryChoiceHTML.getElementsByClassName("radio-list")[0]
const closeBtnHTML = modalDeliveryChoiceHTML.getElementsByClassName("modal__close-btn")[0]
const buttonHTML = modalDeliveryChoiceHTML.getElementsByClassName("modal__button")[0]
const editDeliveryBtnsHTML = document.getElementsByName("edit-delivery")
let addressType = null

editDeliveryBtnsHTML.forEach(btns => btns.addEventListener("click", () => {
    addressType = user.getSelectedAddressType()
    deliveryTypeBtnsChange()
    openModal()
    addressListFill()
}))

delveryTypeBtnsHTML.forEach(btn => btn.addEventListener("click", (event) => {
    addressType = event.target.value
    deliveryTypeBtnsChange()
    addressListFill()
}))

buttonHTML.addEventListener("click", () => {
    const radioList = [...document.getElementsByName("radio-address")]
    const checkedRadio = radioList.find(radio => radio.checked)
    user.setSelectedAddress({
        id: checkedRadio.value,
        type: addressType
    })
    render()
    closeModal()
})

closeBtnHTML.addEventListener("click", closeModal)

function addressListFill() {
    addressListHTML.innerHTML = ""
    user.getAddressList(addressType).map((address) => addressListAddItem(address))
}

function deliveryTypeBtnsChange() {
    delveryTypeBtnsHTML.forEach(btn => {
        if(btn.value === addressType) btn.classList.add("modal__delivery-type_select")
        else btn.classList.remove("modal__delivery-type_select")
    })
}

function addressListAddItem(address) {
    const inputHTML = document.createElement("input")
    inputHTML.type = "radio"
    inputHTML.name = "radio-address"
    inputHTML.value = address.id
    const selectedAddressId = user.getSelectedAddressId()
    if (address.id == selectedAddressId && addressType === user.getSelectedAddressType()){
        inputHTML.checked = true
    }

    const adrressHTML = createAddressHTML(address, addressType)
    adrressHTML.classList.add("address_in-modal")

    const deleteBtnHTML = document.createElement("span")
    deleteBtnHTML.className = "radio-list__delete-btn"
    deleteBtnHTML.value = address.id
    deleteBtnHTML.addEventListener("click", (event) => {
        user.addressListDeleteItem(addressType, event.target.value)
        addressListFill()
    })

    addressListHTML.appendChild(inputHTML)
    addressListHTML.appendChild(adrressHTML)
    addressListHTML.appendChild(deleteBtnHTML)
}

function openModal () {
    modalDeliveryChoiceHTML.classList.add("modal_show")
}
function closeModal() {
    modalDeliveryChoiceHTML.classList.remove("modal_show")
}