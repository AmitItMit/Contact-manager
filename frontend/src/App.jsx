import { useEffect, useState } from "react";
import { getContacts, addContact, updateContact, deleteContact } from "./api";

function App() {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        getContacts().then(res => setContacts(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            const res = await updateContact(editingId, contact);
            setContacts(contacts.map(c => (c._id === editingId ? res.data : c)));
            setEditingId(null);
        } else {
            const res = await addContact(contact);
            setContacts([...contacts, res.data]);
        }
        setContact({ name: "", email: "", phone: "" });
    };

    const handleEdit = (c) => {
        setContact(c);
        setEditingId(c._id);
    };

    const handleDelete = async (id) => {
        await deleteContact(id);
        setContacts(contacts.filter(c => c._id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-10 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">Contact Manager</h1>
            <form className="mb-4 flex gap-2" onSubmit={handleSubmit}>
                <input 
                    className="p-2 text-black"
                    value={contact.name} 
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    placeholder="Name"
                    required
                />
                <input 
                    className="p-2 text-black"
                    value={contact.email} 
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    placeholder="Email"
                    required
                />
                <input 
                    className="p-2 text-black"
                    value={contact.phone} 
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    placeholder="Phone"
                    required
                />
                <button className="bg-blue-500 p-2 rounded">{editingId ? "Update" : "Add"}</button>
            </form>
            <ul>
                {contacts.map(c => (
                    <li key={c._id} className="flex justify-between w-96 p-2 bg-gray-700 rounded mb-2">
                        <div>
                            <p className="font-bold">{c.name}</p>
                            <p>{c.email}</p>
                            <p>{c.phone}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-yellow-500 px-2 rounded" onClick={() => handleEdit(c)}>Edit</button>
                            <button className="bg-red-500 px-2 rounded" onClick={() => handleDelete(c._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

