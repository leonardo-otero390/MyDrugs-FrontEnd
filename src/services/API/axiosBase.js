import axios from "axios";

const axiosBase = axios.create({
	baseURL: "http://localhost:4001",
});

export default axiosBase;
