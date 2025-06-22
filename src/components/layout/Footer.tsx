export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-12">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Asoyal Studios. Tüm hakları saklıdır.</p>
        {/* Buraya sosyal medya ikonları gelecek */}
      </div>
    </footer>
  );
}