import axios from "axios";
const API_URL = "http://localhost:5000/contacts";

export const getContacts = async () => await axios.get(API_URL);
export const addContact = async (contact) => await axios.post(API_URL, contact);
export const updateContact = async (id, contact) => await axios.put(`${API_URL}/${id}`, contact);
export const deleteContact = async (id) => await axios.delete(`${API_URL}/${id}`);

