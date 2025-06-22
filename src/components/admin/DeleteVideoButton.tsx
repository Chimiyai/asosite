'use client';

import { useState } from 'react';
import { deleteVideo } from '@/actions/videoActions'; // Doğru action'ı import et

export default function DeleteVideoButton({ videoId }: { videoId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteVideo(videoId);
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)} disabled={isDeleting} className="ml-4 font-medium text-red-500 hover:underline disabled:text-gray-400">
        {isDeleting ? 'Siliniyor...' : 'Sil'}
      </button>
      {/* Onay modalı burada olacak (DeleteProjectButton'dan kopyalanabilir) */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
            <h3 className="text-lg font-bold">Onay</h3>
            <p className="mt-2 text-sm text-gray-300">Bu videoyu kalıcı olarak silmek istediğinizden emin misiniz?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={() => setShowConfirm(false)} className="...">Vazgeç</button>
              <button onClick={handleDelete} className="...">Evet, Sil</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
// NOT: Stil sınıflarını (className) DeleteProjectButton'dan kopyalayabilirsin.