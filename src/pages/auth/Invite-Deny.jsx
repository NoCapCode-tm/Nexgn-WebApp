import React from "react";
import styles from "./Invite-Deny.module.css";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

export default function InviteDeny() {
  const {email} = useParams()

  useEffect(()=>{
    (async()=>{
      await axios.get(`${API_URL}admin/decline/${email}`,{withCredentials:true})
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
    </AuthLayout>
  );
}