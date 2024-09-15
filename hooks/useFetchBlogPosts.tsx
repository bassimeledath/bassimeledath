// hooks/useFetchBlogPosts.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

interface BlogPost {
    id: string;
    title: string;
    created_at: string;
    content: string;
    slug: string;
    pinned: boolean;
}

const aboutMeNote: BlogPost = {
    id: 'about-me',
    title: '📌 About Me',
    created_at: '1998-09-12T00:00:00Z',
    slug: '',
    pinned: true,
    content: '',
};

const useFetchBlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs_tests')
                    .select('id, title, created_at, slug, pinned, content');

                if (error) throw error;

                const sortedPosts = data?.sort((a, b) => {
                    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
                    return a.pinned
                        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                }) || [];

                setBlogPosts([aboutMeNote, ...sortedPosts]);
            } catch (err) {
                setError('Error fetching blog posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { blogPosts, loading, error };
};

export default useFetchBlogPosts;
