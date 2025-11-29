import React from 'react'
import Navbar from "#components/Navbar.jsx";
import Welcome from "#components/Welcome.jsx";
import Dock from "#components/Dock.jsx";
import { Draggable } from 'gsap/Draggable';
import gsap from "gsap";
import TerminalWindow from '#windows/Terminal';
import SafariWindow from '#windows/Safari';
import ResumeWindow from "#windows/Resume.jsx";
import FinderWindow from "#windows/Finder.jsx";
import TextWindow from "#windows/Text.jsx";
import ImageWindow from "#windows/Image.jsx";
import ContactWindow from "#windows/Contact.jsx";
import Home from "#components/Home.jsx";
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main >
            <Navbar />
            <Welcome />
            <Dock />
            <TerminalWindow />
            <SafariWindow />
            <ResumeWindow />
            <ContactWindow />
            <TextWindow />
            <ImageWindow />
            <FinderWindow />
            <Home />
        </main>
    )
}
export default App
