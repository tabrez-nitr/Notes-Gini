import { addToast } from "@heroui/react";

export function showSuccessToast(title = "Success!", description = "Action completed.") {
  addToast({
    title,
    description,
    color: "success", // green toast
  });
}