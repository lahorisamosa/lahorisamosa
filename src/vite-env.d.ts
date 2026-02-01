/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_PROJECT_ID: string
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_BUSINESS_EMAIL: string
    readonly VITE_BUSINESS_PHONE: string
    readonly VITE_BUSINESS_LOCATION: string
    readonly VITE_EMAIL_API_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
