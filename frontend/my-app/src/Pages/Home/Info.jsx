import { useEffect, useState, useContext } from "react";
import { getUserById } from "../../API/users.js";
import { UserContext } from "../../Hooks/UserContext.jsx";
import Section from "./Common/Section.jsx";
import "../../CSS/Info.css";

export default function Info({ onClose }) {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFullUserData = async () => {
      if (!user?.id) return; // הגנה למקרה שה-ID לא זמין לרגע
      try {
        const fullData = await getUserById(user.id);
        setUserData(fullData);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchFullUserData();
  }, [user?.id]); // הוספת התלות למניעת אזהרות של React

  if (!userData) return null;

  return (
    <div className="info-overlay" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>User Profile</h2>
        
        <Section
          title="General Information"
          fields={[
            { label: "ID", value: userData.id },
            { label: "Full Name", value: userData.name },
            { label: "Email", value: userData.email },
            { label: "Phone", value: userData.phone },
          ]}
        />

        <Section
          title="Location Details"
          fields={[
            { label: "City", value: userData.city },
            { label: "Street", value: userData.street },
            // אם השארת את השדות האלו ב-SQL ובטופס ה-Complete:
            { label: "Zip Code", value: userData.zipcode },
          ]}
        />

        {/* אם בחרת לצמצם את הדאטהבייס ולא שמרת מידע על חברה, אפשר להסיר את ה-Section הזה */}
        {userData.companyName && (
          <Section
            title="Company"
            fields={[
              { label: "Name", value: userData.companyName },
            ]}
          />
        )}
      </div>
    </div>
  );
}