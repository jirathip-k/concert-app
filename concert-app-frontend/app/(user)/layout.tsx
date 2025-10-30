import { ConcertProvider } from "@/context/concert";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`, {
    cache: "no-store", // optional: always fresh data
  });
  const concerts = await res.json();
  return (
    <ConcertProvider concerts={concerts}>
      <div>{children}</div>
    </ConcertProvider>
  );
};
export default Layout;
