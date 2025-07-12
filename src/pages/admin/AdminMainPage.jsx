import { useState } from "react";
import MediaStats from "../../components/admin/MediaStats";
import UserManage from "../../components/admin/UserManage";
import UserStats from "../../components/admin/UserStats";
import Layout from "../../components/Layout";
import MediaManage from "../../components/admin/media_manage/MediaManage";

const tabComponents = {
  "유저 관리": <UserManage />,
  "영상 관리": <MediaManage />,
  "유저 통계": <UserStats />,
  "영상 통계": <MediaStats />,
};

function AdminMainPage() {
  const [activeTab, setActiveTab] = useState("유저 관리");

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <div style={{ 
            width: "200px", 
            backgroundColor: "#121212", 
            color: "white", 
            padding: "20px",
            position: "fixed",
            height: "calc(100vh - 64px)",
            boxSizing: "border-box",
          }}>
          {Object.keys(tabComponents).map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                marginBottom: "20px",
                cursor: "pointer",
                fontWeight: activeTab === tab ? "bold" : "normal",
                borderBottom: "1px solid white",

              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div style={{
          paddingBottom: "5px",
          marginLeft: "200px",
          flex: 1, 
          padding: "20px" }}>
          {tabComponents[activeTab]}
        </div>
      </div>
    </Layout>
  );
}
export default AdminMainPage;