import React, { useState, useEffect } from 'react';
import profilePicPlaceholder from './assets/institudeprofile.jpg';
import './Profile.css'; 

const generateAvatarFromName = (name) => {
  const initials = name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
  return initials || 'I';
};

const InstituteProfilePage = () => {
  const [institute, setInstitute] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(profilePicPlaceholder);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedInstitute = JSON.parse(localStorage.getItem('institute')) || {};
    setInstitute(storedInstitute);
    setName(storedInstitute.name || '');
    setEmail(storedInstitute.email || '');
    setPhone(storedInstitute.phone || '');
    setAddress(storedInstitute.address || '');
    setProfilePic(storedInstitute.profilePic || profilePicPlaceholder);
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    if (!name || !email || !phone || !address) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const updatedInstitute = { ...institute, name, email, phone, address, profilePic };
    localStorage.setItem('institute', JSON.stringify(updatedInstitute));
    setInstitute(updatedInstitute);
    setSuccess('Profile updated successfully');
    setError('');
    setIsLoading(false);

    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="institute-profile">
      <h2>Institute Profile</h2>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="profile-picture">
        <h3>Profile Picture</h3>
        <img
          src={profilePic || generateAvatarFromName(name)}
          alt="Institute Profile"
          className="profile-image"
        />
        <input type="file" onChange={handleProfilePicChange} />
      </div>

      <h3>General Information</h3>
      <div className="input-group">
        <input
          type="text"
          placeholder="Institute Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button onClick={handleUpdateProfile} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
};

export default InstituteProfilePage;
