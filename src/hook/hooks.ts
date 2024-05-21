import { useEffect, useState } from "react";

export const loadFromLocalStorage = (key :string) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return undefined;
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        return undefined;
    }
};

export const saveToLocalStorage = (key :string , value :any) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};


export const formatNumber = (number: number) => {
    if (number >= 1_000_000) {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 0
        }).format(number) + 'M';
    }
    else {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 0
        }).format(number);
    }
};



const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;