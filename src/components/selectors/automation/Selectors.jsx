import FormControl from "../../common/FormControl";
import { useState, Fragment, Children, useEffect } from "react";
import {
    DesignPropsContextProvider,
    useDesignPropsContext,
} from "../../../lib/context/design/design.context";

const VariableInput = ({ name, className, set }) => {
    const [isOver, setIsOver] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        set(name, value);
    }, [value]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsOver(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOver(false);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const value = e.dataTransfer.getData("text/plain");

        if (value) {
            setValue(value);
            setIsOver(false);
        }
    };
    return (
        <Fragment>
            <p className="capitalize font-xl font-semibold text-blue-900">
                {name}
            </p>
            <div
                onClick={() => setValue("")}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className={`w-full h-12 flex  items-center justify-center rounded-md border-2 border-gray-200  outline-none cursor-pointer ${
                    isOver
                        ? "shadow-outline"
                        : value
                        ? "border-orange-500"
                        : null
                }  ${className}`}
            >
                {value}
            </div>
        </Fragment>
    );
};
const Variable = ({ name }) => {
    const [isDrag, setIsDrag] = useState(false);

    const dragStartHandler = (event) => {
        setIsDrag(true);
        event.dataTransfer.setData("text/plain", name);
    };

    const dragLeaveHandler = () => {
        setIsDrag(false);
    };
    return (
        <div
            onDragEnd={dragLeaveHandler}
            onDragStart={dragStartHandler}
            draggable="true"
            style={{
                cursor: "grab",
            }}
            className={`w-full h-12 flex  items-center justify-center border-2 rounded-md text-gray-800 font-semibold mb-3 bg-white ${
                isDrag ? "opacity-25" : null
            }`}
        >
            {name}
        </div>
    );
};
const Title = ({ children }) => (
    <p className="text-blue-900 border-b-2 border-gray-300 my-2 p-y1 text-2xl font-bold text-center">
        {children}
    </p>
);
export default function ({ header, set, generateImages, clearData }) {
    const { colors } = useDesignPropsContext();
    return (
        <div className="h-full flex-col flex p-2 ">
            <div className="grid grid-cols-2 gap-2  overflow-y-scroll h-full">
                <div className="w-full">
                    <Title>Variables</Title>
                    {header.map((a) => (
                        <Variable key={a} name={a} />
                    ))}
                </div>
                <div className="w-full">
                    <Title>Text</Title>
                    <VariableInput name="Header" set={set} />
                    <VariableInput name="Body" set={set} />
                    <VariableInput name="Caption" set={set} />
                    <Title>Colors</Title>
                    {Object.keys(colors).map((color) => (
                        <VariableInput key={color} name={color} set={set} />
                    ))}
                    <Title>Image</Title>
                    <VariableInput name="image" set={set} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 my-2">
                <button
                    onClick={generateImages}
                    className="shadow-sm bg-orange-500  font-semibold text-white rounded-md p-2 hover:bg-orange-600"
                >
                    Generate
                </button>
                <button
                    className="border-gray-300 border-2 font-semibold rounded-md p-2 hover:bg-gray-300"
                    onClick={clearData}
                >
                    clear
                </button>
            </div>
        </div>
    );
}
