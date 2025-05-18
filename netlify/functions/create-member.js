const AdminAPI = require('@tryghost/admin-api');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    const { firstName, lastName, email } = Object.fromEntries(new URLSearchParams(event.body));
    if (!email) {
        return {
            statusCode: 400,
            body: 'Email is required'
        };
    }

const ghostAdmin = require('@tryghost/admin-api');

const api = ghostAdmin({
  url: process.env.GHOST_ADMIN_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: 'v5.0'
});


    try {
        await api.members.add({
            email,
            name: `${firstName || ''} ${lastName || ''}`.trim(),
            labels: ['Netlify']
        });

        return {
            statusCode: 200,
            body: 'Success'
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`
        };
    }
};

