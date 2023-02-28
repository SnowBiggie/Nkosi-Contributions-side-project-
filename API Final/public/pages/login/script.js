function getDetails(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let details = {
        email: email,
        password: password
    }
    return details;
}

function submitHandler(){
    let details = getDetails();
    console.log(details);
    postDetails(details)
}

async function postDetails(details){
  const response = await fetch('http://localhost:8000/auth/login', {
       method: 'POST',
      body: JSON.stringify({
      body:details,
  }),
  headers: {
      'Content-type': 'application/json; charset=UTF-8',
  }
});
const body = await response.json();


if(details.email.toLowerCase() === body.email.toLowerCase()){
    window.location.assign("../main/index.html");
}
else{
    document.getElementById("error").innerHTML = body;
}
// Functionlity to navigate to other pages
}


var submitButton = document.getElementById('subButton');
submitButton.addEventListener('click', submitHandler, false); 