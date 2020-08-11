import { useRef, useState } from "react";
import { usePopper } from "react-popper";
import { useEffect } from "react";
import { FaCaretLeft } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import { memo } from "react";
import { useMemo } from "react";

const Popover = ({ children, trigger }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [arrowElement, setArrowElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(trigger, popperElement, {
        placement: "bottom",
        modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    });


    useEffect(() => {
        if (trigger) {
            open();
            trigger.addEventListener("click", open);
        } else {
            close();
        }

        return () =>
            trigger ? trigger.removeEventListener("click", open) : null;
    }, [trigger]);
    const close = () => {
        setIsOpen(false);
    };
    const open = () => {
        setIsOpen(true);
    };
    return (
        <OutsideClickHandler
            onOutsideClick={(event) => {
                close();
            }}
        >
            <div
                id="popover"
                ref={setPopperElement}
                style={styles.popper}
                className={
                    (isOpen ? "" : "hidden ") +
                    "bg-white rounded-lg shadow-xl p-1 pt-2 z-50 border-2 border-gray-300"
                }
                {...attributes.popper}
            >
                <div
                    id="popoverArrow"
                    ref={setArrowElement}
                    style={styles.arrow}
                    className="absolute h-4 w-4 right-0 "
                >
                    <span className="transform rotate-45 block w-full h-full bg-white border-t-2 border-l-2  shadow-xl rounded-sm"></span>
                </div>
                {children}
            </div>
        </OutsideClickHandler>
    );
};

/* const clickOutsideConfig = {
    handleClickOutside: () => Popover.handleClickOutside,
}; */

export default memo(Popover);
