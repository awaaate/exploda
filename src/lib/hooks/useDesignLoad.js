import { useEffect, useState } from "react";
import { getImageDataURL } from "../utils";

export const useDesignLoad = (imageURL) => {
    const [image, setImage] = useState("");
    const [loadEnd, setLoadEnd] = useState(false);
    useEffect(() => {
        const getImage = async () => {
            const response = await fetch(imageURL);
            const blob = await response.blob();
            const image = await getImageDataURL(blob);
            setImage(image);
        };

        getImage();
    }, [imageURL]);

    return image;
};
