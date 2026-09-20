"use client";

import { Button, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header } = Layout;

type AppHeaderProps = {
  isLogin: boolean;
  balance: string;
  userName: string;
  onLoginClick: () => void;
};

const navItems = [
  { label: "首页", href: "/" },
  { label: "用量", href: "/usage" },
  { label: "知识库", href: "#" },
  { label: "对话", href: "#" },
  { label: "质检", href: "#" },
];

export default function AppHeader({
  isLogin,
  balance,
  userName,
  onLoginClick,
}: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <Header
      className="app-header mx-auto flex w-full max-w-[1180px] items-center gap-6 rounded-[20px] border border-[#e3e8ef] bg-white px-5 shadow-[0_14px_40px_rgba(29,29,35,0.04)]"
      style={{
        minHeight: 76,
        height: "auto",
        lineHeight: "normal",
        backgroundColor: "#fff",
        maxWidth: 1180,
        width: "100%",
      }}
    >
      <div className="app-header-brand flex min-w-[220px] max-w-[220px] shrink-0 items-center gap-4">
        <Image src="/homeIcon.png" alt="logo" width={45} height={45} />
        <span className="app-header-logo-text text-2xl font-semibold tracking-normal text-[#1d1d23]">RRRachel</span>
      </div>

      <nav className="app-header-nav flex flex-1 items-center justify-center gap-2 text-sm text-[#6e7180]">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className={`app-header-nav-link ${pathname === item.href ? "is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="app-header-actions ml-auto flex shrink-0 items-center gap-3">
        {isLogin ? (
          <>
            <div className="rounded-full bg-[#f8fafc] px-4 py-2 text-sm text-[#6e7180]">
              余额
              <span className="font-semibold text-[#1d1d23]">{balance}</span>
            </div>
            <Button
              styles={{
                root: {
                  borderRadius: 12,
                  color: "#09f",
                  backgroundColor: "#1d1d23",
                  border: "none",
                },
              }}
            >
              充值
            </Button>
            <div className="flex items-center gap-3 rounded-full bg-[#f8fafc] py-1 pl-1 pr-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8007b] text-sm font-semibold text-white">
                {userName.slice(0, 1)}
              </span>
              <span className="text-sm font-medium">{userName}</span>
            </div>
          </>
        ) : (
          <Button
            onClick={onLoginClick}
            styles={{
              root: {
                padding: "0 40px",
                borderRadius: 50,
                color: "#09f",
                backgroundColor: "#1d1d23",
                border: "none",
                fontSize: "16px",
              },
            }}
          >
            登陆
          </Button>
        )}
      </div>
    </Header>
  );
}
