// let mode    = document.querySelector(".dark-mode");
// let navbar  = document.querySelector(".main-navbar");
// let cntIndex= document.querySelector(".container-index")
// let burgerIcon = document.querySelector(".burger-menu")
// let index   = true;
// mode.addEventListener("click",()=>{
//     if (index == true){
//     document.body.classList.add("open");
//     navbar.classList.add("open")
//     mode.style.color="white";
//     mode.style.backgroundColor="transparent";
//     burgerIcon.style.color="white"
//     index=false;
    
// }else{document.body.classList.remove("open");
//     navbar.classList.remove("open");
//     mode.style.color="black";
//     burgerIcon.style.color="black"
//     index=true;}
// })
// // BURGER MENU RESPONSIVE //
// let containerBurger = document.querySelector(".dropdown-menu")
// function myBurger(){
//     if(index == true){
//         containerBurger.style.display="block";
//         // cntIndex.style.marginTop="50px"
//         index=false;
//     }else{containerBurger.style.display="none";
//     // cntIndex.style.marginTop="0"
//         index=true;
// }
// }
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