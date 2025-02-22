import './style.css'

const Selectors = (() => {
  const SELECTORS = {
    app: '#app',
  } as const

  return SELECTORS
})()

const Field = ((Selectors) => {
  const SIZE = 100

  const matrix = Array.from({ length: SIZE }, (_, x) =>
    Array.from({ length: SIZE }, (_, y) => ({ x, y })),
  )

  const map = matrix
    .reduce((acc, cur) => [...acc, ...cur], [])
    .reduce(
      (acc, cur) => ({ ...acc, [`${cur.x}-${cur.y}`]: cur }),
      {} as (typeof matrix)[number][number],
    )

  console.log(map)

  const createField = () => {
    const field = document.createElement('div')

    field.classList.add('field')

    matrix.forEach((_, x) => {
      const col = document.createElement('div')

      col.setAttribute('class', 'col')

      _.forEach((_, y) => {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        cell.setAttribute('id', `${x}-${y}`)
        cell.setAttribute('data-x', `${x}`)
        cell.setAttribute('data-y', `${y}`)

        col.appendChild(cell)
      })

      field.appendChild(col)
    })

    return field
  }

  const field = createField()

  const init = () => {
    const app = document.querySelector<HTMLDivElement>(Selectors.app)

    app?.appendChild(field)

    return () => field.remove()
  }

  const getCell = (x: number, y: number) => document.getElementById(`${x}-${y}`)

  return { size: SIZE, init, getCell }
})(Selectors)

const Player = ((Field) => {
  const SPEED = 1000

  const DIRECTIONS = {
    up: 'up',
    right: 'right',
    down: 'down',
    left: 'left',
  } as const

  let x = 0
  let y = 0
  let direction: keyof typeof DIRECTIONS = 'right'
  const setDirection = (_direction: typeof direction) => {
    direction = _direction
  }

  const move = (_direction: keyof typeof DIRECTIONS = direction) => {
    const _x = x
    const _y = y
    switch (_direction) {
      case 'up':
        y = y - 1
        break
      case 'right':
        x = x + 1
        break
      case 'down':
        y = y + 1
        break
      case 'left':
        x = x - 1
        break
    }

    if (x > Field.size - 1) x = 0
    if (x < 0) x = Field.size - 1

    if (y > Field.size - 1) y = 0
    if (y < 0) y = Field.size - 1

    Field.getCell(_x, _y)?.classList.remove('player')
    Field.getCell(x, y)?.classList.add('player')
  }

  const init = () => {
    const interval = setInterval(move, SPEED)

    return () => {
      clearInterval(interval)
    }
  }

  return { direction, setDirection, x, y, init }
})(Field)

const Controls = ((Player) => {
  const init = () => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          Player.setDirection('up')
          break
        case 'ArrowRight':
          Player.setDirection('right')
          break
        case 'ArrowDown':
          Player.setDirection('down')
          break
        case 'ArrowLeft':
          Player.setDirection('left')
          break
      }
    }

    document.addEventListener('keydown', handleKeydown)

    const cleanup = () => {
      document.removeEventListener('keydown', handleKeydown)
    }

    return cleanup
  }

  return { init }
})(Player)

const App = (() => {
  const init = (
    ...modules: (typeof Field | typeof Controls | typeof Player)[]
  ) => {
    const cleanups = modules.map((module) => module.init())

    return () => cleanups.forEach((cleanup) => cleanup())
  }
  return { init }
})()

App.init(Field, Controls, Player)
