
let toggle = document.querySelector(".toggle")
let burgerX= document.getElementById("burgerX")
let xClose = document.getElementById("close-burgerX")
let darkMode = document.querySelector(".dark__mode")
let index = true
toggle.addEventListener("click",()=>{
    toggle.classList.toggle("active-toggle")
    darkMode.classList.toggle("open-dark")
})
burgerX.addEventListener("click",(()=>{

    xClose.classList.add("close__x")

}))
xClose.addEventListener("click",(()=>{
    
    xClose.classList.remove("close__x")
    
}))