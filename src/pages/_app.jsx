import "../styles/main.css";
import { BoardContextProvider } from "../lib/context/BoardContext";
import { DesignPropsContextProvider } from "../lib/context/DesignPropsContext";

const App = ({ Component, pageProps }) => (
    <BoardContextProvider>
        <DesignPropsContextProvider>
            <Component {...pageProps} />
        </DesignPropsContextProvider>
    </BoardContextProvider>
);
export default App;
