import "@/app/globals.css";

export default function CookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className="bg-white">{children}</body>;
}
