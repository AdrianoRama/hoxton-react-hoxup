import MainMessages from "./Main-messages-list";
import SideChatList from "./Side-chat-list";
import '../styles/index.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function MainApp({ currentUser, logOut, users }) {

    const [conversations, setConversations] = useState([])
    const [currentConversation, setCurrentConversation] = useState(null)

    const params = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser === null) {
            navigate('/')
        }
    }, [currentUser])



    useEffect(() => {
        if (params.id) {
            fetch(`http://localhost:4000/conversations/${params.id}?_embed=messages`)
                .then(response => response.json())
                .then(conversationFromServer => setCurrentConversation(conversationFromServer))
        }
    }, [params.id])

    useEffect(() => {

        if (currentUser === null) return

        fetch(`http://localhost:4000/conversations?userId=${currentUser.id}`)
            .then(response => response.json())
            .then(conversations => setConversations(conversations))
    }, [currentUser])

    if (!currentUser) return null

    return (<div className="main-wrapper">
        {/* <!-- Side Panel --> */}
        <aside>
            {/* <!-- Side Header --> */}
            <header className="panel">
                <img
                    className="avatar"
                    width="50"
                    height="50"
                    src={currentUser.avatar}
                    alt=""
                />
                <h3>{currentUser.firstName}</h3>
                <button className="log-out" onClick={() => {
                    logOut()
                }}>LOG OUT</button>
            </header>

            {/* <!-- Search form --> */}
            <form className="aside__search-container">
                <input
                    type="search"
                    name="messagesSearch"
                    placeholder="Search chats"
                    value=""
                />
            </form>
            <SideChatList conversations={conversations} currentUser={currentUser} users={users} />
        </aside>

        {/* <!-- Main Chat Section --> */}
        <main className="conversation">
            {/* <!-- Chat header --> */}
            <header className="panel"></header>

            {/* <!--The Messages List will go here. Check main-messages-list.html--> */}
            {params.id ? (
                <MainMessages currentConversation={currentConversation} id={params.id} />) : null
            }
            {/* <!-- Message Box --> */}
            <footer>
                <form className="panel conversation__message-box">
                    <textarea
                        placeholder="Type a message"
                        rows={1}
                        value=""
                    /><button type="submit">
                        {/* <!-- This is the send button --> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path
                                fill="currentColor"
                                d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                            ></path>
                        </svg>
                    </button>
                </form>
            </footer>
        </main>
    </div>


    )
}