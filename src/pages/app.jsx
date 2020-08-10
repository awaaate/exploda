import Board from "../components/Board";
import Menu from "../components/Menu";
import Automation from "../components/selectors/automation";

const WebApp = () => {
    //Wherever the index change save the design as an image

    return process.browser ? (
        <div className="flex h-full max-h-full" id="App">
                <Menu />
                <Board />

                <Automation />


        </div>
    ) : null;
};

export default WebApp;
