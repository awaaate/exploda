import { useDesignPropsContext } from "../../lib/context/design/design.context";
import { useEffect, Fragment } from "react";
import { fontStyleParser, getImageDataURL } from "../../lib/utils";
import TextBlock from "./blocks/Text";
import Block from "./blocks/Block";
import {
    setHeader,
    setBody,
    setCaption,
} from "../../lib/context/design/design.utils";
import { useDesignLoad } from "../../lib/hooks/useDesignLoad";

export default function ({}) {
    const {
        body,
        size,
        caption,
        colors,
        image,
        header,
        loaded,
        set,
    } = useDesignPropsContext();
    useEffect(() => {
        set("image", "/designs/d2/image.jpg");
        setHeader(set, { visible: false });
        setBody(set, {
            style: ["center"],
            value: "El bosque despierto",
        });
        setCaption(set, { value: "@instagram_me" });
    }, []);
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-secondary">
            <Block
                className="absolute border-white border-8 shadow-lg flex flex-col justify-center items-center rounded-full bg-secondary"
                style={{
                    height: size.width / 2,
                    width: size.width / 2,
                }}
            >
                <img
                    id="image"
                    src={image}
                    className="w-full h-full object-cover  rounded-full"
                    alt=""
                />
            </Block>
            <TextBlock
                className="tracking-wide bg-primary color-text border-4 border-white rounded-md shadow-lg"
                style={{
                    width: size.width / 1.5,
                }}
                text={body}
                id="body"
            ></TextBlock>
            <TextBlock
                text={caption}
                id="caption"
                className="absolute bottom-0 mb-8 opacity-75  tracking-wide color-primary"
            ></TextBlock>
        </div>
    );
}
