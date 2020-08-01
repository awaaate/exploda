const { createContext, useState, useContext } = require("react");

const createText = (value) => ({
    value: value,
    style: null,
    family: "",
    align: "center",
    visible: true,
});
const DesignPropsContext = createContext({
    size: {},
    colors: [],
    body: "",
    caption: "",
    header: "",
    filter: false,
    image: "",
    setImage: () => {},
    setHeader: () => {},
    setBody: () => {},
    setCaption: () => {},
    setColors: () => {},
    setFilter: () => {},
    setSize: () => {},
});

export const DesignPropsContextProvider = ({ children }) => {
    const [colors, setColors] = useState("");
    const [image, setImage] = useState("images/image (17).jpg");
    const [body, setBody] = useState(
        createText(`
    "Wheat is the most important food crop. Its precise origin is lost in antiquity, and traces of its ancient cultivation have been found in many parts of the world"
`)
    );
    const [header, setHeader] = useState(createText("header"));
    const [filter, setFilter] = useState(false);
    const [caption, setCaption] = useState(createText("caption"));
    const [size, setSize] = useState({ width: 1000, height: 1000 });

    return (
        <DesignPropsContext.Provider
            value={{
                image,
                setImage,
                caption,
                colors,
                setBody,
                body,
                header,
                setHeader,
                setCaption,
                setColors,
                setFilter,
                setSize,
                filter,
                size,
            }}
        >
            {children}
        </DesignPropsContext.Provider>
    );
};

export const useDesignPropsContext = () => {
    return useContext(DesignPropsContext);
};
