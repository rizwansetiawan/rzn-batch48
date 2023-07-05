 // DARK MODE //
    let file = document.getElementById("input-file")
    function fileMe (){
        file.removeAttribute("hidden")
    }
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
// USER VALIDATON //    
    function userValidation(){
    let nameProject = document.getElementById("name").value;
    let startDate   = document.getElementById("start-date").value;
    let endDate     = document.getElementById("end-date").value;
    let description = document.getElementById("textarea").value;
    let uploadImage = document.getElementById("input-file").value;

    if(nameProject == ""){
        return alert("please input your name-project")
    }else if(startDate == ""){
        return alert("please select your start-date")
    }else if(endDate == ""){
        return alert("please select your end-date")
    }if(description == ""){
        return alert("please input your description")
    }else if(uploadImage == ""){
        return alert("please upload your image")
    }
};

let storageDataUser = [];

function dataBlog(event){ 
    event.preventDefault()

    let nameProject = document.getElementById("name").value;
    let startDate   = document.getElementById("start-date").value;
    let endDate     = document.getElementById("end-date").value;
    let description = document.getElementById("textarea").value;
    let uploadImage = document.getElementById("input-file").files;

    const iconReact     = '<i class="fa-brands fa-react"></i>';
    const iconVue       = '<i class="fa-brands fa-vuejs"></i>';
    const iconAngular   = '<i class="fa-brands fa-angular"></i>';
    const iconNode      = '<i class="fa-brands fa-node-js"></i>';

    let react   = document.getElementById("react").checked  ? iconReact  : "";
    let vue     = document.getElementById("vue").checked    ? iconVue    : "";
    let angular = document.getElementById("angular").checked? iconAngular: "";
    let node    = document.getElementById("node").checked   ? iconNode   : "";

    uploadImage = URL.createObjectURL(uploadImage[0])

    let datasInput = {
        nameProject,
        startDate,
        endDate,
        description,
        uploadImage,
        react,
        vue,
        angular,
        node,
    }
    storageDataUser.push(datasInput);
    console.info(storageDataUser);

    renderBlog()
};
function renderBlog(){
        document.querySelector(".card-main-container").innerHTML = "";
    for(index=0;index < storageDataUser.length;index++){
        document.querySelector(".card-main-container").innerHTML +=
    `<div class="card-main-container">
        <div class="card1">
        <div class="content-card1">
            <img src="${storageDataUser[index].uploadImage}" alt="image2"class="image2"/>
            <h3 class="title-card"><a href="../html/blog-detail.html"> ${storageDataUser[index].nameProject} </a></h3>
            <p>Duration : 3 Month</p>
            <div class="offset">
            <p class="paragraf">${storageDataUser[index].description}.</p>
            </div>
            <div class="icon-card">
            ${storageDataUser[index].react}
            ${storageDataUser[index].vue}
            ${storageDataUser[index].angular}
            ${storageDataUser[index].node}
            </div>
        <div class="btn-card">
            <button>Edit</button>
            <button>Delete</button>
        </div>
        </div>
        </div>
    </div>`
    } 
};