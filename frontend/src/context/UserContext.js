import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('registeredUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const registerUser = (userData) => {
        const newUser = {
            _id: Date.now().toString(),
            ...userData,
            avatar: {
                url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
            },
            createdAt: new Date().toISOString()
        };
        
        setCurrentUser(newUser);
        localStorage.setItem('registeredUser', JSON.stringify(newUser));
        return newUser;
    };

    const clearUser = () => {
        setCurrentUser(null);
        localStorage.removeItem('registeredUser');
    };

    return (
        <UserContext.Provider value={{ currentUser, registerUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};
