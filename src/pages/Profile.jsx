import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [listedProducts, setListedProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAll = async () => {
    try {
      const [profileRes, negoRes] = await Promise.all([
        axios.get("/api/auth/me", { headers }),
        axios.get("/api/negotiations/my", { headers }),
      ]);

      setUser(profileRes.data.user);
      setListedProducts(profileRes.data.listedProducts);
      setPurchasedProducts(profileRes.data.purchasedProducts);

      const myId = profileRes.data.user._id;
      const incoming = negoRes.data.negotiations.filter(
        (n) => n.seller._id === myId && n.status === "open"
      );
      setIncomingRequests(incoming);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAccept = async (negotiationId) => {
    setActionLoading(negotiationId);
    try {
      await axios.patch(`/api/negotiations/${negotiationId}/accept`, {}, { headers });
      alert("Offer accepted! Product marked as sold.");
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Error accepting offer.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (negotiationId) => {
    setActionLoading(negotiationId);
    try {
      await axios.patch(`/api/negotiations/${negotiationId}/reject`, {}, { headers });
      alert("Offer rejected. Product restored to available.");
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Error rejecting offer.");
    } finally {
      setActionLoading(null);
    }
  };

  const statusLabel = (status) => {
    if (status === "sold") return { label: "Sold", color: "green" };
    if (status === "under_negotiation") return { label: "Under Negotiation", color: "" };
    return { label: "Available", color: "#888" };
  };

  if (loading) return <div className="profile-container" style={{ justifyContent: "center" }}><p>Loading profile...</p></div>;
  if (error) return <div className="profile-container" style={{ justifyContent: "center" }}><p style={{ color: "red" }}>{error}</p></div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>

      <div className="profile-activity">

        {/* SECTION 1: Incoming Negotiation Requests */}
        <div className="activity-section">
          <h3>
            Negotiation Requests
            {incomingRequests.length > 0 && (
              <span style={{ background: "black", color: "#fff", borderRadius: "50%", padding: "2px 8px", fontSize: "0.75rem", marginLeft: "6px" }}>
                {incomingRequests.length}
              </span>
            )}
          </h3>
          {incomingRequests.length === 0 ? (
            <p style={{ color: "#888" }}>No pending negotiation requests.</p>
          ) : (
            incomingRequests.map((neg) => (
              <div key={neg._id} className="activity-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <span><strong>{neg.product?.productName}</strong> &mdash; &#8377;{neg.product?.productPrice}</span>
                  <span style={{ fontSize: "0.8rem", color: "#555" }}>Buyer: {neg.buyer?.name}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => navigate(`/inbox?negotiation=${neg._id}`)} style={{ padding: "0.3rem 0.8rem", background: "black", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
                    View Chat
                  </button>
                  <button onClick={() => handleAccept(neg._id)} disabled={actionLoading === neg._id} style={{ padding: "0.3rem 0.8rem", background: "black", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
                    {actionLoading === neg._id ? "..." : "Accept"}
                  </button>
                  <button onClick={() => handleReject(neg._id)} disabled={actionLoading === neg._id} style={{ padding: "0.3rem 0.8rem", background: "black", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
                    {actionLoading === neg._id ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SECTION 2: Items You Listed */}
        <div className="activity-section">
          <h3>Items You Listed ({listedProducts.length})</h3>
          {listedProducts.length === 0 ? (
            <p style={{ color: "#888" }}>You have not listed any items yet.</p>
          ) : (
            listedProducts.map((item) => {
              const { label, color } = statusLabel(item.productStatus);
              return (
                <div className="activity-item" key={item._id}>
                  <span style={{ flex: 1, textAlign: "left" }}>{item.productName}</span>
                  <span style={{ flex: 1, textAlign: "center" }}>&#8377;{item.productPrice}</span>
                  <span style={{ flex: 1, textAlign: "right", fontSize: "0.8rem", color }}>{label}</span>
                </div>
              );
            })
          )}
        </div>

        {/* SECTION 3: Items You Bought */}
        <div className="activity-section">
          <h3>Items You Bought ({purchasedProducts.length})</h3>
          {purchasedProducts.length === 0 ? (
            <p style={{ color: "#888" }}>You have not bought any items yet.</p>
          ) : (
            purchasedProducts.map((item) => (
              <div className="activity-item" key={item._id}>
                <span style={{ flex: 1, textAlign: "left" }}>{item.productName}</span>
                <span style={{ flex: 1, textAlign: "center" }}>&#8377;{item.productPrice}</span>
                <span style={{ flex: 1 }}></span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
