import axios from "axios"

export async function purchaseProducts(items) {
  const itemsToAcquire = Array.from(items.entries()).map(([id, quantity]) => ({
        id_producto: id,
        stock_actual: quantity
      }));
  const response = await axios.patch(import.meta.env.VITE_SOCKET_SERVER_API_URL + "/connection/purchase", itemsToAcquire )
  return response.data.stocks
}