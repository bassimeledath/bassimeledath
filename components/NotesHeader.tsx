import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'

export default function NotesHeader() {
    const router = useRouter();
    const { isAuthenticated } = useAuth()

    const handleIconClick = () => {
        router.push('/posts/new');
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