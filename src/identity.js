const initial = {
  name: 'Alex Nakamura', headline: 'Engenheiro full stack sênior',
  location: 'Santos, Brasil', workMode: 'Remoto',
  summary: 'Crio interfaces escaláveis com TypeScript, React e Node.js. Há 6 anos desenvolvo produtos usados por milhões de pessoas e contribuo com projetos de código aberto.',
  publicProfile: false, showLocation: true, showOpportunities: true,
};
const storageKey = 'dev-id-identity-preview-v1';
let saved;
try { saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { saved = null; }
const state = { ...initial, ...(saved && typeof saved === 'object' ? saved : {}) };
const form = document.querySelector('#identity-form');
const fields = ['name', 'headline', 'location', 'workMode', 'summary'];
for (const key of fields) form.elements[key].value = String(state[key] ?? initial[key]);
for (const [id, key] of [['public-profile', 'publicProfile'], ['show-location', 'showLocation'], ['show-opportunities', 'showOpportunities']]) {
  const input = document.getElementById(id);
  input.checked = Boolean(state[key]);
  input.addEventListener('change', () => { state[key] = input.checked; persist(); render(); });
}
function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); return true; }
  catch { document.querySelector('#save-status').textContent = 'Não foi possível salvar neste navegador.'; return false; }
}
function render() {
  document.getElementById('hero-title').textContent = state.name || initial.name;
  document.querySelector('.role').textContent = state.headline || initial.headline;
  document.querySelector('.hero-person .muted').textContent = `${state.showLocation ? state.location || 'Localização não informada' : 'Localização oculta'} · ${state.workMode}`;
  document.querySelector('.bio').textContent = state.summary || 'Adicione um resumo profissional para se apresentar.';
  document.querySelector('#work-mode-preview').textContent = state.workMode;
  document.querySelector('.status').hidden = !state.showOpportunities;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  for (const key of fields) state[key] = form.elements[key].value.trim();
  if (persist()) document.querySelector('#save-status').textContent = 'Alterações salvas neste navegador.';
  render();
});
render();
