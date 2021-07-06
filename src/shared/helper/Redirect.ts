// imp
export default class Redirect {
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    static redirectAfterLogin = () => {
      location.href = '/my-profile'
    };
}
