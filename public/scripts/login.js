//let usuarioActivoLogin ="lalala3";


const login = async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const url = "/api/auth/login";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
     // let usuarioActivoLogin = "lalala7";
      location.replace("/")
    }
  } catch (error) {
    alert(error.message);
  }
};



const irHastaReset = async () => {
  try {
    /* const data = {
      
      email: document.querySelector("#email").value,
      
    }; */
    /* const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }; */
    const email= document.querySelector("#email").value;
    const url = `/api/auth/irhastareset/${email}`;
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
      alert("Correo de reestauracion de contraseña enviado");
    }
  } catch (error) {
    alert(error.message);
  }
};








/* const enviarReseteo = async () => {
  try {
    const email= document.querySelector("#email").value;
    await resetPasswordEmail(email);
     alert("Correo de reestauracion de contraseña enviado");
  } catch (error) {
    alert(error.message);
  }
}; */

/* function getUsuarioActivoLogin() {
  return usuarioActivoLogin;
}

export default {login, getUsuarioActivoLogin }; */
document.querySelector("#login").addEventListener("click", login);
document.querySelector("#irHastaReset").addEventListener("click", irHastaReset);
//document.querySelector("#register").addEventListener("click", irHastaReset);
//document.querySelector("#irHastaReset").disabled = true;