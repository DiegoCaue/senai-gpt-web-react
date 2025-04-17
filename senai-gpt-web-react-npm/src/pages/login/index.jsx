import "./login.css";

import Logo from "../../assets/img/Chat.png"
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState ("");

  const onLoginClick = async () => {

      let response = await fetch ("https://senai-gpt-api.azurewebsites.net/login", {

        headers: {
          "Content-Type": "application/json"
        },
        method: "POST", //Metodo que envia dados
        body: JSON.stringify({
          email: email,
          senha: senha
          
        })

        });

      console.log(response);

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

          <input className="inpt" value={email} onChange={event => setEmail(event.target.value)}  type="email" placeholder="insira o email" />
          <input className="inpt" value={senha} onChange={event =>setSenha(event.target.value)} type="password" placeholder="Insira a senha" />

          <button className="btn" onClick={() => onLoginClick()} >Entrar</button>
        </div>



      </main>

      <footer></footer>

    </>
  )
}

export default Login;