import "./chat.css"
import Star from "../../assets/imgs/Star.svg"
import chatIcon from "../../assets/imgs/chat.svg"
import chatchat from "../../assets/imgs/Chat.png"
import lixeira from "../../assets/imgs/lixeira.svg"
import microfone from "../../assets/imgs/mic.svg"
import seta from "../../assets/imgs/seta.svg"
import imagem from "../../assets/imgs/img.svg"
import Luz from "../../assets/imgs/Luz.svg"
import Conta from "../../assets/imgs/conta.svg"
import Arrow from "../../assets/imgs/ArrowSquareOut.svg"
import Log from "../../assets/imgs/log.svg"
import Perguntas from "../../assets/imgs/Perguntas.svg"
import mensagemIcon from "../../assets/imgs/mensagem.svg"
import { useEffect, useState } from "react"


function Chat() {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        //Executa toda vez que a tela abre
        getChats()
    }, []);

    const getChats = async () => {

        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });


        console.log(response);

        if (response.ok == true) {
            let json = await response.json(); //Pegue as informacoes do site

            setChats(json);

        } else {
            if (response.status == 401)

                alert("Token invalido faca login novamente ");
            window.location.href = "/login";

        }
    }

    const onLogOutClick = () => {

        localStorage.clear();
        window.location.href = "/login"
    }

    return (
        <>
            <div className="container">

                <header className="left-panel">

                    <div className="top">

                        <button className="btn-new-chat">+ New chat</button>


                        {chats.map(chat => (
                            <button className="btn-chat">
                                <img src={chatIcon} alt="ícone de chat." />
                                {chat.chatTitle}
                            </button>
                        ))}


                    </div>

                    <div className="bottom">

                        <button className="btn-chat"> <img src={lixeira} />Clear conversations</button>
                        <button className="btn-chat"> <img src={Luz} />Light mode</button>
                        <button className="btn-chat"> < img src={Conta} />My account</button>
                        <button className="btn-chat"> <img src={Arrow} />Updates & FAQ</button>
                        <button className="btn-chat"  onClick={() => onLogOutClick()}><img src={Log} />Log out</button>

                    </div>

                </header>

                <main className="central-panel">

                    <div className="logo">
                        <img src={chatchat} alt="Logo do SenaiGPT." />
                    </div>

                    <div className="dicas-container">

                        <div className="dicas-item">

                            <h2>
                                <img src={Star} alt="Example icon." />
                                Examples
                            </h2>

                            <p>Explique como um computador quântico funciona.</p>
                            <p>Explique como um computador quântico funciona.</p>
                            <p>Explique como um computador quântico funciona.</p>

                        </div>

                        <div className="dicas-item">

                            <h2>
                                <img src={mensagemIcon} alt="Example icon." />
                                Capabilities
                            </h2>

                            <p>Explique como um computador quântico funciona.</p>
                            <p>Explique como um computador quântico funciona.</p>
                            <p>Explique como um computador quântico funciona.</p>

                        </div>

                        <div className="dicas-item">

                            <h2>
                                <img src={Perguntas} alt="Example icon." />
                                Limitations
                            </h2>

                            <p>Explique como um computador quântico funciona.</p>
                            <p>Explique como um computador quântico funciona.</p>
                            <p>Explique como um computador quântico funciona.</p>

                        </div>

                    </div>

                    <div className="input-container-1">

                        <img src={microfone} alt="Microphone." />
                        <img src={imagem} alt="Image." />

                        <input placeholder="Type a message." type="text" />

                        <img src={seta} alt="Send." />

                    </div>

                </main>

            </div>

        </>


    )
};

export default Chat;