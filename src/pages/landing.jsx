import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          AI Ticket Assistant
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-5 py-2 rounded-full text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/20"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          <span className="block text-slate-100 mb-2">Smart Support.</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            Powered by AI.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Streamline your customer support with our intelligent ticketing system. 
          Automate responses, prioritize issues, and delight your customers 24/7.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/signup')}
            className="px-8 py-4 rounded-full text-lg font-semibold bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-xl shadow-white/10"
          >
            Start Free Trial
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-4 rounded-full text-lg font-semibold bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 transition-all"
          >
            View Demo
          </button>
        </div>

        {/* Feature Grid Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Responses</h3>
            <p className="text-slate-400">AI-powered suggestions help you resolve tickets faster than ever before.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Categorization</h3>
            <p className="text-slate-400">Automatically tag and route tickets to the right team members.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Insightful Analytics</h3>
            <p className="text-slate-400">Track performance and identify trends with detailed dashboards.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} AI Ticket Assistant. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
