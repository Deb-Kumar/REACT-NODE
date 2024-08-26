import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/Env";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserAdd() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        gender: "",
        profilePic: null,
        countryCode: "+91",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

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
            const response = await axios.post(API_BASE_URL + '/user/add', data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Your data has been saved successfully!");
            navigate('/user/list');
        } catch (error) {
            toast.error("There was an error saving your data. Please try again.");
            console.error("Error submitting the form:", error);
        }
    };

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            age: "",
            gender: "",
            profilePic: null,
            countryCode: "+91",
        });
    };

    // Password Show and Hide Function
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="container">
            <h2>ADD USER IN DATABASE</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
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
                        placeholder="Enter Your Password"
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
                        {/* Country options */}
                        <option value="+91">India (+91)</option>
                        {/* Add other country options */}
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

                <button type="submit">Submit</button>
                <button type="reset" className="reset" onClick={handleReset}>
                    Reset
                </button>
            </form>
        </div>
    );
}

export default UserAdd;
