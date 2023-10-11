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
      accounts: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          oauth_token: string | null
          oauth_token_secret: string | null
          provider: Database["public"]["Enums"]["Provider"]
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider: Database["public"]["Enums"]["Provider"]
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider?: Database["public"]["Enums"]["Provider"]
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          createdAt: string
          expires: string
          id: string
          sessionToken: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          expires: string
          id: string
          sessionToken: string
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          expires?: string
          id?: string
          sessionToken?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          artistName: string | null
          createdAt: string
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          isArtist: boolean
          name: string | null
          password: string | null
          updatedAt: string
        }
        Insert: {
          artistName?: string | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          isArtist?: boolean
          name?: string | null
          password?: string | null
          updatedAt: string
        }
        Update: {
          artistName?: string | null
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          isArtist?: boolean
          name?: string | null
          password?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      verificationtokens: {
        Row: {
          createdAt: string
          expires: string
          id: string
          identifier: string
          token: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          expires: string
          id: string
          identifier: string
          token: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          expires?: string
          id?: string
          identifier?: string
          token?: string
          updatedAt?: string
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
      Provider: "google" | "credentials"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
