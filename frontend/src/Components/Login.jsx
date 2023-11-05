import { useState } from "react";
import axios from 'axios';
export default function Login() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const { googleAuth, isAuth } = useContext(userContext);
    const [showModal, setShowModal] = useState(false);
    const [Type, setType] = useState("password");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !email || !password){
        alert("Fill complete Details") 
        return;}
        axios.post("/api/user/login",{email,password})
        .then(res =>{console.log(res)})
        .catch(err=>{console.log(err)})
    }


    const changeType = (e) => {
        if (Type == "password")
            setType("text");
        else
            setType("password");
    }

    return (
        <div>
            <section className="vh-100 d-flex ao" style={{ backgroundColor: "#eee" }}>
                <div className="container ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control" onChange={e => setUsername(e.target.value)} />
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" onChange={e => setEmail(e.target.value)} />
                                                        <label className="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type={Type} id="form3Example4c" className="form-control" onChange={e => setPassword(e.target.value)} />

                                                        <div className='d-flex '>
                                                            <p>password</p>
                                                            <p className='ms-auto m-1 ' onClick={changeType} style={{ cursor: "pointer" }}> show Password</p></div>

                                                    </div>



                                                </div>






                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-sm mx-2" onClick={handleSubmit}>Log In</button>

                                                </div>
                                                <div className='d-flex justify-content-evenly'>


                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >

        </div >

    )
}