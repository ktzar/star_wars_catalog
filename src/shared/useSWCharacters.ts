import { useQuery } from 'react-query'

export const useSWCharacters = (page) => {
    const { isLoading, error, data } = useQuery(["starWarsData", page], async (listPage) => {
        const response = await fetch(`https://swapi.dev/api/people?page=${page}`)
            .then(res => res.json())
        if (!response?.results || error) {
            throw new Error()
        }
        return {
            ...response,
            people: await Promise.all(response.results.map(async p => {
                const planet = await fetch(p.homeworld).then(res => res.json())
                return {...p, planetName: planet.name}
            }))
        }
    })

    return { isLoading, data, error }
}
