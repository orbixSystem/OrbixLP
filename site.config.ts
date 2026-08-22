/**
 * Fonte única de verdade para dados de contato, marca e SEO da landing page.
 * Alterar aqui reflete no <head>, no JSON-LD, no rodapé, no formulário e no botão do WhatsApp.
 */

export const site = {
  /** Domínio de produção, sem barra no final. Usado em canonical, og:url e sitemap. */
  url: 'https://orbixsystem.com',
  name: 'OrbixHub',
  legalName: 'OrbixHub',
  locale: 'pt-BR',
  ogLocale: 'pt_BR',
  title: 'OrbixHub — sua oficina inteira em um só lugar',
  shortTitle: 'OrbixHub — a oficina inteira em um só lugar',
  description:
    'OrbixHub é o sistema de gestão para oficinas que organiza ordens de serviço, clientes, estoque, caixa e relatórios em um fluxo simples.',
  socialDescription:
    'OS, clientes, estoque, caixa e acompanhamento em um fluxo só para sua oficina trabalhar melhor.',
  twitterDescription: 'Gestão simples e completa para oficinas mecânicas.',
} as const;

export const contact = {
  email: 'orbix@orbixsystem.com',

  /**
   * TODO(orbix): informar o número real do WhatsApp comercial.
   * Formato E.164 sem "+", sem espaços e sem pontuação — ex.: '5511999999999'.
   * Enquanto estiver vazio, o botão flutuante de WhatsApp não é renderizado
   * (o preview original apontava para `wa.me/?text=...` sem número, um link quebrado).
   */
  whatsapp: '',
  whatsappMessage: 'Olá, quero conhecer o OrbixHub.',
} as const;

export const accessRequest = {
  /** Assunto do e-mail que o Web3Forms entrega na caixa de `contact.email`. */
  subject: 'Quero conhecer o OrbixHub',

  /**
   * Validação do campo de e-mail, mais rigorosa que o `type="email"` nativo.
   *
   * A regra do HTML segue a spec do WHATWG, que não exige ponto no domínio: `a@b`,
   * `teste@teste` e `fulano@gmail` passam por ela. Como o e-mail é o único dado que a
   * gente coleta, um endereço truncado significa um lead perdido sem volta — não há
   * telefone nem nome para tentar de novo.
   *
   * Esta versão exige domínio com pelo menos um ponto e TLD de 2+ letras.
   *
   * Sem âncoras (`^`/`$`): o atributo `pattern` do HTML já ancora sozinho, e o script
   * adiciona as âncoras ao montar o RegExp. O hífen vai escapado porque o `pattern`
   * compila com a flag `v`, que rejeita `-` solto dentro de classe de caractere.
   */
  emailPattern: String.raw`[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}`,
} as const;

/**
 * Envio do formulário de "Solicitar acesso".
 *
 * A chave vem de `PUBLIC_WEB3FORMS_KEY` (veja `.env.example`), não daqui: ela muda por
 * ambiente e não deve entrar no Git. O prefixo `PUBLIC_` é exigido pelo Astro para que a
 * variável chegue ao navegador — e é seguro, porque a chave do Web3Forms é pública por
 * design: ela só autoriza entregar mensagens na caixa já cadastrada, nunca lê nada.
 *
 * O destino é definido no painel do Web3Forms, no cadastro da chave, e precisa ser o
 * mesmo `contact.email`.
 */
export const web3forms = {
  endpoint: 'https://api.web3forms.com/submit',
  /** Nome que aparece como remetente do e-mail recebido. */
  fromName: 'Landing page OrbixHub',
} as const;

/** Link pronto do WhatsApp, ou null quando o número ainda não foi preenchido. */
export const whatsappHref: string | null = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`
  : null;
