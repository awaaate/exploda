import { useBoardContext } from "../../lib/context/board/board.context";
const DesignSelector = ({}) => {
    const { designs, set } = useBoardContext();
    return (
        <div className="grid grid-cols-2 gap-2">
            {designs.map((design) => (
                <div
                    className="rounded-sm overflow-hidden  cursor-pointer relative shadow-sm"
                    key={design.id}
                    onClick={() => set("index", design.index)}
                >
                    <img
                        src={"/designs/" + design.image}
                        className="w-full h-full "
                        alt=""
                    />
                    <div className=" transition-opacity duration-75 opacity-0 bg-black w-full h-full absolute top-0 left-0 hover:opacity-25"></div>
                </div>
            ))}
        </div>
    );
};

export default DesignSelector;
