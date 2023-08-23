import { Config_connection_simple } from '@/main/state/oo'

export
interface Config_connection_mysql extends Config_connection_simple {
  database?: string
}
