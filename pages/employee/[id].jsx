import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EmployeePage(props) {
  const { employee } = props;

  if (!employee) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>Employees</title>
      </Head>
      <h1>
        {employee.first_name}, {employee.last_name}
      </h1>
      <div>
        <p>${employee.gender}</p>
        <p>${employee.age}</p>
        <p>${employee.phone}</p>
        <p>${employee.email}</p>
        <p>${employee.dpartment}</p>
        <p>${employee.job_title}</p>
        <p>${employee.years_of_experience}</p>
        <p>${employee.salary}</p>
      </div>
      <Link href="/employee">Back to Employee List</Link>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log(`Fetching Employee ID: ${context.params["id"]}`);
  console.debug(
    `Fetching ${process.env.APIURL}employee/${context.params["id"]}`
  );
  const ret = await fetch(
    `${process.env.APIURL}employee/${context.params["id"]}`
  );
  const employee = await ret.json();
  console.log(employee);
  return {
    props: {
      employee,
    },
  };
}
