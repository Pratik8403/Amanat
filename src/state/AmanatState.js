/* ═══════════════════════════════════════════════════════════════
   AMANAT — Global State Manager with BroadcastChannel Sync
   Runtime-only. No localStorage, no cookies, no database.
   ═══════════════════════════════════════════════════════════════ */

const CHANNEL_NAME = 'amanat-protocol';

// Default mock financial assets
const DEFAULT_ASSETS = [
  { id: 1, type: 'Savings Account', institution: 'HDFC Bank', value: 200000, liquid: true },
  { id: 2, type: 'Liquid Mutual Fund', institution: 'Groww / Axis MF', value: 120000, liquid: true },
  { id: 3, type: 'Fixed Deposit', institution: 'SBI', value: 50000, liquid: false },
  { id: 4, type: 'Health Insurance', institution: 'Star Health', value: 500000, liquid: false },
];

// Create the initial state
function createInitialState() {
  return {
    owner: {
      pan: '',
      aadhaar: '',
      onboarded: false,
      signature: null,
    },
    nominee: {
      name: '',
      phone: '',
      pan: '',
      aadhaar: '',
      verified: false,
    },
    nomineeCode: null,
    codeGeneratedAt: null,
    assets: [...DEFAULT_ASSETS],
    customAssets: null, // from Excel upload
    emergencyStatus: null, // null | 'tier1' | 'tier2'
    accessRevoked: false,
    securityLogs: [],
    tier2Document: null,
  };
}

// Singleton state
let _state = createInitialState();
let _listeners = new Set();
let _channel = null;

// Initialize BroadcastChannel
function initChannel() {
  if (_channel) return;
  try {
    _channel = new BroadcastChannel(CHANNEL_NAME);
    _channel.onmessage = (event) => {
      const { type, payload } = event.data;
      handleRemoteMessage(type, payload);
    };
  } catch (e) {
    console.warn('BroadcastChannel not supported:', e);
  }
}

// Broadcast a message to other tabs
function broadcast(type, payload) {
  if (_channel) {
    _channel.postMessage({ type, payload });
  }
}

// Handle incoming messages from other tabs
function handleRemoteMessage(type, payload) {
  switch (type) {
    case 'NOMINEE_REGISTERED':
      _state = {
        ..._state,
        nominee: { ...payload.nominee },
        nomineeCode: payload.nomineeCode,
        codeGeneratedAt: payload.codeGeneratedAt,
      };
      break;

    case 'OWNER_ONBOARDED':
      _state = {
        ..._state,
        owner: { ..._state.owner, onboarded: true },
        assets: payload.assets || _state.assets,
        customAssets: payload.customAssets || _state.customAssets,
      };
      break;

    case 'ASSETS_UPDATED':
      _state = {
        ..._state,
        assets: payload.assets || _state.assets,
        customAssets: payload.customAssets || _state.customAssets,
      };
      break;

    case 'NOMINEE_VERIFIED':
      _state = {
        ..._state,
        nominee: { ..._state.nominee, verified: true },
        securityLogs: [
          { id: Date.now(), message: 'Nominee identity verified successfully', timestamp: new Date().toISOString(), type: 'info' },
          ..._state.securityLogs,
        ],
      };
      break;

    case 'TIER1_TRIGGERED':
      _state = {
        ..._state,
        emergencyStatus: 'tier1',
        securityLogs: [
          { id: Date.now(), message: '🚨 Tier 1 Emergency Trigger Activated — Hospitalization', timestamp: new Date().toISOString(), type: 'danger' },
          ..._state.securityLogs,
        ],
      };
      break;

    case 'TIER2_TRIGGERED':
      _state = {
        ..._state,
        emergencyStatus: 'tier2',
        tier2Document: payload.document || null,
        securityLogs: [
          { id: Date.now(), message: '⚠️ Tier 2 Succession Trigger Requested — Death Certificate Uploaded', timestamp: new Date().toISOString(), type: 'warning' },
          ..._state.securityLogs,
        ],
      };
      break;

    case 'ACCESS_REVOKED':
      _state = {
        ..._state,
        accessRevoked: true,
        emergencyStatus: null,
        securityLogs: [
          { id: Date.now(), message: '🔒 All nominee access has been revoked', timestamp: new Date().toISOString(), type: 'success' },
          ..._state.securityLogs,
        ],
      };
      break;

    case 'STATE_SYNC_REQUEST':
      // Another tab is requesting the current state
      broadcast('STATE_SYNC_RESPONSE', { state: _state });
      break;

    case 'STATE_SYNC_RESPONSE':
      // Merge received state (prefer non-null values)
      const remote = payload.state;
      if (remote.nomineeCode && !_state.nomineeCode) {
        _state = { ..._state, ...remote, securityLogs: [...remote.securityLogs, ..._state.securityLogs] };
      }
      break;

    default:
      break;
  }
  notifyListeners();
}

// Notify all React subscribers
function notifyListeners() {
  _listeners.forEach((listener) => listener({ ..._state }));
}

// ═══════════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════════

export function getState() {
  return { ..._state };
}

export function subscribe(listener) {
  _listeners.add(listener);
  return () => _listeners.delete(listener);
}

export function initAmanat() {
  initChannel();
  // Request state from any existing tabs
  setTimeout(() => broadcast('STATE_SYNC_REQUEST', {}), 500);
}

// Owner registers nominee + generates code
export function registerNominee(nomineeData) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const now = new Date().toISOString();
  _state = {
    ..._state,
    nominee: { ...nomineeData, verified: false },
    nomineeCode: code,
    codeGeneratedAt: now,
  };
  broadcast('NOMINEE_REGISTERED', {
    nominee: nomineeData,
    nomineeCode: code,
    codeGeneratedAt: now,
  });
  notifyListeners();
  return code;
}

// Owner completes onboarding
export function completeOwnerOnboarding(ownerData) {
  _state = {
    ..._state,
    owner: { ...ownerData, onboarded: true },
  };
  broadcast('OWNER_ONBOARDED', {
    assets: _state.assets,
    customAssets: _state.customAssets,
  });
  notifyListeners();
}

// Update assets (Excel upload)
export function updateAssets(assets, isCustom = false) {
  if (isCustom) {
    _state = { ..._state, customAssets: assets };
  } else {
    _state = { ..._state, assets };
  }
  broadcast('ASSETS_UPDATED', {
    assets: _state.assets,
    customAssets: _state.customAssets,
  });
  notifyListeners();
}

// Verify nominee code
export function verifyNomineeCode(inputCode) {
  return _state.nomineeCode && inputCode === _state.nomineeCode;
}

// Mark nominee as verified
export function markNomineeVerified() {
  _state = {
    ..._state,
    nominee: { ..._state.nominee, verified: true },
    securityLogs: [
      { id: Date.now(), message: 'Nominee identity verified successfully', timestamp: new Date().toISOString(), type: 'info' },
      ..._state.securityLogs,
    ],
  };
  broadcast('NOMINEE_VERIFIED', {});
  notifyListeners();
}

// Trigger Tier 1 emergency
export function triggerTier1() {
  _state = {
    ..._state,
    emergencyStatus: 'tier1',
    securityLogs: [
      { id: Date.now(), message: '🚨 Tier 1 Emergency Trigger Activated — Hospitalization', timestamp: new Date().toISOString(), type: 'danger' },
      ..._state.securityLogs,
    ],
  };
  broadcast('TIER1_TRIGGERED', {});
  notifyListeners();
}

// Trigger Tier 2 succession
export function triggerTier2(documentName) {
  _state = {
    ..._state,
    emergencyStatus: 'tier2',
    tier2Document: documentName,
    securityLogs: [
      { id: Date.now(), message: '⚠️ Tier 2 Succession Trigger Requested — Death Certificate Uploaded', timestamp: new Date().toISOString(), type: 'warning' },
      ..._state.securityLogs,
    ],
  };
  broadcast('TIER2_TRIGGERED', { document: documentName });
  notifyListeners();
}

// Revoke all access
export function revokeAccess() {
  _state = {
    ..._state,
    accessRevoked: true,
    emergencyStatus: null,
    securityLogs: [
      { id: Date.now(), message: '🔒 All nominee access has been revoked', timestamp: new Date().toISOString(), type: 'success' },
      ..._state.securityLogs,
    ],
  };
  broadcast('ACCESS_REVOKED', {});
  notifyListeners();
}

export { DEFAULT_ASSETS };
