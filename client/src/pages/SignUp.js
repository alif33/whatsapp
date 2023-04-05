import { useForm } from "react-hook-form";
import { authPost, postData } from "../helper/HttpServices";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    postData("/register", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="v-container mt-5">
      <div className="auth-header">
        <img src="/img/logo.jpeg" />
      </div>
      <div className="auth-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Phone number"
              {...register("phoneNumber", { required: true })}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              {...register("userName", { required: true })}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              placeholder="Upload a photo"
            />
          </div>
          <button className="btn-submit mt-3" type="submit">
            Sign up
          </button>
          <h5 className="text-center my-3">OR</h5>
          <button className="btn-alt" type="button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
