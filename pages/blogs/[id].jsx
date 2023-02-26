import Head from "next/head";
import Link from "next/link";

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Blog({ blog }) {
  console.log("blog 2", blog);
  if (!blog)
    return (
      <div>
        <p>Blog not found</p>
        <Link href="/blogs">Back</Link>
      </div>
    );
  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <Link href="/blogs">Back</Link>
    </>
  );
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug("params", params);
  const res = await fetch(
    `${process.env.APIURL}blogs/articles/${params.id}`
  );
  const blog = await res.json();
  console.debug("blog 1", blog);
  return { props: { blog } };
}
