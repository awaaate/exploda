import { useState } from "react";
import { uuid } from "uuidv4";
import { fontStyleParser } from "../../../lib/utils";

export default function TextBlock({
    text,
    color,
    textColor,
    className,
    style,
    ...props
}) {
    return (
        <span
            className={className + " target"}
            style={{
                ...style,
                fontSize: text.size,
                ...fontStyleParser(text.styles),
            }}
            {...props}
        >
            {text.value}
        </span>
    );
}
