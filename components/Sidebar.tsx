"use client"

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import SidebarCard from './SidebarCard';

interface BlogPost {
    id: string;
    title: string;
    created_at: string;
}

export default function Sidebar() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    async function fetchBlogPosts() {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('id, title, created_at')
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) throw error;
            setBlogPosts(data || []);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-[#2d211c] overflow-y-auto">
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-200 mb-4">Blog Posts</h2>
                {blogPosts.map((post) => (
                    <SidebarCard key={post.id} title={post.title} createdAt={post.created_at} />
                ))}
            </div>
        </aside>
    );
}