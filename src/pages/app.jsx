import Board from "../components/Board";

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
