import Footer from "@/components/Footer";
import Header from "@/components/Header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header something="this is something" />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;