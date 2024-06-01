import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../reducer/FilterReducer";


const FilterContext = createContext();

const initialState = {
    filter_products : [],
    all_products : [],
    grid_view : true,
    sorting_value : "lowest",
    filters : {
        text : "",
        category : "all",
        company : "all",
        color : "all",
        maxPrice : 0,
        price : 0,
        minPrice : 0,
    },
}

const FilterContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState)

    const {products} = useProductContext();

    useEffect(()=>{
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products})
    }, [products])

    const setGridView = () =>{
        dispatch({type : "SET_GRIDVIEW"})
    }

    const setListView = () =>{
        dispatch({type : "SET_LISTVIEW"})
    }

    const sorting = (event) =>{
        const userSortValue = event.target.value
        dispatch({type : "GET_SORT_VALUE", payload : userSortValue})
    }

    const updateFilterValue = (event) =>{
        const name = event.target.name
        const value = event.target.value
        // console.log(name)
        // console.log(value)
        dispatch({type : "UPDATE_FILTER_VALUE", payload : {name, value} })
    }

    useEffect(()=>{
        dispatch({type : "FILTER_PRODUCTS"})
        dispatch({type : "SORTING_PRODUCTS"})
    }, [state.sorting_value, state.filters])

    const clearFilters = () =>{
        dispatch({type : "CLEAR_FILTERS"})
    }

    return (
    <>
        <FilterContext.Provider value={{...state, setGridView, setListView, sorting, updateFilterValue, clearFilters}}>
            {children}
        </FilterContext.Provider>
    </>)
}


export const useFilterContext = () =>{
    return useContext(FilterContext);
}
 
export default FilterContextProvider;