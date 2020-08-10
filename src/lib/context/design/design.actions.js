import types from "./design.types";

export const setProp = (name, value) => ({
    type: types.SET,
    payload: {
        name,
        value,
    },
});
