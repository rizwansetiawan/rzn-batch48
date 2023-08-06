
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
// STARS SELECTION
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
const promises = new Promise((resolved,rejected)=>{
    let xhr = new XMLHttpRequest()
    xhr.open("GET","https://api.npoint.io/643f7cb4b917409b4373",true)
    xhr.onload = function(){
        if(xhr.status===200){
            resolved(JSON.parse(xhr.responseText))
        }else{rejected("error loading data")}
    }
    xhr.onerror = ()=>{
        if(rejected){
            document.writeln(`<div class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div><h1 class="not-found"> Koneksi gagal </h1>`)
        }
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
console.log(allData.image)
})}
document.querySelector(".container-testi").innerHTML = storageData;
}
// make a function for search user based on a input user 

function searchUser(event){
    event.preventDefault()
    
    let search = document.getElementById("search").value.toLowerCase();
    let storageData = "";
    let spinnerWait = "";
    const allDataUser = allData.filter((allData)=>{
        return allData.author.toLowerCase().includes(search)
    })
        spinnerWait+=`<div class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`
    document.getElementById("take-spinner").innerHTML = spinnerWait;
    document.getElementById("take-container").innerHTML = "";
    document.querySelector("#take-loading").innerHTML = 'Loading...'
    setTimeout(()=>{
   if(allDataUser.length==0){
        storageData+=`<h1 class="not-found">USER NOT FOUND</h1>`
        document.getElementById("take-spinner").innerHTML = "";
        document.querySelector("#take-loading").innerHTML=""
    }else{
        document.getElementById("take-spinner").innerHTML = "";
        document.querySelector("#take-loading").innerHTML=""
        allDataUser.forEach((allData)=>{
     storageData +=`<div class="container-testi"id="take-container">
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
},2600)
}