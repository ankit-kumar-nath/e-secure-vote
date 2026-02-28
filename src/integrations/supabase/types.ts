export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      candidates: {
        Row: {
          bio: string | null
          created_at: string
          election_id: string
          full_name: string
          id: string
          party_id: string | null
          photo_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          election_id: string
          full_name: string
          id?: string
          party_id?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          election_id?: string
          full_name?: string
          id?: string
          party_id?: string | null
          photo_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "election_results_summary"
            referencedColumns: ["election_id"]
          },
          {
            foreignKeyName: "candidates_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      election_voter_log: {
        Row: {
          election_id: string
          id: string
          voted_at: string
          voter_id: string
        }
        Insert: {
          election_id: string
          id?: string
          voted_at?: string
          voter_id: string
        }
        Update: {
          election_id?: string
          id?: string
          voted_at?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "election_voter_log_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "election_results_summary"
            referencedColumns: ["election_id"]
          },
          {
            foreignKeyName: "election_voter_log_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      elections: {
        Row: {
          constituency: string | null
          created_at: string
          description: string | null
          end_date: string
          id: string
          name: string
          start_date: string
          status: Database["public"]["Enums"]["election_status"]
          updated_at: string
        }
        Insert: {
          constituency?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          name: string
          start_date: string
          status?: Database["public"]["Enums"]["election_status"]
          updated_at?: string
        }
        Update: {
          constituency?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["election_status"]
          updated_at?: string
        }
        Relationships: []
      }
      parties: {
        Row: {
          abbreviation: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          symbol_url: string | null
          updated_at: string
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          symbol_url?: string | null
          updated_at?: string
        }
        Update: {
          abbreviation?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          symbol_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          aadhaar_number: string | null
          constituency: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          aadhaar_number?: string | null
          constituency?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          aadhaar_number?: string | null
          constituency?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          candidate_id: string
          cast_at: string
          election_id: string
          id: string
          vote_hash: string
          voter_id: string
        }
        Insert: {
          candidate_id: string
          cast_at?: string
          election_id: string
          id?: string
          vote_hash: string
          voter_id: string
        }
        Update: {
          candidate_id?: string
          cast_at?: string
          election_id?: string
          id?: string
          vote_hash?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "election_results_summary"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "votes_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "election_results_summary"
            referencedColumns: ["election_id"]
          },
          {
            foreignKeyName: "votes_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      election_results_summary: {
        Row: {
          candidate_id: string | null
          candidate_name: string | null
          election_id: string | null
          election_name: string | null
          party_name: string | null
          vote_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_voted: {
        Args: { _election_id: string; _user_id: string }
        Returns: boolean
      }
      is_admin_or_official: { Args: { _user_id: string }; Returns: boolean }
      is_election_active: { Args: { _election_id: string }; Returns: boolean }
      is_profile_verified: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "election_official" | "voter"
      election_status: "upcoming" | "active" | "completed" | "cancelled"
      verification_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "election_official", "voter"],
      election_status: ["upcoming", "active", "completed", "cancelled"],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
