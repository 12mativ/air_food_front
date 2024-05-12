import { AlertCircle } from "lucide-react";

export const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      <AlertCircle className="text-red-500" />
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );
};
