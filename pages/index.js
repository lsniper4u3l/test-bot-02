import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// โหลด `@twa-dev/sdk` แบบ dynamic เฉพาะเมื่อทำงานใน client-side
const WebApp = dynamic(() => import('@twa-dev/sdk'), { ssr: false });

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // ตรวจสอบว่า WebApp ถูกโหลดมาแล้วและ initDataUnsafe มีข้อมูล user
    if (WebApp && WebApp.initDataUnsafe?.user) {
      setUserData(WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <main className="p-4">
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">User Data</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name || 'N/A'}</li>
            <li>Username: {userData.username || 'N/A'}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}

export default Home;
