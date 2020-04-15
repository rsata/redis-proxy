"use strict";
/*
Automated systems tests confirm that the end-to-end system functions as specified.
These tests should treat the proxy as a black box to which an HTTP client connects and makes requests.
The proxy itself should connect to a running Redis instance.
The test should test the Redis proxy in its running state (i.e. by starting the artifact that would be started in production).
It is also expected for the test to interact directly with the backing Redis instance in order to get it into a known good state (e.g. to set keys that would be read back through the proxy).
*/
Object.defineProperty(exports, "__esModule", { value: true });
describe('server', function () {
    it('returns', function () {
        // const server = new Server();
        // server.run()
        // console.log(server);
        expect(7).toEqual(7);
    });
});
