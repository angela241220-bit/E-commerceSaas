"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export const LogoutButton = ({ children }) => {
    const router = useRouter();
    const onClick = async () => {
        await authClient.signOut();
        router.push("/");
    };
    return (<span onClick={onClick} className="cursor-pointer">
      {children}
    </span>);
};
