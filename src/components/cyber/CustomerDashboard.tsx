import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CustomerDashboard() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchases() {
      // Assuming a session/user context is available
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('purchases')
        .select('*, books(*)')
        .eq('user_id', user.id);

      if (!error && data) setPurchases(data);
      setLoading(false);
    }
    fetchPurchases();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      {loading ? (
        <p>Loading your books...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchased Books</CardTitle>
            </CardHeader>
            <CardContent>
              {purchases.length === 0 ? (
                <p>No books purchased yet.</p>
              ) : (
                <ul className="space-y-4">
                  {purchases.map((p) => (
                    <li key={p.id} className="flex justify-between items-center">
                      <span>{p.books.title}</span>
                      <a href={p.books.download_url} className="text-primary hover:underline">Download</a>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
