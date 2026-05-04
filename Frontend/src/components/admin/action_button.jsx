export default function ActionButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 transition"
    >
      {text}
    </button>
  );
}
