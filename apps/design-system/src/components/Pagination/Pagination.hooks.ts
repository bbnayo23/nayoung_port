export const usePages = (totalPages: number, currentPage: number, maxDisplay: number) => {
  const pages = []
  let start = Math.max(1, currentPage - Math.floor(maxDisplay / 2))
  let end = start + maxDisplay - 1
  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - maxDisplay + 1)
  }
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return { pages, start, end }
}
