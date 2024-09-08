import React from 'react';

interface SidebarCardProps {
    id: string;
    title: string;
    createdAt: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

const SidebarCard: React.FC<SidebarCardProps> = ({ id, title, createdAt, isSelected, onClick }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
    };

    return (
        <div
            className={`p-4 border-b border-gray-700 cursor-pointer ${isSelected ? 'bg-[#9e7c29]' : ''}`}
            onClick={() => onClick(id)}
        >
            <h3 className="text-lg font-semibold text-gray-200 mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
        </div>
    );
};

export default SidebarCard;