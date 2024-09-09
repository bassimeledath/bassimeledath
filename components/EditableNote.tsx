import React, { useState } from 'react';
import Note from './Note';
import { useAuth } from '@/contexts/AuthContext';

interface EditableNoteProps {
    title: string;
    content: string;
    onSave: (title: string, content: string) => Promise<void>;
    onCancel: () => void;
}

export default function EditableNote({ title: initialTitle, content: initialContent, onSave, onCancel }: EditableNoteProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const { isAuthenticated } = useAuth();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        await onSave(title, content);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTitle(initialTitle);
        setContent(initialContent);
        setIsEditing(false);
        onCancel();
    };

    return (
        <div className="relative">
            {isAuthenticated && !isEditing && (
                <button
                    onClick={handleEdit}
                    className="absolute top-0 right-0 px-4 py-2 bg-[#9e7c29] text-white rounded"
                >
                    Edit
                </button>
            )}

            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-64 p-2 border rounded"
                    />
                    <div className="mt-4 flex justify-end space-x-4">
                        <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="px-4 py-2 bg-[#9e7c29] text-white rounded">
                            Publish
                        </button>
                    </div>
                </div>
            ) : (
                <Note title={title} content={content} />
            )}
        </div>
    );
}