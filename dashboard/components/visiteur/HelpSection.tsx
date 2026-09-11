export function HelpSection() {
  return (
    <section className="mt-12 rounded-2xl bg-blue-600 px-8 py-8 text-white">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Besoin d&apos;aide ?
          </h2>

          <p className="mt-2 max-w-2xl text-blue-100">
            Notre équipe est disponible pour vous accompagner dans
            l&apos;utilisation de YATIGO.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Contacter le support
        </button>
      </div>
    </section>
  );
}