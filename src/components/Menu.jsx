import React, { useState } from "react";
import {
    FaSquareFull,
    FaEyeDropper,
    FaImage,
    FaTextHeight,
} from "react-icons/fa";

import SizeSelector from "./selectors/Size";
import ColorsSelector from "./selectors/Colors";
import ImageSelector from "./selectors/Images";
import TextSelector from "./selectors/Tex";
import DesignSelector from "./selectors/Design";

const Components = {
    designs: <DesignSelector />,
    colors: <ColorsSelector />,
    images: <ImageSelector />,
    text: <TextSelector />,
};
const MenuItem = ({ children, icon, name, active, onClick }) => (
    <li className="relative ">
        <div
            className={`transition-colors duration-200 flex flex-col justify-center items-center p-2 my-2 m-2  rounded-sm text-blue-900  cursor-pointer hover:bg-gray-200 ${
                active === name ? "bg-gray-200" : ""
            }`}
            onClick={onClick(name)}
        >
            {icon}
            <span>{name}</span>
        </div>

        <span
            className={`transition-colors duration-200 bg-transparent absolute left-0 top-0 h-full w-1  rounded-full ${
                active === name ? "bg-orange-500" : ""
            }`}
        ></span>
    </li>
);
const Menu = ({}) => {
    const [active, setActive] = useState("designs");
    const onCLickHandler = (name) => () => {
        setActive(name);
    };
    return (
        <div className="bg-white h-full flex mr-8  select-none ">
            <ul className="border-gray-300 border-r-2 pt-4">
                <MenuItem
                    icon={<FaSquareFull />}
                    name={"designs"}
                    active={active}
                    onClick={onCLickHandler}
                ></MenuItem>
                <MenuItem
                    icon={<FaEyeDropper />}
                    name={"colors"}
                    active={active}
                    onClick={onCLickHandler}
                ></MenuItem>
                <MenuItem
                    icon={<FaImage />}
                    name={"images"}
                    active={active}
                    onClick={onCLickHandler}
                ></MenuItem>
                <MenuItem
                    icon={<FaTextHeight />}
                    name={"text"}
                    active={active}
                    onClick={onCLickHandler}
                ></MenuItem>
            </ul>
            <div
                className="p-2 pt-4"
                style={{
                    width: 400,
                }}
            >
                {Components[active]}
            </div>
        </div>
    );
};

export default Menu;
