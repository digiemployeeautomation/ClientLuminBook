import React from 'react';

const ACCENT = '#c47d5a';
const DARK = '#1a1215';
const MUTED = '#6b6561';
const BORDER = '#e5ddd6';
const BG = '#faf7f5';

export default function PaymentProviderPicker({ amount, onPick, onCancel }) {
  const Btn = ({ label, value, color }) => (
    <button
      key={value}
      onClick={() => onPick(value)}
      style={{
        flex: 1,
        padding: '20px 14px',
        fontSize: 15,
        fontWeight: 600,
        borderRadius: 14,
        border: `1px solid ${BORDER}`,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        transition: 'transform 0.1s, box-shadow 0.1s',
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{color}</span>
      <span style={{ color: DARK }}>{label}</span>
      <span style={{ fontSize: 12, color: MUTED }}>K{amount}</span>
    </button>
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,18,21,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        style={{
          background: BG,
          padding: 24,
          borderRadius: 18,
          width: '100%',
          maxWidth: 380,
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
        }}
      >
        <h3 style={{ margin: '0 0 6px', fontFamily: 'Fraunces, serif', color: DARK, fontSize: 22 }}>
          How will you pay?
        </h3>
        <p style={{ margin: '0 0 18px', fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
          Select your mobile money network. You'll see the number to send the deposit to next.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Btn label="MTN Mobile Money" value="mtn" color="🟡" />
          <Btn label="Airtel Money" value="airtel" color="🔴" />
        </div>
        <button
          onClick={onCancel}
          style={{
            marginTop: 16,
            width: '100%',
            padding: 12,
            border: 'none',
            background: 'transparent',
            color: MUTED,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
