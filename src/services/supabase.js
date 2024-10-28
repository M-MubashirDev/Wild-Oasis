import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rwsncfzvlbaqmukuhwlu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3c25jZnp2bGJhcW11a3Vod2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4OTAxMjUsImV4cCI6MjA0MzQ2NjEyNX0.3LjReNZkhMkkY8JcW_N76z0nWThnx7CazzA123L1KOY";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
