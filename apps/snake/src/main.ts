import './style.css'

const use = (() => {
  type State<Value> = { value: Value }

  return <Value>(
    value: Value,
  ): [State<Value>, (newValue: Value | ((_value: Value) => Value)) => void] => {
    const state: State<Value> = { value }

    const setState = (newValue: Value | ((_value: Value) => Value)) => {
      state.value =
        newValue instanceof Function ? newValue(state.value) : newValue
    }

    return [state, setState]
  }
})()

type Cell = [number, number]

type CellId = `${number}-${number}`

const createSnake = (() => {
  type CellNode = { cell: Cell; next: CellNode | null; prev: CellNode | null }

  let headNode: CellNode = { cell: [0, 0], next: null, prev: null }
  let tailNode: CellNode = { cell: [0, 0], next: null, prev: null }
  let size = 0

  const cells: Record<CellId, CellNode | null> = {}

  const cellToId = (cell: Cell): CellId => `${cell[0]}-${cell[1]}`

  const length = () => size
  const head = () => headNode.cell
  const tail = () => tailNode

  const cell = (cell: Cell) => cells[cellToId(cell)]

  const isHead = (cell: Cell) => !cells[cellToId(cell)]?.next

  /**
   * @description [Cell->, ~~Cell~~, <-Cell]
   */
  const shrink = (cell: Cell) => {
    const _cell = { ...cells[cellToId(cell)] }

    if (_cell.prev) _cell.prev.next = _cell.next || null
    if (_cell.next) _cell.next.prev = _cell.prev || null

    cells[cellToId(cell)] = null
    size = size - 1
  }

  const eat = (cell: Cell) => {
    const newHeadNode = {
      cell,
      next: null,
      prev: cells[cellToId(headNode.cell)],
    }

    if (cells[cellToId(headNode.cell)])
      // @ts-expect-error -- TS won't understand the check above
      cells[cellToId(headNode.cell)].next = newHeadNode

    cells[cellToId(cell)] = newHeadNode

    size = size + 1
  }

  const pop = () => {
    const tail = cell(tailNode.cell)

    shrink(tailNode.cell)

    return tail?.cell
  }

  return () => ({
    length,
    cell,
    head,
    tail,
    eat,
    pop,
    isHead,
  })
})()

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Snake = (() => {
  const SIZE = 50
  // const SPEED = 1000 / 60
  const SPEED = 100
  const FOOD: Record<CellId, Cell | null> = {}

  let width = window.innerWidth
  let height = window.innerHeight
  let direction: 'up' | 'right' | 'down' | 'left' = 'right'
  let pause = false

  const snake = createSnake()

  const getCell = (cell: Cell | undefined) =>
    !cell ? null : document.getElementById(`${cell[0]}-${cell[1]}`)

  const handleResize = (uiEvent: UIEvent) => {
    width = window.innerWidth
    height = window.innerHeight
  }

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
    const [_x, _y] = snake.head()

    let head: Cell = [_x, _y]

    switch (direction) {
      case 'up':
        if (_y - 1 < 0) {
          head = [_x, SIZE - 1]
          break
        }
        head = [_x, _y - 1]
        break
      case 'right':
        if (_x + 1 > SIZE - 1) {
          head = [0, _y]
          break
        }
        head = [_x + 1, _y]
        break
      case 'down':
        if (_y + 1 > SIZE - 1) {
          head = [_x, 0]
          break
        }
        head = [_x, _y + 1]
        break
      case 'left':
        if (_x - 1 < 0) {
          head = [SIZE - 1, _y]
          break
        }
        head = [_x - 1, _y]
        break
    }

    if (FOOD[`${_x}-${_y}`]) {
      FOOD[`${_x}-${_y}`] = null
      getCell(head)?.classList.remove('food')
    } else {
      const tail = snake.pop()
      getCell(tail)?.classList.remove('player')
    }

    if (snake.cell(head) && !snake.isHead(head)) {
      pause = true
      alert('lost')
      window.location.reload()
    } else {
      snake.eat(head)
    }

    getCell(head)?.classList.add('player')
  }

  const feed = () => {
    if (pause) return
    const x = getRandomInt(0, SIZE)
    const y = getRandomInt(0, SIZE)

    getCell([x, y])?.classList.add('food')

    FOOD[`${x}-${y}`] = [x, y]
  }

  const init = () => {
    window.addEventListener('resize', handleResize)

    window.addEventListener('keydown', handleKeydown)

    document.getElementById('app')?.appendChild(field)

    const moveInterval = setInterval(move, SPEED)
    const foodInterval = setInterval(feed, SPEED * 10)

    return () => {
      window.removeEventListener('resize', handleResize)

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
