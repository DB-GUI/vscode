import { Simple_connection_config } from '@/main/state/oo'

export
interface Mysql_connection_config extends Simple_connection_config {
  database?: string
}
