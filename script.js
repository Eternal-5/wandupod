
// Firebase 초기화 (자신의 Firebase 설정으로 교체 필요)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 게시판별 컬렉션 이름 매핑
const collectionMap = {
  "memory.html": "memoryPosts",
  "review.html": "reviewPosts",
  "share.html": "sharePosts",
  "archive.html": "archivePosts",
  "request.html": "requestPosts"
};

// 현재 페이지 파일명 파악
const path = window.location.pathname;
const page = path.substring(path.lastIndexOf("/") + 1);
const collectionName = collectionMap[page];

// 글쓰기 폼 처리
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  if (!form || !collectionName) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const tag = formData.get("tag") || `${formData.get("tag1")} ${formData.get("tag2")}`;
    const title = formData.get("title");
    const content = formData.get("content");

    try {
      await addDoc(collection(db, collectionName), {
        tag,
        title,
        content,
        createdAt: serverTimestamp()
      });
      alert("글이 등록되었습니다!");
      form.reset();
    } catch (error) {
      alert("등록 중 오류가 발생했어요.");
      console.error(error);
    }
  });
});
