import React, { useRef, useState } from "react";
import "../Login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(password, email);

    createUserWithEmailAndPassword(auth, email, password)
      .then((newUser) => {
        console.log(newUser);
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
        uploadBytesResumable(storageRef, file).then((res) => {
          console.log(res);
          getDownloadURL(storageRef).then((downloadedUrl) => {
            console.log(downloadedUrl);
            updateProfile(newUser.user, {
              displayName: displayName,
              photoURL: downloadedUrl,
            });

            setDoc(doc(db, "users", newUser.user.uid), {
              uid: newUser.user.uid,
              displayName: displayName,
              email: email,
              photoURL: downloadedUrl,
            });
            navigate("/dashboard");
            setLoading(false);
            console.log("newUser", newUser);
            localStorage.setItem("cName", displayName);
            localStorage.setItem("photoURL", downloadedUrl);
            localStorage.setItem("email", newUser.user.email);
            localStorage.setItem("uid", newUser.user.uid);
          });
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-boxes login-left"></div>
        <div className="login-boxes login-right">
          <h2 className="login-heading">Create Your Account</h2>
          <form onSubmit={submitHandler}>
            <input
              required
              className="login-input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              className="login-input"
              type="text"
              placeholder="Company Name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              required
              className="login-input"
              type="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              style={{ display: "none" }}
              className="login-input"
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                onSelectFile(e);
              }}
            />
            {imageUrl && (
              <img src={imageUrl} alt="preview" className="image-preview" />
            )}
            <input
              required
              className="login-input"
              type="button"
              value="Select Your Logo"
              onClick={() => {
                fileInputRef.current.click();
              }}
            />
            <button className="login-input login-btn" type="submit">
              {isLoading && (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              )}
              Submit
            </button>
          </form>
          <Link to="/login" className="register-link">
            Login in your Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
