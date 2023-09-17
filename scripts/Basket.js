import { sortForDate } from "./fillBasket.js"

export default class Basket {
    productList = []
    companyList = []

    addProduct(product) {
        this.productList.push(product)
    }
    addCompany(company) {
        this.companyList.push(company)
    }

    get presenceProductList() {
        return this.productList.filter(product => product.getIsPresence())
    }
    get absentProductList() {
        return this.productList.filter(product => !product.getIsPresence())
    }
    get selectedProductList() {
        return this.productList.filter(product => product.getIsPresence() && product.getIsSelected())
    }
    get absentProductListSize() {
        return this.absentProductList.length
    }

    get totalPrice() {
        return this.selectedProductList.reduce((total, product) => total + product.totalPrice, 0)
    }
    get totalSale() {
        return this.selectedProductList.reduce((total, product) => total + product.totalSale, 0)
    }
    get totalPriceWithoutSale() {
        return this.selectedProductList.reduce((total, product) => total + product.totalPriceWithoutSale, 0)
    }
    get totalCount() {
        return this.selectedProductList.reduce((total, product) => total + product.totalCount, 0)
    }

    setCountProduct(productId, count) {
        this.getProductForId(productId).setCount(count)
    }

    getCompanyForId(id) {
        return this.companyList.find(company => company.getId() == id)
    }
    getProductForId(id) {
        return this.productList.find(product => product.getId() == id)
    }
    deleteProduct(id) {
        this.productList = this.productList.filter(product => product.getId() != id)
    }

    selectProductChange(productId) {
        this.getProductForId(productId).selectChange()
    }
    selectProductAll() {
        this.productList.forEach(product => product.select())
    }
    unselectProductAll() {
        this.productList.forEach(product => product.unselect())
    }

    decreaseProductCount(productId) {
        this.getProductForId(productId).decreaseCount()
    }
    increaseProductCount(productId) {
        this.getProductForId(productId).increaseCount()
    }

    getDeliveryProductGroupMap() {
        let deliveryProductGroupList = []
        this.selectedProductList.forEach(product => {
            deliveryProductGroupList = [...deliveryProductGroupList, ...product.getDeliveryProductGroupList()]
        })
        const uniqueDateList = new Set()
        deliveryProductGroupList.forEach(productGroup => uniqueDateList.add(productGroup.date))
        const deliveryProductGroupMap = new Map()
        uniqueDateList.forEach(uniqueDate => {
            const list = deliveryProductGroupList.filter(productGroup => productGroup.date === uniqueDate)
            deliveryProductGroupMap.set(uniqueDate, list)
        })
        return deliveryProductGroupMap
    }

    renderPresenceProductList() {
        return this.renderProductList(this.presenceProductList)
    }
    renderAbsentProductList() {
        return this.renderProductList(this.absentProductList)
    }

    renderProductList(productList) {
        const productListHTML = document.createElement("div")
        productListHTML.className = "goods-list"

        productList.forEach(product => {
            const companyId = product.getCompanyId()
            const company = this.getCompanyForId(companyId)
            
            const companyHTML = company.render()
            const productHTML = product.render(companyHTML)
            productListHTML.appendChild(productHTML)
        });

        return productListHTML
    }
}