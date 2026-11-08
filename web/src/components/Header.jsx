export default function Header({ connected, labActive, labVersion, onNewChat }) {
  return (
    <header className="bar">
      <div className="mark">
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
          <rect x="1" y="1" width="28" height="28" rx="7" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <path d="M8 21 L15 8 L22 21" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M10.6 16.5 H19.4" stroke="var(--ink)" strokeWidth="1.6" />
          <circle cx="15" cy="8" r="2" fill="var(--ink)" />
          <circle cx="8" cy="21" r="2" fill="var(--ink)" />
          <circle cx="22" cy="21" r="2" fill="var(--ink)" />
        </svg>
        <div>
          <h1>Arquiteto CRM AI</h1>
          <small>Arquitetura de Soluções | Dynamics 365 • Power Platform • Azure</small>
        </div>
      </div>

      {labActive && (
        <span className="chip lab">ambiente de testes · <b>{labVersion}</b></span>
      )}

      <span
        className={`chip status ${connected ? 'on' : ''}`}
        title={connected === null ? 'Verificando o back-end' : connected ? 'Back-end com modelo configurado' : 'Nenhum modelo de IA configurado no back-end'}
      >
        <span className="dot" />
        <span className="txt">
          {connected === null ? 'verificando…' : connected ? 'modelo conectado' : 'modelo não conectado'}
        </span>
      </span>

      <button className="btn" type="button" onClick={onNewChat}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        Nova conversa
      </button>
    </header>
  );
}
