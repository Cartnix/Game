import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LevelsData } from "../../LevelCard/model/LevelsData";
import { Play, Loader2, CheckCircle, Terminal } from "lucide-react";
import usePyodide from "../../../features/usePyodide";
import { CodeOutput } from "../../../widgets/ui/CodeEditor/ui/CodeOutput";

export default function TaskPage() {
  const { id } = useParams<{ id: string }>();
  const level = LevelsData.find(l => l.id === Number(id));
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const { output, error, isRunning,pyodideReady, runCode} = usePyodide();

  const HandleRunCode = () => {
    runCode(code)
  }
  
  if (!level) return <div className="p-6 text-center">Уровень не найден</div>;

  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-orange-500",
    Expert: "bg-red-500",
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      
      <div className="w-1/2 min-w-[450px] bg-white shadow-2xl border-r border-gray-200 p-8 overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="flex absolute -left-2 top-0 items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium shadow-md hover:bg-gray-300 active:bg-gray-400 transition"
          >
            ← Назад
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mx-auto">{level.title}</h1>

          <span
            className={`${difficultyColors[level.difficult] || "bg-gray-400"} px-4 py-1.5 rounded-full text-white font-semibold shadow-md`}
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

        <div className="mb-4 flex items-center gap-2">
          {!pyodideReady ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-sm text-gray-600">Загрузка Python...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Python готов</span>
            </>
          )}
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2 text-lg flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Ваш код:
          </h2>
          <textarea
            className="w-full border-2 border-gray-300 rounded-xl p-4 font-mono text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-64 bg-gray-50"
            placeholder="Напишите ваш Python код здесь..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        <button
          onClick={HandleRunCode}
          disabled={!pyodideReady || isRunning}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Выполняется...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Запустить код
            </>
          )}
        </button>
      </div>

      <div className="w-1/2 bg-[#0d1021] p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Результаты</h2>

          <CodeOutput output={output} error={error}/>
          
      </div>
    </div>
  );
}