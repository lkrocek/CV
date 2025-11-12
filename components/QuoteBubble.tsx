import React from 'react';

export const QuoteBubble: React.FC<{ language: 'en' | 'cs' }> = ({ language }) => {
    const quotes = {
        en: "I like to keep the code well-formatted and optimized, but most importantly, I think about whether it makes sense for the assignment first.",
        cs: "Rád udržuji kód dobře formátovaný a optimalizovaný, ale nejdůležitější je, že nejprve přemýšlím, jestli dává zadání smysl."
    };

    return (
        <div className="max-w-[180px] bg-gray-100/80 backdrop-blur-sm p-3 rounded-lg shadow-lg opacity-80">
            <blockquote className="text-[10px] text-gray-800 italic text-center leading-tight">
                “{quotes[language]}”
            </blockquote>
            {/* The tail is removed as it doesn't fit the corner position well. */}
        </div>
    );
};
