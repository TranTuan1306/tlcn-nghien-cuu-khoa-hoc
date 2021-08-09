export interface OAuth2User {
  id: string;
  authToken: string;
  idToken: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  photoUrl: string;
  provider: string;
}
