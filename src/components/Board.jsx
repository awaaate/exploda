import React, { useEffect, useRef, useState } from "react";
import { useBoardContext } from "../lib/context/BoardContext";

import Designs from "./designs";

import { useDesignPropsContext } from "../lib/context/designProps/context";
import SizeSelector from "./selectors/Size";
import { uuid } from "uuidv4";
import ImageLoader from "./common/ImageLoader";

const Board = () => {
    const { size } = useDesignPropsContext();
    const [previewSrc, setPreviewSrc] = useState("");
    const [scale, setScale] = useState(500 / size.width);
    const saveDesign = async () => {
        const el = document.getElementById("canvas");
        try {
            fetch('http://localhost:3000/design')
            const src = `http://localhost:3000/api/design?width=${
                size.width
            }&height=${size.height}&html=${encodeURI(el.innerHTML)}`;
            setPreviewSrc(src);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setScale(Math.min(500 / size.width));
    }, [size]);

    return (
        <div className="flex flex-col justify-center h-full">
            <div className="flex justify-around items-center select-none">
                <div
                    style={{
                        width: (500 / size.width) * size.width,
                        height: (500 / size.width) * size.height,
                    }}
                    className="bg-red-500 relative"
                >
                    <Designs scale={scale} />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <SizeSelector />
                <ImageLoader src={previewSrc} />
                <button onClick={saveDesign}>Save</button>
            </div>
        </div>
    );
};
export default Board;
