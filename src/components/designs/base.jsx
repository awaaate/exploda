import { useEffect } from "react";

import { fontStyleParser } from "../../lib/utils";
import { useDesignPropsContext } from "../../lib/context/DesignPropsContext";

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
    return <div className="w-full h-full"></div>;
}
