import { useState, useEffect, useRef } from "react";

interface CountdownI {
  start: number;
}

export default function Countdown({ start }: CountdownI) {
  const [time, setTime] = useState(start);
  const timerRef = useRef<number | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        setPulse(true);
        setTimeout(() => setPulse(false), 200);
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-32">
      <span
        className={`text-3xl font-bold transition-transform duration-200 ${
          pulse ? "text-red-600 scale-125" : "text-red-500 scale-100"
        }`}
      >
        Осталось: {time}s
      </span>
    </div>
  );
}
