import { Link } from 'react-router-dom';

export default function TopActions() {
  return (
    <div className="absolute top-6 right-6 flex gap-3">
      <Link
        to="/admin/login"
        className="rounded bg-white/10 px-4 py-2 text-white hover:bg-white/20"
      >
        Admin
      </Link>

      <Link
        to="/sponsor/login"
        className="rounded bg-white/10 px-4 py-2 text-white hover:bg-white/20"
      >
        Sponsor
      </Link>
    </div>
  );
}