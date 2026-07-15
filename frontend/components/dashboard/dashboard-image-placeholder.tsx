import Image from 'next/image';
import municipalBuilding from '@/public/images/building.jpg';

export function DashboardImagePlaceholder() {
  return (
    <section aria-label="Municipal building placeholder" className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-panel">
      <Image src={municipalBuilding} alt="Municipal building" />
    </section>
  );
}