export default class User {
    constructor() {
        this.name = ""
        this.surName = ""
        this.email = ""
        this.phoneNumber = ""
        this.inn = ""
        this.pickPointAddressList = []
        this.personalAddressList = []
        this.cardList = []
        this.selectedCardId
        this.selectedAddressId
        this.selectedAddressType
    }

    getSelectedAddressId() {
        return this.selectedAddressId
    }
    getSelectedAddressType() {
        return this.selectedAddressType
    }
    getSelectedCardId() {
        return this.selectedCardId
    }

    setName(name) {
        this.name = this.name
    }
    setName(surName) {
        this.surName = this.surName
    }
    setName(email) {
        this.email = this.email
    }
    setName(phoneNumber) {
        this.phoneNumber = this.phoneNumber
    }
    setName(inn) {
        this.inn = this.inn
    }
    setSelectedCardId(id) {
        this.selectedCardId = id
    }
    setSelectedAddress({id, type}) {
        this.selectedAddressId = id
        this.selectedAddressType = type
    }
    setPickPointAddressList(addressList) {
        this.pickPointAddressList = addressList
    }
    setPersonalAddressList(addressList) {
        this.personalAddressList = addressList
    }
    setCardList(cardList) {
        this.cardList = cardList
    }

    get selectedAddress() {
        return this.getAddressList(this.selectedAddressType).find(address => address.id == this.selectedAddressId)
    }

    get selectedCard() {
        return this.cardList.find(card => card.id == this.selectedCardId)
    }

    getAddressList(addressType) {
        return addressType === "pick-point" ? this.pickPointAddressList : this.personalAddressList
    }
    getCardList() {
        return this.cardList
    }
    addressListDeleteItem(addressType, deleteItemId) {
        if (this.getAddressList(addressType).length <= 1) return
        if (addressType === this.selectedAddressType && deleteItemId ===this.selectedAddressId) {
            this.selectedAddressId = this.getAddressList(addressType)[0].id
        }
        if (addressType === "pick-point") {
            this.pickPointAddressList = this.pickPointAddressList.filter(address => address.id !== deleteItemId)
        } else {
            this.personalAddressList = this.personalAddressList.filter(address => address.id !== deleteItemId)
        }
    }
}