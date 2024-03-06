import { Inter } from "next/font/google";
import { ButtonDemo } from "@/components/ButtonDemo";
import { Button } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { logout, user, updateUser } = useAuth();
  return (
    <>
      <h2>App</h2>
      <ButtonDemo />
      {user ? (
        <>
          <h2>Hola {user?.username}</h2>
          <Button onClick={logout} primary>
            Log out
          </Button>
          <Button onClick={() => updateUser("username", "Ferbusini")}>
            Update user
          </Button>
        </>
      ) : (
        <Link href={"/join/sign-in"}>login</Link>
      )}
    </>
  );
}
