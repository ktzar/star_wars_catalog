import { useContext } from 'react'
import { useQuery } from 'react-query'
import { AppContext } from '../shared/context'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    console.log(state)
    return (
        <>
            <h1>Favourites</h1>
            {!state.favourites || state.favourites.length === 0 && "No favourites"} 
            {state?.favourites?.map(f => f.name)}
            <hr/>
            <button onClick={() => dispatch({action: 'navigateTo', value: 'list'})} className="btn btn-primary">Go to list</button>
        </>
    );
}
