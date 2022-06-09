import React, { useContext, useReducer } from 'react';
import ReactDom from 'react-dom';
import ReactRouter from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import List from './components/List'
import Detail from './components/Detail'
import Favourites from './components/Favourites'

const queryClient = new QueryClient()

export const AppContext = React.createContext()

const reducer = (state, {action, value}) => {
    switch (action) {
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

const initialState = {
    currentScreen: 'list',
    listPage: 1,
    favourites: [],
    currentCharacter: null
}

const App = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState) 
    console.log({state})

    return (<>
    <AppContext.Provider value={{state, dispatch}}>
      <QueryClientProvider client={queryClient}>
        <div className="container">
            <h1>Star Wars information</h1>
            { state.currentScreen === 'list' && <List /> }
            { state.currentScreen === 'detail' && <Detail /> }
            { state.currentScreen === 'favourites' && <Favourites /> }
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
    </>);
}

ReactDom.render(<App/>, document.getElementById('root'));
