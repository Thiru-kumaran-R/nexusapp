// hoc/withLoggedIn.js
import React from 'react';
import { useRouter } from 'next/router';
import { useSignal } from '@preact/signals-react';

import {authInfo} from "@/state";

const withLoggedIn = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const authInfoData = authInfo.value;
        const signalValue = useSignal(authInfo);

        React.useEffect(() => {
            if (!loggedIn.value) {
                router.push('/login');
            }
        }, [loggedIn.value, router]);

        return loggedIn.value ? <WrappedComponent {...props} /> : null;
    };
};

export default withLoggedIn;

export default withLoggedIn;
