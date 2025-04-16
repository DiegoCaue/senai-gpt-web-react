import "./login.css";

function Login() {

  //JavaScript

  return (

    //Html
    <>
      <header></header>

      <main className="page-cotainer">

        <div className="robo-image">

        </div>

        <div className="login-container">
          <img src="../assets/imgs/Chat.png" alt="Logo do SenaiGPT" />



          <h1
        
            id="meutitulo"
            className="titulo"
          >Login</h1>

          <input className="inpt" type="email" placeholder="insira o email" />
          <input className="inpt" type="password" placeholder="Insira a senha" />

          <button className="btn">Entrar</button>
        </div>



      </main>

      <footer></footer>

    </>
  )
}

export default Login;