import dynamic from "next/dynamic";

const AuthLayout = dynamic(() => import("@/components/layout/AuthLayout"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
