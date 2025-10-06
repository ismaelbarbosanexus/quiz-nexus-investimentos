'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, TrendingUp, DollarSign, Users, Target, Globe, Zap, Award, CheckCircle, ArrowRight, BarChart3, LineChart, Activity, Sparkles, Star, Trophy, Rocket, Crown, Play, Pause, Volume2 } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  bonus: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual dessas frases mais representa sua situação atual?",
    options: [
      "Trabalho muito e ganho pouco.",
      "Tenho vontade de investir, mas não sei por onde começar.",
      "Já investi, mas nunca tive resultados.",
      "Quero mudar de vida e viver do meu próprio dinheiro."
    ],
    bonus: 3
  },
  {
    id: 2,
    question: "Qual seu nível de experiência com investimentos?",
    options: [
      "Nenhuma experiência.",
      "Já testei alguns aplicativos.",
      "Já investi, mas sem retorno.",
      "Tenho experiência, mas busco algo mais estável."
    ],
    bonus: 2
  },
  {
    id: 3,
    question: "Quando pensa em liberdade financeira, o que vem à sua mente?",
    options: [
      "Tempo livre e segurança.",
      "Poder viver sem depender de ninguém.",
      "Trabalhar de onde quiser.",
      "Conquistar minha independência total."
    ],
    bonus: 4
  },
  {
    id: 4,
    question: "Você já ouviu falar na corretora Deriv?",
    options: [
      "Não, nunca ouvi.",
      "Já vi algo, mas não conheço bem.",
      "Já usei, mas sem sucesso.",
      "Uso até hoje."
    ],
    bonus: 2
  },
  {
    id: 5,
    question: "Qual dessas opções mais se aproxima do seu objetivo financeiro?",
    options: [
      "Começar a gerar renda extra.",
      "Criar uma nova fonte de renda principal.",
      "Aumentar o lucro com meus investimentos.",
      "Alcançar independência financeira total."
    ],
    bonus: 3
  },
  {
    id: 6,
    question: "O que mais te impediu de alcançar resultados até hoje?",
    options: [
      "Falta de conhecimento.",
      "Falta de tempo.",
      "Falta de controle emocional.",
      "Falta de uma boa ferramenta."
    ],
    bonus: 2
  },
  {
    id: 7,
    question: "Se pudesse começar hoje com uma ferramenta inteligente que opera por você, o que faria?",
    options: [
      "Testaria na hora.",
      "Queria entender como funciona primeiro.",
      "Investiria com cautela.",
      "Finalmente realizaria meu sonho de lucrar com investimentos."
    ],
    bonus: 4
  },
  {
    id: 8,
    question: "Quanto tempo por dia dedicaria para aprender e lucrar com o Nexus?",
    options: [
      "30 minutos.",
      "1 hora.",
      "2 horas.",
      "O tempo que for preciso pra mudar minha vida."
    ],
    bonus: 3
  },
  {
    id: 9,
    question: "Você acredita que inteligência artificial pode operar melhor que o emocional humano?",
    options: [
      "Sim, com certeza.",
      "Depende da estratégia usada.",
      "Nunca pensei nisso.",
      "Quero ver isso na prática."
    ],
    bonus: 2
  },
  {
    id: 10,
    question: "Qual dessas situações te traria mais satisfação?",
    options: [
      "Ver meu saldo aumentando todo dia.",
      "Ter uma renda em dólar.",
      "Viver de investimentos.",
      "Ajudar minha família com meus lucros."
    ],
    bonus: 3
  },
  {
    id: 11,
    question: "Você sabia que o Nexus deposita até US$35 direto na sua conta real ao adquirir o acesso?",
    options: [
      "Não sabia disso!",
      "Sério? Quero saber mais.",
      "Isso é o diferencial que eu procurava.",
      "Já quero garantir o meu acesso."
    ],
    bonus: 4
  },
  {
    id: 12,
    question: "Como você prefere começar?",
    options: [
      "Com o bônus de US$35 via PIX.",
      "No cartão, com liberação em até 7 dias.",
      "Quero entender antes de comprar.",
      "Já quero ativar o Nexus hoje."
    ],
    bonus: 1
  },
  {
    id: 13,
    question: "Qual dessas opções representa o seu próximo passo?",
    options: [
      "Criar minha conta e começar com o Nexus.",
      "Conversar com um especialista.",
      "Ver depoimentos reais.",
      "Não quero mais perder tempo."
    ],
    bonus: 2
  },
  {
    id: 14,
    question: "Você gostaria de fazer parte de um grupo exclusivo com investidores Nexus e receber dicas diárias?",
    options: [
      "Sim, quero muito.",
      "Quero entender como funciona.",
      "Talvez depois de conhecer melhor.",
      "Sim, grupos ajudam muito na evolução."
    ],
    bonus: 3
  },
  {
    id: 15,
    question: "Se pudesse começar agora com o Nexus, recebendo bônus em dólar, o que escolheria?",
    options: [
      "Começar hoje mesmo e garantir meu bônus.",
      "Entender o passo a passo para ativar.",
      "Testar o sistema com o bônus.",
      "Falar com um consultor para iniciar."
    ],
    bonus: 2
  }
]

interface Metrics {
  usersStarted: number
  usersCompleted: number
  usersCheckout: number
  usersPurchased: number
  bonusPaid: number
  avgProfit: number
  newInvestors: number
  satisfaction: number
}

interface SocialProof {
  id: number
  name: string
  city: string
  action: string
  time: string
  amount?: number
}

export default function NexusQuiz() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'quiz' | 'final' | 'dashboard'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [totalBonus, setTotalBonus] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [lastBonus, setLastBonus] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [metrics, setMetrics] = useState<Metrics>({
    usersStarted: 2847,
    usersCompleted: 2018,
    usersCheckout: 1289,
    usersPurchased: 612,
    bonusPaid: 2340,
    avgProfit: 68.22,
    newInvestors: 62,
    satisfaction: 97.8
  })
  const [socialProofs, setSocialProofs] = useState<SocialProof[]>([
    { id: 1, name: "Anderson", city: "Goiânia", action: "recebeu US$35", time: "há 2min" },
    { id: 2, name: "Carla", city: "Recife", action: "lucrou US$97 em 4 dias", time: "há 5min" },
    { id: 3, name: "João", city: "Manaus", action: "primeiro lucro hoje", time: "há 8min" },
    { id: 4, name: "Bruna", city: "São Paulo", action: "PIX instantâneo confirmado", time: "há 12min" },
    { id: 5, name: "Rafael", city: "Brasília", action: "ativou conta real", time: "há 15min" }
  ])

  // Garantir hidratação correta
  useEffect(() => {
    setMounted(true)
  }, [])

  // Atualizar métricas em tempo real apenas no cliente
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        usersStarted: prev.usersStarted + Math.floor(Math.random() * 3),
        usersCompleted: prev.usersCompleted + Math.floor(Math.random() * 2),
        usersCheckout: prev.usersCheckout + Math.floor(Math.random() * 2),
        usersPurchased: prev.usersPurchased + (Math.random() > 0.7 ? 1 : 0),
        bonusPaid: prev.bonusPaid + (Math.random() > 0.8 ? Math.floor(Math.random() * 40) : 0),
        newInvestors: prev.newInvestors + (Math.random() > 0.9 ? 1 : 0)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [mounted])

  // Atualizar provas sociais em tempo real
  useEffect(() => {
    if (!mounted) return

    const names = ["Anderson", "Carla", "João", "Bruna", "Rafael", "Marina", "Pedro", "Ana", "Lucas", "Fernanda"]
    const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Brasília", "Fortaleza", "Recife", "Porto Alegre", "Manaus", "Curitiba"]
    const actions = [
      "recebeu US$35",
      "lucrou US$97 em 4 dias", 
      "primeiro lucro hoje",
      "PIX instantâneo confirmado",
      "ativou conta real",
      "sacou US$150",
      "dobrou investimento",
      "começou hoje"
    ]

    const socialInterval = setInterval(() => {
      const newProof: SocialProof = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        time: "agora"
      }

      setSocialProofs(prev => [newProof, ...prev.slice(0, 4)])
    }, 8000)

    return () => clearInterval(socialInterval)
  }, [mounted])

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    
    setTimeout(() => {
      const bonus = questions[currentQuestion].bonus
      const newTotal = Math.min(totalBonus + bonus, 40) // Garantir que nunca ultrapasse $40
      
      setTotalBonus(newTotal)
      setLastBonus(bonus)
      setShowNotification(true)
      
      setTimeout(() => {
        setShowNotification(false)
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
        } else {
          setCurrentScreen('final')
        }
      }, 2000)
    }, 500)
  }

  const NexusLogo = () => (
    <div className="flex items-center gap-3 mb-6">
      <img 
        src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/38455507-41c1-4826-ad7a-80b4cd12cffc.png" 
        alt="Nexus Investimentos Logo" 
        className="w-12 h-12 object-contain"
      />
      <div>
        <div className="text-[#ff6600] font-bold text-xl tracking-wider">NEXUS</div>
        <div className="text-gray-400 text-sm font-medium">INVESTIMENTOS</div>
      </div>
    </div>
  )

  // Saldo mais futurístico e atrativo
  const FuturisticBalance = () => (
    <div className="relative mb-6">
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-6 rounded-2xl border border-[#00ff66]/30 shadow-2xl shadow-[#00ff66]/10">
        {/* Efeitos de fundo futurísticos */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff66]/5 via-transparent to-[#00e0ff]/5 rounded-2xl"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#00ff66] rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#00e0ff] rounded-full animate-ping"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#00ff66] animate-pulse" />
              <span className="text-[#00ff66] text-sm font-bold tracking-wide">
                SALDO ATUAL
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#ffd700] animate-spin" />
              <span className="text-[#ffd700] text-xs font-medium">LIVE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl font-black text-[#00ff66] tracking-wider drop-shadow-lg">
              US${totalBonus.toFixed(0)}
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-gray-400">PROGRESSO</div>
              <div className="text-sm font-bold text-[#00e0ff]">{Math.round(progress)}%</div>
            </div>
          </div>
          
          {/* Barra de progresso futurística */}
          <div className="relative">
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#00ff66] via-[#00e0ff] to-[#ffd700] h-3 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>US$0</span>
              <span className="text-[#00ff66] font-bold">Rumo à Liberdade Financeira 🚀</span>
              <span>US$40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Dashboard em tempo real mais futurístico
  const FuturisticDashboard = () => (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 rounded-2xl border border-[#00e0ff]/30 shadow-2xl shadow-[#00e0ff]/20 relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00e0ff]/5 via-transparent to-[#ff6600]/5"></div>
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-ping"></div>
        <div className="w-2 h-2 bg-[#00e0ff] rounded-full animate-bounce"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-[#00e0ff] animate-pulse" />
          <div>
            <h3 className="text-xl font-bold text-[#00e0ff]">NEXUS ANALYTICS</h3>
            <p className="text-gray-400 text-sm">Dados em tempo real • Atualização automática</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 p-4 rounded-xl border border-[#00ff66]/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-[#00ff66]" />
              <span className="text-[#00ff66] text-sm font-bold">ATIVOS AGORA</span>
            </div>
            <div className="text-xl font-black text-white" suppressHydrationWarning>
              {mounted ? metrics.usersStarted.toLocaleString() : '2,847'}
            </div>
            <div className="text-xs text-gray-400">+{Math.floor(Math.random() * 10) + 5} últimos 5min</div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-xl border border-[#ff6600]/20">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-[#ff6600]" />
              <span className="text-[#ff6600] text-sm font-bold">FINALIZARAM</span>
            </div>
            <div className="text-xl font-black text-white" suppressHydrationWarning>
              {mounted ? metrics.usersCompleted.toLocaleString() : '2,018'}
            </div>
            <div className="text-xs text-gray-400">Taxa: 82.8%</div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-xl border border-[#00e0ff]/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#00e0ff]" />
              <span className="text-[#00e0ff] text-sm font-bold">COMPRARAM</span>
            </div>
            <div className="text-xl font-black text-white" suppressHydrationWarning>
              {mounted ? metrics.usersPurchased.toLocaleString() : '612'}
            </div>
            <div className="text-xs text-gray-400">Conversão: 20.1%</div>
          </div>
          
          <div className="bg-black/30 p-4 rounded-xl border border-[#ffd700]/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-[#ffd700]" />
              <span className="text-[#ffd700] text-sm font-bold">BÔNUS PAGOS</span>
            </div>
            <div className="text-xl font-black text-white" suppressHydrationWarning>
              US${mounted ? metrics.bonusPaid.toLocaleString() : '2,340'}
            </div>
            <div className="text-xs text-gray-400">Hoje</div>
          </div>
        </div>
        
        {/* Feed de atividade em tempo real */}
        <div className="bg-black/20 p-4 rounded-xl border border-gray-700/30">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-[#00ff66] animate-pulse" />
            <span className="text-[#00ff66] text-sm font-bold">ATIVIDADE AO VIVO</span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {socialProofs.map((proof) => (
              <div key={proof.id} className="text-xs text-gray-300 animate-pulse">
                🎉 {proof.name}, {proof.city} - {proof.action} {proof.time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Não renderizar conteúdo dinâmico até estar montado
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <img 
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/38455507-41c1-4826-ad7a-80b4cd12cffc.png" 
            alt="Nexus Investimentos Logo" 
            className="w-12 h-12 object-contain mx-auto mb-4"
          />
          <div className="text-[#ff6600] font-bold text-xl tracking-wider">NEXUS</div>
          <div className="text-gray-400 text-sm font-medium">CARREGANDO...</div>
        </div>
      </div>
    )
  }

  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-[#00e0ff]">Dashboard Nexus - Métricas em Tempo Real</h1>
            <button 
              onClick={() => setCurrentScreen('intro')}
              className="bg-[#ff6600] px-4 py-2 rounded-lg hover:bg-[#ff8800] transition-colors"
            >
              Voltar ao Quiz
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-[#00e0ff]" />
                <span className="text-gray-400">Usuários Iniciaram</span>
              </div>
              <div className="text-2xl font-bold text-[#00ff66]" suppressHydrationWarning>
                {metrics.usersStarted.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">+{Math.floor(Math.random() * 15) + 10} nas últimas 5 min</div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-[#00e0ff]" />
                <span className="text-gray-400">Concluíram</span>
              </div>
              <div className="text-2xl font-bold text-[#00ff66]" suppressHydrationWarning>
                {metrics.usersCompleted.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Taxa: 82,8%</div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-[#00e0ff]" />
                <span className="text-gray-400">Checkout</span>
              </div>
              <div className="text-2xl font-bold text-[#00ff66]" suppressHydrationWarning>
                {metrics.usersCheckout.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">46% dos participantes</div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-[#00e0ff]" />
                <span className="text-gray-400">Compraram</span>
              </div>
              <div className="text-2xl font-bold text-[#00ff66]" suppressHydrationWarning>
                {metrics.usersPurchased.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Conversão: 20,1%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-bold text-[#ffd700] mb-4">💵 Métricas Financeiras</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bônus pagos hoje:</span>
                  <span className="text-[#00ff66] font-bold" suppressHydrationWarning>
                    US${metrics.bonusPaid.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lucro médio (7 dias):</span>
                  <span className="text-[#00ff66] font-bold">US${metrics.avgProfit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Novos investidores:</span>
                  <span className="text-[#00ff66] font-bold">{metrics.newInvestors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Satisfação:</span>
                  <span className="text-[#00ff66] font-bold">{metrics.satisfaction}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-bold text-[#ffd700] mb-4">🌍 Distribuição Global</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">🇧🇷 Brasil</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-[#00ff66] h-2 rounded-full" style={{width: '84%'}}></div>
                    </div>
                    <span className="text-[#00ff66] text-sm">84%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">🇵🇹 Portugal</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-[#00e0ff] h-2 rounded-full" style={{width: '8%'}}></div>
                    </div>
                    <span className="text-[#00e0ff] text-sm">8%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">🇺🇸 EUA</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-[#ff6600] h-2 rounded-full" style={{width: '6%'}}></div>
                    </div>
                    <span className="text-[#ff6600] text-sm">6%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-[#ffd700] mb-4">💬 Prova Social - Feed Ao Vivo</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {socialProofs.map((proof) => (
                <div key={proof.id} className="text-sm text-gray-300 animate-pulse">
                  🎉 {proof.name}, de {proof.city}, {proof.action} {proof.time}.
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === 'intro') {
    return (
      <div className="min-h-screen bg-black text-white p-4 relative overflow-hidden">
        {/* Efeitos de fundo futurísticos */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/10 via-black to-[#00e0ff]/10"></div>
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#00ff66]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#ff6600]/5 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#00e0ff]/5 rounded-full blur-2xl animate-bounce"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center">
            {/* Logo com efeitos mais impactantes */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/38455507-41c1-4826-ad7a-80b4cd12cffc.png" 
                  alt="Nexus Investimentos Logo" 
                  className="w-16 h-16 object-contain shadow-2xl shadow-[#ff6600]/40 relative z-10"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00ff66] rounded-full animate-ping"></div>
              </div>
              <div>
                <div className="text-[#ff6600] font-black text-3xl tracking-wider drop-shadow-lg">NEXUS</div>
                <div className="text-gray-300 text-sm font-bold tracking-widest">INVESTIMENTOS</div>
              </div>
            </div>
            
            {/* Título mais impactante */}
            <div className="mb-8">
              <h1 className="text-3xl font-black mb-3 bg-gradient-to-r from-[#ff6600] via-[#ffd700] to-[#00e0ff] bg-clip-text text-transparent animate-pulse">
                DESPERTE SUA
              </h1>
              <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-[#00ff66] via-[#00e0ff] to-[#ffd700] bg-clip-text text-transparent">
                LIBERDADE FINANCEIRA
              </h1>
              <div className="flex items-center justify-center gap-2 text-[#ffd700]">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="text-sm font-bold">QUIZ INTERATIVO EXCLUSIVO</span>
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
            </div>
            
            {/* Dashboard em destaque na frente */}
            <div className="mb-8">
              <FuturisticDashboard />
            </div>
            
            {/* Aviso importante mais atrativo */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 rounded-2xl mb-6 border-2 border-[#ff6600]/30 shadow-2xl shadow-[#ff6600]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6600]/5 via-transparent to-[#ffd700]/5"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-[#ff6600] rounded-full animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-pulse"></div>
                  <span className="text-[#ff6600] font-black text-lg tracking-wide">AVISO IMPORTANTE</span>
                  <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <div className="w-6 h-6 bg-[#ff6600] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">⚠️</span>
                    </div>
                    <span className="text-gray-300">O Nexus não é gratuito</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <div className="w-6 h-6 bg-[#ffd700] rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-gray-300">Bônus de US$40 liberado após aquisição</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <div className="w-6 h-6 bg-[#00e0ff] rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-gray-300">15 perguntas = US$40 total garantidos</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Seção de desafio mais envolvente */}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 p-6 rounded-2xl mb-8 border border-[#00e0ff]/30 shadow-xl shadow-[#00e0ff]/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00e0ff]/5 to-transparent"></div>
              <div className="absolute top-2 left-2 w-2 h-2 bg-[#00e0ff] rounded-full animate-ping"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Target className="w-6 h-6 text-[#00e0ff] animate-pulse" />
                  <h2 className="text-xl font-black text-[#00e0ff]">SEU DESAFIO ÉPICO</h2>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Descubra seu perfil de investidor e <span className="text-[#ffd700] font-bold">acumule até US$40 em bônus</span> para começar sua jornada rumo à liberdade financeira com o Nexus Investimentos.
                </p>
                
                <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse"></div>
                    <span className="text-[#00ff66]">15 PERGUNTAS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-pulse"></div>
                    <span className="text-[#ffd700]">US$40 BÔNUS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-pulse"></div>
                    <span className="text-[#ff6600]">ACESSO VIP</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botão principal mais chamativo */}
            <button
              onClick={() => setCurrentScreen('quiz')}
              className="w-full bg-gradient-to-r from-[#00ff66] via-[#00e0ff] to-[#00ff66] text-black font-black py-6 px-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#00ff66]/40 mb-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent group-hover:from-white/30 transition-all duration-300"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Play className="w-6 h-6 animate-bounce" />
                <span className="text-xl">COMEÇAR QUIZ AGORA</span>
                <Rocket className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-sm mt-1 opacity-90">🎯 Ganhe até US$40 + Descubra seu perfil</div>
            </button>
            
            {/* Botão dashboard mais sutil */}
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="w-full bg-gray-800/50 text-[#00e0ff] font-bold py-4 px-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" />
                <span>Ver Métricas em Tempo Real</span>
              </div>
            </button>
            
            {/* Indicadores de confiança */}
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#00ff66]" />
                <span>+2.8K ativos</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#ffd700]" />
                <span>97.8% satisfação</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-[#ff6600]" />
                <span>+612 compraram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === 'final') {
    return (
      <div className="min-h-screen bg-black text-white p-4 relative overflow-hidden">
        {/* Efeitos de fundo futurísticos */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/5 via-black to-[#00ff66]/5"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#00ff66]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#ff6600]/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center">
            <NexusLogo />
            
            {/* Celebração épica */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-[#ffd700] to-[#ff6600] rounded-full opacity-20 animate-ping"></div>
              </div>
              <div className="relative z-10">
                <Crown className="w-16 h-16 text-[#ffd700] mx-auto mb-4 animate-bounce" />
                <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-[#ffd700] via-[#ff6600] to-[#ffd700] bg-clip-text text-transparent animate-pulse">
                  🎉 PARABÉNS!
                </h1>
                <p className="text-[#00ff66] text-xl font-bold tracking-wide">
                  INVESTIDOR CONQUISTADO!
                </p>
              </div>
            </div>
            
            {/* Saldo conquistado com efeitos visuais */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-2xl mb-6 border-2 border-[#ffd700]/50 shadow-2xl shadow-[#ffd700]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/5 via-transparent to-[#00ff66]/5"></div>
              <div className="absolute top-2 right-2 flex gap-1">
                <Star className="w-3 h-3 text-[#ffd700] animate-spin" />
                <Star className="w-3 h-3 text-[#ffd700] animate-pulse" />
                <Star className="w-3 h-3 text-[#ffd700] animate-bounce" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-[#00e0ff] mb-6 flex items-center justify-center gap-2">
                  <BarChart3 className="w-6 h-6 animate-pulse" />
                  SEU PROGRESSO ÉPICO
                </h2>
                
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#00ff66]" />
                      Saldo Conquistado:
                    </span>
                    <span className="text-[#00ff66] font-black text-3xl animate-pulse">US$40</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-[#00e0ff]" />
                      Progresso:
                    </span>
                    <span className="text-[#00e0ff] font-bold text-xl">100% COMPLETO</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#ffd700]" />
                      Status Desbloqueado:
                    </span>
                    <span className="text-[#ffd700] font-bold">TRADER NEXUS</span>
                  </div>
                </div>
                
                {/* Barra de progresso épica */}
                <div className="mt-6">
                  <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#00ff66] via-[#ffd700] to-[#ff6600] h-6 rounded-full animate-pulse relative">
                      <div className="absolute inset-0 bg-white/30 animate-ping"></div>
                    </div>
                  </div>
                  <div className="text-center text-[#ffd700] font-black mt-3 text-lg animate-bounce">
                    🎯 LIBERDADE FINANCEIRA ATIVADA!
                  </div>
                </div>
              </div>
            </div>
            
            {/* Seção de transformação com mais impacto visual */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl mb-6 border border-[#00ff66]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff66]/10 to-[#00e0ff]/10"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#ff6600] mb-4 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6 animate-pulse" />
                  TRANSFORME EM LUCRO REAL AGORA
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <div className="w-8 h-8 bg-[#00ff66] rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-[#00ff66] font-bold">PIX INSTANTÂNEO</div>
                      <div className="text-gray-300">Bônus liberado em segundos</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <div className="w-8 h-8 bg-[#00e0ff] rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-[#00e0ff] font-bold">20 IAs NEXUS</div>
                      <div className="text-gray-300">Operando 24/7 para você</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                    <div className="w-8 h-8 bg-[#ffd700] rounded-full flex items-center justify-center">
                      <LineChart className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-[#ffd700] font-bold">CONTA REAL DERIV</div>
                      <div className="text-gray-300">Seus US$40 já creditados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Oferta especial mais impactante */}
            <div className="bg-gradient-to-br from-[#ff6600] via-[#ff8800] to-[#ffd700] p-8 rounded-2xl mb-6 text-black relative overflow-hidden shadow-2xl shadow-[#ff6600]/30">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-2 left-2 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Crown className="w-8 h-8 animate-bounce" />
                  <h3 className="text-2xl font-black">OFERTA EXCLUSIVA</h3>
                  <Crown className="w-8 h-8 animate-bounce" />
                </div>
                
                <div className="text-center space-y-3">
                  <div className="text-lg">
                    <div className="bg-black/20 p-3 rounded-xl mb-3">
                      <div className="text-sm font-bold mb-1">💰 DESCONTO ESPECIAL:</div>
                      <div className="flex items-center justify-center gap-3">
                        <span className="line-through opacity-70 text-xl">R$597</span>
                        <span className="text-red-600 font-black text-lg">-50%</span>
                        <span className="font-black text-4xl drop-shadow-lg">R$297</span>
                      </div>
                      <div className="text-sm font-bold mt-1">
                        🎯 ECONOMIA DE R$300 HOJE!
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 p-4 rounded-xl">
                    <div className="text-lg font-bold mb-2">🎁 VOCÊ RECEBE HOJE:</div>
                    <div className="space-y-1 text-sm font-semibold">
                      <div>✅ US$40 na conta real Deriv</div>
                      <div>✅ 20 Inteligências Artificiais</div>
                      <div>✅ Suporte VIP exclusivo</div>
                      <div>✅ Grupo de traders elite</div>
                      <div>✅ Treinamento completo</div>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-black animate-pulse">
                    = MAIS DE R$500 EM VALOR! 🚀
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botão de ação mais chamativo */}
            <button
              onClick={() => window.open('https://nexusinvestimentosusd.com.br', '_blank')}
              className="w-full bg-gradient-to-r from-[#00ff66] via-[#00e0ff] to-[#00ff66] text-black font-black py-6 px-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#00ff66]/40 mb-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent group-hover:from-white/30 transition-all duration-300"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Rocket className="w-6 h-6 animate-bounce" />
                <span className="text-xl">ATIVAR ACESSO AGORA</span>
                <DollarSign className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-sm mt-1 opacity-90">💸 Receber meus US$40 + Acesso VIP</div>
            </button>
            
            {/* Garantias e urgência */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-[#ffd700]/30">
              <div className="text-center space-y-2">
                <div className="text-[#ffd700] font-bold text-sm">🔒 GARANTIA TOTAL</div>
                <div className="text-gray-300 text-xs">
                  ⚡ Bônus creditado automaticamente<br/>
                  🎯 Suporte 24/7 incluso<br/>
                  💎 Oferta válida apenas hoje
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 relative overflow-hidden">
      {/* Efeitos de fundo trading */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 border border-[#00ff66] rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-[#ff6600] rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border border-[#00e0ff] rounded-full animate-bounce"></div>
      </div>
      
      <div className="max-w-md mx-auto relative z-10">
        <NexusLogo />
        <FuturisticBalance />
        
        {/* Pergunta com design mais futurístico */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 rounded-2xl mb-6 border border-gray-700 relative overflow-hidden shadow-2xl">
          {/* Efeitos visuais de trading */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff6600]/5 via-transparent to-[#00e0ff]/5"></div>
          <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-ping"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#ff8800] rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-[#ff6600]/30">
                {currentQuestion + 1}
              </div>
              <div>
                <span className="text-[#00e0ff] font-bold text-sm block">
                  PERGUNTA {currentQuestion + 1} DE {questions.length}
                </span>
                <span className="text-gray-400 text-xs">
                  Análise de perfil em andamento...
                </span>
              </div>
            </div>
            
            <h2 className="text-lg font-semibold mb-6 text-white leading-relaxed">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 relative overflow-hidden group ${
                    selectedAnswer === index
                      ? 'bg-gradient-to-r from-[#ff6600] to-[#ff8800] border-[#ff6600] text-white scale-105 shadow-lg shadow-[#ff6600]/30'
                      : 'bg-gray-800/50 border-gray-700 hover:border-[#ff6600] hover:bg-gray-700/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      <span className="text-[#00e0ff] font-bold mr-2">{String.fromCharCode(65 + index)})</span>
                      {option}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </div>
                </button>
              ))}
            </div>
            
            {/* Bônus da pergunta mais atrativo */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#ffd700]/10 to-[#ff6600]/10 rounded-xl border border-[#ffd700]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/5 to-transparent"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#ffd700] animate-pulse" />
                  <span className="text-[#ffd700] font-bold text-sm">
                    RECOMPENSA DESTA PERGUNTA
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#ffd700] font-black text-lg">
                    +US${questions[currentQuestion].bonus}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#ffd700] animate-spin" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notificação de bônus mais impactante */}
        {showNotification && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-gradient-to-br from-[#00ff66] via-[#00e0ff] to-[#00ff66] text-black p-8 rounded-2xl shadow-2xl animate-bounce relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
              
              <div className="text-center relative z-10">
                <Trophy className="w-12 h-12 mx-auto mb-3 animate-spin" />
                <div className="text-2xl font-black mb-2">🎉 CONQUISTADO!</div>
                <div className="text-xl font-bold">
                  +US${lastBonus} CREDITADOS!
                </div>
                <div className="text-sm font-semibold mt-1 opacity-80">
                  Saldo total: US${totalBonus}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}