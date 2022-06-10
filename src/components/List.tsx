import { useContext } from 'react'
import { useQuery } from 'react-query'
import { AppContext } from '../index'
import ListCharacter from './ListCharacter'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    const curPage = state.listPage

    const { isLoading, error, data, isFetching } = useQuery(["starWarsData", curPage], async (listPage) => {
        const response = await fetch(`https://swapi.dev/api/people?page=${curPage}`)
            .then(res => res.json())
        if (!response?.results) {
            throw new Error()
        }
        return {
            ...response,
            people: await Promise.all(response.results.map(async p => {
                const planet = await fetch(p.homeworld).then(res => res.json())
                return {...p, planetName: planet.name}
            }))
        }
    });

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    console.log(state)
    return (
        <>
            <h2>List of Characters</h2>
            <div>Total entries {data.count}, showing {data.people.length}</div>
            <ul>
                { data.people.map(character => <li onClick={
                    () => dispatch({action: 'setCurrentCharacter', value: character.url})
                }><ListCharacter {...character}/></li>)}
            </ul>
            { data.previous && <button className="btn btn-primary" onClick={() => dispatch({action: 'gotoPage', value: state.listPage - 1})}>Previous page</button>}
            { data.next && <button className="btn btn-primary" onClick={() => dispatch({action: 'gotoPage', value: state.listPage + 1})}>Next page</button>}
        </>
    );
}
