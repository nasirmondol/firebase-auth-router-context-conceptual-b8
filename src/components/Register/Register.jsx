import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { googleSignIn, githubSignIn, createUser, handleUpdateProfile } = useAuth();


    const navigate = useNavigate();
    // Get input value
    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const img = event.target.image_url.value;
        const password = event.target.password.value;
        console.log(name, email, img, password);

        // password validation
        if(password.length < 6){
             return toast.error('Password should be at least 6 characters or longer')
        }
        // Create a new use
        createUser(email, password)
            .then(result => {
                handleUpdateProfile(name, img)
                setError(result.user)
                navigate('/')
                
            })
            .catch(error => {
                console.error(error)
            })

        setSuccess('User create successfully');
        setSuccess('');
        setError('');
        event.target.reset();
    }

    // Social login
    const handleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error)
            })
    }

    // Social login
    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Register</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body w-96">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Your name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" required name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image Url</span>
                                </label>
                                <input type="text" name="image_url" placeholder="Image url" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" required name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            {
                                error && <p>{error?.message}</p>
                            }
                        </form>
                        <div>
                            <p>Have an Account? <Link to="/login" className='text-green-500 '>Login now</Link></p>
                            {success && <p className="text-green-600">{success}</p>}
                        </div>
                    </div>
                </div>
                <div>

                    <button onClick={handleSignIn} className="btn btn-md w-[390px] mb-5  bg-yellow-400 text-white"> <FcGoogle className='text-2xl font-bold text-white'></FcGoogle> Google Login</button>
                    <br />
                    <button onClick={handleGithubSignIn} className="btn btn-md w-[390px]  bg-black text-white">Github Login</button>
                </div>
            </div>
        </div>
    );
};

export default Register;