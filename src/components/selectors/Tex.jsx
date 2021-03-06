import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaAlignCenter,
    FaInfoCircle,
} from "react-icons/fa";
import { useDesignPropsContext } from "../../lib/context/design/design.context";
import { fontStyleParser, capitalize } from "../../lib/utils";
import ToolTip from "../common/ToolTip";
import { setBody } from "../../lib/context/design/design.utils";
import ColoPicker from "../common/ColoPicker";

//options
const Option = ({ children, styles = [], name, clickHandler }) => (
    <div
        className={`flex-grow p-1 rounded-sm   flex items-center justify-center  cursor-pointer transition-colors ${
            styles.includes(name) ? "text-blue-700" : "text-blue-900"
        } hover:bg-gray-300`}
        onClick={clickHandler(name)}
    >
        {children}
    </div>
);
const TextOptions = ({ clickHandler, text, textSizeChange }) => (
    <div className="grid grid-cols-6 gap-2 bg-gray-100 p-2 rounded-md">
        <Option name="bold" styles={text.styles} clickHandler={clickHandler}>
            <FaBold />
        </Option>
        <Option name="italic" styles={text.styles} clickHandler={clickHandler}>
            <FaItalic />
        </Option>
        <Option
            name="underline"
            styles={text.styles}
            clickHandler={clickHandler}
        >
            <FaUnderline />
        </Option>
        <Option name="center" styles={text.style} clickHandler={clickHandler}>
            <FaAlignCenter />
        </Option>
        <input
            className="flex-grow p-1 rounded-md border-2  flex items-center justify-center transition-colors focus:border-orange-500 outline-none col-span-2"
            type="number"
            value={text.size}
            onChange={textSizeChange}
        />
    </div>
);
const LengthToolTip = ({ max = 10, name }) => {
    return (
        <ToolTip
            text={`${capitalize(name)}, Max length ${max} characters`}
            className="absolute top-0 right-0 text-blue-900"
        >
            <FaInfoCircle className="" />
        </ToolTip>
    );
};
const TextInput = ({ value, setValue, maxLength, minRow, name, set }) => {
    const clickHandler = (propName) => () => {
        setValue({ name, styles: setStylesArray(propName, value.styles) });
    };
    return value.visible ? (
        <div className="bg-white rounded-md m-2 border-gray-300 border-2 p-2 relative">
            <LengthToolTip max={maxLength} name={name} />
            <TextareaAutosize
                minRows={minRow}
                maxLength={maxLength}
                className="w-full resize-none outline-none overflow-hidden p-2"
                value={value.value}
                onChange={({ target }) =>
                    setValue({ name, value: target.value })
                }
                style={{ ...fontStyleParser(value.styles, value.center) }}
            />
            <TextOptions
                text={value}
                clickHandler={clickHandler}
                textSizeChange={({ target }) => {
                    setValue({ name, size: parseFloat(target.value) });
                }}
            />
        </div>
    ) : null;
};

const TextSelector = ({}) => {
    const { body, caption, header, set } = useDesignPropsContext();
    const setValue = (value) => set("text", value);
    return (
        <div className="flex flex-col">
            <TextInput
                value={header}
                setValue={setValue}
                minRow={2}
                maxLength={60}
                name={"header"}
            />
            <TextInput
                value={body}
                setValue={setValue}
                minRow={3}
                maxLength={160}
                name={"body"}
            />
            <TextInput
                value={caption}
                setValue={setValue}
                minRow={1}
                maxLength={20}
                name={"caption"}
            />
        </div>
    );
};
const setStylesArray = (name, array) => {
    if (array.includes(name)) {
        return array.filter((v) => v !== name);
    }
    return [...array, name];
};

export default TextSelector;
