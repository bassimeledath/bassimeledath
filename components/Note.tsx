import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LiHTMLAttributes } from 'react';

interface NoteProps {
    title?: string;
    content?: string;
}

export default function Note({ title, content }: NoteProps) {
    return (
        <div className="p-4">
            {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
            {content && (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Custom components for specific elements if needed
                        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-2 mb-1" {...props} />,
                        h4: ({ node, ...props }) => <h4 className="text-base font-medium mt-2 mb-1" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
                        li: ({ children, ...props }: LiHTMLAttributes<HTMLLIElement> & { checked?: boolean }) => {
                            if (props.checked !== null && props.checked !== undefined) {
                                return (
                                    <li className="flex items-center">
                                        <input type="checkbox" checked={props.checked} readOnly className="mr-2" />
                                        <span>{children}</span>
                                    </li>
                                );
                            }
                            return <li {...props}>{children}</li>;
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            )}
        </div>
    );
}