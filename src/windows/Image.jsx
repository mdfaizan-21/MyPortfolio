import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import useWindowStore from "#store/window.js";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile.data;

    if (!data) return null;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <span className="font-semibold text-gray-500">{data.name}</span>
            </div>
            <div className="bg-white h-full flex items-center justify-center p-4">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        </>
    )
}

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
