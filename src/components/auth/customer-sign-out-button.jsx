"use client";
import { signOutCustomer } from "@/actions/customer";
import { Button } from "@/components/ui/button";
import { Loader, LogOut } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useStorePath } from "@/providers/store-path-provider";
const CustomerSignOutButton = ({ storeSlug }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const storePath = useStorePath();
    const handleSignOut = () => {
        startTransition(async () => {
            await signOutCustomer(storeSlug);
            router.push(storePath("/"));
        });
    };
    return (<Button onClick={handleSignOut} disabled={isPending} className="w-full">
      {isPending ? (<Loader className="w-4 h-4 mr-2 animate-spin"/>) : (<LogOut className="w-4 h-4 mr-2"/>)}
      Sign Out
    </Button>);
};
export default CustomerSignOutButton;
