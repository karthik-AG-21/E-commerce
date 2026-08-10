

function NewsletterSection() {



    return (

        <>
            <section id="contact" className="bg-[#0B0B0F] py-24">

                <div className="max-w-4xl mx-auto">

                    <div className="bg-[#191A20] rounded-3xl border border-white/10 p-12 text-center">

                        <h2 className="text-4xl font-extrabold text-white">
                            Stay Updated
                        </h2>

                        <p className="mt-4 text-zinc-400 text-lg">
                            Get the latest offers, new arrivals and tech
                            updates delivered straight to your inbox.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">

                            <input  type = "email"
                                placeholder="Enter your email"
                                className=" flex-1  bg-[#23242C]  border  border-white/10  rounded-xl
                                px-5 py-4 text-white outline-none placeholder:text-zinc-500" />
                      
                            <button className="  bg-indigo-600 hover:bg-indigo-700 
                            transition text-white font-semibold px-8 rounded-xl"> Subscribe</button>

                        </div>

                        <p className="mt-6 text-sm text-zinc-500"> We respect your privacy. Unsubscribe anytime. </p>

                    </div>

                </div>

            </section>
        </>
    )
}


export default NewsletterSection;