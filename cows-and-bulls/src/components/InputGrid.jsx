import { useState, useEffect, act } from 'react';
import NumberCell from './NumberCell.jsx';

export default function InputGrid() {
    const [activeRow, setActiveRow] = useState(0);

    const handleEnterPressed = () => {
        if (activeRow >= 5) {
            setActiveRow(-1);
        }
        setActiveRow(activeRow + 1);
    }
    
    return (
        <div className='grid'>
            <InputRow isActive={activeRow === 0} onEnterPressed={handleEnterPressed} />
            <InputRow isActive={activeRow === 1} onEnterPressed={handleEnterPressed} />
            <InputRow isActive={activeRow === 2} onEnterPressed={handleEnterPressed} />
            <InputRow isActive={activeRow === 3} onEnterPressed={handleEnterPressed} />
            <InputRow isActive={activeRow === 4} onEnterPressed={handleEnterPressed} />
            <InputRow isActive={activeRow === 5} onEnterPressed={handleEnterPressed} />
        </div>
    )
}

function InputRow({ isActive, onEnterPressed }) {
    const [digits, setDigits] = useState(['', '', '', '']);
    const [focusedCell, setFocusedCell] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isActive) return;
            let index = focusedCell;
            console.log("Key down:", e.key, "at index", index);
            if (e.key >= '0' && e.key <= '9') {
                const newDigits = [...digits];
                newDigits[index] = e.key;
                setDigits(newDigits);
                if (index < 3) {
                    setFocusedCell(index + 1);
                }
            }
            if (e.key === 'Backspace') {
                const newDigits = [...digits];
                console.log("Before Backspace:", newDigits);
                if (newDigits[index] === '' && index > 0) {
                    newDigits[index - 1] = '';
                    console.log("Deleting previous at index", index - 1);
                }
                else {
                    newDigits[index] = '';
                    console.log("Deleting current at index", index);
                }
                setDigits(newDigits);
                if (index > 0) {
                    setFocusedCell(index - 1);
                }
            }
            if (e.key === 'ArrowLeft') {
                if (index > 0) {
                    setFocusedCell(index - 1);
                }
            }
            if (e.key === 'ArrowRight') {
                if (index < 3) {
                    setFocusedCell(index + 1);
                }
            }
            if (e.key === 'Enter') {
                onEnterPressed();
            }
        }
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [focusedCell, digits, isActive]);

    const onClickCell = (index) => {
        if (!isActive) return;
        console.log("Clicked cell", index);
        setFocusedCell(index);
    }

    return (
        <div className='row'>
            {digits.map((digit, index) => (
                <NumberCell
                    key={index}
                    value={digit}
                    onClick={() => onClickCell(index)}
                    isFocused={index === focusedCell && isActive}
                />
            ))}
        </div>
    )
}