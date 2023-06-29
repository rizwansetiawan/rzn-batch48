let mode    = document.querySelector(".dark-mode");
let navbar  = document.querySelector(".main-navbar")
let index   = true;
mode.addEventListener("click",()=>{
    if (index == true){
    document.body.classList.add("open");
    navbar.classList.add("open")
    mode.style.color="white";
    mode.style.backgroundColor="transparent"
    index=false
    
}else{document.body.classList.remove("open");
navbar.classList.remove("open");
mode.style.color="black";
index=true;}
})
