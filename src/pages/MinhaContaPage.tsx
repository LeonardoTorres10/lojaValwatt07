import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';

export default function MinhaContaPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Helmet>
        <title>Minha Conta | Valwatt</title>
      </Helmet>
      
      <div className="bg-gray-50 min-h-[60vh] py-12 px-4 flex justify-center items-start">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-amarelo-100 text-amarelo-600 rounded-full flex items-center justify-center">
              {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
            </div>
          </div>
          
          <h1 className="text-2xl font-display font-bold text-center text-azul-900 mb-2">
            {isLogin ? 'Acessar Conta' : 'Criar Nova Conta'}
          </h1>
          <p className="text-center text-gray-500 mb-8 text-sm">
            {isLogin ? 'Bem-vindo de volta! Faça login para continuar.' : 'Junte-se a nós para uma melhor experiência.'}
          </p>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-azul-500 focus:ring-1 focus:ring-azul-500" placeholder="Seu nome" />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-azul-500 focus:ring-1 focus:ring-azul-500" placeholder="seu@email.com" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                {isLogin && <a href="#" className="text-xs text-azul-600 hover:underline">Esqueceu a senha?</a>}
              </div>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-azul-500 focus:ring-1 focus:ring-azul-500" placeholder="••••••••" />
            </div>

            <button type="button" className="w-full bg-azul-600 hover:bg-azul-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? (
              <p>Não tem uma conta? <button onClick={() => setIsLogin(false)} className="text-azul-600 font-semibold hover:underline">Cadastre-se</button></p>
            ) : (
              <p>Já possui uma conta? <button onClick={() => setIsLogin(true)} className="text-azul-600 font-semibold hover:underline">Faça Login</button></p>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
