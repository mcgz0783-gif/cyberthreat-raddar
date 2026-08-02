import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background/50 text-foreground hover:bg-accent transition-colors">
          {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "system" && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-border">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
        >
          <Sun className="h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
        >
          <Moon className="h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
        >
          <Monitor className="h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
