import { useState } from "react";
import { uuid } from "uuidv4";

export default function ImageBlock({ className, styles, ...props }) {
    return <img className={className + " target"} {...props} />;
}
