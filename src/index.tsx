import React, { useContext, useReducer } from 'react';
import ReactDom from 'react-dom';
import ReactRouter from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { AppProvider } from './shared/context'
import { SWApp } from './components/SWApp'


const queryClient = new QueryClient()



const App = () => {
    return (<>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <div className="container">
            <SWApp/>
        </div>
      </QueryClientProvider>
    </AppProvider>
    </>);
}

ReactDom.render(<App/>, document.getElementById('root'));
