import { useEffect, Fragment } from "react";

import { fontStyleParser } from "../../lib/utils";
import { useDesignPropsContext } from "../../lib/context/design/design.context";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import ImageBlock from "./blocks/Image";
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
        set,
        colors,
        body,
        caption,
        header,
        image,
        loaded,
        ...data
    } = useDesignPropsContext();

    useEffect(() => {
        set("image", "designs/d1/image.jpg");
        setHeader(set, {
            visible: false,
        });
        setBody(set, {
            styles: ["center"],
            value:
                "“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”",
            size: 40,
        });
        setCaption(set, {
            styles: ["center"],
            value: "― Bernard M. Baruch",
            size: 20,
        });
    }, []);
    return (
        <div className="w-full h-full overflow-hidden ">
            <div className="relative h-full w-1/2 flex items-center justify-center z-10">
                <TextBlock
                    className="tracking-wide break-words uppercase z-10 color-text p-2 m-2"
                    name="body"
                    text={body}
                />
                <TextBlock
                    name="caption"
                    text={caption}
                    className="absolute bottom-0 z-10 color-primary rounded-full my-4 bg-secondary p-2"
                />
                <Block className="w-full h-full opacity-75 bg-primary absolute top-0 left-0" />
            </div>
            <ImageBlock
                src={image}
                className="w-full h-full object-cover absolute z-0 left-0 top-0"
            />
        </div>
    );
}
