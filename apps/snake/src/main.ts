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

type Cell = [number, number]

type ElementId = Parameters<typeof document.getElementById>['0']

const Utils = (() => {
  const randomNumber = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return { randomNumber }
})()

// const Screen = (() => {
//   let width = window.innerWidth
//   let height = window.innerHeight
//   const handleResize = (_: UIEvent) => {
//     width = window.innerWidth
//     height = window.innerHeight
//   }
//   window.addEventListener('resize', handleResize)
//   window.removeEventListener('resize', handleResize)
// })()

const Field = (() => {
  const field = document.createElement('div')
  field.classList.add('field')

  const init = (size: number) => {
    if (size === field.childNodes.length) return field

    const createColumn = (_: unknown, x: number) => {
      const createRow = (_: unknown, y: number) => {
        const cell = document.createElement('div')
        cell.setAttribute('id', `${x}-${y}`)
        cell.classList.add('cell')

        return cell
      }

      const rows = Array.from({ length: size }, createRow)

      const column = document.createElement('div')
      column.classList.add('column')

      column.append(...rows)

      return column
    }

    const columns = Array.from({ length: size }, createColumn)

    field.append(...columns)

    return field
  }

  const cell = (cell: Cell | undefined) =>
    !cell ? null : document.getElementById(`${cell[0]}-${cell[1]}`)

  return { init, cell }
})()

const Snake = ((Utils, Field) => {
  const SIZE = 50
  const SPEED = 43
  const HEAD: Cell = [0, 0]
  const SNAKE = [/* TAIL */ HEAD]

  let direction: 'up' | 'right' | 'down' | 'left' = 'right'
  let isPause = false

  const forward = () => {
    const [x, y] = SNAKE[SNAKE.length - 1]
    let head: Cell

    switch (direction) {
      case 'up':
        if (y - 1 < 0) {
          head = [x, SIZE - 1]
          break
        }
        head = [x, y - 1]
        break
      case 'right':
        if (x + 1 > SIZE - 1) {
          head = [0, y]
          break
        }
        head = [x + 1, y]
        break
      case 'down':
        if (y + 1 > SIZE - 1) {
          head = [x, 0]
          break
        }
        head = [x, y + 1]
        break
      case 'left':
        if (x - 1 < 0) {
          head = [SIZE - 1, y]
          break
        }
        head = [x - 1, y]
        break
    }

    return head
  }

  const move = () => {
    const head = forward()

    const _headCell = Field.cell(SNAKE[SNAKE.length - 1])!
    const headCell = Field.cell(head)!

    if (headCell.classList.contains('food')) {
      headCell.classList.remove('food')
    } else {
      const tail = SNAKE.shift()
      Field.cell(tail)?.classList.remove('player')
    }

    _headCell.classList.remove('head')
    _headCell.innerHTML = ''

    if (headCell.classList.contains('player')) {
      pause()
      alert(`You ate yourself. Your tail grew to the size of ${SNAKE.length}`)
      window.location.reload()
    } else {
      SNAKE.push(head)

      headCell.classList.add('player', 'head')
      headCell.innerHTML = `<span>${SNAKE.length - 1}<span>`
    }
  }

  const feed = () => {
    const x = Utils.randomNumber(0, SIZE)
    const y = Utils.randomNumber(0, SIZE)

    Field.cell([x, y])?.classList.add('food')
  }

  const pause = () => {
    isPause = true
    clearInterval(Number(sessionStorage.getItem('moveInterval')))
    clearInterval(Number(sessionStorage.getItem('foodInterval')))

    return true
  }

  const play = () => {
    isPause = false

    const moveInterval = setInterval(move, SPEED)
    sessionStorage.setItem('moveInterval', `${moveInterval}`)

    const foodInterval = setInterval(feed, SPEED * 10)
    sessionStorage.setItem('foodInterval', `${foodInterval}`)

    return pause
  }

  const handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (isPause) break
        direction = 'up'
        break
      case 'ArrowRight':
      case 'd':
        if (isPause) break
        direction = 'right'
        break
      case 'ArrowDown':
      case 's':
        if (isPause) break
        direction = 'down'
        break
      case 'ArrowLeft':
      case 'a':
        if (isPause) break
        direction = 'left'
        break
      case ' ':
        isPause ? play() : pause()
        break
    }
  }

  const init = (id: ElementId) => {
    const field = Field.init(SIZE)

    document.getElementById(id)?.appendChild(field)

    play()

    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.getElementById(id)?.removeChild(field)

      pause()

      window.removeEventListener('keydown', handleKeydown)
    }
  }

  return { init }
})(Utils, Field)

const App = (() => {
  const init = (id: ElementId) => Snake.init(id)

  return { init }
})()

App.init('app')
