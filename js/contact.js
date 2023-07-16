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
























function userValidation(event){
event.preventDefault()   
let names   = document.getElementById("name").value
let email   = document.getElementById("email").value
let phone   = document.getElementById("phone").value
let select  = document.getElementById("select").value
let textarea= document.getElementById("textarea").value

// USER VALIDATION

if(names == ""){
    return alert("please input your name")
}else if(email == ""){
    return alert("please input your email")
}else if(phone == ""){
    return alert("please input your phone")
}else if(select == ""){
    return alert("choose your subject")
}else if (textarea == ""){
    return alert("please input your description")
}
let dataUser = {
    names,
    email,
    phone,
    select,
    textarea,
}
console.log(dataUser)
const emailReceiver = "rhoma_irama@gmail.com"
let link = document.createElement("a")
link.href = `mailto:${emailReceiver}?subject=${select}&body=halo my name is ${names} according me about ${select}: ${textarea}, and my phone number is ${phone} thank you`
link.click()
}
