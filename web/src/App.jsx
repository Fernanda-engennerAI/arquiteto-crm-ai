import { lazy, Suspense, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Thread from './components/Thread.jsx';
import Composer from './components/Composer.jsx';
import { api } from './api.js';
import { EXAMPLE_MD } from './content.js';

// Definido na hora do build. Com false, o Vite descarta o painel do pacote final:
// o código do laboratório nem chega ao navegador do usuário final.
const LAB_UI = import.meta.env.VITE_LAB_UI === 'true';
const LabPanel = LAB_UI ? lazy(() => import('./components/LabPanel.jsx')) : null;

let seq = 0;
const msg = (role, content, extra = {}) => ({ id: ++seq, role, content, ...extra });

const initialMessages = () => [msg('example', EXAMPLE_MD)];

export default function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [connected, setConnected] = useState(null);
  const [labOpen, setLabOpen] = useState(LAB_UI && location.hash === '#lab');
  const [labVersion, setLabVersion] = useState('v1');
  const [runSignal, setRunSignal] = useState(0);

  // Estado real do back-end, não presumido pela interface
  useEffect(() => {
    api.health()
      .then((h) => setConnected(Boolean(h.modeloConectado)))
      .catch(() => setConnected(false));
  }, []);

  useEffect(() => {
    if (!LAB_UI) return;
    const onHash = () => setLabOpen(location.hash === '#lab');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const newChat = () => {
    setMessages([]);
    setDraft('');
  };

  // Conversa normal: envia só mensagens reais (usuário e assistente) ao back-end
  const send = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    const userMsg = msg('user', text);
    const base = messages.filter((m) => m.role !== 'example');
    const next = [...base, userMsg];
    setMessages(next);
    setDraft('');
    setBusy(true);
    try {
      const history = next
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map(({ role, content }) => ({ role, content }));
      const data = await api.chat(history);
      setMessages((cur) => [...cur, msg('assistant', data.reply)]);
    } catch (err) {
      setMessages((cur) => [...cur, msg('notice', `Nenhuma resposta foi gerada. ${err.message}`, { code: err.code })]);
    } finally {
      setBusy(false);
    }
  };

  // Red teaming: zera a conversa antes de cada execução
  const runAttack = async ({ token, attackId, version }) => {
    if (busy) return;
    setMessages([msg('user', `Execução isolada de ${attackId}. O texto é enviado pelo servidor.`, { label: `${attackId} · prompt ${version}` })]);
    setBusy(true);
    try {
      const data = await api.lab.run(token, attackId, version);
      setMessages((cur) => [...cur, msg('assistant', data.execucao.resposta)]);
    } catch (err) {
      setMessages((cur) => [...cur, msg('notice', `Nenhuma resposta foi gerada. ${err.message}`, { code: err.code })]);
    } finally {
      setBusy(false);
      setRunSignal((n) => n + 1);
    }
  };

  const labActive = LAB_UI && labOpen;

  return (
    <div className="app">
      <Header connected={connected} labActive={labActive} labVersion={labVersion} onNewChat={newChat} />
      <div className={`main ${labActive ? 'with-lab' : ''}`}>
        <section className="chat">
          <Thread messages={messages} busy={busy} onPickSuggestion={setDraft} />
          <Composer
            value={draft}
            onChange={setDraft}
            onSend={send}
            busy={busy}
            hint={`Enter envia · Shift+Enter quebra linha${connected ? '' : ' · nenhum modelo de IA conectado no back-end'}`}
          />
        </section>
        {labActive && LabPanel && (
          <Suspense fallback={<aside className="lab"><p className="empty">Carregando painel…</p></aside>}>
            <LabPanel
              version={labVersion}
              onVersionChange={setLabVersion}
              onRun={runAttack}
              busy={busy}
              runSignal={runSignal}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
