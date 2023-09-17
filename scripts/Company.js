export default class Company {
    constructor ({id, name, officialName, ogrn, address}) {
        this.id = id
        this.name = name
        this.officialName = officialName
        this.ogrn = ogrn
        this.address = address
    }

    getId() {
        return this.id
    }

    render() {
        const companyHTML = document.createElement("div")
        companyHTML.className = "goods-instance__company company"
        companyHTML.innerHTML = `
            ${this.name}
            <span class="goods-instance__company-info-icon"></span>
            <div class="goods-instance__company-tooltip tooltip">
                <span>${this.officialName}</span>
                <span>ОГРН: ${this.ogrn}</span>
                <span>${this.address}</span>
            </div>
        `
        return companyHTML
    }
}