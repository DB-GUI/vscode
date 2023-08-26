import { Connection_config } from '@/main/state/oo'

export
interface Mysql_connection_config extends Connection_config {
  database?: string
}
