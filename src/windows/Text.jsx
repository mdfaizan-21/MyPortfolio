import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import useWindowStore from "#store/window.js";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile.data;

    if (!data) return null;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <span className="font-semibold text-gray-500">{data.name}</span>
            </div>
            <div className="bg-white h-full overflow-y-auto p-6 text-black font-roboto">
                <div className="max-w-full mx-auto space-y-2">
                    {/* Header Section */}
                    <div className="text-center space-y-2">
                        {data.image && (
                            <img
                                src={data.image}
                                alt={data.name}
                                className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                            />
                        )}

                    </div>

                    {/* Content Section */}
                    <div className="prose prose-gray max-w-none">
                        {data.description && data.description.map((paragraph, index) => (
                            <p key={index} className="leading-relaxed text-gray-700">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
