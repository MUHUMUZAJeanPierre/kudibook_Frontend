import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
// dotenv.config();

// const supabaseUrl=process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey=process.env.REACT_APP_ANON_KEY;

const supabaseUrl = "https://smggamayhaydgpwxwont.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZ2dhbWF5aGF5ZGdwd3h3b250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDkyMjcsImV4cCI6MjA0OTQyNTIyN30.ZGdcvnE_TReYzfcNXlN8z8p2Nn6ybo5ljpqpve6lGSQ"

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase configuration error: Missing REACT_APP_SUPABASE_URL or REACT_APP_ANON_KEY. Please check your environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
