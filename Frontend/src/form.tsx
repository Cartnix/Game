import { useState } from "react"

export default function AutorisationForm()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const RES = await fetch("http://127.0.0.1:8000/registration", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({username, password})
        })

        const data = await RES.json();
        console.log(data)
    }
    return (
        <form action="POST" onSubmit={HandleSubmit} className="flex flex-col gap-4 bg-[#413030] p-5 rounded-2xl">
            <input 
            type="text" 
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input 
            type="password" 
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
                Enter
            </button>
        </form>
    )
}