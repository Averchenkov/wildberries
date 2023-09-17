const inputNameHTML = document.getElementById("input-name")
const inputSurnameHTML = document.getElementById("input-surname")
const inputEmailHTML = document.getElementById("input-email")
const inputPhoneNumberHTML = document.getElementById("input-phone-number")
const inputInnHTML = document.getElementById("input-inn")

document.getElementsByClassName("basket-result__button")[0].addEventListener("click", () => {
    inputValidate()
})


for (let event of ['input', 'blur']) {
    inputPhoneNumberHTML.addEventListener(event, phoneMask);
}

function phoneMask(event) {
    const input = event.target;
    const pattern = input.dataset.phonePattern
    const matrix_def = "+7 ___ ___-__-__"
    const matrix = pattern ? pattern : matrix_def
    let i = 0
    const prefix = matrix.replace(/\D/g, "")
    let number = input.value.replace(/\D/g, "");
    if (number.charAt(0) === "8") {
        number = "7" + number.slice(1);
    }

    if (prefix.length >= number.length && input.value !== "+" && input.value !== "") number = prefix;
    
    input.value = matrix.replace(/./g, function (a) {
        return (/[_\d]/.test(a) && i <number.length) ? number.charAt(i++) : i >= number.length ? "" : a
    });
}

function inputValidate() {
    try {
        validateName(inputNameHTML.value)
        removeError.call(inputNameHTML)        
    } catch (error) {
        showError.call(inputNameHTML, error)
    }

    try {
        validateSurname(inputSurnameHTML.value)
        removeError.call(inputSurnameHTML)
    } catch (error) {
        showError.call(inputSurnameHTML, error)
    }

    try {
        validateEmail(inputEmailHTML.value)
        removeError.call(inputEmailHTML)
    } catch (error) {
        showError.call(inputEmailHTML, error)
    }

    try {
        validatePhoneNumber(inputPhoneNumberHTML.value)
        removeError.call(inputPhoneNumberHTML)
    } catch (error) {
        showError.call(inputPhoneNumberHTML, error)
    }

    try {
        validateInn(inputInnHTML.value)
        removeError.call(inputInnHTML)
    } catch (error) {
        showError.call(inputInnHTML, error)
    }
}

function scroll(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

function showError(error) {
    this.nextElementSibling.nextElementSibling.textContent = error.message
    this.offsetParent.classList.add("user-input_danger")

    scroll(document.getElementsByClassName("basket-order__user")[0])

    this.addEventListener("focusout", () => inputValidate())
    this.addEventListener("keydown", (event) => {
        if (event.key === "Enter") inputValidate()
    })
}

function removeError() {
    this.offsetParent.classList.remove("user-input_danger")
    this.nextElementSibling.nextElementSibling.textContent = ""
}



function validateName(name) {
    if (name === "") throw new Error("Укажите имя")
}

function validateSurname(surname) {
    if (surname === "") {
        throw new Error("Укажите фамилию", inputSurnameHTML)
    }
}

function validateEmail(email) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email === "") 
        throw new Error("Укажите электронную почту")
    else if(!reg.test(String(email).toLowerCase())) 
        throw new Error("Проверьте адрес электронной почты")
}

function validatePhoneNumber(number) {
    const reg = /\+7 \d{3} \d{3}-\d{2}-\d{2}/
    if (number === "") 
        throw new Error("Укажите номер телефона")
    else if(!reg.test(String(number))) 
        throw new Error("Формат +9 999 999-99-99")
}

function validateInn(number) {
    const reg = /[^0-9]/
    if (number === "") 
        throw new Error("Укажите ИНН")
    else if(reg.test(String(number)) || number.length !== 14) 
        throw new Error("Проверьте ИНН")
}