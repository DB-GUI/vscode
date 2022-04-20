import Connection from './index.js'

export default function PostgresqlConnection(onSelect) {
  return new Connection('PostgreSQL', 'postgresql', onSelect, [
    
  ])
}