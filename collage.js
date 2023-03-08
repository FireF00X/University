// local storage
let mainColor = window.localStorage.getItem("colorStorage");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.querySelectorAll(".sitting-box .sitting .colors li").forEach((e) => {
        e.classList.remove("active")
        if (e.dataset.color === mainColor) {
            e.classList.add("active");
        }
    })
}
// sitting-box
let sittingBox = document.querySelector(".sitting-box");
document.querySelector(".sitting-box>.toggle-gear").onclick = (() => {
    sittingBox.classList.toggle("opened");
    document.querySelector(".sitting-box>.toggle-gear>.duck").classList.toggle("fa-spin");
});

// changeing colors
let colorLi = document.querySelectorAll(".sitting-box>.sitting .colors li");
colorLi.forEach((li) => {
    li.addEventListener(("click"), (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        window.localStorage.setItem("colorStorage", e.target.dataset.color);
        // actives
        e.target.parentElement.querySelectorAll(".active").forEach((x) => {
            x.classList.remove("active")
        });
        e.target.classList.add("active");
    })
});
// local storage
let randomPhoto = true;
let randomeIndex;
let mainPhoto = window.localStorage.getItem("photoStorage");
if (mainPhoto !== null) {
    document.querySelectorAll(".sitting-box .sitting .randome-photo li").forEach(el => {
        el.classList.remove("active");
    })
    if (mainPhoto === 'true') {
        document.querySelector(".sitting-box .sitting .yes").classList.add("active");
    } else {
        document.querySelector(".sitting-box .sitting .no").classList.add("active");
        randomPhoto = false;
    }
}
// changing photo stats
const photoLi = document.querySelectorAll(".sitting-box .sitting .randome-photo .option li");
photoLi.forEach((li) => {
    li.addEventListener("click", ((e) => {
        e.target.parentElement.querySelectorAll(".active").forEach((x) => {
            x.classList.remove("active");
        });
        e.target.classList.add("active");
        if (e.target.classList.contains("yes")) {
            randomPhoto = true;
            randomize();
            window.localStorage.setItem("photoStorage", randomPhoto);
        } else if (e.target.classList.contains("no")) {
            randomPhoto = false;
            clearInterval(randomeIndex);
            window.localStorage.setItem("photoStorage", randomPhoto);
        }
    }));
});

// declare variables
let img = document.querySelector(".inside .shuffle-img img");
let imgArray = ["mini01", "mini02", "mini03", "mini04", "mini05", "mini06"]

// lets try change setinterval function

function randomize() {
    if (randomPhoto === true) {
        randomeIndex = setInterval(() => {
            let randomeIndex = Math.floor(Math.random() * imgArray.length);
            img.setAttribute("src", `./images/${imgArray[randomeIndex]}.jpg`);
        }, 1000);
    }
}

randomize();



// responsive display
let bars = document.querySelector(".container .logo-line i");
let xMark = document.querySelector(".container .fa-xmark");
bars.onclick = (() => {
    bars.classList.add("clicked");
});
xMark.onclick = (() => bars.classList.remove("clicked"));

//  departments
// vars
let leftArro = document.querySelector(".department .arrows .left");
let rightArro = document.querySelector(".department .arrows .right");
let liContainer = document.querySelector(".department .arrows .indecators ul");
let departmentsArray = Array.from(document.querySelectorAll('#department'));
let departmentNum = departmentsArray.length;
let currentSlide = 1;
// create indecator
for (let i = 1; i <= departmentNum; i++) {
    let li = document.createElement("li");
    li.setAttribute("data-index", i);
    liContainer.appendChild(li);
}
let liAfterCreation = Array.from(document.querySelectorAll(".department .arrows .indecators ul li"))
for (let i = 0; i < liAfterCreation.length; i++) {
    liAfterCreation[i].onclick = (() => {
        currentSlide = parseInt(liAfterCreation[i].getAttribute("data-index"));
        checking();
    })
}
// main function
function checking() {
    departmentsArray.forEach(a => {
        a.classList.remove("active")
    });
    document.querySelectorAll(".indecators ul li").forEach(e => {
        e.classList.remove("active")
    })
    departmentsArray[currentSlide - 1].classList.add("active");
    liContainer.children[currentSlide - 1].classList.add("active");
    if (currentSlide === departmentNum) {
        rightArro.style = "cursor:no-drop; opacity:.5";
    } else {
        rightArro.style = "cursor:pointer; opacity:1";
    }
    if (currentSlide === 1) {
        leftArro.style = "cursor:no-drop; opacity:.5";
    } else {
        leftArro.style = "cursor:pointer; opacity:1";
    }
}

leftArro.onclick = function () {
    if (currentSlide > 1) {
        currentSlide--;
        checking();
    }
}
rightArro.onclick = function () {
    if (currentSlide < departmentNum) {
        currentSlide++;
        checking();
    }
}
checking();