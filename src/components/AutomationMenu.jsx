import React, { useState } from "react";

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
const AutomationMenu = ({}) => {
    const [active, setActive] = useState("size");
    const onCLickHandler = (name) => () => {
        setActive(name);
    };
    return <div className="bg-white w-full ml-4 border-l-2 border-gray-300">
        
    </div>;
};

export default AutomationMenu;
