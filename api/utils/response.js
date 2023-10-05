export const setResponse = async (res, status, data) => {
  res
    .status(status)
    .header("cache-control", "no-cache, no-store")
    .header("pragma", "no-cache")
    .json(data);
};
