import { useState } from "react";
import { uuid } from "uuidv4";
import { fontStyleParser, capitalize } from "../../../lib/utils";

export default function TextBlock({ text, className, style, name, ...props }) {
    return (
        <span
            className={className + " target absolute"}
            id={"text" + capitalize(name)}
            style={{
                ...style,
                height: "min-height",
                fontSize: text.size,
                ...fontStyleParser(text.styles),
            }}
            {...props}
        >
            {text.value}
        </span>
    );
}
