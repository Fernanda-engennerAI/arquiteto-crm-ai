import { useCallback, useEffect, useState } from 'react';
import { api } from '../api.js';

// Painel de red teaming. Só é incluído no build quando VITE_LAB_UI=true.
// O token fica apenas na memória da aba: some ao recarregar a página.
export default function LabPanel({ version, onVersionChange, onRun, busy, runSignal }) {
  const [token, setToken] = useState('');
  const [attacks, setAttacks] = useState([]);
  const [attackId, setAttackId] = useState('ATK-01');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const [a, r] = await Promise.all([api.lab.attacks(token), api.lab.results(token)]);
      setAttacks(a.ataques);
      setResults(r.execucoes);
      setError(null);
    } catch (err) {
      setAttacks([]);
      setResults([]);
      setError(`${err.message} (${err.code})`);
    }
  }, [token]);

  // Recarrega a lista depois de cada execução
  useEffect(() => { load(); }, [load, runSignal]);

  const selected = attacks.find((a) => a.id === attackId);

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* navegador recusou acesso à área de transferência */ }
  };

  return (
    <aside className="lab">
      <div>
        <h2>Red teaming</h2>
        <p className="sub">Cada execução abre uma sessão nova, sem histórico. O texto do ataque vem do servidor, não desta tela.</p>
      </div>

      <div className="field">
        <label htmlFor="lab-token">Token do laboratório</label>
        <input
          id="lab-token"
          type="password"
          autoComplete="off"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onBlur={load}
          placeholder="Valor de LAB_TOKEN em server/.env"
        />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="lab-version">Prompt</label>
          <select id="lab-version" value={version} onChange={(e) => onVersionChange(e.target.value)}>
            <option value="v1">v1</option>
            <option value="v2">v2</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="lab-attack">Ataque</label>
          <select id="lab-attack" value={attackId} onChange={(e) => setAttackId(e.target.value)}>
            {(attacks.length ? attacks.map((a) => a.id) : ['ATK-01', 'ATK-02', 'ATK-03', 'ATK-04', 'ATK-05', 'ATK-06', 'ATK-07', 'ATK-08']).map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <span className="label">Texto do ataque (somente leitura)</span>
        <div className="attack-text">
          {!token && 'Informe o token para carregar os ataques.'}
          {token && selected && !selected.preenchido && 'Texto original ainda não colado em redteam/attacks.json.'}
          {token && selected?.preenchido && selected.texto}
        </div>
        {token && selected?.preenchido && (
          <span className={`st ${selected.integro ? 'ok' : ''}`}>
            {selected.integro ? 'íntegro · confere com a trava' : selected.travado ? 'alterado · execução bloqueada' : 'sem trava · rode npm run redteam:lock'}
          </span>
        )}
      </div>

      {error && <p className="lab-error">{error}</p>}

      <button
        className="btn primary"
        type="button"
        disabled={busy || !token}
        onClick={() => onRun({ token, attackId, version })}
      >
        Executar em sessão isolada
      </button>

      <div className="log">
        <div className="log-head">
          <h3>Registro de execuções</h3>
          <span>
            {copied && <span className="copied">copiado </span>}
            <button className="btn small" type="button" onClick={copyJson} disabled={!results.length}>Copiar JSON</button>
          </span>
        </div>
        <div className="logtbl">
          {results.length === 0 ? (
            <p className="empty">Nenhuma execução registrada. Cada linha guarda ataque, versão do prompt, horário e resposta obtida.</p>
          ) : (
            <table>
              <thead>
                <tr><th>Ataque</th><th>Prompt</th><th>Horário</th><th>Resposta</th></tr>
              </thead>
              <tbody>
                {results.slice().reverse().map((r) => (
                  <tr key={r.execucao_id}>
                    <td>{r.ataque_id}</td>
                    <td>{r.versao_prompt}</td>
                    <td>{new Date(r.executado_em).toLocaleTimeString('pt-BR')}</td>
                    <td>{r.resposta ? r.resposta.slice(0, 80) : <span className="st">{r.status}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </aside>
  );
}
