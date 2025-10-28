const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <h1>Hello {id}</h1>;
};
export default Page;
