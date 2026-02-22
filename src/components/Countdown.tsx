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
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            {timeBlocks.map((block) => (
                <div key={block.label} className="flex flex-col items-center justify-center p-3 md:p-4 bg-white/50 backdrop-blur-sm border border-gold-500/20 rounded-lg shadow-sm">
                    <span className="text-2xl md:text-3xl font-serif text-crimson mb-1">
                        {block.value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-primary-900/70 font-sans">
                        {block.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
