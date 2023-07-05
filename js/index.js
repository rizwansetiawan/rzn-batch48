let mode    = document.querySelector(".dark-mode");
let navbar  = document.querySelector(".main-navbar");
let index   = true;
mode.addEventListener("click",()=>{
    if (index == true){
    document.body.classList.add("open");
    navbar.classList.add("open")
    mode.style.color="white";
    mode.style.backgroundColor="transparent";
    index=false;
    
}else{document.body.classList.remove("open");
navbar.classList.remove("open");
mode.style.color="black";
index=true;}
})

// let coba = [
//     {
//         firts : "muhamad",
//         lastname:"rizwan",
//     },
//     {
//         addres:"bogor"
//     }
// ]
// console.log(coba[0].lastname)
// console.log("halo nama saya "+coba.name.firts,coba.name.lastname,"dan sekarang tinggal di"+coba.addres)

// let data = {
//     anu:["rzn","bogor","saya",false]
// }
// console.log(`halo nama saya adalah ${data.anu[0]} dan alamat saya ${data.anu[1]}`)
// console.info(data.anu.length)