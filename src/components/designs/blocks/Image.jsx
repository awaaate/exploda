import { useState } from "react";
import { uuid } from "uuidv4";
import ImageLoader from "../../common/ImageLoader";

export default function ImageBlock({ className, styles, ...props }) {
    return <ImageLoader className={className + " target"} {...props} />;
}
