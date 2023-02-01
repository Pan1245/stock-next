import Head from "next/head";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Siwach Page</title>
      </Head>
      <h1>Siwach Page</h1>
      <p>This is a sample page for Siwach</p>
      <Link href="/about">About</Link>
    </>
  );
}
