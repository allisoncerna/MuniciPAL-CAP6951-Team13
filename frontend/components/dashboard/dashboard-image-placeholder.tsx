export function DashboardImagePlaceholder() {
  return (
    <section aria-label="Municipal building placeholder" className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-panel">
      <div className="flex h-64 items-center justify-center bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(255,255,255,0.92))] p-6 sm:h-72">
        <div className="flex h-full w-full items-end rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-6 backdrop-blur-sm">
          <div className="max-w-md">
            <p className="text-sm font-medium text-brand-700">Image placeholder</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Municipal building image to be added later</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">This reserved space keeps the layout ready for a future hero image without generating one now.</p>
          </div>
        </div>
      </div>
    </section>
  );
}