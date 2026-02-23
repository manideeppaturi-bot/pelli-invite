"use client";

import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Auto-play on first user interaction to bypass strict browser auto-play policies
        const handleInteraction = () => {
            if (!hasStarted) {
                audio.play().then(() => {
                    setIsPlaying(true);
                    setHasStarted(true);
                }).catch(() => {
                    // Browser policy blocked playback
                });
            }
        };

        if (!hasStarted) {
            window.addEventListener("click", handleInteraction, { once: true });
            window.addEventListener("scroll", handleInteraction, { once: true });
            window.addEventListener("touchstart", handleInteraction, { once: true });
        }

        // Listen for custom events dispatched by the IntroVideo component
        const handleVideoPlay = () => audio.pause();
        const handleVideoPause = () => {
            if (isPlaying) audio.play().catch(() => { });
        };

        window.addEventListener("video-playing", handleVideoPlay);
        window.addEventListener("video-paused", handleVideoPause);

        return () => {
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("video-playing", handleVideoPlay);
            window.removeEventListener("video-paused", handleVideoPause);
        };
    }, [isPlaying, hasStarted]);

    // Render an invisible audio element
    return <audio ref={audioRef} src="/bgm.mp3" loop />;
}
