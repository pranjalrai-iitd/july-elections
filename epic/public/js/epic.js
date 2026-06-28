const form = document.getElementById("epicForm");


form.addEventListener(
"submit",
async function(e){

e.preventDefault();


const name =
document.getElementById("name").value;


const mobile =
document.getElementById("mobile").value;



const response =
await fetch("/api/request-otp",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

name:name,

mobile:mobile

})

});


const data =
await response.json();



document.getElementById("message")
.innerText = data.message;



if(data.success){


localStorage.setItem(
"mobile",
mobile
);


window.location.href="otp.html";


}


});