export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
      <div
        className="h-16 w-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
