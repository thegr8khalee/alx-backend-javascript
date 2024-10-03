import { signUpUser, uploadPhoto } from './4-user-promise';

export default async function handleProfileSignup(
  firstName,
  lastName,
  fileName
) {
  return Promise.allSettled([
    signUpUser(firstName, lastName),
    uploadPhoto(fileName),
  ]).then((res) =>
    res.map((data) => ({
      status: data.status,
      value: data.status === 'fulfilled' ? data.value : String(data.reason),
    }))
  );
}
