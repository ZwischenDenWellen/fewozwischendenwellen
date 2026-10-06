import { useState } from 'react';
import { X, Github, Copy, Check, Terminal, ExternalLink, Globe, Sparkles } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubPagesModal({ isOpen, onClose }: GitHubPagesModalProps) {
  const [copiedAction, setCopiedAction] = useState(false);
  const [copiedVite, setCopiedVite] = useState(false);

  if (!isOpen) return null;

  const githubActionYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const viteConfigSnippet = `// in vite.config.ts
export default defineConfig({
  // Für GitHub Pages: './' verwenden oder '/<repository-name>/'
  base: './', 
  plugins: [react(), tailwindcss()],
  // ...
});`;

  const copyToClipboard = (text: string, type: 'action' | 'vite') => {
    navigator.clipboard.writeText(text);
    if (type === 'action') {
      setCopiedAction(true);
      setTimeout(() => setCopiedAction(false), 2500);
    } else {
      setCopiedVite(true);
      setTimeout(() => setCopiedVite(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl">
                Anleitung: Bereitstellung auf GitHub Pages
              </h3>
              <p className="text-xs text-stone-300">
                100% kostenlos hosten, keine Serverkosten, blitzschnell & mit iCal-Sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-stone-700">
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-amber-950">
              <strong>Perfekt für GitHub Pages konzipiert:</strong> Diese Ferienwohnung-Website ist als reine Single-Page-Application (SPA) gebaut. Sie benötigt <strong>keinen separaten Backend-Server</strong>. Der Belegungskalender, die iCal-Synchronisation (RFC 5545), Preisberechnungen und die Buchungsanfragen funktionieren vollständig im Browser des Besuchers!
            </div>
          </div>

          {/* 4 Steps Guide */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-stone-900">
              In 4 einfachen Schritten online bringen:
            </h4>

            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-xs sm:text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center shrink-0">1</span>
                <span>Code in ein GitHub Repository pushen</span>
              </div>
              <p className="text-xs text-stone-600 pl-8">
                Erstellen Sie auf <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-semibold">GitHub ein neues Repository</a> (z.B. <code className="bg-stone-200 px-1 py-0.5 rounded">ferienwohnung-meerblick</code>) und laden Sie dieses Projekt hoch:
              </p>
              <div className="ml-8 p-3 rounded-lg bg-stone-900 text-stone-200 font-mono text-2xs space-y-1">
                <div>git init</div>
                <div>git add .</div>
                <div>git commit -m "Initial holiday apartment website with iCal sync"</div>
                <div>git branch -M main</div>
                <div>git remote add origin https://github.com/IHR-NAME/IHR-REPO.git</div>
                <div>git push -u origin main</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-stone-900 text-xs sm:text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center shrink-0">2</span>
                  <span>Vite Pfad für GitHub Pages (<code className="font-mono text-xs">base: './'</code>)</span>
                </div>
                <button
                  onClick={() => copyToClipboard(viteConfigSnippet, 'vite')}
                  className="flex items-center gap-1 text-2xs font-semibold text-amber-800 hover:underline"
                >
                  {copiedVite ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedVite ? 'Kopiert' : 'Kopieren'}</span>
                </button>
              </div>
              <p className="text-xs text-stone-600 pl-8">
                In der Datei <code className="bg-stone-200 px-1 py-0.5 rounded">vite.config.ts</code> wird die relative Base-URL gesetzt, damit Styles und Skripte auf <code className="text-stone-800">https://username.github.io/repo/</code> problemlos geladen werden:
              </p>
              <div className="ml-8 p-3 rounded-lg bg-stone-900 text-emerald-400 font-mono text-2xs">
                base: './',
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-stone-900 text-xs sm:text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center shrink-0">3</span>
                  <span>Automatisches Deployment via GitHub Actions</span>
                </div>
                <button
                  onClick={() => copyToClipboard(githubActionYaml, 'action')}
                  className="flex items-center gap-1 text-2xs font-semibold text-amber-800 hover:underline"
                >
                  {copiedAction ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAction ? 'Workflow kopiert!' : 'Workflow kopieren'}</span>
                </button>
              </div>
              <p className="text-xs text-stone-600 pl-8">
                Legen Sie in Ihrem Repository die Datei <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">.github/workflows/deploy.yml</code> an und fügen Sie diesen Workflow ein:
              </p>
              <div className="ml-8">
                <textarea
                  readOnly
                  rows={6}
                  value={githubActionYaml}
                  className="w-full text-2xs font-mono p-3 bg-stone-900 text-stone-200 rounded-lg focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-xs sm:text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center shrink-0">4</span>
                <span>GitHub Pages aktivieren</span>
              </div>
              <p className="text-xs text-stone-600 pl-8 leading-relaxed">
                Gehen Sie in Ihrem GitHub Repository auf <strong>Settings &rarr; Pages</strong>.<br />
                Wählen Sie unter <strong>Build and deployment &rarr; Source</strong> die Option <span className="font-semibold text-stone-900 bg-stone-200 px-1.5 py-0.5 rounded">GitHub Actions</span> aus.<br />
                Sobald Sie Code pushen, wird die Seite in ca. 30 Sekunden gebaut und unter Ihrer persönlichen GitHub Pages URL veröffentlicht!
              </p>
            </div>
          </div>

          {/* Custom Domain note */}
          <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1 text-xs">
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-800" />
              Eigene Wunsch-Domain (z.B. www.ferienwohnung-zingst-ostsee.de)?
            </div>
            <p className="text-stone-600">
              Sie können in GitHub Pages ganz einfach eine eigene Domain hinterlegen (mit automatischem kostenlosem SSL-Zertifikat von GitHub / Let's Encrypt).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
          >
            Verstanden & Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
