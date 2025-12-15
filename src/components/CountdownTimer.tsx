import { useEffect, useState } from 'react';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ hours: 0, minutes: 0, seconds: 0 });

  const getTimeUntilMidnight = (): TimeRemaining => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCHours(24, 0, 0, 0); // Next midnight UTC
    const diff = tomorrow.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    // Set initial time
    setTimeRemaining(getTimeUntilMidnight());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(getTimeUntilMidnight());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="glass rounded-xl px-6 py-4 border border-scarlet/20 inline-block">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-scarlet/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-scarlet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-text-secondary uppercase tracking-wide">Next Shuffle In</p>
          <p className="text-lg font-semibold text-ivory font-mono">
            {formatTime(timeRemaining.hours)}h {formatTime(timeRemaining.minutes)}m {formatTime(timeRemaining.seconds)}s
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
