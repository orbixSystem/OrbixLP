interface ImportMetaEnv {
  /** Chave pública do Web3Forms usada pelo formulário de acesso. Veja `.env.example`. */
  readonly PUBLIC_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
