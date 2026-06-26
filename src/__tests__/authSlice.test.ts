import authReducer, {
  loginSuccess,
  logout,
} from "../features/auth/authSlice";
import type { User } from "../services/authApi";

describe("authSlice", () => {
  const initialState = {
    token: null,
    user: null,
  };

  const user: User = {
    user_id: 1,
    name: "Test User",
    email: "test@test.com",
    role: "teacher",
  };

  test("should handle loginSuccess", () => {
    const state = authReducer(
      initialState,
      loginSuccess({
        token: "abc123",
        user,
      }),
    );

    expect(state.token).toBe("abc123");
    expect(state.user).toEqual(user);
  });

  test("should handle logout", () => {
    const loggedInState = {
      token: "abc123",
      user,
    };

    const state = authReducer(loggedInState, logout());

    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});