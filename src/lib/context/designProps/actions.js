import types from "./types";

export const setProp = (name, value) => ({
    type: types.SET,
    payload: {
        name,
        value,
    },
});
