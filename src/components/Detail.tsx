import { useContext } from 'react'
import { AppContext } from '../shared/context'
import { useSWCurrentCharacter } from '../shared/useSWCurrentCharacter'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    const { isLoading, error, data } = useSWCurrentCharacter()

    if (isLoading) { return "Loading..."}

    const favouriteAction = {
        action: 'toggleFavourite',
        value: data
    }

    const favButtonLabel = state.favourites.some(c => c.url === data.url)
        ? "Remove from favourites"
        : "Add to favourites"

    return (
        <>
        <h3>{data.name}</h3>
        <button onClick={() => dispatch(favouriteAction)}>{favButtonLabel}</button>
        <ul>
            <li><strong>Hair colour</strong>: {data.hair_color}</li>
            <li><strong>Eye colour</strong>: {data.eye_color}</li>
            <li><strong>Gender</strong>: {data.gender} </li>
            <li><strong>Home planet</strong>: {data.planet.name}</li>
            <li><strong>Films</strong>:
                <ul>{data.films.map(f => <li key={f.url}>{f.title}</li>)}</ul>
            </li>
            {data.starships.length ? (
                <li><strong>Starships</strong>:
                    <ul>{data.starships.map(s => <li key={s.url}>{s.name}</li>)}</ul>
                </li>
            ) : "No starships"}
        </ul>

            <button onClick={() => {
                dispatch({action: 'setCurrentCharacter', value: null})
            }}>Go back</button>
        </>
    );
}
