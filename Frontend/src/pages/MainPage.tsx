import { useState } from "react";
import ButtonUI from "../shared/ui/ButtonUI";
import LoginFormPortal from "../features/Autorisation/AutorisationForm";
import RegistrationFormPortal from "../features/Registration/RegistrationForm";

export default function MainPage() {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [isAutorisation, setAutorisation] = useState<boolean>(true)

    const switchForm = () => {
        setAutorisation(prev => !prev)
    }

    return (
        <main className="bg-[url('/mainBG.jpeg')] bg-cover bg-no-repeat w-full h-full min-h-screen min-w-screen items-center justify-center flex flex-col gap-8">
            <h1 className="
                text-6xl font-extrabold text-black
                px-10 py-4 rounded-[50px]
                bg-[radial-gradient(circle_at_30%_30%,white_20%,#6dd5fa_60%,#2980b9_100%)]
                shadow-[inset_0_0_30px_rgba(255,255,255,0.7),inset_0_0_10px_rgba(255,255,255,0.4),0_15px_30px_rgba(0,0,0,0.4)]
                inline-block">
                PyQuest
            </h1>

            <ButtonUI text="PLAY !" onClick={() => setOpen(true)} />

            {isOpen && (
                isAutorisation ?
                    <LoginFormPortal onClose={() => setOpen(false)} switchForm={switchForm} /> :
                    <RegistrationFormPortal onClose={() => setOpen(false)} switchForm={switchForm} />

            )}
        </main>
    )
}