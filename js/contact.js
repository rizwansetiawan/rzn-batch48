let mode    = document.querySelector(".dark-mode");
let navbar  = document.querySelector(".main-navbar");
let btnDark = document.querySelector(".btn-contact-nav");
let index   = true;

mode.addEventListener("click",()=>{
    if (index == true){
    document.body.classList.add("open");
    navbar.classList.add("open")
    mode.style.color="white";
    mode.style.backgroundColor="transparent"
    index=false;
}else{document.body.classList.remove("open");
    navbar.classList.remove("open");
    mode.style.color="black";
    index=true;}
})
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
const emailReceiver = "dumbways21@gmail.com"
let link = document.createElement("a")
link.href = `mailto:${emailReceiver}?subject=${select}&body=halo my name is ${names} according me about ${select}: ${textarea}, and my phone number is ${phone} thank you`
link.click()
}
