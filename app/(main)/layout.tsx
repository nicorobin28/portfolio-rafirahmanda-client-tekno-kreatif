import DynamicNavbar from "../component/DynamicNavbar";
// import Footer from "../component/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <DynamicNavbar />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
