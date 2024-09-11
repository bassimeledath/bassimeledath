'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import EditableNote from '@/components/EditableNote';
import { useAuth } from '@/contexts/AuthContext';

interface PageProps {
    params: {
        slug: string;
    };
}

async function getPostBySlug(slug: string) {
    const { data, error } = await supabase
        .from('blogs_tests')
        .select('title, content')
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return data;
}

export default function PostPage({ params }: PageProps) {
    const router = useRouter();
    const [post, setPost] = React.useState<{ title: string; content: string } | null>(null);
    const { isAuthenticated } = useAuth();

    React.useEffect(() => {
        getPostBySlug(params.slug).then(setPost);
    }, [params.slug]);

    const handleSave = async (title: string, content: string) => {
        const { error } = await supabase
            .from('blogs_tests')
            .update({ title, content })
            .eq('slug', params.slug);

        if (error) {
            console.error('Error updating post:', error);
        } else {
            setPost({ title, content });
            router.refresh();
        }
    };

    const handleCancel = () => {
        // No need to do anything here, as the EditableNote component
        // will reset its internal state when cancel is clicked
    };

    if (!post) {
        return <div></div>;
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