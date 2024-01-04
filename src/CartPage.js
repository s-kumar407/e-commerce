import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function CartPage() {

    let cartData = [];

    let location = useLocation();

    let [addORremove, setaddORremove] = useState(false);

    if (location.state && location.state.cartData) {

        cartData = location.state.cartData;
        console.log(cartData);

    }

    let total = 0;
    let count =0;

    function getTotal() {

        console.log(cartData.length)

        cartData.map(element => {

            console.log(element)

            total = total + element.price * element.quantity;

            count = count + element.quantity;

        });
    }

    getTotal();

    console.log(total);

    function add(element) {

        if (element.quantity >= 0 && element.stock !== 0) {
            element.quantity = element.quantity + 1;
            element.stock = element.stock - 1;
            setaddORremove(!addORremove);
        }

        else {

            alert(element.title + " stock is Empty!!!!");

        }
    }

    function remove(element) {

        if (element.quantity >= 1) {
            element.quantity = element.quantity - 1;
            element.stock = element.stock + 1;
            setaddORremove(!addORremove);
        }

        else {

            alert("Select one " + element.title + " peice atleat!!");

        }

    }

    return (
        <>

            <div className=" m-5 p-2 text-white bg-gray-700 rounded-md gap-1">
                <div className=" text-lg font-bold ">Selected Items : {count}</div>

                <table className="border-[2px]">
                    <thead>
                        <tr>
                            <th className="border border-white p-1">S.No</th>
                            <th className="border border-white p-1">Title</th>
                            <th className="border border-white p-1">Brand</th>
                            <th className="border border-white p-1">Category</th>
                            <th className="border border-white p-1">Descriptions</th>
                            <th className="border border-white p-1">Stock</th>
                            <th className="border border-white p-1">Price</th>
                            <th className="border border-white p-1">Rating</th>
                            <th className="border border-white p-1">Quantity</th>
                            <th className="border border-white p-1 text-sm">Add or Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map((element) => (
                            <tr key={element.id}>
                                <td className="border border-white p-2">{element.id}</td>
                                <td className="border border-white p-2">{element.title}</td>
                                <td className="border border-white p-2">{element.brand}</td>
                                <td className="border border-white p-2">{element.category}</td>
                                <td className="border border-white p-2">{element.description}</td>
                                <td className="border border-white p-2">{element.stock}</td>
                                <td className="border border-white p-2">{element.price}</td>
                                <td className="border border-white p-2">{element.rating}</td>
                                <td className="border border-white p-2">{element.quantity}</td>
                                <td className="border border-white p-2"><button className="bg-green-500 rounded-sm p-1 m-1 font-bold" onClick={() => add(element)}>+</button> <button className="bg-red-500 rounded-sm p-[6px] m-1 font-bold " onClick={() => remove(element)} > - </button></td>
                            </tr>


                        ))}
                    </tbody>
                </table>



            </div>



            <div className="flex justify-center ">
                <div className="flex bg-gray-700 text-white rounded-md p-3 m-1">
                    <div>Your Total amount is : </div>
                    <div className="text-green-500 mx-1 font-bold">{total}</div>
                </div>
                <div >
                    <button className="w-12 bg-red-600 text-white font-bold m-1 p-3 rounded-md">Pay</button>
                </div>
            </div>
        </>
    )
}
export default CartPage;