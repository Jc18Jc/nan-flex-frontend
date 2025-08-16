import { useEffect, useState } from "react";

export default function UserSection({profilesFromParent, noSearchResult}) {
  const [profiles, setProfiles] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [profilesPage, setProfilesPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [manageProfile, setManageProfile] = useState(null);
  
  const isSearchMode = profilesFromParent !== null || noSearchResult;

  const fetchProfiles = async (pageNumber) => {
    const res = await fetch(`/api/profile/all?page=${pageNumber}&size=30`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("유저 리스트 조회 실패");
    const body = await res.json();
    const list = body.data.content;

    setProfiles(list);
    setHasMore(!body.data.last);
  };
  
  const handleDelete = async () => {
    const res = await fetch(`/api/profile/${manageProfile.authId}`, {
      credentials: "include",
      method: "DELETE"
    });

    if (!res.ok) throw new Error("유저 정보 삭제 실패");
    profiles.forEach(profile => {
      if (profile.authId === manageProfile.authId) {
        profile.removedAt = new Date();
      }
    });
    alert("삭제 성공했습니다.");
    setShowDeleteModal(false);
  }

  const handleRestore = async () => {
    const res = await fetch(`/api/profile/restore/${manageProfile.authId}`, {
      credentials: "include",
      method: "PUT"
    })

    if (!res.ok) throw new Error("유저 정보 복구 실패");
    profiles.forEach(profile => {
      if (profile.authId === manageProfile.authId) {
        profile.removedAt = null;
      }
    });
    alert("복구 성공했습니다.");
    setShowRestoreModal(false);
  }

  useEffect(() => {
    if (!isSearchMode) {
      fetchProfiles(profilesPage);
    }
  }, [profilesPage, isSearchMode]);

  useEffect(() => {
    if (isSearchMode) {
      setProfiles(profilesFromParent);
    }
  }, [profilesFromParent]);
  

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginTop: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
            justifyContent: "flex-start",
          }}
        >
          {noSearchResult && (
            <div>
              검색결과가 없습니다.
            </div>
          )}
          {!noSearchResult && profiles && profiles.map((profile) => (
            <div
              key={profile.authId}
              style={{
                flex: "1 1 45%",
                maxWidth: "40%",
                minWidth: "350px",
                border: "1px solid #444",
                padding: "1rem",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: "#1e1e1e",
                boxSizing: "border-box",
                margin: "8px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end"}}>
                {profile.removedAt != null ? 
                  <img
                    src="/home/images/restore.png"
                    alt="복구"
                    style={{ width: "12px", height: "12px" }}
                    onClick={() => {
                      setShowRestoreModal(true);
                      setManageProfile(profile);
                    }}
                  /> :
                  <img
                    src="/home/images/x.png"
                    alt="삭제"
                    style={{ width: "12px", height: "12px" }}
                    onClick={() => {
                      setShowDeleteModal(true);
                      setManageProfile(profile);
                    }}
                  />
                }
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                {profile.gender === "MALE" ? 
                  <img
                    src="/home/images/user_male.png"
                    alt="남성 유저"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  /> :
                  <img
                    src="/home/images/user_female.png"
                    alt="여성 유저"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                }

                <div style={{ overflowWrap: "break-word" }}>
                  <div>고유 번호: {profile.authId}</div>
                  <div>아이디: {profile.loginId}</div>
                  <div>닉네임: {profile.nickname}</div>
                  <div>성별: {profile.gender === "MALE" ? "남성" : "여성"}</div>
                  <div>생일: {profile.birthDate} &#40;{profile.age}세&#41;</div>
                  <div>조회수: {profile.viewCount}</div>
                  <div>
                    선호 카테고리:
                  </div>
                  <div>
                    {" "}
                    {profile?.preferCategories?.length > 0 ? (
                      profile.preferCategories.map((cat, idx) => (
                        <span key={idx}>#{cat} </span>
                      ))
                    ) : (
                      <span>시청 기록이 없습니다.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(showDeleteModal && manageProfile != null) && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#2c2c2c",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
              color: "#fff",
              zIndex: 1000,
            }}
          >
            <h3>정말 삭제하시겠습니까?</h3>
            <p>{manageProfile.loginId} 유저가 삭제됩니다.</p>
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={handleDelete}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#d9534f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                삭제
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#555",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                취소
              </button>
            </div>
          </div>
        )}

        {(showRestoreModal && manageProfile != null) && (
         <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#2c2c2c",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
              color: "#fff",
              zIndex: 1000,
            }}
          >
            <h3>정말 복구하시겠습니까?</h3>
            <p>{manageProfile.loginId} 유저가 복구됩니다.</p>
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={handleRestore}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#d9534f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                복구
              </button>
              <button
                onClick={() => setShowRestoreModal(false)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#555",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                취소
              </button>
            </div>
          </div>
        )}

        {!isSearchMode && (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <button onClick={() => setProfilesPage((prev) => Math.max(prev - 1, 0))} disabled={profilesPage === 0}>
              이전
            </button>
            <span>{profilesPage + 1} 페이지</span>
            <button onClick={() => setProfilesPage((prev) => prev + 1)} disabled={!hasMore}>
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}