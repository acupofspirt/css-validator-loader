const csstreeValidator = require('csstree-validator'),
      validateString = csstreeValidator.validateString,
      reporter = csstreeValidator.reporters.json,
      chalk = require('chalk'),
      path = require('path')

function generateBorder (length) {
  // We can't properly caclulate string width
  // in pixels due to non-monospace fonts,
  // so we add thirty extra symbols
  const castedLength = Math.ceil((length + 30) / 2),
        char = '-'

  return `${chalk.whiteBright.bold(new Array(castedLength + 1).join(` ${char}`))} `
}

function assembleMsg (strings, longestLineLength) {
  const border = generateBorder(longestLineLength)
  let msg = `${border}\n\n`

  strings.forEach(str => {
    msg += `${str}\n`
  })

  msg += `\n${border}`

  return msg
}

function formatError (resPath, report) {
  const parsedPath = path.parse(resPath),
        pathFolders = parsedPath.dir.split(path.sep),
        foldersAmount = pathFolders.length,
        msgLines = [],
        wb = chalk.whiteBright,
        mb = chalk.magentaBright
  let fileName = chalk.cyanBright(parsedPath.base)

  // We want provide for user some useful
  // info, such as one or two parent directories
  if (foldersAmount >= 2) {
    fileName = path
      .join(pathFolders[foldersAmount - 2], pathFolders[foldersAmount - 1], fileName)
  }
  else if (foldersAmount === 1) {
    fileName = path.join(pathFolders[0], fileName)
  }

  msgLines.push(
    {
      str: ` ${wb.bgRedBright(' Stylesheet error ')} ${wb('in "')}${fileName}${wb('" on line ')}${mb(report.line)}${wb(', column ')}${mb(report.column)}`,
      chalkSymbols: 80
    },
    {
      str: wb(` ${report.message}`),
      chalkSymbols: 10
    }
  )

  if (report.details) {
    msgLines.push({
      str: report.details,
      chalkSymbols: 0
    })
  }

  // Chalk add ten unicode symbols for each
  // method call, like .whiteBright
  // We can manually calculate that for each string
  // and substract from common length
  function findTrueLongest (longest, current) {
    const trueLength = current.str.length - current.chalkSymbols

    if (trueLength > longest) {
      return trueLength
    }

    return longest
  }

  const longestLineLength = msgLines.reduce(findTrueLongest, 0),
        messagesList = msgLines.map(e => e.str)

  return assembleMsg(messagesList, longestLineLength)
}

function validate (content) {
  /* Format description of report
   * {
   *   name: String,
   *   line: Number,
   *   column: Number,
   *   property: String,
   *   message: String
   *   details: String | Null
   * }
   */
  const reports = JSON.parse(reporter(validateString(content)))

  if (reports.length) {
    reports.forEach(report => {
      this.emitWarning(Error(formatError(this.resourcePath, report)))
    })
  }

  return content
}

module.exports = validate