export function createCardHTML(card) {
    let cardNumber = card.number
    cardNumber = cardNumber.substring(0, 4) + " " + cardNumber.substring(4, 6) + "•• •••• " + cardNumber.substring(12)
    const cardHTML = document.createElement("div")
    cardHTML.className = "card"
    cardHTML.innerHTML = `
        <span class="card__icon">
            <img src="./images/${card.paymentSystem}-icon.svg" alt="${card.paymentSystem}">
        </span>
        <span class="card__number">${cardNumber}</span>
        <span class="card__date">${card.date}</span>
    `
    return cardHTML
}

export function createAddressHTML(address, type) {
    const addressHTML = document.createElement("div")
    addressHTML.className = "address"
    addressHTML.innerHTML = `<span>${address.name}</span>`

    if(type === "pick-point") {
        const addressDescriptionHTML = document.createElement("div")
        addressDescriptionHTML.className = "address__description"
        addressDescriptionHTML.innerHTML = `
            <span class="address__star-icon"></span>
            <span class="address__rating">${address.raiting}</span>
            <span class="address__opening-hours">Ежедневно с ${address.openingHours} до ${address.closingHours}</span>
            <span class="address__type">Пункт выдачи</span>
        `
        addressHTML.getElementsByTagName("span")[0].appendChild(addressDescriptionHTML)
    }
    return addressHTML
}

export function createImageHTML(product, count) {
    const imageHTML = document.createElement("div")
    imageHTML.className = "delivery-table__img"
    const notify = count > 1 ? `<span class="delivery-table__img-notify notify">${count}</span>` : ""
    imageHTML.innerHTML = `
        <a href="${product.getLink()}" class="goods-image">
            <img src="images/${product.getImage()}.webp" alt="${product.getImageAlt()}">
        </a>
        ${notify}
    `
    return imageHTML
}