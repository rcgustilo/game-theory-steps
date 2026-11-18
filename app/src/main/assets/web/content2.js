/* Game Theory Steps — lesson content, part 2 (modules 8–13). */

MODULES.push({
  id: "m8", title: "Repeated Games", icon: "🔁",
  intro: "Playing the same game again and again changes everything: the future can discipline the present.",
  lessons: [
    { id: "m8l1", title: "Finitely repeated games",
      body: R`<p>Suppose the Prisoner's Dilemma is played exactly $T$ times, and everyone knows $T$.</p>
<p>Use backward induction. In the last round there is no future, so both defect. In round $T-1$, the last round's outcome is fixed whatever happens, so again both defect, and so on. The whole cooperation <b>unravels</b>:</p>
$$\text{SPE: defect in every round } t = 1,\dots,T$$
<p>But experiments show people do cooperate for many rounds and defect near the end (the <b>end-game effect</b>). Cooperation survives in theory when:</p>
<ul><li>The end is <b>uncertain</b> (next lesson),</li>
<li>Some players might be “cooperative types” (reputation, Kreps et al., 1982), or</li>
<li>The stage game has <b>more than one</b> equilibrium, so future rounds can reward or punish.</li></ul>`,
      formulas: [{ name: "Unravelling", tex: R`\text{Unique stage NE} \Rightarrow \text{play it in every round of the finite game}` }],
      quiz: [
        { q: "In a PD repeated exactly 10 known times, the SPE is…", options: ["Cooperate always", "Defect always", "Tit-for-tat", "Cooperate then defect at round 10"], a: 1, why: "Backward induction unravels cooperation from the last round." },
        { q: "Which can rescue cooperation in finite games?", options: ["A known end date", "Uncertainty about the end or about types", "Larger temptation payoffs", "Removing communication"], a: 1, why: "Uncertainty breaks the unravelling argument." }
      ] },
    { id: "m8l2", title: "Discounting and the grim trigger",
      body: R`<p>If the game continues to the next round with probability $\delta$ (or players discount the future by $\delta$), a payoff $x$ every round is worth:</p>
$$PV = x + \delta x + \delta^2 x + \dots = \frac{x}{1-\delta}$$
<p>The <b>grim trigger</b> strategy says: cooperate until anyone defects, then defect forever. Cooperation is an equilibrium if cooperating forever beats defecting once and being punished forever:</p>
$$\frac{R}{1-\delta} \ \ge\ T + \frac{\delta P}{1-\delta} \quad\Longleftrightarrow\quad \delta \ \ge\ \frac{T-R}{T-P}$$
<p><b>Example:</b> $T=5,\ R=3,\ P=1$: cooperation needs $\delta \ge (5-3)/(5-1) = 0.5$. Players must value the future at least half as much as today.</p>
<p>In the chart, cooperation is sustainable where the blue line (cooperate) is above the orange line (deviate).</p>`,
      widget: "grim", widgetOpts: {},
      formulas: [{ name: "Present value of a stream", tex: R`PV=\dfrac{x}{1-\delta}` }, { name: "Grim trigger condition", tex: R`\delta \ge \dfrac{T-R}{T-P}` }],
      quiz: [
        { q: "With T = 7, R = 4, P = 1, what δ is needed?", options: ["0.25", "0.5", "0.75", "0.33"], a: 1, why: "(7 − 4)/(7 − 1) = 3/6 = 0.5." },
        { q: "A higher temptation T makes cooperation…", options: ["Easier", "Harder (needs higher δ)", "Unaffected", "Impossible always"], a: 1, why: "The required δ = (T − R)/(T − P) rises as T rises." }
      ] },
    { id: "m8l3", title: "Strategies and the Axelrod tournament",
      body: R`<p>In 1980, Robert Axelrod invited experts to submit computer strategies for a repeated Prisoner's Dilemma tournament. The winner was the simplest: <b>Tit-for-Tat (TFT)</b>, which cooperates first and then copies the opponent's last move.</p>
<table class="tbl"><tr><th>Strategy</th><th>Rule</th></tr>
<tr><td>Always Cooperate</td><td>Always C</td></tr>
<tr><td>Always Defect</td><td>Always D</td></tr>
<tr><td>Tit-for-Tat</td><td>C first, then copy opponent's last move</td></tr>
<tr><td>Grim Trigger</td><td>C until opponent defects once, then D forever</td></tr>
<tr><td>Pavlov (Win-Stay, Lose-Shift)</td><td>Repeat last move if it paid well (R or T); otherwise switch</td></tr>
<tr><td>Random</td><td>C or D with 50% each</td></tr></table>
<p>Axelrod's lessons: be <b>nice</b> (never defect first), <b>retaliatory</b>, <b>forgiving</b>, and <b>clear</b>.</p>
<p>Run your own round-robin tournament below. Add <b>noise</b> (mistakes) and see how TFT suffers from long revenge cycles while forgiving strategies recover.</p>`,
      widget: "tournament", widgetOpts: {},
      formulas: [{ name: "Tournament score", tex: R`\text{Score}_i=\sum_{j}\sum_{t=1}^{n} u_i(a_i^t,a_j^t)` }],
      quiz: [
        { q: "What does Tit-for-Tat do in round 1?", options: ["Defect", "Cooperate", "Random", "Copy the opponent's first move"], a: 1, why: "TFT starts nice." },
        { q: "Which property did Axelrod NOT recommend?", options: ["Nice", "Retaliatory", "Forgiving", "Envious"], a: 3, why: "Axelrod advised: don't be envious, be nice, retaliatory, forgiving and clear." }
      ] },
    { id: "m8l4", title: "The folk theorem",
      body: R`<p>The <b>folk theorem</b> says that in infinitely repeated games with patient players, almost <b>any</b> outcome can be sustained as an equilibrium, as long as each player gets at least their <b>minmax</b> (punishment) payoff:</p>
$$\text{If } v_i > \underline{v}_i \ \forall i \text{ and } v \text{ is feasible, then } \exists\, \bar\delta<1:\ \delta \ge \bar\delta \Rightarrow v \text{ is an SPE payoff}$$
<p>where $\underline{v}_i = \min_{s_{-i}} \max_{s_i} u_i(s_i,s_{-i})$ is the worst the others can force on $i$.</p>
<p><b>Meaning:</b> repetition makes cooperation <b>possible</b> but does not make it <b>certain</b>. Many equilibria exist, and which one occurs depends on norms, communication and institutions.</p>
<p><b>Applications:</b> tacit collusion among hotels in one city, long-term supplier relationships, international agreements, and cooperation between neighbouring tourism destinations that meet every season.</p>`,
      formulas: [{ name: "Minmax payoff", tex: R`\underline v_i=\min_{s_{-i}}\max_{s_i}u_i(s_i,s_{-i})` }, { name: "Folk theorem (idea)", tex: R`v_i>\underline v_i\ \forall i,\ \delta\to 1 \Rightarrow v \text{ sustainable}` }],
      quiz: [
        { q: "The folk theorem says that with patient players…", options: ["Only defection is an equilibrium", "Many outcomes, including cooperation, can be equilibria", "The game becomes zero-sum", "Mixed strategies are needed"], a: 1, why: "Any feasible, individually rational payoff can be sustained." },
        { q: "The minmax payoff is…", options: ["The best a player can get", "The worst others can force on a player", "The average payoff", "The cooperative payoff"], a: 1, why: "It is the punishment level, the floor for any equilibrium." }
      ] }
  ]
});

MODULES.push({
  id: "m9", title: "Incomplete Information", icon: "🕵️",
  intro: "What if you don't know your opponent's payoffs? Beliefs, Bayesian equilibrium, signals and screening.",
  lessons: [
    { id: "m9l1", title: "Types and beliefs",
      body: R`<p>In many games, players have <b>private information</b>: a firm's costs, a buyer's valuation, a student's ability. John Harsanyi modelled this by imagining that <b>Nature</b> first draws each player's <b>type</b> $\theta_i$ from a known probability distribution.</p>
$$\theta_i \in \Theta_i,\qquad \Pr(\theta) \text{ is common knowledge}$$
<p>Each player knows their own type but only has <b>beliefs</b> about others' types. When new information arrives, beliefs are updated with <b>Bayes' rule</b>:</p>
$$\Pr(\theta \mid m) = \frac{\Pr(m \mid \theta)\,\Pr(\theta)}{\sum_{\theta'} \Pr(m\mid\theta')\Pr(\theta')}$$
<p><b>Example:</b> 30% of incumbents are “tough”. Tough ones advertise aggressively 90% of the time, weak ones 20%. If you see aggressive ads, then</p>
$$\Pr(\text{tough}\mid \text{ads}) = \frac{0.9 \times 0.3}{0.9\times0.3 + 0.2\times0.7} = \frac{0.27}{0.41} \approx 0.66$$`,
      formulas: [{ name: "Bayes' rule", tex: R`\Pr(\theta\mid m)=\dfrac{\Pr(m\mid\theta)\Pr(\theta)}{\sum_{\theta'}\Pr(m\mid\theta')\Pr(\theta')}` }],
      quiz: [
        { q: "In Harsanyi's approach, who chooses the types?", options: ["The players", "Nature, using a known distribution", "A referee", "The strongest player"], a: 1, why: "Nature moves first and draws types from a common-knowledge prior." },
        { q: "After seeing aggressive ads, the belief that the incumbent is tough rises from 0.30 to about…", options: ["0.27", "0.41", "0.66", "0.90"], a: 2, why: "0.27 / 0.41 ≈ 0.66." }
      ] },
    { id: "m9l2", title: "Bayesian Nash equilibrium",
      body: R`<p>In a <b>Bayesian Nash equilibrium</b>, each type of each player chooses the action that maximizes <b>expected</b> payoff, given beliefs about others' types and their type-dependent strategies:</p>
$$s_i^*(\theta_i) \in \arg\max_{a_i} \sum_{\theta_{-i}} \Pr(\theta_{-i}\mid\theta_i)\; u_i\big(a_i, s_{-i}^*(\theta_{-i});\theta_i,\theta_{-i}\big)$$
<p><b>Example:</b> an entrant does not know whether the incumbent is <b>Strong</b> (always fights) or <b>Weak</b> (accommodates). Entering earns −1 against Strong and +2 against Weak; staying out earns 0. With belief $\mu$ that the incumbent is Strong:</p>
$$E[\text{Enter}] = \mu(-1) + (1-\mu)(2) = 2 - 3\mu$$
<p>Enter if $2-3\mu \ge 0$, i.e. $\mu \le 2/3$. Move the slider to see where entry stops paying.</p>`,
      widget: "bayes", widgetOpts: {},
      formulas: [{ name: "Bayesian Nash equilibrium", tex: R`s_i^*(\theta_i)\in\arg\max_{a_i}\textstyle\sum_{\theta_{-i}}\Pr(\theta_{-i}|\theta_i)\,u_i(a_i,s_{-i}^*(\theta_{-i});\theta)` }, { name: "Entry threshold (example)", tex: R`\text{Enter} \iff \mu \le \tfrac{2}{3}` }],
      quiz: [
        { q: "If μ = 0.5, should the entrant enter?", options: ["Yes, expected payoff 0.5", "No, expected payoff −0.5", "Indifferent", "Cannot tell"], a: 0, why: "2 − 3(0.5) = 0.5 > 0." },
        { q: "In a Bayesian game, a strategy specifies an action for…", options: ["Only the true type", "Every possible type of the player", "Only the opponent", "Nature"], a: 1, why: "Others don't know your type, so they reason about what each of your types would do." }
      ] },
    { id: "m9l3", title: "Signalling: education as a signal",
      body: R`<p>Michael Spence (Nobel 2001) asked: why do employers pay more for degrees even if school did not raise productivity? Because education can be a <b>signal</b> of ability that is cheaper for able workers to obtain.</p>
<p>Two worker types: High ability (wage $w_H$) and Low ability (wage $w_L$). Getting education level $e$ costs $c_H e$ for High types and $c_L e$ for Low types, with $c_L > c_H$.</p>
<p>A <b>separating equilibrium</b> (only High types get education $e^*$) requires that Low types don't want to imitate and High types do want to signal:</p>
$$\frac{w_H - w_L}{c_L} \ \le\ e^* \ \le\ \frac{w_H - w_L}{c_H}$$
<p><b>Example:</b> $w_H-w_L=10$, $c_L=2$, $c_H=1$ gives $5 \le e^* \le 10$.</p>
<p>For engineering education: certifications, board exam ratings and honours partly work as signals. The design question is whether they also build real skill (human capital) or only sort students.</p>`,
      widget: "signal", widgetOpts: {},
      formulas: [{ name: "Separating condition (Spence)", tex: R`\dfrac{w_H-w_L}{c_L}\le e^*\le\dfrac{w_H-w_L}{c_H}` }],
      quiz: [
        { q: "Signalling works only if the signal is…", options: ["Free for everyone", "Cheaper for the high type than for the low type", "Equally costly for all", "Invisible to employers"], a: 1, why: "The cost difference is what makes the signal credible." },
        { q: R`With $w_H-w_L=12$, $c_L=3$, $c_H=2$, the separating range for $e^*$ is…`, options: ["[4, 6]", "[2, 3]", "[6, 12]", "[3, 4]"], a: 0, why: "12/3 = 4 and 12/2 = 6." }
      ] },
    { id: "m9l4", title: "Screening and adverse selection",
      body: R`<p>In <b>signalling</b>, the informed side moves first. In <b>screening</b>, the uninformed side offers a <b>menu</b> designed so that each type chooses differently.</p>
<p><b>Adverse selection</b> (Akerlof's “market for lemons”, Nobel 2001): if buyers cannot tell good used cars from bad ones, they pay only the average value. Owners of good cars then leave the market, the average falls, and the market can collapse.</p>
<table class="tbl"><tr><th>Setting</th><th>Hidden information</th><th>Screening device</th></tr>
<tr><td>Insurance</td><td>Customer's risk</td><td>Menu: high deductible / low premium vs. low deductible / high premium</td></tr>
<tr><td>Airlines</td><td>Traveller's urgency</td><td>Cheap non-refundable vs. flexible fares</td></tr>
<tr><td>Hiring</td><td>Worker's ability</td><td>Probation period, performance pay</td></tr>
<tr><td>Hotels / tourism</td><td>Guest's willingness to pay</td><td>Advance-purchase rates vs. flexible rates</td></tr></table>
<p>A good screening menu satisfies <b>incentive compatibility</b> (each type prefers its own option) and <b>participation</b> (each type prefers some option to nothing):</p>
$$u(\text{option}_\theta;\theta) \ge u(\text{option}_{\theta'};\theta)\quad\text{and}\quad u(\text{option}_\theta;\theta)\ge \bar u_\theta$$`,
      formulas: [{ name: "Incentive compatibility", tex: R`u(x_\theta;\theta)\ge u(x_{\theta'};\theta)\ \ \forall \theta,\theta'` }, { name: "Participation constraint", tex: R`u(x_\theta;\theta)\ge \bar u_\theta` }],
      quiz: [
        { q: "In screening, who moves first?", options: ["The informed party", "The uninformed party, by offering a menu", "Nature only", "Both at once"], a: 1, why: "The uninformed side designs choices that make types reveal themselves." },
        { q: "The “market for lemons” illustrates…", options: ["Moral hazard", "Adverse selection", "Perfect competition", "The folk theorem"], a: 1, why: "Hidden quality before the trade drives good products out." }
      ] }
  ]
});

MODULES.push({
  id: "m10", title: "Evolutionary Games", icon: "🧬",
  intro: "Strategies as behaviours that spread when they do well, without anyone needing to be rational.",
  lessons: [
    { id: "m10l1", title: "Populations and fitness",
      body: R`<p>Evolutionary game theory (Maynard Smith and Price, 1973) studies large <b>populations</b> where individuals are randomly matched to play a game. Strategies are inherited behaviours, habits or business practices. Those that earn more (higher <b>fitness</b>) spread.</p>
<p>If a fraction $x$ of the population plays strategy A and $1-x$ plays B, the expected fitness of A is:</p>
$$f_A(x) = x\,u(A,A) + (1-x)\,u(A,B)$$
<p>and similarly for B. The population's average fitness is $\bar f = x f_A + (1-x) f_B$.</p>
<p>No one needs to be rational: imitation of successful neighbours, firms copying profitable practices, or students copying effective study habits all produce the same dynamics.</p>`,
      formulas: [{ name: "Fitness of strategy A", tex: R`f_A(x)=x\,u(A,A)+(1-x)\,u(A,B)` }, { name: "Average fitness", tex: R`\bar f = x f_A+(1-x)f_B` }],
      quiz: [
        { q: "In evolutionary game theory, strategies spread when…", options: ["Players calculate equilibria", "They earn higher fitness than average", "They are chosen randomly", "A leader imposes them"], a: 1, why: "Success drives growth; rational calculation is not needed." },
        { q: R`If $x=0.5$, $u(A,A)=4$, $u(A,B)=0$, what is $f_A$?`, options: ["0", "2", "4", "0.5"], a: 1, why: "0.5·4 + 0.5·0 = 2." }
      ] },
    { id: "m10l2", title: "Hawk–Dove",
      body: R`<p>Animals (or firms) compete for a resource worth $V$. <b>Hawks</b> fight; <b>Doves</b> display and retreat. A fight costs the loser $C$.</p>
<table class="payoff"><tr><th></th><th>Hawk</th><th>Dove</th></tr>
<tr><th>Hawk</th><td>((V−C)/2, (V−C)/2)</td><td>(V, 0)</td></tr>
<tr><th>Dove</th><td>(0, V)</td><td>(V/2, V/2)</td></tr></table>
<p>If $C > V$, neither pure strategy is stable: a population of Hawks is invaded by Doves (who avoid costly fights), and a population of Doves is invaded by Hawks. The stable mix has a Hawk share of:</p>
$$x^* = \frac{V}{C}$$
<p><b>Example:</b> $V=4,\ C=10$ gives 40% Hawks. This is the evolutionary version of the game of Chicken. Think of aggressive vs. accommodating pricing among tour operators in one market.</p>`,
      formulas: [{ name: "Hawk–Dove stable hawk share", tex: R`x^*=\dfrac{V}{C}\quad (C>V)` }],
      quiz: [
        { q: "With V = 6 and C = 12, the stable share of Hawks is…", options: ["25%", "50%", "75%", "100%"], a: 1, why: "V/C = 6/12 = 0.5." },
        { q: "If C < V (fighting is cheap), the population becomes…", options: ["All Doves", "All Hawks", "50/50", "Extinct"], a: 1, why: "Then Hawk dominates: (V − C)/2 > 0 and V > V/2." }
      ] },
    { id: "m10l3", title: "Evolutionarily stable strategies",
      body: R`<p>A strategy $s^*$ is an <b>evolutionarily stable strategy (ESS)</b> if a population playing it cannot be invaded by a small group of mutants playing any other $s$:</p>
$$u(s^*,s^*) > u(s,s^*)$$
$$\text{or}\quad u(s^*,s^*) = u(s,s^*)\ \text{ and }\ u(s^*,s) > u(s,s)$$
<p>The first line says $s^*$ does strictly better against itself. The second says that if mutants do equally well against $s^*$, then $s^*$ beats them when they meet each other.</p>
<table class="tbl"><tr><th>Game</th><th>ESS</th></tr>
<tr><td>Prisoner's Dilemma</td><td>Defect</td></tr>
<tr><td>Stag Hunt</td><td>Both Stag and Hare (two ESSs)</td></tr>
<tr><td>Hawk–Dove (C &gt; V)</td><td>Mixed: Hawk with probability V/C</td></tr></table>
<p>Every ESS is a Nash equilibrium, but not every Nash equilibrium is an ESS. ESS is a <b>refinement</b>.</p>`,
      formulas: [{ name: "ESS condition", tex: R`u(s^*,s^*)>u(s,s^*)\ \text{or}\ [=\ \text{and}\ u(s^*,s)>u(s,s)]` }],
      quiz: [
        { q: "What is the ESS of the Prisoner's Dilemma?", options: ["Cooperate", "Defect", "Mixed 50/50", "None"], a: 1, why: "Defect strictly beats Cooperate against Defectors." },
        { q: "Which is true?", options: ["Every NE is an ESS", "Every ESS is a NE", "ESS and NE are unrelated", "ESS requires rationality"], a: 1, why: "ESS is a refinement of Nash equilibrium." }
      ] },
    { id: "m10l4", title: "Replicator dynamics",
      body: R`<p>The <b>replicator equation</b> describes how the share of each strategy changes over time: strategies grow in proportion to how much they beat the average.</p>
$$\dot x_i = x_i\,\big(f_i(x) - \bar f(x)\big)$$
<p>For two strategies with share $x$ of the first:</p>
$$\dot x = x(1-x)\,\big(f_A(x) - f_B(x)\big)$$
<p>Rest points are $x=0$, $x=1$, and any $x$ where $f_A=f_B$. Stable rest points correspond to ESSs.</p>
<p>The simulation below runs Hawk–Dove dynamics from several starting shares. Whatever the start, the Hawk share converges to $V/C$. Try $C<V$ as well.</p>`,
      widget: "replicator", widgetOpts: {},
      formulas: [{ name: "Replicator equation", tex: R`\dot x_i=x_i\,(f_i-\bar f)` }, { name: "Two-strategy form", tex: R`\dot x = x(1-x)\,(f_A-f_B)` }],
      quiz: [
        { q: "In the replicator equation, a strategy's share grows when…", options: ["Its fitness is above average", "Its share is below 50%", "It is a Nash equilibrium", "It is mixed"], a: 0, why: R`$\dot x_i>0$ exactly when $f_i>\bar f$.` },
        { q: "In Hawk–Dove with V = 4, C = 10, where does the Hawk share settle?", options: ["0", "0.4", "0.6", "1"], a: 1, why: "V/C = 0.4." }
      ] }
  ]
});

MODULES.push({
  id: "m11", title: "Cooperative Games", icon: "🤝",
  intro: "When players can sign binding agreements, the question becomes: which coalitions form, and how do they share?",
  lessons: [
    { id: "m11l1", title: "Coalitions and the characteristic function",
      body: R`<p>In a cooperative (coalitional) game, players can form <b>coalitions</b> and make binding agreements. The game is described by its <b>characteristic function</b> $v(S)$: the total value coalition $S$ can secure on its own.</p>
$$v: 2^N \to \mathbb{R},\qquad v(\varnothing)=0$$
<p><b>Example:</b> three tourism businesses (1 = hotel, 2 = tour operator, 3 = restaurant) can create joint packages (values in ₱ thousands per week):</p>
<table class="tbl"><tr><th>Coalition S</th><th>{1}</th><th>{2}</th><th>{3}</th><th>{1,2}</th><th>{1,3}</th><th>{2,3}</th><th>{1,2,3}</th></tr>
<tr><td>v(S)</td><td>0</td><td>0</td><td>0</td><td>60</td><td>50</td><td>40</td><td>90</td></tr></table>
<p>The game is <b>superadditive</b> if joining never hurts: $v(S\cup T) \ge v(S)+v(T)$ for disjoint $S,T$. Here it is, so the grand coalition {1,2,3} forms, creating 90. The question is how to <b>divide</b> 90 fairly and stably.</p>`,
      formulas: [{ name: "Characteristic function", tex: R`v:2^N\to\mathbb R,\ \ v(\varnothing)=0` }, { name: "Superadditivity", tex: R`v(S\cup T)\ge v(S)+v(T),\ \ S\cap T=\varnothing` }],
      quiz: [
        { q: "v(S) measures…", options: ["Each member's payoff", "The total value coalition S can secure", "The number of players in S", "A probability"], a: 1, why: "It is the coalition's worth." },
        { q: "In the example, is v({1,2}) ≥ v({1}) + v({2})?", options: ["Yes: 60 ≥ 0", "No"], a: 0, why: "60 ≥ 0 + 0." }
      ] },
    { id: "m11l2", title: "The core",
      body: R`<p>An allocation $x=(x_1,\dots,x_n)$ is in the <b>core</b> if it shares the total value and <b>no coalition can do better by leaving</b>:</p>
$$\sum_{i\in N} x_i = v(N),\qquad \sum_{i\in S} x_i \ge v(S)\ \ \forall S\subseteq N$$
<p>For our example, the core conditions are:</p>
$$x_1+x_2+x_3=90,\quad x_1+x_2\ge 60,\quad x_1+x_3\ge 50,\quad x_2+x_3\ge 40,\quad x_i\ge0$$
<p>Is the equal split (30, 30, 30) in the core? $30+30=60 \ge 60$ ✓, $30+30 = 60\ge 50$ ✓, $30+30=60\ge40$ ✓. Yes.</p>
<p>Is (70, 10, 10) in the core? $x_2+x_3 = 20 < 40$ ✗. Players 2 and 3 would leave and earn 40 on their own.</p>
<p>The core can be <b>large</b> (many stable allocations) or <b>empty</b> (no stable allocation at all), so we often need a single fair rule: the Shapley value.</p>`,
      formulas: [{ name: "Core", tex: R`\textstyle\sum_{i\in N}x_i=v(N),\ \ \sum_{i\in S}x_i\ge v(S)\ \forall S` }],
      quiz: [
        { q: "An allocation is NOT in the core if…", options: ["It sums to v(N)", "Some coalition gets less than v(S)", "Everyone gets the same", "It is the Shapley value"], a: 1, why: "That coalition would break away." },
        { q: "Is (40, 40, 10) in the core of the example?", options: ["Yes", "No: x₁ + x₃ < 50", "No: x₂ + x₃ < 40", "No: it doesn't sum to 90"], a: 0, why: "40+40 = 80 ≥ 60, 40+10 = 50 ≥ 50, 40+10 = 50 ≥ 40, and the sum is 90." }
      ] },
    { id: "m11l3", title: "The Shapley value",
      body: R`<p>Lloyd Shapley (Nobel 2012) proposed paying each player their <b>average marginal contribution</b> over all orders in which the coalition could be assembled:</p>
$$\phi_i(v) = \sum_{S\subseteq N\setminus\{i\}} \frac{|S|!\,(n-|S|-1)!}{n!}\,\big[v(S\cup\{i\}) - v(S)\big]$$
<p>For the example, the 6 orders give player 1 marginal contributions 0, 0, 60, 50, 50, 50, an average of <b>35</b>. Similarly $\phi_2 = 30$ and $\phi_3 = 25$.</p>
<p>The Shapley value is the unique rule satisfying four fairness axioms: <b>efficiency</b> (shares add up to $v(N)$), <b>symmetry</b> (equal contributors get equal shares), <b>null player</b> (zero contribution gives zero share) and <b>additivity</b>.</p>
<p>Edit the coalition values below. The calculator shows the Shapley value, checks whether it is in the core, and draws the shares.</p>`,
      widget: "shapley", widgetOpts: {},
      formulas: [{ name: "Shapley value", tex: R`\phi_i=\sum_{S\subseteq N\setminus\{i\}}\dfrac{|S|!(n-|S|-1)!}{n!}\,[v(S\cup\{i\})-v(S)]` }],
      quiz: [
        { q: "The Shapley value pays each player…", options: ["An equal share", "Their average marginal contribution", "Their stand-alone value", "What they bargain for"], a: 1, why: "Averaged over all possible joining orders." },
        { q: "Which is a Shapley axiom?", options: ["Envy", "Efficiency", "Dominance", "Discounting"], a: 1, why: "Efficiency, symmetry, null player and additivity." }
      ] },
    { id: "m11l4", title: "Nash bargaining",
      body: R`<p>When two parties negotiate over a surplus, Nash's <b>bargaining solution</b> picks the agreement that maximizes the product of gains over the <b>disagreement point</b> $d=(d_1,d_2)$, what each gets if talks fail:</p>
$$\max_{u_1,u_2}\ (u_1-d_1)(u_2-d_2)\quad\text{s.t. } (u_1,u_2) \text{ feasible}$$
<p>For splitting a pie of size $P$ with $u_1+u_2=P$:</p>
$$u_1^* = d_1 + \frac{P-d_1-d_2}{2},\qquad u_2^* = d_2 + \frac{P-d_1-d_2}{2}$$
<p>Each gets their outside option plus half of the net surplus. <b>Example:</b> $P=100$, $d_1=20$, $d_2=0$ gives $u_1^*=60$, $u_2^*=40$. A better outside option is real bargaining power.</p>
<p>With unequal bargaining power $\beta$ (the <b>generalized</b> solution), maximize $(u_1-d_1)^\beta(u_2-d_2)^{1-\beta}$.</p>`,
      widget: "bargain", widgetOpts: {},
      formulas: [{ name: "Nash bargaining", tex: R`\max (u_1-d_1)(u_2-d_2)` }, { name: "Split of a pie P", tex: R`u_i^*=d_i+\tfrac12(P-d_1-d_2)` }, { name: "Generalized", tex: R`\max (u_1-d_1)^{\beta}(u_2-d_2)^{1-\beta}` }],
      quiz: [
        { q: "With P = 100, d₁ = 30, d₂ = 10, what does player 1 get?", options: ["50", "60", "65", "70"], a: 1, why: "30 + (100 − 30 − 10)/2 = 30 + 30 = 60." },
        { q: "Improving your disagreement payoff…", options: ["Lowers your share", "Raises your share", "Has no effect", "Ends bargaining"], a: 1, why: "Your share rises by half of the improvement." }
      ] }
  ]
});

MODULES.push({
  id: "m12", title: "Auctions & Mechanism Design", icon: "🔨",
  intro: "Designing the rules of the game so that self-interested players produce the outcome you want.",
  lessons: [
    { id: "m12l1", title: "Auction formats",
      body: R`<p>Four classic auction formats:</p>
<table class="tbl"><tr><th>Format</th><th>How it works</th><th>Winner pays</th></tr>
<tr><td>English (ascending)</td><td>Price rises until one bidder remains</td><td>About the second-highest value</td></tr>
<tr><td>Dutch (descending)</td><td>Price falls until someone accepts</td><td>Their own bid</td></tr>
<tr><td>First-price sealed bid</td><td>Highest sealed bid wins</td><td>Their own bid</td></tr>
<tr><td>Second-price sealed bid (Vickrey)</td><td>Highest sealed bid wins</td><td>The second-highest bid</td></tr></table>
<p>Strategically, Dutch ≡ first-price and (with private values) English ≈ second-price. Auctions are used for government procurement, spectrum licences, online ads, and the sale of fish, flowers and art.</p>`,
      formulas: [{ name: "Second-price payment", tex: R`\text{pay} = b_{(2)} \ \ (\text{second-highest bid})` }],
      quiz: [
        { q: "In a Vickrey auction, the winner pays…", options: ["Their own bid", "The second-highest bid", "The average bid", "Nothing"], a: 1, why: "That is the defining rule of the second-price auction." },
        { q: "The Dutch auction is strategically equivalent to…", options: ["First-price sealed bid", "Second-price sealed bid", "English auction", "A lottery"], a: 0, why: "In both, you choose when or what to bid and pay your own bid." }
      ] },
    { id: "m12l2", title: "Why truth-telling wins in second-price auctions",
      body: R`<p>In a second-price auction, bidding your <b>true value</b> $b_i=v_i$ is a <b>weakly dominant strategy</b>. Your bid only decides <b>whether</b> you win, never <b>how much</b> you pay.</p>
<table class="tbl"><tr><th>Case (highest rival bid = r)</th><th>Overbid (b &gt; v)</th><th>Underbid (b &lt; v)</th></tr>
<tr><td>r &lt; v</td><td>Win, pay r: same as truthful</td><td>May lose a profitable item</td></tr>
<tr><td>r &gt; v</td><td>May win and pay r &gt; v: a loss</td><td>Lose: same as truthful</td></tr></table>
<p>So deviating can only hurt. Your payoff when bidding truthfully is:</p>
$$u_i = \begin{cases} v_i - r & \text{if } v_i > r \\ 0 & \text{otherwise}\end{cases}$$
<p>This is a famous example of an <b>incentive-compatible</b> mechanism: the rules make honesty optimal.</p>`,
      formulas: [{ name: "Truthful bidding (Vickrey)", tex: R`b_i^*=v_i\ \ \text{(weakly dominant)}` }],
      quiz: [
        { q: "In a second-price auction, overbidding can lead to…", options: ["Paying less", "Winning and paying more than your value", "Always losing", "Nothing different"], a: 1, why: "If the rival's bid is between your value and your bid, you win at a loss." },
        { q: "Truthful bidding in a Vickrey auction is…", options: ["Strictly dominated", "Weakly dominant", "A mixed strategy", "Only optimal with 2 bidders"], a: 1, why: "It is never worse and sometimes better than any other bid." }
      ] },
    { id: "m12l3", title: "First-price bidding and revenue equivalence",
      body: R`<p>In a first-price auction, bidding your value guarantees zero profit, so bidders <b>shade</b> their bids. With $n$ bidders whose values are independent and uniform on $[0,1]$, the equilibrium bid is:</p>
$$b(v) = \frac{n-1}{n}\,v$$
<p>Surprisingly, the seller's expected revenue is the <b>same</b> in both formats:</p>
$$E[\text{Revenue}] = \frac{n-1}{n+1}$$
<p>This is the <b>revenue equivalence theorem</b> (Vickrey 1961; Myerson 1981): under standard assumptions, any auction that gives the item to the highest-value bidder yields the same expected revenue.</p>
<p>Simulate it below: with more bidders, shading falls and revenue rises toward 1.</p>`,
      widget: "auction", widgetOpts: {},
      formulas: [{ name: "First-price equilibrium bid (uniform)", tex: R`b(v)=\dfrac{n-1}{n}\,v` }, { name: "Expected revenue", tex: R`E[R]=\dfrac{n-1}{n+1}` }],
      quiz: [
        { q: "With 4 bidders (uniform values), a bidder with value 0.8 bids…", options: ["0.8", "0.6", "0.4", "0.2"], a: 1, why: "(4 − 1)/4 × 0.8 = 0.6." },
        { q: "Expected revenue with 3 bidders (uniform [0,1]) is…", options: ["0.25", "0.5", "0.75", "1"], a: 1, why: "(3 − 1)/(3 + 1) = 0.5, in both formats." }
      ] },
    { id: "m12l4", title: "Mechanism design",
      body: R`<p>Ordinary game theory takes the rules as given and predicts behaviour. <b>Mechanism design</b> works backwards: choose the rules so that equilibrium behaviour achieves a goal. It is sometimes called “reverse game theory” (Hurwicz, Maskin and Myerson, Nobel 2007).</p>
<p>The <b>revelation principle</b> says that any outcome achievable by some mechanism can also be achieved by a direct mechanism in which everyone simply reports their type truthfully:</p>
$$\text{report } \hat\theta_i = \theta_i \text{ is optimal: } u_i(f(\theta_i,\theta_{-i});\theta_i)\ \ge\ u_i(f(\hat\theta_i,\theta_{-i});\theta_i)$$
<table class="tbl"><tr><th>Application</th><th>Design goal</th></tr>
<tr><td>School / university admission (deferred acceptance)</td><td>Stable matching, truthful preferences</td></tr>
<tr><td>Kidney exchange</td><td>Maximize transplants</td></tr>
<tr><td>Grading and peer assessment</td><td>Honest effort and fair evaluation</td></tr>
<tr><td>Tourism levies / joint marketing funds</td><td>Contributions without free-riding</td></tr></table>`,
      formulas: [{ name: "Incentive compatibility (direct mechanism)", tex: R`u_i(f(\theta_i,\theta_{-i});\theta_i)\ge u_i(f(\hat\theta_i,\theta_{-i});\theta_i)` }],
      quiz: [
        { q: "Mechanism design is called “reverse game theory” because it…", options: ["Solves games backward", "Designs rules to reach a desired outcome", "Reverses payoffs", "Ignores incentives"], a: 1, why: "It starts from the goal and designs the game." },
        { q: "The revelation principle lets us focus on mechanisms where players…", options: ["Lie strategically", "Report their type truthfully", "Bid zero", "Collude"], a: 1, why: "Any implementable outcome has a truthful direct mechanism." }
      ] }
  ]
});

MODULES.push({
  id: "m13", title: "Applications & Research", icon: "📝",
  intro: "Putting it together: coopetition in tourism, game theory in education, and building a model for a paper.",
  lessons: [
    { id: "m13l1", title: "Coopetition between destinations",
      body: R`<p><b>Coopetition</b> (Brandenburger and Nalebuff, 1996) means competing and cooperating at the same time. Neighbouring tourism destinations compete for visitors but can cooperate on joint marketing, shared infrastructure or bundled tours.</p>
<p>A simple model: each destination chooses <b>Cooperate</b> (contribute $k$ to a joint campaign) or <b>Compete</b> (spend on its own ads). The joint campaign creates regional gain $g$ if both join (half as much if only one does), and competing steals $s$ visitors from a cooperating rival. With base payoff $B$:</p>
<table class="payoff"><tr><th></th><th>Cooperate</th><th>Compete</th></tr>
<tr><th>Cooperate</th><td>B + g − k</td><td>B + g/2 − k − s</td></tr>
<tr><th>Compete</th><td>B + g/2 + s</td><td>B</td></tr></table>
<p>(Row payoffs shown; the game is symmetric.) Mutual cooperation is self-enforcing when cooperating is the best reply to cooperation:</p>
$$g - k \ \ge\ \tfrac{g}{2} + s \iff \tfrac{g}{2} \ge k + s$$
<p>Otherwise the game is a Prisoner's Dilemma, and cooperation needs repetition ($\delta \ge \frac{T-R}{T-P}$), contracts or a regional tourism body. Use the sliders to see which kind of game your parameters create.</p>`,
      widget: "coop", widgetOpts: {},
      formulas: [{ name: "Self-enforcing coopetition", tex: R`\tfrac{g}{2}\ge k+s` }],
      quiz: [
        { q: "In the model, cooperation is self-enforcing when…", options: ["g/2 ≥ k + s", "s > g", "k = 0 only", "B is large"], a: 0, why: "Then cooperating is the best response to cooperation." },
        { q: "If the game turns out to be a Prisoner's Dilemma, cooperation can be sustained by…", options: ["Playing only once", "Repeated interaction, contracts or institutions", "Raising s", "Ignoring the rival"], a: 1, why: "Repetition and enforceable agreements change the incentives." }
      ] },
    { id: "m13l2", title: "Game theory in education",
      body: R`<p>Classrooms are full of strategic situations.</p>
<p><b>Group projects as a public-goods game.</b> Each of $n$ students chooses effort $e_i$ at cost $c\,e_i$; the project grade benefits everyone equally:</p>
$$u_i = \frac{r}{n}\sum_{j=1}^{n} e_j - c\,e_i$$
<p>If $r/n < c$, each student's own effort returns less than it costs, so free-riding is individually rational, even though the group gains when $r > c$. Remedies change the payoffs: individual accountability, peer evaluation, smaller groups (raising $r/n$).</p>
<table class="tbl"><tr><th>Situation</th><th>Game</th><th>Design lever</th></tr>
<tr><td>Group projects</td><td>Public goods / PD</td><td>Peer assessment, individual components</td></tr>
<tr><td>Teacher–student effort</td><td>Principal–agent</td><td>Formative feedback, clear rubrics</td></tr>
<tr><td>Grading on a curve</td><td>Zero-sum among students</td><td>Criterion-referenced grading encourages helping</td></tr>
<tr><td>Exams and cheating</td><td>Inspection game (mixed)</td><td>Random proctoring, honour codes</td></tr>
<tr><td>Certifications</td><td>Signalling</td><td>Make signals reflect real skill</td></tr></table>`,
      formulas: [{ name: "Public-goods payoff", tex: R`u_i=\dfrac{r}{n}\sum_j e_j - c\,e_i` }, { name: "Free-riding condition", tex: R`\dfrac{r}{n}<c` }],
      quiz: [
        { q: "With n = 5 students, r = 3, c = 1, will a self-interested student put in effort?", options: ["Yes, since r > c", "No, since r/n = 0.6 < 1", "Only if others do", "Always"], a: 1, why: "Each unit of own effort returns 0.6 but costs 1." },
        { q: "Grading on a curve turns a class into…", options: ["A cooperative game", "A zero-sum (constant-sum) game", "A signalling game only", "An auction"], a: 1, why: "One student's higher rank lowers another's." }
      ] },
    { id: "m13l3", title: "Building a game model for a paper",
      body: R`<p>A clear recipe for a game-theory research paper:</p>
<ol><li><b>Define the players</b> and justify why they act strategically (e.g. two destinations, a DMO and hotels).</li>
<li><b>Specify strategies</b> (discrete like Cooperate/Compete, or continuous like price or effort).</li>
<li><b>Write payoff functions</b> with clear parameters. Ground them in data where possible (visitor arrivals, costs, survey-based weights; AHP can supply weights).</li>
<li><b>Choose timing and information</b>: simultaneous, sequential, repeated, complete or incomplete.</li>
<li><b>Pick the solution concept</b>: NE, SPE, Bayesian NE, ESS, core or Shapley.</li>
<li><b>Solve</b> analytically, then <b>comparative statics</b>: how does the equilibrium change with each parameter, e.g. $\partial q^*/\partial c$?</li>
<li><b>Validate</b>: calibrate with real data, run simulations or sensitivity analysis, compare with case evidence.</li>
<li><b>Policy implications</b>: what rule, contract or institution moves players to the efficient outcome?</li></ol>
<p>Comparative statics is often the heart of the contribution:</p>
$$\frac{\partial s^*}{\partial \theta} = -\frac{\partial^2 u/\partial s\,\partial\theta}{\partial^2 u/\partial s^2}$$`,
      formulas: [{ name: "Comparative statics (implicit function)", tex: R`\dfrac{\partial s^*}{\partial\theta}=-\dfrac{u_{s\theta}}{u_{ss}}` }],
      quiz: [
        { q: "Comparative statics studies…", options: ["How the equilibrium changes when a parameter changes", "Only static games", "Statistics of players", "The number of equilibria"], a: 0, why: "It traces how the solution moves with parameters." },
        { q: "For a sequential game with complete information, the natural solution concept is…", options: ["Bayesian NE", "Subgame perfect equilibrium", "Core", "ESS"], a: 1, why: "Use backward induction to find the SPE." }
      ] },
    { id: "m13l4", title: "Review: which tool for which game?",
      body: R`<p>Congratulations on reaching the final lesson! Here is the whole course in one table:</p>
<table class="tbl"><tr><th>If the game is…</th><th>Use</th><th>Module</th></tr>
<tr><td>Simultaneous, one strategy always best</td><td>Dominance / IESDS</td><td>2</td></tr>
<tr><td>Simultaneous, general</td><td>Nash equilibrium (best responses)</td><td>3</td></tr>
<tr><td>No pure equilibrium</td><td>Mixed strategies (indifference)</td><td>4</td></tr>
<tr><td>Pure conflict</td><td>Minimax / value</td><td>5</td></tr>
<tr><td>Sequential</td><td>Backward induction / SPE</td><td>6</td></tr>
<tr><td>Firms on quantity / price / timing</td><td>Cournot / Bertrand / Stackelberg</td><td>7</td></tr>
<tr><td>Repeated</td><td>Discounting, trigger strategies, folk theorem</td><td>8</td></tr>
<tr><td>Private information</td><td>Bayesian NE, signalling, screening</td><td>9</td></tr>
<tr><td>Large populations, learning</td><td>ESS, replicator dynamics</td><td>10</td></tr>
<tr><td>Binding agreements</td><td>Core, Shapley value, Nash bargaining</td><td>11</td></tr>
<tr><td>Designing rules</td><td>Auctions, mechanism design</td><td>12</td></tr></table>
<p><b>Next steps:</b> re-take the quizzes you found hard, open the Formulas tab as a study sheet, and try modelling one real situation from your own work using the recipe in the previous lesson.</p>
<p class="tip">Suggested reading: Dixit, Skeath &amp; McAdams, <i>Games of Strategy</i>; Gibbons, <i>Game Theory for Applied Economists</i>; Osborne, <i>An Introduction to Game Theory</i>.</p>`,
      formulas: [],
      quiz: [
        { q: "A government wants firms to reveal their true costs. Which area helps most?", options: ["Evolutionary games", "Mechanism design", "Zero-sum games", "Matching Pennies"], a: 1, why: "Designing rules that make truth-telling optimal is mechanism design." },
        { q: "Three companies form a joint venture and must share the profit fairly. Which tool?", options: ["Shapley value", "Minimax", "Replicator equation", "Bertrand model"], a: 0, why: "Fair division of coalition value is what the Shapley value is for." },
        { q: "Two hotels set prices once with identical rooms. The predicted price is…", options: ["Monopoly price", "Marginal cost (Bertrand)", "Random", "Twice cost"], a: 1, why: "Bertrand competition drives price to marginal cost." }
      ] }
  ]
});
