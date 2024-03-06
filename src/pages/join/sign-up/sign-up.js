import { JoinLayout } from "@/layouts";
import styles from "./sign-up.module.scss";
import Link from "next/link";
import { RegisterForm } from "@/components/Auth";

export default function singUp() {
  return (
    <>
      <JoinLayout>
        <div className={styles.singUp}>
          <h3>Crear cuenta</h3>
          <RegisterForm />

          <div className={styles.actions}>
            <Link href="/join/sign-in">Sign in</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
