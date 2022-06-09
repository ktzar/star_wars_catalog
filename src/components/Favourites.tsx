import { useContext } from 'react'
import { useQuery } from 'react-query'
import { AppContext } from '../index'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    console.log(state)
    return (
        <>
            Favourites: {state.currentScreen} 
        </>
    );
}
