"use client";

export default function ParticlesPreview() {
    return (
        <div className="min-h-screen bg-[#3B8A73] flex flex-col items-center justify-start py-20 px-4 text-center text-[#FDF9D2] font-sans">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide text-[#E79300]">Particle Icons</h1>
            <p className="mb-16 opacity-90 max-w-lg">
                Preview the different authentic SVG particles you can choose for the background floating effect. You can choose one, or ask for a mix of all three!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {/* Option 1: Traditional Clay Diyas */}
                <div className="bg-[#1D4A3E] p-8 rounded-[40px] flex flex-col items-center shadow-xl border border-[#E79300]/20">
                    <h2 className="text-2xl font-bold mb-8 text-[#FDF9D2]">1. Traditional Diyas</h2>
                    <div className="relative w-32 h-32 bg-[#3B8A73]/50 p-4 rounded-3xl flex items-center justify-center shadow-inner border border-[#E79300]/10 mb-6">
                        <svg viewBox="0 0 64 64" className="w-20 h-20 overflow-visible drop-shadow-[0_4px_10px_rgba(255,165,0,0.4)]">
                            <path d="M32 5 Q38 20 32 30 Q26 20 32 5 Z" fill="#FFC107" className="animate-pulse drop-shadow-[0_0_8px_rgba(255,200,0,0.8)]" />
                            <path d="M32 12 Q35 20 32 26 Q29 20 32 12 Z" fill="#FFE082" />
                            <path d="M10 30 Q32 55 54 30 Z" fill="#A03A21" />
                            <path d="M10 30 Q32 40 54 30 Z" fill="#7D2915" />
                            <circle cx="32" cy="30" r="16" fill="#CC4B2A" />
                        </svg>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed px-4">
                        Crisp vector oil lamps that softly pulse with a warm yellow animated flame.
                    </p>
                </div>

                {/* Option 2: Marigold Flowers */}
                <div className="bg-[#1D4A3E] p-8 rounded-[40px] flex flex-col items-center shadow-xl border border-[#E79300]/20">
                    <h2 className="text-2xl font-bold mb-8 text-[#FDF9D2]">2. Marigolds</h2>
                    <div className="relative w-32 h-32 bg-[#3B8A73]/50 p-4 rounded-3xl flex items-center justify-center shadow-inner border border-[#E79300]/10 mb-6">
                        <div className="w-20 h-20 animate-[spin_12s_linear_infinite] drop-shadow-lg">
                            <svg viewBox="0 0 64 64" className="w-full h-full">
                                <circle cx="32" cy="32" r="28" fill="#F57C00" />
                                <circle cx="32" cy="32" r="20" fill="#FF9800" />
                                <circle cx="32" cy="32" r="12" fill="#FFC107" />
                                <path d="M32 4 L32 60 M4 32 L60 32 M12 12 L52 52 M12 52 L52 12" stroke="#E65100" strokeWidth="3" strokeDasharray="2 6" className="opacity-50" />
                                <circle cx="32" cy="32" r="4" fill="#FFEB3B" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed px-4">
                        Traditional orange and yellow Indian marigolds that slowly rotate as they rise.
                    </p>
                </div>

                {/* Option 3: Glowing Orbs */}
                <div className="bg-[#1D4A3E] p-8 rounded-[40px] flex flex-col items-center shadow-xl border border-[#E79300]/20">
                    <h2 className="text-2xl font-bold mb-8 text-[#FDF9D2]">3. Firefly Orbs</h2>
                    <div className="relative w-32 h-32 bg-[#3B8A73]/50 p-4 rounded-3xl flex items-center justify-center shadow-inner border border-[#E79300]/10 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-200 to-orange-400 blur-[3px] opacity-90 shadow-[0_0_20px_rgba(255,200,0,1)]" />
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed px-4">
                        Ambient, blurred glowing spheres acting like warm magical fireflies.
                    </p>
                </div>
            </div>
        </div>
    );
}
