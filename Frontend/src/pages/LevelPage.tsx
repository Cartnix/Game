import { useState } from "react";
import { useParams } from "react-router-dom";
import { LevelsData } from "../Entities/model/LevelsData";

export default function LevelPage(){
  const { id } = useParams<{ id: string }>();
  const level = LevelsData.find(l => l.id === Number(id));

  const [answer, setAnswer] = useState("");

  if (!level) return <div className="p-6 text-center">Уровень не найден</div>;

  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-orange-500",
    Expert: "bg-red-500"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{level.title}</h1>
          <span
            className={`${difficultyColors[level.difficult] || "bg-gray-400"} px-4 py-1.5 rounded-full text-white font-semibold`}
          >
            {level.difficult}
          </span>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">Технологии:</h2>
          <div className="flex flex-wrap gap-2">
            {level.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium shadow-sm border border-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">Задание:</h2>
          <p className="text-gray-600">
            Введите решение задачи, используя знания по указанным технологиям.
          </p>
        </div>

        <div className="mb-4">
          <textarea
            className="text-black w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"
            placeholder="Введите ваш ответ здесь..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          Submit
        </button>
      </div>
    </div>
  );
};
