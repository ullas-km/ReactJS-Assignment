import authReducer, { loginSuccess, logout } from "../features/auth/authSlice";

describe("authSlice", () => {
  const initialState = {
    token: null,
    user: null,
  };

  test("should handle loginSuccess", () => {
    const user = { id: 1, name: "Test User" };

    const state = authReducer(
      initialState,
      loginSuccess({
        token: "abc123",
        user: user as any,
      })
    );

    expect(state.token).toBe("abc123");
    expect(state.user).toEqual(user);
  });

  test("should handle logout", () => {
    const loggedInState = {
      token: "abc123",
      user: { id: 1, name: "Test User" } as any,
    };

    const state = authReducer(loggedInState, logout());

    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});