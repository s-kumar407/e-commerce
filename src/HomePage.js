
import { useEffect, useState, } from "react";
import { useNavigate } from 'react-router-dom';
function HomePage() {

    let [itemsArray, setitemsArray] = useState([]);
    let [itemName, setItemName] = useState("");
    let [cartArray, setCartArray] = useState([]);


    let navigate = useNavigate();

    useEffect(() => {

        let data = null;
        let items = [];

        const fetchItems = async () => {

            try {

                const response = await fetch('https://dummyjson.com/products');
                if (response.status === 200) {

                    data = await response.json();
                    items = data.products;

                    setitemsArray(items);

                } else {

                    alert("Not Found!!!");
                }

            } catch (error) {

                console.log('Error during fetching:', error.message);

            }

        }
        fetchItems();

    }, []);

    useEffect(() => {

        console.log("state changed!!!!");

    }, [itemsArray])


    function convertToLowerCaseKeepNumbers(inputString) {

        const stringWithoutSpaces = inputString.replace(/\s/g, '');

        const resultString = stringWithoutSpaces.replace(/[A-Z]/g, (match) => match.toLowerCase());

        return resultString;
    }

    function searchItem() {
        const foundItem = itemsArray.find((element) => {
            let Title = convertToLowerCaseKeepNumbers(element.title);
            itemName = convertToLowerCaseKeepNumbers(itemName);

            console.log(Title);
            console.log(itemName);

            return Title === itemName;
        });

        if (foundItem) {
            setItemName("");
            setitemsArray([foundItem]);

        } else {
            setItemName("");
            alert(itemName + " not found");
        }
    }



    function addToCart(element) {
        console.log(element);
        element.quantity = 1;
        if (element.stock > 0) {
            cartArray.push(element);
        }
        else {
            alert(element.title + " stock is empty!! ");
        }
        console.log(cartArray);
    }

    function goToCartPage() {
        if (cartArray.length === 0) {
            alert("please select atleast one item");
        }
        else {
            navigate("/cartPage", { state: { cartData: cartArray } });
        }
    }

    function sortByPrice() {
        const sortedArray = [...itemsArray].sort((a, b) => a.price - b.price);
        setitemsArray(sortedArray);
    }


    return (

        <>
            <div className="h-svh flex flex-col justify-between gap-5 ">
                <div className="h-20 w-screen bg-blue-950 text-white text-6xl ">
                    Home Page
                </div>
                <div className="flex justify-center gap-5" >
                    <div>
                        <input type="text" placeholder="search here...." className="border border-red-600" value={itemName} onChange={(e) => { setItemName(e.target.value) }} />
                        <button className="bg-blue-600 rounded text-sm w-20 text-white p-1" onClick={searchItem}>Search</button>
                    </div>

                    <button className="bg-blue-600 rounded text-sm w-20 text-white " onClick={goToCartPage}>Go To Cart</button>
                    <button className="bg-blue-600 rounded text-sm w-24 text-white " onClick={sortByPrice}>Sort By Price</button>

                </div>
                <div className="p-10">

                    <table className="border border-black w">
                        <thead>
                            <tr>
                                <th className="border border-black p-1">ID</th>
                                <th className="border border-black p-1">Title</th>
                                <th className="border border-black p-1">Brand</th>
                                <th className="border border-black p-1">Category</th>
                                <th className="border border-black p-1">Descriptions</th>
                                <th className="border border-black p-1">Stock</th>
                                <th className="border border-black p-1">Price</th>
                                <th className="border border-black p-1">Rating</th>
                                <th className="border border-black p-1">select your item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsArray.map(element => (

                                <tr key={element.id}>
                                    <td className="border border-black p-2">{element.id}</td>
                                    <td className="border border-black p-2">{element.title}</td>
                                    <td className="border border-black p-2">{element.brand}</td>
                                    <td className="border border-black p-2">{element.category}</td>
                                    <td className="border border-black p-2">{element.description}</td>
                                    <td className="border border-black p-2">{element.stock}</td>
                                    <td className="border border-black p-2">{element.price}</td>
                                    <td className="border border-black p-2">{element.rating}</td>
                                    <td className="border border-black p-2"><button className="bg-green-500 text-white text-[9px] rounded-sm p-1" onClick={() => addToCart(element)}>add to Cart</button></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                </div>


                <div className="h-20 w-full bg-blue-950 text-white text-5xl">
                    Footer
                </div>
            </div>


        </>




    )




}


export default HomePage;