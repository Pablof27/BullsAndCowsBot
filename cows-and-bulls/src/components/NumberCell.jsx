function NumberCell({ value, isFocused, onClick, color_class }) {

    return (
        <div className={`cell ${isFocused ? 'focused' : ''} center ${color_class}`} onClick={onClick}>
            {value}
        </div>
    )
}

export default NumberCell;