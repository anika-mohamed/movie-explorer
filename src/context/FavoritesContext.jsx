import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children}) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Load favorites from the local storage
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const addFavorite = (movie) => {
        setFavorites((pre) => {
            const newFavorites = [...pre, movie];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => {
            const newFavorites = prev.filter((movie) => movie.id !== id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    }

    const isFavorite = (id) => {
        return favorites.some((movie) => movie.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}