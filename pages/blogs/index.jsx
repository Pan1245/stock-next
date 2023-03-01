import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  function deleteBlog(id) {
    fetch(`${process.env.APIURL}blogs/articles/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload(false);
      });
  }
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // fetch data from API
    fetch("/api/blogs/articles")
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setBlogs(data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <h1>Blogs</h1>
      <p style={{ margin: "0.4rem" }}>
        <Link href="/blogs/add">+New Blog</Link>
      </p>
      <table>
        <tbody>
          {blogs.map((blog) => {
            return (
              <tr key={blog._id}>
                <td>
                  <Link href={`/blogs/${blog._id}`}>{blog.title}</Link>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td>
                  <button href={`/blogs/update/${blog._id}`}>Update</button>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={() => deleteBlog(blog._id)}>
                    Delete
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p></p>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.APIURL}blogs/articles/`);
  const blogs = await res.json();
  return { props: { blogs } };
}
