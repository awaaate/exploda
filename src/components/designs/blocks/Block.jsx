import { useState } from "react";
import { uuid } from "uuidv4";

export default function Block({ className, color, style, children, ...props }) {
    const [id, setId] = useState(uuid());
    return (
        <div
            className={className + " target"}
            style={{ ...style, backgroundColor: color }}
            {...props}
        >
            {children}
        </div>
    );
}
