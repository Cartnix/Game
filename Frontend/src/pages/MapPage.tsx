import Snowfall from "../features/ShowFall/ShowFall";
import LevelMap from "../widgets/ui/LevelMap";

export default function MapPage()
{
    return (
        <main className="relative w-full min-h-screen">
            <Snowfall/>
           <LevelMap/>
        </main>
    )
}