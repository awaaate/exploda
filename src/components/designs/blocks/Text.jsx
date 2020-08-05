import { useState } from "react";
import { uuid } from "uuidv4";
import { fontStyleParser } from "../../../lib/utils";

export default function TextBlock({
    text,
    color,
    textColor,
    className,
    styles,
    size = 1,
    span,
}) {
    return (
        <span
            className={className + " target"}
            style={{
                ...styles,
                fontSize: size * 100 + "%",
                backgroundColor: color || "transparent",
                color: textColor,
                ...fontStyleParser(text.styles),
            }}
        >
            {text.value}
        </span>
    );
}
