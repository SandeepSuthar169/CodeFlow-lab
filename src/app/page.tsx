import LougoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-guard";
import Image from "next/image";


 async function  Home() {

  const session = await requireAuth()
  
  const { user } = session

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello World</h1>
      {/* <Image 
        src={user.image!}
        alt="User Image"
        className="h-screen w-50 object-center  "

      /> */}
      <LougoutButton />
    </div>
  );
}

export default Home