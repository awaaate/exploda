import React, { useState, useEffect } from "react";
import ColorPicker from "../common/ColoPicker";
import { capitalize } from "../../lib/utils";
import { useDesignPropsContext } from "../../lib/context/design/design.context";
import { useRef } from "react";
import { createRef } from "react";

const Option = ({
    children,
    active,
    value,
    name,
    onClickHandler,
    ...props
}) => (
    <div
        {...props}
        className={`flex  px-2 py-4 border-2 m-2 rounded-md  cursor-pointer flex-grow  ${
            active === name ? "border-orange-500" : ""
        }`}
        onClick={(event) => onClickHandler(name, event)}
    >
        <div
            className="w-2/12 rounded-md p-2 mr-5 border-gray-300"
            style={{
                background: value,
                borderWidth: value.slice(1, 4) === "fff" ? 2 : 0,
            }}
        />
        <div>{capitalize(name)}</div>
    </div>
);
const Text = ({ children }) => (
    <span className="whitespace-no-wrap text-sm">{children}</span>
);

const ColorsSelector = () => {
    const { colors, set } = useDesignPropsContext();
    const [active, setActive] = useState();

    const [trigger, setTrigger] = useState(null);
    const onClickHandler = (key, event) => {
        setTrigger(event.currentTarget);
        setActive(key);
    };
    const onColorChangeHandler = (color) => {
        color = color.indexOf("#") ? "#" + color : color;
        set("colors", { [active]: color });
    };

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col w-full justify-start">
                    <div style={{ height: "90%" }}>
                        <Option
                            active={active}
                            value={colors && colors.primary}
                            name="primary"
                            onClickHandler={onClickHandler}
                        ></Option>
                        <Option
                            value={colors && colors.secondary}
                            active={active}
                            name="secondary"
                            onClickHandler={onClickHandler}
                        ></Option>
                        <Option
                            value={colors && colors.text}
                            active={active}
                            name="text"
                            onClickHandler={onClickHandler}
                        ></Option>
                    </div>
                </div>
                <ColorPicker
                    onChange={onColorChangeHandler}
                    active={active}
                    trigger={trigger}
                ></ColorPicker>
            </div>
        </div>
    );
};

export default ColorsSelector;
