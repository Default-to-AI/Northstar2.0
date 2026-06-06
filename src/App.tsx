import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, List, Users, Archive as ArchiveIcon, UserCircle, Sparkles, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import CommandCenter from './pages/CommandCenter';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Watchlist from './pages/Watchlist';
import Archive from './pages/Archive';
import Committee from './pages/Committee';
import Scanner from './pages/Scanner';
import EvidencePacket from './pages/EvidencePacket';
import InsightsTicker from './pages/InsightsTicker';
import Screener from './pages/Screener';
import { Badge } from '@/components/ui/badge';
import MarketIndicesHeader from './components/MarketIndicesHeader';
import { ErrorBoundary } from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function StubPage({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-mono mb-4 text-primary">{title}</h1>
      <div className="terminal-border p-12 flex items-center justify-center text-muted-foreground bg-muted/20">
        <p className="font-mono text-sm tracking-widest uppercase">MODULE_OFFLINE: COMING_SOON</p>
      </div>
    </div>
  );
}

function Sidebar() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Command Center' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/watchlist', icon: List, label: 'Watchlist' },
    { to: '/committee', icon: Users, label: 'Committee' },
    { to: '/scanner', icon: Sparkles, label: 'Scanner' },
    { to: '/screener', icon: BarChart3, label: 'Screener' },
    { to: '/archive', icon: ArchiveIcon, label: 'Archive' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <aside className="w-48 border-r border-border h-screen sticky top-0 flex flex-col bg-background">
      <div className="p-5">
        <div className="mb-8">
          <div className="font-mono font-bold text-xl tracking-tighter text-foreground">NORTH<span className="text-primary">STAR</span></div>
          <div className="text-[9px] font-mono text-muted-foreground uppercase mt-1">v2.4.0-STABLE</div>
        </div>
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-1 py-3 transition-colors duration-200 group uppercase tracking-widest font-bold text-[10px] font-mono",
                  isActive ? "text-primary" : "text-[#888] hover:text-foreground"
                )
              }
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-5 text-[10px] font-mono text-muted-foreground/60">
        TERMINAL: ONLINE
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex bg-background text-foreground h-screen w-full overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <header className="h-12 border-b border-border flex items-center justify-between px-6 bg-background sticky top-0 z-10 w-full shrink-0">
              <div className="flex items-center gap-4">
                <ErrorBoundary>
                  <MarketIndicesHeader />
                </ErrorBoundary>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<CommandCenter />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/committee" element={<Committee />} />
                <Route path="/scanner" element={<Scanner />} />
                <Route path="/screener" element={<Screener />} />
                <Route path="/insights/:ticker" element={<InsightsTicker />} />
                <Route path="/security/:ticker" element={<EvidencePacket />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
