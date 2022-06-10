import { useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { AppContext } from '../index'

export default () => {
    const { state, dispatch } = useContext(AppContext)
    const { currentCharacter } = state;
    console.log({state})

    const { isLoading, error, data, isFetching } = useQuery(["starWarsCharacter", currentCharacter], async () => {
        console.log({currentCharacter})
        const response = await fetch(currentCharacter)
            .then(res => res.json())

        return {
            ...response,
            planet: await fetch(response.homeworld).then(d => d.json()),
            films: await Promise.all(response.films.map(film => fetch(film).then(d => d.json()))),
            starships: await Promise.all(response.starships.map(starship => fetch(starship).then(d => d.json())))
        }
    });

    console.log({isLoading, error, data})

    if (isLoading) { return "Loading..."}

    return (
        <>
        <h3>{data.name}</h3>
        <button>Add to favourites</button>
        <ul>
            <li>Hair colour: {data.hair_color}</li>
            <li>Eye colour: {data.eye_color}</li>
            <li>Gender colour</li>
            <li>Home planet: {data.planet.name}</li>
            <li>Films:
                <ul>{data.films.map(f => <li key={f.url}>{f.title}</li>)}</ul>
            </li>
            <li>Starships:
                <ul>{data.starships.map(s => <li key={s.url}>{s.name}</li>)}</ul>
            </li>
        </ul>

            <button onClick={() => {
                dispatch({action: 'setCurrentCharacter', value: null})
            }}>Go back</button>
        </>
    );
}
