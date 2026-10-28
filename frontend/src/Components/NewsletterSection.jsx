
function NewsletterSection() {
    return (
        <section
            id="contact"
            className="w-full overflow-hidden bg-[#0B0B0F] py-12 sm:py-16 lg:py-24"
        >
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
                <div className="rounded-2xl border border-white/10 bg-[#191A20] p-5 text-center sm:rounded-3xl sm:p-8 md:p-12">

                    <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
                        Stay Updated
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:mt-4 sm:text-base md:text-lg md:leading-7">
                        Get the latest offers, new arrivals and tech
                        updates delivered straight to your inbox.
                    </p>

                    <form
                        className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email address"
                            required
                            className="min-w-0 w-full flex-1 rounded-xl border border-white/10 bg-[#23242C] px-4 py-3.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-500 sm:px-5 sm:py-4 sm:text-base"
                        />

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 sm:w-auto sm:px-8 sm:py-4"
                        >
                            Subscribe
                        </button>
                    </form>

                    <p className="mt-5 text-xs leading-5 text-zinc-500 sm:mt-6 sm:text-sm">
                        We respect your privacy. Unsubscribe anytime.
                    </p>

                </div>
            </div>
        </section>
    );
}

export default NewsletterSection;
