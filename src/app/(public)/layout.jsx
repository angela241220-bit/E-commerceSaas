import { Footer } from "@/components/home";
import { Navigation } from "./nav";
export default function RootLayout({ children, }) {
    return (<>
      <Navigation />
      {children}
      <Footer />
    </>);
}
