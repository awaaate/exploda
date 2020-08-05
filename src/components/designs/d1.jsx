import { useEffect } from "react";

import { fontStyleParser } from "../../lib/utils";
import { useDesignPropsContext } from "../../lib/context/designProps/context";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import ImageBlock from "./blocks/Image";
import TextBlock from "./blocks/Text";
import Block from "./blocks/Block";
import {
    setHeader,
    setBody,
    setCaption,
} from "../../lib/context/designProps/utils";

export default function ({}) {
    const {
        set,
        colors,
        body,
        caption,
        image,
        ...data
    } = useDesignPropsContext();
    useEffect(() => {
        console.log(body);
        set("image", "hands.jpg");
        setHeader(set, { visible: false });
        setBody(set, {
            styles: ["bold"],
            center: "true",
            value: "10 lugares perfectos para viajar con niños",
        });
        setCaption(set, {
            styles: ["center"],
            value: "viajar.com",
        });
    }, []);
    return (
        <div className="w-full h-full relative  flex  items-center">
            <ImageBlock
                src={image}
                className="w-full h-full object-cover absolute opacity-50"
            />
            <TextBlock
                className="tracking-wide break-words uppercase"
                size={3.5}
                text={body}
            ></TextBlock>
            <Block
                color={colors.primary}
                className="absolute bottom-0 left-0 w-full p-8"
            ></Block>
            <TextBlock
                text={caption}
                className="opacity-50 absolute bottom-0"
                style={{ width: "min-content" }}
                size={2}
            />
        </div>
    );
}
