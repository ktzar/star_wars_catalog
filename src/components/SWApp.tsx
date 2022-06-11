import { useContext } from 'react'
import { AppContext } from '../shared/context'
import List from './List'
import Detail from './Detail'
import Favourites from './Favourites'

export const SWApp = () => {
    const { state, dispatch } = useContext(AppContext)

    return (
        <>
            <h1>Star Wars information</h1>
            { state.currentScreen === 'list' && <List /> }
            { state.currentScreen === 'detail' && <Detail /> }
            { state.currentScreen === 'favourites' && <Favourites /> }
        </>
    )
}
