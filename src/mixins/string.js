const formatNumber = intl => {
  if (!intl) return "-"

  if (typeof intl == "string" && intl.match(/,/g)) {
    intl = Number(intl.replaceAll(",", ""))
  }

  return new Intl.NumberFormat().format(intl)
}

const debounce = (fn, delay) => {
  let timer = null

  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

const pageNumber = data => {
  if(data.pageTotal <= 10){
    return 1
  }

  return Math.ceil(data.pageTotal / data.pageCount)
}

export {
  formatNumber,
  debounce,
  pageNumber,
}
