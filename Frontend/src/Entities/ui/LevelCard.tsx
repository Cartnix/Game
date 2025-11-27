import type { LevelCardI } from "../model/LevelCardI";

export default function LevelCard({ id, title, difficult, scores, technologies }: LevelCardI) {
    const difficultyColors: Record<string, string> = {
        Easy: "bg-green-500",
        Medium: "bg-yellow-500",
        Hard: "bg-orange-500",
        Expert: "bg-red-500"
    };

    return (
        <div className="rounded-2xl p-6 bg-white/80 backdrop-blur shadow-xl border border-gray-100 min-w-[350px] max-w-md w-full">
            <div className="flex justify-between items-start mb-5">
                <h3 className="text-2xl font-semibold text-gray-900">Level {id}</h3>
                <span className={`${difficultyColors[difficult]} px-3 py-1.5 rounded-xl text-xs font-medium uppercase tracking-wide text-white shadow`}>
                    {difficult}
                </span>
            </div>

            <h4 className="text-xl font-medium text-gray-800 mb-4">{title}</h4>

            <div className="mb-5">
                <p className="text-gray-600 text-sm mb-1">Очки</p>
                <span className="text-3xl font-bold text-blue-600">{scores}</span>
            </div>

            <div className="mb-7">
                <p className="text-gray-600 text-sm mb-2">Технологии</p>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium shadow-sm border border-blue-100"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            {/* <ButtonUI text="Enter the level!"/> */}
        </div>
    );
}