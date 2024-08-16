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
