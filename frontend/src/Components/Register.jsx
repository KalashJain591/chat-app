import React, { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [Type, setType] = useState("password");
    const [Type1, setType1] = useState("password");
    // const { googleAuth, isAuth } = useContext(userContext);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const changeType = (e) => {
        if (Type == "password")
            setType("text");
        else
            setType("password");
    }
    const changeType1 = (e) => {
        if (Type1 == "password")
            setType1("text");
        else
            setType1("password");
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

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

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

                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type={Type1} id="form3Example4c" className="form-control" onChange={e => setPassword(e.target.value)} />

                                                        <div className='d-flex '>
                                                            <p>Confirm password</p>
                                                            <p className='ms-auto m-1 ' onClick={changeType1} style={{ cursor: "pointer" }}> show Password</p></div>

                                                    </div>





                                                </div>
                                                <div class="input-group m-2">
                                                    <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                                </div>
                                                <label className="form-label" for="form3Example3c">Your Profile</label>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-sm mx-2" onClick={handleSubmit}>Log In</button>

                                                </div>




                                                <div className='d-flex justify-content-evenly'>
                                                    {/* <NavLink to="/register"  > <p style={{ textDecoration: "underline", color: "blue" }}>New user ?</p></NavLink> */}
                                                    {/* <NavLink to="/forgot-password"> */}
                                                    {/* <p style={{ textDecoration: "underline", color: "blue" }}>Forgot Password ?</p></NavLink>*/}

                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
