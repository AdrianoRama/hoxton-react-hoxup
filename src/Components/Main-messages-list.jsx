

function Message({ id, message }) {
    console.log(message, id)
    const className = message.userId === Number(id) ? "outgoing" : ""

    return <li className={className}><p>{message.messageText}</p></li>
}

export default function MainMessages({ currentConversation, id }) {



    const messages = currentConversation?.messages

    const msgs = messages?.map((message) => {

        return <Message id={id} message={message} />
    })

    return (<ul className="conversation__messages">

        {msgs}

    </ul>


    )
}