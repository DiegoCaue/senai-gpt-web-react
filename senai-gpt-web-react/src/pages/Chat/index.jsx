import "./chat.css"
import Star from "../../assets/imgs/Star.svg"
import chat from "../../assets/imgs/chat.svg"
import chatchat from "../../assets/imgs/Chat.png"
import { useEffect, useState } from "react"


function Chat() {

    const [chats, setChats] = useState([]); 

    useEffect(() => {
        //Executa toda vez que a tela abre
      getChats()
    },[]);

  const getChats = async () => {
     
    let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("meuToken")
        }
    });

    
    console.log(response);

        if (response.ok ==true) {
            let json = await response.json(); //Pegue as informacoes do site

            setChats(json);

        }  else {
            if (response.status == 401)

                alert("Token invalido faca login novamente ");
                window.location.href = "/login";


        }


 
  }


    return (
        <>
 <div className="container">
        
        <header className="left-panel">
    
            <div className="top">
    
                <button className="btn-new-chat">+ New chat</button>
    

                    {chats.map(chat => (
                         <button className="btn-chat">
                         <img src={chat} alt="ícone de chat."/>
                         {chat.chatTitle}
                     </button>
                    ))}
                
                
              

            </div>
    
            <div className="bottom">
    
                <button className="btn-chat">Clear conversations</button>
                <button className="btn-chat">Light mode</button>
                <button className="btn-chat">My account</button>
                <button className="btn-chat">Updates & FAQ</button>
                <button className="btn-chat">Log out</button>
                
            </div>
    
        </header>
        
        <main className="central-panel">
    
            <div className="logo">
                <img src={chatchat} alt="Logo do SenaiGPT."/>
            </div>
    
            <div className="dicas-container">

                <div className="dicas-item">

                    <h2>
                        <img src={Star} alt="Example icon."/>
                        Examples
                    </h2>

                    <p>Explique como um computador quântico funciona.</p>
                    <p>Explique como um computador quântico funciona.</p>
                    <p>Explique como um computador quântico funciona.</p>

                </div>

                <div className="dicas-item">

                    <h2>
                        <img src={Star} alt="Example icon."/>
                        Examples
                    </h2>

                    <p>Explique como um computador quântico funciona.</p>
                    <p>Explique como um computador quântico funciona.</p>
                    <p>Explique como um computador quântico funciona.</p>

                </div>

                <div className="dicas-item">

                    <h2>
                        <img src={Star} alt="Example icon."/>
                        Examples
                    </h2>
                    
                    <p>Explique como um computador quântico funciona.</p>
                    <p>Explique como um computador quântico funciona.</p>
                    <p>Explique como um computador quântico funciona.</p>

                </div>

            </div>

            <div className="input-container-1">

                <img src="../assets/imgs/mic.svg" alt="Microphone."/>
                <img src="../assets/imgs/img.svg" alt="Image."/>
                
                <input placeholder="Type a message." type="text"/>
                
                <img src="../assets/imgs/send.svg" alt="Send."/>

            </div>

        </main>

    </div>
                
            </>


            )
};

            export default Chat;