import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  function deleteStock(id) {
    fetch(`${process.env.NEXT_PUBLIC_API}stock/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload(false);
      });
  }
  const [stock, setStock] = useState([]);

  useEffect(() => {
    // fetch data from API
    fetch("/api/stock/products")
      .then((res) => res.json())
      .then((data) => {
        // do something with data
        console.log(data);
        setStock(data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Stock</title>
      </Head>
      <h1>Stock</h1>
      <table>
        <tbody>
          {stock.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>
                  <Link href={`/stock/${stock._id}`}>{stock.name}</Link>
                </td>
                <td>
                  <button onClick={() => deleteStock(stock._id)}>Delete</button>{" "}
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}stock/products/`);
  const stock = await res.json();
  return { props: { stock } };
}
