import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Settings, X, Plus, Volume2, Trash2, Type, ChevronDown, ChevronUp,
  Loader2, Sparkles, Mic, Download, Upload, Search, Star, RotateCcw,
} from 'lucide-react';

const CATEGORIES = {
  social:    { label: 'Social',     bg: '#F6C9DE', text: '#5B2140' },
  personas:  { label: 'Personas',   bg: '#F5DE7A', text: '#5C4A00' },
  verbos:    { label: 'Acciones',   bg: '#93E3AE', text: '#0F4D2A' },
  describir: { label: 'Describir',  bg: '#82D6F0', text: '#0A3F52' },
  cosas:     { label: 'Cosas',      bg: '#F5B579', text: '#5C2E00' },
  preguntar: { label: 'Preguntar',  bg: '#D3A3EC', text: '#3C1259' },
  frases:    { label: 'Frases',     bg: '#9FDCCF', text: '#0F4A42' },
  carino:    { label: 'Cariño',     bg: '#FFB3A6', text: '#6B1F12' },
};

const DEFAULT_BOARD = [
  { id: 'd1',  label: 'Hola',      emoji: '👋', category: 'social' },
  { id: 'd2',  label: 'Adiós',     emoji: '🙋', category: 'social' },
  { id: 'd3',  label: 'Gracias',   emoji: '🙏', category: 'social' },
  { id: 'd4',  label: 'Por favor', emoji: '🤲', category: 'social' },
  { id: 'd5',  label: 'Sí',        emoji: '✅', category: 'social' },
  { id: 'd6',  label: 'No',        emoji: '❌', category: 'social' },
  { id: 'd7',  label: 'Yo',        emoji: '👤', category: 'personas' },
  { id: 'd8',  label: 'Tú',        emoji: '🫵', category: 'personas' },
  { id: 'd9',  label: 'Mamá',      emoji: '👩', category: 'personas' },
  { id: 'd10', label: 'Papá',      emoji: '👨', category: 'personas' },
  { id: 'd11', label: 'Ayuda',     emoji: '🆘', category: 'personas' },
  { id: 'd12', label: 'Quiero',    emoji: '🙌', category: 'verbos' },
  { id: 'd13', label: 'Necesito',  emoji: '❗', category: 'verbos' },
  { id: 'd14', label: 'Ir',        emoji: '🚶', category: 'verbos' },
  { id: 'd15', label: 'Comer',     emoji: '🍽️', category: 'verbos' },
  { id: 'd16', label: 'Beber',     emoji: '🥤', category: 'verbos' },
  { id: 'd17', label: 'Parar',     emoji: '✋', category: 'verbos' },
  { id: 'd18', label: 'Bien',      emoji: '😊', category: 'describir' },
  { id: 'd19', label: 'Mal',       emoji: '😞', category: 'describir' },
  { id: 'd20', label: 'Feliz',     emoji: '😄', category: 'describir' },
  { id: 'd21', label: 'Cansado',   emoji: '😴', category: 'describir' },
  { id: 'd22', label: 'Dolor',     emoji: '🤕', category: 'describir' },
  { id: 'd23', label: 'Agua',      emoji: '💧', category: 'cosas' },
  { id: 'd24', label: 'Comida',    emoji: '🍎', category: 'cosas' },
  { id: 'd25', label: 'Baño',      emoji: '🚽', category: 'cosas' },
  { id: 'd26', label: 'Casa',      emoji: '🏠', category: 'cosas' },
  { id: 'd27', label: 'Qué',       emoji: '❓', category: 'preguntar' },
  { id: 'd28', label: 'Dónde',     emoji: '📍', category: 'preguntar' },
  { id: 'd29', label: 'Cuándo',    emoji: '🕐', category: 'preguntar' },
  { id: 'd30', label: 'Por qué',   emoji: '🤔', category: 'preguntar' },
  { id: 'd31', label: 'Tengo hambre',        emoji: '🍔', category: 'frases' },
  { id: 'd32', label: 'Tengo sed',           emoji: '🥤', category: 'frases' },
  { id: 'd33', label: 'Tengo frío',          emoji: '🥶', category: 'frases' },
  { id: 'd34', label: 'Tengo calor',         emoji: '🥵', category: 'frases' },
  { id: 'd35', label: 'Me duele',            emoji: '🤕', category: 'frases' },
  { id: 'd36', label: 'Estoy cansado',       emoji: '😪', category: 'frases' },
  { id: 'd37', label: 'No me siento bien',   emoji: '🤢', category: 'frases' },
  { id: 'd38', label: 'Quiero ir al baño',   emoji: '🚻', category: 'frases' },
  { id: 'd39', label: 'Necesito descansar',  emoji: '🛌', category: 'frases' },
  { id: 'd40', label: 'Espera un momento',   emoji: '⏳', category: 'frases' },
  { id: 'd41', label: 'Ayúdame por favor',   emoji: '🆘', category: 'frases' },
  { id: 'd42', label: 'No entiendo',         emoji: '😕', category: 'frases' },
  { id: 'd43', label: 'Buenos días',         emoji: '☀️', category: 'frases' },
  { id: 'd44', label: 'Buenas noches',       emoji: '🌙', category: 'frases' },
  { id: 'd45', label: 'Hasta luego',         emoji: '👋', category: 'frases' },
  { id: 'd46', label: 'Lo siento',           emoji: '😔', category: 'frases' },
  { id: 'd47', label: 'Te quiero',           emoji: '❤️', category: 'frases' },
  { id: 'd48', label: 'Estoy de acuerdo',    emoji: '✅', category: 'frases' },
  { id: 'd49', label: 'No estoy de acuerdo', emoji: '🙅', category: 'frases' },
  { id: 'd50', label: 'Repite, por favor',   emoji: '🔁', category: 'frases' },
  { id: 'd51', label: 'Buenos días con alegría!',              emoji: '🥰', category: 'carino' },
  { id: 'd52', label: 'Me estoy meando de risa con esto',      emoji: '🤣', category: 'carino' },
  { id: 'd53', label: 'Os quiero mucho',                       emoji: '❤️', category: 'carino' },
  { id: 'd54', label: 'Disfruta cariño',                       emoji: '😘', category: 'carino' },
  { id: 'd55', label: 'Pero qué bonito, me encanta',           emoji: '😍', category: 'carino' },
  { id: 'd56', label: 'Felicidades!!!',                        emoji: '🥳', category: 'carino' },
  { id: 'd57', label: 'Estoy reventada',                       emoji: '🥴', category: 'carino' },
  { id: 'd58', label: 'Joe, se me ha ido la olla',             emoji: '😅', category: 'carino' },
  { id: 'd59', label: 'Por eso me voy cantando bajito',        emoji: '💃', category: 'carino' },
  { id: 'd60', label: 'Buenas noches amores, mañana más y mejor', emoji: '🫶', category: 'carino' },
];

const DEFAULT_VOICE_SETTINGS = { voiceURI: '', rate: 1, pitch: 1, volume: 1 };
const DEFAULT_AI_SETTINGS = { enabled: false, apiKey: '', voiceId: '' };
const EMOJI_CHOICES = ['⭐','❤️','🎵','🎮','📺','🐶','🐱','🚗','⚽','🎨','📖','☀️','🌙','🍕','🛏️','📱','🔊','😀','😢','😡','🥶','🥵','🤒','👋','👍','👎'];
const RECENT_LIMIT = 8;

// Works both inside the Claude artifact preview (window.storage) and in a
// real deployed build (localStorage) — same file, no changes needed.
async function storageGet(key) {
  try {
    if (window.storage && typeof window.storage.get === 'function') {
      const r = await window.storage.get(key, false);
      return r ? r.value : null;
    }
  } catch (e) {}
  try { return localStorage.getItem(key); } catch (e) {}
  return null;
}
async function storageSet(key, value) {
  try {
    if (window.storage && typeof window.storage.set === 'function') {
      await window.storage.set(key, value, false);
      return;
    }
  } catch (e) {}
  try { localStorage.setItem(key, value); } catch (e) {}
}

function stripEmojiForSpeech(text) {
  return text
    .replace(/[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u200D]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function App() {
  const [customItems, setCustomItems] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [freeText, setFreeText] = useState('');
  const [voices, setVoices] = useState([]);
  const [voiceSettings, setVoiceSettings] = useState(DEFAULT_VOICE_SETTINGS);
  const [aiSettings, setAiSettings] = useState(DEFAULT_AI_SETTINGS);
  const [aiVoiceList, setAiVoiceList] = useState([]);
  const [aiVoicesLoading, setAiVoicesLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [lastAudio, setLastAudio] = useState(null);
  const [lastSpokenText, setLastSpokenText] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [recentIds, setRecentIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showFreeText, setShowFreeText] = useState(false);
  const [showAddVoice, setShowAddVoice] = useState(false);
  const [newVoiceName, setNewVoiceName] = useState('');
  const [newVoiceFiles, setNewVoiceFiles] = useState([]);
  const [addVoiceLoading, setAddVoiceLoading] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newEmoji, setNewEmoji] = useState('⭐');
  const [newCategory, setNewCategory] = useState('cosas');
  const [editMode, setEditMode] = useState(false);
  const [backupMessage, setBackupMessage] = useState('');
  const audioRef = useRef(null);
  const lastAudioUrlRef = useRef(null);
  const strapRef = useRef(null);
  const importInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const items = await storageGet('custom-items');
        if (items) setCustomItems(JSON.parse(items));
      } catch (e) {}
      try {
        const vs = await storageGet('voice-settings');
        if (vs) setVoiceSettings(JSON.parse(vs));
      } catch (e) {}
      try {
        const ai = await storageGet('ai-voice-settings');
        if (ai) {
          const parsed = JSON.parse(ai);
          setAiSettings(parsed);
          if (parsed.apiKey) fetchAiVoices(parsed.apiKey);
        }
      } catch (e) {}
      try {
        const fav = await storageGet('favorite-ids');
        if (fav) setFavoriteIds(JSON.parse(fav));
      } catch (e) {}
      try {
        const rec = await storageGet('recent-ids');
        if (rec) setRecentIds(JSON.parse(rec));
      } catch (e) {}
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const persistCustomItems = useCallback((items) => { storageSet('custom-items', JSON.stringify(items)); }, []);
  const persistVoiceSettings = useCallback((settings) => { storageSet('voice-settings', JSON.stringify(settings)); }, []);
  const persistAiSettings = useCallback((settings) => { storageSet('ai-voice-settings', JSON.stringify(settings)); }, []);
  const persistFavorites = useCallback((ids) => { storageSet('favorite-ids', JSON.stringify(ids)); }, []);
  const persistRecent = useCallback((ids) => { storageSet('recent-ids', JSON.stringify(ids)); }, []);

  const fetchAiVoices = async (apiKey) => {
    if (!apiKey) return;
    setAiVoicesLoading(true);
    setAiError('');
    try {
      const res = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': apiKey },
      });
      if (!res.ok) throw new Error(res.status === 401 ? 'Clave de API inválida' : `Error ${res.status}`);
      const data = await res.json();
      setAiVoiceList(data.voices || []);
    } catch (e) {
      setAiError(e.message === 'Failed to fetch'
        ? 'No se pudo conectar. Revisa tu conexión a internet.'
        : e.message);
      setAiVoiceList([]);
    } finally {
      setAiVoicesLoading(false);
    }
  };

  const updateAiSetting = (key, value) => {
    const updated = { ...aiSettings, [key]: value };
    setAiSettings(updated);
    persistAiSettings(updated);
  };

  const addAiVoice = async () => {
    if (!newVoiceName.trim() || newVoiceFiles.length === 0 || !aiSettings.apiKey) return;
    setAddVoiceLoading(true);
    setAiError('');
    try {
      const form = new FormData();
      form.append('name', newVoiceName.trim());
      newVoiceFiles.forEach(f => form.append('files', f));
      const res = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: { 'xi-api-key': aiSettings.apiKey },
        body: form,
      });
      if (!res.ok) throw new Error(res.status === 401 ? 'Clave de API inválida' : `Error ${res.status} al crear la voz`);
      const data = await res.json();
      await fetchAiVoices(aiSettings.apiKey);
      updateAiSetting('voiceId', data.voice_id);
      setNewVoiceName('');
      setNewVoiceFiles([]);
      setShowAddVoice(false);
    } catch (e) {
      setAiError(e.message === 'Failed to fetch'
        ? 'No se pudo conectar. Revisa tu conexión a internet.'
        : e.message);
    } finally {
      setAddVoiceLoading(false);
    }
  };

  const speakSystem = (text) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.voiceURI === voiceSettings.voiceURI);
    if (voice) utter.voice = voice;
    utter.rate = voiceSettings.rate;
    utter.pitch = voiceSettings.pitch;
    utter.volume = voiceSettings.volume;
    utter.lang = voice ? voice.lang : 'es-ES';
    window.speechSynthesis.speak(utter);
  };

  const speakAi = async (text) => {
    setAiError('');
    setAiSpeaking(true);
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${aiSettings.voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': aiSettings.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error('Clave de API inválida');
        if (res.status === 429) throw new Error('Límite de uso alcanzado en tu cuenta de ElevenLabs');
        throw new Error(`Error ${res.status} generando el audio`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (lastAudioUrlRef.current) URL.revokeObjectURL(lastAudioUrlRef.current);
      lastAudioUrlRef.current = url;
      setLastAudio({ url, text });
      if (audioRef.current) {
        audioRef.current.src = url;
        await audioRef.current.play();
      }
    } catch (e) {
      setAiError(e.message === 'Failed to fetch'
        ? 'No se pudo conectar. Revisa tu conexión a internet.'
        : e.message);
      speakSystem(text);
    } finally {
      setAiSpeaking(false);
    }
  };

  const speak = (text) => {
    if (!text || !text.trim()) return;
    const cleaned = stripEmojiForSpeech(text);
    if (!cleaned) return;
    setLastSpokenText(cleaned);
    if (aiSettings.enabled && aiSettings.apiKey && aiSettings.voiceId) {
      speakAi(cleaned);
    } else {
      speakSystem(cleaned);
    }
  };

  const repeatLast = () => {
    if (!lastSpokenText) return;
    if (aiSettings.enabled && lastAudio && lastAudio.text === lastSpokenText && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      speak(lastSpokenText);
    }
  };

  const addToSentence = (item) => {
    setSentence(prev => [...prev, { ...item, uid: `${item.id}-${Date.now()}-${Math.random()}` }]);
  };
  const removeFromSentence = (uid) => setSentence(prev => prev.filter(s => s.uid !== uid));

  const addToRecent = (id) => {
    setRecentIds(prev => {
      const updated = [id, ...prev.filter(x => x !== id)].slice(0, RECENT_LIMIT);
      persistRecent(updated);
      return updated;
    });
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavoriteIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      persistFavorites(updated);
      return updated;
    });
  };

  const handleTapItem = (item) => {
    addToSentence(item);
    speak(item.label);
    addToRecent(item.id);
  };

  const downloadLastAudio = () => {
    if (!lastAudio) return;
    const safe = lastAudio.text
      .slice(0, 40)
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñ ]/gi, '')
      .trim()
      .replace(/\s+/g, '-') || 'audio';
    const a = document.createElement('a');
    a.href = lastAudio.url;
    a.download = `${safe}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const speakSentence = () => speak(sentence.map(s => s.label).join(' '));
  const clearSentence = () => setSentence([]);
  const speakFreeText = () => speak(freeText);

  const addCustomItem = () => {
    if (!newLabel.trim()) return;
    const item = { id: `c-${Date.now()}`, label: newLabel.trim(), emoji: newEmoji, category: newCategory, custom: true };
    const updated = [...customItems, item];
    setCustomItems(updated);
    persistCustomItems(updated);
    setNewLabel('');
    setNewEmoji('⭐');
    setShowAdd(false);
  };

  const deleteCustomItem = (id) => {
    const updated = customItems.filter(i => i.id !== id);
    setCustomItems(updated);
    persistCustomItems(updated);
  };

  const updateVoiceSetting = (key, value) => {
    const updated = { ...voiceSettings, [key]: value };
    setVoiceSettings(updated);
    persistVoiceSettings(updated);
  };

  const exportBackup = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      customItems,
      voiceSettings,
      aiSettings,
      favoriteIds,
      recentIds,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tablero-de-voz-copia-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupMessage('Copia exportada.');
  };

  const importBackup = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (Array.isArray(data.customItems)) {
          setCustomItems(data.customItems);
          persistCustomItems(data.customItems);
        }
        if (data.voiceSettings) {
          setVoiceSettings(data.voiceSettings);
          persistVoiceSettings(data.voiceSettings);
        }
        if (data.aiSettings) {
          setAiSettings(data.aiSettings);
          persistAiSettings(data.aiSettings);
          if (data.aiSettings.apiKey) fetchAiVoices(data.aiSettings.apiKey);
        }
        if (Array.isArray(data.favoriteIds)) {
          setFavoriteIds(data.favoriteIds);
          persistFavorites(data.favoriteIds);
        }
        if (Array.isArray(data.recentIds)) {
          setRecentIds(data.recentIds);
          persistRecent(data.recentIds);
        }
        setBackupMessage('Copia restaurada correctamente.');
      } catch (e) {
        setBackupMessage('El archivo no es una copia válida.');
      }
    };
    reader.readAsText(file);
  };

  const allItems = [...DEFAULT_BOARD, ...customItems];
  const itemById = (id) => allItems.find(i => i.id === id);
  const favoriteItems = favoriteIds.map(itemById).filter(Boolean);
  const recentItems = recentIds.map(itemById).filter(Boolean);
  const spanishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('es'));
  const otherVoices = voices.filter(v => !v.lang.toLowerCase().startsWith('es'));
  const speaking = aiSpeaking;

  const q = searchQuery.trim().toLowerCase();
  const visibleItems = allItems.filter(item => {
    if (q) return item.label.toLowerCase().includes(q);
    return activeTab === 'all' || item.category === activeTab;
  });
  const tabs = [{ key: 'all', label: 'Todos', bg: '#EDE7DA', text: '#4A4436' },
    ...Object.entries(CATEGORIES).map(([key, c]) => ({ key, ...c }))];

  return (
    <div className="min-h-screen w-full" style={{ background: '#FBF7F0', fontFamily: 'ui-rounded, "Nunito", system-ui, sans-serif' }}>
      <audio ref={audioRef} className="hidden" />
      <div className="max-w-3xl mx-auto px-3 pt-4 pb-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-extrabold" style={{ color: '#1B4B45' }}>Mi Tablero</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(e => !e)}
              aria-pressed={editMode}
              className="px-3 py-2 rounded-xl font-bold text-sm border-2"
              style={editMode
                ? { background: '#1B7A6E', color: 'white', borderColor: '#1B7A6E' }
                : { background: 'white', color: '#1B7A6E', borderColor: '#1B7A6E' }}
            >
              {editMode ? 'Listo' : 'Editar'}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              aria-label="Ajustes de voz"
              className="p-2.5 rounded-xl border-2 bg-white relative"
              style={{ borderColor: '#D8CFC0' }}
            >
              <Settings size={22} color="#1B4B45" />
              {aiSettings.enabled && (
                <span className="absolute -top-1 -right-1 rounded-full p-0.5" style={{ background: '#1B7A6E' }}>
                  <Sparkles size={10} color="white" />
                </span>
              )}
            </button>
          </div>
        </div>

        {aiSettings.enabled && (
          <div className="flex items-center gap-1.5 text-xs font-bold mb-2 px-1" style={{ color: '#1B7A6E' }}>
            <Sparkles size={13} /> Voz clonada activa {aiSpeaking && <Loader2 size={13} className="animate-spin" />}
          </div>
        )}

        {/* Favorites row */}
        {favoriteItems.length > 0 && (
          <div className="mb-2">
            <p className="text-xs font-bold mb-1 px-1" style={{ color: '#6B6255' }}>⭐ Favoritos</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {favoriteItems.map(item => (
                <button
                  key={`fav-${item.id}`}
                  onClick={() => handleTapItem(item)}
                  disabled={aiSpeaking}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl shrink-0 font-bold text-sm disabled:opacity-60"
                  style={{ background: CATEGORIES[item.category].bg, color: CATEGORIES[item.category].text }}
                >
                  <span className="text-lg">{item.emoji}</span>{item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent row */}
        {recentItems.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-bold mb-1 px-1" style={{ color: '#6B6255' }}>🕐 Recientes</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {recentItems.map(item => (
                <button
                  key={`rec-${item.id}`}
                  onClick={() => handleTapItem(item)}
                  disabled={aiSpeaking}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl shrink-0 font-bold text-sm disabled:opacity-60"
                  style={{ background: CATEGORIES[item.category].bg, color: CATEGORIES[item.category].text }}
                >
                  <span className="text-lg">{item.emoji}</span>{item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sentence strip */}
        <div className="rounded-2xl p-3 mb-3" style={{ background: 'white', border: '2px solid #D8CFC0' }}>
          <div ref={strapRef} className="flex gap-2 overflow-x-auto pb-1" style={{ minHeight: '56px' }} role="list" aria-label="Frase actual">
            {sentence.length === 0 && (
              <span className="text-sm self-center px-1" style={{ color: '#9A9186' }}>
                Toca los iconos de abajo para armar una frase…
              </span>
            )}
            {sentence.map(item => (
              <button
                key={item.uid}
                onClick={() => removeFromSentence(item.uid)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl shrink-0 font-bold text-base"
                style={{ background: CATEGORIES[item.category].bg, color: CATEGORIES[item.category].text }}
                aria-label={`Quitar ${item.label}`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
                <X size={16} />
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={speakSentence}
              disabled={sentence.length === 0 || speaking}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-extrabold text-lg disabled:opacity-40"
              style={{ background: '#1B7A6E', color: 'white' }}
            >
              {speaking ? <Loader2 size={22} className="animate-spin" /> : <Volume2 size={22} />} Hablar
            </button>
            <button
              onClick={repeatLast}
              disabled={!lastSpokenText || speaking}
              className="px-4 py-3 rounded-xl font-bold disabled:opacity-40"
              style={{ background: '#F3EEE4', color: '#1B7A6E' }}
              aria-label="Repetir última frase"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={clearSentence}
              disabled={sentence.length === 0}
              className="px-4 py-3 rounded-xl font-bold disabled:opacity-40"
              style={{ background: '#F3EEE4', color: '#6B6255' }}
              aria-label="Borrar frase"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Last generated audio (only available in AI voice mode) */}
        {lastAudio && (
          <div className="rounded-2xl p-3 mb-3 flex items-center justify-between gap-2" style={{ background: 'white', border: '2px solid #D8CFC0' }}>
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles size={16} color="#1B7A6E" className="shrink-0" />
              <span className="text-sm truncate" style={{ color: '#6B6255' }}>{lastAudio.text}</span>
            </div>
            <button
              onClick={downloadLastAudio}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm shrink-0"
              style={{ background: '#1B7A6E', color: 'white' }}
            >
              <Download size={16} /> Descargar
            </button>
          </div>
        )}

        {/* Free text */}
        <div className="rounded-2xl mb-4 overflow-hidden" style={{ background: 'white', border: '2px solid #D8CFC0' }}>
          <button
            onClick={() => setShowFreeText(s => !s)}
            className="w-full flex items-center justify-between px-3 py-3 font-bold"
            style={{ color: '#1B4B45' }}
          >
            <span className="flex items-center gap-2"><Type size={18} /> Escribir texto libre</span>
            {showFreeText ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {showFreeText && (
            <div className="px-3 pb-3 flex gap-2">
              <input
                value={freeText}
                onChange={e => setFreeText(e.target.value)}
                placeholder="Escribe aquí…"
                className="flex-1 px-3 py-3 rounded-xl text-base"
                style={{ border: '2px solid #D8CFC0' }}
              />
              <button
                onClick={speakFreeText}
                disabled={!freeText.trim() || speaking}
                className="px-4 rounded-xl font-bold disabled:opacity-40"
                style={{ background: '#1B7A6E', color: 'white' }}
                aria-label="Leer texto"
              >
                {speaking ? <Loader2 size={20} className="animate-spin" /> : <Volume2 size={20} />}
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" color="#9A9186" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar icono…"
            className="w-full pl-10 pr-3 py-2.5 rounded-xl text-base"
            style={{ border: '2px solid #D8CFC0', background: 'white' }}
          />
        </div>

        {/* Category tabs */}
        {!q && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-3 py-1.5 rounded-full text-sm font-bold shrink-0"
                style={{
                  background: activeTab === tab.key ? '#1B7A6E' : tab.bg,
                  color: activeTab === tab.key ? 'white' : tab.text,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Board grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {visibleItems.length === 0 && (
            <p className="col-span-full text-sm text-center py-4" style={{ color: '#9A9186' }}>
              No se encontraron iconos con ese término.
            </p>
          )}
          {visibleItems.map(item => (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleTapItem(item)}
                disabled={aiSpeaking}
                className="w-full flex flex-col items-center justify-center gap-1 py-3 rounded-2xl font-bold shadow-sm active:scale-95 transition-transform disabled:opacity-60"
                style={{ background: CATEGORIES[item.category].bg, color: CATEGORIES[item.category].text, minHeight: '84px' }}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-sm leading-tight text-center px-1">{item.label}</span>
              </button>
              {editMode && (
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  aria-label={favoriteIds.includes(item.id) ? `Quitar ${item.label} de favoritos` : `Añadir ${item.label} a favoritos`}
                  className="absolute -top-2 -left-2 rounded-full p-1"
                  style={{ background: favoriteIds.includes(item.id) ? '#F5B301' : '#D8CFC0', color: 'white' }}
                >
                  <Star size={14} fill="white" />
                </button>
              )}
              {editMode && item.custom && (
                <button
                  onClick={() => deleteCustomItem(item.id)}
                  aria-label={`Eliminar ${item.label}`}
                  className="absolute -top-2 -right-2 rounded-full p-1"
                  style={{ background: '#C0392B', color: 'white' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={() => { setNewCategory(activeTab !== 'all' ? activeTab : 'cosas'); setShowAdd(true); }}
            className="w-full flex flex-col items-center justify-center gap-1 py-3 rounded-2xl font-bold border-2 border-dashed"
            style={{ borderColor: '#B7AE9E', color: '#6B6255', minHeight: '84px' }}
          >
            <Plus size={28} />
            <span className="text-sm">Añadir</span>
          </button>
        </div>
      </div>

      {/* Add item modal */}
      {showAdd && (
        <div className="fixed inset-0 z-20 flex items-end sm:items-center justify-center" style={{ background: 'rgba(27,20,10,0.4)' }}>
          <div className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-4" style={{ background: '#FBF7F0' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-extrabold" style={{ color: '#1B4B45' }}>Nuevo icono</h2>
              <button onClick={() => setShowAdd(false)} aria-label="Cerrar"><X size={22} /></button>
            </div>

            <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>Palabra o frase</label>
            <input
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              className="w-full px-3 py-3 rounded-xl mb-3 text-base"
              style={{ border: '2px solid #D8CFC0' }}
              placeholder="Ej: Parque"
            />

            <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>Icono</label>
            <div className="grid grid-cols-8 gap-1 mb-3">
              {EMOJI_CHOICES.map(em => (
                <button
                  key={em}
                  onClick={() => setNewEmoji(em)}
                  className="text-2xl py-1 rounded-lg"
                  style={{ background: newEmoji === em ? '#1B7A6E33' : 'transparent' }}
                >
                  {em}
                </button>
              ))}
            </div>

            <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>Categoría</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setNewCategory(key)}
                  className="py-2 rounded-xl text-sm font-bold"
                  style={{
                    background: cat.bg,
                    color: cat.text,
                    outline: newCategory === key ? '3px solid #1B7A6E' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              onClick={addCustomItem}
              disabled={!newLabel.trim()}
              className="w-full py-3 rounded-xl font-extrabold text-lg disabled:opacity-40"
              style={{ background: '#1B7A6E', color: 'white' }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Settings drawer */}
      {showSettings && (
        <div className="fixed inset-0 z-20 flex items-end sm:items-center justify-center" style={{ background: 'rgba(27,20,10,0.4)' }}>
          <div className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-4 max-h-[85vh] overflow-y-auto" style={{ background: '#FBF7F0' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-extrabold" style={{ color: '#1B4B45' }}>Ajustes de voz</h2>
              <button onClick={() => setShowSettings(false)} aria-label="Cerrar"><X size={22} /></button>
            </div>

            {/* Mode toggle */}
            <div className="flex rounded-xl overflow-hidden mb-4 border-2" style={{ borderColor: '#D8CFC0' }}>
              <button
                onClick={() => updateAiSetting('enabled', false)}
                className="flex-1 py-2.5 text-sm font-bold"
                style={{ background: !aiSettings.enabled ? '#1B7A6E' : 'white', color: !aiSettings.enabled ? 'white' : '#6B6255' }}
              >
                Voz del sistema
              </button>
              <button
                onClick={() => updateAiSetting('enabled', true)}
                className="flex-1 py-2.5 text-sm font-bold flex items-center justify-center gap-1"
                style={{ background: aiSettings.enabled ? '#1B7A6E' : 'white', color: aiSettings.enabled ? 'white' : '#6B6255' }}
              >
                <Sparkles size={14} /> Voz clonada
              </button>
            </div>

            {!aiSettings.enabled && (
              <>
                <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>Voz</label>
                <select
                  value={voiceSettings.voiceURI}
                  onChange={e => updateVoiceSetting('voiceURI', e.target.value)}
                  className="w-full px-3 py-3 rounded-xl mb-4 text-base"
                  style={{ border: '2px solid #D8CFC0', background: 'white' }}
                >
                  <option value="">Voz predeterminada del dispositivo</option>
                  {spanishVoices.length > 0 && (
                    <optgroup label="Español">
                      {spanishVoices.map(v => (
                        <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                      ))}
                    </optgroup>
                  )}
                  {otherVoices.length > 0 && (
                    <optgroup label="Otros idiomas">
                      {otherVoices.map(v => (
                        <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                      ))}
                    </optgroup>
                  )}
                </select>
                {voices.length === 0 && (
                  <p className="text-xs mb-4" style={{ color: '#9A9186' }}>
                    Cargando voces del dispositivo… si no aparecen, comprueba que tu Android tenga instalado un motor de texto a voz en Ajustes → Accesibilidad.
                  </p>
                )}

                <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>
                  Velocidad: {voiceSettings.rate.toFixed(1)}
                </label>
                <input type="range" min="0.5" max="2" step="0.1" value={voiceSettings.rate}
                  onChange={e => updateVoiceSetting('rate', parseFloat(e.target.value))} className="w-full mb-4" />

                <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>
                  Tono: {voiceSettings.pitch.toFixed(1)}
                </label>
                <input type="range" min="0" max="2" step="0.1" value={voiceSettings.pitch}
                  onChange={e => updateVoiceSetting('pitch', parseFloat(e.target.value))} className="w-full mb-4" />

                <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>
                  Volumen: {Math.round(voiceSettings.volume * 100)}%
                </label>
                <input type="range" min="0" max="1" step="0.05" value={voiceSettings.volume}
                  onChange={e => updateVoiceSetting('volume', parseFloat(e.target.value))} className="w-full mb-4" />

                <button
                  onClick={() => speakSystem('Hola, así sueno ahora mismo.')}
                  className="w-full py-3 rounded-xl font-extrabold flex items-center justify-center gap-2"
                  style={{ background: '#1B7A6E', color: 'white' }}
                >
                  <Volume2 size={20} /> Probar voz
                </button>
              </>
            )}

            {aiSettings.enabled && (
              <>
                <p className="text-xs mb-3 p-2 rounded-lg" style={{ background: '#FFF3D6', color: '#6B4E00' }}>
                  Necesita internet y una cuenta de ElevenLabs con crédito. La clave se guarda solo en este dispositivo — no la compartas.
                </p>

                <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>Clave de API de ElevenLabs</label>
                <input
                  type="password"
                  value={aiSettings.apiKey}
                  onChange={e => updateAiSetting('apiKey', e.target.value)}
                  onBlur={() => aiSettings.apiKey && fetchAiVoices(aiSettings.apiKey)}
                  placeholder="sk_..."
                  className="w-full px-3 py-3 rounded-xl mb-3 text-base"
                  style={{ border: '2px solid #D8CFC0' }}
                />

                {aiVoicesLoading && (
                  <p className="text-xs mb-3 flex items-center gap-1" style={{ color: '#9A9186' }}>
                    <Loader2 size={14} className="animate-spin" /> Cargando voces…
                  </p>
                )}

                {aiVoiceList.length > 0 && (
                  <>
                    <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>Voz clonada</label>
                    <select
                      value={aiSettings.voiceId}
                      onChange={e => updateAiSetting('voiceId', e.target.value)}
                      className="w-full px-3 py-3 rounded-xl mb-3 text-base"
                      style={{ border: '2px solid #D8CFC0', background: 'white' }}
                    >
                      <option value="">Elige una voz…</option>
                      {aiVoiceList.map(v => (
                        <option key={v.voice_id} value={v.voice_id}>{v.name}</option>
                      ))}
                    </select>
                  </>
                )}

                <button
                  onClick={() => setShowAddVoice(s => !s)}
                  className="w-full py-2.5 rounded-xl font-bold text-sm mb-3 flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: '#1B7A6E', color: '#1B7A6E', background: 'white' }}
                  disabled={!aiSettings.apiKey}
                >
                  <Mic size={16} /> Crear voz nueva a partir de audios
                </button>

                {showAddVoice && (
                  <div className="mb-3 p-3 rounded-xl" style={{ background: '#F3EEE4' }}>
                    <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>Nombre de la voz</label>
                    <input
                      value={newVoiceName}
                      onChange={e => setNewVoiceName(e.target.value)}
                      placeholder="Ej: Voz de Miguel"
                      className="w-full px-3 py-2.5 rounded-xl mb-2 text-base"
                      style={{ border: '2px solid #D8CFC0' }}
                    />
                    <label className="block text-sm font-bold mb-1" style={{ color: '#6B6255' }}>
                      Audios de muestra (1–3, sin ruido de fondo)
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={e => setNewVoiceFiles(Array.from(e.target.files).slice(0, 3))}
                      className="w-full text-sm mb-2"
                    />
                    {newVoiceFiles.length > 0 && (
                      <p className="text-xs mb-2" style={{ color: '#6B6255' }}>
                        {newVoiceFiles.length} archivo(s) seleccionado(s)
                      </p>
                    )}
                    <button
                      onClick={addAiVoice}
                      disabled={!newVoiceName.trim() || newVoiceFiles.length === 0 || addVoiceLoading}
                      className="w-full py-2.5 rounded-xl font-bold text-sm disabled:opacity-40 flex items-center justify-center gap-2"
                      style={{ background: '#1B7A6E', color: 'white' }}
                    >
                      {addVoiceLoading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                      Crear voz
                    </button>
                  </div>
                )}

                {aiError && (
                  <p className="text-xs mb-3 p-2 rounded-lg" style={{ background: '#FBE0DC', color: '#8A2E1E' }}>
                    {aiError}
                  </p>
                )}

                <button
                  onClick={() => speak('Hola, así sueno ahora mismo.')}
                  disabled={!aiSettings.voiceId || aiSpeaking}
                  className="w-full py-3 rounded-xl font-extrabold flex items-center justify-center gap-2 disabled:opacity-40 mb-4"
                  style={{ background: '#1B7A6E', color: 'white' }}
                >
                  {aiSpeaking ? <Loader2 size={20} className="animate-spin" /> : <Volume2 size={20} />} Probar voz
                </button>
              </>
            )}

            {/* Backup section */}
            <div className="pt-3 mt-1 border-t-2" style={{ borderColor: '#D8CFC0' }}>
              <label className="block text-sm font-bold mb-2" style={{ color: '#6B6255' }}>Copia de seguridad</label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={exportBackup}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: '#1B7A6E', color: '#1B7A6E', background: 'white' }}
                >
                  <Download size={16} /> Exportar
                </button>
                <button
                  onClick={() => importInputRef.current && importInputRef.current.click()}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: '#1B7A6E', color: '#1B7A6E', background: 'white' }}
                >
                  <Upload size={16} /> Importar
                </button>
                <input
                  ref={importInputRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={e => { importBackup(e.target.files[0]); e.target.value = ''; }}
                />
              </div>
              <p className="text-xs" style={{ color: '#9A9186' }}>
                Guarda tus iconos, favoritos y ajustes en un archivo, o restáuralos en otro dispositivo. El archivo puede incluir tu clave de ElevenLabs — guárdalo en un sitio privado.
              </p>
              {backupMessage && (
                <p className="text-xs mt-2 font-bold" style={{ color: '#1B7A6E' }}>{backupMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
