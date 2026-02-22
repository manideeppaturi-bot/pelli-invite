"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
    targetDate: string;
}

export function Countdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const timeBlocks = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
    ];

    // Prevent hydration mismatch by initially rendering without the real values
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
            setMounted(true);
        }
        return () => { isMounted = false; };
    }, []);

    if (!mounted) return null;

    return (
        <div className="grid grid-cols-4 gap-2 md:gap-6 text-center">
            {timeBlocks.map((block) => (
                <div key={block.label} className="flex flex-col items-center justify-center p-2 bg-transparent border-none">
                    <span className="text-3xl md:text-5xl font-serif text-[#CF2F2A] mb-1">
                        {block.value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#E79300] font-sans font-bold">
                        {block.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
