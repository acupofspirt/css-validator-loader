const csstreeValidator = require('csstree-validator'),
      validateString = csstreeValidator.validateString,
      reporter = csstreeValidator.reporters.json,
      chalk = require('chalk'),
      path = require('path')


function assembleMsg (strings) {
  const msg = strings.join('\n')

  return `\n${msg}\n`
}

function formatError (resPath, report) {
  const parsedPath = path.parse(resPath),
        pathFolders = parsedPath.dir.split(path.sep),
        foldersAmount = pathFolders.length,
        messagesList = [],
        wb = chalk.whiteBright,
        mb = chalk.magentaBright
  let fileName = chalk.cyanBright(parsedPath.base)

  /*
   * We want provide for user some useful
   * info, such as one or two subdirectories
   */
  if (foldersAmount >= 2) {
    fileName = path.join(
      pathFolders[foldersAmount - 2],
      pathFolders[foldersAmount - 1],
      fileName
    )
  }
  else if (foldersAmount === 1) {
    fileName = path.join(pathFolders[0], fileName)
  }

  messagesList.push(
    ` ${wb.bgRedBright(' Stylesheet error ')} ${wb('in "')}${fileName}${wb('" on line ')}${mb(report.line)}${wb(', column ')}${mb(report.column)}`,
    ` ${wb.red.dim.bold(report.message)}`
  )

  if (report.details) {
    messagesList.push(` ${report.details}`)
  }


  return assembleMsg(messagesList)
}

function validate (content) {
  /*
   * Format description of report
   * {
   *   name: string,
   *   line: number,
   *   column: number,
   *   property: string,
   *   message: string
   *   details: string | null
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