# Bean Battleship

A silly, fun Battleship-style game where you sink bean ships to reveal your friend David Bean!

## How to Play

1. Click squares on the 8x8 grid to find and sink the hidden bean ships
2. **Hit** - You found part of a bean ship! Keep clicking to sink it
3. **Miss** - Nothing there, try another square
4. **Sink a ship** - When you hit all squares of a bean ship, it sinks and reveals **David Bean** in those squares!
5. Win by sinking all 5 bean ships

## Running the Game

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The game will open at `http://localhost:5173/`

## Replacing the Images

### Bean Images
Replace the placeholder files in `src/assets/beans/` with your own bean artwork:

- `lima.png` - Lima Bean (size: 3 squares)
- `pinto.png` - Pinto Bean (size: 3 squares)
- `redbean.png` - Red Bean (size: 2 squares)
- `garbanzo.png` - Garbanzo Bean (size: 2 squares)
- `coffee.png` - Coffee Bean (size: 2 squares)

**Current behavior:** The game uses colored circles as placeholders. To use actual bean images, you'll need to modify `src/App.jsx` to import and display the images instead of the colored divs.

### David Bean Image
Replace `src/assets/david/david-bean.jpg` with your friend David Bean's photo.

**This is the most important image!** It's revealed when ships are sunk and provides the comedic payoff.

### To Add Actual Bean Images

In `src/App.jsx`, replace the `getCellContent` function's bean hit logic:

```jsx
// Current (colored circles):
return <div className="bean-hit" style={{ backgroundColor: ship?.color }} />

// Replace with (actual images):
import limaBean from './assets/beans/lima.png'
import pintoBean from './assets/beans/pinto.png'
import redbean from './assets/beans/redbean.png'
import garbanzo from './assets/beans/garbanzo.png'
import coffee from './assets/beans/coffee.png'

const beanImages = [limaBean, pintoBean, redbean, garbanzo, coffee]

// Then in getCellContent:
return <img src={beanImages[cell.ship]} alt="bean" className="bean-img" />
```

And add to CSS:
```css
.bean-img {
  width: 35px;
  height: 35px;
  object-fit: contain;
}
```

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Plain CSS** - Fun cartoon styling (no external CSS framework)

## Game Features

- 8x8 game board
- 5 different bean ships (Lima, Pinto, Red, Garbanzo, Coffee)
- Random ship placement each game
- Hit/miss feedback with animations
- Fleet status tracking
- David Bean reveal on ship sink
- Responsive design (works on mobile and desktop)
- Bouncing title animation
- Hit bounce animation
- Sunk ship pulse animation

## Customization

### Change Bean Types
Edit the `BEAN_TYPES` array in `src/App.jsx` to change ship names, sizes, or colors.

### Change Board Size
Edit `BOARD_SIZE` in `src/App.jsx` (currently set to 8 for an 8x8 grid).

### Change Colors
Edit the CSS in `src/App.css` to customize the color scheme.

## Have Fun!

The goal is to make people laugh with the David Bean reveal. Keep it silly and simple!
