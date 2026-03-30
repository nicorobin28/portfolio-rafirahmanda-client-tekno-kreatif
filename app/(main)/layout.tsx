import Navbar from "../component/navbar";
import Footer from "../component/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1 px-[16px] md:px-[120px]">{children}</main>
      <Footer />
    </div>
  );
}
