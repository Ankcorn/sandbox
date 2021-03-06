// TODO un-vendor the parser after final production testing
let { read, parser, lexer } = require('@architect/parser')
let { updater } = require('@architect/utils')
let defaultArc = `
@app
app-default

@static

@http

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
`

/**
 * reads .arc, app.arc, arc.json, arc.yaml or arc.toml file
 *
 * unfortunately some modules depend on arc read throwing so for compat reasons it does that
 * this wrapper forces it into continuation passing style
 */
module.exports = function arcfile () {
  let update = updater('Sandbox')

  // TODO
  // I need to update the architect/parser package but to do that we need to decide a format to add an authorizer to a route
  let { arc, filepath, errors } = read()
  if (errors) {
    console.log(errors)
    update.error(errors)
    process.exit(1)
  }
  if (filepath === false) {
    arc = parser(lexer(defaultArc))
  }
  return { arc, filepath }
}
