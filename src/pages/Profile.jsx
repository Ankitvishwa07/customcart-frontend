import { useState } from "react";

const Profile = () => {
  const [user] = useState({
    name: "Ankit Vishwakarma",
    email: "ankit@gmail.com",
    phone: "+91 9876543210",
  });

  const [soldItems] = useState([
    { id: 1, name: "VR Headset", price: "$499" },
    { id: 2, name: "Gaming Mouse", price: "$79" },
  ]);

  const [boughtItems] = useState([
    { id: 3, name: "Smart Watch", price: "$249" },
    { id: 4, name: "Bluetooth Speaker", price: "$99" },
  ]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or use useNavigate
  };

  return (
    <div className="profile-container">
      {/* LEFT SIDE - USER CARD */}
      <div className="profile-card">
        <div className="avatar">{user.name.charAt(0)}</div>

        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.phone}</p>

        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      {/* RIGHT SIDE - ACTIVITY */}
      <div className="profile-activity">
        {/* Sold Items */}
        <div className="activity-section">
          <h3>Items Sold</h3>
          {soldItems.length === 0 ? (
            <p>No items sold yet.</p>
          ) : (
            soldItems.map((item) => (
              <div className="activity-item" key={item.id}>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))
          )}
        </div>

        {/* Bought Items */}
        <div className="activity-section">
          <h3>Items Bought</h3>
          {boughtItems.length === 0 ? (
            <p>No items bought yet.</p>
          ) : (
            boughtItems.map((item) => (
              <div className="activity-item" key={item.id}>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
