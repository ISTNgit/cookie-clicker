// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import './Sidebar.css';

interface SidebarProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

export const Sidebar: React.FC<SidebarProps> = React.memo(({ onNavigate, currentPage }) => {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <button 
                    className={`nav-button ${currentPage === 'click' ? 'active' : ''}`}
                    onClick={() => onNavigate('click')}
                >
                    Click
                </button>
                <button 
                    className={`nav-button ${currentPage === 'auto-clickers' ? 'active' : ''}`}
                    onClick={() => onNavigate('auto-clickers')}
                >
                    Auto-Clickers
                </button>
                <button 
                    className={`nav-button ${currentPage === 'info' ? 'active' : ''}`}
                    onClick={() => onNavigate('info')}
                >
                    Info
                </button>
            </nav>
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';