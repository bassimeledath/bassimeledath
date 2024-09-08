import React from 'react';

interface NoteProps {
    title?: string;
    content?: string;
}

export default function Note({ title, content }: NoteProps) {
    return (
        <div className="p-4">
            {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
            {content && (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </div>
    );
}