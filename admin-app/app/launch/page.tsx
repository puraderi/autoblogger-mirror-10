'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { launchWebsite } from './actions';

interface GenerationStep {
  step: string;
  status: 'pending' | 'loading' | 'complete';
  data?: any;
}

export default function LaunchPage() {
  const router = useRouter();
  const [websiteName, setWebsiteName] = useState('');
  const [topic, setTopic] = useState('');
  const [hostname, setHostname] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [steps, setSteps] = useState<GenerationStep[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if authenticated
    if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_authenticated')) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setResult(null);

    // Initialize steps
    setSteps([
      { step: 'Om oss', status: 'loading' },
      { step: 'Kontakta oss', status: 'pending' },
      { step: 'Hero-sektion', status: 'pending' },
      { step: 'Färgschema & typsnitt', status: 'pending' },
      { step: 'SEO meta description', status: 'pending' },
      { step: 'Sparar till databas', status: 'pending' }
    ]);

    try {
      const data = await launchWebsite(websiteName, topic, hostname);

      setSteps(prev => prev.map(s => ({ ...s, status: 'complete' as const })));
      setResult(data);

      // If keywords provided, queue blog generation jobs
      if (keywords.trim()) {
        const keywordList = keywords
          .split('\n')
          .map(k => k.trim())
          .filter(k => k.length > 0);

        if (keywordList.length > 0) {
          const { queueBlogJobs } = await import('../generate/actions');
          await queueBlogJobs(data.website_id, keywordList);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod');
      setSteps([]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Skapa ny webbplats</h1>
            <div className="space-x-4">
              <button
                onClick={() => router.push('/generate')}
                className="text-blue-600 hover:underline"
              >
                Generera Inlägg
              </button>
              <button
                onClick={() => router.push('/websites')}
                className="text-blue-600 hover:underline"
              >
                Visa Webbplatser
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="website-name" className="block text-sm font-medium text-gray-700 mb-2">
                Webbplatsnamn
              </label>
              <input
                type="text"
                id="website-name"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                placeholder="ex. Fiskeguiden"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isGenerating}
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Ämne/Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="ex. Fiske och friluftsliv"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isGenerating}
              />
            </div>

            <div>
              <label htmlFor="hostname" className="block text-sm font-medium text-gray-700 mb-2">
                Hostname
              </label>
              <input
                type="text"
                id="hostname"
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
                placeholder="ex. fiskeguiden.se eller localhost:3000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isGenerating}
              />
            </div>

            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                Nyckelord (valfritt) - ett per rad
              </label>
              <textarea
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="bästa kaffebryggare 2025&#10;hur välja rätt laptop&#10;tips för hemmaträning"
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-500 mt-1">
                {keywords ? `${keywords.split('\n').filter(k => k.trim()).length} nyckelord` : 'Lämna tomt för att hoppa över'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {isGenerating ? 'Genererar...' : 'Skapa webbplats'}
            </button>
          </form>

          {/* Progress Steps */}
          {steps.length > 0 && (
            <div className="mt-8 space-y-3">
              <h2 className="text-lg font-semibold mb-4">Framsteg:</h2>
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {step.status === 'complete' && (
                    <span className="text-green-500">✓</span>
                  )}
                  {step.status === 'loading' && (
                    <span className="text-blue-500">⟳</span>
                  )}
                  {step.status === 'pending' && (
                    <span className="text-gray-300">○</span>
                  )}
                  <span className={step.status === 'complete' ? 'text-gray-900' : 'text-gray-500'}>
                    {step.step}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-800 mb-4">✨ Webbplats skapad!</h2>
              <div className="space-y-2 text-sm">
                <p><strong>ID:</strong> {result.website_id}</p>
                <p><strong>Hostname:</strong> {result.hostname}</p>
                <p><strong>Färger:</strong></p>
                <div className="flex gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: result.design.primary_color }}
                    />
                    <span className="text-xs">Primary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: result.design.background_color }}
                    />
                    <span className="text-xs">Background</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: result.design.text_color }}
                    />
                    <span className="text-xs">Text</span>
                  </div>
                </div>
                <p><strong>Typsnitt:</strong> {result.design.font_heading} / {result.design.font_body}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
