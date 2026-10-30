/* Dados dos veículos Vinci.
   Para usar fotos reais: salve em /img e preencha o campo "image" (ex.: "img/v2.png"). */
const VINCI_COLORS = [
  { name: "Vermelho Vinci", hex: "#e71a3b" },
  { name: "Grafite", hex: "#2b2b2e" },
  { name: "Prata Lunar", hex: "#b9bcc2" },
  { name: "Branco Polar", hex: "#eeeeef" },
  { name: "Azul Noturno", hex: "#1f3a5f" },
];

const VINCI_MODELS = [
  {
    id: "v1", name: "V1", category: "Hatch", body: "hatch", color: "#e71a3b", image: "",
    tagline: "O compacto urbano do futuro",
    description: "Pensado para a cidade: ágil, silencioso e fácil de estacionar. O V1 entrega recarga econômica e autonomia suficiente para a semana inteira de deslocamentos.",
    power: 180, range: 380, maxRange: 400, weight: "1.100", torque: 1900, warranty: 8,
    battery: "52 kWh", charge: "10% a 80% em 35 min", seats: 5, accel: "7,2 s", tech: "GPS e Smartlink",
    dash: "Tela de 10 polegadas com navegação e atualizações via Smartlink.",
    design: "Linhas compactas e iluminação em LED com a assinatura Vinci.",
  },
  {
    id: "v2", name: "V2", category: "SUV", body: "suv", color: "#2b2b2e", image: "",
    tagline: "A SUV mais robusta da categoria",
    description: "Espaço, altura de rodagem e tração integrada para a estrada e a cidade. O V2 combina 300 cavalos com 520 km de autonomia e 10 anos de garantia.",
    power: 300, range: 500, maxRange: 520, weight: "1.500", torque: 2800, warranty: 10,
    battery: "86 kWh", charge: "10% a 80% em 28 min", seats: 5, accel: "5,4 s", tech: "GPS e Smartlink",
    dash: "Painel digital configurável com assistente de condução.",
    design: "Aerodinâmica e acabamento reconhecidos por prêmios de design.",
  },
  {
    id: "v3", name: "V3", category: "Sedã", body: "sedan", color: "#b9bcc2", image: "",
    tagline: "Performance e sofisticação em silêncio",
    description: "O sedã topo de linha da marca. Cabine silenciosa, acabamento refinado e a maior autonomia da família Vinci, para viagens longas sem ansiedade.",
    power: 420, range: 610, maxRange: 640, weight: "1.650", torque: 3200, warranty: 10,
    battery: "100 kWh", charge: "10% a 80% em 25 min", seats: 5, accel: "4,3 s", tech: "GPS e Smartlink",
    dash: "Painel panorâmico com realidade aumentada na navegação.",
    design: "Perfil alongado e faróis contínuos em LED.",
  },
  {
    id: "v4", name: "V4", category: "Cupê", body: "coupe", color: "#1f3a5f", image: "",
    tagline: "Esportivo elétrico para quem gosta de dirigir",
    description: "Baixo, largo e muito rápido. O V4 entrega torque instantâneo e resposta direta, com suspensão ajustável para pista ou para o dia a dia.",
    power: 510, range: 460, maxRange: 480, weight: "1.480", torque: 3600, warranty: 8,
    battery: "82 kWh", charge: "10% a 80% em 24 min", seats: 4, accel: "3,6 s", tech: "GPS e Smartlink",
    dash: "Painel focado no motorista, com modos de condução e telemetria.",
    design: "Carroceria de teto baixo e difusor aerodinâmico traseiro.",
  },
  {
    id: "v5", name: "V5", category: "Picape", body: "pickup", color: "#5b6b4a", image: "",
    tagline: "Força elétrica para o trabalho e a aventura",
    description: "Capacidade de carga e reboque com a entrega de torque de um motor elétrico. A V5 leva equipamento pesado e ainda alimenta ferramentas pela caçamba.",
    power: 380, range: 450, maxRange: 470, weight: "2.100", torque: 2400, warranty: 10,
    battery: "110 kWh", charge: "10% a 80% em 32 min", seats: 5, accel: "5,9 s", tech: "GPS e Smartlink",
    dash: "Painel robusto com câmeras 360° e modo off-road.",
    design: "Caçamba resistente e proteção reforçada nos para-choques.",
  },
  {
    id: "v6", name: "V6", category: "Van", body: "van", color: "#eeeeef", image: "",
    tagline: "Espaço para toda a família",
    description: "Sete lugares com acesso fácil e piso plano. A V6 foi pensada para famílias e para quem transporta passageiros, com baixo custo por quilômetro rodado.",
    power: 240, range: 420, maxRange: 440, weight: "1.900", torque: 2100, warranty: 8,
    battery: "90 kWh", charge: "10% a 80% em 35 min", seats: 7, accel: "8,1 s", tech: "GPS e Smartlink",
    dash: "Painel com telas independentes para motorista e passageiros.",
    design: "Portas laváveis e interior modular com sete configurações.",
  },
];

/* FAQ montado a partir dos dados do modelo */
function vinciFaq(m) {
  return [
    { q: "Qual é a autonomia real da bateria em diferentes condições de condução?",
      a: `O Vinci Model ${m.name} chega a ${m.maxRange} km com uma carga em ciclo misto. No uso real a média fica em torno de ${m.range} km, variando com velocidade, temperatura e carga transportada.` },
    { q: "Quanto tempo o carro leva para carregar em tomadas residenciais e em carregadores rápidos?",
      a: `Em carregadores rápidos, a carga de ${m.charge.replace("10% a 80% em", "10% a 80% leva cerca de")}. Em casa, com um carregador residencial, a recarga completa é feita durante a noite.` },
    { q: "Como funciona a infraestrutura de recarga para viagens de longa distância?",
      a: "O Smartlink mostra no mapa os pontos de recarga da rota, calcula as paradas necessárias e prepara a bateria antes de você chegar ao carregador, para recarregar mais rápido." },
    { q: "Qual é o tempo de garantia da bateria e qual a sua vida útil estimada?",
      a: `A bateria de ${m.battery} tem ${m.warranty} anos de garantia. A vida útil esperada é maior que o período de garantia, com baixa degradação ao longo do uso.` },
    { q: "Quais são as principais economias em manutenção e impostos comparado a um carro a combustão?",
      a: "O elétrico tem menos peças móveis: sem troca de óleo ou filtros de combustível, e a frenagem regenerativa reduz o desgaste dos freios. Em alguns estados há desconto ou isenção de IPVA para elétricos; confira a regra do seu estado." },
  ];
}
