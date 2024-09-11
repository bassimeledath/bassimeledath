import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NoteProps {
    title?: string;
    content?: string;
}

export default function Note({ title, content }: NoteProps) {
    return (
        <div className="pl-6 pr-52 text-white min-h-screen">
            {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
            {content && (
                <div className="prose prose-invert prose-stone max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}