import { useBoardContext } from "../board/board.context";
import { getPalette } from "../../getPalette";

export const createText = (props) => ({
    value: "",
    styles: [],
    family: "",
    align: "center",
    visible: true,
    size: 0,
    ...props,
});

export const setHeader = (set, value = {}) => {
    set("text", { name: "header", ...value });
};
export const setBody = (set, value = {}) => {
    set("text", { name: "body", ...value });
};
export const setCaption = (set, value = {}) => {
    set("text", { name: "caption", ...value });
};
