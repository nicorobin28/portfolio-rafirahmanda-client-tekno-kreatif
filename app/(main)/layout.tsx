import DynamicNavbar from "../component/DynamicNavbar";
import { GlobalProvider } from "../providers/GlobalProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <DynamicNavbar />
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
      </div>
    </GlobalProvider>
  );
}
