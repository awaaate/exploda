import { createPortal } from "react-dom";
import { FaShower } from "react-icons/fa";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";

export const Modal = ({
    isOpen,
    closeHandler,
    children,
    className = "",
    ...props
}) => {
    const modalRef = useRef(null);

    const clickHandler = ({ target }) => {
        if (!modalRef.current.contains(target)) {
            closeHandler();
        }
    };
    return createPortal(
        isOpen ? (
            <div
                onClick={clickHandler}
                className={`fixed top-0 left-0 w-full h-full bg-black z-50  flex justify-center items-center bg-opacity-75 `}
            >
                <div
                    ref={modalRef}
                    className={`bg-white shadow-lg w-1/2 h-auto p-2 ${className}`}
                    {...props}
                >
                    {children}
                </div>
            </div>
        ) : null,

        document.getElementById("modal-root")
    );
};
