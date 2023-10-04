export const setResponse = async (res, status, data) => {
  res
    .status(status)
    .header("cache-control", "no-cache, no-store, must-revalidate")
    .header("pragma", "no-cache")
    .json(data);
};
