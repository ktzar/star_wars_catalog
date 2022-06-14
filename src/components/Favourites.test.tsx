import { fireEvent, render, screen } from '@testing-library/react'
import { AppContext, Screen, SWCharacter } from '../shared/context'
import  Favourites from './Favourites'

test('renders no favourites if there are no favourites', async () => {
    const ctx = {
        dispatch: jest.fn(),
        state: {
            currentScreen: 'list' as Screen,
            listPage: 0,
            favourites: []
        }
    }
    render(<Favourites />)
    expect(await screen.findAllByText("No favourites")).toHaveLength(1)
})

test('renders no favourites if there are no favourites', async () => {
    const char = (name : string) => ({name} as SWCharacter)
    const ctx = {
        dispatch: jest.fn(),
        state: {
            currentScreen: 'list' as Screen,
            listPage: 0,
            favourites: [char("Bobba"), char("Fet"), char("Luke")]
        }
    }
    const { container } = render(<AppContext.Provider value={ctx}><Favourites /></AppContext.Provider>)
    const lis = container.querySelectorAll('li')
    expect(lis.length).toBe(3)
})

test('dispatches an event on clicking the button button', () => {
    const char = (name : string) => ({name} as SWCharacter)
    const ctx = {
        dispatch: jest.fn(),
        state: {
            currentScreen: 'list' as Screen,
            listPage: 0,
            favourites: [char("Bobba"), char("Fet"), char("Luke")]
        }
    }
    render(<AppContext.Provider value={ctx}><Favourites /></AppContext.Provider>)
    fireEvent.click(screen.getByText('Go to list'))
    expect(ctx.dispatch).toHaveBeenCalledWith({action: "navigateTo", value: "list"})
    
})