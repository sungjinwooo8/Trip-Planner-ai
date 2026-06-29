import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check your .env file and ensure you have:')
  console.error('  - VITE_SUPABASE_URL')
  console.error('  - VITE_SUPABASE_ANON_KEY')
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Validate URL format
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
  console.error('❌ Invalid Supabase URL format!')
  console.error('Expected format: https://xxxxx.supabase.co')
  console.error('Current URL:', supabaseUrl)
  throw new Error('Invalid Supabase URL format. Please check VITE_SUPABASE_URL in your .env file.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection on initialization (non-blocking)
if (import.meta.env.DEV) {
  // Use a timeout to detect network errors
  const connectionTest = supabase.from('cities').select('count').limit(0);
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Connection timeout')), 5000)
  );
  
  Promise.race([connectionTest, timeout])
    .then(() => {
      console.log('✅ Supabase connection successful')
    })
    .catch((error) => {
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED') || error.message?.includes('timeout')) {
        console.error('❌ Supabase connection failed: Network error')
        console.error('   This usually means:')
        console.error('   1. Incorrect VITE_SUPABASE_URL in .env file')
        console.error('   2. Supabase project is paused or deleted')
        console.error('   3. Network/DNS connectivity issue')
        console.error('   Current URL:', supabaseUrl)
      } else {
        console.warn('⚠️ Supabase connection test failed:', error.message)
      }
    })
}

