import { useState, useEffect, useCallback } from "react";


const getBoardSize = (size) => {
    const [scale, setScale] = useState(1);

    const setElementScale = useCallback(() => {
        const scaleX = (window.innerWidth * (5 / 12)) / size.width;
        const scaleY = (window.innerWidth * (5 / 12)) / size.height;
        const scale = Math.min(scaleX, scaleY);
        setScale(scale);
    }, [size]);

    useEffect(() => {

        setElementScale();
        
        window.addEventListener("resize", setElementScale);

        return () => {
            window.removeEventListener("resize", setElementScale);
        };
    }, [size]);

    return scale;
};

export default getBoardSize;
