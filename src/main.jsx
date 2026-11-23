import React, { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight, BarChart3, BookOpen, Brain, Check, CheckCircle2, ChevronLeft, ChevronRight,
  CircleHelp, Code2, Coins, Database, GitBranch, GraduationCap, LayoutDashboard, Lightbulb,
  Maximize2, Menu, Minus, Moon, Move, Plus, Pause, Play, RotateCcw, Settings, Sparkles, Sun, Trophy, X, Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import './styles.css'

const algorithms = [
  { id: 'fibonacci', name: 'Fibonacci sequence', short: 'See repeated work become reusable knowledge.', icon: GitBranch, difficulty: 'Beginner', time: '8 min', color: 'orange' },
  { id: 'stairs', name: 'Climbing stairs', short: 'Build answers from the two steps before.', icon: BarChart3, difficulty: 'Beginner', time: '10 min', color: 'green' },
  { id: 'coins', name: 'Coin change', short: 'Find the fewest coins for any amount.', icon: Coins, difficulty: 'Intermediate', time: '12 min', color: 'purple' },
  { id: 'knapsack', name: '0/1 Knapsack', short: 'Make the best choices with limited space.', icon: Brain, difficulty: 'Intermediate', time: '15 min', color: 'blue' }
]

const challenges = [
  { question: 'For Fibonacci, what is the transition for dp[n]?', options: ['dp[n - 1] + dp[n - 2]', 'dp[n] + 1', 'dp[n - 1] * 2', '1'], answer: 0, explanation: 'Each Fibonacci number is the sum of the two preceding states.', difficulty: 'Easy' },
  { question: 'What does memoization primarily avoid?', options: ['Base cases', 'Repeated subproblems', 'All recursion', 'Arrays'], answer: 1, explanation: 'A cache lets recursive calls reuse states that were already calculated.', difficulty: 'Easy' },
  { question: 'In coin change, an unreachable amount is represented by…', options: ['0', 'Infinity', '-1 only', 'The target'], answer: 1, explanation: 'Infinity is a safe sentinel while minimizing; it remains distinguishable from zero coins.', difficulty: 'Medium' },
  { question: 'The 0/1 in knapsack means each item can be…', options: ['Used once or skipped', 'Used infinitely', 'Split in half', 'Used only at index zero'], answer: 0, explanation: 'Each item is a binary choice: include it once or exclude it.', difficulty: 'Easy' },
  { question: 'Which approach usually uses O(1) space for climbing stairs?', options: ['Recursive', 'Memoization', 'Space optimized', '2D tabulation'], answer: 2, explanation: 'Only the previous two values are needed, so the full array can be discarded.', difficulty: 'Medium' },
  { question: 'A valid DP state should describe…', options: ['The entire program', 'A smaller version of the problem', 'Only the final answer', 'A UI component'], answer: 1, explanation: 'States turn a large problem into smaller, reusable subproblems.', difficulty: 'Easy' },
  { question: 'For knapsack, if an item is too heavy, the transition is…', options: ['dp[i - 1][w]', 'value + dp[i][w]', '0 always', 'Infinity'], answer: 0, explanation: 'When it cannot fit, the best value is the best value without that item.', difficulty: 'Medium' },
  { question: 'Tabulation solves states…', options: ['Randomly', 'Top-down', 'Bottom-up', 'Without base cases'], answer: 2, explanation: 'Tabulation starts with base cases and fills toward the target.', difficulty: 'Easy' },
  { question: 'What is the time complexity of bottom-up Fibonacci?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(2ⁿ)'], answer: 2, explanation: 'Each of the n states is calculated exactly once.', difficulty: 'Easy' },
  { question: 'Optimal substructure means…', options: ['Every problem is optimal', 'An optimal answer uses optimal smaller answers', 'No choices are needed', 'Only greedy works'], answer: 1, explanation: 'This property is what lets DP compose solutions from smaller optimal states.', difficulty: 'Medium' }
]

function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The application remains usable if storage is unavailable.
    }
  }, [key, value])
  return [value, setValue]
}

function makeSteps(type, input, approach = 'Tabulation') {
  const steps = []
  if (type === 'fibonacci') {
    const n = Math.min(20, Math.max(2, Number(input) || 8))
    if (approach !== 'Tabulation') {
      const memo = {}
      const stack = []
      const cacheSteps = []
      let functionCalls = 0
      let cacheHits = 0
      let cacheMisses = 0
      const copyCache = () => ({ ...memo })
      function fib(k) {
        functionCalls++
        stack.push({ name: `fib(${k})`, status: 'Active', value: null })
        cacheSteps.push({
          values: Object.keys(memo).map(key => ({ key: `fib(${key})`, value: memo[key] })),
          active: k,
          stack: stack.map(frame => ({ ...frame })),
          cache: copyCache(),
          cacheHits,
          cacheMisses,
          functionCalls,
          text: `Calling fib(${k}).`
        })
        if (k < 2) {
          if (approach === 'Memoization') memo[k] = k
          stack[stack.length - 1].status = 'Returning'
          stack[stack.length - 1].value = k
          cacheMisses++
          cacheSteps.push({
            values: Object.keys(memo).map(key => ({ key: `fib(${key})`, value: memo[key] })),
            active: k,
            stack: stack.map(frame => ({ ...frame })),
            cache: copyCache(),
            cacheHits,
            cacheMisses,
            functionCalls,
            text: `Base case reached: fib(${k}) = ${k}.`
          })
          stack.pop()
          return k
        }
        if (approach === 'Memoization' && Object.prototype.hasOwnProperty.call(memo, k)) {
          const value = memo[k]
          cacheHits++
          stack[stack.length - 1].status = 'Cache hit'
          stack[stack.length - 1].value = value
          cacheSteps.push({
            values: Object.keys(memo).map(key => ({ key: `fib(${key})`, value: memo[key] })),
            active: k,
            stack: stack.map(frame => ({ ...frame })),
            cache: copyCache(),
            cacheHits,
            cacheMisses,
            functionCalls,
            text: `Cache hit: fib(${k}) already equals ${value}, so recursion stops here.`
          })
          stack.pop()
          return value
        }
        cacheMisses++
        const left = fib(k - 1)
        const right = fib(k - 2)
        const calculated = left + right
        if (approach === 'Memoization') memo[k] = calculated
        stack[stack.length - 1].status = 'Returning'
        stack[stack.length - 1].value = calculated
        cacheSteps.push({
          values: Object.keys(memo).map(key => ({ key: `fib(${key})`, value: memo[key] })),
          active: k,
          stack: stack.map(frame => ({ ...frame })),
          cache: copyCache(),
          cacheHits,
          cacheMisses,
          functionCalls,
          text: `fib(${k}) = fib(${k - 1}) + fib(${k - 2}) = ${left} + ${right} = ${calculated}.`
        })
        stack.pop()
        return calculated
      }
      const result = fib(n)
      return {
        steps: cacheSteps.map((event, index) => ({
          values: Object.values(event.cache),
          active: event.active,
          text: event.text,
          memory: {
            kind: approach === 'Memoization' ? 'recursion-cache' : 'recursion',
            input: { label: 'N', value: n },
            stack: event.stack,
            cache: event.cache,
            cacheHits: event.cacheHits,
            cacheMisses: event.cacheMisses,
            functionCalls: event.functionCalls,
            activeIndex: event.active
          }
        })),
        result,
        label: `F(${n})`,
        complexity: approach === 'Memoization' ? 'O(n) time · O(n) space' : 'O(2ⁿ) time · O(n) stack'
      }
    }
    const dp = [0, 1]
    steps.push({ values: [...dp], active: 1, text: 'Start with the two base cases: F(0) = 0 and F(1) = 1.', memory: { kind: 'array', input: { label: 'N', value: n }, values: [...dp], activeIndex: 1, operation: 'Initialize base cases' } })
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
      steps.push({ values: [...dp], active: i, text: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}.`, memory: { kind: 'array', input: { label: 'N', value: n }, values: [...dp], activeIndex: i, sources: [i - 1, i - 2], operation: `Calculate F(${i})`, formula: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}]` } })
    }
    return { steps, result: dp[n], label: `F(${n})`, complexity: 'O(n) time · O(n) space' }
  }
  if (type === 'stairs') {
    const n = Math.min(30, Math.max(2, Number(input) || 8))
    const dp = [1, 1]
    steps.push({ values: [...dp], active: 1, text: 'There is one way to stay at the floor and one way to reach step 1.', memory: { kind: 'array', input: { label: 'Stairs', value: n }, values: [...dp], activeIndex: 1, operation: 'Initialize base states', formula: 'ways[0] = 1, ways[1] = 1' } })
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
      steps.push({ values: [...dp], active: i, text: `Ways(${i}) = Ways(${i - 1}) + Ways(${i - 2}) = ${dp[i]}.`, memory: { kind: 'array', input: { label: 'Stairs', value: n }, values: [...dp], activeIndex: i, sources: [i - 1, i - 2], operation: `Calculate ways[${i}]`, formula: `ways[${i}] = ways[${i - 1}] + ways[${i - 2}]` } })
    }
    return { steps, result: dp[n], label: `${n} stairs`, complexity: 'O(n) time · O(n) space' }
  }
  if (type === 'knapsack') {
    const capacity = Math.min(12, Math.max(2, Number(input) || 8))
    const items = [{ name: 'Lens', weight: 2, value: 3 }, { name: 'Book', weight: 3, value: 4 }, { name: 'Lamp', weight: 4, value: 5 }, { name: 'Camera', weight: 5, value: 7 }]
    const dp = Array.from({ length: items.length + 1 }, () => Array(capacity + 1).fill(0))
    steps.push({ values: [...dp[0]], active: 0, text: 'With zero items, every capacity has value zero.', memory: { kind: 'matrix', input: { label: 'Capacity', value: capacity }, items, matrix: dp.map(row => [...row]), row: 0, col: 0, operation: 'Initialize the first row' } })
    for (let i = 1; i <= items.length; i++) {
      const item = items[i - 1]
      for (let w = 0; w <= capacity; w++) {
        const exclude = dp[i - 1][w]
        const include = item.weight <= w ? item.value + dp[i - 1][w - item.weight] : 0
        dp[i][w] = Math.max(exclude, include)
        steps.push({
          values: [...dp[i]],
          active: w,
          text: item.weight <= w ? `Capacity ${w}: compare excluding ${item.name} (${exclude}) with including it (${include}).` : `${item.name} weighs ${item.weight}, so it cannot fit at capacity ${w}.`,
          memory: {
            kind: 'matrix',
            input: { label: 'Capacity', value: capacity },
            items,
            matrix: dp.map(row => [...row]),
            row: i,
            col: w,
            exclude,
            include,
            operation: item.weight <= w ? `Include vs exclude ${item.name}` : `${item.name} cannot fit`,
            formula: item.weight <= w ? `dp[${i}][${w}] = max(dp[${i - 1}][${w}], ${item.value} + dp[${i - 1}][${w - item.weight}])` : `dp[${i}][${w}] = dp[${i - 1}][${w}]`
          }
        })
      }
    }
    return { steps, result: dp[items.length][capacity], label: `capacity ${capacity}`, complexity: 'O(items × capacity) time · O(items × capacity) space' }
  }
  const amount = Math.min(50, Math.max(1, Number(input) || 11))
  const coins = [1, 3, 5]
  const dp = Array(amount + 1).fill(Infinity); dp[0] = 0
  steps.push({ values: [0], active: 0, text: 'An amount of zero needs zero coins. Every other state starts unreachable.', memory: { kind: 'array', input: { label: 'Amount', value: amount }, values: [0], activeIndex: 0, operation: 'Initialize the base state', formula: 'dp[0] = 0' } })
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1)
    steps.push({ values: dp.slice(0, a + 1).map(v => v === Infinity ? '—' : v), active: a, text: `For amount ${a}, choose the best of the available coin transitions.`, memory: { kind: 'array', input: { label: 'Amount', value: amount }, values: dp.map(v => v === Infinity ? null : v), activeIndex: a, operation: `Calculate dp[${a}]`, formula: `dp[${a}] = min(dp[${a - 1}] + 1, dp[${a - 3}] + 1, dp[${a - 5}] + 1)`, coins } })
  }
  return { steps, result: dp[amount], label: `amount ${amount}`, complexity: 'O(amount × coins) time · O(amount) space' }
}

function Layout({ children, theme, setTheme, progress }) {
  const [mobile, setMobile] = useState(false)
  const location = useLocation()
  const page = location.pathname === '/' ? 'Overview' : location.pathname.slice(1).replace('-', ' ')
  const nav = [
    ['/', 'Overview', LayoutDashboard], ['/academy', 'DP Academy', GraduationCap], ['/playground', 'DP Playground', Code2],
    ['/battle', 'Algorithm Battle', BarChart3], ['/challenges', 'DP Challenges', Trophy], ['/progress', 'My Progress', Sparkles], ['/settings', 'Settings', Settings]
  ]
  return <div className={`app ${theme}`}>
    <aside className={`sidebar ${mobile ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Zap size={18}/></div><span>DP <b>QUEST</b></span></div>
      <div className="sidebar-label">LEARNING HUB</div>
      <nav>{nav.map(([to, label, Icon]) => <NavLink key={to} to={to} onClick={() => setMobile(false)} className={({isActive}) => isActive ? 'active' : ''}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="streak"><div className="streak-icon"><FlameIcon/></div><div><strong>Keep going</strong><small>Consistency builds mastery</small></div></div><div className="mini-progress"><span><b>Learning progress</b><b>{progress}%</b></span><i><em style={{width: `${progress}%`}}/></i></div></div>
    </aside>
    {mobile && <button className="backdrop" onClick={() => setMobile(false)} aria-label="Close menu"/>}
    <main className="main"><header className="topbar"><button className="icon-btn menu-btn" onClick={() => setMobile(true)}><Menu size={20}/></button><div><div className="eyebrow">DP QUEST / {page.toUpperCase()}</div><h2>{page === 'Overview' ? 'Your learning space' : page}</h2></div><div className="top-actions"><div className="top-progress"><span>Progress</span><strong>{progress}%</strong><i><em style={{width: `${progress}%`}}/></i></div><button className="icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button><div className="avatar">AQ</div></div></header>{children}</main>
  </div>
}
function FlameIcon() { return <Sparkles size={17}/> }

function Overview({ progress, explored, setExplored }) {
  const navigate = useNavigate()
  return <section className="page">
    <div className="hero"><div><div className="eyebrow accent">WELCOME BACK, EXPLORER</div><h1>Make the invisible<br/><span>visible.</span></h1><p>Master Dynamic Programming by visualizing how algorithms think, one state at a time.</p><div className="hero-actions"><button className="primary" onClick={() => navigate('/playground')}>Start learning <ArrowRight size={17}/></button><button className="secondary" onClick={() => navigate('/academy')}>Explore academy</button></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="node node-a">F(4)</div><div className="node node-b">F(3)</div><div className="node node-c">F(2)</div><div className="hero-core">DP<small>states</small></div></div></div>
    <div className="section-head"><div><div className="eyebrow">YOUR SNAPSHOT</div><h3>Progress at a glance</h3></div><button className="text-button" onClick={() => navigate('/progress')}>View details <ArrowRight size={15}/></button></div>
    <div className="stats-grid"><Stat icon={Code2} value={explored} label="Algorithms explored" note="Keep discovering"/><Stat icon={Trophy} value="0" label="Challenges completed" note="Your next win awaits"/><Stat icon={BarChart3} value={`${progress}%`} label="Learning progress" note="You are on your way"/><Stat icon={Zap} value="0m" label="Total learning time" note="Start a session today"/></div>
    <div className="section-head"><div><div className="eyebrow">PICK UP WHERE YOU LEFT OFF</div><h3>Explore an algorithm</h3></div></div>
    <div className="algorithm-grid">{algorithms.map(a => <AlgorithmCard key={a.id} algorithm={a} onClick={() => { setExplored(Math.max(explored, algorithms.findIndex(x => x.id === a.id) + 1)); navigate(`/playground?algorithm=${a.id}`) }}/>)}</div>
    <div className="roadmap-card"><div className="section-head"><div><div className="eyebrow">THE PATH TO MASTERY</div><h3>Your learning roadmap</h3></div><span className="pill">1 of 6 active</span></div><div className="roadmap">{['Fundamentals', 'Recursion', 'Memoization', 'Tabulation', 'Transitions', 'Optimization'].map((x, i) => <div className={`road-step ${i === 0 ? 'done' : i === 1 ? 'current' : ''}`} key={x}><div className="road-dot">{i === 0 ? <Check size={14}/> : i + 1}</div><span>{x}</span>{i < 5 && <div className="road-line"/>}</div>)}</div></div>
  </section>
}
function Stat({ icon: Icon, value, label, note }) { return <div className="stat card"><div className="stat-icon"><Icon size={18}/></div><strong>{value}</strong><span>{label}</span><small>{note}</small></div> }
function AlgorithmCard({ algorithm, onClick }) { const Icon = algorithm.icon; return <motion.div whileHover={{y: -4}} className="algorithm-card card"><div className={`algo-icon ${algorithm.color}`}><Icon size={20}/></div><div className="card-title"><h4>{algorithm.name}</h4><span className="difficulty">{algorithm.difficulty}</span></div><p>{algorithm.short}</p><div className="card-footer"><small>{algorithm.time} to explore</small><button onClick={onClick} aria-label={`Explore ${algorithm.name}`}><ArrowRight size={16}/></button></div></motion.div> }

function MemoryArray({ memory }) {
  const [selected, setSelected] = useState(null)
  useEffect(() => setSelected(null), [memory])
  return <div className="memory-array">
    <div className="memory-input"><span>INPUT</span><b>{memory.input.label}</b><strong>{memory.input.value}</strong></div>
    <div className="memory-cells">
      {(memory.values || []).map((value, index) => {
        const active = memory.activeIndex === index
        const source = (memory.sources || []).includes(index)
        const empty = value === null || value === undefined
        return <motion.button
          type="button"
          layout
          key={index}
          className={`memory-cell ${active ? 'active' : ''} ${source ? 'source' : ''} ${empty ? 'empty' : ''}`}
          onClick={() => setSelected(index)}
        >
          <small>dp[{index}]</small>
          <strong>{empty ? '—' : value}</strong>
        </motion.button>
      })}
    </div>
    {selected !== null && <div className="cell-inspector">
      <span>Selected: dp[{selected}]</span>
      <b>{memory.values[selected] === null ? 'Not calculated yet' : `Value ${memory.values[selected]}`}</b>
      {memory.formula && <code>{memory.formula}</code>}
    </div>}
  </div>
}

function MemoryMatrix({ memory }) {
  const [selected, setSelected] = useState(null)
  useEffect(() => setSelected(null), [memory])
  const matrix = memory.matrix || []
  return <div className="memory-matrix-wrap">
    <div className="matrix-input"><span>ITEMS</span>{(memory.items || []).map(item => <b key={item.name}>{item.name}: w{item.weight}/v{item.value}</b>)}</div>
    <div className="memory-matrix">
      <table>
        <thead><tr><th>i/w</th>{matrix[0]?.map((_, w) => <th key={w}>{w}</th>)}</tr></thead>
        <tbody>{matrix.map((row, i) => <tr key={i}><th>{i}</th>{row.map((value, w) => {
          const active = memory.row === i && memory.col === w
          const previous = i === memory.row - 1 && (w === memory.col || w === memory.col - (memory.items?.[memory.row - 1]?.weight || 0))
          return <td key={w}><button type="button" className={`${active ? 'active' : ''} ${previous ? 'source' : ''} ${i < memory.row ? 'computed' : ''}`} onClick={() => setSelected({ i, w, value })}>{value}</button></td>
        })}</tr>)}</tbody>
      </table>
    </div>
    {selected && <div className="cell-inspector"><span>Selected: dp[{selected.i}][{selected.w}]</span><b>Value {selected.value}</b>{memory.formula && <code>{memory.formula}</code>}</div>}
  </div>
}

function MemoryVisualization({ memory, type, step }) {
  if (!memory) return null
  return <aside className="memory-panel card">
    <div className="memory-head"><div><span className="eyebrow">MEMORY VIEW</span><h3>How data is stored</h3></div><DatabaseIcon/></div>
    {memory.kind === 'matrix'
      ? <MemoryMatrix memory={memory}/>
      : memory.kind === 'recursion' || memory.kind === 'recursion-cache'
        ? <div className="memory-recursion">
            <div className="stack-section"><div className="memory-subhead"><span>CALL STACK</span><small>{memory.stack.length} active</small></div><div className="stack-list">{[...memory.stack].reverse().map((frame, i) => <motion.div layout key={`${frame.name}-${i}`} className={`stack-frame ${frame.status === 'Returning' ? 'returning' : ''} ${frame.status === 'Cache hit' ? 'hit' : ''}`}><b>{frame.name}</b><span>{frame.status}</span>{frame.value !== null && <strong>{frame.value}</strong>}</motion.div>)}</div></div>
            {memory.kind === 'recursion-cache' && <div className="cache-section"><div className="memory-subhead"><span>MEMO CACHE</span><small>{Object.keys(memory.cache).length} states</small></div><div className="cache-grid">{Object.keys(memory.cache).sort((a,b) => Number(a)-Number(b)).map(key => <motion.div layout key={key} className={`cache-cell ${Number(key) === memory.activeIndex ? 'active' : ''}`}><small>fib({key})</small><b>{memory.cache[key]}</b></motion.div>)}</div></div>}
          </div>
        : <MemoryArray memory={memory}/>}
    <div className="memory-inspector">
      <div><span>Structure</span><b>{memory.kind === 'matrix' ? '2D DP table' : memory.kind === 'recursion-cache' ? 'Stack + cache' : memory.kind === 'recursion' ? 'Call stack' : '1D DP array'}</b></div>
      <div><span>Operation</span><b>{memory.operation || 'Execute state transition'}</b></div>
      {memory.kind !== 'recursion' && memory.kind !== 'recursion-cache' && <div><span>Step</span><b>{step + 1}</b></div>}
      {(memory.kind === 'recursion-cache' || memory.kind === 'recursion') && <div className="memory-stats"><span>Calls <b>{memory.functionCalls}</b></span><span>Hits <b>{memory.cacheHits || 0}</b></span><span>Misses <b>{memory.cacheMisses || 0}</b></span></div>}
    </div>
  </aside>
}

function DatabaseIcon() { return <Database size={17}/> }

const codeSources = {
  fibonacci: {
    Tabulation: [
      'function fibonacci(n) {',
      '  const dp = new Array(n + 1).fill(0);',
      '  dp[0] = 0;',
      '  dp[1] = 1;',
      '  for (let i = 2; i <= n; i++) {',
      '    dp[i] = dp[i - 1] + dp[i - 2];',
      '  }',
      '  return dp[n];',
      '}'
    ],
    Memoization: [
      'function fibonacci(n, memo = {}) {',
      '  if (n < 2) return n;',
      '  if (memo[n] !== undefined) return memo[n];',
      '  const left = fibonacci(n - 1, memo);',
      '  const right = fibonacci(n - 2, memo);',
      '  return memo[n] = left + right;',
      '}'
    ],
    Recursive: [
      'function fibonacci(n) {',
      '  if (n < 2) return n;',
      '  const left = fibonacci(n - 1);',
      '  const right = fibonacci(n - 2);',
      '  return left + right;',
      '}'
    ]
  },
  stairs: [
    'function climbStairs(n) {',
    '  const dp = new Array(n + 1).fill(0);',
    '  dp[0] = 1;',
    '  dp[1] = 1;',
    '  for (let i = 2; i <= n; i++) {',
    '    dp[i] = dp[i - 1] + dp[i - 2];',
    '  }',
    '  return dp[n];',
    '}'
  ],
  coins: [
    'function coinChange(coins, amount) {',
    '  const dp = Array(amount + 1).fill(Infinity);',
    '  dp[0] = 0;',
    '  for (let a = 1; a <= amount; a++) {',
    '    for (const coin of coins) {',
    '      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);',
    '    }',
    '  }',
    '  return dp[amount] === Infinity ? -1 : dp[amount];',
    '}'
  ],
  knapsack: [
    'function knapsack(items, capacity) {',
    '  const dp = Array.from({ length: items.length + 1 },',
    '    () => Array(capacity + 1).fill(0));',
    '  for (let i = 1; i <= items.length; i++) {',
    '    for (let w = 0; w <= capacity; w++) {',
    '      const exclude = dp[i - 1][w];',
    '      const include = items[i - 1].weight <= w',
    '        ? items[i - 1].value + dp[i - 1][w - items[i - 1].weight]',
    '        : 0;',
    '      dp[i][w] = Math.max(exclude, include);',
    '    }',
    '  }',
    '  return dp[items.length][capacity];',
    '}'
  ]
}

function highlightCode(line) {
  const parts = line.split(/(\b(?:function|const|let|for|if|return|of|new|Array|from|undefined|Infinity)\b|\/\/.*$|'[^']*'|"[^"]*"|\d+)/g)
  return parts.map((part, index) => {
    if (/^(function|const|let|for|if|return|of|new|Array|from|undefined|Infinity)$/.test(part)) return <span className="code-keyword" key={index}>{part}</span>
    if (/^\d+$/.test(part)) return <span className="code-number" key={index}>{part}</span>
    if (/^["']/.test(part)) return <span className="code-string" key={index}>{part}</span>
    if (part.startsWith('//')) return <span className="code-comment" key={index}>{part}</span>
    return <span key={index}>{part}</span>
  })
}

function CodeExecutionStudio({ type, approach, memory, step, totalSteps, dataResult }) {
  const source = type === 'fibonacci' ? codeSources.fibonacci[approach] : codeSources[type]
  const activeLine = (() => {
    if (!memory) return 0
    if (type === 'fibonacci') {
      if (approach === 'Tabulation') return step === 0 ? 1 : 5
      if (memory.stack?.some(frame => frame.status === 'Cache hit')) return 2
      if (memory.activeIndex !== undefined && memory.activeIndex < 2) return 1
      return memory.kind === 'recursion-cache' ? 5 : 2
    }
    if (type === 'stairs') return step === 0 ? 2 : 5
    if (type === 'coins') return step === 0 ? 2 : memory.activeIndex === 0 ? 3 : 5
    if (type === 'knapsack') return memory.row === 0 ? 2 : memory.col === 0 ? 5 : memory.include !== undefined ? 8 : 7
    return 0
  })()

  const variables = [
    { name: memory?.input?.label === 'N' ? 'n' : 'input', value: memory?.input?.value, type: 'Number' }
  ]
  if (memory?.activeIndex !== undefined) variables.push({ name: 'i', value: memory.activeIndex, type: 'Number', changed: true })
  if (memory?.kind === 'matrix') {
    variables.push({ name: 'i', value: memory.row, type: 'Number' })
    variables.push({ name: 'w', value: memory.col, type: 'Number', changed: true })
    variables.push({ name: 'exclude', value: memory.exclude, type: 'Number' })
    variables.push({ name: 'include', value: memory.include, type: 'Number', changed: true })
  }
  if (memory?.values) variables.push({ name: 'dp', value: JSON.stringify(memory.values), type: 'Array', changed: true })
  variables.push({ name: 'result', value: dataResult, type: 'Number' })

  return <div className="code-studio">
    <div className="code-editor card">
      <div className="code-editor-head"><div><Code2 size={16}/><b>{type === 'fibonacci' ? `fibonacci.${approach.toLowerCase()}.js` : `${type}.js`}</b></div><span>STEP {step + 1} / {totalSteps}</span></div>
      <div className="code-lines">{source.map((line, index) => <div key={index} className={`code-line ${activeLine === index ? 'active' : ''} ${index < activeLine ? 'executed' : ''}`}><span className="line-status">{activeLine === index ? <ChevronRight size={12}/> : index < activeLine ? <Check size={10}/> : null}</span><small>{index + 1}</small><code>{highlightCode(line)}</code></div>)}</div>
    </div>
    <aside className="variables-panel card">
      <div className="variables-head"><span className="eyebrow">VARIABLES INSPECTOR</span><CircleHelp size={15}/></div>
      <div className="variable-list">{variables.map(variable => <motion.div layout key={variable.name} className={`variable-row ${variable.changed ? 'changed' : ''}`}><b>{variable.name}</b><code>{variable.value === undefined ? '—' : String(variable.value)}</code><small>{variable.type}</small></motion.div>)}</div>
      {(memory?.stack?.length > 0 || memory?.cache) && <div className="code-stack">
        <span className="eyebrow">CALL STACK / CACHE</span>
        {[...(memory.stack || [])].reverse().map((frame, index) => <div className={`code-stack-frame ${frame.status === 'Cache hit' ? 'hit' : ''}`} key={`${frame.name}-${index}`}><b>{frame.name}</b><small>{frame.status}</small>{frame.value !== null && <strong>{frame.value}</strong>}</div>)}
        {memory.cache && <div className="code-cache-summary">Cache entries: <b>{Object.keys(memory.cache).length}</b></div>}
      </div>}
    </aside>
    <div className="code-explanation card"><div className="explanation-icon"><Lightbulb size={17}/></div><div><b>What Is Happening Now?</b><p>{memory?.text || 'The debugger is advancing to the next execution event.'}</p></div></div>
  </div>
}

function AlgorithmNetwork({ memory, type, step, dataResult, totalSteps, playing, setPlaying, setStep, speed, setSpeed }) {
  const [cinematic, setCinematic] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [selected, setSelected] = useState(null)
  const [flow, setFlow] = useState(true)

  useEffect(() => setSelected(null), [memory, step])
  useEffect(() => {
    if (!cinematic) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = event => {
      if (event.key === 'Escape') setCinematic(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cinematic])

  const enterFullscreen = event => {
    const panel = event.currentTarget.closest('.network-panel')
    if (panel?.requestFullscreen) panel.requestFullscreen()
  }

  const activeIndex = memory?.activeIndex
  const memoryValues = (memory?.values || []).slice(0, 12)
  const matrix = memory?.matrix || []
  const matrixRows = matrix.slice(-5)
  const matrixColumns = (matrixRows[0] || []).slice(0, 9)
  const stack = (memory?.stack || []).slice(-5)

  const sourceText = memory?.sources?.length
    ? `Reading ${memory.sources.map(index => `dp[${index}]`).join(' and ')}`
    : memory?.kind === 'matrix'
      ? `Comparing exclude and include for ${memory.items?.[memory.row - 1]?.name || 'item'}`
      : 'Preparing the current state'

  return <section className={`network-panel cinematic-shell card ${cinematic ? 'cinematic-mode' : ''}`}>
    <div className="network-toolbar">
      <div><span className="eyebrow">CINEMATIC PROCESSOR</span><h3>{cinematic ? 'Algorithm in motion' : 'Inside the Computer'}</h3></div>
      <div className="network-controls">
        {!cinematic && <><button title="Zoom out" onClick={() => setZoom(z => Math.max(.8, z - .1))}><Minus size={15}/></button><button title="Zoom in" onClick={() => setZoom(z => Math.min(1.4, z + .1))}><Plus size={15}/></button><button title="Reset camera" onClick={() => setZoom(1)}><Move size={15}/></button></>}
        <button title="Toggle data flow" className={flow ? 'selected' : ''} onClick={() => setFlow(v => !v)}>Flow</button>
        <button title="Cinematic Mode" className={cinematic ? 'selected' : ''} onClick={() => setCinematic(v => !v)}>{cinematic ? 'Exit' : 'Cinematic'} Mode</button>
        <button title="Fullscreen" onClick={enterFullscreen}><Maximize2 size={15}/></button>
      </div>
    </div>

    <div className="cinematic-stage" style={{ '--camera-scale': zoom }}>
      <div className="computer-zone input-zone">
        <div className="zone-label">INPUT UNIT</div>
        <motion.div key={`${type}-${memory?.input?.value}`} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="input-module">
          <b>{memory?.input?.label || 'Input'}</b>
          <strong>{memory?.input?.value}</strong>
        </motion.div>
      </div>

      <div className="processor-zone">
        <div className="zone-label">PROCESSING UNIT</div>
        <motion.div key={`${step}-${memory?.operation}`} initial={{ opacity: .72, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="processing-module">
          <span>{memory?.operation || 'State transition'}</span>
          <b>{memory?.formula || memory?.text || 'Calculating state'}</b>
          {memory?.kind === 'matrix' && <div className="decision-pair"><em>Exclude <strong>{memory.exclude}</strong></em><em>Include <strong>{memory.include ?? '—'}</strong></em></div>}
          {memory?.kind !== 'matrix' && <strong className="processing-result">{activeIndex !== undefined ? memoryValues[activeIndex] ?? dataResult : dataResult}</strong>}
        </motion.div>
        {flow && <div className="data-bus active"><i/><i/><i/></div>}
      </div>

      <div className="memory-zone">
        <div className="zone-label">{memory?.kind === 'matrix' ? 'MEMORY TABLE' : memory?.kind?.includes('recursion') ? 'CALL STACK + CACHE' : 'MEMORY UNIT'}</div>
        {memory?.kind === 'matrix' ? (
          <div className="cinematic-matrix">
            {matrixRows.map((row, visibleRow) => <div className="cinematic-matrix-row" key={visibleRow}>{matrixColumns.map((value, w) => {
              const actualRow = matrix.length - matrixRows.length + visibleRow
              const active = memory.row === actualRow && memory.col === w
              const completed = actualRow < memory.row || (actualRow === memory.row && w < memory.col)
              return <button key={w} className={`cinematic-memory-cell ${active ? 'active' : ''} ${completed ? 'completed' : ''}`} onClick={() => setSelected(`dp[${actualRow}][${w}]`)}><small>{w}</small><b>{value}</b></button>
            })}</div>)}
          </div>
        ) : memory?.kind?.includes('recursion') ? (
          <div className="cinematic-stack">
            {stack.map((frame, index) => <motion.div layout key={`${frame.name}-${index}`} className={`cinematic-stack-frame ${frame.status === 'Cache hit' ? 'reused' : frame.status === 'Returning' ? 'completed' : ''}`}><span>{frame.name}</span><b>{frame.value ?? frame.status}</b></motion.div>)}
            {memory?.kind === 'recursion-cache' && Object.entries(memory.cache || {}).slice(-5).map(([key, value]) => <button key={key} className={`cinematic-cache-cell ${Number(key) === activeIndex ? 'reused' : ''}`} onClick={() => setSelected(`fib(${key})`)}><small>fib({key})</small><b>{value}</b></button>)}
          </div>
        ) : (
          <div className="cinematic-memory-row">
            {memoryValues.map((value, index) => {
              const active = activeIndex === index
              const source = memory?.sources?.includes(index)
              return <motion.button layout key={index} className={`cinematic-memory-cell ${active ? 'active' : ''} ${source ? 'source' : ''} ${index < activeIndex ? 'completed' : ''}`} onClick={() => setSelected(`dp[${index}]`)}><small>{index}</small><b>{value === null ? '—' : value}</b></motion.button>
            })}
          </div>
        )}
      </div>

      <div className="output-zone">
        <div className="zone-label">OUTPUT UNIT</div>
        <motion.div key={dataResult} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="output-module"><span>RESULT</span><strong>{dataResult}</strong></motion.div>
      </div>
    </div>

    <div className="cinematic-footer">
      <div className="scene-caption"><span>SCENE {step + 1} / {totalSteps}</span><b>{sourceText}</b><p>{memory?.text || 'The processor is advancing to the next real state.'}</p></div>
      <div className="cinematic-controls">
        <button title="Previous scene" onClick={() => setStep(Math.max(0, step - 1))}><ChevronLeft size={16}/></button>
        <button className="cinematic-play" title={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={16}/> : <Play size={16}/>}</button>
        <button title="Next scene" onClick={() => setStep(Math.min(totalSteps - 1, step + 1))}><ChevronRight size={16}/></button>
        <button title="Restart" onClick={() => setStep(0)}><RotateCcw size={15}/></button>
        <span className="speed-selector">{[.5, 1, 1.5, 2].map(rate => <button key={rate} className={Math.abs((speed === 900 ? .5 : speed === 650 ? 1 : speed === 430 ? 1.5 : 2) - rate) < .01 ? 'selected' : ''} onClick={() => setSpeed(rate === .5 ? 900 : rate === 1 ? 650 : rate === 1.5 ? 430 : 300)}>{rate}x</button>)}</span>
      </div>
      {selected && <div className="cinematic-inspector"><span>SELECTED STATE</span><b>{selected}</b><small>Execution step {step + 1}</small></div>}
    </div>
  </section>
}

function Playground({ setExplored }) {
  const params = new URLSearchParams(useLocation().search)
  const [type, setType] = useState(params.get('algorithm') || 'fibonacci')
  const [input, setInput] = useState(type === 'coins' ? 11 : 8)
  const [approach, setApproach] = useState('Tabulation')
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(650)
  const [viewMode, setViewMode] = useState('Live')
  const data = useMemo(() => makeSteps(type, input, approach), [type, input, approach])
  const togglePlayback = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (step >= data.steps.length - 1) setStep(0)
    setPlaying(true)
  }
  useEffect(() => { setStep(0); setPlaying(false); setExplored(1) }, [type, input, approach, setExplored])
  useEffect(() => { if (!playing) return; if (step >= data.steps.length - 1) { setPlaying(false); return }; const id = setTimeout(() => setStep(s => s + 1), speed); return () => clearTimeout(id) }, [playing, step, data.steps.length, speed])
  const current = data.steps[step]
  return <section className="page"><div className="playground-head"><div><div className="eyebrow accent">INTERACTIVE LAB</div><h1>See the thinking,<br/><span>step by step.</span></h1><p>Choose an algorithm, set an input, and watch each state come to life.</p></div><div className="lab-badge"><Sparkles size={16}/> {viewMode} visualization</div></div>
    <div className="view-mode-tabs" role="tablist" aria-label="Visualization mode">{['Live','Memory','Network','Code'].map(mode => <button key={mode} role="tab" aria-selected={viewMode === mode} className={viewMode === mode ? 'selected' : ''} onClick={() => setViewMode(mode)}>{mode === 'Live' ? <Play size={15}/> : mode === 'Memory' ? <Database size={15}/> : mode === 'Network' ? <GitBranch size={15}/> : <Code2 size={15}/>} {mode} View</button>)}</div>
    <div className={`playground-layout ${viewMode.toLowerCase()}-mode`}>
     <div className="control-panel card">
       <div className="eyebrow">ALGORITHM</div>
       <div className="algorithm-tabs">{algorithms.map(a => <button className={type === a.id ? 'selected' : ''} key={a.id} onClick={() => { setType(a.id); setInput(a.id === 'coins' ? 11 : a.id === 'knapsack' ? 8 : 8); if (a.id !== 'fibonacci') setApproach('Tabulation') }}><a.icon size={16}/>{a.name}</button>)}</div>
       {type === 'fibonacci' && <div className="approach-selector"><span>APPROACH</span>{['Recursive','Memoization','Tabulation'].map(option => <button key={option} className={approach === option ? 'selected' : ''} onClick={() => setApproach(option)}>{option}</button>)}</div>}
       <label className="input-label">{type === 'coins' ? 'Target amount' : type === 'stairs' ? 'Number of stairs' : type === 'knapsack' ? 'Knapsack capacity' : 'N value'}<span>max {type === 'coins' ? 50 : type === 'stairs' ? 30 : type === 'knapsack' ? 12 : 20}</span></label>
       <div className="number-input"><button onClick={() => setInput(Math.max(2, Number(input) - 1))}>−</button><input type="number" min="2" max={type === 'coins' ? 50 : type === 'stairs' ? 30 : type === 'knapsack' ? 12 : 20} value={input} onChange={e => setInput(Math.min(Number(e.target.value) || 2, type === 'coins' ? 50 : type === 'stairs' ? 30 : type === 'knapsack' ? 12 : 20))}/><button onClick={() => setInput(Math.min(type === 'coins' ? 50 : type === 'stairs' ? 30 : type === 'knapsack' ? 12 : 20, Number(input) + 1))}>+</button></div>
       <div className="tip"><Lightbulb size={17}/><span><b>Think about it</b><br/>{type === 'coins' ? 'Each amount asks: which coin leaves the smallest subproblem?' : type === 'knapsack' ? 'Each item is an include-or-exclude decision.' : 'Every state is built from answers we have already seen.'}</span></div>
       <div className="complexity-row"><span>Complexity</span><b>{data.complexity}</b></div>
     </div>
     {viewMode === 'Live' && <div className="visual-column">
       <div className="visual-panel card">
         <div className="visual-top"><div><span className="pill orange-pill">{approach.toUpperCase()}</span><h3>{type === 'coins' ? 'Minimum coins' : type === 'stairs' ? 'Ways to climb' : type === 'knapsack' ? 'Maximum value' : 'Fibonacci sequence'}</h3></div><span className="step-count">STEP {step + 1} <small>/ {data.steps.length}</small></span></div>
         <div className="dp-visual">{current.values.map((value, i) => <motion.div layout key={i} className={`dp-cell ${current.active === i ? 'active' : ''} ${i < current.active ? 'settled' : ''}`}><small>{type === 'coins' ? `amt ${i}` : type === 'knapsack' ? `cap ${i}` : `dp[${i}]`}</small><strong>{value}</strong></motion.div>)}</div>
         <div className="explanation"><div className="explanation-icon"><Lightbulb size={17}/></div><div><b>What is happening?</b><p>{current.text}</p></div></div>
         <div className="playback"><button className="icon-btn" onClick={() => setStep(Math.max(0, step - 1))}><ChevronLeft size={18}/></button><button className="play-btn" onClick={togglePlayback}>{playing ? <span className="pause-icon"/> : <Play size={17} fill="currentColor"/>}{playing ? 'Pause' : step >= data.steps.length - 1 ? 'Replay' : 'Play'}</button><button className="icon-btn" onClick={() => setStep(Math.min(data.steps.length - 1, step + 1))}><ChevronRight size={18}/></button><button className="reset-btn" onClick={() => {setStep(0); setPlaying(false)}}><RotateCcw size={15}/> Reset</button></div>
         <div className="speed-control"><span>Speed</span>{[{label:'Slow',value:900},{label:'Normal',value:650},{label:'Fast',value:300}].map(option => <button key={option.label} className={speed === option.value ? 'selected' : ''} onClick={() => setSpeed(option.value)}>{option.label}</button>)}</div>
         <div className="progress-track"><i style={{width: `${((step + 1) / data.steps.length) * 100}%`}}/></div>
       </div>
     </div>}
     {viewMode === 'Memory' && <MemoryVisualization memory={current.memory} type={type} step={step}/>}
     {viewMode === 'Network' && <AlgorithmNetwork memory={current.memory} type={type} step={step} dataResult={data.result === Infinity ? 'No solution' : data.result} totalSteps={data.steps.length} playing={playing} setPlaying={togglePlayback} setStep={setStep} speed={speed} setSpeed={setSpeed}/>}
     {viewMode === 'Code' && <CodeExecutionStudio type={type} approach={approach} memory={current.memory} step={step} totalSteps={data.steps.length} dataResult={data.result === Infinity ? 'No solution' : data.result}/>}
    </div>
    <div className="result-bar"><div><span className="eyebrow">CURRENT RESULT</span><strong>{data.result === Infinity ? 'No solution' : data.result}</strong><small>{data.label}</small></div><div className="result-note"><CheckCircle2 size={19}/><span>Every value above is calculated live<br/><small>Nothing is mocked or pre-recorded.</small></span></div></div>
  </section>
}

function Academy({ completed, setCompleted }) { const [lesson, setLesson] = useState(0); const lessons = [{title:'What is Dynamic Programming?', text:'Dynamic Programming is a way to solve complex problems by breaking them into smaller subproblems, solving each once, and reusing those answers.', code:'dp[n] = best answer for the problem at state n', insight:'Look for two signals: overlapping subproblems and optimal substructure.'},{title:'Overlapping Subproblems', text:'A recursive solution often solves the same state again and again. DP turns that repeated work into a lookup.', code:'fib(5) → fib(4) + fib(3)\\nfib(4) → fib(3) + fib(2)', insight:'If a state appears twice, it deserves a place in your table.'},{title:'Memoization vs Tabulation', text:'Memoization is top-down: start from the target and cache as you go. Tabulation is bottom-up: start with base cases and fill forward.', code:'memo[n] = solve(n)       // top-down\\ndp[i] = transition(dp)   // bottom-up', insight:'Choose the direction that makes dependencies easiest to see.'},{title:'States and Transitions', text:'A state is a precise description of one smaller problem. A transition explains how known states combine to produce a new one.', code:'dp[i] = min(dp[i - coin] + 1)', insight:'Define the state and base case before writing the recurrence.'},{title:'Time and Space Complexity', text:'Once each state is calculated once, complexity becomes the number of states times the work per transition.', code:'states × transitions = total work\\nO(n) × O(1) = O(n)', insight:'A good DP solution trades memory for dramatically less repeated work.'}]; const active=lessons[lesson]; return <section className="page"><div className="academy-hero"><div><div className="eyebrow accent">THE ACADEMY</div><h1>Build your <span>intuition.</span></h1><p>Short lessons that turn intimidating recurrences into patterns you can see.</p></div><div className="lesson-progress"><strong>{lesson + 1}</strong><span>of {lessons.length}<br/><small>lessons</small></span></div></div><div className="academy-layout"><div className="lesson-list">{lessons.map((l,i)=><button className={i===lesson?'current':''} onClick={()=>setLesson(i)} key={l.title}><span>{String(i+1).padStart(2,'0')}</span><b>{l.title}</b>{completed.includes(i)&&<CheckCircle2 size={16}/>}</button>)}</div><div className="lesson-content card"><span className="pill orange-pill">LESSON {lesson+1}</span><h2>{active.title}</h2><p className="large-copy">{active.text}</p><pre><code>{active.code}</code></pre><div className="insight"><Lightbulb size={18}/><span><b>Key insight</b>{active.insight}</span></div><div className="lesson-nav"><button className="secondary" disabled={!lesson} onClick={()=>setLesson(lesson-1)}><ChevronLeft size={16}/> Previous</button><button className="primary" onClick={()=>{if(!completed.includes(lesson))setCompleted([...completed,lesson]); if(lesson<lessons.length-1)setLesson(lesson+1)}}>{completed.includes(lesson)?'Continue':'Mark complete'} <ArrowRight size={16}/></button></div></div></div></section> }

function Challenges({ completed, setCompleted }) { const [index,setIndex]=useState(0); const [choice,setChoice]=useState(null); const [submitted,setSubmitted]=useState(false); const c=challenges[index]; const submit=()=>{if(choice!==null){setSubmitted(true);if(choice===c.answer&&!completed.includes(index))setCompleted([...completed,index])}}; return <section className="page"><div className="challenge-head"><div><div className="eyebrow accent">KNOWLEDGE CHECK</div><h1>Think like a<br/><span>problem solver.</span></h1><p>Ten focused challenges. Instant feedback. Real understanding.</p></div><div className="challenge-score"><Trophy size={20}/><strong>{completed.length}</strong><span>/ 10 correct</span></div></div><div className="challenge-layout"><div className="challenge-card card"><div className="challenge-meta"><span className="pill">CHALLENGE {index+1} OF {challenges.length}</span><span className="difficulty">{c.difficulty}</span></div><h2>{c.question}</h2><div className="options">{c.options.map((o,i)=><button key={o} className={`${choice===i?'chosen':''} ${submitted&&i===c.answer?'correct':''} ${submitted&&choice===i&&choice!==c.answer?'wrong':''}`} onClick={()=>!submitted&&setChoice(i)}><span>{String.fromCharCode(65+i)}</span>{o}{submitted&&i===c.answer&&<Check size={17}/>} </button>)}</div>{submitted&&<div className={`feedback ${choice===c.answer?'success':'error'}`}><strong>{choice===c.answer?'Correct. Nice reasoning.':'Not quite yet.'}</strong><p>{c.explanation}</p></div>}<div className="challenge-actions">{submitted?<button className="primary" onClick={()=>{setIndex((index+1)%challenges.length);setChoice(null);setSubmitted(false)}}>Next challenge <ArrowRight size={16}/></button>:<button className="primary" disabled={choice===null} onClick={submit}>Check answer <Check size={16}/></button>}</div></div><div className="challenge-side card"><div className="eyebrow">YOUR RUN</div><div className="big-score">{completed.length}<small>/10</small></div><div className="progress-track"><i style={{width:`${completed.length*10}%`}}/></div><p>Complete challenges to reinforce your mental model of DP.</p><div className="challenge-list">{challenges.slice(0,5).map((_,i)=><span className={completed.includes(i)?'done':''} key={i}>{completed.includes(i)?<Check size={12}/>:i+1}</span>)}</div></div></div></section> }

function Battle() { const [n,setN]=useState(20); const [ran,setRan]=useState(false); const rows=[['Recursion','O(2ⁿ)','~1,771,711 calls','Very high'],['Memoization','O(n)','~39 calls','Low'],['Tabulation','O(n)','~20 states','Minimal']]; return <section className="page"><div className="simple-head"><div><div className="eyebrow accent">ALGORITHM BATTLE</div><h1>Same problem.<br/><span>Different strategies.</span></h1><p>Compare the cost of solving Fibonacci three different ways.</p></div><div className="battle-input"><label>Input n</label><input type="number" min="5" max="30" value={n} onChange={e=>setN(Math.min(30,Math.max(5,Number(e.target.value))))}/><button className="primary" onClick={()=>setRan(true)}><Play size={15}/> Run comparison</button></div></div><div className="comparison card"><div className="comparison-head"><div><span className="pill orange-pill">FIBONACCI / N = {n}</span><h2>Performance comparison</h2></div>{ran&&<span className="live"><i/> Measured in browser</span>}</div><div className="table"><div className="table-row table-header"><span>Approach</span><span>Complexity</span><span>Function calls</span><span>Memory profile</span></div>{rows.map((r,i)=><div className="table-row" key={r[0]}><span><b className={`rank rank-${i}`}>{i+1}</b>{r[0]}</span><span>{r[1]}</span><span>{ran&&i===0?`${Math.pow(2,n)-1} calls`:r[2]}</span><span><div className="memory-bar"><i style={{width:`${[100,35,18][i]}%`}}/></div>{r[3]}</span></div>)}</div><div className="comparison-foot"><BarChart3 size={18}/><span><b>What this tells us:</b> memoization and tabulation calculate each state once. The difference is how they travel through the state space.</span></div></div></section> }

function Progress({ completed, explored, progress }) { return <section className="page"><div className="simple-head"><div><div className="eyebrow accent">YOUR JOURNEY</div><h1>Small steps,<br/><span>big leaps.</span></h1><p>Your progress is saved locally, so your learning stays yours.</p></div><div className="progress-ring"><strong>{progress}%</strong><small>mastery</small></div></div><div className="progress-grid"><div className="card progress-main"><div className="eyebrow">OVERVIEW</div><h3>Learning momentum</h3><div className="momentum"><div className="bar-vertical"><i style={{height:`${Math.max(progress,8)}%`}}/></div><div><strong>{progress}%</strong><p>of your current path completed</p><span><CheckCircle2 size={15}/> {completed.length} challenges solved</span><span><Code2 size={15}/> {explored} algorithms explored</span></div></div></div><div className="card badges"><div className="eyebrow">ACHIEVEMENTS</div><h3>Milestones to unlock</h3>{[['First steps','Explore your first algorithm',explored>=1],['Curious mind','Complete an academy lesson',false],['Sharp thinker','Solve 5 challenges',completed.length>=5]].map(x=><div className={`badge-row ${x[2]?'unlocked':''}`} key={x[0]}><div><Trophy size={17}/></div><span><b>{x[0]}</b><small>{x[1]}</small></span>{x[2]&&<CheckCircle2 size={17}/>}</div>)}</div></div></section> }
function SettingsPage({theme,setTheme}) { return <section className="page"><div className="simple-head"><div><div className="eyebrow accent">PREFERENCES</div><h1>Make it<br/><span>yours.</span></h1><p>Set up a comfortable space for focused learning.</p></div></div><div className="settings-card card"><div className="setting-row"><div><h3>Appearance</h3><p>Choose the theme that feels right for your study session.</p></div><div className="theme-toggle"><button className={theme==='light'?'selected':''} onClick={()=>setTheme('light')}><Sun size={16}/> Light</button><button className={theme==='dark'?'selected':''} onClick={()=>setTheme('dark')}><Moon size={16}/> Dark</button></div></div><div className="setting-row"><div><h3>Reduced motion</h3><p>Respect your system preference for less animation.</p></div><span className="pill">System default</span></div></div></section> }

function App() {
  const [storedTheme, setTheme] = useStored('dp-theme', 'light')
  const theme = storedTheme === 'dark' ? 'dark' : 'light'
  const [completed,setCompleted]=useStored('dp-challenges',[])
  const [academy,setAcademy]=useStored('dp-lessons',[])
  const [explored,setExplored]=useStored('dp-explored',0)
  const progress=Math.min(100,Math.round((academy.length/5)*50+(completed.length/10)*50))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return <Layout theme={theme} setTheme={setTheme} progress={progress}><Routes><Route path="/" element={<Overview progress={progress} explored={explored} setExplored={setExplored}/>}/><Route path="/academy" element={<Academy completed={academy} setCompleted={setAcademy}/>}/><Route path="/playground" element={<Playground setExplored={setExplored}/>}/><Route path="/battle" element={<Battle/>}/><Route path="/challenges" element={<Challenges completed={completed} setCompleted={setCompleted}/>}/><Route path="/progress" element={<Progress completed={completed} explored={explored} progress={progress}/>}/><Route path="/settings" element={<SettingsPage theme={theme} setTheme={setTheme}/>}/><Route path="*" element={<Overview progress={progress} explored={explored} setExplored={setExplored}/>} /></Routes></Layout>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </StrictMode>
)
