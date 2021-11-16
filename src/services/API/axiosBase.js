import axios from "axios";

const axiosBase = axios.create({
	baseURL: "http://localhost:4000",
});

export default axiosBase;
