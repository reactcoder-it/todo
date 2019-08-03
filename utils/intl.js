function ToDateTime(timeCode) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    timeZone: "Europe/Samara"
  }
  return new Intl.DateTimeFormat("ru-RU", options).format(timeCode)
}

export {
  ToDateTime
}