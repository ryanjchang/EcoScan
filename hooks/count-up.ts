import { useState, useEffect } from "react";

export function useCountUp(end: number, duration: number){
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1){
                animationFrame = requestAnimationFrame(animate);
            }
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return count;
}