import Header from "./Header";
import video1 from "../assets/phone-video.mp4";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


function HeroSection() {
    const navigate = useNavigate()

    return (

        <section className="relative h-screen overflow-hidden">


            <video autoPlay muted loop playsInline className=" absolute inset-0  w-full h-full object-cover">
                <source src={video1} type="video/mp4" />
            </video>



            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/75" />



            <div className="relative z-20">
                <Header />
            </div>




            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 z-10  max-w-5xl mx-auto ">

                <span className=" mb-6 px-4 py-2 rounded-xl bg-white/10 border backdrop-blur-md border-white/30 text-white  font-light ">
                    NEW ARRIVALS
                </span>

                <h1 className=" text-white font-extrabold text-4xl sm:text-5xl 
                    md:text-6xl lg:text-7xl tracking-tight  drop-shadow-lg animate-fadeIn">Experience <br /> Premium Technology</h1>


                <p className=" mt-6 max-w-3xl  text-white font-semibold text-lg sm:text-xl md:text-3xl drop-shadow-md">
                    Explore premium smartphones, laptops, wearables, and accessories designed to power your everyday life.</p>

                <div className="mt-10 flex flex-col sm:flex-row gap-5">

                    {/* <button className=" px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg 
                    transition-all duration-300 hover:bg-indigo-700 hover:scale-105 shadow-xl">Shop Now</button> */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#4F46E5", color: "#fff", borderRadius: "12px", textTransform: "none",
                            fontWeight: 600, px: 4, py: 1.5, "&:hover": { backgroundColor: "#4338CA", },
                        }}
                        onClick={() =>
                            navigate("/products")}> Shop Now  </Button>


                    <Button variant="contained"
                        sx={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.2)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)", // Safari support
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.10)",
                                boxShadow: "none",
                                border: "1px solid rgba(255,255,255,0.3)",
                            },
                        }} onClick={() => {
                            document
                                .getElementById("category")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }} > Explore Categories  </Button>


                </div>


            </div>


        </section>

    );
}


export default HeroSection;