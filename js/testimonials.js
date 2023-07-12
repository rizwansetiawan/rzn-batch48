let mode    = document.querySelector(".dark-mode");
let mode2    = document.querySelector("#dark-moon");
let navbar  = document.querySelector(".main-navbar");
let sun     = document.getElementById("icon-dark-mode")
let index   = true;
let burgerIcon = document.querySelector(".burger-menu")
mode.addEventListener("click",()=>{
    if (index == true){
    document.body.classList.add("open");
    navbar.classList.add("open")
    mode.style.color="white";
    mode.style.backgroundColor="transparent";
    sun.style.display="none";
    mode2.style.display="block";
    burgerIcon.style.color="white";
    index=false;
}else{document.body.classList.remove("open");
    navbar.classList.remove("open");
    mode.style.color="black";
    burgerIcon.style.color="black";
    sun.style.display="block";
    mode2.style.display="none";
    index=true;}
})
let containerBurger = document.querySelector(".dropdown-menu")
function myBurger(){
    if(index == true){
        containerBurger.style.display="block";
        index=false;
    }else{containerBurger.style.display="none";
        index=true;
}
}

class testimonials {
    image="";
    quote="";
    constructor(image,quote){
        this.image=image;
        this.quote=quote;
    }

    get image(){
        return this.image
    }
    get quote(){
        return this.quote
    }
    // get user(){
    //     return new error(`author must be fill or nut null`)
    // }

    get InfoTesti(){
        return `
        <div class="container-testi"id="take-container">
        <div class="card-testi1">
        <div class="content-testi1">
            <img src="${this.image}" alt="photo">
            <p>"${this.quote} !!"</p>
            <h3>${this.author}</h3>
        </div>
        </div>
        </div>`
    }
}
class testimonialsAuthor extends testimonials{
    #author="";
    constructor(author,image,quote){
        super(image,quote)
        this.#author=author
    }
    get author(){
        return this.#author
    }
}
// class companyTesti extends testimonialsAuthor{
//     constructor(company,image,quote){
//         super(image,quote)
//         this.company=company
//     }
//     get author(){
//         return `company ${this.company}`
//     }
// }

const result1   = new testimonialsAuthor(
    "baby z",
    "https://media.istockphoto.com/id/1282695693/photo/little-boy-sitting-on-chair-at-the-table.webp?b=1&s=170667a&w=0&k=20&c=SN7888BLbvEl8Yh3tTwjDYA6YHcvDEPZ60eAwcLMUfo=",
    "mantap lanjutkan"
    )
const result2   = new testimonialsAuthor(
    "ed sheeran",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "lumayan lah",
    )
const result3   = new testimonialsAuthor(
    "henry",
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "kecewa euy",
    )

let dataTesti = [result1,result2,result3]

let storageTesti ="";

for(let index=0;index < dataTesti.length;index++){
    storageTesti += dataTesti[index].InfoTesti;
}
document.getElementById("take-container").innerHTML = storageTesti;