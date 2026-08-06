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
  
  // Test 1: Fetch books (existing table)
  const { data: books, error: booksError } = await supabase.from('books').select('id, title').limit(5);

  if (booksError) {
    console.error('Error fetching books:', booksError.message);
  } else {
    console.log('Successfully fetched books:', books.length);
  }

  // Test 2: Try to fetch agent_logs (new table - might fail if not applied)
  const { data: logs, error: logsError } = await supabase.from('agent_logs').select('id').limit(1);

  if (logsError) {
    console.log('Note: agent_logs table not found or not accessible yet (expected if migration not applied).');
  } else {
    console.log('Successfully accessed agent_logs table!');
  }

  console.log('Supabase connection test completed.');
}

testConnection();
