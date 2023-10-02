import { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { CreateContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const { googleSignIn, githubSignIn, handleSignIn } = useContext(CreateContext);

    const handleSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        if(password.length < 6){
            return toast.error('password should be 6 character or longer');
        }
            handleSignIn(email, password)
            .then(result =>{
                console.log(result.user)
            })
            .catch(error =>{
                console.log(error.message);
            })
        event.target.reset();
    }

   

    const handleSignInGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error)
            })
    }

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
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body w-96">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input required type="text" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input required type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>
                            <p>New here? <Link to="/register" className='text-green-500 '>Register please</Link></p>
                        </div>
                    </div>

                </div>
                <div>

                    <button onClick={handleSignInGoogle} className="btn btn-md w-[390px] mb-5  bg-yellow-400 text-white"> <FcGoogle className='text-2xl font-bold text-white'></FcGoogle> Google Login</button>
                    <br />
                    <button onClick={handleGithubSignIn} className="btn btn-md w-[390px]  bg-black text-white">Github Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;