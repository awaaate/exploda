import React, { useEffect, useReducer, useRef } from "react";
import { useBoardContext } from "../lib/context/BoardContext";

import Designs from "./designs";
import { getPalette } from "../lib/getPalette";

import { useDesignPropsContext } from "../lib/context/DesignPropsContext";
import SizeSelector from "./selectors/Size";
import dynamic from "next/dynamic";
import { uuid } from "uuidv4";
let html2canvas = null;
import("html2canvas").then((a) => (html2canvas = a.default));

const Board = () => {
    const {
        colors,
        setImagesList,
        imagesList,
        index,
        setPalette,
    } = useBoardContext();
    const { setColors, setImage, size, image } = useDesignPropsContext();
    const { setDesigns } = useBoardContext();
    const link = useRef(null);
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
        const canvas = document.getElementById("canvas");
        const id = uuid();
        console.log(id)
        setDesigns((designs) => [{ id, design: canvas.innerHTML }, ...designs]);
    };
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
            <button onClick={saveDesign}>Save</button>
        </div>
    );
};
export default Board;
