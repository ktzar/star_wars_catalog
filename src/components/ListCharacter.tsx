interface ListCharacterProps {
    name: string
    gender: string
    homeworld: string
}

export default ({name, gender, homeworld} : ListCharacterProps) =>
    <span>
        <strong>{name}</strong>
        {gender === 'female' ? '♀️' : gender === 'male' ? '♂️' : '?' }
        <span>World: {homeworld}</span>
    </span>
