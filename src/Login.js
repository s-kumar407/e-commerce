import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  
    const navigate=useNavigate();
    function Navigate (){
        navigate("/home");
    }
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            console.log(response);
            const data = await response.json();

            if (response.status === 200) {
               
                console.log('Login successful');
               localStorage.setItem("Token",data.token);
              Navigate();
            } else {
                

                console.log('Login failed!!!!');
                alert("Login Failed!!");
            }
        } catch (error) {
           
            console.log('Error during login:', error.message);
        }
    };
    return (
        <>

            <div className="h-dvh flex justify-center items-center">
                <div className="h-48 w-96 bg-blue-500 rounded-md text-center  p-7">
                    <div className="text-center">
                        <label>
                            Username:
                            <input type="text" value={username} onChange={handleUsernameChange} className="rounded text-sm p-1" placeholder="username" />
                        </label><br /><br />
                        <label>
                            Password:
                            <input type="password" value={password} onChange={handlePasswordChange} className="rounded text-sm p-1" placeholder="password" />
                        </label><br /><br />


                        <button className="bg-black text-white w-20 p-1 rounded-sm text-sm " onClick={handleLogin}>LogIn</button><br /><br />

                    </div>



                </div>


            </div>
        </>




    )




}


export default Login;