import React, { useContext } from 'react';

export const reducer = (state, {action, value}) => {
    switch (action) {
        case 'toggleFavourite':
            const existingFavourite = state.favourites.findIndex(f => f.url === value.url)
            const newFavourites = [...state.favourites]
            if (existingFavourite !== -1) {
                newFavourites.splice(existingFavourite, 1)
            } else {
                newFavourites.push(value)
            }
            console.log({state, newFavourites, value, existingFavourite})
            return {
                ...state,
                favourites: newFavourites
            }
        case 'setCurrentCharacter':
            return {
                ...state,
                currentScreen: value ? 'detail' : 'list',
                currentCharacter: value 
            }
        case 'gotoPage':
            return {...state, listPage: value }
        default:
            return {...state}
    }
}

export const initialState = {
    currentScreen: 'list',
    listPage: 1,
    favourites: [],
    currentCharacter: null
}

export const AppContext = React.createContext()
