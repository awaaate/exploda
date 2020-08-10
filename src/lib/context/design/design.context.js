import { getPalette } from "../../getPalette";

import {
    createContext,
    useState,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { useBoardContext } from "../board/board.context";

import Types, { SET_TYPES } from "./design.types";
import { setProp } from "./design.actions";
import { setImage, createText } from "./design.utils";
const DesignPropsContext = createContext({
    state: {},
    set: () => {},
    dispatch: () => {},
});

const designPropsReducer = (state, action) => {
    const canvas = document.getElementById("canvas");
    const payload = action.payload;
    switch (action.type) {
        case Types.SET_IMAGE:
            return {
                ...state,
                image: payload,
            };
        case Types.SET_SIZE:
            return {
                ...state,
                size: action.payload,
            };
        case Types.SET_COLORS:
            Object.keys(payload).map((color) => {
                canvas.style.setProperty(`--${color}`, payload[color]);
            });
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
    const { set: setBoard } = useBoardContext();

    const [state, dispatch] = useReducer(designPropsReducer, {
        size: { width: 1000, height: 1000 },
        colors: {
            primary: "#000",
            text: "#fff",
            secondary: "#000",
        },
        image: "",
        body: createText({ size: 40 }),
        header: createText({ size: 70 }),
        caption: createText({ size: 12 }),
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
            setBoard("palette", palette[1]);
            setBoard("image list", img.src);
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
