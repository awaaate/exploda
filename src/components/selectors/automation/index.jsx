import React, { useState, useEffect } from "react";
import UploadCSV from "./UploadCSV";
import Selectors from "./Selectors";
import { uuid } from "uuidv4";
import { getImageDataURL } from "../../../lib/utils";
import ImageLoader from "../../common/ImageLoader";
import { useDesignPropsContext } from "../../../lib/context/design/design.context";
import CreatedImagesList from "./CreatedImagesList";

import {
    setColors,
    setText,
    setImage,
} from "../../../lib/imageGenerationUtils";

export default function () {
    const [generationData, setGenerationData] = useState({});
    const [createdImages, setCreatedImages] = useState([]);
    const [data, setData] = useState(null);
    const [generatingImages, setGeneratingImages] = useState(false);

    const { size } = useDesignPropsContext();
    const set = (name, value) => {
        setGenerationData((data) => ({ ...data, [name.toLowerCase()]: value }));
    };
    useEffect(() => {
        setCreatedImages([]);
    }, [data, generationData]);

    const fetchImage = async (width, height, html) => {
        const response = await fetch(
            `/api/design?width=${width}&height=${height}&html=${html}`
        );
        const imageBlob = await response.blob();
        return await getImageDataURL(imageBlob);
    };
    const generateImages = async () => {
        const canvas = document.getElementById("canvas").cloneNode(true);
        setGeneratingImages("WORKING");
        let images = data.map((row, i) => {
            const primary = row[generationData.primary] || "#000";
            setColors({ row, generationData, canvas });
            setText({ row, generationData, canvas });
            setImage({ row, generationData, canvas });
            return canvas.innerHTML;
        });

        for (const imageData of images) {
            const newImage = await fetchImage(
                size.height,
                size.width,
                imageData
            );
            setCreatedImages((images) => [
                ...images,
                {
                    id: uuid(),
                    src: newImage,
                },
            ]);

            console.log("end");
        }
        setGeneratingImages("END");
    };

    return (
        <div className="h-full bg-white w-3/12 ">
            {data ? (
                generatingImages ? (
                    <CreatedImagesList
                        images={createdImages}
                        loadend={generatingImages === "END"}
                    />
                ) : (
                    <Selectors
                        header={Object.keys(data[0])}
                        set={set}
                        clearData={() => setData(null)}
                        generateImages={generateImages}
                    />
                )
            ) : (
                <UploadCSV setData={setData} />
            )}
        </div>
    );
}
