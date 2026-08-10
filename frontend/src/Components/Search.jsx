

import { FiSearch } from "react-icons/fi";

function SearchBar({ text, onChange }) {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-8">

            <div className="relative">

                <FiSearch
                    className=" absolute left-5 top-1/2  -translate-y-1/2  text-zinc-500 text-xl " />

                <input
                    type="search" placeholder="Search for smartphones, laptops..." 
                    value={text} onChange={onChange} 
                    className=" w-full  pl-14 pr-5 py-4 rounded-2xl border
                     bg-[#191A20] border-white/10 text-white placeholder:text-zinc-500 outline-none
                     focus:border-indigo-500 transition" />

            </div>

        </div>
    );
}

export default SearchBar;