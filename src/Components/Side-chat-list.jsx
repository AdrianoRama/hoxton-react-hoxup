import { useNavigate } from "react-router-dom"



export default function SideChatList({ conversations, currentUser, users }) {

    const navigate = useNavigate()
    return (<ul>
        {/* <!-- This first item should always be present --> */}
        <li>
            <button className="chat-button">
                <div><h3>+ Start a new Chat</h3></div>
            </button>
        </li>
        {/* <!--  --> */}

        {
            // which id am i talking to
            conversations.map((conversation) => {
                const talkingToId = currentUser.id === conversation.userId
                    ? conversation.participantId
                    : conversation.userId

                // what are their details
                const talkingToUser = users.find(user => user.id === talkingToId)

                return <li>
                    <button className="chat-button" onClick={() => navigate(`/logged-in/${conversation.id}`)}>
                        <img
                            className="avatar"
                            height="50"
                            width="50"
                            alt=""
                            src={talkingToUser.avatar}
                        />
                        <div>
                            <h3>{talkingToUser.firstName} {talkingToUser.lastName}</h3>
                            <p>Last message</p>
                        </div>
                    </button>
                </li>
            })}
    </ul>


    )
}