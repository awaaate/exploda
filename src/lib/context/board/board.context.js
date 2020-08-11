import {
    useContext,
    useState,
    createContext,
    useEffect,
    useReducer,
} from "react";
import { uuid } from "uuidv4";
import Types, { SET_TYPES } from "./board.types";

const designsList = [
    {
        image: "d1/thumbnail.jpeg",
        id: uuid(),
        index: 0,
    },
    {
        image: "d2/thumbnail.jpg",
        id: uuid(),
        index: 1,
    },
];

const BoardContext = createContext({
    state: {},
    set: () => {},
});

const reducer = (state, { type, payload }) => {
    const {} = payload;
    const { imagesList } = state;

    switch (type) {
        case Types.SET_IMAGE_LIST:
            if (imagesList.some((image) => image === payload)) {
                return state;
            }
            return {
                ...state,
                imageList: imagesList.push(payload),
            };
        case Types.SET_INDEX:
            return {
                ...state,
                index: payload,
            };
        case Types.SET_PALETTE: {
            return {
                ...state,
                palette: payload,
            };
        }
        default:
            throw new Error("unknown type");
    }
};
export const BoardContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        palette: [],
        imagesList: [],
        designs: [...designsList],
        index: 0,
    });

    const set = (type, payload) => {
        dispatch({
            type: SET_TYPES[type.replace(" ", "_").toUpperCase()],
            payload,
        });
    };

    return (
        <BoardContext.Provider
            value={{
                set,
                state,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export const useBoardContext = () => {
    const { state, set } = useContext(BoardContext);
    return { ...state, set };
};
