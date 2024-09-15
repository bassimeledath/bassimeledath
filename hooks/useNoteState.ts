import { useState, useEffect } from 'react';

interface NoteState {
    title: string;
    content: string;
    isEditing: boolean;
}

export function useNoteState(initialTitle: string = '', initialContent: string = '', isNew: boolean = false) {
    const [state, setState] = useState<NoteState>({
        title: initialTitle,
        content: initialContent,
        isEditing: isNew,
    });

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            title: initialTitle,
            content: initialContent,
        }));
    }, [initialTitle, initialContent]);

    const setTitle = (title: string) => setState(prev => ({ ...prev, title }));
    const setContent = (content: string) => setState(prev => ({ ...prev, content }));
    const setIsEditing = (isEditing: boolean) => setState(prev => ({ ...prev, isEditing }));

    const reset = () => {
        setState({
            title: initialTitle,
            content: initialContent,
            isEditing: isNew,
        });
    };

    return {
        ...state,
        setTitle,
        setContent,
        setIsEditing,
        reset,
    };
}