import NumberCell from "./NumberCell";

function ResultGrid() {
    return (
        <div className="grid">
            <ResultRow bulls={1} cows={2} />
            <ResultRow bulls={0} cows={3} />
            <ResultRow bulls={4} cows={0} />
            <ResultRow bulls={2} cows={1} />
            <ResultRow bulls={3} cows={0} />
            <ResultRow bulls={0} cows={4} />
        </div>
    )
}

function ResultRow({ bulls, cows }) {
    return (
        <div className="row">
            <NumberCell value={bulls} color_class={bulls > 0 ? "in-position-digit" : ""} />
            <NumberCell value={cows} color_class={cows > 0 ? "out-of-position-digit" : ""} />
        </div>
    )

}

export default ResultGrid;