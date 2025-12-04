import { useState, useEffect, useRef } from "react";

interface TimerI {
    start: number;
}

export default function Countdown ({start}: TimerI){
  const [time, setTime] = useState(start);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return <div>Осталось: {time} секунд</div>;
};
