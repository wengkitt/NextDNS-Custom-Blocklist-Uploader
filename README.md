# NextDNS Custom Blocklist Uploader

## About the Project

The NextDNS Custom Blocklist Uploader is a script that allows users to upload blocklists to NextDNS's denylist easily.

## Usage

1. Ensure that Node.js is installed on your system. (Node.js v20 recommended)
2. Clone the project to your local machine.
3. Update the required API Key and Profile ID in `nextdns-api.js`.
4. Add the blocklist URL to the array in `index.js`. (Currently supports TXT file format only)
5. Run `npm run start`. The script will automatically download the blocklist file to the `blocklist` folder and start uploading the domains to NextDNS's denylist.
6. After the upload process is complete, you can check the results on the NextDNS Denylist page.

## Contributing

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

## Contact

- [Tang Weng Kitt](wengkitt969696@gmail.com)
- Project Link: [NextDNS Custom Blocklist Uploader](https://github.com/wengkitttt/NextDNS-Custom-Blocklist-Uploader)
