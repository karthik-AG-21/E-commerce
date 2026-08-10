import axios from "axios";


async function getProductsById(id){

    const res = await axios.get(`http://localhost:3000/products/${id}`)
    
    return res.data;

}

export default getProductsById;