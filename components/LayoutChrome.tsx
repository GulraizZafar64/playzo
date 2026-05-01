import AppShell from "./AppShell";
import ThemeProvider from "./theme/ThemeProvider";

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppShell>{children}</AppShell>
    </ThemeProvider>
  );
}
