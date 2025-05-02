import * as React from "react";

interface PomodoroTimerProps {
  initialMinutes?: number;
}

export function PomodoroTimer({ initialMinutes = 25 }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            clearInterval(intervalRef.current!);
            // Request notification permission and show notification when timer ends
            if (Notification.permission === "granted") {
              new Notification("Pomodoro Timer", {
                body: "Time is up! Take a break.",
                icon: "/favicon.ico",
              });
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(initialMinutes * 60);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialMinutes * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const requestNotificationPermission = async () => {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  React.useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="text-white">
      <div className="text-4xl font-bold mb-4 text-center">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isRunning ? "Pause" : timeLeft === 0 ? "Restart" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
