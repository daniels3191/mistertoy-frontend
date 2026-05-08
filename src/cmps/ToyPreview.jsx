export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h2 >
                Toy: {toy.name}
            </h2>
            <h4>Toy Price: {toy.price}</h4>
            <img src={toy.imgUrl} alt="" />
        </article>
    )
}
