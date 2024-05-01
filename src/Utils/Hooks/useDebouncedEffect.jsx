import React, { useEffect } from "react";

const useDebouncedEffect = (effect, delay, deps) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            effect();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, deps);
};

export default useDebouncedEffect;
