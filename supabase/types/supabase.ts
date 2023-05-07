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
      AlertCertainty: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      AlertEvent: {
        Row: {
          code: string
          id: string
          name: string
        }
        Insert: {
          code: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
        }
      }
      AlertPollHistory: {
        Row: {
          active: number
          ended: number
          id: string
          results: number
          updated_at: string
        }
        Insert: {
          active?: number
          ended?: number
          id?: string
          results?: number
          updated_at?: string
        }
        Update: {
          active?: number
          ended?: number
          id?: string
          results?: number
          updated_at?: string
        }
      }
      Alerts: {
        Row: {
          active: boolean
          areaDesc: string
          certainty: string
          created_at: string
          description: string
          effective: string
          ends: string | null
          event: string
          expires: string
          geometry: Json
          headline: string
          id: string
          instruction: string | null
          NWSID: string
          onset: string
          original: Json
          response: string
          senderName: string
          sent: string
          severity: string
          status: string
          type: string
          updated_at: string
          urgency: string
        }
        Insert: {
          active?: boolean
          areaDesc: string
          certainty: string
          created_at?: string
          description: string
          effective?: string
          ends?: string | null
          event: string
          expires: string
          geometry: Json
          headline: string
          id?: string
          instruction?: string | null
          NWSID: string
          onset: string
          original: Json
          response: string
          senderName: string
          sent?: string
          severity: string
          status: string
          type: string
          updated_at?: string
          urgency: string
        }
        Update: {
          active?: boolean
          areaDesc?: string
          certainty?: string
          created_at?: string
          description?: string
          effective?: string
          ends?: string | null
          event?: string
          expires?: string
          geometry?: Json
          headline?: string
          id?: string
          instruction?: string | null
          NWSID?: string
          onset?: string
          original?: Json
          response?: string
          senderName?: string
          sent?: string
          severity?: string
          status?: string
          type?: string
          updated_at?: string
          urgency?: string
        }
      }
      AlertSeverity: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      AlertStatus: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      AlertType: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      AlertUrgency: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
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
