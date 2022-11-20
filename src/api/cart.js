import MemoryContainer from "../containers/MemoryContainer.js"
import { logger } from "../logger/winston.js";

const cartApi = () => {
  try {
    const cart = new MemoryContainer();
    return cart;
  } catch (error) {
    logger.error("Products API - " + error);
  }
};

export default cartApi();
