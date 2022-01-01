import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items:[],
    totalAmout:0
}
const cartReducer = (state, action) => {
    if(action.type == 'ADD'){
        // debugger;
        let toatalAM = state.totalAmount;
        if(!toatalAM){
            toatalAM = 0;
        }
        const updatedTotalAmount = toatalAM + action.item.price*action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem;
        let updatedItems;
        
        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            }
            console.log('updatedItem');
            console.log(updatedItem);
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        console.log('updatedItems');
        console.log(updatedItems);
        return {
            items:updatedItems,
            totalAmout:updatedTotalAmount
        }
    }
    if(action.type == 'REMOVE'){
        const updatedTotalAmount = state.totalAmount - action.item.price*action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem;
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item=>item.id !== action.id);
        }else{
            updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items:updatedItems,
            totalAmout:updatedTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = props =>{
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCardHandler = item => {
        dispatchCartAction({type:'ADD', item:item});
    }

    const removeItemFromCardHandler = id => {
        dispatchCartAction({type:'REMOVE', id:id});
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmout,
        addItem:addItemToCardHandler,
        removeItem:removeItemFromCardHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;
