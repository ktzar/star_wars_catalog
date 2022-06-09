export default ({name, gender, planetName}) =>
    <span>
        <strong>{name}</strong>
        {gender === 'female' ? '♀️' : gender === 'male' ? '♂️' : '?' }
        <span>World: {planetName}</span>
    </span>
