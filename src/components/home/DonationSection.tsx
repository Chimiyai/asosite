'use client';

import { useState } from 'react';

export default function DonationSection() {
  const [showIban, setShowIban] = useState(false);
  const [copied, setCopied] = useState(false);

  // IBAN bilgisi - gerçek IBAN ile değiştirilmeli
  const iban = "TR12 3456 7890 1234 5678 9012 34";
  const bankName = "Asosyal Studios Bank";
  const accountName = "Arda Güzey";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('IBAN kopyalanamadı:', err);
    }
  };

  return (
    <section id="donation" className="py-24 sm:py-32 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bize Destek Olun
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Daha kaliteli içerikler üretebilmek ve stüdyomuzu geliştirebilmek için 
            bağışlarınız bizim için çok değerli.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  IBAN ile Bağış
                </h3>
                <p className="text-gray-400 text-sm">
                  Aşağıdaki IBAN numarasını kullanarak bağış yapabilirsiniz
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm text-gray-400">Banka</p>
                      <p className="text-white font-medium">{bankName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Hesap Sahibi</p>
                      <p className="text-white font-medium">{accountName}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">IBAN Numarası</p>
                  <div className="flex items-center justify-between">
                    <code className="text-lg font-mono text-white bg-gray-700 px-3 py-2 rounded">
                      {showIban ? iban : '•••• •••• •••• •••• •••• ••••'}
                    </code>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setShowIban(!showIban)}
                        className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                      >
                        {showIban ? 'Gizle' : 'Göster'}
                      </button>
                      {showIban && (
                        <button
                          onClick={copyToClipboard}
                          className="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                        >
                          {copied ? 'Kopyalandı!' : 'Kopyala'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 text-xl">💡</div>
                    <div className="text-left">
                      <p className="text-blue-300 font-medium text-sm">Önemli Not</p>
                      <p className="text-blue-200 text-sm mt-1">
                        Bağış yaparken açıklama kısmına "Bağış" yazabilirsiniz. 
                        Tüm bağışlar stüdyo geliştirme ve ekipman alımı için kullanılacaktır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Bağışınız için teşekkür ederiz! 🎙️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
