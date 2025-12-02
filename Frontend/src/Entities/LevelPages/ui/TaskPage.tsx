import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LevelsData } from "../../LevelCard/model/LevelsData";

export default function TaskPage() {
  const { id } = useParams<{ id: string }>();
  const level = LevelsData.find(l => l.id === Number(id));
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");

  if (!level) return <div className="p-6 text-center">Уровень не найден</div>;

  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-orange-500",
    Expert: "bg-red-500",
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      
      {/* Левая половина — панель с задачей */}
      <div className="w-1/2 min-w-[450px] bg-white shadow-2xl border-r border-gray-200 p-8 overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="
              flex absolute -left-2 top-0 items-center gap-2
              px-4 py-2
              rounded-xl
              bg-gray-200 text-gray-800
              font-medium
              shadow-md
              hover:bg-gray-300
              active:bg-gray-400
              transition
            "
          >
            ← Назад
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mx-auto">{level.title}</h1>

          <span
            className={`${difficultyColors[level.difficult] || "bg-gray-400"} 
              px-4 py-1.5 rounded-full text-white font-semibold shadow-md`}
          >
            {level.difficult}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-2 text-lg">Технологии:</h2>
          <div className="flex flex-wrap gap-2">
            {level.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium shadow-sm border border-blue-100 select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 text-gray-700">
          <h2 className="font-semibold text-lg mb-2">Задание:</h2>
          <p className="leading-relaxed whitespace-pre-line">
            {level.task}
          </p>
        </div>

        <div className="mb-6">
          <textarea
            className="text-black w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"
            placeholder="Введите ваш ответ здесь..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition shadow-lg"
        >
          Submit
        </button>
      </div>

      {/* Правая половина — игровая зона */}
      <div className="w-1/2 bg-[#0d1021] flex items-center justify-center">
        <span className="text-white/30 text-lg select-none">Тут будет игра…</span>
      </div>
    </div>
  );
}

