'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import EditableNote from '@/components/EditableNote';
import { useAuth } from '@/contexts/AuthContext';

export default function NewPostPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const handleSave = async (title: string, content: string) => {
        if (!title || !content) {
            alert('Title and content are required');
            return;
        }

        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        const { data, error } = await supabase
            .from('blogs')
            .insert({ title, content, slug })
            .select()
            .single();

        if (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } else {
            router.push(`/posts/${data.slug}`);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (!isAuthenticated) {
        return <div>You must be logged in to create a new post.</div>;
    }

    return (
        <main className="flex-grow p-4">
            <EditableNote
                onSave={handleSave}
                onCancel={handleCancel}
                isNew={true}
            />
        </main>
    );
}