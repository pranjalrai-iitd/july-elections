const form =
document.getElementById("otpForm");


form.addEventListener(
"submit",
async function(e){


e.preventDefault();


const otp =
document.getElementById("otp").value;


const mobile =
localStorage.getItem("mobile");



const response =
await fetch("/api/verify-otp",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

mobile:mobile,

otp:otp

})

});



const data =
await response.json();



document.getElementById("message")
.innerText=data.message;



if(data.success){


window.location.href="/api/pdf";


}


});