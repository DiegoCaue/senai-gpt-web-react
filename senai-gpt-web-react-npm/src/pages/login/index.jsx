import "./login.css";

import Logo from "../../assets/img/Chat.png"
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = async () => {

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {

      headers: {
        "Content-Type": "application/json"
      },
      method: "POST", //Metodo que envia dados
      body: JSON.stringify({
        email: email,
        password: password

      })

    });

    console.log(response);


    let json = await response.json();

    let token = json.accessToken;

    console.log("Token:" + token);

    localStorage.setItem("meuToken", token);

    window.location.href = "/chat"


    if (response.ok == true) {

      alert("Login realizado com sucesso");
    }

   else
      if (response.status == 401) {

        alert("Credenciais incorreto");
      }

      else {
        alert("Erro inesperado aconteceu");
      }
  }

 //JavaScript

  return (

    //Html
    <>
      <header></header>

      <main className="page-cotainer">

        <div className="robo-image">

        </div>

        <div className="login-container">
          <img src={Logo} alt="Logo do SenaiGPT" />



          <h1

            id="meutitulo"
            className="titulo"
          >Login</h1>

          <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="insira o email" />
          <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira a senha" />

          <button className="btn" onClick={() => onLoginClick()} >Entrar</button>
        </div>
  
       </main>

      <footer></footer>

    </>
  )
}

export default Login;