import axios from "axios";

const axiosBase = axios.create({
	baseURL: "https://my-drugs.herokuapp.com/",
});

export default axiosBase;
