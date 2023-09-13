import axios from "axios";

const toolkitAxios = axios.create({
	baseURL: "https://toolkitbc-staging.armpension.com:4434/api/",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		accept: "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export { toolkitAxios };
