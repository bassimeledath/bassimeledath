import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

interface Post {
    title: string;
    content: string;
}

export function usePost(slug: string) {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('blogs')
                    .select('title, content')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, [slug]);

    const updatePost = async (title: string, content: string) => {
        try {
            const { error } = await supabase
                .from('blogs')
                .update({ title, content })
                .eq('slug', slug);

            if (error) throw error;
            setPost({ title, content });
        } catch (e) {
            setError(e instanceof Error ? e : new Error('An error occurred while updating'));
            throw e;
        }
    };

    return { post, isLoading, error, updatePost };
}