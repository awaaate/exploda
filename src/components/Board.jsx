import React, { useEffect, useRef, useState } from "react";
import { useBoardContext } from "../lib/context/BoardContext";

import Designs from "./designs";
import { getPalette } from "../lib/getPalette";

import { useDesignPropsContext } from "../lib/context/DesignPropsContext";
import SizeSelector from "./selectors/Size";
import { uuid } from "uuidv4";
import ImageLoader from "./common/ImageLoader";

const Board = () => {
    const {
        colors,
        setImagesList,
        imagesList,
        index,
        setPalette,
    } = useBoardContext();
    const { setColors, setImage, size, image } = useDesignPropsContext();
    const [previewSrc, setPreviewSrc] = useState("");
    const img = useRef(null);
    useEffect(() => {
        const img = new Image();

        img.crossOrigin = "Anonymous";
        img.src = image;
        img.onload = () => {
            const palette = getPalette(img);
            setColors(palette[0]);
            setPalette(palette[1]);
        };
        if (!imagesList.includes(image)) {
            setImagesList((images) => [image, ...images]);
        }
    }, [image]);

    const saveDesign = async () => {
        const el = document.getElementById("canvas");
        const id = uuid();
        try {
            const src = `http://localhost:3000/api/design?width=${
                size.width
            }&height=${size.height}&html=${encodeURI(el.innerHTML)}`;
            setPreviewSrc(src);
        } catch (error) {
            console.log(error);
        }
    };
    const scale = Math.min(500 / size.width, 700 / size.height);

    return (
        <div className="flex flex-col items-center">
            <div
                style={{ height: 750 }}
                className="flex justify-around items-center"
            >
                <div
                    style={{
                        width: 500,
                        height: (500 / size.width) * size.height,
                    }}
                    className="bg-red-500 h-full relative"
                >
                    <Designs index={index} colors={colors} />
                </div>
            </div>
            <SizeSelector />
            <ImageLoader src={previewSrc} />
            <button onClick={saveDesign}>Save</button>
        </div>
    );
};
export default Board;
