import React from "react";

const DesignOption = ({ title, children }) => (
    <div className="bg-white border-2 border-gray-300 p-3 rounded-sm mb-1">
        <p className="text-center font-semibold opacity-75">{title}</p>
        <span  className="w-1/2 border-b-2 border-gray-300 m-auto mt-2 block" />
        {children}
    </div>
);

export default DesignOption