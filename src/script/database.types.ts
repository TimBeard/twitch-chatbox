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
            tokens: {
                Row: {
                    accessToken: string
                    created_at: string
                    expiresIn: number | null
                    id: number
                    obtainmentTimestamp: number
                    refreshToken: string | null
                    scope: Json
                }
                Insert: {
                    accessToken: string
                    created_at?: string
                    expiresIn?: number | null
                    id?: number
                    obtainmentTimestamp: number
                    refreshToken?: string | null
                    scope: Json
                }
                Update: {
                    accessToken?: string
                    created_at?: string
                    expiresIn?: number | null
                    id?: number
                    obtainmentTimestamp?: number
                    refreshToken?: string | null
                    scope?: Json
                }
                Relationships: []
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
