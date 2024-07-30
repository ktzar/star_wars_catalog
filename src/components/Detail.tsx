
export default (props: any) => {
    return (
        <>
            <h3>{props.name}</h3>
            <button onClick={() => { }}>Add to Favourites</button>
            <ul>
                <li><strong>Hair colour</strong>: {props.hair_color}</li>
                <li><strong>Eye colour</strong>: {props.eye_color}</li>
                <li><strong>Gender</strong>: {props.gender} </li>
                <li><strong>Home planet</strong>: {props?.planet?.name || "Unknown"}</li>
                <li><strong>Films</strong>:
                    <ul>{props?.films?.map((f: any) => <li key={f.url}>{f.title}</li>)}</ul>
                </li>
                {props?.starships?.length ? (
                    <li><strong>Starships</strong>:
                        <ul>{props.starships.map((s: any) => <li key={s.url}>{s.name}</li>)}</ul>
                    </li>
                ) : "No starships"}
            </ul>
        </>
    );
}
