function NumberCell({ value, isFocused, onClick }) {

    return (
        <div className={`cell ${isFocused ? 'focused' : ''} center`} onClick={onClick}>
            {value}
        </div>
    )
}

export default NumberCell;