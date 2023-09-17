import { priceFormat, sortForDate } from "./fillBasket.js"

export default class Product {
    constructor({id, img, imgAlt, name, color = null, size = null, store, companyId, isPresence, isSelected = false, limitCount, price, sale, link, deliveryLimitList}) {
        this.id = id
        this.img = img
        this.imgAlt = imgAlt
        this.name = name
        this.color = color
        this.size = size
        this.store = store
        this.companyId = companyId
        this.isPresence = isPresence   
        this.count = 1
        this.isSelected = isSelected,
        this.limitCount = limitCount,
        this.price = price,
        this.sale = sale,
        this.link = link
        this.deliveryLimitList = deliveryLimitList
    }

    getIsPresence() {
        return this.isPresence
    }
    getIsSelected() {
        return this.isSelected
    }
    getCompanyId() {
        return this.companyId
    }
    getId() {
        return this.id
    }
    getLink() {
        return this.link
    }
    getImage() {
        return this.img
    }
    getImageAlt() {
        return this.imgAlt
    }

    selectChange() {
        this.isSelected = !this.isSelected
    }
    select() {
        this.isSelected = true
    }
    unselect() {
        this.isSelected = false
    }
    setCount(count) {
        if (this.count + count <= this.limitCount) this.count = count
    }
    increaseCount() {
        if (this.count + 1 <= this.limitCount) this.count++
    }
    decreaseCount() {
        if (this.count !== 1) this.count--
    }

    get leftCount() {
        return this.limitCount - this.count
    }
    get totalPrice() {
        return this.price * this.count
    }
    get totalSale() {
        return this.sale * this.count
    }
    get totalPriceWithoutSale() {
        return this.totalPrice + this.sale * this.count
    }
    get totalCount() {
        return this.count
    }

    getDeliveryProductGroupList() {
        const deliveryLimitList = this.deliveryLimitList.sort(sortForDate)
        const deliveryProductGroupList = []
        deliveryLimitList.reduce((leftCount, delveryLimit) => {
            if (leftCount === 0) return 0
            else if (leftCount > delveryLimit.maxCount) {
                deliveryProductGroupList.push({
                    productId: this.id,
                    date: delveryLimit.date,
                    count: delveryLimit.maxCount
                })
                return leftCount - delveryLimit.maxCount
            } else {
                deliveryProductGroupList.push({
                    productId: this.id,
                    date: delveryLimit.date,
                    count: leftCount
                })
                return 0
            }
        }, this.count)
        return deliveryProductGroupList
    }

    putCheckboxSelected() {
        return this.isSelected ? "checkbox_selected" : ""
    }
    putMinusCounterDisable() {
        return this.count === 1 ? "disabled" : ""
    }
    putPlusCounterDisable() {
        return this.count === this.limitCount ? "disabled" : ""
    }
    putLargeTotalPrice() {
        return (String(this.totalPrice).length >= 7) ? "goods-instance__price-new_large" : ""
    }
    renderProperties() {
        if(!this.color && !this.size) return ""
        const colorHTML = this.color ? `<span class="goods-instance__color">Цвет: ${this.color}</span>` : ""
        const sizeHTML = this.size ? `<span class="goods-instance__size">Размер: ${this.size}</span>` : ""
        return `
            <div class="goods-instance__properties">
                ${colorHTML}
                ${sizeHTML}
            </div>
        `
    }
    renderRemainingQuantity() {
        if (this.leftCount > 10) return ""
        return `
            <span class="goods-instance__remaining-quantity">
                Осталось <span class="goods-instance__remaining-quantity-data">${this.leftCount}</span> шт.
            </span>
        `
    }
    renderMobileSize() {
        if (!this.size) return ""
        return `
            <div class="goods-instance__mobile-size">
                <div>${this.size}</div>
            </div>
        `
    }

    render(companyHTML) {
        const productHTML = document.createElement("div")
        productHTML.className = "goods-list__item goods-instance"
        if (!this.isPresence) productHTML.classList.add("goods-instance_absent")
        productHTML.innerHTML = `
            <div class="goods-instance__checkbox-and-img">
                <label name=${this.id} class="goods-instance__checkbox checkbox ${this.putCheckboxSelected()}">
                <input type="checkbox">
                <span class="checkbox__decor"><span></span></span>
                <span class="checkbox__text"></span>
                </label>
                <a href="${this.link}" target="_blank" class="goods-instance__img goods-image">
                    <img src="images/${this.img}.webp" alt="${this.imgAlt}">
                </a>
                ${this.renderMobileSize()}
            </div>
            <div class="goods-instance__info">
                <a href="${this.link}" target="_blank" class="goods-instance__name">${this.name}</a>
                ${this.renderProperties()}
                <span class="goods-instance__store">${this.store}</span>
                ${companyHTML.outerHTML}
            </div>
            <div class="goods-instance__control-panel">
                <div name=${this.id} class="goods-instance__counter counter">
                    <button class="counter__button counter__minus-icon" ${this.putMinusCounterDisable()}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0996 12.8242H7.91992V11.5156H17.0996V12.8242Z"/>
                        </svg>
                    </button>
                    <span class="counter__total">${this.count}</span>
                    <button class="counter__button counter__plus-icon" ${this.putPlusCounterDisable()}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0996 12.8242H13.1543V16.7598H11.8555V12.8242H7.91992V11.5156H11.8555V7.58008H13.1543V11.5156H17.0996V12.8242Z"/>
                        </svg>                          
                    </button>
                </div>
                ${this.renderRemainingQuantity()}
                <div class="goods-instance__control-btns buttons-like-and-delete">
                    <button class="buttons-like-and-delete__like"><span></span></button>
                    <button name=${this.id} class="buttons-like-and-delete__delete"><span></span></button>
                </div>
            </div>
            <div class="goods-instance__price">
                <div class="goods-instance__price-new ${this.putLargeTotalPrice()}"><span>${priceFormat(this.totalPrice)}</span> сом</div>
                <div class="goods-instance__price-old">${priceFormat(this.totalPriceWithoutSale)} сом</div>
                <div class="goods-instance__discount-tooltip tooltip">
                    <div>
                        <span>Скидка 55%</span>
                        <span>−300 сом</span>
                    </div>
                    <div>
                        <span>Скидка покупателя 10%</span>
                        <span>−30 сом</span>
                    </div>
                </div>
            
            </div>
        `
        return productHTML
    }
}