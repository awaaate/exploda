import { useDesignPropsContext } from "../../lib/context/DesignPropsContext";
import { useEffect } from "react";

const opacity = ((Math.random() * 50 + 20) / 100).toFixed(2);
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
            className="overflow-hidden relative flex justify-center items-center origin-top-left w-full h-full"
            style={{ ...size }}
        >
            <div
                className="absolute w-full h-full bg-black left-0 top-0"
                style={{
                    opacity: opacity,
                }}
            ></div>
            <img src={image} className="w-full h-full object-cover " />
            <div
                className="absolute rounded-md shadow flex flex-col justify-center items-center"
                style={{
                    background: colors.primary,
                    height: size.width / 2,
                    width: size.width / 2,
                    overflowWrap: "break-word",
                    overflow: "hidden",
                }}
            >
                <p
                    className="m-5 break-all"
                    style={{
                        color: colors.text,
                        fontSize: "200%",
                        textAlign: "center",
                        marginBottom: "10%",
                    }}
                >
                    {body.value}
                </p>
                <p
                    className="font-semibold  "
                    style={{
                        color: colors.secondary,
                        fontSize: "150%",
                    }}
                >
                    {caption.value}
                </p>
            </div>
        </div>
    );
}
