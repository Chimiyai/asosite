// Dosya Yolu: src/components/admin/DeleteProjectButton.tsx
'use client';

import { useState } from 'react';
import { deleteProject } from '@/actions/projectActions'; // Az önce oluşturduğumuz action'ı import et

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProject(projectId);
    // Component artık var olmayacağı için state'i resetlemeye gerek yok,
    // sayfa zaten yenilenecek.
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="ml-4 font-medium text-red-500 hover:underline disabled:text-gray-400"
        disabled={isDeleting}
      >
        {isDeleting ? 'Siliniyor...' : 'Sil'}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
            <h3 className="text-lg font-bold">Onay</h3>
            <p className="mt-2 text-sm text-gray-300">
              Bu projeyi kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                Vazgeç
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}