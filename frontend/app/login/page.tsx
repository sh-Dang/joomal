"use client";

export default function Home() {
  const handleGoogleLogin = () => {
    // Spring Security가 자동으로 제공하는 OAuth2 로그인 시작 URL
    window.location.href =
      "http://localhost:9999/oauth2/authorization/google";
  };

//   const handleKakaoLogin = () => {
//     window.location.href =
//       "http://localhost:9999/oauth2/authorization/kakao";
//   };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">🍸 주말</h1>

      <p className="text-lg text-gray-600">
        한 주의 끝, 한 잔의 술
      </p>

      <button
        onClick={handleGoogleLogin}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Google 로그인
      </button>

      {/* <button
        onClick={handleKakaoLogin}
        className="rounded-lg bg-yellow-400 px-6 py-3 text-black"
      >
        Kakao 로그인
      </button> */}
    </main>
  );
}