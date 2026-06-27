import { database } from "../firebase/firebase";
import { ref, get, push, set, remove, update } from "firebase/database";

// ==========================================
// PRODUCTS
// ==========================================

// Get all products
export const getProducts = async () => {
  try {
    const productsRef = ref(database, "products");
    const snapshot = await get(productsRef);

    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, value]) => ({
        id,
        ...value,
      }));
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Add Product
export const addProduct = async (product) => {
  const productsRef = ref(database, "products");
  const newProductRef = push(productsRef);

  await set(newProductRef, product);
};

// Delete Product
export const deleteProduct = async (id) => {
  await remove(ref(database, `products/${id}`));
};

// Update Product
export const updateProduct = async (id, product) => {
  await update(ref(database, `products/${id}`), product);
};

// Get Product By ID
export const getProductById = async (id) => {
  const snapshot = await get(ref(database, `products/${id}`));

  if (snapshot.exists()) {
    return {
      id,
      ...snapshot.val(),
    };
  }

  return null;
};

// ==========================================
// ORDERS
// ==========================================

// Place Order
export const placeOrder = async (order) => {
  try {
    const ordersRef = ref(database, "orders");
    const newOrderRef = push(ordersRef);

    await set(newOrderRef, order);

    return true;
  } catch (error) {
    console.error("Error placing order:", error);
    return false;
  }
};

// Get All Orders
export const getOrders = async () => {
  try {
    const snapshot = await get(ref(database, "orders"));

    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, value]) => ({
        id,
        ...value,
      }));
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Update Order Status
export const updateOrderStatus = async (id, status) => {
  try {
    await update(ref(database, `orders/${id}`), {
      status,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};