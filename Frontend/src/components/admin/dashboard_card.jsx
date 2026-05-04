export default function DashboardCard({ title, value, color }) {
  return (
    <div className="rounded-xl bg-white shadow p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <div
        className={`mt-2 text-3xl font-bold ${color} text-white rounded-lg px-3 py-2 inline-block`}
      >
        {value}
      </div>
    </div>
  );
}