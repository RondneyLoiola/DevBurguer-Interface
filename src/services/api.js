import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3001",
});

api.interceptors.request.use((config) => {
	//roda antes de cada requisição ser enviada
	const userData = localStorage.getItem("devburguer:userData"); //pega o item pela chave

	const token = userData && JSON.parse(userData).token;
	// os && é para verificar se tem algo no userData, se existe algo

	if (token) {
		config.headers.Authorization = `Bearer ${token}`; // é onde o token chega
	}

	return config;
});
