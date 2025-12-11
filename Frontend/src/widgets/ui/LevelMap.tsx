import { useState, useEffect } from "react";
import { LevelsData } from "../../Entities/LevelCard/model/LevelsData";
import { useNavigate } from "react-router-dom";
import type { LevelCardI } from "../../Entities/LevelCard/model/LevelCardI";


interface LevelPosition {
  levelId: number;
  x: number;
  y: number;
}

const levelPositions: LevelPosition[] = [
  { levelId: 1, x: 10, y: 40 },
  { levelId: 2, x: 30, y: 40 },
  { levelId: 3, x: 50, y: 45 },
];

export default function LevelMap() {
  const [currentLevel, setCurrentLevel] = useState<Omit<LevelCardI, 'onClick'> | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = '/newBg.avif';
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.warn('Ошибка загрузки изображения /newBg.avif');
      setImageLoaded(true);
    };
  }, []);

  const openLevel = (level: Omit<LevelCardI, 'onClick'>) => {
    setCurrentLevel(level);
    setSelectedLevelId(level.id);
  };

  const closeModal = () => {
    setCurrentLevel(null);
  };

  const handleLevelClick = (levelId: number) => {
    const level = LevelsData.find(l => l.id === levelId);
    if (level) {
      openLevel(level);
    }
  };

  const handlePlayLevel = () => {
    if (currentLevel) {
      navigate(`/level/${currentLevel.id}`);
      closeModal();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{
          backgroundImage: `url('/newBg.avif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: imageLoaded ? 1 : 0,
        }}
      />

      {!imageLoaded && (
        <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900" />
      )}

      <div className="absolute inset-0 bg-black/20 z-5" />

      <div className="relative w-full h-full z-10">
        {levelPositions.map((pos) => {
          const level = LevelsData.find(l => l.id === pos.levelId);
          if (!level) return null;

          const isCompleted = false;
          const isSelected = selectedLevelId === pos.levelId;

          return (
            <button
              key={pos.levelId}
              onClick={() => handleLevelClick(pos.levelId)}
              className={`
                absolute transform -translate-x-1/2 -translate-y-1/2
                transition-all duration-200 cursor-pointer
                ${isSelected ? 'scale-125 z-20' : 'scale-100 z-10'}
                hover:scale-110
              `}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >

              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  font-bold text-lg shadow-lg
                  ${
                    isSelected
                      ? 'bg-yellow-400 text-black ring-4 ring-yellow-300'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }
                  transition-all duration-200
                `}
              >
                {pos.levelId}
              </div>

              <div className="text-center mt-2 text-white text-sm font-semibold drop-shadow-lg">
                {level.title}
              </div>
            </button>
          );
        })}
      </div>

      <div
        className={`
          fixed top-0 right-0 h-full w-96 bg-linear-to-b from-blue-900 to-blue-800
          shadow-2xl z-40 transition-transform duration-300 ease-in-out
          ${currentLevel ? 'translate-x-0' : 'translate-x-full'}
          p-8 overflow-y-auto border-l-4 border-blue-600
        `}
      >
        <button
          onClick={closeModal}
          className="absolute top-6 left-6 bg-red-500 hover:bg-red-600 text-white
                     rounded-full w-10 h-10 flex items-center justify-center
                     transition shadow-lg font-bold text-xl cursor-pointer"
        >
          ←
        </button>

        {currentLevel && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-4">{currentLevel.title}</h2>

            <div className="mb-6">
              <span
                className={`px-4 py-2 rounded-full text-white font-semibold text-sm
                  ${currentLevel.difficult === 'Easy' && 'bg-green-500'}
                  ${currentLevel.difficult === 'Medium' && 'bg-yellow-500'}
                  ${currentLevel.difficult === 'Hard' && 'bg-orange-500'}
                  ${currentLevel.difficult === 'Expert' && 'bg-red-500'}
                `}
              >
                {currentLevel.difficult}
              </span>
            </div>

            <div className="mb-6 bg-blue-700/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">Награда за уровень</p>
              <p className="text-2xl font-bold text-yellow-300">{currentLevel.scores} очков</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Технологии:</h3>
              <div className="flex flex-wrap gap-2">
                {currentLevel.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-600 text-blue-100 rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Задание:</h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm">
                {currentLevel.task}
              </p>
            </div>

            <button
              onClick={handlePlayLevel}
              className="w-full bg-linear-to-r from-blue-500 to-blue-600
                         hover:from-blue-600 hover:to-blue-700 text-white font-bold
                         py-3 px-6 rounded-lg transition shadow-lg cursor-pointer
                         text-lg mt-6"
            >
              Начать уровень
            </button>
          </div>
        )}
      </div>

      {/* Оверлей для закрытия меню */}
      {currentLevel && (
        <div
          className="fixed inset-0 bg-black/30 z-30 transition-opacity duration-300"
          onClick={closeModal}
        />
      )}
    </div>
  );
}
