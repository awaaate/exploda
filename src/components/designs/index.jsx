import { useDesignPropsContext } from "../../lib/context/design/design.context";
import { useBoardContext } from "../../lib/context/board/board.context";
import Selecto from "react-selecto";
import Moveable from "react-moveable";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import useGetBoardScale from "../../lib/hooks/useGetBoardScale";

import Spin from "../common/Spin";
const components = [
    dynamic(() => import("./d1")),
    dynamic(() => import("./d2")),
];
export default function ({}) {
    const { index } = useBoardContext();
    const Component = components[index];
    const { size, loaded } = useDesignPropsContext();
    const scale = useGetBoardScale(size);

    const [targets, setTargets] = useState([]);
    const [frameMap] = useState(() => new Map());
    const moveableRef = useRef(null);
    const selectoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        setTargets([]);
    }, [index, size]);

    useEffect(() => {
        const clearTargets = (event) => {
           
             if(event.target !== canvasRef.current && !canvasRef.current.contains(event.target)){
                 console.log('out')
                setTargets([]); 
            } 
        };
        window.addEventListener("click", clearTargets);

        return () => window.removeEventListener("click", clearTargets);
    }, [canvasRef]);
    return (
        <React.Fragment>
            <div
                className={`origin-top-left absolute top-0 left-0 bg-white ${targets.length === 0 ? 'overflow-hidden' : ''}`}
                ref={canvasRef}
                id="canvas"
                style={{
                    ...size,
                    transform: `scale(${scale})`,
                }}
            >
                {!loaded ? (
                    <div className="w-full h-full bg-white absolute top-0 left-0 z-50 flex items-center justify-center">
                        <Spin />
                    </div>
                ) : null}

                <Component />
            </div>
            <Moveable
                ref={moveableRef}
                origin={false}
                draggable={true}
                target={targets}
                onClickGroup={(e) => {
                    selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDragStart={(e) => {
                    const target = e.target;

                    if (!frameMap.has(target)) {
                        frameMap.set(target, {
                            translate: [0, 0],
                        });
                    }
                    const frame = frameMap.get(target);

                    e.set(frame.translate);
                }}
                onDrag={(e) => {
                    const target = e.target;
                    const frame = frameMap.get(target);

                    frame.translate = e.beforeTranslate;
                    target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
                }}
                onDragGroupStart={(e) => {
                    e.events.forEach((ev) => {
                        const target = ev.target;

                        if (!frameMap.has(target)) {
                            frameMap.set(target, {
                                translate: [0, 0],
                            });
                        }
                        const frame = frameMap.get(target);

                        ev.set(frame.translate);
                    });
                }}
                onDragGroup={(e) => {
                    e.events.forEach((ev) => {
                        const target = ev.target;
                        const frame = frameMap.get(target);

                        frame.translate = ev.beforeTranslate;
                        target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
                    });
                }}
                elementGuidelines={targets}
                snappable={true}
                verticalGuidelines={[0, 0.25, 1].map((a) => size.width * a)}
                horizontalGuidelines={[0, 0.25, 1].map((a) => size.height * a)}
                snapThreshold={3}
                isDisplaySnapDigit={true}
                snapGap={true}
                snapElement={true}
                snapVertical={true}
                snapHorizontal={true}
                snapCenter={true}
                snapDigit={0}
            ></Moveable>
            <Selecto
                ref={selectoRef}
                container={document.body}
                dragContainer={"#canvas"}
                selectableTargets={["#canvas .target"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={true}
                toggleContinueSelect={["shift"]}
                onDragStart={(e) => {
                    e.inputEvent.preventDefault();
                    const moveable = moveableRef.current;
                    const target = e.inputEvent.target;
                    if (
                        moveable.isMoveableElement(target) ||
                        targets.some((t) => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={(e) => {
                    const moveable = moveableRef.current;
                    setTargets(e.selected);

                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();

                        setTimeout(() => {
                            moveable.dragStart(e.inputEvent);
                        });
                    }
                }}
            ></Selecto>
        </React.Fragment>
    );
}
