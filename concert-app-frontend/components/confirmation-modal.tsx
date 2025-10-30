export const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  action,
  type,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  action: string;
  type: "success" | "error";
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      <div className="bg-white rounded-md p-6 w-80">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to {action} this concert?
        </h3>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <form action={onConfirm}>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md ${
                type === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Yes, {action}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
