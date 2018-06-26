/* @flow */

const backendURL = 'http://localhost';

const imageServer = 'http://localhost';

const yextCompleteURL = () => 'http://localhost';

const relPath = {
  search: '/search'
};

export { backendURL, imageServer, yextCompleteURL };

export default (key: string) => relPath[key] || '/';
