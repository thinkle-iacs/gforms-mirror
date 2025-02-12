var vt = Object.defineProperty;
var wt = (t, e, n) => e in t ? vt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Z = (t, e, n) => (wt(t, typeof e != "symbol" ? e + "" : e, n), n);
function D() {
}
function ct(t) {
  return t();
}
function Ge() {
  return /* @__PURE__ */ Object.create(null);
}
function ne(t) {
  t.forEach(ct);
}
function Se(t) {
  return typeof t == "function";
}
function le(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let he;
function Ft(t, e) {
  return t === e ? !0 : (he || (he = document.createElement("a")), he.href = e, t === he.href);
}
function Ct(t) {
  return Object.keys(t).length === 0;
}
function $(t, e) {
  t.appendChild(e);
}
function be(t, e, n) {
  const i = yt(t);
  if (!i.getElementById(e)) {
    const s = k("style");
    s.id = e, s.textContent = n, St(i, s);
  }
}
function yt(t) {
  if (!t)
    return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && /** @type {ShadowRoot} */
  e.host ? (
    /** @type {ShadowRoot} */
    e
  ) : t.ownerDocument;
}
function St(t, e) {
  return $(
    /** @type {Document} */
    t.head || t,
    e
  ), e.sheet;
}
function T(t, e, n) {
  t.insertBefore(e, n || null);
}
function S(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function te(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function k(t) {
  return document.createElement(t);
}
function X(t) {
  return document.createTextNode(t);
}
function j() {
  return X(" ");
}
function $e() {
  return X("");
}
function H(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function mt(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function g(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Tt(t) {
  let e;
  return {
    /* push */
    p(...n) {
      e = n, e.forEach((i) => t.push(i));
    },
    /* remove */
    r() {
      e.forEach((n) => t.splice(t.indexOf(n), 1));
    }
  };
}
function Gt(t) {
  return Array.from(t.childNodes);
}
function ie(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function _e(t, e) {
  t.value = e ?? "";
}
function x(t, e, n) {
  t.classList.toggle(e, !!n);
}
function Et(t) {
  const e = {};
  return t.childNodes.forEach(
    /** @param {Element} node */
    (n) => {
      e[n.slot || "default"] = !0;
    }
  ), e;
}
let ge;
function me(t) {
  ge = t;
}
function At() {
  if (!ge)
    throw new Error("Function called outside component initialization");
  return ge;
}
function gt(t) {
  At().$$.on_mount.push(t);
}
function Ut(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((i) => i.call(this, e));
}
const fe = [], Fe = [];
let ce = [];
const Ee = [], It = /* @__PURE__ */ Promise.resolve();
let Ce = !1;
function Lt() {
  Ce || (Ce = !0, It.then(I));
}
function ye(t) {
  ce.push(t);
}
const ke = /* @__PURE__ */ new Set();
let ue = 0;
function I() {
  if (ue !== 0)
    return;
  const t = ge;
  do {
    try {
      for (; ue < fe.length; ) {
        const e = fe[ue];
        ue++, me(e), qt(e.$$);
      }
    } catch (e) {
      throw fe.length = 0, ue = 0, e;
    }
    for (me(null), fe.length = 0, ue = 0; Fe.length; )
      Fe.pop()();
    for (let e = 0; e < ce.length; e += 1) {
      const n = ce[e];
      ke.has(n) || (ke.add(n), n());
    }
    ce.length = 0;
  } while (fe.length);
  for (; Ee.length; )
    Ee.pop()();
  Ce = !1, ke.clear(), me(t);
}
function qt(t) {
  if (t.fragment !== null) {
    t.update(), ne(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(ye);
  }
}
function Bt(t) {
  const e = [], n = [];
  ce.forEach((i) => t.indexOf(i) === -1 ? e.push(i) : n.push(i)), n.forEach((i) => i()), ce = e;
}
const de = /* @__PURE__ */ new Set();
let se;
function K() {
  se = {
    r: 0,
    c: [],
    p: se
    // parent group
  };
}
function Q() {
  se.r || ne(se.c), se = se.p;
}
function _(t, e) {
  t && t.i && (de.delete(t), t.i(e));
}
function F(t, e, n, i) {
  if (t && t.o) {
    if (de.has(t))
      return;
    de.add(t), se.c.push(() => {
      de.delete(t), i && (n && t.d(1), i());
    }), t.o(e);
  } else
    i && i();
}
function V(t) {
  return (t == null ? void 0 : t.length) !== void 0 ? t : Array.from(t);
}
function M(t) {
  t && t.c();
}
function O(t, e, n) {
  const { fragment: i, after_update: s } = t.$$;
  i && i.m(e, n), ye(() => {
    const l = t.$$.on_mount.map(ct).filter(Se);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : ne(l), t.$$.on_mount = [];
  }), s.forEach(ye);
}
function R(t, e) {
  const n = t.$$;
  n.fragment !== null && (Bt(n.after_update), ne(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Nt(t, e) {
  t.$$.dirty[0] === -1 && (fe.push(t), Lt(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function oe(t, e, n, i, s, l, o = null, a = [-1]) {
  const r = ge;
  me(t);
  const u = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: D,
    not_equal: s,
    bound: Ge(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (r ? r.$$.context : [])),
    // everything else
    callbacks: Ge(),
    dirty: a,
    skip_bound: !1,
    root: e.target || r.$$.root
  };
  o && o(u.root);
  let c = !1;
  if (u.ctx = n ? n(t, e.props || {}, (f, h, ...m) => {
    const d = m.length ? m[0] : h;
    return u.ctx && s(u.ctx[f], u.ctx[f] = d) && (!u.skip_bound && u.bound[f] && u.bound[f](d), c && Nt(t, f)), h;
  }) : [], u.update(), c = !0, ne(u.before_update), u.fragment = i ? i(u.ctx) : !1, e.target) {
    if (e.hydrate) {
      const f = Gt(e.target);
      u.fragment && u.fragment.l(f), f.forEach(S);
    } else
      u.fragment && u.fragment.c();
    e.intro && _(t.$$.fragment), O(t, e.target, e.anchor), I();
  }
  me(r);
}
let ht;
typeof HTMLElement == "function" && (ht = class extends HTMLElement {
  constructor(e, n, i) {
    super();
    /** The Svelte component constructor */
    Z(this, "$$ctor");
    /** Slots */
    Z(this, "$$s");
    /** The Svelte component instance */
    Z(this, "$$c");
    /** Whether or not the custom element is connected */
    Z(this, "$$cn", !1);
    /** Component props data */
    Z(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    Z(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    Z(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    Z(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    Z(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = e, this.$$s = n, i && this.attachShadow({ mode: "open" });
  }
  addEventListener(e, n, i) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(n), this.$$c) {
      const s = this.$$c.$on(e, n);
      this.$$l_u.set(n, s);
    }
    super.addEventListener(e, n, i);
  }
  removeEventListener(e, n, i) {
    if (super.removeEventListener(e, n, i), this.$$c) {
      const s = this.$$l_u.get(n);
      s && (s(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(l) {
        return () => {
          let o;
          return {
            c: function() {
              o = k("slot"), l !== "default" && g(o, "name", l);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(u, c) {
              T(u, o, c);
            },
            d: function(u) {
              u && S(o);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const n = {}, i = Et(this);
      for (const l of this.$$s)
        l in i && (n[l] = [e(l)]);
      for (const l of this.attributes) {
        const o = this.$$g_p(l.name);
        o in this.$$d || (this.$$d[o] = pe(o, l.value, this.$$p_d, "toProp"));
      }
      for (const l in this.$$p_d)
        !(l in this.$$d) && this[l] !== void 0 && (this.$$d[l] = this[l], delete this[l]);
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: n,
          $$scope: {
            ctx: []
          }
        }
      });
      const s = () => {
        this.$$r = !0;
        for (const l in this.$$p_d)
          if (this.$$d[l] = this.$$c.$$.ctx[this.$$c.$$.props[l]], this.$$p_d[l].reflect) {
            const o = pe(
              l,
              this.$$d[l],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[l].attribute || l) : this.setAttribute(this.$$p_d[l].attribute || l, o);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(s), s();
      for (const l in this.$$l)
        for (const o of this.$$l[l]) {
          const a = this.$$c.$on(l, o);
          this.$$l_u.set(o, a);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(e, n, i) {
    var s;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = pe(e, i, this.$$p_d, "toProp"), (s = this.$$c) == null || s.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(e) {
    return Object.keys(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === e || !this.$$p_d[n].attribute && n.toLowerCase() === e
    ) || e;
  }
});
function pe(t, e, n, i) {
  var l;
  const s = (l = n[t]) == null ? void 0 : l.type;
  if (e = s === "Boolean" && typeof e != "boolean" ? e != null : e, !i || !n[t])
    return e;
  if (i === "toAttribute")
    switch (s) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (s) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function re(t, e, n, i, s, l) {
  let o = class extends ht {
    constructor() {
      super(t, n, s), this.$$p_d = e;
    }
    static get observedAttributes() {
      return Object.keys(e).map(
        (a) => (e[a].attribute || a).toLowerCase()
      );
    }
  };
  return Object.keys(e).forEach((a) => {
    Object.defineProperty(o.prototype, a, {
      get() {
        return this.$$c && a in this.$$c ? this.$$c[a] : this.$$d[a];
      },
      set(r) {
        var u;
        r = pe(a, r, e), this.$$d[a] = r, (u = this.$$c) == null || u.$set({ [a]: r });
      }
    });
  }), i.forEach((a) => {
    Object.defineProperty(o.prototype, a, {
      get() {
        var r;
        return (r = this.$$c) == null ? void 0 : r[a];
      }
    });
  }), l && (o = l(o)), t.element = /** @type {any} */
  o, o;
}
class ae {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Z(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Z(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    R(this, 1), this.$destroy = D;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!Se(n))
      return D;
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return i.push(n), () => {
      const s = i.indexOf(n);
      s !== -1 && i.splice(s, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !Ct(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const jt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(jt);
const ve = {
  en: {
    "This field is required": "This field is required",
    Submit: "Submit",
    Submitting: "Submitting",
    "Submit another response": "Submit another response",
    "Form submitted successfully!": "Form submitted successfully!",
    "Click here to edit your response in Google Forms": "Click here to edit your response in Google Forms",
    "There was an error submitting the form.": "There was an error submitting the form.",
    "Complete in Google Forms": "Complete in Google Forms"
  },
  es: {
    "This field is required": "Este campo es obligatorio",
    Submit: "Enviar",
    Submitting: "Enviando",
    "Submit another response": "Enviar otra respuesta",
    "Form submitted successfully!": "¡Formulario enviado con éxito!",
    "Click here to edit your response in Google Forms": "Haz clic aquí para editar tu respuesta en Google Forms",
    "There was an error submitting the form.": "Hubo un error al enviar el formulario.",
    "Complete in Google Forms": "Completar en Google Forms"
  },
  pt: {
    "This field is required": "Este campo é obrigatório",
    Submit: "Enviar",
    Submitting: "Enviando",
    "Submit another response": "Enviar outra resposta",
    "Form submitted successfully!": "Formulário enviado com sucesso!",
    "Click here to edit your response in Google Forms": "Clique aqui para editar sua resposta no Google Forms",
    "There was an error submitting the form.": "Houve um erro ao enviar o formulário.",
    "Complete in Google Forms": "Concluir no Google Forms"
  },
  km: {
    "This field is required": "វាលនេះត្រូវការជាតម្រូវការ",
    Submit: "ដាក់ស្នើ",
    Submitting: "កំពុងដាក់ស្នើ",
    "Submit another response": "ដាក់ស្នើការឆ្លើយតបផ្សេងទៀត",
    "Form submitted successfully!": "បំពេញបែបបទដោយជោគជ័យ!",
    "Click here to edit your response in Google Forms": "ចុចទីនេះដើម្បីកែសម្រួលការឆ្លើយតបរបស់អ្នកនៅក្នុង Google Forms",
    "There was an error submitting the form.": "មានកំហុសក្នុងការដាក់ស្នើបែបបទ។",
    "Complete in Google Forms": "បញ្ចប់ក្នុង Google Forms"
  },
  fr: {
    "This field is required": "Ce champ est obligatoire",
    Submit: "Soumettre",
    Submitting: "Soumission en cours",
    "Submit another response": "Soumettre une autre réponse",
    "Form submitted successfully!": "Formulaire soumis avec succès !",
    "Click here to edit your response in Google Forms": "Cliquez ici pour modifier votre réponse dans Google Forms",
    "There was an error submitting the form.": "Une erreur s'est produite lors de la soumission du formulaire.",
    "Complete in Google Forms": "Compléter dans Google Forms"
  },
  de: {
    "This field is required": "Dieses Feld ist erforderlich",
    Submit: "Einreichen",
    Submitting: "Einreichen...",
    "Submit another response": "Eine weitere Antwort einreichen",
    "Form submitted successfully!": "Formular erfolgreich eingereicht!",
    "Click here to edit your response in Google Forms": "Klicken Sie hier, um Ihre Antwort in Google Forms zu bearbeiten",
    "There was an error submitting the form.": "Beim Einreichen des Formulars ist ein Fehler aufgetreten.",
    "Complete in Google Forms": "In Google Forms ausfüllen"
  },
  it: {
    "This field is required": "Questo campo è obbligatorio",
    Submit: "Invia",
    Submitting: "Invio in corso",
    "Submit another response": "Invia un'altra risposta",
    "Form submitted successfully!": "Modulo inviato con successo!",
    "Click here to edit your response in Google Forms": "Clicca qui per modificare la tua risposta su Google Forms",
    "There was an error submitting the form.": "Si è verificato un errore nell'invio del modulo.",
    "Complete in Google Forms": "Completa in Google Forms"
  },
  nl: {
    "This field is required": "Dit veld is verplicht",
    Submit: "Verzenden",
    Submitting: "Bezig met verzenden",
    "Submit another response": "Nog een antwoord verzenden",
    "Form submitted successfully!": "Formulier succesvol verzonden!",
    "Click here to edit your response in Google Forms": "Klik hier om uw antwoord in Google Forms te bewerken",
    "There was an error submitting the form.": "Er is een fout opgetreden bij het verzenden van het formulier.",
    "Complete in Google Forms": "Voltooien in Google Forms"
  },
  ru: {
    "This field is required": "Это поле обязательно для заполнения",
    Submit: "Отправить",
    Submitting: "Отправка...",
    "Submit another response": "Отправить другой ответ",
    "Form submitted successfully!": "Форма успешно отправлена!",
    "Click here to edit your response in Google Forms": "Нажмите здесь, чтобы изменить ваш ответ в Google Forms",
    "There was an error submitting the form.": "Произошла ошибка при отправке формы.",
    "Complete in Google Forms": "Завершить в Google Forms"
  },
  zh: {
    "This field is required": "此字段为必填项",
    Submit: "提交",
    Submitting: "正在提交...",
    "Submit another response": "提交另一个回应",
    "Form submitted successfully!": "表单提交成功！",
    "Click here to edit your response in Google Forms": "点击此处编辑您的 Google Forms 回应",
    "There was an error submitting the form.": "提交表单时发生错误。",
    "Complete in Google Forms": "在 Google Forms 中完成"
  }
}, dt = (t, e, n = "en") => e[n] && e[n][t] ? e[n][t] : ve[n] && ve[n][t] ? ve[n][t] : t;
function zt(t) {
  be(t, "svelte-f2gsno", "span.svelte-f2gsno{display:contents}");
}
function Pt(t) {
  let e, n;
  return {
    c() {
      e = k("span"), n = X(
        /*translatedText*/
        t[1]
      ), g(
        e,
        "data-original-text",
        /*text*/
        t[0]
      ), g(e, "class", "svelte-f2gsno"), x(
        e,
        "notranslate",
        /*haveTranslation*/
        t[2]
      );
    },
    m(i, s) {
      T(i, e, s), $(e, n);
    },
    p(i, [s]) {
      s & /*translatedText*/
      2 && ie(
        n,
        /*translatedText*/
        i[1]
      ), s & /*text*/
      1 && g(
        e,
        "data-original-text",
        /*text*/
        i[0]
      ), s & /*haveTranslation*/
      4 && x(
        e,
        "notranslate",
        /*haveTranslation*/
        i[2]
      );
    },
    i: D,
    o: D,
    d(i) {
      i && S(e);
    }
  };
}
function Ot(t, e, n) {
  let { text: i } = e, { lang: s = "en" } = e, { translations: l = {} } = e, o = i, a = !1;
  return t.$$set = (r) => {
    "text" in r && n(0, i = r.text), "lang" in r && n(3, s = r.lang), "translations" in r && n(4, l = r.translations);
  }, t.$$.update = () => {
    t.$$.dirty & /*translations, lang, text*/
    25 && (n(2, a = !!(l[s] && l[s][i])), n(1, o = dt(i, l, s)));
  }, [i, o, a, s, l];
}
class J extends ae {
  constructor(e) {
    super(), oe(this, e, Ot, Pt, le, { text: 0, lang: 3, translations: 4 }, zt);
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(e) {
    this.$$set({ text: e }), I();
  }
  get lang() {
    return this.$$.ctx[3];
  }
  set lang(e) {
    this.$$set({ lang: e }), I();
  }
  get translations() {
    return this.$$.ctx[4];
  }
  set translations(e) {
    this.$$set({ translations: e }), I();
  }
}
re(J, { text: {}, lang: {}, translations: {} }, [], [], !0);
function Rt(t) {
  be(t, "svelte-t16d3j", ".translate.svelte-t16d3j{margin-bottom:10px}.hidden.svelte-t16d3j{display:none}button.svelte-t16d3j{text-transform:capitalize}");
}
function Ae(t, e, n) {
  const i = t.slice();
  i[17] = e[n];
  const s = new Intl.DisplayNames([
    /*lang*/
    i[17]
  ], { type: "language" }).of(
    /*lang*/
    i[17]
  );
  return i[18] = s, i;
}
function we(t) {
  const e = t.slice(), n = new Intl.DisplayNames([
    /*sourceLanguage*/
    e[1]
  ], { type: "language" }).of(
    /*sourceLanguage*/
    e[1]
  );
  return e[18] = n, e;
}
function Ue(t) {
  let e, n, i, s, l;
  return n = new J({
    props: {
      lang: (
        /*selectedLang*/
        t[2]
      ),
      translations: (
        /*translations*/
        t[0]
      ),
      text: (
        /*langName*/
        t[18]
      )
    }
  }), {
    c() {
      e = k("button"), M(n.$$.fragment), g(e, "class", "px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition text-sm capitalize notranslate focus:outline-none focus:ring-2 focus:ring-inputFocus svelte-t16d3j");
    },
    m(o, a) {
      T(o, e, a), O(n, e, null), i = !0, s || (l = H(
        e,
        "click",
        /*click_handler*/
        t[9]
      ), s = !0);
    },
    p(o, a) {
      const r = {};
      a & /*selectedLang*/
      4 && (r.lang = /*selectedLang*/
      o[2]), a & /*translations*/
      1 && (r.translations = /*translations*/
      o[0]), a & /*sourceLanguage*/
      2 && (r.text = /*langName*/
      o[18]), n.$set(r);
    },
    i(o) {
      i || (_(n.$$.fragment, o), i = !0);
    },
    o(o) {
      F(n.$$.fragment, o), i = !1;
    },
    d(o) {
      o && S(e), R(n), s = !1, l();
    }
  };
}
function Ie(t) {
  let e, n = (
    /*langName*/
    t[18] + ""
  ), i, s, l, o;
  function a() {
    return (
      /*click_handler_1*/
      t[10](
        /*lang*/
        t[17]
      )
    );
  }
  return {
    c() {
      e = k("button"), i = X(n), s = j(), g(e, "class", "px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition text-sm capitalize notranslate focus:outline-none focus:ring-2 focus:ring-inputFocus svelte-t16d3j");
    },
    m(r, u) {
      T(r, e, u), $(e, i), $(e, s), l || (o = H(e, "click", a), l = !0);
    },
    p(r, u) {
      t = r, u & /*translations*/
      1 && n !== (n = /*langName*/
      t[18] + "") && ie(i, n);
    },
    d(r) {
      r && S(e), l = !1, o();
    }
  };
}
function Mt(t) {
  let e, n;
  return e = new J({
    props: {
      lang: (
        /*selectedLang*/
        t[2]
      ),
      translations: (
        /*translations*/
        t[0]
      ),
      text: "Translate"
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*selectedLang*/
      4 && (l.lang = /*selectedLang*/
      i[2]), s & /*translations*/
      1 && (l.translations = /*translations*/
      i[0]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function Dt(t) {
  let e, n;
  return e = new J({
    props: {
      lang: (
        /*selectedLang*/
        t[2]
      ),
      translations: (
        /*translations*/
        t[0]
      ),
      text: "Other Languages"
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*selectedLang*/
      4 && (l.lang = /*selectedLang*/
      i[2]), s & /*translations*/
      1 && (l.translations = /*translations*/
      i[0]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function Ht(t) {
  let e, n, i, s, l, o, a, r, u, c, f, h, m, d, L, y, A = (
    /*selectedLang*/
    t[2] !== /*sourceLanguage*/
    t[1] && Ue(we(t))
  ), v = V(Object.keys(
    /*translations*/
    t[0]
  )), U = [];
  for (let p = 0; p < v.length; p += 1)
    U[p] = Ie(Ae(t, v, p));
  const E = [Dt, Mt], B = [];
  function C(p, z) {
    return z & /*translations*/
    1 && (u = null), u == null && (u = !!Object.keys(
      /*translations*/
      p[0]
    ).length), u ? 0 : 1;
  }
  return c = C(t, -1), f = B[c] = E[c](t), {
    c() {
      e = k("script"), e.innerHTML = "", i = j(), s = k("div"), l = k("div"), A && A.c(), o = j();
      for (let p = 0; p < U.length; p += 1)
        U[p].c();
      a = j(), r = k("button"), f.c(), h = j(), m = k("div"), Ft(e.src, n = "https://translate.google.com/translate_a/element.js?cb=googleTranslateLoaded") || g(e, "src", n), g(r, "class", "px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 svelte-t16d3j"), g(l, "class", "flex flex-wrap gap-2"), g(s, "class", "translate space-y-2 mt-4 svelte-t16d3j"), g(m, "id", "google_translate_element"), g(m, "class", "svelte-t16d3j"), x(m, "hidden", !/*showAllLanguages*/
      t[3]);
    },
    m(p, z) {
      $(document.head, e), T(p, i, z), T(p, s, z), $(s, l), A && A.m(l, null), $(l, o);
      for (let G = 0; G < U.length; G += 1)
        U[G] && U[G].m(l, null);
      $(l, a), $(l, r), B[c].m(r, null), T(p, h, z), T(p, m, z), d = !0, L || (y = H(
        r,
        "click",
        /*click_handler_2*/
        t[11]
      ), L = !0);
    },
    p(p, [z]) {
      if (/*selectedLang*/
      p[2] !== /*sourceLanguage*/
      p[1] ? A ? (A.p(we(p), z), z & /*selectedLang, sourceLanguage*/
      6 && _(A, 1)) : (A = Ue(we(p)), A.c(), _(A, 1), A.m(l, o)) : A && (K(), F(A, 1, 1, () => {
        A = null;
      }), Q()), z & /*setLanguage, Object, translations, Intl*/
      17) {
        v = V(Object.keys(
          /*translations*/
          p[0]
        ));
        let q;
        for (q = 0; q < v.length; q += 1) {
          const w = Ae(p, v, q);
          U[q] ? U[q].p(w, z) : (U[q] = Ie(w), U[q].c(), U[q].m(l, a));
        }
        for (; q < U.length; q += 1)
          U[q].d(1);
        U.length = v.length;
      }
      let G = c;
      c = C(p, z), c === G ? B[c].p(p, z) : (K(), F(B[G], 1, 1, () => {
        B[G] = null;
      }), Q(), f = B[c], f ? f.p(p, z) : (f = B[c] = E[c](p), f.c()), _(f, 1), f.m(r, null)), (!d || z & /*showAllLanguages*/
      8) && x(m, "hidden", !/*showAllLanguages*/
      p[3]);
    },
    i(p) {
      d || (_(A), _(f), d = !0);
    },
    o(p) {
      F(A), F(f), d = !1;
    },
    d(p) {
      p && (S(i), S(s), S(h), S(m)), S(e), A && A.d(), te(U, p), B[c].d(), L = !1, y();
    }
  };
}
function Vt(t, e, n) {
  let { translations: i = {} } = e, { sourceLanguage: s = "en" } = e, { onChange: l } = e, { form: o } = e, a = s, r = !1, u = !1;
  function c() {
    new google.translate.TranslateElement({ pageLanguage: s }, "google_translate_element");
  }
  function f() {
    n(8, u = !0);
  }
  function h(E) {
    let B = E.match(/googtrans\((\w+)\|(\w+)\)/);
    B && (n(2, a = B[2]), n(7, r = !0));
  }
  gt(() => {
    h(window.location.hash), window.googleTranslateLoaded = f, window.addEventListener("hashchange", () => {
      h(window.location.hash);
    });
  });
  function m(E) {
    n(2, a = E);
    let B = s !== E && !L(E);
    n(7, r = B), B ? d(E) : window.location.hash = "";
  }
  function d(E) {
    window.location.hash = `#googtrans(${s}|${E})`, location.reload();
  }
  function L(E) {
    let B = i[E];
    if (!B || o.title && !B[o.title] || o.description && !B[o.description])
      return !1;
    for (let C of o.items) {
      if (!B[C.title] || C.description && !B[C.description])
        return !1;
      if (C.choices) {
        for (let p of C.choices)
          if (!B[p])
            return !1;
      }
    }
    return !0;
  }
  let y = !1;
  const A = () => m(s), v = (E) => m(E), U = () => {
    m(s), n(3, y = !y);
  };
  return t.$$set = (E) => {
    "translations" in E && n(0, i = E.translations), "sourceLanguage" in E && n(1, s = E.sourceLanguage), "onChange" in E && n(5, l = E.onChange), "form" in E && n(6, o = E.form);
  }, t.$$.update = () => {
    t.$$.dirty & /*useGoogleTranslate, showAllLanguages, googleTranslateIsReady*/
    392 && (r || y) && u && c(), t.$$.dirty & /*onChange, selectedLang, useGoogleTranslate*/
    164 && l(a, r);
  }, [
    i,
    s,
    a,
    y,
    m,
    l,
    o,
    r,
    u,
    A,
    v,
    U
  ];
}
class pt extends ae {
  constructor(e) {
    super(), oe(
      this,
      e,
      Vt,
      Ht,
      le,
      {
        translations: 0,
        sourceLanguage: 1,
        onChange: 5,
        form: 6
      },
      Rt
    );
  }
  get translations() {
    return this.$$.ctx[0];
  }
  set translations(e) {
    this.$$set({ translations: e }), I();
  }
  get sourceLanguage() {
    return this.$$.ctx[1];
  }
  set sourceLanguage(e) {
    this.$$set({ sourceLanguage: e }), I();
  }
  get onChange() {
    return this.$$.ctx[5];
  }
  set onChange(e) {
    this.$$set({ onChange: e }), I();
  }
  get form() {
    return this.$$.ctx[6];
  }
  set form(e) {
    this.$$set({ form: e }), I();
  }
}
re(pt, { translations: {}, sourceLanguage: {}, onChange: {}, form: {} }, [], [], !0);
function Jt(t) {
  be(t, "svelte-zcceq9", ".sr-only.svelte-zcceq9.svelte-zcceq9{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}span.svelte-zcceq9.svelte-zcceq9{display:inline-block;transform:scale(0.5);transition:transform 200ms}.selected.svelte-zcceq9 span.svelte-zcceq9{transform:scale(1)}label.svelte-zcceq9:hover span.svelte-zcceq9,.unselected.svelte-zcceq9.svelte-zcceq9:has(~ label:hover span){transform:scale(1.1)}label.svelte-zcceq9:hover~label.selected.svelte-zcceq9{transform:scale(0.75)}.peer.svelte-zcceq9:focus-visible+span.svelte-zcceq9{outline:2px solid #4f46e5;outline-offset:2px}");
}
function Le(t, e, n) {
  const i = t.slice();
  return i[8] = e[n], i[10] = n, i;
}
function qe(t) {
  let e, n, i, s, l = (
    /*iconMap*/
    t[4][
      /*icon*/
      t[2]
    ] + ""
  ), o, a, r, u, c;
  return r = Tt(
    /*$$binding_groups*/
    t[7][0]
  ), {
    c() {
      e = k("label"), n = k("input"), i = j(), s = k("span"), o = X(l), a = j(), g(n, "type", "radio"), g(
        n,
        "name",
        /*name*/
        t[3]
      ), n.__value = /*i*/
      t[10] + 1, _e(n, n.__value), g(n, "class", "sr-only peer svelte-zcceq9"), g(s, "class", "text-2xl transition-transform duration-200 ease-in-out svelte-zcceq9"), g(s, "aria-hidden", "true"), g(e, "class", "cursor-pointer relative svelte-zcceq9"), x(
        e,
        "selected",
        /*value*/
        t[0] > /*i*/
        t[10]
      ), x(
        e,
        "unselected",
        /*value*/
        t[0] <= /*i*/
        t[10]
      ), r.p(n);
    },
    m(f, h) {
      T(f, e, h), $(e, n), n.checked = n.__value === /*value*/
      t[0], $(e, i), $(e, s), $(s, o), $(e, a), u || (c = [
        H(
          n,
          "change",
          /*input_change_handler*/
          t[6]
        ),
        H(
          n,
          "input",
          /*input_handler*/
          t[5]
        )
      ], u = !0);
    },
    p(f, h) {
      h & /*name*/
      8 && g(
        n,
        "name",
        /*name*/
        f[3]
      ), h & /*value, max*/
      3 && (n.checked = n.__value === /*value*/
      f[0]), h & /*icon*/
      4 && l !== (l = /*iconMap*/
      f[4][
        /*icon*/
        f[2]
      ] + "") && ie(o, l), h & /*value*/
      1 && x(
        e,
        "selected",
        /*value*/
        f[0] > /*i*/
        f[10]
      ), h & /*value*/
      1 && x(
        e,
        "unselected",
        /*value*/
        f[0] <= /*i*/
        f[10]
      );
    },
    d(f) {
      f && S(e), r.r(), u = !1, ne(c);
    }
  };
}
function Kt(t) {
  let e, n = V(Array(
    /*max*/
    t[1]
  ).fill(0)), i = [];
  for (let s = 0; s < n.length; s += 1)
    i[s] = qe(Le(t, n, s));
  return {
    c() {
      e = k("div");
      for (let s = 0; s < i.length; s += 1)
        i[s].c();
      g(e, "class", "flex space-x-1");
    },
    m(s, l) {
      T(s, e, l);
      for (let o = 0; o < i.length; o += 1)
        i[o] && i[o].m(e, null);
    },
    p(s, [l]) {
      if (l & /*value, iconMap, icon, name, max*/
      31) {
        n = V(Array(
          /*max*/
          s[1]
        ).fill(0));
        let o;
        for (o = 0; o < n.length; o += 1) {
          const a = Le(s, n, o);
          i[o] ? i[o].p(a, l) : (i[o] = qe(a), i[o].c(), i[o].m(e, null));
        }
        for (; o < i.length; o += 1)
          i[o].d(1);
        i.length = n.length;
      }
    },
    i: D,
    o: D,
    d(s) {
      s && S(e), te(i, s);
    }
  };
}
function Qt(t, e, n) {
  let { max: i = 5 } = e, { icon: s = "STAR" } = e, { value: l = 0 } = e, { name: o = "rating" } = e;
  const a = {
    STAR: "⭐",
    HEART: "❤️",
    THUMBS_UP: "👍"
  }, r = [[]];
  function u(f) {
    Ut.call(this, t, f);
  }
  function c() {
    l = this.__value, n(0, l);
  }
  return t.$$set = (f) => {
    "max" in f && n(1, i = f.max), "icon" in f && n(2, s = f.icon), "value" in f && n(0, l = f.value), "name" in f && n(3, o = f.name);
  }, [
    l,
    i,
    s,
    o,
    a,
    u,
    c,
    r
  ];
}
class _t extends ae {
  constructor(e) {
    super(), oe(this, e, Qt, Kt, le, { max: 1, icon: 2, value: 0, name: 3 }, Jt);
  }
  get max() {
    return this.$$.ctx[1];
  }
  set max(e) {
    this.$$set({ max: e }), I();
  }
  get icon() {
    return this.$$.ctx[2];
  }
  set icon(e) {
    this.$$set({ icon: e }), I();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), I();
  }
  get name() {
    return this.$$.ctx[3];
  }
  set name(e) {
    this.$$set({ name: e }), I();
  }
}
re(_t, { max: {}, icon: {}, value: {}, name: {} }, [], [], !0);
function Wt(t) {
  return t.replace("|", "\\|");
}
function Be(t, e) {
  return `${t}|${Wt(e)}`;
}
function Ne(t, e, n) {
  const i = t.slice();
  return i[14] = e[n], i;
}
function je(t, e, n) {
  const i = t.slice();
  return i[17] = e[n], i;
}
function ze(t, e, n) {
  const i = t.slice();
  return i[17] = e[n], i;
}
function Pe(t, e, n) {
  const i = t.slice();
  return i[7] = e[n], i;
}
function Oe(t, e, n) {
  const i = t.slice();
  return i[7] = e[n], i[11] = n, i;
}
function Re(t, e, n) {
  const i = t.slice();
  return i[7] = e[n], i;
}
function Me(t) {
  let e, n, i;
  return n = new J({
    props: {
      text: (
        /*item*/
        t[0].description
      ),
      lang: (
        /*lang*/
        t[2]
      ),
      translations: (
        /*translations*/
        t[3]
      )
    }
  }), {
    c() {
      e = k("p"), M(n.$$.fragment), g(e, "class", "text-sm text-muted mb-2");
    },
    m(s, l) {
      T(s, e, l), O(n, e, null), i = !0;
    },
    p(s, l) {
      const o = {};
      l & /*item*/
      1 && (o.text = /*item*/
      s[0].description), l & /*lang*/
      4 && (o.lang = /*lang*/
      s[2]), l & /*translations*/
      8 && (o.translations = /*translations*/
      s[3]), n.$set(o);
    },
    i(s) {
      i || (_(n.$$.fragment, s), i = !0);
    },
    o(s) {
      F(n.$$.fragment, s), i = !1;
    },
    d(s) {
      s && S(e), R(n);
    }
  };
}
function Xt(t) {
  let e, n, i, s, l, o, a, r = V(
    /*item*/
    t[0].columns
  ), u = [];
  for (let h = 0; h < r.length; h += 1)
    u[h] = De(ze(t, r, h));
  let c = V(
    /*item*/
    t[0].rows
  ), f = [];
  for (let h = 0; h < c.length; h += 1)
    f[h] = Ve(Ne(t, c, h));
  return {
    c() {
      e = k("table"), n = k("thead"), i = k("tr"), s = k("th"), l = j();
      for (let h = 0; h < u.length; h += 1)
        u[h].c();
      o = j(), a = k("tbody");
      for (let h = 0; h < f.length; h += 1)
        f[h].c();
      g(s, "class", "p-2 text-left border-b"), g(n, "class", "bg-backgroundLight"), g(e, "class", "w-full border border-inputBorder rounded-md shadow-sm");
    },
    m(h, m) {
      T(h, e, m), $(e, n), $(n, i), $(i, s), $(i, l);
      for (let d = 0; d < u.length; d += 1)
        u[d] && u[d].m(i, null);
      $(e, o), $(e, a);
      for (let d = 0; d < f.length; d += 1)
        f[d] && f[d].m(a, null);
    },
    p(h, m) {
      if (m & /*item*/
      1) {
        r = V(
          /*item*/
          h[0].columns
        );
        let d;
        for (d = 0; d < r.length; d += 1) {
          const L = ze(h, r, d);
          u[d] ? u[d].p(L, m) : (u[d] = De(L), u[d].c(), u[d].m(i, null));
        }
        for (; d < u.length; d += 1)
          u[d].d(1);
        u.length = r.length;
      }
      if (m & /*item, handleChange*/
      17) {
        c = V(
          /*item*/
          h[0].rows
        );
        let d;
        for (d = 0; d < c.length; d += 1) {
          const L = Ne(h, c, d);
          f[d] ? f[d].p(L, m) : (f[d] = Ve(L), f[d].c(), f[d].m(a, null));
        }
        for (; d < f.length; d += 1)
          f[d].d(1);
        f.length = c.length;
      }
    },
    i: D,
    o: D,
    d(h) {
      h && S(e), te(u, h), te(f, h);
    }
  };
}
function Yt(t) {
  let e, n, i, s;
  return {
    c() {
      e = k("input"), g(e, "type", "number"), g(e, "name", n = /*item*/
      t[0].id), g(e, "class", "w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus");
    },
    m(l, o) {
      T(l, e, o), i || (s = [
        H(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        H(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], i = !0);
    },
    p(l, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      l[0].id) && g(e, "name", n);
    },
    i: D,
    o: D,
    d(l) {
      l && S(e), i = !1, ne(s);
    }
  };
}
function Zt(t) {
  let e, n, i, s, l;
  return {
    c() {
      e = k("input"), g(e, "type", n = /*item*/
      t[0].type), g(e, "name", i = /*item*/
      t[0].id), g(e, "class", "w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus");
    },
    m(o, a) {
      T(o, e, a), s || (l = [
        H(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        H(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], s = !0);
    },
    p(o, a) {
      a & /*item*/
      1 && n !== (n = /*item*/
      o[0].type) && g(e, "type", n), a & /*item*/
      1 && i !== (i = /*item*/
      o[0].id) && g(e, "name", i);
    },
    i: D,
    o: D,
    d(o) {
      o && S(e), s = !1, ne(l);
    }
  };
}
function xt(t) {
  let e, n, i, s, l, o = V(
    /*item*/
    t[0].choices
  ), a = [];
  for (let r = 0; r < o.length; r += 1)
    a[r] = Je(Pe(t, o, r));
  return {
    c() {
      e = k("select"), n = k("option"), n.textContent = "Select an option";
      for (let r = 0; r < a.length; r += 1)
        a[r].c();
      n.__value = "", _e(n, n.__value), g(e, "name", i = /*item*/
      t[0].id), g(e, "class", "w-full p-2 border border-inputBorder rounded bg-input text-inputText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus");
    },
    m(r, u) {
      T(r, e, u), $(e, n);
      for (let c = 0; c < a.length; c += 1)
        a[c] && a[c].m(e, null);
      s || (l = H(
        e,
        "change",
        /*handleChange*/
        t[4]
      ), s = !0);
    },
    p(r, u) {
      if (u & /*item*/
      1) {
        o = V(
          /*item*/
          r[0].choices
        );
        let c;
        for (c = 0; c < o.length; c += 1) {
          const f = Pe(r, o, c);
          a[c] ? a[c].p(f, u) : (a[c] = Je(f), a[c].c(), a[c].m(e, null));
        }
        for (; c < a.length; c += 1)
          a[c].d(1);
        a.length = o.length;
      }
      u & /*item*/
      1 && i !== (i = /*item*/
      r[0].id) && g(e, "name", i);
    },
    i: D,
    o: D,
    d(r) {
      r && S(e), te(a, r), s = !1, l();
    }
  };
}
function en(t) {
  let e, n, i, s, l, o, a;
  return {
    c() {
      e = k("input"), g(e, "type", "range"), g(e, "name", n = /*item*/
      t[0].id), g(e, "min", i = /*item*/
      t[0].min), g(e, "max", s = /*item*/
      t[0].max), g(e, "step", l = /*item*/
      t[0].step), g(e, "class", "w-full p-2 border border-inputBorder rounded bg-input text-inputText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus");
    },
    m(r, u) {
      T(r, e, u), o || (a = [
        H(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        H(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], o = !0);
    },
    p(r, u) {
      u & /*item*/
      1 && n !== (n = /*item*/
      r[0].id) && g(e, "name", n), u & /*item*/
      1 && i !== (i = /*item*/
      r[0].min) && g(e, "min", i), u & /*item*/
      1 && s !== (s = /*item*/
      r[0].max) && g(e, "max", s), u & /*item*/
      1 && l !== (l = /*item*/
      r[0].step) && g(e, "step", l);
    },
    i: D,
    o: D,
    d(r) {
      r && S(e), o = !1, ne(a);
    }
  };
}
function tn(t) {
  let e, n;
  return e = new _t({
    props: {
      name: (
        /*item*/
        t[0].id
      ),
      icon: (
        /*item*/
        t[0].icon
      ),
      max: (
        /*item*/
        t[0].max
      )
    }
  }), e.$on(
    "input",
    /*handleChange*/
    t[4]
  ), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*item*/
      1 && (l.name = /*item*/
      i[0].id), s & /*item*/
      1 && (l.icon = /*item*/
      i[0].icon), s & /*item*/
      1 && (l.max = /*item*/
      i[0].max), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function nn(t) {
  let e, n, i, s;
  return {
    c() {
      e = k("textarea"), g(e, "name", n = /*item*/
      t[0].id), g(e, "class", "w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus");
    },
    m(l, o) {
      T(l, e, o), i || (s = H(
        e,
        "input",
        /*handleChange*/
        t[4]
      ), i = !0);
    },
    p(l, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      l[0].id) && g(e, "name", n);
    },
    i: D,
    o: D,
    d(l) {
      l && S(e), i = !1, s();
    }
  };
}
function sn(t) {
  let e, n, i, s;
  return {
    c() {
      e = k("input"), g(e, "type", "text"), g(e, "name", n = /*item*/
      t[0].id), g(e, "class", "w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus");
    },
    m(l, o) {
      T(l, e, o), i || (s = H(
        e,
        "input",
        /*handleChange*/
        t[4]
      ), i = !0);
    },
    p(l, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      l[0].id) && g(e, "name", n);
    },
    i: D,
    o: D,
    d(l) {
      l && S(e), i = !1, s();
    }
  };
}
function ln(t) {
  let e, n, i = V(
    /*item*/
    t[0].choices
  ), s = [];
  for (let o = 0; o < i.length; o += 1)
    s[o] = Ke(Oe(t, i, o));
  const l = (o) => F(s[o], 1, 1, () => {
    s[o] = null;
  });
  return {
    c() {
      e = k("div");
      for (let o = 0; o < s.length; o += 1)
        s[o].c();
      g(e, "class", "space-y-2");
    },
    m(o, a) {
      T(o, e, a);
      for (let r = 0; r < s.length; r += 1)
        s[r] && s[r].m(e, null);
      n = !0;
    },
    p(o, a) {
      if (a & /*item, lang, translations, handleChange, setChoice*/
      31) {
        i = V(
          /*item*/
          o[0].choices
        );
        let r;
        for (r = 0; r < i.length; r += 1) {
          const u = Oe(o, i, r);
          s[r] ? (s[r].p(u, a), _(s[r], 1)) : (s[r] = Ke(u), s[r].c(), _(s[r], 1), s[r].m(e, null));
        }
        for (K(), r = i.length; r < s.length; r += 1)
          l(r);
        Q();
      }
    },
    i(o) {
      if (!n) {
        for (let a = 0; a < i.length; a += 1)
          _(s[a]);
        n = !0;
      }
    },
    o(o) {
      s = s.filter(Boolean);
      for (let a = 0; a < s.length; a += 1)
        F(s[a]);
      n = !1;
    },
    d(o) {
      o && S(e), te(s, o);
    }
  };
}
function on(t) {
  let e, n, i = V(
    /*item*/
    t[0].choices
  ), s = [];
  for (let o = 0; o < i.length; o += 1)
    s[o] = Qe(Re(t, i, o));
  const l = (o) => F(s[o], 1, 1, () => {
    s[o] = null;
  });
  return {
    c() {
      e = k("div");
      for (let o = 0; o < s.length; o += 1)
        s[o].c();
      g(e, "class", "space-y-2");
    },
    m(o, a) {
      T(o, e, a);
      for (let r = 0; r < s.length; r += 1)
        s[r] && s[r].m(e, null);
      n = !0;
    },
    p(o, a) {
      if (a & /*item, lang, translations, handleChange*/
      29) {
        i = V(
          /*item*/
          o[0].choices
        );
        let r;
        for (r = 0; r < i.length; r += 1) {
          const u = Re(o, i, r);
          s[r] ? (s[r].p(u, a), _(s[r], 1)) : (s[r] = Qe(u), s[r].c(), _(s[r], 1), s[r].m(e, null));
        }
        for (K(), r = i.length; r < s.length; r += 1)
          l(r);
        Q();
      }
    },
    i(o) {
      if (!n) {
        for (let a = 0; a < i.length; a += 1)
          _(s[a]);
        n = !0;
      }
    },
    o(o) {
      s = s.filter(Boolean);
      for (let a = 0; a < s.length; a += 1)
        F(s[a]);
      n = !1;
    },
    d(o) {
      o && S(e), te(s, o);
    }
  };
}
function De(t) {
  let e, n = (
    /*col*/
    t[17] + ""
  ), i;
  return {
    c() {
      e = k("th"), i = X(n), g(e, "class", "p-2 text-center border-b text-text");
    },
    m(s, l) {
      T(s, e, l), $(e, i);
    },
    p(s, l) {
      l & /*item*/
      1 && n !== (n = /*col*/
      s[17] + "") && ie(i, n);
    },
    d(s) {
      s && S(e);
    }
  };
}
function He(t) {
  let e, n, i, s, l, o, a, r;
  return {
    c() {
      e = k("td"), n = k("label"), i = k("input"), g(i, "type", s = /*item*/
      t[0].type === "grid" ? "radio" : "checkbox"), g(i, "name", l = Be(
        /*item*/
        t[0].id,
        /*row*/
        t[14]
      )), i.value = o = /*col*/
      t[17], g(i, "class", "h-5 w-5 text-primary focus-visible:ring focus-visible:ring-inputFocus"), g(n, "class", "flex items-center justify-center cursor-pointer"), g(e, "class", "p-2 text-center");
    },
    m(u, c) {
      T(u, e, c), $(e, n), $(n, i), a || (r = H(
        i,
        "change",
        /*handleChange*/
        t[4]
      ), a = !0);
    },
    p(u, c) {
      c & /*item*/
      1 && s !== (s = /*item*/
      u[0].type === "grid" ? "radio" : "checkbox") && g(i, "type", s), c & /*item*/
      1 && l !== (l = Be(
        /*item*/
        u[0].id,
        /*row*/
        u[14]
      )) && g(i, "name", l), c & /*item*/
      1 && o !== (o = /*col*/
      u[17]) && i.value !== o && (i.value = o);
    },
    d(u) {
      u && S(e), a = !1, r();
    }
  };
}
function Ve(t) {
  let e, n, i = (
    /*row*/
    t[14] + ""
  ), s, l, o, a = V(
    /*item*/
    t[0].columns
  ), r = [];
  for (let u = 0; u < a.length; u += 1)
    r[u] = He(je(t, a, u));
  return {
    c() {
      e = k("tr"), n = k("th"), s = X(i), l = j();
      for (let u = 0; u < r.length; u += 1)
        r[u].c();
      o = j(), g(n, "class", "p-2 text-left font-medium text-text"), g(e, "class", "border-b hover:bg-hoverBackground");
    },
    m(u, c) {
      T(u, e, c), $(e, n), $(n, s), $(e, l);
      for (let f = 0; f < r.length; f += 1)
        r[f] && r[f].m(e, null);
      $(e, o);
    },
    p(u, c) {
      if (c & /*item*/
      1 && i !== (i = /*row*/
      u[14] + "") && ie(s, i), c & /*item, handleChange*/
      17) {
        a = V(
          /*item*/
          u[0].columns
        );
        let f;
        for (f = 0; f < a.length; f += 1) {
          const h = je(u, a, f);
          r[f] ? r[f].p(h, c) : (r[f] = He(h), r[f].c(), r[f].m(e, o));
        }
        for (; f < r.length; f += 1)
          r[f].d(1);
        r.length = a.length;
      }
    },
    d(u) {
      u && S(e), te(r, u);
    }
  };
}
function Je(t) {
  let e, n = (
    /*choice*/
    t[7] + ""
  ), i, s;
  return {
    c() {
      e = k("option"), i = X(n), e.__value = s = /*choice*/
      t[7], _e(e, e.__value);
    },
    m(l, o) {
      T(l, e, o), $(e, i);
    },
    p(l, o) {
      o & /*item*/
      1 && n !== (n = /*choice*/
      l[7] + "") && ie(i, n), o & /*item*/
      1 && s !== (s = /*choice*/
      l[7]) && (e.__value = s, _e(e, e.__value));
    },
    d(l) {
      l && S(e);
    }
  };
}
function Ke(t) {
  let e, n, i, s, l, o, a, r, u, c, f;
  function h(...m) {
    return (
      /*change_handler*/
      t[6](
        /*idx*/
        t[11],
        ...m
      )
    );
  }
  return a = new J({
    props: {
      text: (
        /*choice*/
        t[7]
      ),
      lang: (
        /*lang*/
        t[2]
      ),
      translations: (
        /*translations*/
        t[3]
      )
    }
  }), {
    c() {
      e = k("label"), n = k("input"), l = j(), o = k("span"), M(a.$$.fragment), r = j(), g(n, "type", "radio"), g(n, "name", i = /*item*/
      t[0].id), n.value = s = /*choice*/
      t[7], g(n, "class", "h-5 w-5 text-primary focus-visible:ring focus-visible:ring-inputFocus"), g(o, "class", "text-text"), g(e, "class", "flex items-center space-x-2");
    },
    m(m, d) {
      T(m, e, d), $(e, n), $(e, l), $(e, o), O(a, o, null), $(e, r), u = !0, c || (f = H(n, "change", h), c = !0);
    },
    p(m, d) {
      t = m, (!u || d & /*item*/
      1 && i !== (i = /*item*/
      t[0].id)) && g(n, "name", i), (!u || d & /*item*/
      1 && s !== (s = /*choice*/
      t[7])) && (n.value = s);
      const L = {};
      d & /*item*/
      1 && (L.text = /*choice*/
      t[7]), d & /*lang*/
      4 && (L.lang = /*lang*/
      t[2]), d & /*translations*/
      8 && (L.translations = /*translations*/
      t[3]), a.$set(L);
    },
    i(m) {
      u || (_(a.$$.fragment, m), u = !0);
    },
    o(m) {
      F(a.$$.fragment, m), u = !1;
    },
    d(m) {
      m && S(e), R(a), c = !1, f();
    }
  };
}
function Qe(t) {
  let e, n, i, s, l, o, a, r, u, c, f;
  return a = new J({
    props: {
      text: (
        /*choice*/
        t[7]
      ),
      lang: (
        /*lang*/
        t[2]
      ),
      translations: (
        /*translations*/
        t[3]
      )
    }
  }), {
    c() {
      e = k("label"), n = k("input"), l = j(), o = k("span"), M(a.$$.fragment), r = j(), g(n, "type", "checkbox"), g(n, "name", i = /*item*/
      t[0].id), n.value = s = /*choice*/
      t[7], g(n, "class", "h-5 w-5 text-primary focus-visible:ring focus-visible:ring-inputFocus"), g(o, "class", "text-text"), g(e, "class", "flex items-center space-x-2");
    },
    m(h, m) {
      T(h, e, m), $(e, n), $(e, l), $(e, o), O(a, o, null), $(e, r), u = !0, c || (f = H(
        n,
        "change",
        /*handleChange*/
        t[4]
      ), c = !0);
    },
    p(h, m) {
      (!u || m & /*item*/
      1 && i !== (i = /*item*/
      h[0].id)) && g(n, "name", i), (!u || m & /*item*/
      1 && s !== (s = /*choice*/
      h[7])) && (n.value = s);
      const d = {};
      m & /*item*/
      1 && (d.text = /*choice*/
      h[7]), m & /*lang*/
      4 && (d.lang = /*lang*/
      h[2]), m & /*translations*/
      8 && (d.translations = /*translations*/
      h[3]), a.$set(d);
    },
    i(h) {
      u || (_(a.$$.fragment, h), u = !0);
    },
    o(h) {
      F(a.$$.fragment, h), u = !1;
    },
    d(h) {
      h && S(e), R(a), c = !1, f();
    }
  };
}
function rn(t) {
  let e, n, i, s, l, o, a, r;
  i = new J({
    props: {
      text: (
        /*item*/
        t[0].title
      ),
      lang: (
        /*lang*/
        t[2]
      ),
      translations: (
        /*translations*/
        t[3]
      )
    }
  });
  let u = (
    /*item*/
    t[0].description && Me(t)
  );
  const c = [
    on,
    ln,
    sn,
    nn,
    tn,
    en,
    xt,
    Zt,
    Yt,
    Xt
  ], f = [];
  function h(m, d) {
    return (
      /*item*/
      m[0].type === "checkbox" ? 0 : (
        /*item*/
        m[0].type === "multipleChoice" ? 1 : (
          /*item*/
          m[0].type === "text" ? 2 : (
            /*item*/
            m[0].type === "paragraph" ? 3 : (
              /*item*/
              m[0].type == "rating" ? 4 : (
                /*item*/
                m[0].type == "scale" ? 5 : (
                  /*item*/
                  m[0].type == "list" ? 6 : (
                    /*item*/
                    m[0].type == "date" || /*item*/
                    m[0].type == "time" || /*item*/
                    m[0].type == "datetime" ? 7 : (
                      /*item*/
                      m[0].type == "duration" ? 8 : (
                        /*item*/
                        m[0].type === "grid" || /*item*/
                        m[0].type === "checkboxGrid" ? 9 : -1
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }
  return ~(o = h(t)) && (a = f[o] = c[o](t)), {
    c() {
      e = k("div"), n = k("h3"), M(i.$$.fragment), s = j(), u && u.c(), l = j(), a && a.c(), g(n, "class", "text-lg font-semibold text-text"), g(e, "class", "mb-6");
    },
    m(m, d) {
      T(m, e, d), $(e, n), O(i, n, null), $(e, s), u && u.m(e, null), $(e, l), ~o && f[o].m(e, null), r = !0;
    },
    p(m, [d]) {
      const L = {};
      d & /*item*/
      1 && (L.text = /*item*/
      m[0].title), d & /*lang*/
      4 && (L.lang = /*lang*/
      m[2]), d & /*translations*/
      8 && (L.translations = /*translations*/
      m[3]), i.$set(L), /*item*/
      m[0].description ? u ? (u.p(m, d), d & /*item*/
      1 && _(u, 1)) : (u = Me(m), u.c(), _(u, 1), u.m(e, l)) : u && (K(), F(u, 1, 1, () => {
        u = null;
      }), Q());
      let y = o;
      o = h(m), o === y ? ~o && f[o].p(m, d) : (a && (K(), F(f[y], 1, 1, () => {
        f[y] = null;
      }), Q()), ~o ? (a = f[o], a ? a.p(m, d) : (a = f[o] = c[o](m), a.c()), _(a, 1), a.m(e, null)) : a = null);
    },
    i(m) {
      r || (_(i.$$.fragment, m), _(u), _(a), r = !0);
    },
    o(m) {
      F(i.$$.fragment, m), F(u), F(a), r = !1;
    },
    d(m) {
      m && S(e), R(i), u && u.d(), ~o && f[o].d();
    }
  };
}
function an(t, e, n) {
  let { item: i } = e, { onInputChange: s } = e, { setChoice: l } = e, { lang: o = "en" } = e, { translations: a = {} } = e;
  function r(c) {
    s(i.id, c.target.value);
  }
  const u = (c, f) => {
    r(f), l(i, c);
  };
  return t.$$set = (c) => {
    "item" in c && n(0, i = c.item), "onInputChange" in c && n(5, s = c.onInputChange), "setChoice" in c && n(1, l = c.setChoice), "lang" in c && n(2, o = c.lang), "translations" in c && n(3, a = c.translations);
  }, [
    i,
    l,
    o,
    a,
    r,
    s,
    u
  ];
}
class bt extends ae {
  constructor(e) {
    super(), oe(this, e, an, rn, le, {
      item: 0,
      onInputChange: 5,
      setChoice: 1,
      lang: 2,
      translations: 3
    });
  }
  get item() {
    return this.$$.ctx[0];
  }
  set item(e) {
    this.$$set({ item: e }), I();
  }
  get onInputChange() {
    return this.$$.ctx[5];
  }
  set onInputChange(e) {
    this.$$set({ onInputChange: e }), I();
  }
  get setChoice() {
    return this.$$.ctx[1];
  }
  set setChoice(e) {
    this.$$set({ setChoice: e }), I();
  }
  get lang() {
    return this.$$.ctx[2];
  }
  set lang(e) {
    this.$$set({ lang: e }), I();
  }
  get translations() {
    return this.$$.ctx[3];
  }
  set translations(e) {
    this.$$set({ translations: e }), I();
  }
}
re(bt, { item: {}, onInputChange: {}, setChoice: {}, lang: {}, translations: {} }, [], [], !0);
function We(t, e, n) {
  const i = t.slice();
  return i[15] = e[n], i;
}
function Xe(t) {
  let e, n = (
    /*page*/
    t[0].title + ""
  ), i;
  return {
    c() {
      e = k("h2"), i = X(n), g(e, "class", "text-2xl font-semibold text-text");
    },
    m(s, l) {
      T(s, e, l), $(e, i);
    },
    p(s, l) {
      l & /*page*/
      1 && n !== (n = /*page*/
      s[0].title + "") && ie(i, n);
    },
    d(s) {
      s && S(e);
    }
  };
}
function Ye(t) {
  let e, n, i;
  return n = new J({
    props: {
      text: (
        /*page*/
        t[0].description
      ),
      lang: (
        /*lang*/
        t[5]
      ),
      translations: (
        /*translations*/
        t[6]
      )
    }
  }), {
    c() {
      e = k("p"), M(n.$$.fragment), g(e, "class", "text-muted mb-4");
    },
    m(s, l) {
      T(s, e, l), O(n, e, null), i = !0;
    },
    p(s, l) {
      const o = {};
      l & /*page*/
      1 && (o.text = /*page*/
      s[0].description), l & /*lang*/
      32 && (o.lang = /*lang*/
      s[5]), l & /*translations*/
      64 && (o.translations = /*translations*/
      s[6]), n.$set(o);
    },
    i(s) {
      i || (_(n.$$.fragment, s), i = !0);
    },
    o(s) {
      F(n.$$.fragment, s), i = !1;
    },
    d(s) {
      s && S(e), R(n);
    }
  };
}
function Ze(t) {
  let e, n = (
    /*formErrors*/
    t[8][
      /*item*/
      t[15].id
    ] + ""
  ), i, s;
  return {
    c() {
      e = k("p"), i = X(n), s = j(), g(e, "class", "text-error bg-errorBg border border-error p-2 rounded-md text-sm mt-2");
    },
    m(l, o) {
      T(l, e, o), $(e, i), $(e, s);
    },
    p(l, o) {
      o & /*formErrors, page*/
      257 && n !== (n = /*formErrors*/
      l[8][
        /*item*/
        l[15].id
      ] + "") && ie(i, n);
    },
    d(l) {
      l && S(e);
    }
  };
}
function xe(t) {
  let e, n, i, s;
  e = new bt({
    props: {
      item: (
        /*item*/
        t[15]
      ),
      onInputChange: (
        /*onInputChange*/
        t[10]
      ),
      setChoice: (
        /*setChoice*/
        t[9]
      ),
      lang: (
        /*lang*/
        t[5]
      ),
      translations: (
        /*translations*/
        t[6]
      )
    }
  });
  let l = (
    /*formErrors*/
    t[8][
      /*item*/
      t[15].id
    ] && Ze(t)
  );
  return {
    c() {
      M(e.$$.fragment), n = j(), l && l.c(), i = $e();
    },
    m(o, a) {
      O(e, o, a), T(o, n, a), l && l.m(o, a), T(o, i, a), s = !0;
    },
    p(o, a) {
      const r = {};
      a & /*page*/
      1 && (r.item = /*item*/
      o[15]), a & /*lang*/
      32 && (r.lang = /*lang*/
      o[5]), a & /*translations*/
      64 && (r.translations = /*translations*/
      o[6]), e.$set(r), /*formErrors*/
      o[8][
        /*item*/
        o[15].id
      ] ? l ? l.p(o, a) : (l = Ze(o), l.c(), l.m(i.parentNode, i)) : l && (l.d(1), l = null);
    },
    i(o) {
      s || (_(e.$$.fragment, o), s = !0);
    },
    o(o) {
      F(e.$$.fragment, o), s = !1;
    },
    d(o) {
      o && (S(n), S(i)), R(e, o), l && l.d(o);
    }
  };
}
function et(t) {
  let e, n, i, s, l;
  return n = new J({
    props: {
      text: "Back",
      lang: (
        /*lang*/
        t[5]
      ),
      translations: (
        /*translations*/
        t[6]
      )
    }
  }), {
    c() {
      e = k("button"), M(n.$$.fragment), g(e, "class", "px-4 py-2 bg-muted text-text rounded-md hover:bg-mutedHover transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus");
    },
    m(o, a) {
      T(o, e, a), O(n, e, null), i = !0, s || (l = H(e, "click", mt(function() {
        Se(
          /*onBack*/
          t[4]
        ) && t[4].apply(this, arguments);
      })), s = !0);
    },
    p(o, a) {
      t = o;
      const r = {};
      a & /*lang*/
      32 && (r.lang = /*lang*/
      t[5]), a & /*translations*/
      64 && (r.translations = /*translations*/
      t[6]), n.$set(r);
    },
    i(o) {
      i || (_(n.$$.fragment, o), i = !0);
    },
    o(o) {
      F(n.$$.fragment, o), i = !1;
    },
    d(o) {
      o && S(e), R(n), s = !1, l();
    }
  };
}
function un(t) {
  let e, n;
  return e = new J({
    props: {
      text: "Next",
      lang: (
        /*lang*/
        t[5]
      ),
      translations: (
        /*translations*/
        t[6]
      )
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*lang*/
      32 && (l.lang = /*lang*/
      i[5]), s & /*translations*/
      64 && (l.translations = /*translations*/
      i[6]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function fn(t) {
  let e, n;
  return e = new J({
    props: {
      text: "Submit",
      lang: (
        /*lang*/
        t[5]
      ),
      translations: (
        /*translations*/
        t[6]
      )
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*lang*/
      32 && (l.lang = /*lang*/
      i[5]), s & /*translations*/
      64 && (l.translations = /*translations*/
      i[6]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function cn(t) {
  let e, n;
  return e = new J({
    props: {
      text: "Submitting",
      lang: (
        /*lang*/
        t[5]
      ),
      translations: (
        /*translations*/
        t[6]
      )
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*lang*/
      32 && (l.lang = /*lang*/
      i[5]), s & /*translations*/
      64 && (l.translations = /*translations*/
      i[6]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function mn(t) {
  let e, n, i, s, l, o, a, r, u, c, f, h, m = (
    /*page*/
    t[0].title && Xe(t)
  ), d = (
    /*page*/
    t[0].description && Ye(t)
  ), L = V(
    /*page*/
    t[0].items
  ), y = [];
  for (let C = 0; C < L.length; C += 1)
    y[C] = xe(We(t, L, C));
  const A = (C) => F(y[C], 1, 1, () => {
    y[C] = null;
  });
  let v = !/*isFirst*/
  t[2] && et(t);
  const U = [cn, fn, un], E = [];
  function B(C, p) {
    return (
      /*isSubmitting*/
      C[3] ? 0 : (
        /*nextPageId*/
        C[7] === "submit" ? 1 : 2
      )
    );
  }
  return r = B(t), u = E[r] = U[r](t), {
    c() {
      e = k("div"), m && m.c(), n = j(), d && d.c(), i = j();
      for (let C = 0; C < y.length; C += 1)
        y[C].c();
      s = j(), l = k("div"), v && v.c(), o = j(), a = k("button"), u.c(), g(a, "class", "px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"), a.disabled = /*isSubmitting*/
      t[3], g(l, "class", "flex justify-between mt-6"), g(e, "class", "max-w-2xl mx-auto p-6 bg-background text-text shadow-md rounded-md transition-opacity duration-300 ease-in-out"), x(e, "hidden", !/*isActive*/
      t[1]);
    },
    m(C, p) {
      T(C, e, p), m && m.m(e, null), $(e, n), d && d.m(e, null), $(e, i);
      for (let z = 0; z < y.length; z += 1)
        y[z] && y[z].m(e, null);
      $(e, s), $(e, l), v && v.m(l, null), $(l, o), $(l, a), E[r].m(a, null), c = !0, f || (h = H(a, "click", mt(
        /*handleNext*/
        t[11]
      )), f = !0);
    },
    p(C, [p]) {
      if (/*page*/
      C[0].title ? m ? m.p(C, p) : (m = Xe(C), m.c(), m.m(e, n)) : m && (m.d(1), m = null), /*page*/
      C[0].description ? d ? (d.p(C, p), p & /*page*/
      1 && _(d, 1)) : (d = Ye(C), d.c(), _(d, 1), d.m(e, i)) : d && (K(), F(d, 1, 1, () => {
        d = null;
      }), Q()), p & /*formErrors, page, onInputChange, setChoice, lang, translations*/
      1889) {
        L = V(
          /*page*/
          C[0].items
        );
        let G;
        for (G = 0; G < L.length; G += 1) {
          const q = We(C, L, G);
          y[G] ? (y[G].p(q, p), _(y[G], 1)) : (y[G] = xe(q), y[G].c(), _(y[G], 1), y[G].m(e, s));
        }
        for (K(), G = L.length; G < y.length; G += 1)
          A(G);
        Q();
      }
      /*isFirst*/
      C[2] ? v && (K(), F(v, 1, 1, () => {
        v = null;
      }), Q()) : v ? (v.p(C, p), p & /*isFirst*/
      4 && _(v, 1)) : (v = et(C), v.c(), _(v, 1), v.m(l, o));
      let z = r;
      r = B(C), r === z ? E[r].p(C, p) : (K(), F(E[z], 1, 1, () => {
        E[z] = null;
      }), Q(), u = E[r], u ? u.p(C, p) : (u = E[r] = U[r](C), u.c()), _(u, 1), u.m(a, null)), (!c || p & /*isSubmitting*/
      8) && (a.disabled = /*isSubmitting*/
      C[3]), (!c || p & /*isActive*/
      2) && x(e, "hidden", !/*isActive*/
      C[1]);
    },
    i(C) {
      if (!c) {
        _(d);
        for (let p = 0; p < L.length; p += 1)
          _(y[p]);
        _(v), _(u), c = !0;
      }
    },
    o(C) {
      F(d), y = y.filter(Boolean);
      for (let p = 0; p < y.length; p += 1)
        F(y[p]);
      F(v), F(u), c = !1;
    },
    d(C) {
      C && S(e), m && m.d(), d && d.d(), te(y, C), v && v.d(), E[r].d(), f = !1, h();
    }
  };
}
function gn(t, e, n) {
  let { page: i } = e, { isActive: s = !1 } = e, { isFirst: l = !1 } = e, { isSubmitting: o = !1 } = e, { onBack: a } = e, { onGoto: r } = e, { lang: u = "en" } = e, { translations: c = {} } = e, f = i.defaultNextPage, h = {}, m = {};
  function d(v, U) {
    v.choicesNavigation && v.choicesNavigation[U] && n(7, f = v.choicesNavigation[U].type === "page" ? v.choicesNavigation[U].id : "submit");
  }
  function L(v, U) {
    h[v] = U, n(8, m[v] = "", m);
  }
  function y() {
    let v = !0;
    n(8, m = {});
    for (let U of i.items)
      U.required && (!h[U.id] || h[U.id].length === 0) && (n(8, m[U.id] = dt("This field is required.", c, u), m), v = !1);
    return v;
  }
  function A() {
    if (!y()) {
      console.log("Validation failed", m);
      return;
    }
    r(f);
  }
  return t.$$set = (v) => {
    "page" in v && n(0, i = v.page), "isActive" in v && n(1, s = v.isActive), "isFirst" in v && n(2, l = v.isFirst), "isSubmitting" in v && n(3, o = v.isSubmitting), "onBack" in v && n(4, a = v.onBack), "onGoto" in v && n(12, r = v.onGoto), "lang" in v && n(5, u = v.lang), "translations" in v && n(6, c = v.translations);
  }, [
    i,
    s,
    l,
    o,
    a,
    u,
    c,
    f,
    m,
    d,
    L,
    A,
    r
  ];
}
class $t extends ae {
  constructor(e) {
    super(), oe(this, e, gn, mn, le, {
      page: 0,
      isActive: 1,
      isFirst: 2,
      isSubmitting: 3,
      onBack: 4,
      onGoto: 12,
      lang: 5,
      translations: 6
    });
  }
  get page() {
    return this.$$.ctx[0];
  }
  set page(e) {
    this.$$set({ page: e }), I();
  }
  get isActive() {
    return this.$$.ctx[1];
  }
  set isActive(e) {
    this.$$set({ isActive: e }), I();
  }
  get isFirst() {
    return this.$$.ctx[2];
  }
  set isFirst(e) {
    this.$$set({ isFirst: e }), I();
  }
  get isSubmitting() {
    return this.$$.ctx[3];
  }
  set isSubmitting(e) {
    this.$$set({ isSubmitting: e }), I();
  }
  get onBack() {
    return this.$$.ctx[4];
  }
  set onBack(e) {
    this.$$set({ onBack: e }), I();
  }
  get onGoto() {
    return this.$$.ctx[12];
  }
  set onGoto(e) {
    this.$$set({ onGoto: e }), I();
  }
  get lang() {
    return this.$$.ctx[5];
  }
  set lang(e) {
    this.$$set({ lang: e }), I();
  }
  get translations() {
    return this.$$.ctx[6];
  }
  set translations(e) {
    this.$$set({ translations: e }), I();
  }
}
re($t, { page: {}, isActive: { type: "Boolean" }, isFirst: { type: "Boolean" }, isSubmitting: { type: "Boolean" }, onBack: {}, onGoto: {}, lang: {}, translations: {} }, [], [], !0);
function hn(t) {
  be(t, "svelte-1spzav4", ':host,:root{--primary-color:#2563eb;--secondary-color:#9333ea;--success-color:#16a34a;--error-color:#dc2626;--primary-dark:color-mix(in srgb, var(--primary-color) 80%, black 20%);--secondary-dark:color-mix(in srgb, var(--secondary-color) 80%, black 20%);--bg-color:#ffffff;--text-color:#1f2937;--muted-text:color-mix(in srgb, var(--text-color) 70%, white 30%);--input-bg-color:#f9fafb;--input-text-color:#111827;--input-border-color:#d1d5db;--input-focus-color:#2563eb;--input-placeholder-color:#9ca3af;--font-family:"Inter", sans-serif;--input-font:"Inter", sans-serif}[data-theme="dark"]{--bg-color:#1f2937;--text-color:#e5e7eb;--muted-text:color-mix(in srgb, var(--text-color) 70%, black 30%);--input-bg-color:#374151;--input-text-color:#f3f4f6;--input-border-color:#4b5563;--input-focus-color:#60a5fa}[data-theme="transparent"]{--bg-color:transparent;--text-color:inherit}');
}
function tt(t, e, n) {
  const i = t.slice();
  return i[26] = e[n], i;
}
function nt(t) {
  let e, n, i, s, l, o, a, r, u, c, f, h, m, d, L, y, A, v, U, E, B;
  e = new pt({
    props: {
      translations: (
        /*translations*/
        t[2]
      ),
      form: (
        /*form*/
        t[1]
      ),
      onChange: (
        /*onLanguageChange*/
        t[17]
      )
    }
  }), l = new J({
    props: {
      text: (
        /*form*/
        t[1].title
      ),
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      )
    }
  }), u = new J({
    props: {
      text: "Complete in Google Forms",
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      )
    }
  });
  let C = V(
    /*pages*/
    t[6]
  ), p = [];
  for (let w = 0; w < C.length; w += 1)
    p[w] = it(tt(t, C, w));
  const z = (w) => F(p[w], 1, 1, () => {
    p[w] = null;
  });
  A = new J({
    props: {
      text: "Submit",
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      )
    }
  });
  let G = (
    /*submissionError*/
    t[10] && st(t)
  ), q = (
    /*submitted*/
    t[9] && lt(t)
  );
  return {
    c() {
      M(e.$$.fragment), n = j(), i = k("form"), s = k("h1"), M(l.$$.fragment), o = j(), a = k("a"), r = X("("), M(u.$$.fragment), c = X(")"), h = j(), m = k("div");
      for (let w = 0; w < p.length; w += 1)
        p[w].c();
      d = j(), L = k("div"), y = k("button"), M(A.$$.fragment), v = j(), G && G.c(), U = j(), q && q.c(), E = $e(), g(s, "class", "text-3xl font-semibold text-primary"), g(a, "class", "text-link hover:underline text-sm"), g(a, "href", f = /*form*/
      t[1].publishedUrl), g(m, "class", "space-y-6"), g(y, "type", "submit"), g(y, "class", "px-6 py-2 text-white bg-primary rounded hover:bg-primaryDark transition focus:outline-none focus:ring-2 focus:ring-inputFocus"), g(L, "class", "flex justify-end"), g(i, "class", "bg-background text-text font-ui p-6 rounded-md shadow-md space-y-6"), x(
        i,
        "hidden",
        /*submitted*/
        t[9]
      );
    },
    m(w, b) {
      O(e, w, b), T(w, n, b), T(w, i, b), $(i, s), O(l, s, null), $(i, o), $(i, a), $(a, r), O(u, a, null), $(a, c), $(i, h), $(i, m);
      for (let P = 0; P < p.length; P += 1)
        p[P] && p[P].m(m, null);
      $(i, d), $(i, L), $(L, y), O(A, y, null), t[21](i), T(w, v, b), G && G.m(w, b), T(w, U, b), q && q.m(w, b), T(w, E, b), B = !0;
    },
    p(w, b) {
      const P = {};
      b & /*translations*/
      4 && (P.translations = /*translations*/
      w[2]), b & /*form*/
      2 && (P.form = /*form*/
      w[1]), e.$set(P);
      const W = {};
      b & /*form*/
      2 && (W.text = /*form*/
      w[1].title), b & /*lang*/
      1 && (W.lang = /*lang*/
      w[0]), b & /*translations*/
      4 && (W.translations = /*translations*/
      w[2]), l.$set(W);
      const Y = {};
      if (b & /*lang*/
      1 && (Y.lang = /*lang*/
      w[0]), b & /*translations*/
      4 && (Y.translations = /*translations*/
      w[2]), u.$set(Y), (!B || b & /*form*/
      2 && f !== (f = /*form*/
      w[1].publishedUrl)) && g(a, "href", f), b & /*pageHistory, currentPageId, pages, submitting, lang, translations, goBack, nextPageOrSubmit*/
      53701) {
        C = V(
          /*pages*/
          w[6]
        );
        let N;
        for (N = 0; N < C.length; N += 1) {
          const Te = tt(w, C, N);
          p[N] ? (p[N].p(Te, b), _(p[N], 1)) : (p[N] = it(Te), p[N].c(), _(p[N], 1), p[N].m(m, null));
        }
        for (K(), N = C.length; N < p.length; N += 1)
          z(N);
        Q();
      }
      const ee = {};
      b & /*lang*/
      1 && (ee.lang = /*lang*/
      w[0]), b & /*translations*/
      4 && (ee.translations = /*translations*/
      w[2]), A.$set(ee), (!B || b & /*submitted*/
      512) && x(
        i,
        "hidden",
        /*submitted*/
        w[9]
      ), /*submissionError*/
      w[10] ? G ? (G.p(w, b), b & /*submissionError*/
      1024 && _(G, 1)) : (G = st(w), G.c(), _(G, 1), G.m(U.parentNode, U)) : G && (K(), F(G, 1, 1, () => {
        G = null;
      }), Q()), /*submitted*/
      w[9] ? q ? (q.p(w, b), b & /*submitted*/
      512 && _(q, 1)) : (q = lt(w), q.c(), _(q, 1), q.m(E.parentNode, E)) : q && (K(), F(q, 1, 1, () => {
        q = null;
      }), Q());
    },
    i(w) {
      if (!B) {
        _(e.$$.fragment, w), _(l.$$.fragment, w), _(u.$$.fragment, w);
        for (let b = 0; b < C.length; b += 1)
          _(p[b]);
        _(A.$$.fragment, w), _(G), _(q), B = !0;
      }
    },
    o(w) {
      F(e.$$.fragment, w), F(l.$$.fragment, w), F(u.$$.fragment, w), p = p.filter(Boolean);
      for (let b = 0; b < p.length; b += 1)
        F(p[b]);
      F(A.$$.fragment, w), F(G), F(q), B = !1;
    },
    d(w) {
      w && (S(n), S(i), S(v), S(U), S(E)), R(e, w), R(l), R(u), te(p, w), R(A), t[21](null), G && G.d(w), q && q.d(w);
    }
  };
}
function it(t) {
  let e, n;
  return e = new $t({
    props: {
      isFirst: (
        /*pageHistory*/
        t[12].length === 0
      ),
      isActive: (
        /*currentPageId*/
        t[7] === /*page*/
        t[26].id
      ),
      isSubmitting: (
        /*submitting*/
        t[8]
      ),
      page: (
        /*page*/
        t[26]
      ),
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      ),
      onBack: (
        /*goBack*/
        t[14]
      ),
      onGoto: (
        /*func*/
        t[20]
      )
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*pageHistory*/
      4096 && (l.isFirst = /*pageHistory*/
      i[12].length === 0), s & /*currentPageId, pages*/
      192 && (l.isActive = /*currentPageId*/
      i[7] === /*page*/
      i[26].id), s & /*submitting*/
      256 && (l.isSubmitting = /*submitting*/
      i[8]), s & /*pages*/
      64 && (l.page = /*page*/
      i[26]), s & /*lang*/
      1 && (l.lang = /*lang*/
      i[0]), s & /*translations*/
      4 && (l.translations = /*translations*/
      i[2]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function st(t) {
  let e, n, i;
  return n = new J({
    props: {
      text: (
        /*submissionError*/
        t[10]
      ),
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      )
    }
  }), {
    c() {
      e = k("div"), M(n.$$.fragment), g(e, "class", "mt-4 text-error bg-red-100 border border-error p-3 rounded-md");
    },
    m(s, l) {
      T(s, e, l), O(n, e, null), i = !0;
    },
    p(s, l) {
      const o = {};
      l & /*submissionError*/
      1024 && (o.text = /*submissionError*/
      s[10]), l & /*lang*/
      1 && (o.lang = /*lang*/
      s[0]), l & /*translations*/
      4 && (o.translations = /*translations*/
      s[2]), n.$set(o);
    },
    i(s) {
      i || (_(n.$$.fragment, s), i = !0);
    },
    o(s) {
      F(n.$$.fragment, s), i = !1;
    },
    d(s) {
      s && S(e), R(n);
    }
  };
}
function lt(t) {
  let e, n, i, s, l, o, a, r = (
    /*form*/
    t[1].confirmationMessage && ot(t)
  ), u = (
    /*editResponseUrl*/
    t[11] && rt(t)
  ), c = (
    /*allowPostAgain*/
    t[4] && at(t)
  );
  return {
    c() {
      e = k("div"), n = k("h2"), i = X(
        /*postedMessage*/
        t[3]
      ), s = j(), r && r.c(), l = j(), u && u.c(), o = j(), c && c.c(), g(n, "class", "text-2xl font-semibold text-success"), g(e, "class", "text-center p-6 border border-gray-300 rounded-md shadow-md bg-background text-text");
    },
    m(f, h) {
      T(f, e, h), $(e, n), $(n, i), $(e, s), r && r.m(e, null), $(e, l), u && u.m(e, null), $(e, o), c && c.m(e, null), a = !0;
    },
    p(f, h) {
      (!a || h & /*postedMessage*/
      8) && ie(
        i,
        /*postedMessage*/
        f[3]
      ), /*form*/
      f[1].confirmationMessage ? r ? (r.p(f, h), h & /*form*/
      2 && _(r, 1)) : (r = ot(f), r.c(), _(r, 1), r.m(e, l)) : r && (K(), F(r, 1, 1, () => {
        r = null;
      }), Q()), /*editResponseUrl*/
      f[11] ? u ? (u.p(f, h), h & /*editResponseUrl*/
      2048 && _(u, 1)) : (u = rt(f), u.c(), _(u, 1), u.m(e, o)) : u && (K(), F(u, 1, 1, () => {
        u = null;
      }), Q()), /*allowPostAgain*/
      f[4] ? c ? (c.p(f, h), h & /*allowPostAgain*/
      16 && _(c, 1)) : (c = at(f), c.c(), _(c, 1), c.m(e, null)) : c && (K(), F(c, 1, 1, () => {
        c = null;
      }), Q());
    },
    i(f) {
      a || (_(r), _(u), _(c), a = !0);
    },
    o(f) {
      F(r), F(u), F(c), a = !1;
    },
    d(f) {
      f && S(e), r && r.d(), u && u.d(), c && c.d();
    }
  };
}
function ot(t) {
  let e, n;
  return e = new J({
    props: {
      text: (
        /*form*/
        t[1].confirmationMessage
      ),
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      )
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*form*/
      2 && (l.text = /*form*/
      i[1].confirmationMessage), s & /*lang*/
      1 && (l.lang = /*lang*/
      i[0]), s & /*translations*/
      4 && (l.translations = /*translations*/
      i[2]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function rt(t) {
  let e, n, i, s;
  return i = new J({
    props: {
      text: "Click here to edit your response in Google Forms",
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      )
    }
  }), {
    c() {
      e = k("p"), n = k("a"), M(i.$$.fragment), g(
        n,
        "href",
        /*editResponseUrl*/
        t[11]
      ), g(n, "target", "_blank"), g(n, "class", "text-link underline hover:text-secondary"), g(e, "class", "mt-2");
    },
    m(l, o) {
      T(l, e, o), $(e, n), O(i, n, null), s = !0;
    },
    p(l, o) {
      const a = {};
      o & /*lang*/
      1 && (a.lang = /*lang*/
      l[0]), o & /*translations*/
      4 && (a.translations = /*translations*/
      l[2]), i.$set(a), (!s || o & /*editResponseUrl*/
      2048) && g(
        n,
        "href",
        /*editResponseUrl*/
        l[11]
      );
    },
    i(l) {
      s || (_(i.$$.fragment, l), s = !0);
    },
    o(l) {
      F(i.$$.fragment, l), s = !1;
    },
    d(l) {
      l && S(e), R(i);
    }
  };
}
function at(t) {
  let e, n, i, s, l;
  return n = new J({
    props: {
      text: (
        /*postAgainText*/
        t[5]
      ),
      lang: (
        /*lang*/
        t[0]
      ),
      translations: (
        /*translations*/
        t[2]
      )
    }
  }), {
    c() {
      e = k("button"), M(n.$$.fragment), g(e, "class", "mt-4 px-6 py-2 text-white bg-primary rounded hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-inputFocus transition");
    },
    m(o, a) {
      T(o, e, a), O(n, e, null), i = !0, s || (l = H(
        e,
        "click",
        /*resetForm*/
        t[16]
      ), s = !0);
    },
    p(o, a) {
      const r = {};
      a & /*postAgainText*/
      32 && (r.text = /*postAgainText*/
      o[5]), a & /*lang*/
      1 && (r.lang = /*lang*/
      o[0]), a & /*translations*/
      4 && (r.translations = /*translations*/
      o[2]), n.$set(r);
    },
    i(o) {
      i || (_(n.$$.fragment, o), i = !0);
    },
    o(o) {
      F(n.$$.fragment, o), i = !1;
    },
    d(o) {
      o && S(e), R(n), s = !1, l();
    }
  };
}
function dn(t) {
  let e, n, i = (
    /*form*/
    t[1] && nt(t)
  );
  return {
    c() {
      i && i.c(), e = $e();
    },
    m(s, l) {
      i && i.m(s, l), T(s, e, l), n = !0;
    },
    p(s, [l]) {
      /*form*/
      s[1] ? i ? (i.p(s, l), l & /*form*/
      2 && _(i, 1)) : (i = nt(s), i.c(), _(i, 1), i.m(e.parentNode, e)) : i && (K(), F(i, 1, 1, () => {
        i = null;
      }), Q());
    },
    i(s) {
      n || (_(i), n = !0);
    },
    o(s) {
      F(i), n = !1;
    },
    d(s) {
      s && S(e), i && i.d(s);
    }
  };
}
function pn(t, e) {
  const n = { id: e, items: {} };
  return t.forEach((i, s) => {
    n.items[s] !== void 0 ? (Array.isArray(n.items[s]) || (n.items[s] = [n.items[s]]), n.items[s].push(i)) : n.items[s] = i;
  }), n;
}
function _n(t, e, n) {
  let { form: i } = e, { translations: s = {} } = e, { postUrl: l = "" } = e, { postCallback: o = null } = e, { postedMessage: a = "Form submitted successfully!" } = e, { allowPostAgain: r = !0 } = e, { postAgainText: u = "Submit another response" } = e, c, f = !1, h = !1, m = "", d = "";
  function L(b) {
    var ee;
    if (!b)
      return [];
    const P = [];
    let W = {
      id: "start",
      description: b.description,
      items: [],
      defaultNextPage: null
    };
    for (const N of b.items)
      N.type === "pageBreak" ? (P.push(W), W = {
        id: N.id,
        items: [],
        title: N.title || void 0,
        description: N.description || void 0,
        defaultNextPage: ((ee = N.navigation) == null ? void 0 : ee.id) || null
      }) : W.items.push(N);
    W.items.length > 0 && P.push(W);
    for (let N = 0; N < P.length - 1; N++)
      P[N].defaultNextPage || (P[N].defaultNextPage = P[N + 1].id);
    const Y = P[P.length - 1];
    return Y.defaultNextPage || (Y.defaultNextPage = "submit"), n(7, y = P[0].id), P;
  }
  let y, A = [];
  function v() {
    A.length > 0 && (n(7, y = A.pop()), n(12, A));
  }
  async function U() {
    n(8, f = !0), n(10, m = "");
    let b = new FormData(p);
    const P = crypto.randomUUID();
    let W = {
      ...pn(b, i.id),
      uuid: P
    };
    try {
      await fetch(l, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(W)
      });
    } catch (ee) {
      console.warn("Expected CORS error, ignoring:", ee);
    }
    let Y = await E(P);
    console.log("Final result:", Y), Y.success ? (n(9, h = !0), n(11, d = Y.editResponseUrl || "")) : n(10, m = "There was an error submitting the form."), n(8, f = !1);
  }
  async function E(b) {
    let P = 0;
    const W = 10, Y = (ee) => new Promise((N) => setTimeout(N, ee));
    for (; P < W; ) {
      console.log(`Checking form submission status (Attempt ${P + 1})`);
      let N = await (await fetch(`${l}?uuid=${b}`, { method: "GET" })).json();
      if (N.success || N.error)
        return N;
      await Y(1e3), P++;
    }
    return {
      success: !1,
      error: "Timeout while waiting for response"
    };
  }
  function B(b) {
    b == "submit" ? U() : (A.push(y), n(12, A), n(7, y = b));
  }
  function C() {
    n(9, h = !1), n(10, m = ""), n(11, d = ""), n(7, y = c[0].id), n(12, A = []), p.reset();
  }
  let p, { lang: z = "en" } = e;
  function G(b, P) {
    console.log("Language changed to", z, "using Google Translate?", P), n(0, z = b);
  }
  const q = (b) => {
    B(b);
  };
  function w(b) {
    Fe[b ? "unshift" : "push"](() => {
      p = b, n(13, p);
    });
  }
  return t.$$set = (b) => {
    "form" in b && n(1, i = b.form), "translations" in b && n(2, s = b.translations), "postUrl" in b && n(18, l = b.postUrl), "postCallback" in b && n(19, o = b.postCallback), "postedMessage" in b && n(3, a = b.postedMessage), "allowPostAgain" in b && n(4, r = b.allowPostAgain), "postAgainText" in b && n(5, u = b.postAgainText), "lang" in b && n(0, z = b.lang);
  }, t.$$.update = () => {
    var b;
    t.$$.dirty & /*form*/
    2 && n(6, c = L(i)), t.$$.dirty & /*pages, currentPageId*/
    192 && (b = c.find((P) => P.id === y)) != null && b.defaultNextPage;
  }, [
    z,
    i,
    s,
    a,
    r,
    u,
    c,
    y,
    f,
    h,
    m,
    d,
    A,
    p,
    v,
    B,
    C,
    G,
    l,
    o,
    q,
    w
  ];
}
class kt extends ae {
  constructor(e) {
    super(), oe(
      this,
      e,
      _n,
      dn,
      le,
      {
        form: 1,
        translations: 2,
        postUrl: 18,
        postCallback: 19,
        postedMessage: 3,
        allowPostAgain: 4,
        postAgainText: 5,
        lang: 0
      },
      hn
    );
  }
  get form() {
    return this.$$.ctx[1];
  }
  set form(e) {
    this.$$set({ form: e }), I();
  }
  get translations() {
    return this.$$.ctx[2];
  }
  set translations(e) {
    this.$$set({ translations: e }), I();
  }
  get postUrl() {
    return this.$$.ctx[18];
  }
  set postUrl(e) {
    this.$$set({ postUrl: e }), I();
  }
  get postCallback() {
    return this.$$.ctx[19];
  }
  set postCallback(e) {
    this.$$set({ postCallback: e }), I();
  }
  get postedMessage() {
    return this.$$.ctx[3];
  }
  set postedMessage(e) {
    this.$$set({ postedMessage: e }), I();
  }
  get allowPostAgain() {
    return this.$$.ctx[4];
  }
  set allowPostAgain(e) {
    this.$$set({ allowPostAgain: e }), I();
  }
  get postAgainText() {
    return this.$$.ctx[5];
  }
  set postAgainText(e) {
    this.$$set({ postAgainText: e }), I();
  }
  get lang() {
    return this.$$.ctx[0];
  }
  set lang(e) {
    this.$$set({ lang: e }), I();
  }
}
re(kt, { form: {}, translations: {}, postUrl: {}, postCallback: {}, postedMessage: {}, allowPostAgain: { type: "Boolean" }, postAgainText: {}, lang: {} }, [], [], !0);
function ut(t) {
  let e, n;
  return e = new kt({
    props: {
      form: (
        /*data*/
        t[1]
      ),
      postUrl: (
        /*appsScriptUrl*/
        t[3]
      ),
      translations: (
        /*translations*/
        t[0]
      ),
      lang: "en"
    }
  }), {
    c() {
      M(e.$$.fragment);
    },
    m(i, s) {
      O(e, i, s), n = !0;
    },
    p(i, s) {
      const l = {};
      s & /*data*/
      2 && (l.form = /*data*/
      i[1]), s & /*appsScriptUrl*/
      8 && (l.postUrl = /*appsScriptUrl*/
      i[3]), s & /*translations*/
      1 && (l.translations = /*translations*/
      i[0]), e.$set(l);
    },
    i(i) {
      n || (_(e.$$.fragment, i), n = !0);
    },
    o(i) {
      F(e.$$.fragment, i), n = !1;
    },
    d(i) {
      R(e, i);
    }
  };
}
function ft(t) {
  let e, n, i, s;
  return {
    c() {
      e = k("button"), n = X("↻"), e.disabled = /*loading*/
      t[4], g(e, "class", "bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded");
    },
    m(l, o) {
      T(l, e, o), $(e, n), i || (s = H(
        e,
        "click",
        /*loadForm*/
        t[5]
      ), i = !0);
    },
    p(l, o) {
      o & /*loading*/
      16 && (e.disabled = /*loading*/
      l[4]);
    },
    d(l) {
      l && S(e), i = !1, s();
    }
  };
}
function bn(t) {
  let e, n, i, s = (
    /*data*/
    t[1] && ut(t)
  ), l = (
    /*formsUrl*/
    (t[2] || translationsUrl) && ft(t)
  );
  return {
    c() {
      s && s.c(), e = j(), l && l.c(), n = $e();
    },
    m(o, a) {
      s && s.m(o, a), T(o, e, a), l && l.m(o, a), T(o, n, a), i = !0;
    },
    p(o, [a]) {
      /*data*/
      o[1] ? s ? (s.p(o, a), a & /*data*/
      2 && _(s, 1)) : (s = ut(o), s.c(), _(s, 1), s.m(e.parentNode, e)) : s && (K(), F(s, 1, 1, () => {
        s = null;
      }), Q()), /*formsUrl*/
      o[2] || translationsUrl ? l ? l.p(o, a) : (l = ft(o), l.c(), l.m(n.parentNode, n)) : l && (l.d(1), l = null);
    },
    i(o) {
      i || (_(s), i = !0);
    },
    o(o) {
      F(s), i = !1;
    },
    d(o) {
      o && (S(e), S(n)), s && s.d(o), l && l.d(o);
    }
  };
}
function $n(t, e, n) {
  let { formsUrl: i = "" } = e, { formsId: s = "" } = e, { appsScriptUrl: l = "" } = e, { translations: o = {} } = e, { data: a } = e;
  async function r() {
    try {
      n(4, u = !0), console.log("Loading form from URL", i);
      var c = s ? `${l}?getFormData=1&formId=${encodeURIComponent(s)}` : `${l}?getFormData=1&formUrl=${encodeURIComponent(i)}`;
      const h = await fetch(c, { method: "GET", redirect: "follow" });
      if (!h.ok)
        throw new Error(`Failed to load form: ${h.statusText}`);
      n(1, a = await h.json()), console.log("Form Data Loaded:", a);
    } catch (h) {
      console.error("Error loading form from URL", c, h);
    } finally {
      n(4, u = !1);
    }
    let f = `${l}?translations=1`;
    s ? f += `&formId=${encodeURIComponent(s)}` : f += `&formUrl=${encodeURIComponent(i)}`, n(4, u = !0);
    try {
      console.log("Fetch transalations from", f);
      const h = await fetch(f, { method: "GET", redirect: "follow" });
      if (!h.ok)
        throw new Error(`Failed to load translations: ${h.statusText}`);
      n(0, o = await h.json()), console.log("Translations Loaded:", o);
    } catch (h) {
      console.error("Error loading translations from URL", f, h);
    }
  }
  let u = !1;
  return gt(() => {
    r();
  }), t.$$set = (c) => {
    "formsUrl" in c && n(2, i = c.formsUrl), "formsId" in c && n(6, s = c.formsId), "appsScriptUrl" in c && n(3, l = c.appsScriptUrl), "translations" in c && n(0, o = c.translations), "data" in c && n(1, a = c.data);
  }, [o, a, i, l, u, r, s];
}
class kn extends ae {
  constructor(e) {
    super(), oe(this, e, $n, bn, le, {
      formsUrl: 2,
      formsId: 6,
      appsScriptUrl: 3,
      translations: 0,
      data: 1
    });
  }
  get formsUrl() {
    return this.$$.ctx[2];
  }
  set formsUrl(e) {
    this.$$set({ formsUrl: e }), I();
  }
  get formsId() {
    return this.$$.ctx[6];
  }
  set formsId(e) {
    this.$$set({ formsId: e }), I();
  }
  get appsScriptUrl() {
    return this.$$.ctx[3];
  }
  set appsScriptUrl(e) {
    this.$$set({ appsScriptUrl: e }), I();
  }
  get translations() {
    return this.$$.ctx[0];
  }
  set translations(e) {
    this.$$set({ translations: e }), I();
  }
  get data() {
    return this.$$.ctx[1];
  }
  set data(e) {
    this.$$set({ data: e }), I();
  }
}
re(kn, { formsUrl: {}, formsId: {}, appsScriptUrl: {}, translations: {}, data: {} }, [], [], !0);
export {
  kn as default
};
