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
import ImageBlock from "./blocks/Image";

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
        set(
            "image",
            "https://p0.pxfuel.com/preview/946/85/64/5be98ddfeb462.jpg"
        );
        setHeader(set, { visible: false });
        setCaption(set, { visible: false });
        setBody(set, {
            style: ["center"],
            value:
                "Y aunque lleguen las tormentas, sé que si estoy a tu lado las superaremos juntos.",
        });
    }, []);
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-secondary">
            <ImageBlock
                src={image}
                style={{ width: size.width, height: size.height }}
                className="object-cover absolute z-0 left-0 top-0"
            />
            <Block
                className="z-10"
                style={{
                    background: colors.primary,
                    opacity: 0.5,
                    width: size.width / 1.5,
                    height: size.height / 1.5,
                }}
            ></Block>
            <TextBlock
                text={body}
                name="body"
                className="z-20 absolute uppercase font-semibold"
                style={{ color: colors.text, maxWidth: size.width / 2 }}
            ></TextBlock>
        </div>
    );
}
