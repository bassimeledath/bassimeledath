import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface NoteProps {
    title?: string;
    content?: string;
}

export default function Note({ title, content }: NoteProps) {
    return (
        <div className="pl-6 pr-52 pt-10 text-white min-h-screen">
            {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
            {content && (
                <div className="prose prose-invert prose-stone max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={{
                                            ...vscDarkPlus,
                                            'pre[class*="language-"]': {
                                                ...vscDarkPlus['pre[class*="language-"]'],
                                                backgroundColor: '#0f0f0f',
                                                padding: '0',
                                            },
                                            'code[class*="language-"]': {
                                                ...vscDarkPlus['code[class*="language-"]'],
                                                padding: '0', // Remove padding from code element
                                            },
                                        }}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            img({ node, ...props }) {
                                return (
                                    <img
                                        {...props}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '400px', // Adjust this value as needed
                                            objectFit: 'contain'
                                        }}
                                    />
                                );
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}