import Head from "next/head";
import Link from "next/link";

export default function Home(props) {
  const { employees } = props;

  if (!employees) return <div>Loading...</div>;

  const list = employees.map((employee) => (
    <li key={employee.id}>
      <Link href={`/employee/${employee.id}`}>{employee.first_name}</Link>
    </li>
  ));

  return (
    <>
      <Head>
        <title>Employees</title>
      </Head>
      <h1>Employees</h1>
      <div>
        <ul>{list}</ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  console.debug(`Fetching ${process.env.APIURL}employee`);
  const ret = await fetch(`${process.env.APIURL}employee`);
  const employees = await ret.json();
  console.log({ employees });
  return {
    props: {
      employees,
    },
  };
}
