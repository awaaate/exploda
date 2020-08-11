import React, { useEffect, useRef, useState } from "react";

import Designs from "./designs";

import { useDesignPropsContext } from "../lib/context/design/design.context";
import SizeSelector from "./selectors/Size";
import { uuid } from "uuidv4";
import ImageLoader from "./common/ImageLoader";
import { getBoardScale } from "../lib/utils";
import { useModal, Modal } from "./common/Modal";
import { generateImage } from "../lib/imageGenerationUtils";

import useGetBoardScale from "../lib/hooks/useGetBoardScale";
const Board = () => {
    const { size } = useDesignPropsContext();
    const [previewSrc, setPreviewSrc] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const scale = useGetBoardScale(size);
    const saveDesign = async () => {
        setModalIsOpen(true);
        const canvas = document.getElementById("canvas");
        try {
            const src = `/api/design?width=${size.width}&height=${
                size.height
            }&html=${encodeURI(generateImage(canvas))}`;
            setPreviewSrc(src);
        } catch (error) {
            console.log(error);
        }
    };

    const onModalCloseHandler = () => {
        setModalIsOpen(false);
    };
    // element max width is equal to 5 / 12 th part of width of the windows
    return (
        <div className="w-6/12  flex flex-col justify-center h-full">
            <div className="flex justify-around items-center select-none">
                <div
                    style={{
                        width: scale * size.width,
                        height: scale * size.height,
                    }}
                    className="relative"
                >
                    <Designs />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <SizeSelector />
                <button
                    onClick={saveDesign}
                    className="bg-orange-500 rounded-sm p-2 px-4  font-semibold uppercase text-white"
                >
                    Save
                </button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                closeHandler={onModalCloseHandler}
                className="flex items-center justify-center rounded-sm"
            >
                <ImageLoader src={previewSrc} download />
            </Modal>
        </div>
    );
};
export default Board;
