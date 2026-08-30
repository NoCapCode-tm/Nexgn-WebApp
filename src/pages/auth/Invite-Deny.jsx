import React, { useState } from "react";
import styles from "./Invite-Deny.module.css";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import LoadingScreen from "../../components/Layout/LoadingScreen";

export default function InviteDeny() {
  const {email} = useParams()
   const [loading, setLoading] = useState(false);

  useEffect(()=>{
    (async()=>{
      setLoading(true)
    try {
        await axios.get(`${API_URL}admin/decline/${email}`,{withCredentials:true})
    } catch (error) {
      console.log("Something went wrong in declining Invite",error.message)
    }finally{
      setLoading(false)
    }
    })()
  },[email])
   return (
    <AuthLayout>
      <div className={styles.contentWrap}>
        <h1 className={styles.title}>Got it.</h1>
        <p className={styles.subtitle}>
          You have chosen not to register into<br />
          Nexgn. We respect your decision and<br />
          appreciate your consideration.
        </p>
      </div>
      {loading && (
                  <LoadingScreen
                    state="listening"
                    size={64}
                    theme="dark"
                    message="Signing Up"
                  />
                )}
    </AuthLayout>
  );
}