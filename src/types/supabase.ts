export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string
          make_id: string
          model_id: string
          year: number
          price: number
          mileage: number
          location: string
          description: string
          specs: Json
          features: string[]
          created_at: string
          updated_at: string
          user_id: string
          status: 'draft' | 'published' | 'sold' | 'archived'
        }
        Insert: {
          id?: string
          make_id: string
          model_id: string
          year: number
          price: number
          mileage: number
          location: string
          description: string
          specs?: Json
          features?: string[]
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: 'draft' | 'published' | 'sold' | 'archived'
        }
        Update: {
          id?: string
          make_id?: string
          model_id?: string
          year?: number
          price?: number
          mileage?: number
          location?: string
          description?: string
          specs?: Json
          features?: string[]
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: 'draft' | 'published' | 'sold' | 'archived'
        }
      }
      car_images: {
        Row: {
          id: string
          car_id: string
          url: string
          is_primary: boolean
          created_at: string
          storage_path: string
        }
        Insert: {
          id?: string
          car_id: string
          url: string
          is_primary?: boolean
          created_at?: string
          storage_path: string
        }
        Update: {
          id?: string
          car_id?: string
          url?: string
          is_primary?: boolean
          created_at?: string
          storage_path?: string
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