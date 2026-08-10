import axios from "axios";

async function getProducts(category) {
    let url = "http://localhost:3000/products";

    if (category && category !== "all") {
        url += `?category=${category}`
    }

    const res = await axios.get(url);
        

    return res.data;
}

export default getProducts;