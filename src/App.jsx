import React from 'react'
import Navbar from "#components/Navbar.jsx";
import Welcome from "#components/Welcome.jsx";
import Dock from "#components/Dock.jsx";
import {Draggable} from 'gsap/Draggable';
import  gsap  from "gsap";
import TerminalWindow from '#windows/Terminal';

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main >
            <Navbar />
            <Welcome />
            <Dock />
            <TerminalWindow />
        </main>
    )
}
export default App
