import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { pdfjs, Document, Page } from 'react-pdf';
import { Download } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2 className="text-2xl">Resume</h2>
                <a href="/files/resume.pdf"
                    download={true}
                    className="cursor-pointer"
                    title="Download resume"
                >
                    <Download className="icon" />
                </a>
            </div>
            <Document file="files/resume.pdf" className="max-h-fit">
                <Page pageNumber={1} renderAnnotationLayer renderTextLayer />
            </Document>
        </>
    )
}
const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow
