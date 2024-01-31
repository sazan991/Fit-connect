import dynamic from "next/dynamic";

const ProtectedLayout = dynamic(
  () => import("@/components/layout/ProtectedLayout"),
  { ssr: false, loading: () => <div>Loading....</div> }
);
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default Layout;
