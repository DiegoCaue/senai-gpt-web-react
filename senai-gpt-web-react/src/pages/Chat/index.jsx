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
    const [chatSelecionado, setChatSelecionado] = useState(null);
    useEffect(() => {
        //Executa toda vez que a tela abre
        getChats()
    }, []);

    const [userMessage, setUserMessage] = useState ("");

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
            localStorage.clear();
            window.location.href = "/login";

        }
    }

    const onLogOutClick = () => {

        localStorage.clear();
        window.location.href = "/login"
    }

    const clickChat = (chat) => {

        setChatSelecionado(chat);
        console.log(chat)

    }

    const chatGPT = async (message) => {

        // Configurações do endpoint e chave da API
        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "";
        const deploymentId = "gpt-4"; // Nome do deployment no Azure OpenAI
        const apiVersion = "2024-05-01-preview"; // Verifique a versão na documentação

        // URL para a chamada da API
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

        // Configurações do corpo da requisição
        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };

        // Cabeçalhos da requisição
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        // Faz a requisição com fetch
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            return botMessage;
        }

    }

    const enviarMensagem = async (message) => {

        let resposta = await chatGPT(message)

        console.log("Resposta: ", resposta)

        let novaRespostaUsuarioGpt

        let novaMensagemUsuarioGpt = {

            userId: "",
            text: message,
            id:10

        };

        let novoChatSelecionado = { ...chatSelecionado};
        novoChatSelecionado.messages.push(novaRespostaUsuarioGpt)
        novoChatSelecionado.message.push(novaMensagemUsuarioGpt);




    }

    return (
        <>
            <div className="container">

                <header className="left-panel">

                    <div className="top">

                        <button className="btn-new-chat">+ New chat</button>


                        {chats.map(chat => (
                            <button className="btn-chat" onClick={() => clickChat(chat)}>
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
                        <button className="btn-chat" onClick={() => onLogOutClick()}><img src={Log} />Log out</button>

                    </div>

                </header>

                <main className="central-panel">

                    {chatSelecionado == null && (

                        <>
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
                        </>

                    )}

                    {chatSelecionado != null && (

                        <>

                            <div className="chat-container">

                                <div className="chat-header">

                                    <h2>{chatSelecionado.chatTitle}</h2>

                                </div>

                                <div className="chat-messages">

                                    {chatSelecionado.messages.map(message => (

                                        <p className={"message-item " + (message.userId =="chatbot"? "chatbot" : "")}>{message.text}</p>

                                    ))}

                                </div>

                            </div>

                        </>

                    )}

                    <div className="input-container-1">

                        <img src={microfone} alt="Microphone." />
                        <img src={imagem} alt="Image." />

                        <input 
                        value= {userMessage} 
                        onChange ={event => setUserMessage(event.target.value)}
                        placeholder="Type a message." 
                        type="text" 
                        />

                        <img onClick={() => enviarMensagem(userMessage)} src={seta} 
                        alt="Send." />

                    </div>

                </main>

            </div>

        </>


    )
};

export default Chat;