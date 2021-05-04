import axios from "../http-common";

const insert = (data) => {
	return axios.post("/addresses", data);
};

const update = (id, data) => {
	return axios.put(`/addresses/${id}`, data);
};

const selectRandom5 = () => {
	return axios.get("/addresses/random5");
};

const selectById = (id) => {
	return axios.get(`/addresses/${id}`);
};

const remove = (id) => {
	return axios.delete(`/addresses/${id}`);
};

const AddressesServices = {
	insert,
	update,
	selectRandom5,
	selectById,
	remove,
};

export default AddressesServices;
