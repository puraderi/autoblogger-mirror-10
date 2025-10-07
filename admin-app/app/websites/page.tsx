'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getWebsites, deleteWebsite } from './actions';

interface Website {
  id: string;
  host_name: string;
  website_name: string;
  topic: string;
  primary_color: string;
  background_color: string;
  text_color: string;
  font_heading: string;
  font_body: string;
  created_at: string;
}

export default function WebsitesPage() {
  const router = useRouter();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if authenticated
    if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_authenticated')) {
      router.push('/');
      return;
    }

    loadWebsites();
  }, [router]);

  const loadWebsites = async () => {
    setLoading(true);
    const data = await getWebsites();
    setWebsites(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, websiteName: string) => {
    if (!confirm(`Är du säker på att du vill ta bort "${websiteName}"?`)) {
      return;
    }

    const success = await deleteWebsite(id);
    if (success) {
      setWebsites(websites.filter(w => w.id !== id));
    } else {
      alert('Kunde inte ta bort webbplats');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Laddar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Alla webbplatser ({websites.length})</h1>
            <div className="space-x-3">
              <button
                onClick={() => router.push('/generate')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Generera Inlägg
              </button>
              <button
                onClick={() => router.push('/launch')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Skapa Webbplats
              </button>
            </div>
          </div>

          {websites.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Inga webbplatser ännu.</p>
              <button
                onClick={() => router.push('/launch')}
                className="mt-4 text-blue-600 hover:underline"
              >
                Skapa din första webbplats →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((website) => (
                <div
                  key={website.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{website.website_name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{website.topic}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <p className="font-medium">Hostname:</p>
                    <p className="text-gray-600 font-mono text-xs">{website.host_name}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Färger:</p>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: website.primary_color }}
                        title={`Primary: ${website.primary_color}`}
                      />
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: website.background_color }}
                        title={`Background: ${website.background_color}`}
                      />
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: website.text_color }}
                        title={`Text: ${website.text_color}`}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Typsnitt:</p>
                    <p className="text-xs text-gray-600">
                      {website.font_heading} / {website.font_body}
                    </p>
                  </div>

                  <div className="text-xs text-gray-400 mb-4">
                    {new Date(website.created_at).toLocaleDateString('sv-SE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`http://${website.host_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      Visa →
                    </a>
                    <button
                      onClick={() => handleDelete(website.id, website.website_name)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      Ta bort
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
