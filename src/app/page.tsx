import Image from "next/image";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";
import Chat from "./chatSection/chat";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Chat />
    </div>
  );
}

