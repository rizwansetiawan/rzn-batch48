
 // DARK MODE //
    let file = document.getElementById("input-file")
    function fileMe (){
        file.removeAttribute("hidden")
    }
    let mode    = document.querySelector(".dark-mode");
    let navbar  = document.querySelector(".main-navbar");
    let btnDark = document.querySelector(".btn-contact-nav");
    let burgerIcon = document.querySelector(".burger-menu")
    let index   = true;
    let containerBurger = document.querySelector(".dropdown-menu")
    function myBurger(){
        if(index == true){
            containerBurger.style.display="block";
            // cntIndex.style.marginTop="50px"
            index=false;
        }else{containerBurger.style.display="none";
        // cntIndex.style.marginTop="0"
            index=true;
    }
    }
mode.addEventListener("click",()=>{
    if (index == true){
    document.body.classList.add("open");
    navbar.classList.add("open");
    mode.style.color="white";
    mode.style.backgroundColor="transparent"
    index=false;
}else{document.body.classList.remove("open");
    navbar.classList.remove("open");
    mode.style.color="black";
    index=true;}
});
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

    function timePost(){
        let startDate   = new Date(document.getElementById("start-date").value);
        let endDate     = new Date(document.getElementById("end-date").value);
        let result      = new Date(endDate)-new Date(startDate);
        // console.log(result)
        let days    = Math.floor(result/(1000*3600*24));
        let weeks   = Math.floor(result/(1000*3600*24*7));
        let months  = Math.floor(result/(1000*3600*24*30));
        let years   = Math.floor(result/(1000*3600*24*360));
        
        if(years == 1 || years > 0){
            return `${years} Tahun`
        }else if(months == 1 ||months > 0){
            return `${months} Bulan`
        }else if(weeks == 1 ||weeks > 0){
            return `${weeks} Minggu`
        }else if(days == 1 ||days > 0){
            return `${days} Hari`
        }else{return `Tidak ada`}
        
};
    let timeDistance    = timePost()
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
        timeDistance,
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
            <p>Duration : ${storageDataUser[index].timeDistance}</p>
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
    };
};