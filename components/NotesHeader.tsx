import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function NotesHeader() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
    };

    const handleIconClick = async () => {
        console.log('User is authenticated. Implement your notes logic here.');
    };

    return (
        <div className="flex justify-between items-center p-4 bg-[#2d211c] text-white">
            <span className="text-xl font-bold">Notes</span>
            {isAuthenticated && (
                <button onClick={handleIconClick} className="focus:outline-none">
                    <Pencil size={24} />
                </button>
            )}
        </div>
    );
}