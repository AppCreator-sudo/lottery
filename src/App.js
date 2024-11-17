import React, { useState } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';

function App() {
    const [isConnected, setIsConnected] = useState(false);

    const handleTransfer = async () => {
        if (!window.tonConnect) {
            alert("TonConnect не подключен!");
            return;
        }

        try {
            const response = await window.tonConnect.sendTransaction({
                to: 'TON_WALLET_ADDRESS',  // Укажите здесь адрес получателя
                amount: 0.3 * Math.pow(10, 9), // Перевод 0.3 TON, преобразуем в нанотоны
            });

            if (response) {
                alert('Транзакция успешно отправлена!');
            }
        } catch (error) {
            alert('Ошибка при отправке транзакции: ' + error.message);
        }
    };

    return (
        <TonConnectUIProvider manifestUrl="https://appcreator-sudo-lottery-6fa9.twc1.net/tonconnect-manifest.json">
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f5f5f5'
            }}>
                <TonConnectButton
                    onConnected={() => setIsConnected(true)}
                    onDisconnected={() => setIsConnected(false)}
                />
                {isConnected && (
                    <button
                        onClick={handleTransfer}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Перевести 0.3 TON
                    </button>
                )}
            </div>
        </TonConnectUIProvider>
    );
}

export default App;
