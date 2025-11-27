import LevelsGrid from "../widgets/ui/LevelsGrid";

export default function MapPage()
{
    return (
        <main className=" relative bg-[url(LevelsBG.jpg)] bg-cover bg-no-repeat min-h-screen flex justify-center">
           <LevelsGrid/>
        </main>
    )
}