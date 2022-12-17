export const rangeAbsolute = (start: number, end: number): number[] => {
  const startAbs: number = Math.abs(start)
  const endAbs: number = Math.abs(end)

  if (startAbs === endAbs) return [start]

  const givenArray: number[] = Array(Math.abs(endAbs - startAbs) + 1)

  const mapFunc: MathFunc = startAbs < endAbs ? (num: number, i: number) => startAbs + i : (num: number, i: number) => startAbs - i

  return Array.from(
    givenArray,
    mapFunc
  )
}

export default { rangeAbsolute }
