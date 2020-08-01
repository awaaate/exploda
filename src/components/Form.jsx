import React from "react";

import { useDesignPropsContext } from "../lib/context/DesignPropsContext";

const Form = () => {
    const {
        body,
        size,
        caption,
        colors,
        setColors,
        setCaption,
        setBody,
        setSize,
    } = useDesignPropsContext();

    const onChangeHandler = (name, value) => {};
    const inputChangeHandler = (event) => {
        const { value, name } = event.target;
    };
    return (
        <div className="p-2">

        </div>
    );
};

export default Form;
