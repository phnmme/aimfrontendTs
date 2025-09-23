export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <h1>Welcome to My App</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
