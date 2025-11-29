import useWindowStore from "#store/window.js";
import {useLayoutEffect, useRef} from "react";
import {useGSAP} from "@gsap/react";
import {Draggable} from 'gsap/Draggable';

import gsap from "gsap"

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const {focusWindow, windows} = useWindowStore();
        // Add a safety check for windowKey existence
        const windowState = windows[windowKey] || { isOpen: false, zIndex: 0 };
        const {isOpen, zIndex} = windowState;
        const ref = useRef(null);
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";
            gsap.fromTo(
                el,
                {scale:0.8,opacity:0,y:40},
                {scale:1,opacity:1,y:0,duration:.6  ,ease:"power3.out"
                }
            )
        }, [isOpen]);

        useGSAP(()=>{
            const el = ref.current;
            if (!el ) return;
            const [instance]=Draggable.create(el,{onPress:()=>focusWindow(windowKey)});
            return ()=> instance.kill();
        },[])

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        // Add onClick handler to focus window when clicked
        const handleWindowClick = () => {
            focusWindow(windowKey);
        };

        return (
            <section 
                id={windowKey}
                ref={ref}
                style={{zIndex}}
                className="absolute"
                onClick={handleWindowClick}
            >
                <Component {...props}/>
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;