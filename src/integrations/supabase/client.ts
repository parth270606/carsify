
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vuahbfyzasikyholtvwd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1YWhiZnl6YXNpa3lob2x0dndkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODUwMjEsImV4cCI6MjA1NTM2MTAyMX0.Np9kxInyRWfQP8ZsWtg-6FPzPirrIGfGg4k6rvx0ovc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
