"use client"

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import SidebarCard from './SidebarCard';
import Note from './Note';

interface BlogPost {
    id: string;
    title: string;
    created_at: string;
    content: string;
}

export default function Sidebar() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    async function fetchBlogPosts() {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('id, title, created_at, content')
                .order('created_at', { ascending: false })

            if (error) throw error;
            setBlogPosts(data || []);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    const handleCardClick = (postId: string) => {
        setSelectedPostId(postId);
    };

    const selectedPost = blogPosts.find(post => post.id === selectedPostId);

    return (
        <div className="flex">
            <aside className="w-64 h-screen fixed left-0 top-0 bg-[#2d211c] overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-200 mb-4">Blog Posts</h2>
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
            <main className="ml-64 flex-grow">
                <Note title={selectedPost?.title} content={selectedPost?.content} />
            </main>
        </div>
    );
}