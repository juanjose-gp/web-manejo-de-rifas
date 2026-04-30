import DarkGradientLayout from '../components/layout/background';
import RafflesGrid from '../components/raffles/raffles_grid';

export default function Home() {
  return (
    <DarkGradientLayout>
      <section className="px-6 py-24">
        <RafflesGrid />
      </section>
    </DarkGradientLayout>
  );
}