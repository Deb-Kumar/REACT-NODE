import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/Env";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function UserList() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    // Fetch the user list from the API
    const getUserList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}user/list`);
            setUserData(response.data.data);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}user/delete/${id}`);
            getUserList();  // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Add a new user
    const addUser = () => {
        navigate('/user/add');
    };

    // Edit a user
    const editUser = (id) => {
        navigate(`/user/update/${id}`);
    };

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div className="userList">
            <h3>User List!</h3>
            <button className="add_btn" onClick={addUser}>
                <FontAwesomeIcon icon={faPlus} /> Add User
            </button>
            <div>
                <table border="1">
                    <thead> 
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((item, i) => (
                                <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                    <td className="header">
                                        <button className="edit_btn" onClick={() => editUser(item._id)}>
                                            <FontAwesomeIcon icon={faPenToSquare} /> Edit
                                        </button>
                                        <button className="del_btn" onClick={() => deleteUser(item._id)}>
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
