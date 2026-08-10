import axios from "axios";




async function getMobiles(){
    

    const res = await axios.get("http://localhost:3000/products")

    return res.data
}

export default getMobiles;