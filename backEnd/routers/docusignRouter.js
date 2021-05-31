const express = require('express');
const axios = require('axios');
const docusign = require('docusign-esign');
const fs = require('fs');
const path = require('path');

const docusignRouter = express.Router();

docusignRouter.route('/').post(async (req, res) => {

    const clientId = process.env.CLIENT_ID;
    const baseUri = "https://account-d.docusign.com"; //CHANGE IN PRODUCTION TO https://account.docusign.com
    const authHeader = "Basic " + Buffer.from(`${clientId}:${process.env.SECRET_KEY}`).toString('base64');

    // const userEmail = req.body.email;
    // const userName = req.body.name;

    const returnUrl = 'http://localhost:3000/waiverSuccess';

    axios.post(baseUri + '/oauth/token', {
        "grant_type": "authorization_code",
        "code": req.body.authCode
    },
        {
            headers: {
                Authorization: authHeader
            }
        }).then(async (response) => {
            try {
                const accessToken = response.data.access_token;
                const userRes = await axios.get(baseUri + '/oauth/userinfo', {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                });
                const userBaseUri = userRes.data.accounts[0].base_uri;
                const userAccountId = userRes.data.accounts[0].account_id;
                const userEmail = req.body.email;
                const userName = req.body.name;

                const docsPath = path.resolve(__dirname, 'docusignFiles')
                const pdf1File = 'blueBeltTest.pdf'

                function makeEnvelope() {

                    let docPdfBytes;
                    docPdfBytes = fs.readFileSync(path.resolve(docsPath, pdf1File));

                    let envelope = new docusign.EnvelopeDefinition();
                    envelope.emailSubject = 'Sign the SCMMA Waiver';

                    let doc1 = new docusign.Document()
                        , doc1b64 = Buffer.from(docPdfBytes).toString('base64')
                        ;

                    doc1.documentBase64 = doc1b64;
                    doc1.name = 'SCMMA Waiver'; // can be different from actual file name
                    doc1.fileExtension = 'pdf';
                    doc1.documentId = '3';

                    envelope.documents = [doc1];

                    let signer1 = docusign.Signer.constructFromObject({
                        email: userEmail,
                        name: userName,
                        clientUserId: 1000,
                        recipientId: 1
                    });

                    // Create signHere fields (also known as tabs) on the documents,
                    // We're using anchor (autoPlace) positioning
                    //
                    // The DocuSign platform seaches throughout your envelope's
                    // documents for matching anchor strings. 
                    let signHere1 = docusign.SignHere.constructFromObject({
                        anchorString: '/sn1/',
                        anchorYOffset: '10', anchorUnits: 'pixels',
                        anchorXOffset: '20'
                    })
                        ;

                    let signer1Tabs = docusign.Tabs.constructFromObject({
                        signHereTabs: [signHere1]
                    });
                    signer1.tabs = signer1Tabs;

                    let recipients = docusign.Recipients.constructFromObject({
                        signers: [signer1]
                    });
                    envelope.recipients = recipients;

                    envelope.status = 'sent';

                    return envelope;
                }

                let dsApiClient = new docusign.ApiClient();

                dsApiClient.setBasePath(userBaseUri + '/restapi'); // <--- NOT SURE ABOUT THIS <--------------------

                dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
                let envelopesApi = new docusign.EnvelopesApi(dsApiClient);
                let envelopeId = null;

                let envelope = makeEnvelope()

                envelopeId = await envelopesApi.createEnvelope(userAccountId, { envelopeDefinition: envelope });

                function makeRecipientViewRequest() {
                    let viewRequest = new docusign.RecipientViewRequest();
                    viewRequest.returnUrl = returnUrl;
                    viewRequest.authenticationMethod = 'none';

                    // Recipient information must match embedded recipient info
                    // we used to create the envelope.
                    viewRequest.email = userEmail;
                    viewRequest.userName = userName;
                    viewRequest.clientUserId = 1000;

                    return viewRequest
                }

                let viewRequest = makeRecipientViewRequest();
                results = await envelopesApi.createRecipientView(userAccountId, envelopeId.envelopeId,
                    { recipientViewRequest: viewRequest });
                res.send(results.url);

            } catch (error) {
                console.log(error);
                res.status(400).send(error);
            }
        }).catch(error => {
            console.log(error);
            res.status(400).send(error);
        });

    // const apiClient = new docusign.ApiClient();
    // const authorizationUri = apiClient.getAuthorizationUri(process.env.CLIENT_ID, ["signature"], "http://localhost:5000/api/docusign", "code");
    // apiClient.generateAccessToken(process.env.CLIENT_ID, process.env.SECRET_KEY, req.authCode, (error, res) => {
    //     error ? console.log(error.message) : console.log(res);
    // });
    // apiClient.setBasePath(baseUri);
    // apiClient.addDefaultHeader('Authorization', authHeader);
})

module.exports = docusignRouter;