import { useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { AppContext } from '../shared/context'

export const useSWCurrentCharacter = () => {
    const { state, dispatch } = useContext(AppContext)
    const { currentCharacter } = state;

    return useQuery(["starWarsCharacter", currentCharacter], async ({queryKey}) => {
        const response = await fetch(queryKey[1])
            .then(res => res.json())

        return {
            ...response,
            planet: await fetch(response.homeworld).then(d => d.json()),
            films: await Promise.all(response.films.map(film => fetch(film).then(d => d.json()))),
            starships: await Promise.all(response.starships.map(starship => fetch(starship).then(d => d.json())))
        }
    });

}
