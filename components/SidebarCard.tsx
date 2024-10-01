import React from 'react';

interface SidebarCardProps {
    id: string;
    title: string;
    createdAt: string;
    isSelected: boolean;
    onClick: () => void;
}

const SidebarCard: React.FC<SidebarCardProps> = ({ id, title, createdAt, isSelected, onClick }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
    };

    return (
        <div
            className={`p-5 border-b border-[#413530] cursor-pointer rounded-lg ${isSelected ? 'bg-[#9e7c29]' : ''}`}
            onClick={onClick}
        >
            <h3 className="text-base font-semibold text-gray-200 mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
        </div>
    );
};

export default SidebarCard;