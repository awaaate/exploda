import React from "react";
import TextareaAutosize from "react-textarea-autosize";
const Input = ({ className, style, ...props }) => (
    <TextareaAutosize
        {...props}
        style={style}
        className={`p-2 rounded-md border-2 border-gray-200  outline-none focus:border-orange-500 ${className}`}
    ></TextareaAutosize>
);
const FormControl = ({ label, name, className, ...props }) =>
    !label ? (
        <Input name={name} {...props} />
    ) : (
        <div className="flex relative items-center">
            <input
                name={name}
                {...props}
                className={`w-full p-2 rounded-md border-2 border-gray-200  outline-none focus:border-orange-500 ${className}`}
            />
            <label htmlFor={name} className="absolute  opacity-75 " style={{
                right: 10,
            }}>
                {label}
            </label>
        </div>
    );

export default FormControl;
