function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        //search
        if (rawFile.readyState == 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

let name = document.getElementById("name");
let position = document.getElementById("position");
let address = document.getElementById("address");
let jobFor = document.getElementById("jobFor");
let edu = document.getElementById("edu");
let exp = document.getElementById("exp");
let skills = document.getElementById("skills");
let profile = document.getElementById("profile");
let select = document.getElementById("select");
let data;
//usage:


function populate(){
    edu.innerHTML = "";
    exp.innerHTML="";
    skills.innerHTML="";
    readTextFile("content/"+select.value, function (text) {
        data = JSON.parse(text);
        name.innerText = data.name;
        position.innerText = data.position;
        address.innerText = data.address;
        jobFor.innerText = data.jobFor;
        profile.src = "resources/"+ data.pimage;

        for(let j = 0 ;j < data.education.length;j++){
            edu.innerHTML += "  <div>\n " +
                "                        <div><p class=\"uni font-weight-bold\" >"+data.education[j].uni+"</p></div>\n" +
                "                        <div class=\"row m-0\">\n" +
                "                            <p class=\"in font-italic col-8\">"+data.education[j].pos+"</p>\n" +
                "                            <p class=\"in font-italic col-4 col-md-3 text-center year\">"+data.education[j].date+"</p>\n" +
                "                        </div>\n" +
                "                        <div>\n" +
                "                            <p class=\"description\">• "+data.education[j].description+"</p>\n" +
                "                        </div>\n" +
                "                    </div>";
        }
        for(let j = 0 ; j<data.Experience.length;j++){
            exp.innerHTML += "   <div>\n" +
                "                        <div><p class=\"uni font-weight-bold mb-0\">"+data.Experience[j].where+"</p></div>\n" +
                "\n" +
                "                        <div>\n" +
                "                            <p class=\"description\">"+data.Experience[j].description+"</p>\n" +
                "                        </div>\n" +
                "                    </div>"
        }
        for(let j = 0 ; j < data.Skills.length;j++){
            skills.innerHTML += " <div>\n" +
                "                        <div><p class=\"uni font-weight-bold mb-0\">"+data.Skills[j].name+"</p></div>\n" +
                "\n" +
                "                        <div>\n" +
                "                            <p class=\"description\">"+data.Skills[j].description+"</p>\n" +
                "                        </div>\n" +
                "                    </div>"
        }
    });
}
function populateSelect(){
    let fileInput = document.querySelector("#myfiles");
    let files = fileInput.files;
    let fl = files.length;
    let i = 0;

    while ( i < fl) {
        let file = files[i];
        let el = document.createElement("option");
        el.textContent = file.name;
        el.value = file.name;
        select.appendChild(el);
        i++;
    }
}
