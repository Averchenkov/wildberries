import Basket from "./Basket.js";
import Company from "./Company.js";
import Product from "./Product.js"
import { createImageHTML } from "./createDomElement.js";
import readJSON from "./readJson.js"

const checkboxAllIncludedHTML = document.getElementsByClassName("checkbox_all-included")[0]
const toalPriceHTML = document.getElementById("total-price")
const totalPriceWithoutSaleHTML = document.getElementById("total-price-without-sale")
const totalSaleHTML = document.getElementById("total-sale")
const totalCountHTML = document.getElementById("total-count")
const deliveryTableHTML = document.getElementsByClassName("delivery-table")[0]
const checkboxChoicePaymentHTML = document.getElementById("payment-choice")
const orderBtnHTML = document.getElementById("order-button")

export const basket = new Basket()

fillBasket()

async function fillBasket() {
    await readJSON("products.json").then(productList => {
        productList.forEach(product => {
            const productItem = new Product(product)
            basket.addProduct(productItem)
        });
    })
    
    await readJSON("companies.json").then(companyList => {
        companyList.forEach(company => {
            const companyItem = new Company(company)
            basket.addCompany(companyItem)
        });
    })
    basket.setCountProduct(1, 200)
    basket.setCountProduct(2, 2)

    renderPresenceProductList()
    renderAbsentProductList()
} 

checkboxAllIncludedHTML.addEventListener("click", (event) => {
    const checkboxHTML = event.currentTarget
    const stateClassName = "checkbox_selected"
    if(checkboxHTML.classList.contains(stateClassName)) {
        basket.unselectProductAll()
        checkboxHTML.classList.remove(stateClassName)
    } else {
        basket.selectProductAll()
        checkboxHTML.classList.add(stateClassName)
    }
    renderPresenceProductList()
    event.preventDefault()
})

checkboxChoicePaymentHTML.addEventListener("click", (event) => {
    const checkboxHTML = event.currentTarget
    const stateClassName = "checkbox_selected"
    if(checkboxHTML.classList.contains(stateClassName)) {
        orderBtnHTML.textContent = "Заказать"
        checkboxHTML.classList.remove(stateClassName)
    } else {
        orderBtnHTML.textContent = `Оплатить ${priceFormat(basket.totalPrice)} сом`
        checkboxHTML.classList.add(stateClassName)
    }
    event.preventDefault()
})

function renderAbsentProductList() {
    const listHTML = document.getElementById("product-list-absent")
    listHTML.innerHTML = ""
    const absentroductListHTML = basket.renderAbsentProductList()
    listHTML.innerHTML = absentroductListHTML.innerHTML
    listHTML.style.maxHeight = listHTML.scrollHeight + "px"

    const countAbsentProductHTML = document.getElementsByClassName("basket-goods__absent-title-data")[0]
    countAbsentProductHTML.textContent = basket.absentProductListSize
    

    const allDeleteBtns = [...listHTML.getElementsByClassName("buttons-like-and-delete__delete")]
    allDeleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("name");
            basket.deleteProduct(productId)
            renderAbsentProductList()
        })
    })
}

function changeResultBasket() {
    toalPriceHTML.textContent = priceFormat(basket.totalPrice)
    totalPriceWithoutSaleHTML.textContent = priceFormat(basket.totalPriceWithoutSale)
    totalSaleHTML.textContent = "- " + priceFormat(basket.totalSale)
    totalCountHTML.textContent = priceFormat(basket.totalCount)
    if (checkboxChoicePaymentHTML.classList.contains("checkbox_selected")) {
        orderBtnHTML.textContent = `Оплатить ${priceFormat(basket.totalPrice)} сом`
    }
}

function fillDeliveryTable() {
    const deliveryProductGroupMap = basket.getDeliveryProductGroupMap()
    const removeElements = [...document.getElementsByClassName("delivery-table__product-group")]
    removeElements.forEach(elemnt => elemnt.remove())

    deliveryProductGroupMap.forEach((deliveryProductGroupList, date) => {
        const dateHTML = document.createElement("div")
        dateHTML.className = "delivery-table__item delivery-table__product-group"
        const dateText = new Date(date).toLocaleString('ru', {day: "numeric", month:'long'})
        dateHTML.textContent = dateAddReserveDay(dateText)

        const imageListHTML = document.createElement("div")
        imageListHTML.className = "delivery-table__item delivery-table__product-group delivery-table__image-list"
        deliveryProductGroupList.forEach(deliveryGroup => {
            const product = basket.getProductForId(deliveryGroup.productId)
            const imageHTML = createImageHTML(product, deliveryGroup.count)
            imageListHTML.appendChild(imageHTML)
        })

        deliveryTableHTML.appendChild(dateHTML)
        deliveryTableHTML.appendChild(imageListHTML)
    })

    const firstDate = new Date([...deliveryProductGroupMap.keys()][0])
    const lastDate = new Date([...deliveryProductGroupMap.keys()].slice(-1)[0])
    let dateInterval = ""
    
    if (firstDate.getMonth() === lastDate.getMonth()) {
        dateInterval = firstDate.getDate() + "-" + Number(lastDate.getDate() + 1) + " " + new Date(firstDate).toLocaleString('ru', {month:'short'})
    } else {
        dateInterval = new Date(firstDate).toLocaleString('ru', {day: "numeric", month:'short'}) + " - " + new Date(lastDate).toLocaleString('ru', {day: "numeric", month:'short'}) 
    }
    
    const dateIntervalHTML = document.getElementById("date-interval")
    dateIntervalHTML.textContent = !!deliveryProductGroupMap.size ? dateInterval : ""
}

function renderPresenceProductList() {
    const listHTML = document.getElementById("product-list-presence")
    listHTML.innerHTML = ""
    const presenceProductListHTML = basket.renderPresenceProductList()
    listHTML.innerHTML = presenceProductListHTML.innerHTML
    listHTML.style.maxHeight = listHTML.scrollHeight + "px"


    changeResultBasket()
    fillDeliveryTable()
    
    const allCheckboxes = [...listHTML.getElementsByClassName("checkbox")]
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("name");
            basket.selectProductChange(productId)
            renderPresenceProductList()
            event.preventDefault()
        })
    })

    const allDeleteBtns = [...listHTML.getElementsByClassName("buttons-like-and-delete__delete")]
    allDeleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("name");
            basket.deleteProduct(productId)
            renderPresenceProductList()
        })
    })

    const allMinusBtns = [...listHTML.getElementsByClassName("counter__minus-icon")]
    allMinusBtns.forEach(minusBtn => {
        minusBtn.addEventListener("click", (event) => {
            const productId = event.currentTarget.parentElement.getAttribute("name");
            basket.decreaseProductCount(productId)
            renderPresenceProductList()
        })
    })

    const allPlusBtns = [...listHTML.getElementsByClassName("counter__plus-icon")]
    allPlusBtns.forEach(plusBtn => {
        plusBtn.addEventListener("click", (event) => {
            const productId = event.currentTarget.parentElement.getAttribute("name");
            basket.increaseProductCount(productId)
            renderPresenceProductList()
        })
    })
}

function dateAddReserveDay(dateText) {
    const dateSplited = dateText.split(" ")
    dateSplited[0] = `${dateSplited[0]} - ${Number(dateSplited[0]) + 1}`
    return dateSplited.join(" ")
}

export function priceFormat(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function sortForDate (a, b) {
    let da = new Date(a.date)
    let db = new Date(b.date)
    return da - db;
}