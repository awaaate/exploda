import React, { useState, useEffect } from "react";

import Spin from "./Spin";
import { getImageDataURL } from "../../lib/utils";
import { downloadImage } from "../../lib/imageGenerationUtils";

const ImageLoader = ({ src, download, ...props }) => {
    const [loadEnd, setLoadEnd] = useState(false);
    useEffect(() => {
        setLoadEnd(false);
        if (src) {
            const image = new Image();
            image.src = src;
            image.onload = async () => {
                if (image.complete && image.naturalHeight > 0) {
                    setLoadEnd(true);
                    /*       if (download) {
                        const response = await fetch(src);
                        const data = await response.blob();
                        console.log(data)
                        downloadImage(data, "exploda.jpeg");
                    } */
                }
            };
        }
    }, [src]);
    return (
        <React.Fragment>
            {src ? (
                loadEnd ? (
                    <img src={src} {...props} />
                ) : (
                    <div
                        className="w-full h-full shadow rounded-md bg-gray-100 flex items-center justify-center"
                        style={{ height: props.height || "100%" }}
                    >
                        <Spin />
                    </div>
                )
            ) : null}
        </React.Fragment>
    );
};

export default ImageLoader;
