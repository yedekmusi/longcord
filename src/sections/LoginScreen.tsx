import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('demo@longcord.app');
  const [password, setPassword] = useState('********');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2D31] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-orb absolute w-[600px] h-[600px] -top-[200px] -left-[200px] rounded-full" />
        <div className="gradient-orb absolute w-[500px] h-[500px] bottom-[100px] right-[100px] rounded-full" style={{ animationDelay: '-10s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[480px] bg-[#313338] rounded-lg p-8 shadow-[0_8px_16px_rgba(0,0,0,0.24)]"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-[72px] h-[72px] rounded-full bg-[#5865F2] flex items-center justify-center mb-4">
            <MessageCircle className="w-9 h-9 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-[#F2F3F5] text-center mb-1">Welcome back!</h1>
          <p className="text-[#949BA4] text-base text-center">We're so excited to see you again!</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#B5BAC1] uppercase mb-2 tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 bg-[#1E1F22] text-[#DBDEE1] rounded px-3 text-base outline-none focus:ring-2 focus:ring-[#5865F2] placeholder-[#6D6F78]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#B5BAC1] uppercase mb-2 tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 bg-[#1E1F22] text-[#DBDEE1] rounded px-3 text-base outline-none focus:ring-2 focus:ring-[#5865F2] placeholder-[#6D6F78]"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={onLogin}
            className="w-full h-11 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium rounded text-base transition-colors"
          >
            Log In
          </button>
        </div>

        <p className="text-[#949BA4] text-xs text-center mt-4">
          This is a demo — click Log In to enter
        </p>
      </motion.div>
    </div>
  );
}
