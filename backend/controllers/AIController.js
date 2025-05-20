import axios from "axios";


// Route to fetch popular dishes from Flask
const popular = ("/get-popular-dishes", async (req, res) => {
    try {
        
        const response = await axios.get("http://127.0.0.1:5000/popular-dishes");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch popular dishes" });
    }
});


const recommendations = ("/get-recommendations", async (req, res) => {
    try {
        const{userId} = req.body
        const response = await axios.post(`http://127.0.0.1:5000/recommend/${userId}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching recommendations" });
    }
});

export {popular,recommendations}

