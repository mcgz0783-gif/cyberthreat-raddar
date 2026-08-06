import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  const tables = ['books', 'orders', 'payments', 'purchases', 'agent_logs'];
  
  for (const table of tables) {
    const { data, error, count } = await supabase.from(table).select('*', { count: 'exact', head: false }).limit(3);
    if (error) {
      console.log(`Note: ${table} table not found or not accessible yet (Error: ${error.message}).`);
    } else {
      console.log(`Successfully accessed ${table} table! Count: ${count}, Sample:`, data);
    }
  }

  console.log('Supabase connection test completed.');
}

testConnection();
