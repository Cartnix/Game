import { useEffect, useState } from "react";
import type { Snowflake } from "./model/SnowFallType";

export default function Snowfall() {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const snowflakes: Snowflake[] = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      snowflakes.push({
        id: i,
        left: Math.random() * 100,
        size: 5 + Math.random() * 10,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
      });
    }

    setFlakes(snowflakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute -top-50 text-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            borderRadius: "50%",
            backgroundColor: "white",
            animation: `fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            opacity: 0.8,
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(140vh); }
        }
      `}</style>
    </div>
  );
}
