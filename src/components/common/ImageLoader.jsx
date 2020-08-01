import React, { useState, useEffect } from "react";

import Spin from "./Spin";

const ImageLoader = ({ src, props }) => {
    const [loadEnd, setLoadEnd] = useState(false);
    useEffect(() => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            setLoadEnd(true);
        };
    }, []);
    return (
        <React.Fragment>
            {loadEnd ? (
                <img src={src} {...props} />
            ) : (
                <div className="w-full h-full shadow rounded-md bg-gray-100 flex items-center justify-center">
                    <Spin />
                </div>
            )}
        </React.Fragment>
    );
};

export default ImageLoader;
