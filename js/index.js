// Check If There's local Storage Color option
let mainColors = localStorage.getItem("color_option");
let mainBgRondom = localStorage.getItem("background_rondom");
// colors
const colors = document.querySelectorAll(".colors-list li");
// yes or no
let randomBg = document.querySelectorAll(".option-box span");
// image about
let imageAbout = document.querySelector(".about .image-box img");
// Start landing page Element
let landingPage = document.querySelector(".landing-page");
let bgOption;
let backInterval;

if (mainColors !== null) {
    colors.forEach((li) => {
        li.classList.remove("active");
        li.dataset.color === mainColors ? li.classList.add("active") : null;
    });

    document.documentElement.style.setProperty('--main-color', mainColors);

    if (mainColors === "#FF9800") {
        imageAbout.src = "../images/about-orange.jpeg";
    } else if (mainColors === "#c30b0b") {
        imageAbout.src = "../images/about-red.jpeg";
    } else if (mainColors === "#009688") {
        imageAbout.src = "../images/about-green.jpeg";
    } else if (mainColors === "#4CAF50") {
        imageAbout.src = "../images/about-green2.jpeg"
    } else {
        imageAbout.src = "../images/about-blue.jpg";
    };
}

if (mainBgRondom !== null) {
    if (mainBgRondom === "true") {
        bgOption = true;
        randomImg();
    } else {
        bgOption = false;
        clearInterval(backInterval);
        landingPage.style.background = localStorage.getItem("landingPage");
    };

    if (bgOption === true) {
        randomBg.forEach(li => li.classList.remove("active"));
        document.querySelector(".option-box .yes").classList.add("active");
    } else {
        randomBg.forEach(li => li.classList.remove("active"));
        document.querySelector(".option-box .no").classList.add("active");
    };
};

document.querySelectorAll(".header-area ul li a").forEach(li => {
    li.addEventListener("click", e => {
        document.querySelector(`.${e.target.id}`).scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.querySelector(".btn-reset").addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})

// eindow scroll

let liAbout = document.getElementById("about");
let headerAreaLi = document.querySelectorAll(".header-area li a");
let headerArea = document.querySelector(".header-area");

// Select skills
let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
let numProgress = document.querySelectorAll(".skills .num-progress");

window.onscroll = function () {
    if (window.scrollY >= 150) {
        headerArea.style.backgroundColor = "black";
    } else {
        headerArea.style.backgroundColor = "transparent";
    };

    if (window.scrollY >= liAbout.offsetTop + 400) {
        headerAreaLi.forEach(li => {
            li.classList.remove("active");
            liAbout.classList.add("active");
        });
    } else {
        liAbout.classList.remove("active");
        document.getElementById("home").classList.add("active");
    };

    if (window.scrollY >= document.querySelector(".skills").offsetTop - 200) {
        allSkills.forEach(sk => sk.style.width = sk.dataset.progress);
        numProgress.forEach(num => num.innerHTML = num.dataset.num);
    };

    scrollToSomewhere(headerAreaLi, document.querySelector(".skills"), document.getElementById("skills"));
    scrollToSomewhere(headerAreaLi, document.querySelector(".gallery"), document.getElementById("gallery"));
    scrollToSomewhere(headerAreaLi, document.querySelector(".timeline"), document.getElementById("timeline"));
    scrollToSomewhere(headerAreaLi, document.querySelector(".features"), document.getElementById("features"));
    scrollToSomewhere(headerAreaLi, document.querySelector(".testimonials"), document.getElementById("testimonials"));
    scrollToSomewhere(headerAreaLi, document.querySelector(".contact"), document.getElementById("contact"));
};

// Start setting box
let settingBox = document.querySelector(".setting-box");
let gear = document.querySelector(".gear");

document.querySelector(".toggle-setting").addEventListener("click", function () {
    gear.classList.toggle("fa-spin");
    settingBox.classList.toggle("open");
});
// End setting box

// Switch Colors

colors.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        colors.forEach((li) => li.classList.remove("active"));
        e.target.classList.add("active");

        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);

        if (e.target.dataset.color === "#FF9800") {
            imageAbout.src = "../images/about-orange.jpeg";
        } else if (e.target.dataset.color === "#c30b0b") {
            imageAbout.src = "../images/about-red.jpeg";
        } else if (e.target.dataset.color === "#009688") {
            imageAbout.src = "../images/about-green.jpeg";
        } else if (e.target.dataset.color === "#4CAF50") {
            imageAbout.src = "../images/about-green2.jpeg"
        } else {
            imageAbout.src = "../images/about-blue.jpg";
        };
    });
});

randomBg.forEach(sp => {
    sp.addEventListener("click", (e) => {
        randomBg.forEach(sp => sp.classList.remove("active"));
        e.target.classList.add("active");

        if (e.target.dataset.random === "yes") {
            bgOption = true;
            randomImg()
            localStorage.setItem("background_rondom", true);
        } else {
            bgOption = false;
            clearInterval(backInterval);
            localStorage.setItem("background_rondom", false);
            if (landingPage.style.background) {
                localStorage.setItem("landingPage", landingPage.style.background)
            }
        };
    });
});

// Get Array of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "09.jpg"];

function randomImg() {

    if (bgOption === true) {
        backInterval = setInterval(() => {
            // Get Random number
            let bgRandom = Math.floor(Math.random() * imgsArray.length);
            // Change Background Image Url
            landingPage.style.background = "url('../images/" + imgsArray[bgRandom] + "') center/cover";
        }, 8000);
    };
};

// create popup with images

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // create overlay element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        // create the popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            // create heading
            let heading = document.createElement("h3");
            // create text for heading
            let texthead = document.createTextNode(img.alt);
            heading.appendChild(texthead);
            popupBox.appendChild(heading);
        }

        // create te Image
        let popupImg = document.createElement("img");

        // set img source
        popupImg.src = img.src;
        popupImg.setAttribute("data-img", img.getAttribute("data-img"))
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        let closeBtn = document.createElement("span");
        closeBtn.className = "closebtn";
        let closebTextBtn = document.createTextNode("X");
        closeBtn.appendChild(closebTextBtn);
        popupBox.appendChild(closeBtn);

        closeBtn.addEventListener("click", () => {
            popupBox.remove();
            overlay.remove();
        });

        // create Grwater Than and Less Than

        let greaterThan = document.createElement("i");
        greaterThan.className = "greaterThan fa-solid fa-greater-than";

        popupBox.appendChild(greaterThan);

        let lassThan = document.createElement("i");
        lassThan.className = "lassThan fa-solid fa-less-than";

        popupBox.appendChild(lassThan);

        greaterThan.addEventListener("click", () => {
            if (popupImg.src.includes("09.jpg") === true) {
                let num1 = popupImg.src.replace(popupImg.src.slice(-6, -4), + String(+popupImg.src.slice(-6, -4) + 1));
                popupImg.src = num1
            } else {
                let num1 = popupImg.src.replace(popupImg.src.slice(-6, -4), "0" + String(+popupImg.src.slice(-6, -4) + 1));
                popupImg.src = num1
            }

            if (popupImg.src.includes("10.jpg") === true) {
                greaterThan.style.display = "none";
            } else if (popupImg.src.includes("01.jpg") === true) {
                lassThan.style.display = "none";
            } else {
                greaterThan.style.display = "block";
                lassThan.style.display = "block";
            };
        });

        lassThan.addEventListener("click", () => {
            let num1 = popupImg.src.replace(popupImg.src.slice(-6, -4), "0" + String(+popupImg.src.slice(-6, -4) - 1));
            popupImg.src = num1

            if (popupImg.src.includes("10.jpg") === true) {
                greaterThan.style.display = "none";
            } else if (popupImg.src.includes("01.jpg") === true) {
                lassThan.style.display = "none";
            } else {
                greaterThan.style.display = "block";
                lassThan.style.display = "block";
            };
        });

        if (popupImg.src.includes("10.jpg") === true) {
            greaterThan.style.display = "none";
        } else if (popupImg.src.includes("01.jpg") === true) {
            lassThan.style.display = "none";
        } else {
            greaterThan.style.display = "block";
            lassThan.style.display = "block";
        };
    });
});

function scrollToSomewhere(headerAreaLi, el, elheader) {
    if (window.scrollY >= el.offsetTop - 200) {
        headerAreaLi.forEach(li => {
            li.classList.remove("active");
            elheader.classList.add("active");
        });
    };
};