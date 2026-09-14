"use client";

import { useCallback, useState, type ReactNode } from "react";
import { Button, Checkbox, Form, Input, Layout, Modal } from "antd";
import Image from "next/image";
import AppHeader from "./AppHeader";
import type { UserUsage } from "../types";

export default function AppFrame({
  children,
  userUsage,
}: {
  children: ReactNode;
  userUsage: UserUsage;
}) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const handleLoginCancel = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const handleLoginConfirm = useCallback(() => {
    setIsLogin(true);
    setIsLoginModalOpen(false);
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        gap: "10px",
        padding: "12px 48px",
      }}
    >
      <AppHeader
        isLogin={isLogin}
        balance={userUsage.balance}
        userName={userUsage.user}
        onLoginClick={handleLoginClick}
      />
      {children}
      <Modal
        open={isLoginModalOpen}
        footer={null}
        width={460}
        centered
        onCancel={handleLoginCancel}
        styles={{
          root: {
            borderRadius: 24,
          },
          body: {
            border: "1px solid #e3e8ef",
            borderRadius: 24,
            boxShadow: "0 24px 70px rgba(29,29,35,0.14)",
            padding: 0,
          },
        }}
      >
        <div className="overflow-hidden rounded-[24px] bg-white text-[#1d1d23]">
          <div className="border-b border-[#eef2f7] bg-[#f8fafc] px-7 py-6">
            <div className="flex items-center gap-3">
              <Image src="/homeIcon.png" alt="logo" width={42} height={42} />
              <div>
                <h2 className="text-xl font-semibold">
                  Welcome back <br />
                  Sign in to your account
                </h2>
              </div>
            </div>
          </div>

          <div className="px-7 py-6">
            <Form
              layout="vertical"
              requiredMark={false}
              onFinish={handleLoginConfirm}
              className="w-full"
            >
              <Form.Item
                label={<span className="text-sm font-medium">邮箱</span>}
                name="email"
                rules={[
                  { required: true, message: "请输入邮箱" },
                  { type: "email", message: "请输入有效邮箱" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="name@company.com"
                  autoComplete="email"
                  styles={{
                    input: { fontSize: 14 },
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-sm font-medium">密码</span>}
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="输入密码"
                  autoComplete="current-password"
                />
              </Form.Item>

              <div className="mb-6 flex items-center justify-between text-sm">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>保持登录</Checkbox>
                </Form.Item>
                <button className="font-medium text-[#e8007b]" type="button">
                  忘记密码
                </button>
              </div>

              <Form.Item className="mb-0">
                <Button
                  block
                  htmlType="submit"
                  size="large"
                  styles={{
                    root: {
                      height: 44,
                      border: "none",
                      borderRadius: 14,
                      backgroundColor: "#e8007b",
                      color: "#fff",
                      fontWeight: 700,
                    },
                  }}
                >
                  登陆
                </Button>
              </Form.Item>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#e3e8ef]" />
                <span className="text-xs font-medium text-[#6e7180]">
                  Don&apos;t have one?
                </span>
                <span className="h-px flex-1 bg-[#e3e8ef]" />
              </div>

              <Button
                block
                size="large"
                styles={{
                  root: {
                    height: 44,
                    border: "1px solid #e3e8ef",
                    borderRadius: 14,
                    backgroundColor: "#fff",
                    color: "#1d1d23",
                    fontWeight: 700,
                  },
                }}
              >
                创建账号
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
