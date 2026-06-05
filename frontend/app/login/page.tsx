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
    <main className="flex min-h-screen">
      {/* 왼쪽 영역 */}
      <section className="flex w-1/2 items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">이미지 영역</h2>

          {/* 나중에 이미지 넣을 자리 */}
          <div className="flex h-96 w-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-400">
            이미지
          </div>
        </div>
      </section>

      {/* 오른쪽 영역 */}
      <section className="flex w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-md rounded-xl border p-8 shadow-lg">
          <h1 className="mb-6 text-center text-4xl font-bold">
            🍸 주말
          </h1>

          <button
            onClick={handleGoogleLogin}
            className="w-full rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800 cursor-pointer"
          >
            Google 로그인
          </button>
          
          {/* <button
            onClick={handleKakaoLogin}
            className="rounded-lg bg-yellow-400 px-6 py-3 text-black"
          >
            Kakao 로그인
          </button> */}
        </div>
      </section>
    </main>
  );
}