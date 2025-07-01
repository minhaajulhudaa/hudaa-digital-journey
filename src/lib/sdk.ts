
import githubSDK from './githubSDK';

export interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
  profile?: any;
}

// Export the GitHub SDK as the main SDK
export default githubSDK;
