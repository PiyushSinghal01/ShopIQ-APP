const reducer = (state, action) =>{
    switch(action.type)
    {
        case "LOAD_FILTER_PRODUCTS" : 
        const priceArr = action.payload.map((curElem) => {
            return curElem.price
        })

        let maxPrice = Math.max(...priceArr)

        return {
            ...state,
            filter_products : [...action.payload],
            all_products : [...action.payload],
            filters : {
                ...state.filters,
                maxPrice : maxPrice,
                price : maxPrice,
            }
        }

        case "SET_GRIDVIEW" : 
        return {
            ...state,
            grid_view : true,
        }

        case "SET_LISTVIEW" : 
        return {
            ...state,
            grid_view : false,
        }
        
        case "GET_SORT_VALUE" :
            return {
                ...state,
                sorting_value : action.payload,
            }
            

        case "SORTING_PRODUCTS" :
            let {filter_products} = state;
            let tempSortProducts = [...filter_products];
            let newSortData;

            switch(state.sorting_value)
            {
                case "a-z" :
                newSortData = tempSortProducts.sort((a,b) =>{
                    return a.name.localeCompare(b.name);
                })
                break;

                case "z-a" : 
                newSortData = tempSortProducts.sort((a,b) =>{
                    return b.name.localeCompare(a.name);
                })
                break;

                // case "lowest" : 
                // newSortData = tempSortProducts.sort((a,b) =>{
                //     return a.price - b.price
                // })
                // break;
                
                case "highest" : 
                newSortData = tempSortProducts.sort((a,b) =>{
                    return b.price - a.price
                })
                break;
                
                default :
                newSortData = tempSortProducts.sort((a,b) =>{
                    return a.price - b.price
                })
            }

            return{
                ...state,
                filter_products : newSortData,
            }

        case "UPDATE_FILTER_VALUE" : 
            const {name, value} = action.payload
            return{
                ...state,
                filters : {
                    ...state.filters,
                    [name] : value,
                }
            }

        case "FILTER_PRODUCTS" : 
            let {all_products} = state;
            let tempFilterProduct = [...all_products]
            let {text, category, company, color, price} = state.filters

            if(text)
            {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);
                })
            }

            if(category !== "all")
            {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.category === category;
                }) 
            }

            if(company !== "all")
            {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.company === company;
                }) 
            }

            if(color !== "all")
            {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.colors.includes(color)
                }) 
            }

            if(price)
            {
                tempFilterProduct = tempFilterProduct.filter((curElem) =>{
                    return curElem.price <= price
                })
            }

            return{
                ...state,
                filter_products : tempFilterProduct
            }

        case "CLEAR_FILTERS" : 
            return{
                ...state,
                filters : {
                    text : "",
                    category : "all",
                    company : "all",
                    color : "all",
                    maxPrice : state.filters.maxPrice,
                    price : state.filters.maxPrice,
                    minPrice : 0,
                }
            }
            
        default : return state;
    }
}

export default reducer;