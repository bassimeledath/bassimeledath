"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import useFetchBlogPosts from '@/hooks/useFetchBlogPosts';
import SidebarCard from '@/components/SidebarCard';
import NotesHeader from '@/components/NotesHeader';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Sidebar() {
    const { blogPosts, loading, error } = useFetchBlogPosts();
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/') {
            setSelectedPostId('about-me');
        }
    }, [pathname]);

    if (error) return <p>{error}</p>;

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-[#2d211c] overflow-y-auto flex flex-col">
            <NotesHeader />
            <div className="p-4 flex-grow">
                {blogPosts.map((post) => (
                    <Link
                        key={post.id}
                        href={post.id === 'about-me' ? '/' : `/posts/${post.slug}`}
                        passHref
                    >
                        <SidebarCard
                            id={post.id}
                            title={post.title}
                            createdAt={post.created_at}
                            isSelected={post.id === selectedPostId}
                            onClick={() => setSelectedPostId(post.id)}
                        />
                    </Link>
                ))}
            </div>
        </aside>
    );
}