import { fireEvent, prettyDOM, render, screen } from '@testing-library/react'
import { AppContext, Screen, SWCharacter } from '../shared/context'
import { useSWCharacters } from '../shared/useSWCharacters'
import List from './List'

jest.mock('../shared/useSWCharacters', () => ({
    useSWCharacters: () => ({
        isLoading: false,
        data: {count: 20, people: [{name: "Bobba"}, {name: "Fett"}]},
        error: false
    })
}))

test('renders some people', async () => {
    const ctx = {
        dispatch: jest.fn(),
        state: {
            currentScreen: 'list' as Screen,
            listPage: 0,
            favourites: []
        }
    }
    render(<List />)

    expect(await screen.findAllByText("World:")).toHaveLength(2)
    expect(await screen.findAllByText("Total entries 20, showing 2")).toHaveLength(1)
    
})

