export const rangeAbsolute = (start: number, end: number): number[] => {
  const startAbs = Math.abs(start)
  const endAbs = Math.abs(end)

  if (startAbs === endAbs) return [start]

  const givenArray: number[] = Array(Math.abs(endAbs - startAbs) + 1)

  const mapFunc = startAbs < endAbs ? (num, i) => startAbs + i : (num, i) => startAbs - i
  return Array.from(
    givenArray,
    mapFunc
  )
}

export default { rangeAbsolute }