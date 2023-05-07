export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
      }
      AlertActions: {
        Row: {
          code: string
          id: string
          name: string
        }
        Insert: {
          code: string
          id: string
          name: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
        }
      }
      AlertClass: {
        Row: {
          code: string
          id: string
          name: string
        }
        Insert: {
          code: string
          id: string
          name: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
        }
      }
      AlertHistory: {
        Row: {
          alertID: string
          created_at: string
          eas: boolean
          emergency: boolean
          end: string | null
          expires: string | null
          geometry: Json | null
          hazard: string | null
          headlines: Json | null
          id: string
          impact: string | null
          issued: string
          pds: boolean
          ppa: string | null
          source: string | null
          start: string
          text: string
          tml: string | null
          ugc: string
          updated_at: string
          vtec: string
          vtecAction: string
          vtecEventNumber: number
          vtecPhenomena: string
          vtecProductClass: string
          vtecSignificance: string
          vtecWFO: string
          wmoHeader: string
        }
        Insert: {
          alertID: string
          created_at?: string
          eas?: boolean
          emergency?: boolean
          end?: string | null
          expires?: string | null
          geometry?: Json | null
          hazard?: string | null
          headlines?: Json | null
          id: string
          impact?: string | null
          issued?: string
          pds?: boolean
          ppa?: string | null
          source?: string | null
          start?: string
          text: string
          tml?: string | null
          ugc: string
          updated_at?: string
          vtec: string
          vtecAction: string
          vtecEventNumber: number
          vtecPhenomena: string
          vtecProductClass: string
          vtecSignificance: string
          vtecWFO: string
          wmoHeader: string
        }
        Update: {
          alertID?: string
          created_at?: string
          eas?: boolean
          emergency?: boolean
          end?: string | null
          expires?: string | null
          geometry?: Json | null
          hazard?: string | null
          headlines?: Json | null
          id?: string
          impact?: string | null
          issued?: string
          pds?: boolean
          ppa?: string | null
          source?: string | null
          start?: string
          text?: string
          tml?: string | null
          ugc?: string
          updated_at?: string
          vtec?: string
          vtecAction?: string
          vtecEventNumber?: number
          vtecPhenomena?: string
          vtecProductClass?: string
          vtecSignificance?: string
          vtecWFO?: string
          wmoHeader?: string
        }
      }
      AlertPhenomena: {
        Row: {
          code: string
          id: string
          name: string
        }
        Insert: {
          code: string
          id: string
          name: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
        }
      }
      Alerts: {
        Row: {
          awips: string
          created_at: string
          id: string
          updated_at: string
          vtec: string
          vtecAction: string
          vtecEventNumber: number
          vtecPhenomena: string
          vtecProductClass: string
          vtecSignificance: string
          vtecWFO: string
        }
        Insert: {
          awips: string
          created_at?: string
          id: string
          updated_at?: string
          vtec: string
          vtecAction: string
          vtecEventNumber: number
          vtecPhenomena: string
          vtecProductClass: string
          vtecSignificance: string
          vtecWFO: string
        }
        Update: {
          awips?: string
          created_at?: string
          id?: string
          updated_at?: string
          vtec?: string
          vtecAction?: string
          vtecEventNumber?: number
          vtecPhenomena?: string
          vtecProductClass?: string
          vtecSignificance?: string
          vtecWFO?: string
        }
      }
      AlertSignificance: {
        Row: {
          code: string
          id: string
          name: string
        }
        Insert: {
          code: string
          id: string
          name: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
        }
      }
      CountyFIPS: {
        Row: {
          id: string
          name: string
          number: number
          numRaw: string
          state: string
          stateNum: number
        }
        Insert: {
          id: string
          name: string
          number: number
          numRaw: string
          state: string
          stateNum: number
        }
        Update: {
          id?: string
          name?: string
          number?: number
          numRaw?: string
          state?: string
          stateNum?: number
        }
      }
      StateFIPS: {
        Row: {
          abbreviation: string
          id: number
          name: string
        }
        Insert: {
          abbreviation: string
          id?: number
          name: string
        }
        Update: {
          abbreviation?: string
          id?: number
          name?: string
        }
      }
      WFOData: {
        Row: {
          code: string
          id: string
          name: string
          state: string
        }
        Insert: {
          code: string
          id?: string
          name: string
          state: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
          state?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vdktwffemhxhcaxtyvks.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
