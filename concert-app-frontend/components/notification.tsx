export const Notification = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => {
  return (
    <div
      className={`p-3 rounded-md fixed top-4 right-4 z-50 ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      <span className="text-white font-semibold">{message}</span>
    </div>
  );
};
