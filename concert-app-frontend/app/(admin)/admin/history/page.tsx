const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/admin/history`,
    {
      cache: "no-store", // optional: always fresh data
    },
  );
  const data = await res.json();
  console.log(data);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Date time</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Concert name</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.createdAt}</td>
              <td className="border p-2">{item.user.username}</td>
              <td className="border p-2">{item.concert.name}</td>
              <td className="border p-2">{item.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Page;
