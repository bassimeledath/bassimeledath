import React, { useCallback } from 'react';
import Note from './Note';
import { useAuth } from '@/contexts/AuthContext';
import { useNoteState } from '@/hooks/useNoteState';

interface EditableNoteProps {
    title?: string;
    content?: string;
    onSave: (title: string, content: string) => Promise<void>;
    onCancel: () => void;
    isNew?: boolean;
}

export default function EditableNote({
    title: initialTitle = '',
    content: initialContent = '',
    onSave,
    onCancel,
    isNew = false
}: EditableNoteProps) {

    const { isAuthenticated } = useAuth();
    const { title, content, isEditing, setTitle, setContent, setIsEditing, reset } = useNoteState(initialTitle, initialContent, isNew);

    const handleEdit = useCallback(() => setIsEditing(true), [setIsEditing]);

    const handleSave = useCallback(async () => {
        if (!title.trim() || !content.trim()) return;
        await onSave(title, content);
        if (!isNew) setIsEditing(false);
    }, [title, content, onSave, isNew]);

    const handleCancel = useCallback(() => {
        reset();
        onCancel();
    }, [reset, onCancel]);

    const showEditButton = isAuthenticated && !isEditing && !isNew;
    const buttonClass = "px-4 py-2 rounded text-white";

    return (
        <div className="relative">
            {showEditButton && (
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
                        placeholder="Enter title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-64 p-2 border rounded"
                        placeholder="Enter content"
                    />
                    <div className="mt-4 flex justify-end space-x-4">
                        <button onClick={handleCancel} className={`${buttonClass} bg-gray-500`}>
                            Cancel
                        </button>
                        <button onClick={handleSave} className={`${buttonClass} bg-[#9e7c29]`}>
                            {isNew ? 'Create' : 'Publish'}
                        </button>
                    </div>
                </div>
            ) : (
                <Note title={title} content={content} />
            )}
        </div>
    );
}
