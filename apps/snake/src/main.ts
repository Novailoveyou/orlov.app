import './style.css'

// const use = (() => {
//   type State<Value> = { value: Value }

//   return <Value>(
//     value: Value,
//   ): [State<Value>, (newValue: Value | ((_value: Value) => Value)) => void] => {
//     const state: State<Value> = { value }

//     const setState = (newValue: Value | ((_value: Value) => Value)) => {
//       state.value =
//         newValue instanceof Function ? newValue(state.value) : newValue
//     }

//     return [state, setState]
//   }
// })()

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Snake = (() => {
  type Cell = [number, number]

  const SIZE = 50
  // const SPEED = 1000 / 60
  const SPEED = 100
  const HEAD: Cell = [0, 0]
  const SNAKE = [/* TAIL */ HEAD]
  const TAIL: Record<`${Cell[number]}-${Cell[number]}`, Cell | null> = {}
  const FOOD: Record<`${Cell[number]}-${Cell[number]}`, Cell | null> = {}

  // let width = window.innerWidth
  // let height = window.innerHeight
  let direction: 'up' | 'right' | 'down' | 'left' = 'right'
  let pause = false

  const getHead = () => SNAKE[SNAKE.length - 1]

  const getCell = (cell: Cell | undefined) =>
    !cell ? null : document.getElementById(`${cell[0]}-${cell[1]}`)

  // const handleResize = (_: UIEvent) => {
  //   width = window.innerWidth
  //   height = window.innerHeight
  // }

  const createField = () => {
    const field = document.createElement('div')
    field.classList.add('field')

    return field
  }

  const createColumn = (_: unknown, x: number) => {
    const createRow = (_: unknown, y: number) => {
      const cell = document.createElement('div')
      cell.setAttribute('id', `${x}-${y}`)
      cell.classList.add('cell')

      return cell
    }

    const rows = Array.from({ length: SIZE }, createRow)

    const column = document.createElement('div')
    column.classList.add('column')

    column.append(...rows)

    return column
  }

  const field = createField()

  const columns = Array.from({ length: SIZE }, createColumn)

  field.append(...columns)

  const handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        direction = 'up'
        break
      case 'ArrowRight':
        direction = 'right'
        break
      case 'ArrowDown':
        direction = 'down'
        break
      case 'ArrowLeft':
        direction = 'left'
        break
    }
  }

  const move = () => {
    if (pause) return
    const [_x, _y] = getHead()

    let newHead: Cell = [_x, _y]

    switch (direction) {
      case 'up':
        if (_y - 1 < 0) {
          newHead = [_x, SIZE - 1]
          break
        }
        newHead = [_x, _y - 1]
        break
      case 'right':
        if (_x + 1 > SIZE - 1) {
          newHead = [0, _y]
          break
        }
        newHead = [_x + 1, _y]
        break
      case 'down':
        if (_y + 1 > SIZE - 1) {
          newHead = [_x, 0]
          break
        }
        newHead = [_x, _y + 1]
        break
      case 'left':
        if (_x - 1 < 0) {
          newHead = [SIZE - 1, _y]
          break
        }
        newHead = [_x - 1, _y]
        break
    }

    if (FOOD[`${newHead[0]}-${newHead[1]}`]) {
      FOOD[`${newHead[0]}-${newHead[1]}`] = null
      getCell(newHead)?.classList.remove('food')
    } else {
      const tail = SNAKE.shift()
      if (tail) TAIL[`${tail[0]}-${tail[1]}`] = null
      getCell(tail)?.classList.remove('player')
    }

    if (TAIL[`${newHead[0]}-${newHead[1]}`]) {
      pause = true
      alert('lost')
      window.location.reload()
    } else {
      SNAKE.push(newHead)
      if (SNAKE.length > 1) TAIL[`${_x}-${_y}`] = [_x, _y]
    }

    getCell([_x, _y])?.classList.remove('head')
    getCell([_x, _y])!.innerHTML = ''
    getCell(newHead)?.classList.add('player', 'head')
    getCell(newHead)!.innerHTML = `<span>${SNAKE.length}<span>`
  }

  const feed = () => {
    if (pause) return
    const x = getRandomInt(0, SIZE)
    const y = getRandomInt(0, SIZE)

    getCell([x, y])?.classList.add('food')

    FOOD[`${x}-${y}`] = [x, y]
  }

  const init = () => {
    // window.addEventListener('resize', handleResize)

    window.addEventListener('keydown', handleKeydown)

    document.getElementById('app')?.appendChild(field)

    const moveInterval = setInterval(move, SPEED)
    const foodInterval = setInterval(feed, SPEED * 10)

    return () => {
      // window.removeEventListener('resize', handleResize)

      window.removeEventListener('keydown', handleKeydown)

      document.getElementById('app')?.removeChild(field)

      clearInterval(moveInterval)
      clearInterval(foodInterval)
    }
  }

  return { init }
})()

const App = (() => {
  const init = () => Snake.init()

  return { init }
})()

App.init()
