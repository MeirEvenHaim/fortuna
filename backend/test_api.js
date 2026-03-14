import http from 'http';

const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null }));
        });

        req.on('error', e => reject(e));

        if (body) {
             req.write(JSON.stringify(body));
        }
        req.end();
    });
};

async function test() {
    try {
        console.log('Testing customer creation...');
        const customerRes = await request('POST', '/api/customers', {
            firstName: 'Test',
            lastName: 'User',
            email: `test${Date.now()}@test.com`,
            phone: '123456789'
        });
        console.log('Customer response:', customerRes);
        const customerId = customerRes.data.customerId;

        console.log('\nTesting comment creation...');
        const commentRes = await request('POST', '/api/comments', {
            entityType: 'customer',
            entityId: customerId,
            text: 'This is a test comment'
        });
        console.log('Comment created:', commentRes);
        const commentId = commentRes.data.commentId;

        console.log('\nFetching comments...');
        const fetchRes = await request('GET', `/api/comments/customer/${customerId}`);
        console.log('Fetched comments:', fetchRes);

        console.log('\nUpdating comment...');
        const updateRes = await request('PUT', `/api/comments/${commentId}`, {
             text: 'This is an updated comment'
        });
        console.log('Update response:', updateRes);

        console.log('\nRefetching comments to verify update...');
        const refetchRes = await request('GET', `/api/comments/customer/${customerId}`);
        console.log('Refetched comments:', refetchRes);

        console.log('\nDeleting comment...');
        const deleteRes = await request('DELETE', `/api/comments/${commentId}`);
        console.log('Delete response:', deleteRes);

        console.log('\nRefetching comments to verify deletion...');
        const finalFetchRes = await request('GET', `/api/comments/customer/${customerId}`);
        console.log('Final fetch:', finalFetchRes);

    } catch (e) {
         console.error('Test failed:', e);
    }
}

test();
