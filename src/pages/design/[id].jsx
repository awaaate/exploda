import { useRouter } from "next/router";
import { useBoardContext } from "../../lib/context/BoardContext";
import Designs from "../../components/designs";
const Design = () => {
    const router = useRouter();
    const { id } = router.query;
    const { designs } = useBoardContext();
    const component = designs.filter((dId) => id === dId);
    console.log(component, designs);
    return component ? (
        <div dangerouslySetInnerHTML={{ __html: component.design }}></div>
    ) : (
        <h1>False</h1>
    );
};

export default Design;
