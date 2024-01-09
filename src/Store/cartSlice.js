import { createSlice } from '@reduxjs/toolkit';
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save cart state to localStorage
const saveCartState = (state) => {
  
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState() || {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      saveCartState(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      saveCartState(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
