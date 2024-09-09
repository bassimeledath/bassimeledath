import React from 'react';
import { supabase } from '@/utils/supabase/client';
import Note from '@/components/Note';

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

export default async function PostPage({ params }: PageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <main className="ml-64 flex-grow p-4">
            <Note title={post.title} content={post.content} />
        </main>
    );
}