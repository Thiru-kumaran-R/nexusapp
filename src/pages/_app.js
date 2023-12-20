import 'react-tagsinput/react-tagsinput.css'; // If you want the default styling
import '@/styles/globals.css'
import {useEffect} from "react";
import {useGlobalState} from "@/state";
import App from 'next/app';
import {loadUserFromStorage} from "@/auth/AuthService";


function MyApp({ Component, pageProps,userPayload }) {

  const [user,setUser] = useGlobalState("user");
  useEffect(() => {
    setUser(userPayload)
  }, []);
  return <Component {...pageProps} />
}


MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  let userPayload = null;
  if (typeof window === 'undefined') {
    // Server-side-only code

    const jwt = (await import('jsonwebtoken')).default;
    // Decode the JWT on the server-side
    const { req } = appContext.ctx;


    if (req) { // Check if it's a server-side call
      const token = req.cookies.accessToken; // You need to parse cookies from the request
      if (token) {

        try {
          userPayload = await  jwt.verify(token, process.env.JWT_SECRET)

        }catch (e) {
          console.log(e)
        }

      }
  }



  }else{
    console.log("client")
    loadUserFromStorage()

  }

  // Return the userPayload along with the usual props
  return { ...appProps, userPayload };
};

export default MyApp;