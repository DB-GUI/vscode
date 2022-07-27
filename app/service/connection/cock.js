const Base = require('./pgsql')

module.exports =
class CockroachDBKnexConnection extends Base {
  get driveName() { return 'cockroachdb' }
}