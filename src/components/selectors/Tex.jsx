import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaAlignCenter,
    FaInfoCircle,
} from "react-icons/fa";
import { useDesignPropsContext } from "../../lib/context/DesignPropsContext";
import { fontStyleParser, capitalize } from "../../lib/utils";
import ToolTip from "../common/ToolTip";
//options
const Option = ({ children, value, active, clickHandler }) => (
    <div
        className={`flex-grow p-1 rounded-sm  mx-1 flex items-center justify-center  cursor-pointer transition-colors ${
            value === active || active === true
                ? "text-blue-700"
                : "text-blue-900"
        } hover:bg-gray-300`}
        onClick={clickHandler(value)}
    >
        {children}
    </div>
);
const TextOptions = ({ clickHandler, text }) => (
    <div className="flex bg-gray-100 p-2 rounded-md">
        <Option value="bold" active={text.style} clickHandler={clickHandler}>
            <FaBold />
        </Option>
        <Option value="italic" active={text.style} clickHandler={clickHandler}>
            <FaItalic />
        </Option>
        <Option
            value="underline"
            active={text.style}
            clickHandler={clickHandler}
        >
            <FaUnderline />
        </Option>
        <Option value="center" active={text.center} clickHandler={clickHandler}>
            <FaAlignCenter />
        </Option>
    </div>
);
const LengthToolTip = ({ max = 10, name }) => {
    return (
        <ToolTip text={`${capitalize(name)}, Max length ${max} characters`} className="absolute top-0 right-0 text-blue-900">
            <FaInfoCircle className="" />
        </ToolTip>
    );
};

const BodyTextInput = ({ className }) => {
    const { body, setBody } = useDesignPropsContext();
    const clickHandler = (name) => () => {
        if (name === "center") {
            setBody((props) => ({ ...props, center: !props.center }));
            return;
        }

        setBody((props) => {
            const style = props.style !== name ? name : null;
            return { ...props, style };
        });
    };
    return body.visible ? (
        <div className={className}>
            <LengthToolTip max="160" name="body" />
            <TextareaAutosize
                minRows={3}
                maxLength={160}
                className="w-full resize-none outline-none overflow-hidden"
                value={body.value}
                onChange={({ target }) =>
                    setBody((props) => ({ ...props, value: target.value }))
                }
                style={{ ...fontStyleParser(body.style, body.center) }}
            />
            <TextOptions text={body} clickHandler={clickHandler} />
        </div>
    ) : null;
};
const CaptionTextInput = ({ className }) => {
    const { caption, setCaption } = useDesignPropsContext();
    const clickHandler = (name) => () => {
        if (name === "center") {
            setCaption((props) => ({ ...props, center: !props.center }));
            return;
        }

        setCaption((props) => {
            const style = props.style !== name ? name : null;
            return { ...props, style };
        });
    };
    return caption.visible ? (
        <div className={className}>
            <LengthToolTip max="20" name="caption" />
            <TextareaAutosize
                minRows={1}
                maxLength={20}
                className="w-full resize-none outline-none overflow-hidden"
                value={caption.value}
                onChange={({ target }) =>
                    setCaption((props) => ({ ...props, value: target.value }))
                }
                style={{ ...fontStyleParser(caption.style, caption.center) }}
            />
            <TextOptions text={caption} clickHandler={clickHandler} />
        </div>
    ) : null;
};
const HeaderTextInput = ({ className }) => {
    const { header, setHeader } = useDesignPropsContext();
    const clickHandler = (name) => () => {
        if (name === "center") {
            setHeader((props) => ({ ...props, center: !props.center }));
            return;
        }

        setHeader((props) => {
            const style = props.style !== name ? name : null;
            return { ...props, style };
        });
    };
    return header.visible ? (
        <div className={className}>
            <LengthToolTip max="60" name="header" />
            <TextareaAutosize
                minRows={2}
                maxLength={60}
                className="w-full resize-none outline-none overflow-hidden"
                value={header.value}
                onChange={({ target }) =>
                    setHeader((props) => ({ ...props, value: target.value }))
                }
                style={{ ...fontStyleParser(header.style, header.center) }}
            />
            <TextOptions text={header} clickHandler={clickHandler} />
        </div>
    ) : null;
};
const TextSelector = ({}) => {
    const textInputClassName =
        "bg-white rounded-md m-2 border-gray-300 border-2 p-2 relative";
    return (
        <div className="flex flex-col">
            <HeaderTextInput className={textInputClassName} />

            <BodyTextInput className={textInputClassName} />

            <CaptionTextInput className={textInputClassName} />
        </div>
    );
};

export default TextSelector;
