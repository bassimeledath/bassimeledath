'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import EditableNote from '@/components/EditableNote';
import { useAuth } from '@/contexts/AuthContext';
import { usePost } from '@/hooks/usePost';

interface PageProps {
    params: {
        slug: string;
    };
}

export default function PostPage({ params }: PageProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { post, isLoading, error, updatePost } = usePost(params.slug);

    const handleSave = async (title: string, content: string) => {
        try {
            await updatePost(title, content);
            router.refresh();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleCancel = () => {
        // No need to do anything here, as the EditableNote component
        // will reset its internal state when cancel is clicked
    };

    if (isLoading) {
        return <div></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <main className="flex-grow p-4">
            <EditableNote
                title={post.title}
                content={post.content}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </main>
    );
}