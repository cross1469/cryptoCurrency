import { renderHook, act } from "@testing-library/react-hooks";
import useUpdateValidators from "./useUpdateValidators";

it("should use updateValidators email", async () => {
  const { result } = renderHook(() => useUpdateValidators());
  act(() => {
    result.current.updateValidators("email", 5);
  });
  expect(result.current.validColor).toStrictEqual({
    email: "#f84960",
    password: "#f1f3f5",
  });
  expect(typeof result.current.updateValidators).toBe("function");
});

it("should use updateValidators password", () => {
  const { result } = renderHook(() => useUpdateValidators());
  act(() => {
    result.current.updateValidators("password", 5);
  });

  expect(result.current.validColor).toStrictEqual({
    email: "#f1f3f5",
    password: "#f84960",
  });
  expect(typeof result.current.updateValidators).toBe("function");
});
