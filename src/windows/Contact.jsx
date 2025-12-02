import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import { socials } from "#constants/index.js";

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2 className="text-2xl">Contact</h2>
            </div>
            <div className='p-5 space-y-5'>
                <img src="/images/faizan.png" alt="Faizan"
                    className="w-20 rounded-full"
                />
                <h3>Let's Connect</h3>
                <p>I am always open to new opportunities and challenges. Please feel free to reach out to me if you have any questions or if you would like to discuss any potential opportunities.</p>
                <ul>
                    {socials.map(({ id, text, icon, link, bg }) => (
                        <li
                            key={id}
                            style={{ backgroundColor: bg }}
                        >
                            <a
                                href={link}
                                target={link === "#reload" ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    if (link === "#reload") {
                                        e.preventDefault();
                                        window.location.reload();
                                    }
                                }}
                            >
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow
