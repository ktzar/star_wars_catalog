import { useContext } from 'react'
import { AppContext } from '../shared/context'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    return (
        <>
            <h1>Favourites</h1>
            {!state.favourites || state.favourites.length === 0 && "No favourites"} 
            <ul>
            {state?.favourites?.map(f => <li key={f.name}>{f.name}</li>)}
            </ul>
            <hr/>
            <button onClick={() => dispatch({action: 'navigateTo', value: 'list'})} className="btn btn-primary">Go to list</button>
        </>
    );
}
