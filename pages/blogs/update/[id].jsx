/*
Update page
It populates the blog data into the form.
*/
import Head from "next/head";
import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Blog({ blog }) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const updateBlog = async (data) => {
    const response = await fetch(`/api/blogs/articles/${blog._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // serialisation
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json(); // deserialise
    if (result.error) {
      alert("Error: " + result.error);
    } else {
      alert("Blog updated");
      window.location.href = "/blogs";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

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
        <title>Update {blog.title}</title>
      </Head>

      <div style={{ margin: "1rem" }}>
        <form onSubmit={handleSubmit(updateBlog)}>
          <h1>Update Blog</h1>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            {...register("title", { required: true })}
            placeholder="Blog Title"
            defaultValue={blog.title}
          />
          <br />

          <label htmlFor="category">Category</label>
          <select id="category" {...register("category", { required: true })}>
            <option value="">Select...</option>
            <option value="news">News</option>
            <option value="life">Life</option>
          </select>
          <br />
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            id="text"
            {...register("content")}
            placeholder="About you"
            defaultValue={blog.content}
          />
          <br />
          <input type="submit" />
          <p>{data}</p>
          <br />
        </form>
      </div>

      <Link href="/blogs">Back</Link>
    </>
  );
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug("params", params);
  const res = await fetch(
    `http://localhost:3000/api/blogs/articles/${params.id}`
  );
  const blog = await res.json();
  console.debug("blog 1", blog);
  return { props: { blog } };
}
