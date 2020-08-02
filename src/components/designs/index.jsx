import d1 from "./d1";
import { useDesignPropsContext } from "../../lib/context/DesignPropsContext";
import { useBoardContext } from "../../lib/context/BoardContext";

const components = [d1];
export default function (nonScaled) {
    const { index } = useBoardContext();
    const { size } = useDesignPropsContext();

    const Component = components[index];
    const scale = Math.min(500 / size.width, 700 / size.height)
    return (
        <div
            className="origin-top-left absolute"
           id="canvas"
            style={{
                ...size,
                transform: nonScaled ? `scale(${scale})` : null,
            }}
        >
            <Component></Component>
        </div>
    );
}
