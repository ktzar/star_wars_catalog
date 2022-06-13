import { useQuery } from 'react-query'
import { SWCharacter } from './context'

export const useSWCharacters = (page : number) => {
    const { isLoading, error, data } = useQuery(["starWarsData", page], async (listPage) => {
        const response = await fetch(`https://swapi.dev/api/people?page=${page}`)
            .then(res => res.json())
        if (!response?.results || error) {
            throw new Error()
        }
        return {
            ...response,
            people: await Promise.all(response.results.map(async (p : SWCharacter)  => {
                const planet = await fetch(p.homeworld).then(res => res.json())
                return {...p, homeworld: planet.name}
            }))
        }
    })

    return { isLoading, data, error }
}
