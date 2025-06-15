const reset= async () => {
  try {
    const email = document.querySelector('#email').value;
    const newPass = document.querySelector('#newPass').value;
    const newPass2 = document.querySelector('#newPass2').value;
    //const url = `/api/auth/verify/${email}/${code}`;


    if( newPass === newPass2){

      const url = `/api/auth/reset/${email}/${newPass}`;
      let response = await fetch(url);
      response = await response.json();
      console.log(response);
      if (response.error) {
        alert(response.error);
      } else {
        location.replace("/login")
      }
        
    }else{

      alert("La contraseña no coincide");
    }

    
  } catch (error) {
    alert(error.message);
  }
};

document.querySelector("#reset").addEventListener("click", reset);
