
export default function GameRow() {
    return (
        <div className="Row">
            <InputRow />
            <ResultRow bulls={0} cows={0} />
        </div>
    )
}

function InputBox() {
    return (
        <div className="Box">
            <input type="text" maxLength="1" />
        </div>
    )
}

function InputRow() {
    return (
        <div className="InputRow">
            <InputBox />
            <InputBox />
            <InputBox />
            <InputBox />
        </div>
    )
}

function ResultBox({ value }) {
    return (
        <div className="Box">
            <label>{value}</label>
        </div>
    )
}

function ResultRow({ bulls, cows }) {
    return (
        <div className="ResultRow">
            <ResultBox value={bulls} />
            <ResultBox value={cows} />
        </div>
    )
}