/* Game Theory Steps — lesson content, part 1 (modules 1–7).
   Math uses KaTeX: $...$ inline, $$...$$ display. String.raw keeps backslashes. */
var R = String.raw;
var MODULES = [];

MODULES.push({
  id: "m1", title: "Foundations", icon: "🧩",
  intro: "What a game is, how to write one down, and what we assume about the players.",
  lessons: [
    { id: "m1l1", title: "What is a game?",
      body: R`<p>Game theory studies <b>strategic situations</b>: situations where what you get depends not only on your own choice but also on the choices of others.</p>
<p>Every game has four ingredients:</p>
<table class="tbl"><tr><th>Ingredient</th><th>Meaning</th><th>Example: two coffee shops</th></tr>
<tr><td>Players</td><td>Who decides</td><td>Shop A and Shop B</td></tr>
<tr><td>Strategies</td><td>What each can choose</td><td>Price ₱120 or ₱150</td></tr>
<tr><td>Payoffs</td><td>What each gets for every combination</td><td>Daily profit</td></tr>
<tr><td>Information</td><td>What each knows when choosing</td><td>Do they see the rival's price first?</td></tr></table>
<p>Formally, a game in <b>normal form</b> is written as a triple:</p>
$$G = (N,\ \{S_i\}_{i\in N},\ \{u_i\}_{i\in N})$$
<p>where $N$ is the set of players, $S_i$ is player $i$'s set of strategies, and $u_i$ is player $i$'s payoff function. A <b>strategy profile</b> $s=(s_1,\dots,s_n)$ lists one strategy per player, and $u_i(s)$ is what player $i$ gets from it.</p>
<p class="tip">Slow-pace tip: whenever you meet a new situation, first write down the four ingredients. That alone often reveals the answer.</p>`,
      formulas: [{ name: "Normal-form game", tex: R`G = (N,\ \{S_i\},\ \{u_i\})` }],
      quiz: [
        { q: "Which is NOT one of the basic ingredients of a game?", options: ["Players", "Strategies", "Payoffs", "A referee"], a: 3, why: "A game needs players, strategies, payoffs and information. No referee is required." },
        { q: R`In $G=(N,\{S_i\},\{u_i\})$, what does $u_i$ represent?`, options: ["Player i's strategies", "Player i's payoff function", "The number of players", "The order of moves"], a: 1, why: R`$u_i$ maps every strategy profile to player $i$'s payoff.` }
      ] },
    { id: "m1l2", title: "The payoff matrix",
      body: R`<p>For two players with a few strategies each, we draw a <b>payoff matrix</b>. The <b>row player</b> picks a row, the <b>column player</b> picks a column, and each cell shows $(u_1, u_2)$: the row player's payoff first.</p>
<table class="payoff"><tr><th></th><th>B: ₱120</th><th>B: ₱150</th></tr>
<tr><th>A: ₱120</th><td>(6, 6)</td><td>(9, 3)</td></tr>
<tr><th>A: ₱150</th><td>(3, 9)</td><td>(8, 8)</td></tr></table>
<p>Read the cell (A: ₱120, B: ₱150): Shop A earns 9 and Shop B earns 3 (thousand pesos), because A undercuts B and takes most customers.</p>
<p>Try the explorer below. Change any number and watch which cells are highlighted; we will learn what the highlights mean in Module 3.</p>`,
      widget: "matrix", widgetOpts: { preset: "price" },
      formulas: [{ name: "Cell of a payoff matrix", tex: R`\big(u_1(s_1,s_2),\ u_2(s_1,s_2)\big)` }],
      quiz: [
        { q: "In the cell (9, 3) above, who gets 9?", options: ["The row player (Shop A)", "The column player (Shop B)", "Both", "Neither"], a: 0, why: "By convention the first number is the row player's payoff." },
        { q: "A payoff matrix is the usual way to show a game that is…", options: ["Sequential", "Simultaneous with few strategies", "Infinite", "Cooperative only"], a: 1, why: "Matrices suit simultaneous-move games with a small number of strategies; sequential games use trees." }
      ] },
    { id: "m1l3", title: "Rationality and common knowledge",
      body: R`<p>Classical game theory assumes players are <b>rational</b>: each chooses the strategy that gives the highest payoff, given what they believe others will do.</p>
$$s_i^{*} \in \arg\max_{s_i \in S_i}\ u_i(s_i, s_{-i})$$
<p>Here $s_{-i}$ means “the strategies of everyone except $i$”. You will see this notation everywhere.</p>
<p>We also assume <b>common knowledge of rationality</b>: everyone is rational, everyone knows that everyone is rational, everyone knows that everyone knows, and so on. This lets players reason about each other's reasoning.</p>
<p>Real people are not always perfectly rational (behavioural game theory studies this), but the assumption gives a clear benchmark to compare with real behaviour.</p>`,
      formulas: [{ name: "Rational choice", tex: R`s_i^{*} \in \arg\max_{s_i} u_i(s_i, s_{-i})` }, { name: "Others' strategies", tex: R`s_{-i} = (s_1,\dots,s_{i-1},s_{i+1},\dots,s_n)` }],
      quiz: [
        { q: R`What does $s_{-i}$ mean?`, options: ["Player i's worst strategy", "The strategies of all players except i", "A negative payoff", "Player i's previous move"], a: 1, why: R`$s_{-i}$ collects everybody else's strategies.` },
        { q: "Common knowledge of rationality means…", options: ["Everyone is rational", "Everyone is rational and knows others are rational, endlessly", "Players can talk before playing", "Players have the same payoffs"], a: 1, why: "It is the infinite chain: rational, knows others are rational, knows that others know, …" }
      ] },
    { id: "m1l4", title: "Kinds of games",
      body: R`<p>Games are classified along a few dimensions. Knowing the type tells you which tool to use.</p>
<table class="tbl"><tr><th>Dimension</th><th>Type 1</th><th>Type 2</th><th>Main tool</th></tr>
<tr><td>Timing</td><td>Simultaneous</td><td>Sequential</td><td>Matrix vs. game tree</td></tr>
<tr><td>Sum of payoffs</td><td>Zero-sum</td><td>Non-zero-sum</td><td>Minimax vs. Nash equilibrium</td></tr>
<tr><td>Binding agreements</td><td>Non-cooperative</td><td>Cooperative</td><td>Equilibrium vs. core / Shapley value</td></tr>
<tr><td>Information</td><td>Complete</td><td>Incomplete</td><td>Nash vs. Bayesian equilibrium</td></tr>
<tr><td>Repetition</td><td>One-shot</td><td>Repeated</td><td>Static vs. repeated-game analysis</td></tr></table>
<p>A <b>zero-sum</b> game satisfies $\sum_i u_i(s)=0$ for every profile: one side's gain is the other's loss (chess, penalty kicks). Most business and policy games are <b>non-zero-sum</b>: both sides can gain (or lose) together, which is exactly where cooperation and coopetition become interesting.</p>`,
      formulas: [{ name: "Zero-sum condition", tex: R`\sum_{i\in N} u_i(s) = 0 \quad \forall s` }],
      quiz: [
        { q: "Two tourism destinations that can both gain from joint marketing are playing a…", options: ["Zero-sum game", "Non-zero-sum game", "Game with no payoffs", "One-player game"], a: 1, why: "Both can gain together, so the payoffs do not always sum to zero." },
        { q: "Which tool fits a sequential game?", options: ["Payoff matrix only", "Game tree", "Shapley value", "Replicator equation"], a: 1, why: "Sequential moves are drawn as a game tree (extensive form)." }
      ] }
  ]
});

MODULES.push({
  id: "m2", title: "Dominance", icon: "🥇",
  intro: "Sometimes one choice is best no matter what others do. Spotting it is the simplest way to solve a game.",
  lessons: [
    { id: "m2l1", title: "Dominant strategies",
      body: R`<p>Strategy $s_i$ <b>strictly dominates</b> $s_i'$ if it gives a strictly higher payoff whatever the others do:</p>
$$u_i(s_i, s_{-i}) > u_i(s_i', s_{-i}) \quad \text{for all } s_{-i}$$
<p>If one strategy dominates all others, it is a <b>dominant strategy</b> and a rational player always uses it.</p>
<p>Check the pricing game from Module 1:</p>
<table class="payoff"><tr><th></th><th>B: ₱120</th><th>B: ₱150</th></tr>
<tr><th>A: ₱120</th><td>(<b>6</b>, 6)</td><td>(<b>9</b>, 3)</td></tr>
<tr><th>A: ₱150</th><td>(3, 9)</td><td>(8, 8)</td></tr></table>
<p>For Shop A: if B charges ₱120, ₱120 gives 6 &gt; 3; if B charges ₱150, ₱120 gives 9 &gt; 8. So <b>₱120 dominates ₱150</b> for A. By symmetry it does for B too.</p>`,
      formulas: [{ name: "Strict dominance", tex: R`u_i(s_i, s_{-i}) > u_i(s_i', s_{-i})\ \ \forall s_{-i}` }],
      quiz: [
        { q: "To show A dominates B for a player, you compare payoffs…", options: ["Only in the best case", "Against every possible strategy of the others", "Only against the opponent's dominant strategy", "By averaging all cells"], a: 1, why: "Dominance must hold against every strategy profile of the others." },
        { q: "In the pricing game, what do both shops end up charging?", options: ["₱150 each", "₱120 each", "A ₱120, B ₱150", "It cannot be determined"], a: 1, why: "₱120 is dominant for both, so they both charge ₱120 and earn 6 each, though ₱150 each would give 8." }
      ] },
    { id: "m2l2", title: "The Prisoner's Dilemma",
      body: R`<p>The most famous game. Two suspects are questioned separately. Each can stay <b>Silent</b> (cooperate) or <b>Confess</b> (defect). Payoffs are years in prison (negative):</p>
<table class="payoff"><tr><th></th><th>Silent</th><th>Confess</th></tr>
<tr><th>Silent</th><td>(−1, −1)</td><td>(−3, 0)</td></tr>
<tr><th>Confess</th><td>(0, −3)</td><td>(−2, −2)</td></tr></table>
<p>Confess is dominant for both, so the outcome is (−2, −2), although (−1, −1) would be better for both. <b>Individual rationality leads to collective loss.</b></p>
<p>Any game with this ranking of payoffs is a Prisoner's Dilemma. Using T = temptation, R = reward, P = punishment, S = sucker's payoff:</p>
$$T > R > P > S \quad\text{and}\quad 2R > T + S$$
<p>Price wars, arms races, overfishing and destinations undercutting each other's hotel rates all share this structure. Load the “Prisoner's Dilemma” preset below and confirm the highlighted cell.</p>`,
      widget: "matrix", widgetOpts: { preset: "pd" },
      formulas: [{ name: "Prisoner's Dilemma conditions", tex: R`T > R > P > S,\quad 2R > T+S` }],
      quiz: [
        { q: "In a Prisoner's Dilemma, the equilibrium outcome is…", options: ["Best for both players", "Worse for both than mutual cooperation", "Best for one player only", "Random"], a: 1, why: "Mutual defection (P, P) is worse for both than mutual cooperation (R, R)." },
        { q: "With T=5, R=3, P=1, S=0, is it a Prisoner's Dilemma?", options: ["Yes", "No, because 2R < T+S", "No, because R > T", "No, because P > R"], a: 0, why: "5 > 3 > 1 > 0 and 2·3 = 6 > 5 + 0 = 5, so both conditions hold." }
      ] },
    { id: "m2l3", title: "Iterated elimination",
      body: R`<p>Even without a dominant strategy, we can delete <b>strictly dominated</b> strategies one at a time. Because rationality is common knowledge, each player knows the others will never play a dominated strategy. This is called <b>IESDS</b> (iterated elimination of strictly dominated strategies).</p>
<table class="payoff"><tr><th></th><th>L</th><th>C</th><th>R</th></tr>
<tr><th>U</th><td>(1, 0)</td><td>(1, 2)</td><td>(0, 1)</td></tr>
<tr><th>D</th><td>(0, 3)</td><td>(0, 1)</td><td>(2, 0)</td></tr></table>
<ol><li>For the column player, <b>R is dominated by C</b> (2 &gt; 1 and 1 &gt; 0). Delete R.</li>
<li>Now for the row player, <b>D is dominated by U</b> (1 &gt; 0 and 1 &gt; 0). Delete D.</li>
<li>Only row U remains, and the column player prefers C (2) to L (0). Delete L.</li></ol>
<p>The unique survivor is <b>(U, C)</b> with payoffs (1, 2).</p>
<p class="tip">With strict dominance, the order of deletion never changes the final answer.</p>`,
      formulas: [{ name: "IESDS step", tex: R`S_i^{k+1} = \{ s_i \in S_i^{k} : s_i \text{ not strictly dominated in } S^{k} \}` }],
      quiz: [
        { q: "What was eliminated first in the example?", options: ["U", "L", "R", "D"], a: 2, why: "Column R is strictly dominated by C." },
        { q: "Why can players delete the opponent's dominated strategies?", options: ["Because of common knowledge of rationality", "Because the matrix is symmetric", "Because payoffs are positive", "Because of a referee"], a: 0, why: "Each knows the other is rational and will not play a dominated strategy." }
      ] },
    { id: "m2l4", title: "Weak dominance and its traps",
      body: R`<p>Strategy $s_i$ <b>weakly dominates</b> $s_i'$ if it is never worse and sometimes strictly better:</p>
$$u_i(s_i,s_{-i}) \ge u_i(s_i',s_{-i})\ \forall s_{-i}, \text{ with } > \text{ for at least one } s_{-i}$$
<p>Be careful with weak dominance:</p>
<ul><li>The <b>order</b> of eliminating weakly dominated strategies can change the result.</li>
<li>It can remove a strategy that is part of a <b>Nash equilibrium</b>.</li></ul>
<table class="payoff"><tr><th></th><th>L</th><th>R</th></tr>
<tr><th>U</th><td>(1, 1)</td><td>(0, 0)</td></tr>
<tr><th>D</th><td>(0, 0)</td><td>(0, 0)</td></tr></table>
<p>U weakly dominates D, and L weakly dominates R. Yet (D, R) is still a Nash equilibrium: nobody gains by deviating alone. Weak dominance is a useful hint, not a proof.</p>`,
      formulas: [{ name: "Weak dominance", tex: R`u_i(s_i,s_{-i}) \ge u_i(s_i',s_{-i})\ \forall s_{-i},\ \ \exists\, s_{-i}: >` }],
      quiz: [
        { q: "Which statement about weak dominance is true?", options: ["The order of elimination never matters", "It can remove Nash equilibria", "It is the same as strict dominance", "It always gives a unique answer"], a: 1, why: "Eliminating weakly dominated strategies can delete equilibria and depends on order." },
        { q: "In the example, is (D, R) a Nash equilibrium?", options: ["Yes", "No"], a: 0, why: "From (D, R), deviating alone gives 0 = 0, so no player strictly gains." }
      ] }
  ]
});

MODULES.push({
  id: "m3", title: "Nash Equilibrium", icon: "⚖️",
  intro: "The central idea of game theory: a situation where nobody wants to change their choice alone.",
  lessons: [
    { id: "m3l1", title: "Best responses",
      body: R`<p>A <b>best response</b> is the strategy that maximizes your payoff given what the others do:</p>
$$BR_i(s_{-i}) = \arg\max_{s_i\in S_i} u_i(s_i, s_{-i})$$
<p>In a matrix, find best responses by <b>underlining</b>:</p>
<ol><li>For each column, underline the row player's highest payoff in that column.</li>
<li>For each row, underline the column player's highest payoff in that row.</li></ol>
<p>In the explorer below, the best-response payoffs are highlighted in colour. Change the numbers and watch them move.</p>`,
      widget: "matrix", widgetOpts: { preset: "stag" },
      formulas: [{ name: "Best response", tex: R`BR_i(s_{-i}) = \arg\max_{s_i} u_i(s_i,s_{-i})` }],
      quiz: [
        { q: "To find the row player's best response to a column, you look at…", options: ["The first numbers down that column", "The second numbers along that row", "The sum of each cell", "The diagonal"], a: 0, why: "Fix the column, then compare the row player's payoffs (first numbers) in it." },
        { q: "A best response can be…", options: ["Only one strategy", "One or several strategies (ties)", "Only a mixed strategy", "Only a dominant strategy"], a: 1, why: R`$\arg\max$ is a set: ties give several best responses.` }
      ] },
    { id: "m3l2", title: "Nash equilibrium",
      body: R`<p>A strategy profile $s^*$ is a <b>Nash equilibrium</b> if every player's strategy is a best response to the others':</p>
$$u_i(s_i^*, s_{-i}^*) \ge u_i(s_i, s_{-i}^*) \quad \forall i,\ \forall s_i \in S_i$$
<p>In words: <b>no player can gain by changing strategy alone</b>. In a matrix, a Nash equilibrium is a cell where <b>both</b> payoffs are underlined.</p>
<p>John Nash proved in 1950 that every finite game has at least one equilibrium (possibly in mixed strategies), and he shared the 1994 Nobel Prize in Economics for this work.</p>
<p>Use the explorer: cells with a ★ are pure-strategy Nash equilibria. Try the presets and edit payoffs until a new equilibrium appears.</p>`,
      widget: "matrix", widgetOpts: { preset: "chicken" },
      formulas: [{ name: "Nash equilibrium", tex: R`u_i(s_i^*,s_{-i}^*) \ge u_i(s_i,s_{-i}^*)\ \ \forall i,\forall s_i` }],
      quiz: [
        { q: "In a payoff matrix, a pure Nash equilibrium is a cell where…", options: ["The payoffs are largest", "Both payoffs are best responses", "The payoffs are equal", "One player gets zero"], a: 1, why: "Each player's payoff must be a best response to the other's strategy." },
        { q: "How many pure Nash equilibria does the game of Chicken have?", options: ["0", "1", "2", "4"], a: 2, why: "(Swerve, Straight) and (Straight, Swerve): whoever goes straight wins, and the other prefers to swerve." }
      ] },
    { id: "m3l3", title: "Coordination and multiple equilibria",
      body: R`<p>Many games have more than one equilibrium. Then the question becomes <b>which one</b> players will reach.</p>
<p><b>Battle of the Sexes</b>: both want to be together, but prefer different events.</p>
<table class="payoff"><tr><th></th><th>Opera</th><th>Football</th></tr>
<tr><th>Opera</th><td>(2, 1)</td><td>(0, 0)</td></tr>
<tr><th>Football</th><td>(0, 0)</td><td>(1, 2)</td></tr></table>
<p><b>Stag Hunt</b>: hunting the stag together pays most but is risky if the partner goes for a hare.</p>
<table class="payoff"><tr><th></th><th>Stag</th><th>Hare</th></tr>
<tr><th>Stag</th><td>(4, 4)</td><td>(0, 3)</td></tr>
<tr><th>Hare</th><td>(3, 0)</td><td>(3, 3)</td></tr></table>
<p>In the Stag Hunt, (Stag, Stag) is <b>payoff-dominant</b> (best for all) while (Hare, Hare) is <b>risk-dominant</b> (safer). Thomas Schelling's <b>focal points</b> explain how culture, history or communication help players coordinate: for example, two destinations both choosing the same festival week.</p>`,
      formulas: [{ name: "Risk dominance (2×2, symmetric)", tex: R`(H,H) \text{ risk-dominates if } (u_{HH}-u_{SH})^2 > (u_{SS}-u_{HS})^2` }],
      quiz: [
        { q: "How many pure Nash equilibria does the Stag Hunt have?", options: ["0", "1", "2", "3"], a: 2, why: "(Stag, Stag) and (Hare, Hare)." },
        { q: "A focal point is…", options: ["A dominant strategy", "An equilibrium that stands out for cultural or contextual reasons", "The mixed equilibrium", "The worst outcome"], a: 1, why: "Schelling's focal points help players coordinate without talking." }
      ] },
    { id: "m3l4", title: "Equilibrium vs. efficiency",
      body: R`<p>An outcome is <b>Pareto efficient</b> if no other outcome makes someone better off without making someone worse off. A <b>Nash equilibrium need not be Pareto efficient</b>, as the Prisoner's Dilemma shows.</p>
<p>A common measure of total welfare is the sum of payoffs:</p>
$$W(s) = \sum_{i\in N} u_i(s)$$
<p>The gap between the best possible welfare and the welfare at the worst equilibrium is measured by the <b>price of anarchy</b>:</p>
$$PoA = \frac{\max_s W(s)}{\min_{s \in NE} W(s)}$$
<table class="tbl"><tr><th>Game</th><th>Equilibrium welfare</th><th>Best welfare</th><th>PoA</th></tr>
<tr><td>Prisoner's Dilemma (−1/−3/0/−2 version, as costs)</td><td>4 years total</td><td>2 years total</td><td>2</td></tr>
<tr><td>Pricing game (6/9/3/8)</td><td>12</td><td>16</td><td>1.33</td></tr></table>
<p>This gap is why <b>institutions, contracts, regulation and repeated interaction</b> matter: they move players from the equilibrium toward the efficient outcome. Modules 8 and 11 show how.</p>`,
      formulas: [{ name: "Social welfare", tex: R`W(s)=\sum_i u_i(s)` }, { name: "Price of anarchy", tex: R`PoA = \dfrac{\max_s W(s)}{\min_{s\in NE} W(s)}` }],
      quiz: [
        { q: "Pareto efficient means…", options: ["Everyone gets the same payoff", "No one can be made better off without hurting someone", "It is a Nash equilibrium", "Total payoff is zero"], a: 1, why: "That is the definition of Pareto efficiency." },
        { q: "In the pricing game, the price of anarchy is 16 / 12. What does a value above 1 tell you?", options: ["The equilibrium is efficient", "The equilibrium wastes some possible welfare", "There is no equilibrium", "The game is zero-sum"], a: 1, why: "PoA > 1 means equilibrium welfare is below the best achievable." }
      ] }
  ]
});

MODULES.push({
  id: "m4", title: "Mixed Strategies", icon: "🎲",
  intro: "When being predictable is a weakness, players randomize. Learn to compute the mix.",
  lessons: [
    { id: "m4l1", title: "Why randomize?",
      body: R`<p>In <b>Matching Pennies</b>, the row player wins if the coins match; the column player wins if they differ.</p>
<table class="payoff"><tr><th></th><th>Heads</th><th>Tails</th></tr>
<tr><th>Heads</th><td>(1, −1)</td><td>(−1, 1)</td></tr>
<tr><th>Tails</th><td>(−1, 1)</td><td>(1, −1)</td></tr></table>
<p>There is <b>no pure Nash equilibrium</b>: in every cell someone wants to switch. The solution is to be unpredictable. A <b>mixed strategy</b> $\sigma_i$ is a probability distribution over pure strategies:</p>
$$\sigma_i = (p_1,\dots,p_k),\quad p_j \ge 0,\quad \sum_j p_j = 1$$
<p>In Matching Pennies, each player plays Heads with probability ½. Penalty kicks, tennis serves, surprise inspections and random audits all work this way.</p>`,
      widget: "matrix", widgetOpts: { preset: "pennies" },
      formulas: [{ name: "Mixed strategy", tex: R`\sigma_i=(p_1,\dots,p_k),\ \ p_j\ge 0,\ \ \textstyle\sum_j p_j=1` }],
      quiz: [
        { q: "Why is there no pure equilibrium in Matching Pennies?", options: ["Payoffs are negative", "In every cell, one player wants to switch", "The game is sequential", "There are too many strategies"], a: 1, why: "Whatever the cell, the loser can switch and win." },
        { q: "A mixed strategy is…", options: ["A combination of two games", "A probability distribution over pure strategies", "A strategy that changes payoffs", "Cooperation"], a: 1, why: "Players choose each pure strategy with some probability." }
      ] },
    { id: "m4l2", title: "Expected payoffs",
      body: R`<p>With mixed strategies, payoffs become <b>expected values</b>. In a 2×2 game, let the row player play Top with probability $p$ and the column player play Left with probability $q$:</p>
$$E[u_1] = pq\,a_{11} + p(1-q)\,a_{12} + (1-p)q\,a_{21} + (1-p)(1-q)\,a_{22}$$
<p>where $a_{jk}$ is the row player's payoff in row $j$, column $k$.</p>
<p><b>Example</b> (Matching Pennies, row player): with $p=0.7$, $q=0.5$:</p>
$$E[u_1] = 0.35(1)+0.35(-1)+0.15(-1)+0.15(1) = 0$$
<p>When the opponent mixes 50/50, every choice of $p$ gives the same expected payoff, 0. That indifference is the key idea of the next lesson.</p>`,
      formulas: [{ name: "Expected payoff (2×2)", tex: R`E[u_1]=\sum_{j,k} \Pr(j)\Pr(k)\, a_{jk}` }],
      quiz: [
        { q: R`If $p=1$ and $q=1$ in Matching Pennies, what is $E[u_1]$?`, options: ["−1", "0", "1", "0.5"], a: 2, why: "Both play Heads for sure: the coins match and the row player wins 1." },
        { q: "Expected payoff weights each cell by…", options: ["Its size", "The probability that the cell happens", "The number of players", "The opponent's payoff"], a: 1, why: R`Each cell happens with probability $\Pr(j)\Pr(k)$.` }
      ] },
    { id: "m4l3", title: "The indifference principle",
      body: R`<p>In a mixed equilibrium, each player mixes so that the <b>opponent is indifferent</b> between their pure strategies. Otherwise the opponent would pick the better one for sure.</p>
<p><b>Battle of the Sexes</b> (Opera / Football, payoffs 2,1 / 0,0 / 0,0 / 1,2). Let the column player go to Opera with probability $q$. The row player is indifferent when:</p>
$$2q = 1\cdot(1-q) \ \Rightarrow\ q^* = \tfrac13$$
<p>Let the row player go to Opera with probability $p$. The column player is indifferent when:</p>
$$1\cdot p = 2(1-p) \ \Rightarrow\ p^* = \tfrac23$$
<p>So the mixed equilibrium is $p^*=2/3,\ q^*=1/3$. Each player then expects $2/3$, worse than either pure equilibrium, because they often miss each other.</p>
<p>The chart below plots the row player's expected payoff from each pure strategy as the opponent's $q$ changes. The lines cross at the indifference point $q^*$.</p>`,
      widget: "mixed", widgetOpts: { preset: "bos" },
      formulas: [{ name: "Indifference (row player)", tex: R`q\,a_{11}+(1-q)\,a_{12} = q\,a_{21}+(1-q)\,a_{22}` }, { name: "Solution for q*", tex: R`q^*=\dfrac{a_{22}-a_{12}}{a_{11}-a_{12}-a_{21}+a_{22}}` }],
      quiz: [
        { q: "In a mixed equilibrium, you choose your probabilities to make…", options: ["Yourself indifferent", "Your opponent indifferent", "Both payoffs zero", "The game zero-sum"], a: 1, why: "Your mix must leave the opponent with no reason to prefer one pure strategy." },
        { q: R`In Battle of the Sexes, what is $q^*$?`, options: ["1/2", "1/3", "2/3", "1"], a: 1, why: R`$2q = 1-q$ gives $q=1/3$.` }
      ] },
    { id: "m4l4", title: "Nash's theorem and penalty kicks",
      body: R`<p><b>Nash's theorem</b>: every finite game has at least one Nash equilibrium in mixed strategies. Pure equilibria are just the special case where the probabilities are 0 and 1.</p>
<p><b>Penalty kick</b>. The kicker aims Left or Right; the goalie dives Left or Right. Entries are the probability of a goal:</p>
<table class="payoff"><tr><th>Kicker \ Goalie</th><th>Dive L</th><th>Dive R</th></tr>
<tr><th>Kick L</th><td>0.60</td><td>0.95</td></tr>
<tr><th>Kick R</th><td>0.90</td><td>0.70</td></tr></table>
<p>The goalie dives left with probability $g$ so that the kicker is indifferent:</p>
$$0.60g + 0.95(1-g) = 0.90g + 0.70(1-g) \Rightarrow g^* = \tfrac{0.25}{0.55} \approx 0.45$$
<p>The kicker kicks left with probability $k$ so that the goalie is indifferent:</p>
$$0.60k + 0.90(1-k) = 0.95k + 0.70(1-k) \Rightarrow k^* = \tfrac{0.20}{0.55} \approx 0.36$$
<p>The goal probability in equilibrium is about <b>0.79</b>. Studies of real professional penalty kicks (e.g. Palacios-Huerta, 2003) find players' mixes close to these predictions.</p>`,
      widget: "mixed", widgetOpts: { preset: "penalty" },
      formulas: [{ name: "Nash's existence theorem", tex: R`\text{Every finite game has a mixed-strategy Nash equilibrium}` }],
      quiz: [
        { q: "Nash's theorem guarantees an equilibrium in…", options: ["Pure strategies", "Mixed strategies (which include pure ones)", "Only zero-sum games", "Only two-player games"], a: 1, why: "Existence is guaranteed once mixed strategies are allowed, for any finite game." },
        { q: "Why does the kicker kick left less often (≈36%)?", options: ["Left is always worse", "To keep the goalie indifferent", "Because the goalie prefers right", "It is random"], a: 1, why: "The kicker's mix is set to make the goalie indifferent between diving left and right." }
      ] }
  ]
});

MODULES.push({
  id: "m5", title: "Zero-Sum Games", icon: "♟️",
  intro: "Pure conflict: what one gains, the other loses. Here the security-first minimax logic is exact.",
  lessons: [
    { id: "m5l1", title: "Zero-sum basics",
      body: R`<p>In a two-player <b>zero-sum</b> game, $u_2 = -u_1$ for every outcome, so we write only the row player's payoffs. The row player wants them high; the column player wants them low.</p>
<table class="payoff"><tr><th></th><th>C1</th><th>C2</th><th>C3</th></tr>
<tr><th>R1</th><td>4</td><td>2</td><td>5</td></tr>
<tr><th>R2</th><td>3</td><td>1</td><td>0</td></tr>
<tr><th>R3</th><td>6</td><td>2</td><td>3</td></tr></table>
<p>Examples: chess, poker hands, a fixed market share split between two firms, competitive bidding for one contract.</p>
<p class="tip">“Constant-sum” games (payoffs always add to the same number, such as 100% market share) behave exactly like zero-sum games.</p>`,
      formulas: [{ name: "Zero-sum (2 players)", tex: R`u_2(s) = -u_1(s)` }],
      quiz: [
        { q: "In a zero-sum matrix with only one number per cell, the number is…", options: ["The column player's gain", "The row player's gain (= column player's loss)", "The total payoff", "A probability"], a: 1, why: "By convention it is the row player's payoff; the column player gets its negative." },
        { q: "Two firms splitting a fixed 100% market share play a…", options: ["Constant-sum game", "Coordination game", "Public-goods game", "Signalling game"], a: 0, why: "Shares always add to 100%, which behaves like zero-sum." }
      ] },
    { id: "m5l2", title: "Maximin and minimax",
      body: R`<p>A cautious row player asks: “For each row, what is the worst that can happen?” and picks the row with the best worst case. This is the <b>maximin</b> value:</p>
$$\underline{v} = \max_{i}\ \min_{j}\ a_{ij}$$
<p>The column player does the mirror image, the <b>minimax</b> value:</p>
$$\overline{v} = \min_{j}\ \max_{i}\ a_{ij}$$
<table class="payoff"><tr><th></th><th>C1</th><th>C2</th><th>C3</th><th>row min</th></tr>
<tr><th>R1</th><td>4</td><td>2</td><td>5</td><td><b>2</b></td></tr>
<tr><th>R2</th><td>3</td><td>1</td><td>0</td><td>0</td></tr>
<tr><th>R3</th><td>6</td><td>2</td><td>3</td><td><b>2</b></td></tr>
<tr><th>col max</th><td>6</td><td><b>2</b></td><td>5</td><td></td></tr></table>
<p>Maximin = max(2, 0, 2) = <b>2</b>. Minimax = min(6, 2, 5) = <b>2</b>. They are equal!</p>
<p>It is always true that $\underline{v} \le \overline{v}$.</p>`,
      formulas: [{ name: "Maximin", tex: R`\underline{v}=\max_i \min_j a_{ij}` }, { name: "Minimax", tex: R`\overline{v}=\min_j \max_i a_{ij}` }],
      quiz: [
        { q: "Maximin means the row player…", options: ["Maximizes the best case", "Maximizes the worst case", "Minimizes the opponent's best case", "Picks randomly"], a: 1, why: "Take the minimum of each row, then choose the row whose minimum is largest." },
        { q: "Which inequality always holds?", options: [R`$\underline v \ge \overline v$`, R`$\underline v \le \overline v$`, R`$\underline v = 0$`, R`$\overline v < 0$`], a: 1, why: "The row player's guaranteed amount can never exceed the column player's guaranteed cap." }
      ] },
    { id: "m5l3", title: "Saddle points and the value",
      body: R`<p>When maximin = minimax, the game has a <b>saddle point</b>: an entry that is the minimum of its row and the maximum of its column. The common number is the <b>value</b> of the game, $v$.</p>
$$\max_i \min_j a_{ij} = \min_j \max_i a_{ij} = v$$
<p>In the 3×3 example, the entries at (R1, C2) and (R3, C2) are both 2, the minimum of their rows and the maximum of column C2. The value is $v=2$: the row player can guarantee 2, and the column player can hold the row player to 2.</p>
<p>A saddle point is exactly a pure Nash equilibrium of the zero-sum game. If there is no saddle point, the players must mix, as in the next lesson.</p>`,
      formulas: [{ name: "Saddle point / value", tex: R`\max_i \min_j a_{ij} = \min_j \max_i a_{ij} = v` }],
      quiz: [
        { q: "A saddle point entry is…", options: ["Max of its row and min of its column", "Min of its row and max of its column", "The largest number", "The average"], a: 1, why: "The row player cannot gain within the column, and the column player cannot gain within the row." },
        { q: "What is the value of the 3×3 example game?", options: ["0", "2", "4", "6"], a: 1, why: "Maximin = minimax = 2." }
      ] },
    { id: "m5l4", title: "Solving 2×2 games by mixing",
      body: R`<p>For a 2×2 zero-sum game without a saddle point,</p>
$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$
<p>the row player's optimal probability of the first row and the value are:</p>
$$p^* = \frac{d-c}{a-b-c+d},\qquad v = \frac{ad-bc}{a-b-c+d}$$
<p>The column player's probability of the first column is:</p>
$$q^* = \frac{d-b}{a-b-c+d}$$
<p><b>Example:</b> $A=\begin{pmatrix}3&-1\\-2&1\end{pmatrix}$. Denominator $=3+1+2+1=7$, so $p^*=3/7$, $q^*=2/7$, $v=(3-2)/7=1/7$.</p>
<p>In the chart, the two lines show the row player's payoff against each column as $p$ varies. The row player picks $p$ where the <b>lower envelope</b> is highest: that peak is the value.</p>`,
      widget: "zerosum", widgetOpts: {},
      formulas: [{ name: "Optimal row mix (2×2)", tex: R`p^*=\dfrac{d-c}{a-b-c+d}` }, { name: "Optimal column mix (2×2)", tex: R`q^*=\dfrac{d-b}{a-b-c+d}` }, { name: "Value (2×2)", tex: R`v=\dfrac{ad-bc}{a-b-c+d}` }],
      quiz: [
        { q: R`For $A=\begin{pmatrix}3&-1\\-2&1\end{pmatrix}$, what is $p^*$?`, options: ["1/7", "2/7", "3/7", "4/7"], a: 2, why: R`$p^*=(d-c)/(a-b-c+d) = (1+2)/7 = 3/7$.` },
        { q: "In the chart, the row player chooses p where…", options: ["The upper envelope is lowest", "The lower envelope is highest", "The lines are steepest", "p = 0.5 always"], a: 1, why: "The row player maximizes the worst case, which is the peak of the lower envelope." }
      ] }
  ]
});

MODULES.push({
  id: "m6", title: "Sequential Games", icon: "🌳",
  intro: "When players move one after another, we draw trees and reason backwards from the end.",
  lessons: [
    { id: "m6l1", title: "Game trees",
      body: R`<p>A sequential game is drawn as a <b>game tree</b> (extensive form):</p>
<ul><li><b>Decision nodes</b>: where a player chooses.</li>
<li><b>Branches</b>: the available actions.</li>
<li><b>Terminal nodes</b>: the end, showing payoffs $(u_1,u_2)$.</li>
<li><b>Information sets</b>: nodes a player cannot tell apart, drawn with a dashed line. If every set has one node, the game has <b>perfect information</b>.</li></ul>
<p>In a sequential game, a <b>strategy</b> is a complete plan: it says what to do at <b>every</b> node where you might move, even nodes that are never reached.</p>
<p>The <b>market entry game</b>: an Entrant decides to stay Out or come In. If In, the Incumbent decides to Accommodate (share the market) or Fight (price war).</p>`,
      widget: "tree", widgetOpts: { step: false },
      formulas: [{ name: "Number of strategies with k nodes, m actions each", tex: R`|S_i| = m^{k}` }],
      quiz: [
        { q: "In a game tree, payoffs are written at…", options: ["The root", "Decision nodes", "Terminal nodes", "Information sets"], a: 2, why: "Payoffs appear where the game ends." },
        { q: "A strategy in a sequential game must specify an action…", options: ["Only at the first node", "At every node where the player could move", "Only on the equilibrium path", "Only at terminal nodes"], a: 1, why: "A strategy is a complete contingent plan." }
      ] },
    { id: "m6l2", title: "Backward induction",
      body: R`<p><b>Backward induction</b> solves perfect-information games from the end:</p>
<ol><li>Go to the last decision nodes. Choose the action that is best for the player moving there.</li>
<li>Replace that node with the payoffs it leads to.</li>
<li>Repeat, moving towards the root.</li></ol>
<p>In the entry game: if the Entrant comes In, the Incumbent compares Accommodate (2) with Fight (1) and accommodates. Knowing this, the Entrant compares In (2) with Out (0) and enters.</p>
<p>Result: <b>(In, Accommodate)</b> with payoffs (2, 2).</p>
<p>Press <b>Next step</b> in the tree to watch backward induction work. Then change the payoffs. What if fighting gave the Incumbent 3?</p>`,
      widget: "tree", widgetOpts: { step: true },
      formulas: [{ name: "Backward induction at a node", tex: R`a^*(h) = \arg\max_{a \in A(h)} u_{P(h)}\big(\text{outcome}(h,a)\big)` }],
      quiz: [
        { q: "Backward induction starts at…", options: ["The root", "The last decisions", "A random node", "The highest payoff"], a: 1, why: "We solve the final decisions first and work back." },
        { q: "If Fight gave the Incumbent 3 (instead of 1), what would the Entrant do?", options: ["Enter", "Stay out", "Randomize", "Cannot tell"], a: 1, why: "The Incumbent would fight (3 > 2), giving the Entrant −1 < 0, so it stays Out." }
      ] },
    { id: "m6l3", title: "Credible threats and subgame perfection",
      body: R`<p>The entry game has <b>two</b> Nash equilibria:</p>
<table class="tbl"><tr><th>Equilibrium</th><th>Why no one deviates</th><th>Credible?</th></tr>
<tr><td>(In, Accommodate)</td><td>Each is a best response</td><td>Yes</td></tr>
<tr><td>(Out, Fight)</td><td>Entrant fears Fight; Incumbent's choice never matters</td><td>No: the threat is empty</td></tr></table>
<p>The threat “I will fight if you enter” is <b>not credible</b>: once entry happens, fighting gives the Incumbent 1 instead of 2.</p>
<p>A <b>subgame perfect equilibrium (SPE)</b> requires strategies to form a Nash equilibrium in <b>every subgame</b>, including those off the equilibrium path. Backward induction finds exactly the SPE in perfect-information games (Selten, Nobel 1994).</p>
<p>Making a threat credible needs <b>commitment</b>: building excess capacity, signing contracts, or burning bridges so that fighting becomes the best response.</p>`,
      formulas: [{ name: "Subgame perfection", tex: R`s^* \text{ is SPE} \iff s^*|_{\Gamma'} \text{ is a NE of every subgame } \Gamma'` }],
      quiz: [
        { q: "Why is (Out, Fight) not subgame perfect?", options: ["Fight is not a best response after entry", "Out is dominated", "It has negative payoffs", "There is no subgame"], a: 0, why: "After entry, Accommodate (2) beats Fight (1), so the threat is not credible." },
        { q: "How can an incumbent make a threat credible?", options: ["By shouting louder", "By committing in a way that makes fighting its best response", "By ignoring the entrant", "It never can"], a: 1, why: "Commitment devices change future payoffs so the threat becomes rational." }
      ] },
    { id: "m6l4", title: "The ultimatum game",
      body: R`<p>Two players split ₱100. The <b>Proposer</b> offers $x$ to the <b>Responder</b>, who accepts (split happens) or rejects (both get 0).</p>
<p>Backward induction: the Responder accepts any $x>0$ (something beats nothing), so the Proposer offers the smallest unit, e.g. ₱1. The SPE is:</p>
$$x^* = \varepsilon,\qquad (u_P,u_R) = (100-\varepsilon,\ \varepsilon)$$
<p>But in experiments around the world, proposers typically offer 40–50%, and offers below about 20% are often rejected. People care about <b>fairness</b> and will pay to punish unfair offers.</p>
<table class="tbl"><tr><th></th><th>Theory (SPE)</th><th>Typical lab result</th></tr>
<tr><td>Offer</td><td>≈ 0%</td><td>40–50%</td></tr>
<tr><td>Low offers (&lt;20%)</td><td>Accepted</td><td>Often rejected</td></tr></table>
<p>This is a reminder: game-theoretic predictions depend on the payoffs being right. If fairness matters, it belongs in the payoff function.</p>`,
      formulas: [{ name: "Inequity-averse utility (Fehr–Schmidt)", tex: R`u_i = x_i - \alpha \max(x_j - x_i,0) - \beta \max(x_i - x_j,0)` }],
      quiz: [
        { q: "What does backward induction predict the Proposer offers?", options: ["50%", "The smallest positive amount", "Nothing at all", "100%"], a: 1, why: "A purely self-interested Responder accepts any positive amount." },
        { q: "Why do real responders reject low offers?", options: ["They misunderstand the rules", "They value fairness and punish unfairness", "They want zero", "The game is zero-sum"], a: 1, why: "Fairness concerns change the effective payoffs." }
      ] }
  ]
});

MODULES.push({
  id: "m7", title: "Competition Models", icon: "🏭",
  intro: "Classic models of firms competing on quantity, price, and timing.",
  lessons: [
    { id: "m7l1", title: "Cournot: competing on quantity",
      body: R`<p>Two firms choose quantities $q_1, q_2$ at the same time. Market price falls with total output: $P = a - (q_1+q_2)$. Each unit costs $c$.</p>
$$\pi_i = \big(a - q_i - q_j - c\big)\,q_i$$
<p>Set $\partial \pi_i / \partial q_i = 0$ to get the <b>best-response (reaction) function</b>:</p>
$$q_i = BR_i(q_j) = \frac{a-c-q_j}{2}$$
<p>The Nash equilibrium is where the two reaction lines cross:</p>
$$q_1^* = q_2^* = \frac{a-c}{3},\qquad P^* = \frac{a+2c}{3},\qquad \pi_i^* = \frac{(a-c)^2}{9}$$
<p>Move the sliders: the reaction lines shift and the equilibrium (the dot) moves with them.</p>`,
      widget: "cournot", widgetOpts: { view: "br" },
      formulas: [{ name: "Cournot profit", tex: R`\pi_i=(a-q_i-q_j-c)\,q_i` }, { name: "Cournot reaction function", tex: R`q_i=\dfrac{a-c-q_j}{2}` }, { name: "Cournot equilibrium", tex: R`q^*=\dfrac{a-c}{3},\ \ \pi^*=\dfrac{(a-c)^2}{9}` }],
      quiz: [
        { q: "With a = 100 and c = 10, what is each firm's Cournot quantity?", options: ["30", "45", "22.5", "90"], a: 0, why: "(a − c)/3 = 90/3 = 30." },
        { q: "The Cournot equilibrium is found where…", options: ["Price equals cost", "The two reaction functions intersect", "One firm produces zero", "Profits are maximized jointly"], a: 1, why: "Each output is a best response to the other: the intersection." }
      ] },
    { id: "m7l2", title: "Bertrand: competing on price",
      body: R`<p>Now firms choose <b>prices</b> for identical products. Customers buy from the cheaper firm and split equally on a tie.</p>
<p>If firm 1 charges $p_1 > c$, firm 2 can charge slightly less and capture the whole market. This undercutting continues until:</p>
$$p_1^* = p_2^* = c,\qquad \pi_1^* = \pi_2^* = 0$$
<p>This is the <b>Bertrand paradox</b>: just two firms are enough to reach the perfectly competitive outcome.</p>
<p>Real firms escape the paradox through:</p>
<ul><li><b>Product differentiation</b> (location, quality, brand).</li>
<li><b>Capacity limits</b> (a hotel with 50 rooms cannot serve everyone).</li>
<li><b>Repeated interaction</b> (tacit collusion, Module 8).</li></ul>`,
      formulas: [{ name: "Bertrand equilibrium", tex: R`p_1^*=p_2^*=c,\quad \pi^*=0` }],
      quiz: [
        { q: "In Bertrand competition with identical products, equilibrium price equals…", options: ["The monopoly price", "Marginal cost", "Twice marginal cost", "Zero"], a: 1, why: "Undercutting continues until price reaches marginal cost." },
        { q: "Which helps firms avoid the Bertrand paradox?", options: ["Identical products", "Product differentiation", "Unlimited capacity", "Selling only once"], a: 1, why: "Differentiation means a tiny price cut no longer captures the whole market." }
      ] },
    { id: "m7l3", title: "Stackelberg: the first-mover advantage",
      body: R`<p>Now firm 1 (the <b>leader</b>) chooses quantity first, and firm 2 (the <b>follower</b>) observes it and responds with $q_2 = (a-c-q_1)/2$.</p>
<p>The leader substitutes the follower's response into its profit and maximizes, using backward induction:</p>
$$q_L = \frac{a-c}{2},\qquad q_F = \frac{a-c}{4}$$
$$\pi_L = \frac{(a-c)^2}{8},\qquad \pi_F = \frac{(a-c)^2}{16}$$
<p>Compare with Cournot, where each gets $(a-c)^2/9$. Moving first and committing to a large output pays: the leader earns more, the follower less, and consumers get more output at a lower price.</p>
<p>The chart compares all four market structures. Change $a$ and $c$ and notice the ratios stay the same.</p>`,
      widget: "cournot", widgetOpts: { view: "compare" },
      formulas: [{ name: "Stackelberg quantities", tex: R`q_L=\dfrac{a-c}{2},\ \ q_F=\dfrac{a-c}{4}` }, { name: "Stackelberg profits", tex: R`\pi_L=\dfrac{(a-c)^2}{8},\ \ \pi_F=\dfrac{(a-c)^2}{16}` }],
      quiz: [
        { q: "Compared with Cournot, the Stackelberg leader earns…", options: ["Less", "The same", "More", "Zero"], a: 2, why: R`$(a-c)^2/8 > (a-c)^2/9$.` },
        { q: "How is the Stackelberg model solved?", options: ["Simultaneous best responses", "Backward induction", "Minimax", "Shapley value"], a: 1, why: "The leader anticipates the follower's best response." }
      ] },
    { id: "m7l4", title: "Collusion and cartels",
      body: R`<p>If the two Cournot firms act like one monopoly, total output is $(a-c)/2$, split equally:</p>
$$q_i^{c} = \frac{a-c}{4},\qquad \pi_i^{c} = \frac{(a-c)^2}{8} > \frac{(a-c)^2}{9}$$
<p>Both earn more than in Cournot. But is the agreement stable? If firm 2 sticks to $(a-c)/4$, firm 1's best response is:</p>
$$q_1 = \frac{a-c-\frac{a-c}{4}}{2} = \frac{3(a-c)}{8},\qquad \pi_1^{dev} = \frac{9(a-c)^2}{64}$$
<p>Since $9/64 > 8/64$, <b>each firm wants to cheat</b>. The cartel is a Prisoner's Dilemma:</p>
<table class="payoff"><tr><th>(×(a−c)²)</th><th>Collude</th><th>Cheat</th></tr>
<tr><th>Collude</th><td>(0.125, 0.125)</td><td>(0.094, 0.141)</td></tr>
<tr><th>Cheat</th><td>(0.141, 0.094)</td><td>(0.111, 0.111)</td></tr></table>
<p>That is why cartels (like OPEC's quotas) often break down, and why repeated play (next module) matters.</p>`,
      formulas: [{ name: "Cartel quantity (each)", tex: R`q_i^{c}=\dfrac{a-c}{4}` }, { name: "Deviation profit", tex: R`\pi^{dev}=\dfrac{9(a-c)^2}{64}` }],
      quiz: [
        { q: "Why are cartels unstable in a one-shot game?", options: ["Profits are lower than Cournot", "Each member gains by producing more than agreed", "Prices are too low", "Courts enforce them"], a: 1, why: "The best response to a colluding rival is to expand output." },
        { q: "The cartel game has the structure of…", options: ["Matching Pennies", "A Prisoner's Dilemma", "A Stag Hunt", "A zero-sum game"], a: 1, why: "Cheating dominates, but mutual collusion is better for both." }
      ] }
  ]
});
