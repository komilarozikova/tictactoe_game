import React, { useState } from 'react';
import '../TicTacToe/Tictactoe.css';

const Tictacktoe = () => {
    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const [winningCombo, setWinningCombo] = useState([]);
    const [isDraw, setIsDrawn] = useState(false);
    const combos = {
        across: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ],
        down: [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ],
        diagonal: [
            [0, 4, 8],
            [2, 4, 6]
        ],
    };

    const checkForWinner = (squares) => {
        let isDraw = true;
        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ) {
                    isDraw = false;
                    return;
                } else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]);
                    setWinningCombo(pattern);
                    isDraw = false;
                    return;
                }
            });
        }
        if (isDraw) {
            setWinner('DRAWN')
        }
    };

    const handleClick = (num) => {
        if (winner) {
            return; // If a winner has already been determined, do nothing
        }
        if (cells[num] !== '') {
            alert('already clicked');
            return;
        }
        let squares = [...cells];

        if (turn === 'x') {
            squares[num] = 'x';
            setTurn('o');
        } else {
            squares[num] = 'o';
            setTurn('x');
        }
        setCells(squares);
        checkForWinner(squares);
    };

    const handleResStart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
        setWinningCombo([]);
    };

    const Cell = ({ num }) => {
        const isWinnerBox = winningCombo.includes(num);
        return (
            <td className={isWinnerBox ? 'winner-box' : ''} onClick={() => handleClick(num)}>
                {cells[num]}
            </td>
        );
    };

    return (
        <div className='container'>
            <table>
                <p className='table'>
                    Turn: <span>{turn}</span>
                </p>
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            {winner && winner !== 'DRAWN' && (
            <>
                <p className='winner'>
                    <span>{winner}</span> is the winner!
                </p>
                <button onClick={() => handleResStart()}>Play again</button>
            </>
        )}
        {winner === 'DRAWN' && (
            <>
                <p className='winner'>The game is drawn!</p>
                <button onClick={() => handleResStart()}>Play again</button>
            </>
        )}
        </div>
    );
};

export default Tictacktoe;
