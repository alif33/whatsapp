import React from "react";

const ResetPass = () => {
  return (
    <div className="v-container my-5">
      <div className="auth-header">
        <img src="/img/logo.jpeg" />
      </div>
      <div className="auth-body">
        <div className="forgot-header">
          <h1>Reset Your Password?</h1>
          <p>
            Fear not.We'll email you reset instractions.If you can't reset your
            password.Please try again
          </p>
        </div>
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <button className="btn-submit mt-3" type="submit">
            Reset password
          </button>
          <button className="btn-alt my-5" type="button">
            Back to log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
