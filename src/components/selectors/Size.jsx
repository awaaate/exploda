import React, { useState, useEffect } from "react";
import { FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import { sizeParser } from "../../lib/utils";
import { useDesignPropsContext } from "../../lib/context/design/design.context";
import ToolTip from "../common/ToolTip";
import { setCaption } from "../../lib/context/design/design.utils";

const Option = ({ children, value, name, onClickHandler }) => (
    <div
        className={`bg-white flex flex-col justify-center items-center px-3 py-2  text-2xl cursor-pointer border-gray-400 my-1  ${
            value === name ? " text-orange-500" : "text-gray-900 "
        } ${name === "instagram" ? "border-l-2 border-r-2" : "rounded-full"}`}
        onClick={onClickHandler(name)}
    >
        {children}
    </div>
);
const Text = ({ children }) => (
    <span className="whitespace-no-wrap text-sm">{children}</span>
);

const SizeSelector = ({}) => {
    const { size, set } = useDesignPropsContext();

    const onClickHandler = (val) => () => {
        set('size', sizeParser(val));
    };

    return (
        <div className="flex my-2 rounded-full  bg-white border-2 border-gray-400 ">
            <Option
                value={sizeParser(size)}
                name="pinterest"
                onClickHandler={onClickHandler}
            >
                <ToolTip
                    text="1000px x 1500px"
                    className="flex justify-center items-center relative"
                >
                    <FaPinterest />
                </ToolTip>
            </Option>
            <Option
                value={sizeParser(size)}
                name="instagram"
                onClickHandler={onClickHandler}
            >
                <ToolTip
                    text="1000px x 1000px"
                    className="flex justify-center items-center relative"
                >
                    <FaInstagram />
                </ToolTip>
            </Option>
            <Option
                value={sizeParser(size)}
                name="youtube"
                onClickHandler={onClickHandler}
            >
                <ToolTip
                    text="1280px x 720px"
                    className="flex justify-center items-center relative"
                >
                    <FaYoutube />
                </ToolTip>
            </Option>
        </div>
    );
};

export default SizeSelector;
