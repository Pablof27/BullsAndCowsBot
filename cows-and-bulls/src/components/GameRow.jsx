
export default function GameRow() {
    return (
        <div className="row">
            <InputRow />
            <ResultRow bulls={0} cows={0} />
        </div>
    )
}

function InputBox() {
    return (
        <div className="box">
            <input type="text" maxLength="1" />
        </div>
    )
}

function InputRow() {
    return (
        <div className="inputRow">
            <InputBox />
            <InputBox />
            <InputBox />
            <InputBox />
        </div>
    )
}

function ResultBox({ value }) {
    return (
        <div className="box">
            <label>{value}</label>
        </div>
    )
}

function ResultRow({ bulls, cows }) {
    return (
        <div className="resultRow">
            <ResultBox value={bulls} />
            <ResultBox value={cows} />
        </div>
    )
}