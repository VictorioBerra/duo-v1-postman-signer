# duo-v1-postman-signer
Use the Duo v1 API via sha1 using the v2 signature all inside Postman.

## Usage

Copy contents of `index.js` to Postman Pre-request scripts tab. Edit the top few variables, update your headers with the variable syntax {{var}}.

Read the comments.

## Notes

I used https://github.com/duosecurity/duo_api_nodejs/blob/master/lib/duo_sig.js to get an idea of how to sign since their docs did not help much.

Feel free top auto parse the hostname, path and params out of `request.url`. Not that the `URL` class is not avalaible in the Postman Sandbox https://www.getpostman.com/docs/v6/postman/scripts/postman_sandbox.

## License

MIT
