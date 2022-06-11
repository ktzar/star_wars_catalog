import React, { useContext, useReducer } from 'react';
import ReactDom from 'react-dom';
import ReactRouter from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import List from './components/List'
import Detail from './components/Detail'
import Favourites from './components/Favourites'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { AppContext, initialState, reducer } from './shared/context'


const queryClient = new QueryClient()



const App = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState) 

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
