const body = document.getElementById("body");
const h1 = document.getElementById("h1");
const themeToggle = document.getElementById("theme-toggle");
const btns = document.getElementsByClassName("button")

themeToggle.addEventListener("click", switchTheme);

function switchTheme() {
    console.log(btn)
    body.classList.toggle("rain");
    h1.classList.toggle("rain")
    themeToggle.classList.toggle("rain")
    // btn.classList.toggle("rain")

    for(let i = 0, all = btns.length; i < all; i++){   
       btns[i].classList.toggle("rain");
    }
}
