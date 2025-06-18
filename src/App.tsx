import React, { useState } from 'react';
import { Header } from './components/HeaderComponent.tsx';
import { Sidebar } from './components/SidebarComponent.tsx';
import { ClickPage } from './pages/ClickPage';
import { AutoClickersPage } from './pages/AutoClickersPage';
import { InfoPage } from './pages/InfoPageComponent.tsx';
import { GameProvider } from './context/GameContextProvider.tsx';
import './App.css';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('click');

    const renderContent = () => {
        switch (currentPage) {
            case 'click':
                return <ClickPage />;
            case 'auto-clickers':
                return <AutoClickersPage />;
            case 'info':
                return <InfoPage />;
            default:
                return <ClickPage />;
        }
    };

    return (
        <GameProvider>
            <div className="app">
                <Header />
                <div className="main-container">
                    <Sidebar
                        onNavigate={setCurrentPage}
                        currentPage={currentPage}
                    />
                    <main className="content">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </GameProvider>
    );
};

export default App;