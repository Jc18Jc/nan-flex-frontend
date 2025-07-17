import { useState } from "react";
import MediaManage from "../../components/admin/media_manage/MediaManage";
import MediaStats from "../../components/admin/media_stats/MediaStats";
import UserManage from "../../components/admin/user_manage/UserManage";
import UserStats from "../../components/admin/user_stats/UserStats";
import Layout from "../../components/Layout";

const tabComponents = {
  "유저 관리": () => <UserManage />,
  "영상 관리": () => <MediaManage />,
  "유저 통계": () => <UserStats />,
  "영상 통계": () => <MediaStats />,
};

function AdminMainPage() {
  const [activeTab, setActiveTab] = useState("유저 관리");
  const [tabKey, setTabKey] = useState(0);
  
  const handleTabClick = (tab) => {
    if (tab === activeTab) {
      setTabKey(prev => prev + 1);
    } else {
      setActiveTab(tab);
      setTabKey(prev => prev + 1);
    }
  };

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <Layout onClick = { () => { setActiveTab("유저 관리"); }}>
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
              onClick={() => handleTabClick(tab)}
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
          <ActiveTabComponent key={tabKey} />
        </div>
      </div>
    </Layout>
  );
}
export default AdminMainPage;