import Head from "next/head";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Page</title>
      </Head>
      <h1>About Page</h1>
      <p>About Siwach.</p>
      <Link href="/"></Link>
    </>
  );
}
