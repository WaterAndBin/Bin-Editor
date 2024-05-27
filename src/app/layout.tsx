import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

/**
 * 导入字体
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * SSE优化
 */
export const metadata: Metadata = {
  title: '富文本编辑器',
  description: '富文本编辑器'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
