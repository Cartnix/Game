import { useState } from "react";
import type { LevelCardI } from "../../Entities/LevelCard/model/LevelCardI";
import { LevelsData } from "../../Entities/LevelCard/model/LevelsData";
import LevelCard from "../../Entities/LevelCard/ui/LevelCard";
import { useNavigate } from "react-router-dom";

export default function LevelsGrid() {
  const [currentLevel, setCurrentLevel] = useState<Omit<LevelCardI, 'onClick'> | null>(null);
  const navigate = useNavigate();

  const openLevel = (level: Omit<LevelCardI, 'onClick'>) => {
    setCurrentLevel(level);
  };

  const closeModal = () => {
    setCurrentLevel(null);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 p-6 flex flex-col items-center gap-6 
                      bg-[#374cc4] max-w-[450px] mx-auto backdrop-blur-2xl h-screen">
        <h2 className="text-2xl font-bold text-white uppercase">Levels</h2>

        <div className="grid grid-cols-3 gap-9">
          {LevelsData.map((level) => (
            <button
              key={level.id}
              onClick={() => openLevel(level)}
              className="w-20 h-20 bg-red-500 text-white text-2xl font-bold 
                         flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)" }}
            >
              {level.id}
            </button>
          ))}
        </div>
      </div>

      {currentLevel && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-white rounded-full w-10 h-10 
                         flex items-center justify-center shadow-lg hover:bg-gray-100 
                         transition z-10 text-gray-700 font-bold text-xl cursor-pointer"
            >
              ×
            </button>
            
            <LevelCard
              id={currentLevel.id}
              title={currentLevel.title}
              difficult={currentLevel.difficult}
              scores={currentLevel.scores}
              technologies={currentLevel.technologies}
              onClick={() => navigate(`/level/${currentLevel.id}`)}
            />
          </div>
        </div>
      )}
    </div>
  );
}