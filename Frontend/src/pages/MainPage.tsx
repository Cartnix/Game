import { useState } from "react";
import ButtonUI from "../shared/ui/ButtonUI";
import RegistrationFormPortal from "../widgets/ui/RegistrationForm";

export default function MainPage() {

    const [isOpen, setOpen] = useState(false)

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

            <ButtonUI text="PLAY !" onClick={() => setOpen(true)}/>
            {isOpen && <RegistrationFormPortal onClose={() => setOpen(false)} />}
        </main>
    )
}