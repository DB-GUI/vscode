import Base from './pgsql'

export default
class CockroachDBKnexConnection extends Base {
  get driveName() { return 'cockroachdb' }
}