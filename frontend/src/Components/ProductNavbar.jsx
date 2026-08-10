

function ProductNavbar() {

    return (
        <>
            <div className="flex justify-around py-4 fixed z-50 top-0 left-0 w-full  bg-zinc-800 ">
                <h1 className=" text-3xl  text-white font-stretch-ultra-expanded font-extrabold">TechStore</h1>
                <div className="flex gap-3 max-w-xl w-full">
                    <input className="  text-white border-zinc-100   w-full  border-3 rounded" type="search" placeholder="explore ..." />
                    <button className=" bg-gray-500 text-white rounded-xl px-2 py-1" type="button">Search</button>
                </div>
                <div className="flex gap-4">
                    <button className=" text-white  text-xl font-medium">Contact</button>
                    <button className=" text-white  text-xl font-medium" >shop</button>
                </div>
            </div>
        </>
    )

}

export default ProductNavbar;