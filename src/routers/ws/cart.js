import cartApi from "../../api/cart.js";

export default function addCartHandlers(socket, sockets) {
  let cart = cartApi.listAll();
  socket.emit("cart", cart);

  // socket.on("newProduct", async (product) => {
  //   await productsApi.save(product);
  //   products = await productsApi.listAll();
  //   sockets.emit("products", products);
  // });
}
