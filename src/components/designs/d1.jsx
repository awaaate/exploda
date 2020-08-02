import { useDesignPropsContext } from "../../lib/context/DesignPropsContext";
import { useEffect, useRef, useState } from "react";

export default function d1() {
    const {
        body,
        size,
        caption,
        colors,
        image,
        setHeader,
    } = useDesignPropsContext();
    useEffect(() => {
        setHeader((props) => ({ ...props, visible: false }));
    }, []);

    return (
        <div
            style={{
                display: "flex",
                overflow: "hidden",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                transformOrigin: "top left",
                ...size,
            }}
        >
            {/*   <div
                className="absolute w-full h-full bg-black left-0 top-0"
                style={{
                    opacity: opacity,
                }}
            ></div> */}
            <img
                src={image}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <div
                style={{
                    background: colors.primary,
                    height: size.width / 2,
                    width: size.width / 2,
                    overflow: "hidden",
                    position: "absolute",
                    boxShadow:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0.375rem",
                }}
            >
                <p
                    style={{
                        color: colors.text,
                        fontSize: "200%",
                        textAlign: "center",
                        marginBottom: "10%",
                        margin: "1.25rem",
                        width: "100%",
                        padding: '1rem'
                    }}
                >
                    {body.value}
                </p>
                <p
                    style={{
                        color: colors.secondary,
                        fontSize: "150%",
                        fontWeight: "600",
                    }}
                >
                    {caption.value}
                </p>
            </div>
        </div>
    );
}
