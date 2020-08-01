import d1 from "./d1";
import { useDesignPropsContext } from "../../lib/context/DesignPropsContext";
import { useBoardContext } from "../../lib/context/BoardContext";

const components = [d1];
export default function (nonScaled) {
    const { index } = useBoardContext();
    const { size } = useDesignPropsContext();

    const Component = components[index];

    return (
        <div
            className="origin-top-left absolute"
            id="canvas"
            style={{
                transform: nonScaled ? `scale(${500 / size.width})` : null,
            }}
        >
            <Component></Component>
        </div>
    );
}
