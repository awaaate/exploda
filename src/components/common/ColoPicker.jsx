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
const ColorsPalette = ({ palette = [], name, color, onClickHandler }) => {
    return (
        <div className="mt-4">
            <p className="text-gray-900 opacity-75 font-semibold  antialiased my-2">
                {name}
            </p>
            <div className="grid grid-cols-6 gap-2">
                {palette.map((a) => (
                    <div
                        className={`rounded-lg cursor-pointer border-2 hover:shadow-outline ${
                            color === a ? "shadow-outline" : ""
                        }`}
                        style={{
                            background: a,
                            width: 46,
                            height: 46,
                            borderColor: "rgba(0,0,0,0.08)",
                        }}
                        onClick={onClickHandler(a)}
                    />
                ))}
            </div>
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
        onChange(color);
    };
    return (
        <div className="p-2 ">
            <ColorPicker
                onChange={onChangeHandler}
                handleChange={onChangeHandler}
                color={color}
            />
            <ColorsPalette
                name="Design Colors"
                palette={palette}
                color={color}
                onClickHandler={onClickHandler}
            />

            <ColorsPalette
                name="Default colors"
                palette={colors}
                color={color}
                onClickHandler={onClickHandler}
            />
        </div>
    );
};
const colors = [
    "#333333",
    "#808080",
    "#cccccc",
    "#D33115",
    "#E27300",
    "#FCC400",
    "#B0BC00",
    "#68BC00",
    "#16A5A5",
    "#009CE0",
    "#7B64FF",
    "#FA28FF",
];
export default ColorPickerController;
