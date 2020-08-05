import { useBoardContext } from "../BoardContext";
import { getPalette } from "../../getPalette";

export const createText = (value) => ({
    value: value,
    styles: [],
    family: "",
    align: "center",
    visible: true,
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
