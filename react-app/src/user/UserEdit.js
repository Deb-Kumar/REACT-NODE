import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/Env";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function UserEdit() {
    const { id } = useParams(); // Get the user ID from the URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        gender: "",
        profilePic: null,
        countryCode: "+91"
    });
    const [initialData, setInitialData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formStatus, setFormStatus] = useState(null);

    useEffect(() => {
        // Fetch the user's data to edit
        axios.get(`${API_BASE_URL}/user/${id}`)
            .then((response) => {
                setFormData(response.data);
                setInitialData(response.data); // Save the initial data to handle reset
            })
            .catch((error) => {
                console.error("Error fetching the user data:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/user/update/${id}`, data);
            setFormStatus("success");
            console.log("Form updated successfully:", response.data);
            navigate("/user/list"); // Redirect to the users list after successful update
        } catch (error) {
            setFormStatus("error");
            console.error("Error updating the form:", error);
        }
    };

    const handleReset = () => {
        if (initialData) {
            setFormData(initialData);
            setFormStatus(null);
        }
    };

    // Password Show and Hide Function.
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="container">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>

                <label htmlFor="phone">Phone:</label>
                <div className="phone-input">
                    <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        required
                    >
                        <option value="+91">India (+91)</option>
                        <option value="+1">USA (+1)</option>
                        {/* Add more country codes as needed */}
                    </select>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="profile-pic">Profile Picture:</label>
                <input
                    type="file"
                    id="profile-pic"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button type="submit">Update</button>
                <button type="reset" className="reset" onClick={handleReset} disabled={!initialData || JSON.stringify(formData) === JSON.stringify(initialData)}>
                    Reset
                </button>
            </form>
            {formStatus === "success" && (
                <p className="success-message">User data has been updated successfully!</p>
            )}
            {formStatus === "error" && (
                <p className="error-message">There was an error updating the user data. Please try again.</p>
            )}
        </div>
    );
}

export default UserEdit;
