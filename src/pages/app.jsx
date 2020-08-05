import Board from "../components/Board";
import Menu from "../components/Menu";
import AutomationMenu from "../components/AutomationMenu";

const WebApp = () => {
    //Wherever the index change save the design as an image

    return process.browser ? (
        <div className="flex h-screen" id="App">
            <Menu />
            <Board />
            {/*      <AutomationMenu /> */}
        </div>
    ) : null;
};

export default WebApp;
