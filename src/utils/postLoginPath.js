export function getPostLoginPath(user, { twoFactorVerified } = {}) {
  if (!twoFactorVerified && user?.twoFAenabled === true && user?._id) {
    return `/2fa/${user._id}`;
  }

  if (user?.hasSeenBilling === false) {
    return "/pricing";
  }

  return "/dashboard";
}
