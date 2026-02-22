"use client";

import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Listen for custom events dispatched by the IntroVideo component
        const handleVideoPlay = () => audio.pause();
        const handleVideoPause = () => {
            if (isPlaying) audio.play().catch(() => { });
        };

        window.addEventListener("video-playing", handleVideoPlay);
        window.addEventListener("video-paused", handleVideoPause);

        return () => {
            window.removeEventListener("video-playing", handleVideoPlay);
            window.removeEventListener("video-paused", handleVideoPause);
        };
    }, [isPlaying]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(console.error);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Note: This requires a background music mp3 placed at public/bgm.mp3 */}
            <audio ref={audioRef} src="/bgm.mp3" loop />
            <button
                onClick={togglePlay}
                className="w-12 h-12 bg-gradient-to-br from-[#CF2F2A] to-[#8C1010] text-[#FDF9D2] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-[1px] border-[#E79300]/50"
                title="Toggle Background Music"
            >
                {isPlaying ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 9v6m4-6v6" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 pl-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </div>
    );
}
