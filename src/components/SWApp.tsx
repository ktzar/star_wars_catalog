import Detail from "./Detail"

export const SWApp = () => {

    return (
        <>
            <h1>Star Wars information</h1>

            <h2>Characters</h2>
            <ul>
                <li>Luke Skywalker</li>
            </ul>

            <Detail name="Luke Skywalker" hair_color="blond" eye_color="blue" />

        </>
    )
}
