import "@/app/globals.css";

export default function CookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-white fixed inset-x-0 top-0 bottom-0 -z-50">{children}</div>;
}
