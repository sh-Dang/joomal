export default function Footer() {
  return (
        <footer className="mt-auto border-t border-border bg-secondary py-3">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                {/* 왼쪽 */}
                <div className="flex items-center gap-6">
                <h3 className="font-semibold">주말(酒末)</h3>

                <p className="text-xs text-foreground/70">
                    Email : henrys200632@gmail.com
                    <br />
                    Tel : 010-9009-0592
                </p>
                </div>

                {/* 오른쪽 */}
                <p className="text-xs text-foreground/50">
                © {new Date().getFullYear()} Joomal. All rights reserved.
                </p>
            </div>
        </footer>
  );
}