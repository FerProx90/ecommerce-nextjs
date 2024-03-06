import styles from "./sign-in.module.scss";
import Link from "next/link";
import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";

export default function signIn() {
  return (
    <>
      <JoinLayout>
        <div className={styles.signIn}>
          <h3>Sign in please</h3>
          <LoginForm />
          <div className={styles.actions}>
            <Link href="/join/sign-up">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
