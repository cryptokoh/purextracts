/**
 * Supabase Client Configuration
 * Pure Extracts TX - Course Platform
 *
 * Uses Supabase CDN (loaded in HTML <head>) with lazy singleton pattern.
 * Set your project URL and anon key below.
 */

const SUPABASE_URL = 'https://uqyfsqenjakqyzixfcta.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

let _supabase = null;

function getSupabase() {
    if (!_supabase) {
        if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
            throw new Error('Supabase JS library not loaded. Include the CDN script before this file.');
        }
        _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        });
    }
    return _supabase;
}
