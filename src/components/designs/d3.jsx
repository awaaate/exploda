import { useEffect } from "react";

import { fontStyleParser } from "../../lib/utils";
import { useDesignPropsContext } from "../../lib/context/design/design.context";
import Block from "./blocks/Block";

export default function ({}) {
    const {
        body,
        size,
        caption,
        colors,
        image,
        header,
        setColors,
    } = useDesignPropsContext();
    useEffect(() => {}, []);
    return (
        <div className="w-full h-full">
            <Block color={colors.primary} className="w-16 h-16"></Block>
        </div>
    );
}
