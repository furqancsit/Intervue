import toast from "react-hot-toast";

export const getApiErrorMessage = (error, fallback) => {
  const message = error?.response?.data?.message;
  return typeof message === "string" && message.trim() ? message : fallback;
};

export const toastApiPromise = (promise, messages) =>
  toast.promise(promise, {
    loading: messages.loading,
    success: (response) =>
      response?.data?.message || response?.message || messages.success,
    error: (error) => getApiErrorMessage(error, messages.error),
  });
