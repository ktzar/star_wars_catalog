import { useContext } from 'react'
import { useSWCharacters } from '../shared/useSWCharacters'
import { AppContext, SWCharacter } from '../shared/context'
import ListCharacter from './ListCharacter'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    const curPage = state.listPage

    const {isLoading, data, error} = useSWCharacters(curPage)

    if (isLoading) { return <>"Loading..."</>}

    if (error) return (<>"An error has occurred: " + error.message</>)

    return (
        <>
            <h2>List of Characters</h2>
            <div>Total entries {data.count}, showing {data.people.length}</div>
            <ul>
                { data.people.map((character : SWCharacter) =>
                    <li key={character.url} onClick={
                        () => dispatch({action: 'setCurrentCharacter', value: character.url})
                        }>
                        <ListCharacter {...character}/>
                    </li>
                )}
            </ul>
            { data.previous &&
                <button className="btn btn-primary" onClick={() => dispatch({action: 'gotoPage', value: state.listPage - 1})}>Previous page</button>
            }
            { data.next &&
                <button className="btn btn-primary" onClick={() => dispatch({action: 'gotoPage', value: state.listPage + 1})}>Next page</button>
            }

            <hr/>

            <button onClick={() => dispatch({action: 'navigateTo', value: 'favourites'})} className="btn btn-primary">See favourites</button>
        </>
    );
}
