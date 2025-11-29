import React, {useRef} from 'react'
import {dockApps} from "#constants/index.js";
import {Tooltip} from 'react-tooltip'
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import useWindowStore from "#store/window.js";

const Dock = () => {
    const dockRef = useRef(null);
    const {windows, openWindow, closeWindow, focusWindow} = useWindowStore();
    const toggleApp = (app) => {
        if(!app.canOpen)return;
        const window = windows[app.id];
        if(window && window.isOpen){
            closeWindow(app.id);
        }
        else{
            openWindow(app.id);
        }
    }

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;
        const icons = dock.querySelectorAll('.dock-icon');

        const animateIcon = (mouseX) => {
            const {left} = dock.getBoundingClientRect();
            icons.forEach((icon) => {
                const {left: iconLeft, width} = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);

                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out"
                })
            })
        }

        const handleMouseMove = (e) => {
            const {left} = dock.getBoundingClientRect();
            animateIcon(e.clientX - left);
        }
        const resetIcon = () =>
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                }),
            )
        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', resetIcon);

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', resetIcon);
        }
    }, []);

    return (
        <section id='dock'>
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({id, name, icon, canOpen}) =>
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({id, name, icon, canOpen})}
                        >
                            <img src={`/images/${icon}`}
                                 alt="dock-icon"
                                 loading="lazy"
                                 className={canOpen ? '' : 'opacity-60'}
                            />
                        </button>
                    </div>
                )}
                <Tooltip className="tooltip" id={`dock-tooltip`} place="top"/>
            </div>
        </section>
    )
}
export default Dock
