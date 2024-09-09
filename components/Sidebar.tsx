"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import SidebarCard from '@/components/SidebarCard';
import NotesHeader from '@/components/NotesHeader';

interface BlogPost {
    id: string;
    title: string;
    created_at: string;
    content: string;
    slug: string;
    pinned: boolean;
}

export default function Sidebar() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    async function fetchBlogPosts() {
        try {
            const { data, error } = await supabase
                .from('blogs_tests')
                .select('id, title, created_at, content, slug, pinned')

            if (error) throw error;

            // Sort the posts: pinned first (ascending by date), then non-pinned (descending by date)
            const sortedPosts = data?.sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                if (a.pinned && b.pinned) {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                }
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }) || [];
            setBlogPosts(sortedPosts);

            // Check if the current route is "/" and redirect to "/posts/about-me"
            if (pathname === '/') {
                const aboutMePost = sortedPosts.find(post => post.slug === 'about-me');
                if (aboutMePost) {
                    setSelectedPostId(aboutMePost.id);
                    router.push('/posts/about-me');
                }
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    const handleCardClick = (postId: string) => {
        setSelectedPostId(postId);
        const post = blogPosts.find(post => post.id === postId);
        if (post) {
            router.push(`/posts/${post.slug}`);
        }
    };

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-[#2d211c] overflow-y-auto flex flex-col">
            <NotesHeader />
            <div className="p-4 flex-grow">
                {blogPosts.map((post) => (
                    <SidebarCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        createdAt={post.created_at}
                        isSelected={post.id === selectedPostId}
                        onClick={handleCardClick}
                    />
                ))}
            </div>
        </aside>
    );
}