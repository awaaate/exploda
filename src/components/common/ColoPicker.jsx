import React, { useState, useEffect, useRef } from "react";
import {
    EditableInput,
    Hue,
    Saturation,
} from "react-color/lib/components/common";
import { CustomPicker } from "react-color";

import { useBoardContext } from "../../lib/context/BoardContext";
const tinycolor = require("tinycolor2");

const PickerContainer = ({ children, className, ...props }) => (
    <div className={`relative mb-1 rounded-sm   ${className || ""}`} {...props}>
        {children}
    </div>
);

const CustomColorPicker = ({ handleChange, ...props }) => {
    const onPickerChangeHandler = (color, event) => {
        handleChange(tinycolor(color).toHex(), event);
    };
    return (
        <div
            className="flex flex-col bg-white rounded-md w-full"
            style={{ height: 220 }}
        >
            <div className="flex w-full" style={{ height: "70%" }}>
                <PickerContainer
                    style={{ width: "90%" }}
                    className="overflow-hidden"
                >
                    <Saturation {...props} onChange={onPickerChangeHandler} />
                </PickerContainer>
                <PickerContainer
                    style={{ width: "1rem" }}
                    className="overflow-hidden cursor-pointer ml-2"
                >
                    <Hue
                        {...props}
                        onChange={onPickerChangeHandler}
                        pointer={() => (
                            <div className="w-4 h-4 bg-white mt-1  m-auto shadow-inner rounded-full" />
                        )}
                        direction={"vertical"}
                    />
                </PickerContainer>
            </div>
            <PickerContainer
                style={{ height: "20%" }}
                className="flex colorPicker-input flex-no-wrap w-full"
            >
                <EditableInput
                
                    value={props.hex}
                    onChange={handleChange}
                    style={{
                        wrap: {
                            display: "flex",
                            alignItems: "center",
                            margin: "auto",
                            width: "100%",
                        },
                    }}
                />
            </PickerContainer>
        </div>
    );
};
const ColorPicker = CustomPicker(CustomColorPicker);

const ColorPickerController = ({ color, onChange }) => {
    const { palette } = useBoardContext();
    const onChangeHandler = (color, event) => {
        event.preventDefault();

        onChange(color);
    };

    const onClickHandler = (color) => () => {
        console.log(color);
        onChange(color);
    };
    return (
        <div className="p-2 ">
            <ColorPicker
                onChange={onChangeHandler}
                handleChange={onChangeHandler}
                color={color}
            />
            <div className="flex h-8">
                {palette.map((a) => (
                    <div
                        className={`rounded-md flex-grow  cursor-pointer border-2 border-white  ${
                            color === a ? "border-2 border-orange-500" : ""
                        }`}
                        style={{ background: a }}
                        onClick={onClickHandler(a)}
                    />
                ))}
            </div>
        </div>
    );
};
export default ColorPickerController;
