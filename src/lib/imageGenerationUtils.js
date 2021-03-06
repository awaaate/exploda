import fileDownload from "js-file-download";
import { capitalize } from "./utils";
export const setColors = ({ row = {}, generationData = {}, canvas }) => {
    const colors = {
        primary: canvas.style.getPropertyValue("--primary"),
        secondary: canvas.style.getPropertyValue("--secondary"),
        text: canvas.style.getPropertyValue("--text"),
    };

    Object.keys(colors).map((color) => {
        const colorValue = row[generationData[color]] || colors[color];
        setClassNameVariable(
            canvas,
            "bg-" + color,
            "background-color",
            colorValue
        );
        setClassNameVariable(canvas, `color-` + color, "color", colorValue);
    });
};

export const setClassNameVariable = (canvas, className, property, value) => {
    let elements = canvas.querySelectorAll("." + className);
    elements.forEach((element) => {
        element.style[property] = value.trim();
    });
};

export const setTextValue = (element, value) => {
    if (!value || !element) return;
    value = value.toString().trim();

    element.innerHTML = value;
};
export const setText = ({ row = {}, generationData = {}, canvas }) => {
    ["body", "caption", "header"].map((name) => {
        setTextValue(
            canvas.querySelector("#text" + capitalize(name)),
            row[generationData[name]]
        );
    });
};
export const setImage = async ({ row = {}, generationData = {}, canvas }) => {
    const img = canvas.querySelector("img");
    const src = row[generationData["image"]] || "";
    if (src) {
        img.src = src;
        img.crossOrigin = "";
        return;
    }
};

export const generateImage = (canvas) => {
    const canvasCopy = document.getElementById("canvas").cloneNode(true);

    setColors({ canvas: canvasCopy });
    return canvasCopy.innerHTML;
};

export const downloadImage = (data, name) => fileDownload(data, name);
