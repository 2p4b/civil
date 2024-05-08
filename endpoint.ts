import { createClient } from '@supabase/supabase-js'
export const url = 'https://rnevjyzqzetyrajrbzuv.supabase.co'
export const key = process.env.EXPO_PUBLIC_SUPABASE_KEY
export default createClient(url, key)
