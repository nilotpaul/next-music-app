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
        Relationships: []
      }
      accounts: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          oauth_token: string | null
          oauth_token_secret: string | null
          provider: string
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
          provider: string
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
          provider?: string
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
      public: {
        Row: {
          artist: string | null
          created_at: string
          id: number
          song: string | null
        }
        Insert: {
          artist?: string | null
          created_at?: string
          id?: number
          song?: string | null
        }
        Update: {
          artist?: string | null
          created_at?: string
          id?: number
          song?: string | null
        }
        Relationships: []
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
      test: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          createdAt: string
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
          password: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          name?: string | null
          password?: string | null
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
