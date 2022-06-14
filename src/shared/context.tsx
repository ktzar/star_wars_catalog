import React, { createContext, useReducer } from 'react';

interface Action {
    action: string,
    value: any
}

export const reducer = (state : AppState, actionPayload : Action) : AppState => {
    const { action, value } = actionPayload
    switch (action) {
        case 'toggleFavourite':
            const existingFavourite = state.favourites.findIndex((f : SWCharacter) => f.url === value.url)
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
        case 'navigateTo':
            return {
                ...state,
                currentScreen: value,
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

interface SWPlanet {
    name: string
    url: string
}

interface SWShip {
    name: string
    url: string
}

interface SWFilm {
    title: string
    url: string
}

export interface SWCharacter {
    hair_color: string
    eye_color: string
    url: string
    gender: string
    name: string
    homeworld: string
    planet?: SWPlanet
    films?: SWFilm[]
    starships?: SWShip[]
}

export type Screen = 'list' | 'detail' | 'favourites'

interface AppState {
    currentScreen: Screen
    listPage: number
    favourites: SWCharacter[]
    currentCharacter?: SWCharacter
}

export const initialState = {
    currentScreen: 'list' as Screen,
    listPage: 1,
    favourites: [],
    currentCharacter: undefined
}

export const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => {}
})

export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}
