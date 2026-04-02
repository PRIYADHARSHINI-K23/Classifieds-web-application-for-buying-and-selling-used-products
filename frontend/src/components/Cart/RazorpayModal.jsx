import { useState } from 'react';

const TABS = ['UPI', 'Cards', 'Net Banking', 'Wallet'];

const BANKS = [
    { name: 'State Bank of India', code: 'SBI' },
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'ICICI Bank', code: 'ICICI' },
    { name: 'Axis Bank', code: 'AXIS' },
    { name: 'Kotak Mahindra Bank', code: 'KOTAK' },
    { name: 'Punjab National Bank', code: 'PNB' },
    { name: 'Bank of Baroda', code: 'BOB' },
    { name: 'Canara Bank', code: 'CANARA' },
];

const WALLETS = [
    { name: 'Paytm', color: '#00BAF2', letter: 'P' },
    { name: 'PhonePe', color: '#5F259F', letter: 'Ph' },
    { name: 'Amazon Pay', color: '#FF9900', letter: 'A' },
    { name: 'Mobikwik', color: '#1B3FA0', letter: 'M' },
];

const RazorpayModal = ({ amount, userEmail, userName, onSuccess, onClose }) => {
    const [activeTab, setActiveTab] = useState('UPI');
    const [upiId, setUpiId] = useState('');
    const [upiError, setUpiError] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedWallet, setSelectedWallet] = useState('');
    const [processing, setProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');

    const formatCard = (val) => {
        const digits = val.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (val) => {
        const digits = val.replace(/\D/g, '').slice(0, 4);
        if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2);
        return digits;
    };

    const simulatePayment = () => {
        setProcessing(true);
        setProcessingStep('Connecting to bank...');
        setTimeout(() => setProcessingStep('Authenticating...'), 1000);
        setTimeout(() => setProcessingStep('Processing payment...'), 2200);
        setTimeout(() => setProcessingStep('Verifying transaction...'), 3400);
        setTimeout(() => {
            const paymentId = 'pay_' + Math.random().toString(36).substr(2, 14).toUpperCase();
            const orderId = 'order_' + Math.random().toString(36).substr(2, 14).toUpperCase();
            const signature = Math.random().toString(36).substr(2, 40);
            onSuccess({ razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature });
        }, 4600);
    };

    const handlePay = () => {
        if (activeTab === 'UPI') {
            if (!upiId || !/^[\w.\-_]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
                setUpiError('Please enter a valid UPI ID (e.g. name@upi)');
                return;
            }
            setUpiError('');
        }
        if (activeTab === 'Cards' && (!cardNumber || !cardExpiry || !cardCvv || !cardName)) return;
        if (activeTab === 'Net Banking' && !selectedBank) return;
        if (activeTab === 'Wallet' && !selectedWallet) return;
        simulatePayment();
    };

    const canPay = () => {
        if (processing) return false;
        if (activeTab === 'UPI') return upiId.length > 3;
        if (activeTab === 'Cards') return cardNumber.replace(/\s/g, '').length === 16 && cardExpiry.length >= 4 && cardCvv.length >= 3 && cardName.length > 1;
        if (activeTab === 'Net Banking') return !!selectedBank;
        if (activeTab === 'Wallet') return !!selectedWallet;
        return false;
    };

    if (processing) {
        return (
            <div className="rzp-overlay">
                <div className="rzp-modal">
                    <RzpHeader amount={amount} />
                    <div className="rzp-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, gap: 24 }}>
                        <div className="rzp-spinner"></div>
                        <p style={{ color: '#555', fontSize: 14, fontWeight: 500 }}>{processingStep}</p>
                        <p style={{ color: '#999', fontSize: 12 }}>Do not close or refresh this window</p>
                    </div>
                </div>
                <RzpStyles />
            </div>
        );
    }

    return (
        <div className="rzp-overlay">
            <div className="rzp-modal">
                <RzpHeader amount={amount} onClose={onClose} />

                {/* Tabs */}
                <div className="rzp-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`rzp-tab ${activeTab === tab ? 'rzp-tab-active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="rzp-body">
                    {/* UPI Tab */}
                    {activeTab === 'UPI' && (
                        <div className="rzp-section">
                            <p className="rzp-label">Enter UPI ID</p>
                            <div className="rzp-input-wrap">
                                <input
                                    className="rzp-input"
                                    placeholder="yourname@upi"
                                    value={upiId}
                                    onChange={e => { setUpiId(e.target.value); setUpiError(''); }}
                                />
                                <span className="rzp-upi-icon">
                                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#097939"/><text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">UPI</text></svg>
                                </span>
                            </div>
                            {upiError && <p className="rzp-error">{upiError}</p>}
                            <p className="rzp-hint">You will receive a payment request on your UPI app</p>

                            <div className="rzp-divider"><span>OR pay using QR</span></div>
                            <div className="rzp-qr-box">
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <rect width="100" height="100" fill="white"/>
                                    {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                                        const pattern = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
                                        return pattern[r][c] ? <rect key={`${r}-${c}`} x={8+c*6} y={8+r*6} width="5" height="5" fill="#222"/> : null;
                                    }))}
                                    {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                                        const pattern = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
                                        return pattern[r][c] ? <rect key={`b-${r}-${c}`} x={58+c*6} y={8+r*6} width="5" height="5" fill="#222"/> : null;
                                    }))}
                                    {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                                        const pattern = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
                                        return pattern[r][c] ? <rect key={`c-${r}-${c}`} x={8+c*6} y={58+r*6} width="5" height="5" fill="#222"/> : null;
                                    }))}
                                    {[20,26,32,38,44,50,56,62,68,74,80].map((x,i) => i%2===0 ? <rect key={`d-${i}`} x={x} y={58} width="5" height="5" fill="#222"/> : null)}
                                    {[20,26,32,38,44,50,56,62,68,74,80].map((x,i) => i%3!==1 ? <rect key={`e-${i}`} x={x} y={64} width="5" height="5" fill="#222"/> : null)}
                                    {[20,26,32,38,44,50,56,62,68,74,80].map((x,i) => i%2===1 ? <rect key={`f-${i}`} x={x} y={70} width="5" height="5" fill="#222"/> : null)}
                                </svg>
                                <p style={{ fontSize: 11, color: '#888', marginTop: 6 }}>Scan with any UPI app</p>
                            </div>
                        </div>
                    )}

                    {/* Cards Tab */}
                    {activeTab === 'Cards' && (
                        <div className="rzp-section">
                            <p className="rzp-label">Card Number</p>
                            <input className="rzp-input" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} maxLength={19} />
                            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
                                <div style={{ flex: 1 }}>
                                    <p className="rzp-label">Expiry Date</p>
                                    <input className="rzp-input" placeholder="MM / YY" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} maxLength={7} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p className="rzp-label">CVV</p>
                                    <input className="rzp-input" placeholder="•••" type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,4))} maxLength={4} />
                                </div>
                            </div>
                            <p className="rzp-label" style={{ marginTop: 14 }}>Name on Card</p>
                            <input className="rzp-input" placeholder="As printed on card" value={cardName} onChange={e => setCardName(e.target.value)} />
                            <div className="rzp-card-logos">
                                <span className="rzp-card-badge" style={{ background: '#1A1F71', color: '#fff' }}>VISA</span>
                                <span className="rzp-card-badge" style={{ background: '#EB001B', color: '#fff' }}>MC</span>
                                <span className="rzp-card-badge" style={{ background: '#003087', color: '#fff' }}>AMEX</span>
                                <span className="rzp-card-badge" style={{ background: '#FF6600', color: '#fff' }}>RuPay</span>
                            </div>
                        </div>
                    )}

                    {/* Net Banking Tab */}
                    {activeTab === 'Net Banking' && (
                        <div className="rzp-section">
                            <p className="rzp-label">Select your Bank</p>
                            <div className="rzp-bank-grid">
                                {BANKS.map(bank => (
                                    <button
                                        key={bank.code}
                                        className={`rzp-bank-item ${selectedBank === bank.code ? 'rzp-bank-selected' : ''}`}
                                        onClick={() => setSelectedBank(bank.code)}
                                    >
                                        <div className="rzp-bank-icon">{bank.code.slice(0,2)}</div>
                                        <span>{bank.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Wallet Tab */}
                    {activeTab === 'Wallet' && (
                        <div className="rzp-section">
                            <p className="rzp-label">Select Wallet</p>
                            <div className="rzp-wallet-list">
                                {WALLETS.map(w => (
                                    <button
                                        key={w.name}
                                        className={`rzp-wallet-item ${selectedWallet === w.name ? 'rzp-wallet-selected' : ''}`}
                                        onClick={() => setSelectedWallet(w.name)}
                                    >
                                        <div className="rzp-wallet-icon" style={{ background: w.color }}>{w.letter}</div>
                                        <span>{w.name}</span>
                                        {selectedWallet === w.name && <span className="rzp-check">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pay Button */}
                <div className="rzp-footer">
                    <button className="rzp-pay-btn" disabled={!canPay()} onClick={handlePay}>
                        Pay ₹{amount?.toLocaleString('en-IN')}
                    </button>
                    <div className="rzp-secure-badge">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M6 0L0 2.5V7C0 10.5 2.5 13.5 6 14C9.5 13.5 12 10.5 12 7V2.5L6 0Z" fill="#528FF0"/></svg>
                        <span>Secured by <strong>Razorpay</strong></span>
                    </div>
                </div>
            </div>
            <RzpStyles />
        </div>
    );
};

const RzpHeader = ({ amount, onClose }) => (
    <div className="rzp-header">
        <div className="rzp-header-left">
            <div className="rzp-logo">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="8" fill="#528FF0"/>
                    <path d="M10 28L18 12H24L20 20H28L16 32L19 22H12L10 28Z" fill="white"/>
                </svg>
            </div>
            <div>
                <p className="rzp-merchant">QuickBuy</p>
                <p className="rzp-amount">₹{amount?.toLocaleString('en-IN')}</p>
            </div>
        </div>
        {onClose && (
            <button className="rzp-close" onClick={onClose}>✕</button>
        )}
    </div>
);

const RzpStyles = () => (
    <style>{`
        .rzp-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.65);
            display: flex; align-items: center; justify-content: center;
            z-index: 99999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            animation: rzpFadeIn 0.2s ease;
        }
        @keyframes rzpFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rzpSlideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .rzp-modal {
            background: #fff; border-radius: 8px; width: 420px; max-width: 95vw;
            max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: rzpSlideUp 0.25s ease;
        }
        .rzp-header {
            background: #528FF0; padding: 16px 20px;
            display: flex; align-items: center; justify-content: space-between;
        }
        .rzp-header-left { display: flex; align-items: center; gap: 12px; }
        .rzp-logo { width: 36px; height: 36px; }
        .rzp-merchant { color: rgba(255,255,255,0.85); font-size: 11px; margin: 0; }
        .rzp-amount { color: #fff; font-size: 20px; font-weight: 700; margin: 0; }
        .rzp-close {
            background: rgba(255,255,255,0.2); border: none; color: #fff;
            width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
            font-size: 13px; display: flex; align-items: center; justify-content: center;
            transition: background 0.2s;
        }
        .rzp-close:hover { background: rgba(255,255,255,0.35); }
        .rzp-tabs {
            display: flex; border-bottom: 1px solid #e8e8e8; background: #fafafa;
        }
        .rzp-tab {
            flex: 1; padding: 12px 8px; border: none; background: none;
            font-size: 12px; font-weight: 500; color: #888; cursor: pointer;
            border-bottom: 2px solid transparent; transition: all 0.2s;
        }
        .rzp-tab:hover { color: #528FF0; }
        .rzp-tab-active { color: #528FF0; border-bottom-color: #528FF0; background: #fff; font-weight: 600; }
        .rzp-body { padding: 20px; overflow-y: auto; flex: 1; }
        .rzp-section { display: flex; flex-direction: column; }
        .rzp-label { font-size: 11px; font-weight: 600; color: #666; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        .rzp-input-wrap { position: relative; }
        .rzp-input {
            width: 100%; padding: 10px 40px 10px 12px; border: 1.5px solid #ddd;
            border-radius: 4px; font-size: 14px; outline: none; box-sizing: border-box;
            transition: border-color 0.2s; color: #333;
        }
        .rzp-input:focus { border-color: #528FF0; }
        .rzp-upi-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); }
        .rzp-error { color: #e74c3c; font-size: 11px; margin: 4px 0 0; }
        .rzp-hint { font-size: 11px; color: #999; margin: 8px 0 0; }
        .rzp-divider { display: flex; align-items: center; gap: 10px; margin: 18px 0; }
        .rzp-divider::before, .rzp-divider::after { content: ''; flex: 1; height: 1px; background: #e8e8e8; }
        .rzp-divider span { font-size: 11px; color: #aaa; white-space: nowrap; }
        .rzp-qr-box { display: flex; flex-direction: column; align-items: center; padding: 16px; border: 1.5px dashed #ddd; border-radius: 8px; }
        .rzp-card-logos { display: flex; gap: 8px; margin-top: 16px; }
        .rzp-card-badge { padding: 3px 8px; border-radius: 3px; font-size: 10px; font-weight: 700; }
        .rzp-bank-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .rzp-bank-item {
            display: flex; align-items: center; gap: 10px; padding: 10px 12px;
            border: 1.5px solid #e8e8e8; border-radius: 6px; background: #fff;
            cursor: pointer; font-size: 12px; color: #333; text-align: left;
            transition: all 0.15s;
        }
        .rzp-bank-item:hover { border-color: #528FF0; background: #f0f5ff; }
        .rzp-bank-selected { border-color: #528FF0 !important; background: #f0f5ff !important; color: #528FF0 !important; font-weight: 600; }
        .rzp-bank-icon {
            width: 32px; height: 32px; border-radius: 4px; background: #528FF0;
            color: #fff; font-size: 10px; font-weight: 700;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rzp-wallet-list { display: flex; flex-direction: column; gap: 8px; }
        .rzp-wallet-item {
            display: flex; align-items: center; gap: 14px; padding: 12px 16px;
            border: 1.5px solid #e8e8e8; border-radius: 6px; background: #fff;
            cursor: pointer; font-size: 13px; color: #333; transition: all 0.15s;
        }
        .rzp-wallet-item:hover { border-color: #528FF0; background: #f0f5ff; }
        .rzp-wallet-selected { border-color: #528FF0 !important; background: #f0f5ff !important; font-weight: 600; }
        .rzp-wallet-icon {
            width: 36px; height: 36px; border-radius: 50%; color: #fff;
            font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center;
        }
        .rzp-check { margin-left: auto; color: #528FF0; font-weight: 700; }
        .rzp-footer { padding: 16px 20px; border-top: 1px solid #f0f0f0; background: #fafafa; }
        .rzp-pay-btn {
            width: 100%; padding: 13px; background: #528FF0; color: #fff;
            border: none; border-radius: 4px; font-size: 15px; font-weight: 600;
            cursor: pointer; transition: background 0.2s; letter-spacing: 0.3px;
        }
        .rzp-pay-btn:hover:not(:disabled) { background: #3a7de0; }
        .rzp-pay-btn:disabled { background: #b0c8f8; cursor: not-allowed; }
        .rzp-secure-badge {
            display: flex; align-items: center; justify-content: center;
            gap: 5px; margin-top: 10px; font-size: 11px; color: #999;
        }
        .rzp-secure-badge strong { color: #528FF0; }
        .rzp-spinner {
            width: 44px; height: 44px; border: 3px solid #e8e8e8;
            border-top-color: #528FF0; border-radius: 50%;
            animation: rzpSpin 0.8s linear infinite;
        }
        @keyframes rzpSpin { to { transform: rotate(360deg) } }
    `}</style>
);

export default RazorpayModal;
