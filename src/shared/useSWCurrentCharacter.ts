import { useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { AppContext, SWCharacter } from '../shared/context'

export const useSWCurrentCharacter = () => {
    const { state, dispatch } = useContext(AppContext)
    const { currentCharacter } = state;

    return useQuery<SWCharacter, Error>(["starWarsCharacter", currentCharacter], async ({queryKey}) => {
        if (!queryKey?.[1]) {
            return {}
        }
        const response = await fetch(queryKey[1] as string)
            .then(res => res.json())

        return {
            ...response,
            planet: await fetch(response.homeworld).then(d => d.json()),
            films: await Promise.all(response.films.map((film : string) => fetch(film).then(d => d.json()))),
            starships: await Promise.all(response.starships.map((starship : string) => fetch(starship).then(d => d.json())))
        }
    });

}
