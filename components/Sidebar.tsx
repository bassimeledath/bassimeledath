"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useFetchBlogPosts from '@/hooks/useFetchBlogPosts';
import SidebarCard from '@/components/SidebarCard';
import NotesHeader from '@/components/NotesHeader';

export default function Sidebar() {
    const { blogPosts, loading, error } = useFetchBlogPosts();
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const router = useRouter();
    console.log(blogPosts);

    const handleCardClick = (postId: string) => {
        setSelectedPostId(postId); // Set the selected post ID here
        const post = blogPosts.find(post => post.id === postId);
        router.push(postId === 'about-me' ? '/' : `/posts/${post?.slug}`);
    };

    if (loading) return null;
    if (error) return <p>{error}</p>;

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
                        isSelected={post.id === selectedPostId} // Compare with selectedPostId
                        onClick={handleCardClick} // Pass the onClick handler
                    />
                ))}
            </div>
        </aside>
    );
}
