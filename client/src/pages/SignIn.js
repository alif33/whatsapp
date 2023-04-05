import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authPost, postData } from "../helper/HttpServices";
import { logedIn } from "../store/auth/actions";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        postData("/login", data)
            .then(res=>{
                if(res.success){
                    const { token, user } = res;
                    dispatch(logedIn({token, user}))
                    navigate("/chat-list")
                }
            })
            .catch(err=>{
                console.log(err);
            })
 
    };

    return(
        <div className="v-container mt-5">
            <div className="auth-header">
                <img
                    src="/img/logo.png"
                />
            </div>
            <div className="auth-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Username"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Username"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <button className="btn-submit mt-3" type="submit">Log in</button>
                    <h5 className="text-center my-3">OR</h5>
                    <button className="btn-alt" type="button">Sign up</button>
                </form>
            </div>
        </div>
    )
}