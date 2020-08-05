import { capitalize } from "./utils";

function obj(styles) {
    styles = styles[0]
        .split(";")
        .map((block) => {
            block = block.trim();
            if (!block) {
                return null;
            }
            let [prop, value] = block.split(":");
            prop = prop.split("-").map((a, i) => (i === 0 ? a : capitalize(a)));
            prop = prop.join("");
            return { [prop]: value.trim() };
        })
        .filter((a) => !!a)
        .reduce((acc, val) => {
            return { ...acc, ...val };
        }, {});


    return styles;
}

export default {
    obj,
};
