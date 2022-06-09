import { useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { AppContext } from '../index'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    const { currentCharacter: character } = state;
    const [ planetName, setPlanetName ] = useState('')
    const [ films, setFilms ] = useState([])
    const [ starships, setStarships ] = useState([])

    useEffect(async () => {
        setPlanetName(await fetch(character.homeworld).then(d => d.json()))
        setFilms(await Promise.all(character.films.map(film => fetch(film).then(d => d.json()))))
        setStarships(await Promise.all(character.starships.map(starship => fetch(starship).then(d => d.json()))))
    }, [])

    console.log({character, films, starships, planetName})

    return (
        <>
        <h3>{character.name}</h3>
        <button>Add to favourites</button>
        <ul>
            <li>Hair colour: {character.hair_color}</li>
            <li>Eye colour: {character.eye_color}</li>
            <li>Gender colour</li>
            <li>Home planet: {planetName.name}</li>
            <li>Films:
                <ul>{films.map(f => <li key={f.url}>{f.title}</li>)}</ul>
            </li>
            <li>Starships:
                <ul>{starships.map(s => <li key={s.url}>{s.name}</li>)}</ul>
            </li>
        </ul>

            <button onClick={() => {
                dispatch({action: 'setCurrentCharacter', value: null})
            }}>Go back</button>
        </>
    );
}
