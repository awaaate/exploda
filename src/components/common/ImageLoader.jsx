import React, { useState, useEffect } from "react";

import Spin from "./Spin";

const ImageLoader = ({ src, props }) => {
    const [loadEnd, setLoadEnd] = useState(false);
    useEffect(() => {
        setLoadEnd(false)
        if (src) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                setLoadEnd(true);
            };
        }
    }, [src]);
    return (
        <React.Fragment>
            {src ? (
                loadEnd ? (
                    <img src={src} {...props} />
                ) : (
                    <div className="w-full h-full shadow rounded-md bg-gray-100 flex items-center justify-center">
                        <Spin />
                    </div>
                )
            ) : null}
        </React.Fragment>
    );
};

export default ImageLoader;
