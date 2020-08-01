import { useEffect } from "react";

import { getPhoto } from "../lib/unsplash";
import {
    useBoardContext,
    BoardContextProvider,
} from "../lib/context/BoardContext";

import Board from "../components/Board";
import Form from "../components/form";
import {
    DesignPropsContextProvider,
    useDesignPropsContext,
} from "../lib/context/DesignPropsContext";
import Menu from "../components/Menu";

const WebApp = () => {
    //Wherever the index change save the design as an image

    return (
        <div className="flex h-screen">
            <Menu />
            <Board />
        </div>
    );
};
export default WebApp;
