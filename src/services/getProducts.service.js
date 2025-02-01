import axios from "axios"

export async function getProducts({page, limit=50, search}) {
  let url = import.meta.env.VITE_SOCKET_SERVER_API_URL + "/connection";

  const params = [];

  if (page) params.push(`page=${page}`);
  if (limit) params.push(`limit=${limit}`);
  if (search) params.push(`search=${search}`);

  if(params.length !== 0) {
    url += "?" + params.join("&");
  }

  const response = await axios.get(url)
  return {
    data: response.data.stocks,
    pages: response.data.pages
  }
}

