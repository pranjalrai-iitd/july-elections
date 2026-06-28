const form =
document.getElementById("epicForm");


form.addEventListener(
"submit",
async function(e){

e.preventDefault();


document.getElementById("message")
.innerText =
"OTP system will be connected next.";

});