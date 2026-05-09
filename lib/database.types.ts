export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type WorkspacePlan = "free" | "pro" | "team" | "enterprise";
export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";
export type RouteStatus = "success" | "fallback" | "manual" | "error";
export type ProviderKeyStatus = "connected" | "degraded" | "missing" | "fallback";
export type AssetKind = "file" | "image" | "pdf" | "prompt_template" | "route_replay" | "share_export";

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          plan: WorkspacePlan;
          monthly_route_limit: number;
          monthly_budget_cents: number;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          plan?: WorkspacePlan;
          monthly_route_limit?: number;
          monthly_budget_cents?: number;
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["workspaces"]["Insert"]>;
        Relationships: [];
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          email: string;
          display_name: string | null;
          role: WorkspaceRole;
          joined_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          email: string;
          display_name?: string | null;
          role?: WorkspaceRole;
          joined_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["workspace_members"]["Insert"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          description: string | null;
          sensitivity: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          description?: string | null;
          sensitivity?: string;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };
      chats: {
        Row: {
          id: string;
          workspace_id: string;
          project_id: string | null;
          title: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          project_id?: string | null;
          title: string;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chats"]["Insert"]>;
        Relationships: [];
      };
      chat_messages: {
        Row: {
          id: string;
          workspace_id: string;
          chat_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          model_id: string | null;
          token_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          chat_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          model_id?: string | null;
          token_count?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chat_messages"]["Insert"]>;
        Relationships: [];
      };
      workspace_assets: {
        Row: {
          id: string;
          workspace_id: string;
          project_id: string | null;
          chat_id: string | null;
          name: string;
          kind: AssetKind;
          storage_path: string | null;
          mime_type: string | null;
          size_bytes: number;
          metadata: Json;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          project_id?: string | null;
          chat_id?: string | null;
          name: string;
          kind: AssetKind;
          storage_path?: string | null;
          mime_type?: string | null;
          size_bytes?: number;
          metadata?: Json;
          created_by: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["workspace_assets"]["Insert"]>;
        Relationships: [];
      };
      provider_keys: {
        Row: {
          id: string;
          workspace_id: string;
          provider: string;
          encrypted_key: string;
          key_hint: string | null;
          status: ProviderKeyStatus;
          last_tested_at: string | null;
          rotation_due_at: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          provider: string;
          encrypted_key: string;
          key_hint?: string | null;
          status?: ProviderKeyStatus;
          last_tested_at?: string | null;
          rotation_due_at?: string | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["provider_keys"]["Insert"]>;
        Relationships: [];
      };
      routing_decisions: {
        Row: {
          id: string;
          workspace_id: string;
          project_id: string | null;
          chat_id: string | null;
          user_id: string;
          query: string;
          intent: string;
          mode: string;
          selected_model: string;
          selected_provider: string;
          fallback_model: string | null;
          confidence: number;
          estimated_cost_cents: number;
          estimated_latency_ms: number;
          expected_savings_percent: number;
          status: RouteStatus;
          trace: Json;
          candidates: Json;
          policy_checks: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          project_id?: string | null;
          chat_id?: string | null;
          user_id: string;
          query: string;
          intent: string;
          mode: string;
          selected_model: string;
          selected_provider: string;
          fallback_model?: string | null;
          confidence?: number;
          estimated_cost_cents?: number;
          estimated_latency_ms?: number;
          expected_savings_percent?: number;
          status?: RouteStatus;
          trace?: Json;
          candidates?: Json;
          policy_checks?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["routing_decisions"]["Insert"]>;
        Relationships: [];
      };
      usage_events: {
        Row: {
          id: string;
          workspace_id: string;
          route_id: string | null;
          user_id: string;
          provider: string;
          model: string;
          input_tokens: number;
          output_tokens: number;
          cost_cents: number;
          latency_ms: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          route_id?: string | null;
          user_id: string;
          provider: string;
          model: string;
          input_tokens?: number;
          output_tokens?: number;
          cost_cents?: number;
          latency_ms?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["usage_events"]["Insert"]>;
        Relationships: [];
      };
      audit_events: {
        Row: {
          id: string;
          workspace_id: string;
          actor_id: string;
          action: string;
          entity_type: string;
          entity_id: string | null;
          risk: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          actor_id: string;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          risk?: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audit_events"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      workspace_plan: WorkspacePlan;
      workspace_role: WorkspaceRole;
      route_status: RouteStatus;
      provider_key_status: ProviderKeyStatus;
      asset_kind: AssetKind;
    };
    CompositeTypes: Record<string, never>;
  };
};
