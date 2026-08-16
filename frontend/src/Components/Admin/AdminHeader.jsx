
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"))
const name = user.name.split("")[0].toUpperCase()

function Header({page,content,role , }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="items-center px-6 py-3 border-b-2 border-white/10 flex justify-between  relative bg-">
                <div>
                    <h1 className="font-bold text-3xl text-white" >{page}</h1>
                    <p onClick={()=>navigate("/Dashboard")} className="px-1 text-indigo-300 cursor-pointer 
                    hover:border-b-2 border-blue-600">{content}<span className="text-white">{role}</span></p>
                </div>

                <div className="flex gap-6 justify-center items-center" >
                    {/* <div>
                        <input type="search" name="search" placeholder="Search..."
                            className="relative text-white rounded py-1 px-2 border-white border" />
                        <IoSearch className="absolute text-white text-xl top-8 right-50" />
                    </div> */}
                    <div className="flex gap-2 justify-center items-center">
                        <div>
                            <div className="bg-blue-700 w-10 h-10 rounded-full flex justify-center items-center">
                                <h1 className="text-white">{name}</h1>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold text-xl text-white">Admin</h1>
                            <p className="text-white">administrator</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header;