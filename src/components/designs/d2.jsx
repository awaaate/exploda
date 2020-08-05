import { useDesignPropsContext } from "../../lib/context/designProps/context";
import { useEffect } from "react";
import { fontStyleParser } from "../../lib/utils";
import TextBlock from "./blocks/Text";
import Block from "./blocks/Block";

export default function ({}) {
    const {
        body,
        size,
        caption,
        colors,
        image,
        header,
        setImage,
        setHeader,
        setBody,
        setCaption,
    } = useDesignPropsContext();
    useEffect(() => {
        setImage(
            "https://pixabay.com/get/5fe3d4444a54b108f5d084609629307b143fdeed534c704c7c297ed7914dc65e_1280.jpg"
        );
        setHeader((props) => ({ ...props, visible: false }));
        setBody((props) => ({
            ...props,
            value: "El bosque despierto",
        }));
        setCaption((props) => ({ ...props, value: "@instagram_me" }));
    }, []);
    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center "
            style={{ background: colors.secondary }}
        >
            <Block
                className="absolute border-white border-8 shadow-lg flex flex-col justify-center items-center rounded-full"
                style={{
                    height: size.width / 2,
                    width: size.width / 2,
                    background: colors.secondary,
                }}
            >
                <img
                    src={image}
                    className="w-full h-full object-cover  rounded-full"
                    alt=""
                />
            </Block>
            <TextBlock
                className="tracking-wide break-words z-10 p-2 rounded-md"
                text={body}
                color={colors.primary}
                textColor={colors.text}
                size={3.5}
            ></TextBlock>
            <TextBlock
                size={1.5}
                textColor={colors.primary}
                text={caption}
                className="absolute bottom-0 mb-8 opacity-75  tracking-wide"
            ></TextBlock>
        </div>
    );
}
