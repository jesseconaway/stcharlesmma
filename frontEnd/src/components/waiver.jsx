import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from './common/loading';

const Waiver = () => {

    let location = useLocation();
    let history = useHistory();
    const baseApiUri = "https://account.docusign.com"; //CHANGE IN PRODUCTION TO https://account.docusign.com
    const websiteUrl = 'https://scmma.herokuapp.com' //CHANGE IN PRODUCTION

    const authCodeUri = `${baseApiUri}/oauth/auth?response_type=code&scope=signature&client_id=9a9f2368-543a-4eed-a346-665af2a74647&redirect_uri=${websiteUrl}/waiver/sign`;

    const getAuthCode = () => {
        location.search === ""
            ? window.location.href = authCodeUri
            : history.push('/waiver/sign');
    }

    useEffect(() => {
        getAuthCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>
        <div className="container">
            <Loading />
        </div>
    </>);
}

export default Waiver;