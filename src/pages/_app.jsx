import "../styles/main.css";
import { BoardContextProvider } from "../lib/context/board/board.context";
import { DesignPropsContextProvider } from "../lib/context/design/design.context";

const App = ({ Component, pageProps }) => (
    <BoardContextProvider>
        <DesignPropsContextProvider>
            <Component {...pageProps} />
        </DesignPropsContextProvider>
    </BoardContextProvider>
);
export default App;
