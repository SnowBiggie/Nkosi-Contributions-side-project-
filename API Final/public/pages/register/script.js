function getDetails(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let details = {
        name: name,
        email: email.toLowerCase(),
        password: password
    }
    return details;
}

function submitHandler(){
    let details = getDetails();
    console.log(details);
    postDetails(details);
}

async function postDetails(details){
    const response = await fetch('http://localhost:8000/auth/register', {
         method: 'POST',
        body: JSON.stringify({
        body:details,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
  });
  const body = await response.json();
  if(body === "User created"){
    window.location.assign("../main/index.html")
  }
  // Functionlity to navigate to other pages
}

var submitButton = document.getElementById('signinBtn');
submitButton.addEventListener('click', submitHandler, false); 
        
