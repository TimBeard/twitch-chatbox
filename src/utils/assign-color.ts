const colors: { [name: string]: string } = {}

export default function assignColor(name?: string): string {

  if (!name) return 'currentColor'
  if (colors[name]) return colors[name]

  const hue: number = Math.floor(Math.random() * 360)
  const sat: number = Math.floor(Math.random() * 30) + 60

  const color: string = `hsl(${hue}, ${sat}%, 63.92%)`

  colors[name] = color

  return colors[name]
}
