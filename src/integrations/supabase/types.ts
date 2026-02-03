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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      amenities: {
        Row: {
          category: string | null
          created_at: string
          icon: string
          id: string
          name: string
          name_fr: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          icon?: string
          id?: string
          name: string
          name_fr?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          icon?: string
          id?: string
          name?: string
          name_fr?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          approved: boolean | null
          article_id: string
          author_email: string
          author_name: string
          content: string
          created_at: string
          id: string
        }
        Insert: {
          approved?: boolean | null
          article_id: string
          author_email: string
          author_name: string
          content: string
          created_at?: string
          id?: string
        }
        Update: {
          approved?: boolean | null
          article_id?: string
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "news_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          category: string
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          description_fr: string | null
          duration: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          images: string[] | null
          location: string | null
          price: number | null
          price_type: string | null
          published: boolean | null
          title: string
          title_fr: string | null
          updated_at: string
        }
        Insert: {
          category?: string
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          description_fr?: string | null
          duration?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          price?: number | null
          price_type?: string | null
          published?: boolean | null
          title: string
          title_fr?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          description_fr?: string | null
          duration?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          price?: number | null
          price_type?: string | null
          published?: boolean | null
          title?: string
          title_fr?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          property_id: string | null
          read_at: string | null
          replied_at: string | null
          reply_message: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          property_id?: string | null
          read_at?: string | null
          replied_at?: string | null
          reply_message?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          property_id?: string | null
          read_at?: string | null
          replied_at?: string | null
          reply_message?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          content: string
          content_fr: string | null
          created_at: string
          excerpt: string | null
          excerpt_fr: string | null
          id: string
          image_url: string | null
          published: boolean | null
          title: string
          title_fr: string | null
          updated_at: string
        }
        Insert: {
          content: string
          content_fr?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_fr?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          title: string
          title_fr?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          content_fr?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_fr?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          title?: string
          title_fr?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          bedrooms: number
          city: string
          country: string
          created_at: string
          daily_price: number | null
          description: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          images: string[] | null
          latitude: number | null
          location: string
          longitude: number | null
          monthly_price: number | null
          price: number
          property_type: Database["public"]["Enums"]["property_type"]
          size_sqm: number | null
          status: Database["public"]["Enums"]["property_status"]
          title: string
          updated_at: string
          weekly_price: number | null
        }
        Insert: {
          address?: string | null
          bedrooms?: number
          city: string
          country?: string
          created_at?: string
          daily_price?: number | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          location: string
          longitude?: number | null
          monthly_price?: number | null
          price: number
          property_type?: Database["public"]["Enums"]["property_type"]
          size_sqm?: number | null
          status: Database["public"]["Enums"]["property_status"]
          title: string
          updated_at?: string
          weekly_price?: number | null
        }
        Update: {
          address?: string | null
          bedrooms?: number
          city?: string
          country?: string
          created_at?: string
          daily_price?: number | null
          description?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          monthly_price?: number | null
          price?: number
          property_type?: Database["public"]["Enums"]["property_type"]
          size_sqm?: number | null
          status?: Database["public"]["Enums"]["property_status"]
          title?: string
          updated_at?: string
          weekly_price?: number | null
        }
        Relationships: []
      }
      property_amenities: {
        Row: {
          amenity_id: string
          id: string
          property_id: string
        }
        Insert: {
          amenity_id: string
          id?: string
          property_id: string
        }
        Update: {
          amenity_id?: string
          id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_views: {
        Row: {
          id: string
          ip_address: string | null
          property_id: string | null
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          ip_address?: string | null
          property_id?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          ip_address?: string | null
          property_id?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
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
          role?: Database["public"]["Enums"]["app_role"]
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "assistant"
      property_status: "for_rent" | "for_sale"
      property_type:
        | "apartment_rent"
        | "apartment_sale"
        | "penthouse_rent"
        | "penthouse_sale"
        | "villa_rent"
        | "villa_sale"
        | "riad_rent"
        | "riad_sale"
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
      app_role: ["admin", "user", "assistant"],
      property_status: ["for_rent", "for_sale"],
      property_type: [
        "apartment_rent",
        "apartment_sale",
        "penthouse_rent",
        "penthouse_sale",
        "villa_rent",
        "villa_sale",
        "riad_rent",
        "riad_sale",
      ],
    },
  },
} as const
