import Link from "next/link";

const Page = () => {
  return (
    <main>
      <h1>Hello</h1>
      <div>
        <Link href="/admin">Admin</Link>
        <Link href="/user/1">User</Link>
      </div>
    </main>
  );
};
export default Page;
