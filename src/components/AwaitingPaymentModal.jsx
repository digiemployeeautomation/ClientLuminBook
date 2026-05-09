import React, { useState } from 'react';

const ACCENT = '#c47d5a';
const DARK = '#1a1215';
const MUTED = '#6b6561';
const BORDER = '#e5ddd6';
const BG = '#faf7f5';

export default function AwaitingPaymentModal({ amount, provider, paymentNumber, referenceCode, onDone }) {
  const [copied, setCopied] = useState(null);
  const providerLabel = provider === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money';

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // Clipboard not available — silent; user can long-press to copy
    }
  };

  const Field = ({ label, value, copyKey }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: MUTED }}>{label}: </span>
        <code style={{ fontSize: 16, fontWeight: 600, color: DARK }}>{value}</code>
      </div>
      <button
        onClick={() => copy(value, copyKey)}
        style={{
          fontSize: 12,
          padding: '4px 10px',
          border: `1px solid ${BORDER}`,
          background: '#fff',
          borderRadius: 8,
          cursor: 'pointer',
          color: copied === copyKey ? '#4a9d6e' : MUTED,
          minWidth: 60,
        }}
      >
        {copied === copyKey ? 'Copied' : 'Copy'}
      </button>
    </div>
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
          maxWidth: 420,
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
        }}
      >
        <h3 style={{ margin: '0 0 12px', fontFamily: 'Fraunces, serif', color: DARK, fontSize: 22 }}>
          Complete your payment
        </h3>
        <div
          style={{
            background: '#fff',
            border: `1px solid ${BORDER}`,
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 13, color: MUTED, marginBottom: 4 }}>Send via {providerLabel}</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              fontFamily: 'Fraunces, serif',
              color: ACCENT,
              lineHeight: 1.1,
            }}
          >
            K{amount}
          </div>
          <Field label="To" value={paymentNumber} copyKey="number" />
          <Field label="Reference" value={referenceCode} copyKey="ref" />
        </div>
        <p style={{ fontSize: 13, color: MUTED, margin: '0 0 16px', lineHeight: 1.5 }}>
          Your booking will be confirmed once payment is received, usually within 15 minutes. We'll
          notify you here.
        </p>
        <button
          onClick={onDone}
          style={{
            width: '100%',
            padding: 14,
            border: 'none',
            background: ACCENT,
            color: '#fff',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: `0 4px 16px ${ACCENT}40`,
          }}
        >
          I've Sent It
        </button>
      </div>
    </div>
  );
}
