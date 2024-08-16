

let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');
let section = document.querySelector('section');
// let section = document.getElementsByTagName('*');


menuToggle.onclick = function () {
    header.classList.toggle('active')
    section.classList.toggle('active')
}

const slides = document.querySelectorAll('.slide');

// console.log(slides)

let counter = 0;
// console.log(i)



slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`

});

const goPrev = () => {
    counter--
    slideImg()
}
const goNext = () => {
    counter++ 
    slideImg()
}


const slideImg = () => {
    for (let i = 0; i < slides.length; i++) {
        if (counter >= slides.length) {
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${counter * 0}%)`
            });
        } else {
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${counter * 100}%)`
            });
        }
    }
}
// const slideImg = () => {
//     for (let i = 0; i < slides.length; i++) {
//         if (counter >= slides.length) {
//             slides.forEach(slide => {
//                 slide.style.transform = `translateX(-${counter * 0}%)`
//             });
//         } else {
//             slides.forEach(slide => {
//                 slide.style.transform = `translateX(-${counter * 100}%)`
//             });
//         }
//     }
// }


// setInterval(() => {
    // if (counter < 2) {
    //     console.log(counter++)
    //     slides.forEach((slide, index) => {
    //         slide.style.left = `${index * 100}%`
    //         slide.style.transform = `translateX(-${counter * 100}%)`
    //     });
    // } 
    
    // else {
    //     console.log(counter--)
    //     slides.forEach((slide, index) => {
    //         slide.style.left = `${index * 100}%`
    //         slide.style.transform = `translateX(-${counter * 100}%)`
    //     }); 
    // }
// }, 2000);

let currentIndex = [0, 0]; // Array to store current indexes for each gallery

function openLightbox(lightboxIndex) {
    document.getElementById(`lightbox${lightboxIndex}`).style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox(lightboxIndex) {
    document.getElementById(`lightbox${lightboxIndex}`).style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

function currentSlide(index, lightboxIndex) {
    showSlide(currentIndex[lightboxIndex - 1] = index - 1, lightboxIndex);
}

function showSlide(index, lightboxIndex) {
    const slides = document.querySelectorAll(`.slide${lightboxIndex}`);
    if (index >= slides.length) {
        currentIndex[lightboxIndex - 1] = 0;
    }
    if (index < 0) {
        currentIndex[lightboxIndex - 1] = slides.length - 1;
    }
    slides.forEach(slide => slide.style.display = 'none');
    slides[currentIndex[lightboxIndex - 1]].style.display = 'block';
}

function changeSlide(n, lightboxIndex) {
    showSlide(currentIndex[lightboxIndex - 1] += n, lightboxIndex);
}

// Initialize the first slide of each lightbox
showSlide(currentIndex[0], 1);
showSlide(currentIndex[1], 2);



document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    let currentIndex = 0;
    let repeatCount = 0;
    const maxRepeats = 3;

    function showNextSlider() {
        sliders[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % sliders.length;
        sliders[currentIndex].classList.add('active');
        
        if (currentIndex === 0) {
            repeatCount++;
        }

        if (repeatCount < maxRepeats) {
            setTimeout(showNextSlider, 5000); // Change slide every 3 seconds
        }
    }

    setTimeout(showNextSlider, 3000); // Initial delay of 3 seconds
});