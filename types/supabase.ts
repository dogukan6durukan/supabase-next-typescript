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
      codes: {
        Row: {
          id: number
          created_at: string | null
          title: string | null
          description : string | null
          author : string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          title?: string | null
          description : string | null
          author : string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          title?: string | null
          description? : string | null
          author? : string | null
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
  }
}
