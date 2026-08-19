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

/** Assunto e corpo do e-mail disparado pelo formulário de "Solicitar acesso". */
export const accessRequest = {
  subject: 'Quero conhecer o OrbixHub',
  bodyTemplate: (email: string) =>
    `Olá, equipe OrbixHub!\n\nMeu e-mail é ${email} e quero receber a apresentação do sistema.`,
} as const;

/** Link pronto do WhatsApp, ou null quando o número ainda não foi preenchido. */
export const whatsappHref: string | null = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`
  : null;
