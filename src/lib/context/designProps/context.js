import { getPalette } from "../../getPalette";

import {
    createContext,
    useState,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { useBoardContext } from "../BoardContext";

import Types, { SET_TYPES } from "./types";
import { setProp } from "./actions";
import { setImage, createText } from "./utils";
const DesignPropsContext = createContext({
    state: {},
    set: () => {},
    dispatch: () => {},
});

const designPropsReducer = (state, action) => {
    const payload = action.payload;
    switch (action.type) {
        case Types.SET_IMAGE:
            return {
                ...state,
                image: payload,
            };
        case Types.SET_COLORS:
            return {
                ...state,
                colors: { ...state.colors, ...payload },
            };
        case Types.SET_TEXT: {
            const { name, ...textData } = payload;
            return {
                ...state,
                [name]: { ...state[name], ...textData },
            };
        }
        default:
            throw new Error("Unknown action type");
    }
};
export const DesignPropsContextProvider = ({ children }) => {
    const { setImagesList, setPalette } = useBoardContext();

    const [state, dispatch] = useReducer(designPropsReducer, {
        size: { width: 1000, height: 1000 },
        colors: {},
        image: "",
        body: createText(""),
        header: createText(""),
        caption: createText(""),
    });

    function set(name, payload) {
        dispatch({
            type: SET_TYPES[name.toUpperCase()],
            payload: payload,
        });
    }
    useEffect(() => {
        const img = new Image();

        img.crossOrigin = "Anonymous";
        img.src = state.image;
        img.onload = () => {
            const palette = getPalette(img);
            set("colors", palette[[0]]);
            setPalette(palette[1]);
            setImagesList((images) => [img.src, ...images]);
        };
    }, [state.image]);
    return (
        <DesignPropsContext.Provider value={{ state, dispatch, set }}>
            {children}
        </DesignPropsContext.Provider>
    );
};

export const useDesignPropsContext = () => {
    const { state, dispatch, set } = useContext(DesignPropsContext);

    return {
        ...state,
        dispatch,
        set,
    };
};
