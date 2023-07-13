let mode    = document.querySelector(".dark-mode");
let mode2    = document.querySelector("#dark-moon");
let navbar  = document.querySelector(".main-navbar");
let sun     = document.getElementById("icon-dark-mode")
let index   = true;
let burgerIcon = document.querySelector(".burger-menu")
// DARK MODE
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
// NAVBAR DROPDOWN
let containerBurger = document.querySelector(".dropdown-menu")
burgerIcon.addEventListener("click",function (){
    if(index == true){
        containerBurger.style.display="block";
        index=false;
    }else{containerBurger.style.display="none";
        index=true;
}});
let all  = document.querySelector(".all-stars")
let btn1 = document.querySelector(".btn-active1")
let btn2 = document.querySelector(".btn-active2")
let btn3 = document.querySelector(".btn-active3")
let btn4 = document.querySelector(".btn-active4")
let btn5 = document.querySelector(".btn-active5")
btn1.addEventListener("click",function(){
    btn1.classList.add("actived")
    all.classList.remove("actived")
    all.classList.remove("all-stars")
    btn2.classList.remove("actived")
    btn3.classList.remove("actived")
    btn4.classList.remove("actived")
    btn5.classList.remove("actived")
    }
)
btn2.addEventListener("click",function(){
    btn1.classList.remove("actived")
    btn2.classList.add("actived")
    btn3.classList.remove("actived")
    btn4.classList.remove("actived")
    btn5.classList.remove("actived")
    all.classList.remove("actived")
    all.classList.remove("all-stars")
    }
)
btn3.addEventListener("click",function(){
    btn1.classList.remove("actived")
    btn2.classList.remove("actived")
    btn3.classList.add("actived")
    btn4.classList.remove("actived")
    btn5.classList.remove("actived")
    all.classList.remove("actived")
    all.classList.remove("all-stars")
    }
)
btn4.addEventListener("click",function(){
    btn1.classList.remove("actived")
    btn2.classList.remove("actived")
    btn3.classList.remove("actived")
    btn4.classList.add("actived")
    btn5.classList.remove("actived")
    all.classList.remove("actived")
    all.classList.remove("all-stars")
    }
)
btn5.addEventListener("click",function(){
    btn1.classList.remove("actived")
    btn2.classList.remove("actived")
    btn3.classList.remove("actived")
    btn4.classList.remove("actived")
    btn5.classList.add("actived")
    all.classList.remove("actived")
    all.classList.remove("all-stars")
    }
)
all.addEventListener("click",function(){
    btn1.classList.remove("actived")
    btn2.classList.remove("actived")
    btn3.classList.remove("actived")
    btn4.classList.remove("actived")
    btn5.classList.remove("actived")
    all.classList.add("actived")
    all.classList.remove("all-stars")
    }
)
// class testimonials {
//     image="";
//     quote="";
//     constructor(image,quote){
//         this.image=image;
//         this.quote=quote;
//     }

//     get image(){
//         return this.image
//     }
//     get quote(){
//         return this.quote
//     }
//     // get user(){
//     //     return new error(`author must be fill or nut null`)
//     // }

//     get InfoTesti(){
//         return `
//         <div class="container-testi"id="take-container">
//         <div class="card-testi1">
//         <div class="content-testi1">
//             <img src="${this.image}" alt="photo">
//             <p>"${this.quote} !!"</p>
//             <h3>${this.author}</h3>
//         </div>
//         </div>
//         </div>`
//     }
// }
// class testimonialsAuthor extends testimonials{
//     #author="";
//     constructor(author,image,quote){
//         super(image,quote)
//         this.#author=author
//     }
//     get author(){
//         return this.#author
//     }
// }
// // class companyTesti extends testimonialsAuthor{
// //     constructor(company,image,quote){
// //         super(image,quote)
// //         this.company=company
// //     }
// //     get author(){
// //         return `company ${this.company}`
// //     }
// // }

// const result1   = new testimonialsAuthor(
//     "baby z",
//     "https://media.istockphoto.com/id/1282695693/photo/little-boy-sitting-on-chair-at-the-table.webp?b=1&s=170667a&w=0&k=20&c=SN7888BLbvEl8Yh3tTwjDYA6YHcvDEPZ60eAwcLMUfo=",
//     "mantap lanjutkan"
//     )
// const result2   = new testimonialsAuthor(
//     "ed sheeran",
//     "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//     "lumayan lah",
//     )
// const result3   = new testimonialsAuthor(
//     "henry",
//     "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//     "kecewa euy",
//     )

// let dataTesti = [result1,result2,result3]

// let storageTesti ="";

// for(let index=0;index < dataTesti.length;index++){
//     storageTesti += dataTesti[index].InfoTesti;
// }
// document.getElementById("take-container").innerHTML = storageTesti;
    // let allData = [
    //     {
    //         author  :"baby z",
    //         image   :"https://media.istockphoto.com/id/1282695693/photo/little-boy-sitting-on-chair-at-the-table.webp?b=1&s=170667a&w=0&k=20&c=SN7888BLbvEl8Yh3tTwjDYA6YHcvDEPZ60eAwcLMUfo=",
    //         quote   :"mantap lanjutkan",
    //         rating  :5
    //     },
    //     {
    //         author  :"peter mike",
    //         image   :"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    //         quote   :"respon lambat",
    //         rating  :1
    //     },
    //     {
    //         author  :"jackson derulo",
    //         image   :"https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    //         quote   :"lumayan bagus",
    //         rating  :3
    //     },
    //     {
    //         author  :"jackson derulo",
    //         image   :"https://plus.unsplash.com/premium_photo-1661672531138-179bf3399f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    //         quote   :"kecewa tidak ramah",
    //         rating  :2
    //     },
    // ];
// function allTestimonials(){
//     let storageData = "";
//     allData.forEach((allData)=>{
//         storageData +=
//         `<div class="container-testi"id="take-container">
//         <div class="card-testi1">
//             <div class="content-testi1">
//                 <img src="${allData.image}" alt="photos"id="photos">
//                 <p>"${allData.quote} !!"</p>
//                 <i class="fa-solid fa-star"></i>${allData.rating}
//                 <h3>${allData.author}</h3>
//             </div>
//         </div>
//         </div>`
//     })    
//     document.querySelector(".container-testi").innerHTML = storageData;
//     // console.log(storageData)
// }
// allTestimonials();

// function filteredTesti (rating){
//     let storageData = "";
//     const filteredData = allData.filter((allData)=>{
//            return allData.rating === rating
        
//     })
//         if(filteredData.length==0){
//             storageData+=`<h1 class="not-found"> DATA NOT FOUND </h1>`
//         }else{filteredData.forEach((allData)=>{
//     storageData+=`<div class="container-testi"id="take-container">
//         <div class="card-testi1">
//             <div class="content-testi1">
//                 <img src="${allData.image}" alt="photos">
//                 <p>"${allData.quote} !!"</p>
//                 <i class="fa-solid fa-star"></i>${allData.rating}
//                 <h3>${allData.author}</h3>
//             </div>
//         </div>
//         </div>`
//     })}
//     document.querySelector(".container-testi").innerHTML = storageData;
// }

const promises = new Promise((resolved,rejected)=>{
    let xhr = new XMLHttpRequest()
    xhr.open("GET","https://api.npoint.io/79c0f604ebd312028838",true)
    xhr.onload = function(){
        if(xhr.status===200){
            resolved(JSON.parse(xhr.responseText))
        }else{rejected("error loading data")}
    }
    xhr.onerror = ()=>{
        rejected("connection failed")
    }
    xhr.send()
    console.log(xhr)
})
let allData = []

async function allTestimonials (){

    const dataTesti = await promises;
    allData=dataTesti
    let storageData = "";
     allData.forEach((allData)=>{
         storageData +=
         `<div class="container-testi"id="take-container">
         <div class="card-testi1">
             <div class="content-testi1">
                 <img src="${allData.image}" alt="photos"id="photos">
                 <p>"${allData.quote} !!"</p>
                 <h3><i class="fa-solid fa-star"></i>${allData.rating} - ${allData.author}</h3>
             </div>
         </div>
         </div>`
     })    
     document.querySelector(".container-testi").innerHTML = storageData;
}
allTestimonials();

function filteredTesti(rating){
    let storageData = "";
   const filteredData = allData.filter((allData)=>{
      return allData.rating == rating
   })
   if(filteredData.length==0){
    storageData+=`<h1 class="not-found"> DATA NOT FOUND </h1>`
}else{filteredData.forEach((allData)=>{
storageData+=`<div class="container-testi"id="take-container">
<div class="card-testi1">
    <div class="content-testi1">
        <img src="${allData.image}" alt="photos">
        <p>"${allData.quote} !!"</p>
        <h3><i class="fa-solid fa-star"></i>${allData.rating} - ${allData.author}</h3>
    </div>
</div>
</div>`
})}
document.querySelector(".container-testi").innerHTML = storageData;
}
// make function search user based on a input user 
function searchUser(event){
    event.preventDefault()
    let search = document.getElementById("search").value.toLowerCase();
    let storageData = "";
    const allDataUser = allData.filter((allData)=>{
        return allData.author.toLowerCase().includes(search)
    })
    allDataUser.forEach((allData)=>{
        storageData+=`<div class="container-testi"id="take-container">
<div class="card-testi1">
    <div class="content-testi1">
        <img src="${allData.image}" alt="photos">
        <p>"${allData.quote} !!"</p>
        <h3><i class="fa-solid fa-star"></i>${allData.rating} - ${allData.author}</h3>
    </div>
</div>
</div>`
    })
    document.querySelector(".container-testi").innerHTML = storageData;
}