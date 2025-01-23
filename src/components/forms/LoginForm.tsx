import { loginAction } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setUser } from "@/states/reducers/authSlice";
import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state?.data) {
      dispatch(setUser(state.data));
      console.log(state.data.user.role);
      if (state.data.user.role == "user") {
        navigate("/dashboard");
      } else {
        navigate("/admin");
      }
    }
  }, [state?.data]);

  return (
    <form action={formAction}>
      <div className="flex items-center justify-center ">
        <div className="flex flex-col rounded-lg md:w-1/2 h-auto shadow-lg space-y-3 bg-white p-5">
          <div>
            <Input
              placeholder="email"
              name="email"
              defaultValue={state?.email as string}
            />
            {state?.error?.email && (
              <ul className="text-red-500">
                {state.error.email.map((error: string) => (
                  <li key={error} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              defaultValue={state?.password as string}
            />
            {state?.error?.password && (
              <ul className="text-red-500">
                {state.error.password.map((error: string) => (
                  <li key={error} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? "Loging-In" : "Login"}
          </Button>
        </div>
      </div>
    </form>
  );
}
