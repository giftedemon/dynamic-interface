const dropDownButton = document.querySelector(".drop-down__button");
const dropDownMenu = document.querySelector(".drop-down__menu");

const carouselSlide = document.querySelector(".carousel__slide");
const slideImages = document.querySelectorAll(".slide-image");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const slider = document.querySelector(".slider");

let currentSlide = 0;
let slidesLength = slideImages.length;
let timer;

dropDownButton.addEventListener("click", () => {
    dropDownMenu.classList.toggle("hidden");
});

leftArrow.addEventListener("click", () => {
    slideImages[currentSlide].classList.add("hidden");

    if (currentSlide === 0) {
        currentSlide = slidesLength - 1;
    } else {
        currentSlide--;
    }

    changeSlideColors();
    slideImages[currentSlide].classList.remove("hidden");
    restartTimeout();
});

rightArrow.addEventListener("click", () => {
    changeToNextSlide();
    restartTimeout();
});

slider.addEventListener("click", (e) => {
    if (!e.target.classList.contains("slider")) {
        slideImages[currentSlide].classList.add("hidden");

        currentSlide = Number(e.target.getAttribute("data-id"));
        changeSlideColors();

        slideImages[currentSlide].classList.remove("hidden");
        restartTimeout();
    }
});

const buildSlider = () => {
    for (let i = 0; i < slidesLength; i++) {
        slider.innerHTML += `<div class="slide" data-id=${i}></div>`;
    }
};

const changeSlideColors = () => {
    [...slider.querySelectorAll(".slide")].map((element) => {
        if (Number(element.getAttribute("data-id")) !== currentSlide) {
            element.style = "background-color: white";
        } else {
            element.style = "background-color: black";
        }
    });
};

const infiniteTimeout = () => {
    timer = setTimeout(() => {
        changeToNextSlide();
        infiniteTimeout();
    }, 5000);
};

const restartTimeout = () => {
    clearTimeout(timer);
    infiniteTimeout();
};

const changeToNextSlide = () => {
    slideImages[currentSlide].classList.add("hidden");

    if (currentSlide === slidesLength - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    changeSlideColors();
    slideImages[currentSlide].classList.remove("hidden");
};

buildSlider();
changeSlideColors();
infiniteTimeout();

const form = document.querySelector("form");

const inputRequirements = {
    email: {
        minLength: 5,
        errors: ["typeMismatch"],
    },
    country: {
        minLength: 5,
    },
    password: {
        minLength: 5,
    },
    "password-confirmation": {
        minLength: 5,
    },
    "zip-code": {
        minLength: 3,
    },
};

const errorTexts = {
    typeMismatch: "Incorrect format",
};

form.addEventListener("input", (e) => {
    const formInput = e.target;
    const formInputValue = e.target.value;
    const formError = e.target.parentNode.querySelector(".error");

    if (hasWhitespace(formInputValue)) {
        showError({ formError, errorText: "Has a whitespace!", formInput });
        return;
    }

    if (formInputValue.length === 0) {
        hideError({ formError });
        formInput.style.border = `1.5px solid black`;
        return;
    } else if (isShort(formInput)) {
        showError({ formError, errorText: "Too short", formInput });
        return;
    }

    if (!formInput.validity.valid) {
        checkValidity(formInput, formError);
        return;
    }

    if (formInput.getAttribute("name") === "password-confirmation") {
        if (formInputValue !== form.querySelector("input[name=password]").value) {
            showError({ formError, errorText: "Password do not match", formInput });
            return;
        }
    }

    hideError({ formError });
    formInput.style.border = "1.5px solid green";
});

form.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
});

const hasWhitespace = (value) => {
    return value.indexOf(" ") >= 0;
};

const isShort = (formInput) => {
    const formInputLength = formInput.value.length;
    return formInputLength < inputRequirements[formInput.getAttribute("name")].minLength;
};

const showError = ({ formError, errorText, formInput }) => {
    formError.classList.remove("hidden");
    formError.textContent = errorText;
    formInput.style.border = "1.5px solid red";
};

const checkValidity = (formInput, formError) => {
    try {
        inputRequirements[formInput.getAttribute("name")].errors.map((error) => {
            if (formInput.validity[error]) {
                showError({ formError, errorText: errorTexts[error], formInput });
            }
        });
    } catch {}
};

const hideError = ({ formError }) => {
    formError.classList.add("hidden");
};
