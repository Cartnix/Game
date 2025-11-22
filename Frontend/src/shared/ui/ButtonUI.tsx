interface ButtonI{
    text: string,
    onClick: () => void
}

export default function ButtonUI({text, onClick}: ButtonI) {
    return (
        <button className="
            relative 
            px-10 py-4 
            rounded-full 
            bg-linear-to-b from-red-400 to-red-700
            shadow-lg shadow-red-500/50
            hover:scale-105 hover:shadow-xl
            transition-all duration-200
            text-white font-bold
            overflow-hidden
            cursor-pointer
            font-bubble
            " onClick={onClick}>
            {text}
        </button>
    )
}