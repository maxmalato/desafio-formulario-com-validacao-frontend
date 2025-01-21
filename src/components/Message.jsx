const Message = ({ message, type }) => {
    if (!message) return null

    const styleMessage = type === "sucesso" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"

    return (
        <div className={`p-2 rounded-lg w-96 mt-5 ${styleMessage}`}>
            {message}
        </div>
    )
}

export default Message