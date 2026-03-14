const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
} as const

function timestamp() {
  return new Date().toLocaleTimeString()
}

function write(color: string, label: string, message: string) {
  console.log(
    `${colors.dim}${timestamp()}${colors.reset} ${color}${label}${colors.reset} ${message}`,
  )
}

export function logInfo(message: string) {
  write(colors.cyan, 'INFO ', message)
}

export function logSuccess(message: string) {
  write(colors.green, 'OK   ', message)
}

export function logWarn(message: string) {
  write(colors.yellow, 'WARN ', message)
}

export function logError(message: string) {
  write(colors.red, 'ERR  ', message)
}

export function logRequest(
  method: string,
  path: string,
  statusCode: number,
  durationMs: number,
) {
  const statusColor =
    statusCode >= 500
      ? colors.red
      : statusCode >= 400
        ? colors.yellow
        : statusCode >= 300
          ? colors.magenta
          : colors.green

  write(
    statusColor,
    'HTTP ',
    `${method.padEnd(6)} ${path} -> ${statusCode} ${colors.dim}${durationMs.toFixed(1)}ms${colors.reset}`,
  )
}

export function logStartup(port: number, clientOrigin: string) {
  console.log('')
  console.log(`${colors.blue}Resume Platform API${colors.reset}`)
  console.log(
    `${colors.white}  Local:${colors.reset} http://localhost:${port}`,
  )
  console.log(
    `${colors.white}  Client:${colors.reset} ${clientOrigin}`,
  )
  console.log(
    `${colors.white}  Routes:${colors.reset} /api/health /api/profile /api/projects /api/skills /api/contact`,
  )
  console.log('')
}
