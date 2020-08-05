import { useContext, useState, createContext, useEffect } from "react";
import { uuid } from "uuidv4";

const designsList = [
    {
        image: "1.png",
        id: uuid(),
        index: 0,
    },
    {
        image: "2.png",
        id: uuid(),
        index: 1,
    },
];
const BoardContext = createContext({
    source: "images/image (17).jpg",
    palette: [],
    designs: [],
    imagesList: [],
    index: 0,
    setImagesList: () => {},
    setColors: () => {},
    setSource: () => {},
    setDesigns: () => {},
    setIndex: () => {},
    setDesignProps: () => {},
});

export const BoardContextProvider = ({ children }) => {
    const [palette, setPalette] = useState([]);
    const [source, setSource] = useState("");
    const [designs, setDesigns] = useState(designsList || []);
    const [index, setIndex] = useState(0);
    const [imagesList, setImagesList] = useState([]);
    /*     useEffect(() => {
        const localDesign = localStorage.getItem("designs");
        if (localDesign) {
            setDesigns(JSON.parse(localDesign));
        } else {
            setDesigns([]);
        }
    }, []); */

    /*     useEffect(() => {
        localStorage.setItem("designs", JSON.stringify(designs));
    }, [designs]); */

    return (
        <BoardContext.Provider
            value={{
                imagesList,
                setImagesList,
                designs,
                setDesigns,
                palette,
                setPalette,
                source,
                setSource,
                index,
                setIndex,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export const useBoardContext = () => {
    return useContext(BoardContext);
};
