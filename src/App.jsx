import { useState, useEffect } from 'react'
import './App.css'
import davidBean from './assets/david/david-bean.svg'

// Bean ship definitions
const BEAN_TYPES = [
  { name: 'Lima Bean', size: 3, color: '#90EE90' },
  { name: 'Pinto Bean', size: 3, color: '#D2B48C' },
  { name: 'Red Bean', size: 2, color: '#DC143C' },
  { name: 'Garbanzo Bean', size: 2, color: '#F5DEB3' },
  { name: 'Coffee Bean', size: 2, color: '#6B4423' }
]

const BOARD_SIZE = 8

function App() {
  const [board, setBoard] = useState([])
  const [ships, setShips] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('Click a square to start!')
  const [sunkCount, setSunkCount] = useState(0)

  // Initialize game
  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    // Create empty board
    const newBoard = Array(BOARD_SIZE).fill(null).map(() =>
      Array(BOARD_SIZE).fill(null).map(() => ({
        hit: false,
        miss: false,
        ship: null,
        shipIndex: null
      }))
    )

    // Place ships randomly
    const newShips = []
    const shipColors = ['#90EE90', '#D2B48C', '#DC143C', '#F5DEB3', '#6B4423']
    
    BEAN_TYPES.forEach((beanType, index) => {
      let placed = false
      let attempts = 0
      
      while (!placed && attempts < 100) {
        const horizontal = Math.random() > 0.5
        const row = Math.floor(Math.random() * BOARD_SIZE)
        const col = Math.floor(Math.random() * BOARD_SIZE)
        
        // Check if ship fits
        let fits = true
        const positions = []
        
        for (let i = 0; i < beanType.size; i++) {
          const r = horizontal ? row : row + i
          const c = horizontal ? col + i : col
          
          if (r >= BOARD_SIZE || c >= BOARD_SIZE || newBoard[r][c].ship !== null) {
            fits = false
            break
          }
          positions.push({ row: r, col: c })
        }
        
        if (fits) {
          // Place ship
          positions.forEach((pos, i) => {
            newBoard[pos.row][pos.col] = {
              hit: false,
              miss: false,
              ship: index,
              shipIndex: i
            }
          })
          
          newShips.push({
            ...beanType,
            id: index,
            positions,
            hits: 0,
            sunk: false,
            color: shipColors[index]
          })
          placed = true
        }
        attempts++
      }
    })
    
    setBoard(newBoard)
    setShips(newShips)
    setGameOver(false)
    setMessage('Click a square to start!')
    setSunkCount(0)
  }

  const handleClick = (row, col) => {
    if (gameOver || board[row][col].hit || board[row][col].miss) return

    const newBoard = board.map(r => r.map(cell => ({ ...cell })))
    const newShips = ships.map(s => ({ ...s, positions: [...s.positions] }))
    
    const cell = newBoard[row][col]
    
    if (cell.ship !== null) {
      // Hit!
      cell.hit = true
      const ship = newShips[cell.ship]
      ship.hits++
      
      // Check if ship is sunk
      if (ship.hits === ship.size) {
        ship.sunk = true
        setSunkCount(prev => prev + 1)
        setMessage(`🎉 You sunk the ${ship.name}! DAVID BEAN REVEALED! 🎉`)
        
        // Check if all ships are sunk
        if (newShips.every(s => s.sunk)) {
          setGameOver(true)
          setMessage('🏆 YOU WIN! All beans sunk! David Bean fully revealed! 🏆')
        }
      } else {
        setMessage(`Hit! ${ship.size - ship.hits} more to sink the ${ship.name}`)
      }
    } else {
      // Miss
      cell.miss = true
      setMessage('Miss! Try again!')
    }
    
    setBoard(newBoard)
    setShips(newShips)
  }

  const getCellContent = (cell, row, col) => {
    if (cell.hit && cell.ship !== null) {
      const ship = ships[cell.ship]
      if (ship && ship.sunk) {
        // Show David Bean for sunk ships
        return (
          <div className="david-bean-reveal">
            <img src={davidBean} alt="David Bean" className="david-bean-img" />
          </div>
        )
      }
      // Show regular bean for hit but not sunk
      return <div className="bean-hit" style={{ backgroundColor: ship?.color }} />
    }
    if (cell.miss) {
      return <div className="miss-marker">✕</div>
    }
    return null
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">🫘 Bean Battleship 🫘</h1>
        <p className="subtitle">Sink the beans. Reveal David Bean.</p>
      </header>

      <div className="game-container">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => (
                <button
                  key={colIndex}
                  className={`cell ${cell.hit ? 'hit' : ''} ${cell.miss ? 'miss' : ''}`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  disabled={gameOver || cell.hit || cell.miss}
                >
                  {getCellContent(cell, rowIndex, colIndex)}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar">
          <div className="message-box">
            <p className="message">{message}</p>
          </div>

          <div className="fleet-status">
            <h3>Fleet Status</h3>
            {ships.map((ship) => (
              <div key={ship.id} className={`fleet-item ${ship.sunk ? 'sunk' : ''}`}>
                <div 
                  className="fleet-color" 
                  style={{ backgroundColor: ship.color }}
                />
                <span className="fleet-name">
                  {ship.name}
                  {ship.sunk ? ' ☠️' : ` (${ship.hits}/${ship.size})`}
                </span>
              </div>
            ))}
          </div>

          <button className="restart-btn" onClick={initGame}>
            🔄 New Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
