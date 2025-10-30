import { redirect } from "next/navigation";

const Page = () => {
  redirect("/admin/home/overview");
  return (
    <div>
      {/* Example page content */}
      <p className="text-gray-700">Hello from admin</p>
    </div>
  );
};
export default Page;
