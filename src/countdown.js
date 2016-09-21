exports.start = (downFrom, onCount, done) => {
  for (let i = 0; i <= downFrom, i += 1) {
    setTimeOut( _ => {
      const count = downFrom - i
      onCount(count)
      if (i === downFrom)
        done()

    }, i * 1000)
  }
}
