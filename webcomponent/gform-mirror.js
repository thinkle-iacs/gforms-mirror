var pt = Object.defineProperty;
var bt = (t, e, n) => e in t ? pt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Y = (t, e, n) => (bt(t, typeof e != "symbol" ? e + "" : e, n), n);
function j() {
}
function at(t) {
  return t();
}
function Te() {
  return /* @__PURE__ */ Object.create(null);
}
function x(t) {
  t.forEach(at);
}
function ye(t) {
  return typeof t == "function";
}
function se(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
let de;
function $t(t, e) {
  return t === e ? !0 : (de || (de = document.createElement("a")), de.href = e, t === de.href);
}
function wt(t) {
  return Object.keys(t).length === 0;
}
function $(t, e) {
  t.appendChild(e);
}
function $e(t, e, n) {
  const l = kt(t);
  if (!l.getElementById(e)) {
    const i = v("style");
    i.id = e, i.textContent = n, vt(l, i);
  }
}
function kt(t) {
  if (!t)
    return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && /** @type {ShadowRoot} */
  e.host ? (
    /** @type {ShadowRoot} */
    e
  ) : t.ownerDocument;
}
function vt(t, e) {
  return $(
    /** @type {Document} */
    t.head || t,
    e
  ), e.sheet;
}
function T(t, e, n) {
  t.insertBefore(e, n || null);
}
function y(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function ee(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function v(t) {
  return document.createElement(t);
}
function M(t) {
  return document.createTextNode(t);
}
function I() {
  return M(" ");
}
function me() {
  return M("");
}
function P(t, e, n, l) {
  return t.addEventListener(e, n, l), () => t.removeEventListener(e, n, l);
}
function ut(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function _(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Ft(t) {
  let e;
  return {
    /* push */
    p(...n) {
      e = n, e.forEach((l) => t.push(l));
    },
    /* remove */
    r() {
      e.forEach((n) => t.splice(t.indexOf(n), 1));
    }
  };
}
function Ct(t) {
  return Array.from(t.childNodes);
}
function X(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function be(t, e) {
  t.value = e ?? "";
}
function Z(t, e, n) {
  t.classList.toggle(e, !!n);
}
function St(t) {
  const e = {};
  return t.childNodes.forEach(
    /** @param {Element} node */
    (n) => {
      e[n.slot || "default"] = !0;
    }
  ), e;
}
let he;
function ge(t) {
  he = t;
}
function yt() {
  if (!he)
    throw new Error("Function called outside component initialization");
  return he;
}
function Tt(t) {
  yt().$$.on_mount.push(t);
}
function Gt(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((l) => l.call(this, e));
}
const fe = [], Fe = [];
let ce = [];
const Ge = [], Et = /* @__PURE__ */ Promise.resolve();
let Ce = !1;
function At() {
  Ce || (Ce = !0, Et.then(L));
}
function Se(t) {
  ce.push(t);
}
const we = /* @__PURE__ */ new Set();
let ue = 0;
function L() {
  if (ue !== 0)
    return;
  const t = he;
  do {
    try {
      for (; ue < fe.length; ) {
        const e = fe[ue];
        ue++, ge(e), Ut(e.$$);
      }
    } catch (e) {
      throw fe.length = 0, ue = 0, e;
    }
    for (ge(null), fe.length = 0, ue = 0; Fe.length; )
      Fe.pop()();
    for (let e = 0; e < ce.length; e += 1) {
      const n = ce[e];
      we.has(n) || (we.add(n), n());
    }
    ce.length = 0;
  } while (fe.length);
  for (; Ge.length; )
    Ge.pop()();
  Ce = !1, we.clear(), ge(t);
}
function Ut(t) {
  if (t.fragment !== null) {
    t.update(), x(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Se);
  }
}
function Lt(t) {
  const e = [], n = [];
  ce.forEach((l) => t.indexOf(l) === -1 ? e.push(l) : n.push(l)), n.forEach((l) => l()), ce = e;
}
const _e = /* @__PURE__ */ new Set();
let ie;
function Q() {
  ie = {
    r: 0,
    c: [],
    p: ie
    // parent group
  };
}
function W() {
  ie.r || x(ie.c), ie = ie.p;
}
function w(t, e) {
  t && t.i && (_e.delete(t), t.i(e));
}
function S(t, e, n, l) {
  if (t && t.o) {
    if (_e.has(t))
      return;
    _e.add(t), ie.c.push(() => {
      _e.delete(t), l && (n && t.d(1), l());
    }), t.o(e);
  } else
    l && l();
}
function V(t) {
  return (t == null ? void 0 : t.length) !== void 0 ? t : Array.from(t);
}
function D(t) {
  t && t.c();
}
function z(t, e, n) {
  const { fragment: l, after_update: i } = t.$$;
  l && l.m(e, n), Se(() => {
    const s = t.$$.on_mount.map(at).filter(ye);
    t.$$.on_destroy ? t.$$.on_destroy.push(...s) : x(s), t.$$.on_mount = [];
  }), i.forEach(Se);
}
function B(t, e) {
  const n = t.$$;
  n.fragment !== null && (Lt(n.after_update), x(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function qt(t, e) {
  t.$$.dirty[0] === -1 && (fe.push(t), At(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function oe(t, e, n, l, i, s, o = null, r = [-1]) {
  const a = he;
  ge(t);
  const u = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: s,
    update: j,
    not_equal: i,
    bound: Te(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    // everything else
    callbacks: Te(),
    dirty: r,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  o && o(u.root);
  let c = !1;
  if (u.ctx = n ? n(t, e.props || {}, (f, p, ...g) => {
    const d = g.length ? g[0] : p;
    return u.ctx && i(u.ctx[f], u.ctx[f] = d) && (!u.skip_bound && u.bound[f] && u.bound[f](d), c && qt(t, f)), p;
  }) : [], u.update(), c = !0, x(u.before_update), u.fragment = l ? l(u.ctx) : !1, e.target) {
    if (e.hydrate) {
      const f = Ct(e.target);
      u.fragment && u.fragment.l(f), f.forEach(y);
    } else
      u.fragment && u.fragment.c();
    e.intro && w(t.$$.fragment), z(t, e.target, e.anchor), L();
  }
  ge(a);
}
let ft;
typeof HTMLElement == "function" && (ft = class extends HTMLElement {
  constructor(e, n, l) {
    super();
    /** The Svelte component constructor */
    Y(this, "$$ctor");
    /** Slots */
    Y(this, "$$s");
    /** The Svelte component instance */
    Y(this, "$$c");
    /** Whether or not the custom element is connected */
    Y(this, "$$cn", !1);
    /** Component props data */
    Y(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    Y(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    Y(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    Y(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    Y(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = e, this.$$s = n, l && this.attachShadow({ mode: "open" });
  }
  addEventListener(e, n, l) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(n), this.$$c) {
      const i = this.$$c.$on(e, n);
      this.$$l_u.set(n, i);
    }
    super.addEventListener(e, n, l);
  }
  removeEventListener(e, n, l) {
    if (super.removeEventListener(e, n, l), this.$$c) {
      const i = this.$$l_u.get(n);
      i && (i(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(s) {
        return () => {
          let o;
          return {
            c: function() {
              o = v("slot"), s !== "default" && _(o, "name", s);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(u, c) {
              T(u, o, c);
            },
            d: function(u) {
              u && y(o);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const n = {}, l = St(this);
      for (const s of this.$$s)
        s in l && (n[s] = [e(s)]);
      for (const s of this.attributes) {
        const o = this.$$g_p(s.name);
        o in this.$$d || (this.$$d[o] = pe(o, s.value, this.$$p_d, "toProp"));
      }
      for (const s in this.$$p_d)
        !(s in this.$$d) && this[s] !== void 0 && (this.$$d[s] = this[s], delete this[s]);
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
      const i = () => {
        this.$$r = !0;
        for (const s in this.$$p_d)
          if (this.$$d[s] = this.$$c.$$.ctx[this.$$c.$$.props[s]], this.$$p_d[s].reflect) {
            const o = pe(
              s,
              this.$$d[s],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[s].attribute || s) : this.setAttribute(this.$$p_d[s].attribute || s, o);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(i), i();
      for (const s in this.$$l)
        for (const o of this.$$l[s]) {
          const r = this.$$c.$on(s, o);
          this.$$l_u.set(o, r);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(e, n, l) {
    var i;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = pe(e, l, this.$$p_d, "toProp"), (i = this.$$c) == null || i.$set({ [e]: this.$$d[e] }));
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
function pe(t, e, n, l) {
  var s;
  const i = (s = n[t]) == null ? void 0 : s.type;
  if (e = i === "Boolean" && typeof e != "boolean" ? e != null : e, !l || !n[t])
    return e;
  if (l === "toAttribute")
    switch (i) {
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
    switch (i) {
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
function re(t, e, n, l, i, s) {
  let o = class extends ft {
    constructor() {
      super(t, n, i), this.$$p_d = e;
    }
    static get observedAttributes() {
      return Object.keys(e).map(
        (r) => (e[r].attribute || r).toLowerCase()
      );
    }
  };
  return Object.keys(e).forEach((r) => {
    Object.defineProperty(o.prototype, r, {
      get() {
        return this.$$c && r in this.$$c ? this.$$c[r] : this.$$d[r];
      },
      set(a) {
        var u;
        a = pe(r, a, e), this.$$d[r] = a, (u = this.$$c) == null || u.$set({ [r]: a });
      }
    });
  }), l.forEach((r) => {
    Object.defineProperty(o.prototype, r, {
      get() {
        var a;
        return (a = this.$$c) == null ? void 0 : a[r];
      }
    });
  }), s && (o = s(o)), t.element = /** @type {any} */
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
    Y(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Y(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    B(this, 1), this.$destroy = j;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!ye(n))
      return j;
    const l = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return l.push(n), () => {
      const i = l.indexOf(n);
      i !== -1 && l.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !wt(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const It = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(It);
const ke = {
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
}, ct = (t, e, n = "en") => e[n] && e[n][t] ? e[n][t] : ke[n] && ke[n][t] ? ke[n][t] : t;
function Nt(t) {
  $e(t, "svelte-f2gsno", "span.svelte-f2gsno{display:contents}");
}
function jt(t) {
  let e, n;
  return {
    c() {
      e = v("span"), n = M(
        /*translatedText*/
        t[1]
      ), _(
        e,
        "data-original-text",
        /*text*/
        t[0]
      ), _(e, "class", "svelte-f2gsno"), Z(
        e,
        "notranslate",
        /*haveTranslation*/
        t[2]
      );
    },
    m(l, i) {
      T(l, e, i), $(e, n);
    },
    p(l, [i]) {
      i & /*translatedText*/
      2 && X(
        n,
        /*translatedText*/
        l[1]
      ), i & /*text*/
      1 && _(
        e,
        "data-original-text",
        /*text*/
        l[0]
      ), i & /*haveTranslation*/
      4 && Z(
        e,
        "notranslate",
        /*haveTranslation*/
        l[2]
      );
    },
    i: j,
    o: j,
    d(l) {
      l && y(e);
    }
  };
}
function Pt(t, e, n) {
  let { text: l } = e, { lang: i = "en" } = e, { translations: s = {} } = e, o = l, r = !1;
  return t.$$set = (a) => {
    "text" in a && n(0, l = a.text), "lang" in a && n(3, i = a.lang), "translations" in a && n(4, s = a.translations);
  }, t.$$.update = () => {
    t.$$.dirty & /*translations, lang, text*/
    25 && (n(2, r = !!(s[i] && s[i][l])), n(1, o = ct(l, s, i)));
  }, [l, o, r, i, s];
}
class K extends ae {
  constructor(e) {
    super(), oe(this, e, Pt, jt, se, { text: 0, lang: 3, translations: 4 }, Nt);
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(e) {
    this.$$set({ text: e }), L();
  }
  get lang() {
    return this.$$.ctx[3];
  }
  set lang(e) {
    this.$$set({ lang: e }), L();
  }
  get translations() {
    return this.$$.ctx[4];
  }
  set translations(e) {
    this.$$set({ translations: e }), L();
  }
}
re(K, { text: {}, lang: {}, translations: {} }, [], [], !0);
function zt(t) {
  $e(t, "svelte-t16d3j", ".translate.svelte-t16d3j{margin-bottom:10px}.hidden.svelte-t16d3j{display:none}button.svelte-t16d3j{text-transform:capitalize}");
}
function Ee(t, e, n) {
  const l = t.slice();
  l[17] = e[n];
  const i = new Intl.DisplayNames([
    /*lang*/
    l[17]
  ], { type: "language" }).of(
    /*lang*/
    l[17]
  );
  return l[18] = i, l;
}
function ve(t) {
  const e = t.slice(), n = new Intl.DisplayNames([
    /*sourceLanguage*/
    e[1]
  ], { type: "language" }).of(
    /*sourceLanguage*/
    e[1]
  );
  return e[18] = n, e;
}
function Ae(t) {
  let e, n, l, i, s;
  return n = new K({
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
      e = v("button"), D(n.$$.fragment), _(e, "class", "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm capitalize notranslate svelte-t16d3j");
    },
    m(o, r) {
      T(o, e, r), z(n, e, null), l = !0, i || (s = P(
        e,
        "click",
        /*click_handler*/
        t[9]
      ), i = !0);
    },
    p(o, r) {
      const a = {};
      r & /*selectedLang*/
      4 && (a.lang = /*selectedLang*/
      o[2]), r & /*translations*/
      1 && (a.translations = /*translations*/
      o[0]), r & /*sourceLanguage*/
      2 && (a.text = /*langName*/
      o[18]), n.$set(a);
    },
    i(o) {
      l || (w(n.$$.fragment, o), l = !0);
    },
    o(o) {
      S(n.$$.fragment, o), l = !1;
    },
    d(o) {
      o && y(e), B(n), i = !1, s();
    }
  };
}
function Ue(t) {
  let e, n = (
    /*langName*/
    t[18] + ""
  ), l, i, s;
  function o() {
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
      e = v("button"), l = M(n), _(e, "class", "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm capitalize notranslate svelte-t16d3j");
    },
    m(r, a) {
      T(r, e, a), $(e, l), i || (s = P(e, "click", o), i = !0);
    },
    p(r, a) {
      t = r, a & /*translations*/
      1 && n !== (n = /*langName*/
      t[18] + "") && X(l, n);
    },
    d(r) {
      r && y(e), i = !1, s();
    }
  };
}
function Bt(t) {
  let e, n;
  return e = new K({
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*selectedLang*/
      4 && (s.lang = /*selectedLang*/
      l[2]), i & /*translations*/
      1 && (s.translations = /*translations*/
      l[0]), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function Ot(t) {
  let e, n;
  return e = new K({
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*selectedLang*/
      4 && (s.lang = /*selectedLang*/
      l[2]), i & /*translations*/
      1 && (s.translations = /*translations*/
      l[0]), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function Rt(t) {
  let e, n, l, i, s, o, r, a, u, c, f, p, g, d, E, C, G = (
    /*selectedLang*/
    t[2] !== /*sourceLanguage*/
    t[1] && Ae(ve(t))
  ), b = V(Object.keys(
    /*translations*/
    t[0]
  )), A = [];
  for (let h = 0; h < b.length; h += 1)
    A[h] = Ue(Ee(t, b, h));
  const F = [Ot, Bt], k = [];
  function m(h, q) {
    return q & /*translations*/
    1 && (u = null), u == null && (u = !!Object.keys(
      /*translations*/
      h[0]
    ).length), u ? 0 : 1;
  }
  return c = m(t, -1), f = k[c] = F[c](t), {
    c() {
      e = v("script"), e.innerHTML = "", l = I(), i = v("div"), s = v("div"), G && G.c(), o = I();
      for (let h = 0; h < A.length; h += 1)
        A[h].c();
      r = I(), a = v("button"), f.c(), p = I(), g = v("div"), $t(e.src, n = "https://translate.google.com/translate_a/element.js?cb=googleTranslateLoaded") || _(e, "src", n), _(a, "class", "px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm svelte-t16d3j"), _(s, "class", "flex flex-wrap gap-2"), _(i, "class", "translate space-y-2 mt-4 svelte-t16d3j"), _(g, "id", "google_translate_element"), _(g, "class", "svelte-t16d3j"), Z(g, "hidden", !/*showAllLanguages*/
      t[3]);
    },
    m(h, q) {
      $(document.head, e), T(h, l, q), T(h, i, q), $(i, s), G && G.m(s, null), $(s, o);
      for (let N = 0; N < A.length; N += 1)
        A[N] && A[N].m(s, null);
      $(s, r), $(s, a), k[c].m(a, null), T(h, p, q), T(h, g, q), d = !0, E || (C = P(
        a,
        "click",
        /*click_handler_2*/
        t[11]
      ), E = !0);
    },
    p(h, [q]) {
      if (/*selectedLang*/
      h[2] !== /*sourceLanguage*/
      h[1] ? G ? (G.p(ve(h), q), q & /*selectedLang, sourceLanguage*/
      6 && w(G, 1)) : (G = Ae(ve(h)), G.c(), w(G, 1), G.m(s, o)) : G && (Q(), S(G, 1, 1, () => {
        G = null;
      }), W()), q & /*setLanguage, Object, translations, Intl*/
      17) {
        b = V(Object.keys(
          /*translations*/
          h[0]
        ));
        let O;
        for (O = 0; O < b.length; O += 1) {
          const H = Ee(h, b, O);
          A[O] ? A[O].p(H, q) : (A[O] = Ue(H), A[O].c(), A[O].m(s, r));
        }
        for (; O < A.length; O += 1)
          A[O].d(1);
        A.length = b.length;
      }
      let N = c;
      c = m(h, q), c === N ? k[c].p(h, q) : (Q(), S(k[N], 1, 1, () => {
        k[N] = null;
      }), W(), f = k[c], f ? f.p(h, q) : (f = k[c] = F[c](h), f.c()), w(f, 1), f.m(a, null)), (!d || q & /*showAllLanguages*/
      8) && Z(g, "hidden", !/*showAllLanguages*/
      h[3]);
    },
    i(h) {
      d || (w(G), w(f), d = !0);
    },
    o(h) {
      S(G), S(f), d = !1;
    },
    d(h) {
      h && (y(l), y(i), y(p), y(g)), y(e), G && G.d(), ee(A, h), k[c].d(), E = !1, C();
    }
  };
}
function Mt(t, e, n) {
  let { translations: l = {} } = e, { sourceLanguage: i = "en" } = e, { onChange: s } = e, { form: o } = e, r = i, a = !1, u = !1;
  function c() {
    new google.translate.TranslateElement({ pageLanguage: i }, "google_translate_element");
  }
  function f() {
    n(8, u = !0);
  }
  function p(F) {
    let k = F.match(/googtrans\((\w+)\|(\w+)\)/);
    k && (n(2, r = k[2]), n(7, a = !0));
  }
  Tt(() => {
    p(window.location.hash), window.googleTranslateLoaded = f, window.addEventListener("hashchange", () => {
      p(window.location.hash);
    });
  });
  function g(F) {
    n(2, r = F);
    let k = i !== F && !E(F);
    n(7, a = k), k ? d(F) : window.location.hash = "";
  }
  function d(F) {
    window.location.hash = `#googtrans(${i}|${F})`, location.reload();
  }
  function E(F) {
    debugger;
    let k = l[F];
    if (!k || o.title && !k[o.title] || o.description && !k[o.description])
      return !1;
    for (let m of o.items) {
      if (!k[m.title] || m.description && !k[m.description])
        return !1;
      if (m.choices) {
        for (let h of m.choices)
          if (!k[h])
            return !1;
      }
    }
    return !0;
  }
  let C = !1;
  const G = () => g(i), b = (F) => g(F), A = () => {
    g(i), n(3, C = !C);
  };
  return t.$$set = (F) => {
    "translations" in F && n(0, l = F.translations), "sourceLanguage" in F && n(1, i = F.sourceLanguage), "onChange" in F && n(5, s = F.onChange), "form" in F && n(6, o = F.form);
  }, t.$$.update = () => {
    t.$$.dirty & /*useGoogleTranslate, showAllLanguages, googleTranslateIsReady*/
    392 && (a || C) && u && c(), t.$$.dirty & /*onChange, selectedLang, useGoogleTranslate*/
    164 && s(r, a);
  }, [
    l,
    i,
    r,
    C,
    g,
    s,
    o,
    a,
    u,
    G,
    b,
    A
  ];
}
class mt extends ae {
  constructor(e) {
    super(), oe(
      this,
      e,
      Mt,
      Rt,
      se,
      {
        translations: 0,
        sourceLanguage: 1,
        onChange: 5,
        form: 6
      },
      zt
    );
  }
  get translations() {
    return this.$$.ctx[0];
  }
  set translations(e) {
    this.$$set({ translations: e }), L();
  }
  get sourceLanguage() {
    return this.$$.ctx[1];
  }
  set sourceLanguage(e) {
    this.$$set({ sourceLanguage: e }), L();
  }
  get onChange() {
    return this.$$.ctx[5];
  }
  set onChange(e) {
    this.$$set({ onChange: e }), L();
  }
  get form() {
    return this.$$.ctx[6];
  }
  set form(e) {
    this.$$set({ form: e }), L();
  }
}
re(mt, { translations: {}, sourceLanguage: {}, onChange: {}, form: {} }, [], [], !0);
function Dt(t) {
  $e(t, "svelte-zcceq9", ".sr-only.svelte-zcceq9.svelte-zcceq9{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}span.svelte-zcceq9.svelte-zcceq9{display:inline-block;transform:scale(0.5);transition:transform 200ms}.selected.svelte-zcceq9 span.svelte-zcceq9{transform:scale(1)}label.svelte-zcceq9:hover span.svelte-zcceq9,.unselected.svelte-zcceq9.svelte-zcceq9:has(~ label:hover span){transform:scale(1.1)}label.svelte-zcceq9:hover~label.selected.svelte-zcceq9{transform:scale(0.75)}.peer.svelte-zcceq9:focus-visible+span.svelte-zcceq9{outline:2px solid #4f46e5;outline-offset:2px}");
}
function Le(t, e, n) {
  const l = t.slice();
  return l[8] = e[n], l[10] = n, l;
}
function qe(t) {
  let e, n, l, i, s = (
    /*iconMap*/
    t[4][
      /*icon*/
      t[2]
    ] + ""
  ), o, r, a, u, c;
  return a = Ft(
    /*$$binding_groups*/
    t[7][0]
  ), {
    c() {
      e = v("label"), n = v("input"), l = I(), i = v("span"), o = M(s), r = I(), _(n, "type", "radio"), _(
        n,
        "name",
        /*name*/
        t[3]
      ), n.__value = /*i*/
      t[10] + 1, be(n, n.__value), _(n, "class", "sr-only peer svelte-zcceq9"), _(i, "class", "text-2xl transition-transform duration-200 ease-in-out svelte-zcceq9"), _(i, "aria-hidden", "true"), _(e, "class", "cursor-pointer relative svelte-zcceq9"), Z(
        e,
        "selected",
        /*value*/
        t[0] > /*i*/
        t[10]
      ), Z(
        e,
        "unselected",
        /*value*/
        t[0] <= /*i*/
        t[10]
      ), a.p(n);
    },
    m(f, p) {
      T(f, e, p), $(e, n), n.checked = n.__value === /*value*/
      t[0], $(e, l), $(e, i), $(i, o), $(e, r), u || (c = [
        P(
          n,
          "change",
          /*input_change_handler*/
          t[6]
        ),
        P(
          n,
          "input",
          /*input_handler*/
          t[5]
        )
      ], u = !0);
    },
    p(f, p) {
      p & /*name*/
      8 && _(
        n,
        "name",
        /*name*/
        f[3]
      ), p & /*value, max*/
      3 && (n.checked = n.__value === /*value*/
      f[0]), p & /*icon*/
      4 && s !== (s = /*iconMap*/
      f[4][
        /*icon*/
        f[2]
      ] + "") && X(o, s), p & /*value*/
      1 && Z(
        e,
        "selected",
        /*value*/
        f[0] > /*i*/
        f[10]
      ), p & /*value*/
      1 && Z(
        e,
        "unselected",
        /*value*/
        f[0] <= /*i*/
        f[10]
      );
    },
    d(f) {
      f && y(e), a.r(), u = !1, x(c);
    }
  };
}
function Ht(t) {
  let e, n = V(Array(
    /*max*/
    t[1]
  ).fill(0)), l = [];
  for (let i = 0; i < n.length; i += 1)
    l[i] = qe(Le(t, n, i));
  return {
    c() {
      e = v("div");
      for (let i = 0; i < l.length; i += 1)
        l[i].c();
      _(e, "class", "flex space-x-1");
    },
    m(i, s) {
      T(i, e, s);
      for (let o = 0; o < l.length; o += 1)
        l[o] && l[o].m(e, null);
    },
    p(i, [s]) {
      if (s & /*value, iconMap, icon, name, max*/
      31) {
        n = V(Array(
          /*max*/
          i[1]
        ).fill(0));
        let o;
        for (o = 0; o < n.length; o += 1) {
          const r = Le(i, n, o);
          l[o] ? l[o].p(r, s) : (l[o] = qe(r), l[o].c(), l[o].m(e, null));
        }
        for (; o < l.length; o += 1)
          l[o].d(1);
        l.length = n.length;
      }
    },
    i: j,
    o: j,
    d(i) {
      i && y(e), ee(l, i);
    }
  };
}
function Vt(t, e, n) {
  let { max: l = 5 } = e, { icon: i = "STAR" } = e, { value: s = 0 } = e, { name: o = "rating" } = e;
  const r = {
    STAR: "⭐",
    HEART: "❤️",
    THUMBS_UP: "👍"
  }, a = [[]];
  function u(f) {
    Gt.call(this, t, f);
  }
  function c() {
    s = this.__value, n(0, s);
  }
  return t.$$set = (f) => {
    "max" in f && n(1, l = f.max), "icon" in f && n(2, i = f.icon), "value" in f && n(0, s = f.value), "name" in f && n(3, o = f.name);
  }, [
    s,
    l,
    i,
    o,
    r,
    u,
    c,
    a
  ];
}
class gt extends ae {
  constructor(e) {
    super(), oe(this, e, Vt, Ht, se, { max: 1, icon: 2, value: 0, name: 3 }, Dt);
  }
  get max() {
    return this.$$.ctx[1];
  }
  set max(e) {
    this.$$set({ max: e }), L();
  }
  get icon() {
    return this.$$.ctx[2];
  }
  set icon(e) {
    this.$$set({ icon: e }), L();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), L();
  }
  get name() {
    return this.$$.ctx[3];
  }
  set name(e) {
    this.$$set({ name: e }), L();
  }
}
re(gt, { max: {}, icon: {}, value: {}, name: {} }, [], [], !0);
function Jt(t) {
  return t.replace("|", "\\|");
}
function Ie(t, e) {
  return `${t}|${Jt(e)}`;
}
function Ne(t, e, n) {
  const l = t.slice();
  return l[14] = e[n], l;
}
function je(t, e, n) {
  const l = t.slice();
  return l[17] = e[n], l;
}
function Pe(t, e, n) {
  const l = t.slice();
  return l[17] = e[n], l;
}
function ze(t, e, n) {
  const l = t.slice();
  return l[7] = e[n], l;
}
function Be(t, e, n) {
  const l = t.slice();
  return l[7] = e[n], l[11] = n, l;
}
function Oe(t, e, n) {
  const l = t.slice();
  return l[7] = e[n], l;
}
function Re(t) {
  let e, n, l;
  return n = new K({
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
      e = v("p"), D(n.$$.fragment), _(e, "class", "text-sm text-gray-600 mb-2");
    },
    m(i, s) {
      T(i, e, s), z(n, e, null), l = !0;
    },
    p(i, s) {
      const o = {};
      s & /*item*/
      1 && (o.text = /*item*/
      i[0].description), s & /*lang*/
      4 && (o.lang = /*lang*/
      i[2]), s & /*translations*/
      8 && (o.translations = /*translations*/
      i[3]), n.$set(o);
    },
    i(i) {
      l || (w(n.$$.fragment, i), l = !0);
    },
    o(i) {
      S(n.$$.fragment, i), l = !1;
    },
    d(i) {
      i && y(e), B(n);
    }
  };
}
function Kt(t) {
  let e, n, l, i, s, o, r, a = V(
    /*item*/
    t[0].columns
  ), u = [];
  for (let p = 0; p < a.length; p += 1)
    u[p] = Me(Pe(t, a, p));
  let c = V(
    /*item*/
    t[0].rows
  ), f = [];
  for (let p = 0; p < c.length; p += 1)
    f[p] = He(Ne(t, c, p));
  return {
    c() {
      e = v("table"), n = v("thead"), l = v("tr"), i = v("th"), s = I();
      for (let p = 0; p < u.length; p += 1)
        u[p].c();
      o = I(), r = v("tbody");
      for (let p = 0; p < f.length; p += 1)
        f[p].c();
      _(i, "class", "p-2 text-left border-b"), _(n, "class", "bg-gray-100"), _(e, "class", "w-full border border-gray-300 rounded-md shadow-sm");
    },
    m(p, g) {
      T(p, e, g), $(e, n), $(n, l), $(l, i), $(l, s);
      for (let d = 0; d < u.length; d += 1)
        u[d] && u[d].m(l, null);
      $(e, o), $(e, r);
      for (let d = 0; d < f.length; d += 1)
        f[d] && f[d].m(r, null);
    },
    p(p, g) {
      if (g & /*item*/
      1) {
        a = V(
          /*item*/
          p[0].columns
        );
        let d;
        for (d = 0; d < a.length; d += 1) {
          const E = Pe(p, a, d);
          u[d] ? u[d].p(E, g) : (u[d] = Me(E), u[d].c(), u[d].m(l, null));
        }
        for (; d < u.length; d += 1)
          u[d].d(1);
        u.length = a.length;
      }
      if (g & /*item, handleChange*/
      17) {
        c = V(
          /*item*/
          p[0].rows
        );
        let d;
        for (d = 0; d < c.length; d += 1) {
          const E = Ne(p, c, d);
          f[d] ? f[d].p(E, g) : (f[d] = He(E), f[d].c(), f[d].m(r, null));
        }
        for (; d < f.length; d += 1)
          f[d].d(1);
        f.length = c.length;
      }
    },
    i: j,
    o: j,
    d(p) {
      p && y(e), ee(u, p), ee(f, p);
    }
  };
}
function Qt(t) {
  let e, n, l, i;
  return {
    c() {
      e = v("input"), _(e, "type", "number"), _(e, "name", n = /*item*/
      t[0].id), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(s, o) {
      T(s, e, o), l || (i = [
        P(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        P(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], l = !0);
    },
    p(s, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      s[0].id) && _(e, "name", n);
    },
    i: j,
    o: j,
    d(s) {
      s && y(e), l = !1, x(i);
    }
  };
}
function Wt(t) {
  let e, n, l, i;
  return {
    c() {
      e = v("input"), _(e, "type", "datetime-local"), _(e, "name", n = /*item*/
      t[0].id), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(s, o) {
      T(s, e, o), l || (i = [
        P(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        P(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], l = !0);
    },
    p(s, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      s[0].id) && _(e, "name", n);
    },
    i: j,
    o: j,
    d(s) {
      s && y(e), l = !1, x(i);
    }
  };
}
function Xt(t) {
  let e, n, l, i;
  return {
    c() {
      e = v("input"), _(e, "type", "time"), _(e, "name", n = /*item*/
      t[0].id), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(s, o) {
      T(s, e, o), l || (i = [
        P(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        P(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], l = !0);
    },
    p(s, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      s[0].id) && _(e, "name", n);
    },
    i: j,
    o: j,
    d(s) {
      s && y(e), l = !1, x(i);
    }
  };
}
function Yt(t) {
  let e, n, l, i;
  return {
    c() {
      e = v("input"), _(e, "type", "date"), _(e, "name", n = /*item*/
      t[0].id), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(s, o) {
      T(s, e, o), l || (i = [
        P(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        P(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], l = !0);
    },
    p(s, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      s[0].id) && _(e, "name", n);
    },
    i: j,
    o: j,
    d(s) {
      s && y(e), l = !1, x(i);
    }
  };
}
function Zt(t) {
  let e, n, l, i, s, o = V(
    /*item*/
    t[0].choices
  ), r = [];
  for (let a = 0; a < o.length; a += 1)
    r[a] = Ve(ze(t, o, a));
  return {
    c() {
      e = v("select"), n = v("option"), n.textContent = "Select an option";
      for (let a = 0; a < r.length; a += 1)
        r[a].c();
      n.__value = "", be(n, n.__value), _(e, "name", l = /*item*/
      t[0].id), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(a, u) {
      T(a, e, u), $(e, n);
      for (let c = 0; c < r.length; c += 1)
        r[c] && r[c].m(e, null);
      i || (s = P(
        e,
        "change",
        /*handleChange*/
        t[4]
      ), i = !0);
    },
    p(a, u) {
      if (u & /*item*/
      1) {
        o = V(
          /*item*/
          a[0].choices
        );
        let c;
        for (c = 0; c < o.length; c += 1) {
          const f = ze(a, o, c);
          r[c] ? r[c].p(f, u) : (r[c] = Ve(f), r[c].c(), r[c].m(e, null));
        }
        for (; c < r.length; c += 1)
          r[c].d(1);
        r.length = o.length;
      }
      u & /*item*/
      1 && l !== (l = /*item*/
      a[0].id) && _(e, "name", l);
    },
    i: j,
    o: j,
    d(a) {
      a && y(e), ee(r, a), i = !1, s();
    }
  };
}
function xt(t) {
  let e, n, l, i, s, o, r;
  return {
    c() {
      e = v("input"), _(e, "type", "range"), _(e, "name", n = /*item*/
      t[0].id), _(e, "min", l = /*item*/
      t[0].min), _(e, "max", i = /*item*/
      t[0].max), _(e, "step", s = /*item*/
      t[0].step), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(a, u) {
      T(a, e, u), o || (r = [
        P(
          e,
          "input",
          /*handleChange*/
          t[4]
        ),
        P(
          e,
          "change",
          /*handleChange*/
          t[4]
        )
      ], o = !0);
    },
    p(a, u) {
      u & /*item*/
      1 && n !== (n = /*item*/
      a[0].id) && _(e, "name", n), u & /*item*/
      1 && l !== (l = /*item*/
      a[0].min) && _(e, "min", l), u & /*item*/
      1 && i !== (i = /*item*/
      a[0].max) && _(e, "max", i), u & /*item*/
      1 && s !== (s = /*item*/
      a[0].step) && _(e, "step", s);
    },
    i: j,
    o: j,
    d(a) {
      a && y(e), o = !1, x(r);
    }
  };
}
function en(t) {
  let e, n;
  return e = new gt({
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*item*/
      1 && (s.name = /*item*/
      l[0].id), i & /*item*/
      1 && (s.icon = /*item*/
      l[0].icon), i & /*item*/
      1 && (s.max = /*item*/
      l[0].max), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function tn(t) {
  let e, n, l, i;
  return {
    c() {
      e = v("textarea"), _(e, "name", n = /*item*/
      t[0].id), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(s, o) {
      T(s, e, o), l || (i = P(
        e,
        "input",
        /*handleChange*/
        t[4]
      ), l = !0);
    },
    p(s, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      s[0].id) && _(e, "name", n);
    },
    i: j,
    o: j,
    d(s) {
      s && y(e), l = !1, i();
    }
  };
}
function nn(t) {
  let e, n, l, i;
  return {
    c() {
      e = v("input"), _(e, "type", "text"), _(e, "name", n = /*item*/
      t[0].id), _(e, "class", "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500");
    },
    m(s, o) {
      T(s, e, o), l || (i = P(
        e,
        "input",
        /*handleChange*/
        t[4]
      ), l = !0);
    },
    p(s, o) {
      o & /*item*/
      1 && n !== (n = /*item*/
      s[0].id) && _(e, "name", n);
    },
    i: j,
    o: j,
    d(s) {
      s && y(e), l = !1, i();
    }
  };
}
function ln(t) {
  let e, n, l = V(
    /*item*/
    t[0].choices
  ), i = [];
  for (let o = 0; o < l.length; o += 1)
    i[o] = Je(Be(t, l, o));
  const s = (o) => S(i[o], 1, 1, () => {
    i[o] = null;
  });
  return {
    c() {
      for (let o = 0; o < i.length; o += 1)
        i[o].c();
      e = me();
    },
    m(o, r) {
      for (let a = 0; a < i.length; a += 1)
        i[a] && i[a].m(o, r);
      T(o, e, r), n = !0;
    },
    p(o, r) {
      if (r & /*item, lang, translations, handleChange, setChoice*/
      31) {
        l = V(
          /*item*/
          o[0].choices
        );
        let a;
        for (a = 0; a < l.length; a += 1) {
          const u = Be(o, l, a);
          i[a] ? (i[a].p(u, r), w(i[a], 1)) : (i[a] = Je(u), i[a].c(), w(i[a], 1), i[a].m(e.parentNode, e));
        }
        for (Q(), a = l.length; a < i.length; a += 1)
          s(a);
        W();
      }
    },
    i(o) {
      if (!n) {
        for (let r = 0; r < l.length; r += 1)
          w(i[r]);
        n = !0;
      }
    },
    o(o) {
      i = i.filter(Boolean);
      for (let r = 0; r < i.length; r += 1)
        S(i[r]);
      n = !1;
    },
    d(o) {
      o && y(e), ee(i, o);
    }
  };
}
function sn(t) {
  let e, n, l = V(
    /*item*/
    t[0].choices
  ), i = [];
  for (let o = 0; o < l.length; o += 1)
    i[o] = Ke(Oe(t, l, o));
  const s = (o) => S(i[o], 1, 1, () => {
    i[o] = null;
  });
  return {
    c() {
      for (let o = 0; o < i.length; o += 1)
        i[o].c();
      e = me();
    },
    m(o, r) {
      for (let a = 0; a < i.length; a += 1)
        i[a] && i[a].m(o, r);
      T(o, e, r), n = !0;
    },
    p(o, r) {
      if (r & /*item, lang, translations, handleChange*/
      29) {
        l = V(
          /*item*/
          o[0].choices
        );
        let a;
        for (a = 0; a < l.length; a += 1) {
          const u = Oe(o, l, a);
          i[a] ? (i[a].p(u, r), w(i[a], 1)) : (i[a] = Ke(u), i[a].c(), w(i[a], 1), i[a].m(e.parentNode, e));
        }
        for (Q(), a = l.length; a < i.length; a += 1)
          s(a);
        W();
      }
    },
    i(o) {
      if (!n) {
        for (let r = 0; r < l.length; r += 1)
          w(i[r]);
        n = !0;
      }
    },
    o(o) {
      i = i.filter(Boolean);
      for (let r = 0; r < i.length; r += 1)
        S(i[r]);
      n = !1;
    },
    d(o) {
      o && y(e), ee(i, o);
    }
  };
}
function Me(t) {
  let e, n = (
    /*col*/
    t[17] + ""
  ), l;
  return {
    c() {
      e = v("th"), l = M(n), _(e, "class", "p-2 text-center border-b");
    },
    m(i, s) {
      T(i, e, s), $(e, l);
    },
    p(i, s) {
      s & /*item*/
      1 && n !== (n = /*col*/
      i[17] + "") && X(l, n);
    },
    d(i) {
      i && y(e);
    }
  };
}
function De(t) {
  let e, n, l, i, s, o, r, a;
  return {
    c() {
      e = v("td"), n = v("label"), l = v("input"), _(l, "type", i = /*item*/
      t[0].type === "grid" ? "radio" : "checkbox"), _(l, "name", s = Ie(
        /*item*/
        t[0].id,
        /*row*/
        t[14]
      )), l.value = o = /*col*/
      t[17], _(l, "class", "h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"), _(n, "class", "flex items-center justify-center cursor-pointer"), _(e, "class", "p-2 text-center");
    },
    m(u, c) {
      T(u, e, c), $(e, n), $(n, l), r || (a = P(
        l,
        "change",
        /*handleChange*/
        t[4]
      ), r = !0);
    },
    p(u, c) {
      c & /*item*/
      1 && i !== (i = /*item*/
      u[0].type === "grid" ? "radio" : "checkbox") && _(l, "type", i), c & /*item*/
      1 && s !== (s = Ie(
        /*item*/
        u[0].id,
        /*row*/
        u[14]
      )) && _(l, "name", s), c & /*item*/
      1 && o !== (o = /*col*/
      u[17]) && l.value !== o && (l.value = o);
    },
    d(u) {
      u && y(e), r = !1, a();
    }
  };
}
function He(t) {
  let e, n, l = (
    /*row*/
    t[14] + ""
  ), i, s, o, r = V(
    /*item*/
    t[0].columns
  ), a = [];
  for (let u = 0; u < r.length; u += 1)
    a[u] = De(je(t, r, u));
  return {
    c() {
      e = v("tr"), n = v("th"), i = M(l), s = I();
      for (let u = 0; u < a.length; u += 1)
        a[u].c();
      o = I(), _(n, "class", "p-2 text-left font-medium"), _(e, "class", "border-b hover:bg-gray-50");
    },
    m(u, c) {
      T(u, e, c), $(e, n), $(n, i), $(e, s);
      for (let f = 0; f < a.length; f += 1)
        a[f] && a[f].m(e, null);
      $(e, o);
    },
    p(u, c) {
      if (c & /*item*/
      1 && l !== (l = /*row*/
      u[14] + "") && X(i, l), c & /*item, handleChange*/
      17) {
        r = V(
          /*item*/
          u[0].columns
        );
        let f;
        for (f = 0; f < r.length; f += 1) {
          const p = je(u, r, f);
          a[f] ? a[f].p(p, c) : (a[f] = De(p), a[f].c(), a[f].m(e, o));
        }
        for (; f < a.length; f += 1)
          a[f].d(1);
        a.length = r.length;
      }
    },
    d(u) {
      u && y(e), ee(a, u);
    }
  };
}
function Ve(t) {
  let e, n = (
    /*choice*/
    t[7] + ""
  ), l, i;
  return {
    c() {
      e = v("option"), l = M(n), e.__value = i = /*choice*/
      t[7], be(e, e.__value);
    },
    m(s, o) {
      T(s, e, o), $(e, l);
    },
    p(s, o) {
      o & /*item*/
      1 && n !== (n = /*choice*/
      s[7] + "") && X(l, n), o & /*item*/
      1 && i !== (i = /*choice*/
      s[7]) && (e.__value = i, be(e, e.__value));
    },
    d(s) {
      s && y(e);
    }
  };
}
function Je(t) {
  let e, n, l, i, s, o, r, a, u, c, f;
  function p(...g) {
    return (
      /*change_handler*/
      t[6](
        /*idx*/
        t[11],
        ...g
      )
    );
  }
  return r = new K({
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
      e = v("label"), n = v("input"), s = I(), o = v("span"), D(r.$$.fragment), a = I(), _(n, "type", "radio"), _(n, "name", l = /*item*/
      t[0].id), n.value = i = /*choice*/
      t[7], _(n, "class", "h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"), _(o, "class", "text-gray-800"), _(e, "class", "flex items-center space-x-2");
    },
    m(g, d) {
      T(g, e, d), $(e, n), $(e, s), $(e, o), z(r, o, null), $(e, a), u = !0, c || (f = P(n, "change", p), c = !0);
    },
    p(g, d) {
      t = g, (!u || d & /*item*/
      1 && l !== (l = /*item*/
      t[0].id)) && _(n, "name", l), (!u || d & /*item*/
      1 && i !== (i = /*choice*/
      t[7])) && (n.value = i);
      const E = {};
      d & /*item*/
      1 && (E.text = /*choice*/
      t[7]), d & /*lang*/
      4 && (E.lang = /*lang*/
      t[2]), d & /*translations*/
      8 && (E.translations = /*translations*/
      t[3]), r.$set(E);
    },
    i(g) {
      u || (w(r.$$.fragment, g), u = !0);
    },
    o(g) {
      S(r.$$.fragment, g), u = !1;
    },
    d(g) {
      g && y(e), B(r), c = !1, f();
    }
  };
}
function Ke(t) {
  let e, n, l, i, s, o, r, a, u, c, f;
  return r = new K({
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
      e = v("label"), n = v("input"), s = I(), o = v("span"), D(r.$$.fragment), a = I(), _(n, "type", "checkbox"), _(n, "name", l = /*item*/
      t[0].id), n.value = i = /*choice*/
      t[7], _(n, "class", "h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"), _(o, "class", "text-gray-800"), _(e, "class", "flex items-center space-x-2");
    },
    m(p, g) {
      T(p, e, g), $(e, n), $(e, s), $(e, o), z(r, o, null), $(e, a), u = !0, c || (f = P(
        n,
        "change",
        /*handleChange*/
        t[4]
      ), c = !0);
    },
    p(p, g) {
      (!u || g & /*item*/
      1 && l !== (l = /*item*/
      p[0].id)) && _(n, "name", l), (!u || g & /*item*/
      1 && i !== (i = /*choice*/
      p[7])) && (n.value = i);
      const d = {};
      g & /*item*/
      1 && (d.text = /*choice*/
      p[7]), g & /*lang*/
      4 && (d.lang = /*lang*/
      p[2]), g & /*translations*/
      8 && (d.translations = /*translations*/
      p[3]), r.$set(d);
    },
    i(p) {
      u || (w(r.$$.fragment, p), u = !0);
    },
    o(p) {
      S(r.$$.fragment, p), u = !1;
    },
    d(p) {
      p && y(e), B(r), c = !1, f();
    }
  };
}
function on(t) {
  let e, n, l, i, s, o, r, a;
  l = new K({
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
    t[0].description && Re(t)
  );
  const c = [
    sn,
    ln,
    nn,
    tn,
    en,
    xt,
    Zt,
    Yt,
    Xt,
    Wt,
    Qt,
    Kt
  ], f = [];
  function p(g, d) {
    return (
      /*item*/
      g[0].type === "checkbox" ? 0 : (
        /*item*/
        g[0].type === "multipleChoice" ? 1 : (
          /*item*/
          g[0].type === "text" ? 2 : (
            /*item*/
            g[0].type === "paragraph" ? 3 : (
              /*item*/
              g[0].type == "rating" ? 4 : (
                /*item*/
                g[0].type == "scale" ? 5 : (
                  /*item*/
                  g[0].type == "list" ? 6 : (
                    /*item*/
                    g[0].type == "date" ? 7 : (
                      /*item*/
                      g[0].type == "time" ? 8 : (
                        /*item*/
                        g[0].type == "datetime" ? 9 : (
                          /*item*/
                          g[0].type == "duration" ? 10 : (
                            /*item*/
                            g[0].type === "grid" || /*item*/
                            g[0].type === "checkboxGrid" ? 11 : -1
                          )
                        )
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
  return ~(o = p(t)) && (r = f[o] = c[o](t)), {
    c() {
      e = v("div"), n = v("h3"), D(l.$$.fragment), i = I(), u && u.c(), s = I(), r && r.c(), _(n, "class", "text-lg font-semibold"), _(e, "class", "mb-6");
    },
    m(g, d) {
      T(g, e, d), $(e, n), z(l, n, null), $(e, i), u && u.m(e, null), $(e, s), ~o && f[o].m(e, null), a = !0;
    },
    p(g, [d]) {
      const E = {};
      d & /*item*/
      1 && (E.text = /*item*/
      g[0].title), d & /*lang*/
      4 && (E.lang = /*lang*/
      g[2]), d & /*translations*/
      8 && (E.translations = /*translations*/
      g[3]), l.$set(E), /*item*/
      g[0].description ? u ? (u.p(g, d), d & /*item*/
      1 && w(u, 1)) : (u = Re(g), u.c(), w(u, 1), u.m(e, s)) : u && (Q(), S(u, 1, 1, () => {
        u = null;
      }), W());
      let C = o;
      o = p(g), o === C ? ~o && f[o].p(g, d) : (r && (Q(), S(f[C], 1, 1, () => {
        f[C] = null;
      }), W()), ~o ? (r = f[o], r ? r.p(g, d) : (r = f[o] = c[o](g), r.c()), w(r, 1), r.m(e, null)) : r = null);
    },
    i(g) {
      a || (w(l.$$.fragment, g), w(u), w(r), a = !0);
    },
    o(g) {
      S(l.$$.fragment, g), S(u), S(r), a = !1;
    },
    d(g) {
      g && y(e), B(l), u && u.d(), ~o && f[o].d();
    }
  };
}
function rn(t, e, n) {
  let { item: l } = e, { onInputChange: i } = e, { setChoice: s } = e, { lang: o = "en" } = e, { translations: r = {} } = e;
  function a(c) {
    i(l.id, c.target.value);
  }
  const u = (c, f) => {
    a(f), s(l, c);
  };
  return t.$$set = (c) => {
    "item" in c && n(0, l = c.item), "onInputChange" in c && n(5, i = c.onInputChange), "setChoice" in c && n(1, s = c.setChoice), "lang" in c && n(2, o = c.lang), "translations" in c && n(3, r = c.translations);
  }, t.$$.update = () => {
    t.$$.dirty & /*item*/
    1 && console.log("Render item: ", l);
  }, [
    l,
    s,
    o,
    r,
    a,
    i,
    u
  ];
}
class ht extends ae {
  constructor(e) {
    super(), oe(this, e, rn, on, se, {
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
    this.$$set({ item: e }), L();
  }
  get onInputChange() {
    return this.$$.ctx[5];
  }
  set onInputChange(e) {
    this.$$set({ onInputChange: e }), L();
  }
  get setChoice() {
    return this.$$.ctx[1];
  }
  set setChoice(e) {
    this.$$set({ setChoice: e }), L();
  }
  get lang() {
    return this.$$.ctx[2];
  }
  set lang(e) {
    this.$$set({ lang: e }), L();
  }
  get translations() {
    return this.$$.ctx[3];
  }
  set translations(e) {
    this.$$set({ translations: e }), L();
  }
}
re(ht, { item: {}, onInputChange: {}, setChoice: {}, lang: {}, translations: {} }, [], [], !0);
function an(t) {
  $e(t, "svelte-15bryam", ".page.svelte-15bryam{display:none}.page.active.svelte-15bryam{display:block}");
}
function Qe(t, e, n) {
  const l = t.slice();
  return l[15] = e[n], l;
}
function We(t) {
  let e, n = (
    /*page*/
    t[0].title + ""
  ), l;
  return {
    c() {
      e = v("h2"), l = M(n), _(e, "class", "text-2xl font-semibold");
    },
    m(i, s) {
      T(i, e, s), $(e, l);
    },
    p(i, s) {
      s & /*page*/
      1 && n !== (n = /*page*/
      i[0].title + "") && X(l, n);
    },
    d(i) {
      i && y(e);
    }
  };
}
function Xe(t) {
  let e, n = (
    /*page*/
    t[0].description + ""
  ), l;
  return {
    c() {
      e = v("p"), l = M(n), _(e, "class", "text-gray-600 mb-4");
    },
    m(i, s) {
      T(i, e, s), $(e, l);
    },
    p(i, s) {
      s & /*page*/
      1 && n !== (n = /*page*/
      i[0].description + "") && X(l, n);
    },
    d(i) {
      i && y(e);
    }
  };
}
function Ye(t) {
  let e, n = (
    /*formErrors*/
    t[8][
      /*item*/
      t[15].id
    ] + ""
  ), l;
  return {
    c() {
      e = v("p"), l = M(n), _(e, "class", "text-red-500 text-sm");
    },
    m(i, s) {
      T(i, e, s), $(e, l);
    },
    p(i, s) {
      s & /*formErrors, page*/
      257 && n !== (n = /*formErrors*/
      i[8][
        /*item*/
        i[15].id
      ] + "") && X(l, n);
    },
    d(i) {
      i && y(e);
    }
  };
}
function Ze(t) {
  let e, n, l, i;
  e = new ht({
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
  let s = (
    /*formErrors*/
    t[8][
      /*item*/
      t[15].id
    ] && Ye(t)
  );
  return {
    c() {
      D(e.$$.fragment), n = I(), s && s.c(), l = me();
    },
    m(o, r) {
      z(e, o, r), T(o, n, r), s && s.m(o, r), T(o, l, r), i = !0;
    },
    p(o, r) {
      const a = {};
      r & /*page*/
      1 && (a.item = /*item*/
      o[15]), r & /*lang*/
      32 && (a.lang = /*lang*/
      o[5]), r & /*translations*/
      64 && (a.translations = /*translations*/
      o[6]), e.$set(a), /*formErrors*/
      o[8][
        /*item*/
        o[15].id
      ] ? s ? s.p(o, r) : (s = Ye(o), s.c(), s.m(l.parentNode, l)) : s && (s.d(1), s = null);
    },
    i(o) {
      i || (w(e.$$.fragment, o), i = !0);
    },
    o(o) {
      S(e.$$.fragment, o), i = !1;
    },
    d(o) {
      o && (y(n), y(l)), B(e, o), s && s.d(o);
    }
  };
}
function xe(t) {
  let e, n, l, i, s;
  return n = new K({
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
      e = v("button"), D(n.$$.fragment), _(e, "class", "px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition");
    },
    m(o, r) {
      T(o, e, r), z(n, e, null), l = !0, i || (s = P(e, "click", ut(function() {
        ye(
          /*onBack*/
          t[4]
        ) && t[4].apply(this, arguments);
      })), i = !0);
    },
    p(o, r) {
      t = o;
      const a = {};
      r & /*lang*/
      32 && (a.lang = /*lang*/
      t[5]), r & /*translations*/
      64 && (a.translations = /*translations*/
      t[6]), n.$set(a);
    },
    i(o) {
      l || (w(n.$$.fragment, o), l = !0);
    },
    o(o) {
      S(n.$$.fragment, o), l = !1;
    },
    d(o) {
      o && y(e), B(n), i = !1, s();
    }
  };
}
function un(t) {
  let e, n;
  return e = new K({
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*lang*/
      32 && (s.lang = /*lang*/
      l[5]), i & /*translations*/
      64 && (s.translations = /*translations*/
      l[6]), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function fn(t) {
  let e, n;
  return e = new K({
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*lang*/
      32 && (s.lang = /*lang*/
      l[5]), i & /*translations*/
      64 && (s.translations = /*translations*/
      l[6]), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function cn(t) {
  let e, n;
  return e = new K({
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*lang*/
      32 && (s.lang = /*lang*/
      l[5]), i & /*translations*/
      64 && (s.translations = /*translations*/
      l[6]), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function mn(t) {
  let e, n, l, i, s, o, r, a, u, c, f, p, g = (
    /*page*/
    t[0].title && We(t)
  ), d = (
    /*page*/
    t[0].description && Xe(t)
  ), E = V(
    /*page*/
    t[0].items
  ), C = [];
  for (let m = 0; m < E.length; m += 1)
    C[m] = Ze(Qe(t, E, m));
  const G = (m) => S(C[m], 1, 1, () => {
    C[m] = null;
  });
  let b = !/*isFirst*/
  t[2] && xe(t);
  const A = [cn, fn, un], F = [];
  function k(m, h) {
    return (
      /*isSubmitting*/
      m[3] ? 0 : (
        /*nextPageId*/
        m[7] === "submit" ? 1 : 2
      )
    );
  }
  return a = k(t), u = F[a] = A[a](t), {
    c() {
      e = v("div"), g && g.c(), n = I(), d && d.c(), l = I();
      for (let m = 0; m < C.length; m += 1)
        C[m].c();
      i = I(), s = v("div"), b && b.c(), o = I(), r = v("button"), u.c(), _(r, "class", "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"), r.disabled = /*isSubmitting*/
      t[3], _(s, "class", "flex justify-between mt-6"), _(e, "class", "max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md page svelte-15bryam"), Z(
        e,
        "active",
        /*isActive*/
        t[1]
      );
    },
    m(m, h) {
      T(m, e, h), g && g.m(e, null), $(e, n), d && d.m(e, null), $(e, l);
      for (let q = 0; q < C.length; q += 1)
        C[q] && C[q].m(e, null);
      $(e, i), $(e, s), b && b.m(s, null), $(s, o), $(s, r), F[a].m(r, null), c = !0, f || (p = P(r, "click", ut(
        /*handleNext*/
        t[11]
      )), f = !0);
    },
    p(m, [h]) {
      if (/*page*/
      m[0].title ? g ? g.p(m, h) : (g = We(m), g.c(), g.m(e, n)) : g && (g.d(1), g = null), /*page*/
      m[0].description ? d ? d.p(m, h) : (d = Xe(m), d.c(), d.m(e, l)) : d && (d.d(1), d = null), h & /*formErrors, page, onInputChange, setChoice, lang, translations*/
      1889) {
        E = V(
          /*page*/
          m[0].items
        );
        let N;
        for (N = 0; N < E.length; N += 1) {
          const O = Qe(m, E, N);
          C[N] ? (C[N].p(O, h), w(C[N], 1)) : (C[N] = Ze(O), C[N].c(), w(C[N], 1), C[N].m(e, i));
        }
        for (Q(), N = E.length; N < C.length; N += 1)
          G(N);
        W();
      }
      /*isFirst*/
      m[2] ? b && (Q(), S(b, 1, 1, () => {
        b = null;
      }), W()) : b ? (b.p(m, h), h & /*isFirst*/
      4 && w(b, 1)) : (b = xe(m), b.c(), w(b, 1), b.m(s, o));
      let q = a;
      a = k(m), a === q ? F[a].p(m, h) : (Q(), S(F[q], 1, 1, () => {
        F[q] = null;
      }), W(), u = F[a], u ? u.p(m, h) : (u = F[a] = A[a](m), u.c()), w(u, 1), u.m(r, null)), (!c || h & /*isSubmitting*/
      8) && (r.disabled = /*isSubmitting*/
      m[3]), (!c || h & /*isActive*/
      2) && Z(
        e,
        "active",
        /*isActive*/
        m[1]
      );
    },
    i(m) {
      if (!c) {
        for (let h = 0; h < E.length; h += 1)
          w(C[h]);
        w(b), w(u), c = !0;
      }
    },
    o(m) {
      C = C.filter(Boolean);
      for (let h = 0; h < C.length; h += 1)
        S(C[h]);
      S(b), S(u), c = !1;
    },
    d(m) {
      m && y(e), g && g.d(), d && d.d(), ee(C, m), b && b.d(), F[a].d(), f = !1, p();
    }
  };
}
function gn(t, e, n) {
  let { page: l } = e, { isActive: i = !1 } = e, { isFirst: s = !1 } = e, { isSubmitting: o = !1 } = e, { onBack: r } = e, { onGoto: a } = e, { lang: u = "en" } = e, { translations: c = {} } = e, f = l.defaultNextPage, p = {}, g = {};
  function d(b, A) {
    b.choicesNavigation && b.choicesNavigation[A] && n(7, f = b.choicesNavigation[A].type === "page" ? b.choicesNavigation[A].id : "submit");
  }
  function E(b, A) {
    p[b] = A, n(8, g[b] = "", g);
  }
  function C() {
    let b = !0;
    n(8, g = {});
    for (let A of l.items)
      A.required && (!p[A.id] || p[A.id].length === 0) && (n(8, g[A.id] = ct("This field is required.", c, u), g), b = !1);
    return b;
  }
  function G() {
    if (!C()) {
      console.log("Validation failed", g);
      return;
    }
    a(f);
  }
  return t.$$set = (b) => {
    "page" in b && n(0, l = b.page), "isActive" in b && n(1, i = b.isActive), "isFirst" in b && n(2, s = b.isFirst), "isSubmitting" in b && n(3, o = b.isSubmitting), "onBack" in b && n(4, r = b.onBack), "onGoto" in b && n(12, a = b.onGoto), "lang" in b && n(5, u = b.lang), "translations" in b && n(6, c = b.translations);
  }, [
    l,
    i,
    s,
    o,
    r,
    u,
    c,
    f,
    g,
    d,
    E,
    G,
    a
  ];
}
class dt extends ae {
  constructor(e) {
    super(), oe(
      this,
      e,
      gn,
      mn,
      se,
      {
        page: 0,
        isActive: 1,
        isFirst: 2,
        isSubmitting: 3,
        onBack: 4,
        onGoto: 12,
        lang: 5,
        translations: 6
      },
      an
    );
  }
  get page() {
    return this.$$.ctx[0];
  }
  set page(e) {
    this.$$set({ page: e }), L();
  }
  get isActive() {
    return this.$$.ctx[1];
  }
  set isActive(e) {
    this.$$set({ isActive: e }), L();
  }
  get isFirst() {
    return this.$$.ctx[2];
  }
  set isFirst(e) {
    this.$$set({ isFirst: e }), L();
  }
  get isSubmitting() {
    return this.$$.ctx[3];
  }
  set isSubmitting(e) {
    this.$$set({ isSubmitting: e }), L();
  }
  get onBack() {
    return this.$$.ctx[4];
  }
  set onBack(e) {
    this.$$set({ onBack: e }), L();
  }
  get onGoto() {
    return this.$$.ctx[12];
  }
  set onGoto(e) {
    this.$$set({ onGoto: e }), L();
  }
  get lang() {
    return this.$$.ctx[5];
  }
  set lang(e) {
    this.$$set({ lang: e }), L();
  }
  get translations() {
    return this.$$.ctx[6];
  }
  set translations(e) {
    this.$$set({ translations: e }), L();
  }
}
re(dt, { page: {}, isActive: { type: "Boolean" }, isFirst: { type: "Boolean" }, isSubmitting: { type: "Boolean" }, onBack: {}, onGoto: {}, lang: {}, translations: {} }, [], [], !0);
function et(t, e, n) {
  const l = t.slice();
  return l[26] = e[n], l;
}
function tt(t) {
  let e, n, l, i, s, o, r, a, u, c, f, p, g, d, E, C;
  e = new mt({
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
  }), s = new K({
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
  }), u = new K({
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
  let G = V(
    /*pages*/
    t[6]
  ), b = [];
  for (let m = 0; m < G.length; m += 1)
    b[m] = nt(et(t, G, m));
  const A = (m) => S(b[m], 1, 1, () => {
    b[m] = null;
  });
  let F = (
    /*submissionError*/
    t[10] && lt(t)
  ), k = (
    /*submitted*/
    t[9] && it(t)
  );
  return {
    c() {
      D(e.$$.fragment), n = I(), l = v("form"), i = v("h1"), D(s.$$.fragment), o = I(), r = v("a"), a = M("("), D(u.$$.fragment), c = M(")"), p = I();
      for (let m = 0; m < b.length; m += 1)
        b[m].c();
      g = I(), F && F.c(), d = I(), k && k.c(), E = me(), _(i, "class", "text-3xl font-semibold"), _(r, "class", "text-blue-600 hover:underline text-xs"), _(r, "href", f = /*form*/
      t[1].publishedUrl), Z(
        l,
        "hidden",
        /*submitted*/
        t[9]
      );
    },
    m(m, h) {
      z(e, m, h), T(m, n, h), T(m, l, h), $(l, i), z(s, i, null), $(l, o), $(l, r), $(r, a), z(u, r, null), $(r, c), $(l, p);
      for (let q = 0; q < b.length; q += 1)
        b[q] && b[q].m(l, null);
      t[21](l), T(m, g, h), F && F.m(m, h), T(m, d, h), k && k.m(m, h), T(m, E, h), C = !0;
    },
    p(m, h) {
      const q = {};
      h & /*translations*/
      4 && (q.translations = /*translations*/
      m[2]), h & /*form*/
      2 && (q.form = /*form*/
      m[1]), e.$set(q);
      const N = {};
      h & /*form*/
      2 && (N.text = /*form*/
      m[1].title), h & /*lang*/
      1 && (N.lang = /*lang*/
      m[0]), h & /*translations*/
      4 && (N.translations = /*translations*/
      m[2]), s.$set(N);
      const O = {};
      if (h & /*lang*/
      1 && (O.lang = /*lang*/
      m[0]), h & /*translations*/
      4 && (O.translations = /*translations*/
      m[2]), u.$set(O), (!C || h & /*form*/
      2 && f !== (f = /*form*/
      m[1].publishedUrl)) && _(r, "href", f), h & /*pageHistory, currentPageId, pages, submitting, lang, translations, goBack, nextPageOrSubmit*/
      53701) {
        G = V(
          /*pages*/
          m[6]
        );
        let H;
        for (H = 0; H < G.length; H += 1) {
          const U = et(m, G, H);
          b[H] ? (b[H].p(U, h), w(b[H], 1)) : (b[H] = nt(U), b[H].c(), w(b[H], 1), b[H].m(l, null));
        }
        for (Q(), H = G.length; H < b.length; H += 1)
          A(H);
        W();
      }
      (!C || h & /*submitted*/
      512) && Z(
        l,
        "hidden",
        /*submitted*/
        m[9]
      ), /*submissionError*/
      m[10] ? F ? (F.p(m, h), h & /*submissionError*/
      1024 && w(F, 1)) : (F = lt(m), F.c(), w(F, 1), F.m(d.parentNode, d)) : F && (Q(), S(F, 1, 1, () => {
        F = null;
      }), W()), /*submitted*/
      m[9] ? k ? (k.p(m, h), h & /*submitted*/
      512 && w(k, 1)) : (k = it(m), k.c(), w(k, 1), k.m(E.parentNode, E)) : k && (Q(), S(k, 1, 1, () => {
        k = null;
      }), W());
    },
    i(m) {
      if (!C) {
        w(e.$$.fragment, m), w(s.$$.fragment, m), w(u.$$.fragment, m);
        for (let h = 0; h < G.length; h += 1)
          w(b[h]);
        w(F), w(k), C = !0;
      }
    },
    o(m) {
      S(e.$$.fragment, m), S(s.$$.fragment, m), S(u.$$.fragment, m), b = b.filter(Boolean);
      for (let h = 0; h < b.length; h += 1)
        S(b[h]);
      S(F), S(k), C = !1;
    },
    d(m) {
      m && (y(n), y(l), y(g), y(d), y(E)), B(e, m), B(s), B(u), ee(b, m), t[21](null), F && F.d(m), k && k.d(m);
    }
  };
}
function nt(t) {
  let e, n;
  return e = new dt({
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*pageHistory*/
      4096 && (s.isFirst = /*pageHistory*/
      l[12].length === 0), i & /*currentPageId, pages*/
      192 && (s.isActive = /*currentPageId*/
      l[7] === /*page*/
      l[26].id), i & /*submitting*/
      256 && (s.isSubmitting = /*submitting*/
      l[8]), i & /*pages*/
      64 && (s.page = /*page*/
      l[26]), i & /*lang*/
      1 && (s.lang = /*lang*/
      l[0]), i & /*translations*/
      4 && (s.translations = /*translations*/
      l[2]), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function lt(t) {
  let e, n, l;
  return n = new K({
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
      e = v("div"), D(n.$$.fragment), _(e, "class", "text-red-600");
    },
    m(i, s) {
      T(i, e, s), z(n, e, null), l = !0;
    },
    p(i, s) {
      const o = {};
      s & /*submissionError*/
      1024 && (o.text = /*submissionError*/
      i[10]), s & /*lang*/
      1 && (o.lang = /*lang*/
      i[0]), s & /*translations*/
      4 && (o.translations = /*translations*/
      i[2]), n.$set(o);
    },
    i(i) {
      l || (w(n.$$.fragment, i), l = !0);
    },
    o(i) {
      S(n.$$.fragment, i), l = !1;
    },
    d(i) {
      i && y(e), B(n);
    }
  };
}
function it(t) {
  let e, n, l, i, s, o, r = (
    /*editResponseUrl*/
    t[11] && st(t)
  ), a = (
    /*allowPostAgain*/
    t[4] && ot(t)
  );
  return {
    c() {
      e = v("div"), n = v("h2"), l = M(
        /*postedMessage*/
        t[3]
      ), i = I(), r && r.c(), s = I(), a && a.c(), _(n, "class", "text-2xl font-semibold text-green-600"), _(e, "class", "text-center p-6 border border-gray-300 rounded-md shadow-md");
    },
    m(u, c) {
      T(u, e, c), $(e, n), $(n, l), $(e, i), r && r.m(e, null), $(e, s), a && a.m(e, null), o = !0;
    },
    p(u, c) {
      (!o || c & /*postedMessage*/
      8) && X(
        l,
        /*postedMessage*/
        u[3]
      ), /*editResponseUrl*/
      u[11] ? r ? (r.p(u, c), c & /*editResponseUrl*/
      2048 && w(r, 1)) : (r = st(u), r.c(), w(r, 1), r.m(e, s)) : r && (Q(), S(r, 1, 1, () => {
        r = null;
      }), W()), /*allowPostAgain*/
      u[4] ? a ? (a.p(u, c), c & /*allowPostAgain*/
      16 && w(a, 1)) : (a = ot(u), a.c(), w(a, 1), a.m(e, null)) : a && (Q(), S(a, 1, 1, () => {
        a = null;
      }), W());
    },
    i(u) {
      o || (w(r), w(a), o = !0);
    },
    o(u) {
      S(r), S(a), o = !1;
    },
    d(u) {
      u && y(e), r && r.d(), a && a.d();
    }
  };
}
function st(t) {
  let e, n, l, i;
  return l = new K({
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
      e = v("p"), n = v("a"), D(l.$$.fragment), _(
        n,
        "href",
        /*editResponseUrl*/
        t[11]
      ), _(n, "target", "_blank"), _(n, "class", "text-blue-500 underline hover:text-blue-700"), _(e, "class", "mt-2");
    },
    m(s, o) {
      T(s, e, o), $(e, n), z(l, n, null), i = !0;
    },
    p(s, o) {
      const r = {};
      o & /*lang*/
      1 && (r.lang = /*lang*/
      s[0]), o & /*translations*/
      4 && (r.translations = /*translations*/
      s[2]), l.$set(r), (!i || o & /*editResponseUrl*/
      2048) && _(
        n,
        "href",
        /*editResponseUrl*/
        s[11]
      );
    },
    i(s) {
      i || (w(l.$$.fragment, s), i = !0);
    },
    o(s) {
      S(l.$$.fragment, s), i = !1;
    },
    d(s) {
      s && y(e), B(l);
    }
  };
}
function ot(t) {
  let e, n, l, i, s;
  return n = new K({
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
      e = v("button"), D(n.$$.fragment), _(e, "class", "mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600");
    },
    m(o, r) {
      T(o, e, r), z(n, e, null), l = !0, i || (s = P(
        e,
        "click",
        /*resetForm*/
        t[16]
      ), i = !0);
    },
    p(o, r) {
      const a = {};
      r & /*postAgainText*/
      32 && (a.text = /*postAgainText*/
      o[5]), r & /*lang*/
      1 && (a.lang = /*lang*/
      o[0]), r & /*translations*/
      4 && (a.translations = /*translations*/
      o[2]), n.$set(a);
    },
    i(o) {
      l || (w(n.$$.fragment, o), l = !0);
    },
    o(o) {
      S(n.$$.fragment, o), l = !1;
    },
    d(o) {
      o && y(e), B(n), i = !1, s();
    }
  };
}
function hn(t) {
  let e, n, l = (
    /*form*/
    t[1] && tt(t)
  );
  return {
    c() {
      l && l.c(), e = me();
    },
    m(i, s) {
      l && l.m(i, s), T(i, e, s), n = !0;
    },
    p(i, [s]) {
      /*form*/
      i[1] ? l ? (l.p(i, s), s & /*form*/
      2 && w(l, 1)) : (l = tt(i), l.c(), w(l, 1), l.m(e.parentNode, e)) : l && (Q(), S(l, 1, 1, () => {
        l = null;
      }), W());
    },
    i(i) {
      n || (w(l), n = !0);
    },
    o(i) {
      S(l), n = !1;
    },
    d(i) {
      i && y(e), l && l.d(i);
    }
  };
}
function dn(t, e) {
  const n = { id: e, items: {} };
  return t.forEach((l, i) => {
    n.items[i] !== void 0 ? (Array.isArray(n.items[i]) || (n.items[i] = [n.items[i]]), n.items[i].push(l)) : n.items[i] = l;
  }), n;
}
function _n(t, e, n) {
  let { form: l } = e, { translations: i = {} } = e, { postUrl: s = "" } = e, { postCallback: o = null } = e, { postedMessage: r = "Form submitted successfully!" } = e, { allowPostAgain: a = !0 } = e, { postAgainText: u = "Submit another response" } = e, c, f = !1, p = !1, g = "", d = "";
  function E(U) {
    var le;
    if (!U)
      return [];
    const R = [];
    let te = {
      id: "start",
      items: [],
      defaultNextPage: null
    };
    for (const J of U.items)
      J.type === "pageBreak" ? (R.push(te), te = {
        id: J.id,
        items: [],
        title: J.title || void 0,
        description: J.description || void 0,
        defaultNextPage: ((le = J.navigation) == null ? void 0 : le.id) || null
      }) : te.items.push(J);
    te.items.length > 0 && R.push(te);
    for (let J = 0; J < R.length - 1; J++)
      R[J].defaultNextPage || (R[J].defaultNextPage = R[J + 1].id);
    const ne = R[R.length - 1];
    return ne.defaultNextPage || (ne.defaultNextPage = "submit"), n(7, C = R[0].id), R;
  }
  let C, G = [];
  function b() {
    G.length > 0 && (n(7, C = G.pop()), n(12, G));
  }
  async function A() {
    n(8, f = !0), n(10, g = "");
    let U = new FormData(h);
    const R = crypto.randomUUID();
    let te = {
      ...dn(U, l.id),
      uuid: R
    };
    try {
      await fetch(s, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(te)
      });
    } catch (le) {
      console.warn("Expected CORS error, ignoring:", le);
    }
    let ne = await F(R);
    console.log("Final result:", ne), ne.success ? (n(9, p = !0), n(11, d = ne.editResponseUrl || "")) : n(10, g = "There was an error submitting the form."), n(8, f = !1);
  }
  async function F(U) {
    let R = 0;
    const te = 10, ne = (le) => new Promise((J) => setTimeout(J, le));
    for (; R < te; ) {
      console.log(`Checking form submission status (Attempt ${R + 1})`);
      let J = await (await fetch(`${s}?uuid=${U}`, { method: "GET" })).json();
      if (J.success || J.error)
        return J;
      await ne(1e3), R++;
    }
    return {
      success: !1,
      error: "Timeout while waiting for response"
    };
  }
  function k(U) {
    U == "submit" ? A() : (G.push(C), n(12, G), n(7, C = U));
  }
  function m() {
    n(9, p = !1), n(10, g = ""), n(11, d = ""), n(7, C = c[0].id), n(12, G = []), h.reset();
  }
  let h, { lang: q = "en" } = e;
  function N(U, R) {
    console.log("Language changed to", q, "using Google Translate?", R), n(0, q = U);
  }
  const O = (U) => {
    k(U);
  };
  function H(U) {
    Fe[U ? "unshift" : "push"](() => {
      h = U, n(13, h);
    });
  }
  return t.$$set = (U) => {
    "form" in U && n(1, l = U.form), "translations" in U && n(2, i = U.translations), "postUrl" in U && n(18, s = U.postUrl), "postCallback" in U && n(19, o = U.postCallback), "postedMessage" in U && n(3, r = U.postedMessage), "allowPostAgain" in U && n(4, a = U.allowPostAgain), "postAgainText" in U && n(5, u = U.postAgainText), "lang" in U && n(0, q = U.lang);
  }, t.$$.update = () => {
    var U;
    t.$$.dirty & /*form*/
    2 && n(6, c = E(l)), t.$$.dirty & /*pages, currentPageId*/
    192 && (U = c.find((R) => R.id === C)) != null && U.defaultNextPage;
  }, [
    q,
    l,
    i,
    r,
    a,
    u,
    c,
    C,
    f,
    p,
    g,
    d,
    G,
    h,
    b,
    k,
    m,
    N,
    s,
    o,
    O,
    H
  ];
}
class _t extends ae {
  constructor(e) {
    super(), oe(this, e, _n, hn, se, {
      form: 1,
      translations: 2,
      postUrl: 18,
      postCallback: 19,
      postedMessage: 3,
      allowPostAgain: 4,
      postAgainText: 5,
      lang: 0
    });
  }
  get form() {
    return this.$$.ctx[1];
  }
  set form(e) {
    this.$$set({ form: e }), L();
  }
  get translations() {
    return this.$$.ctx[2];
  }
  set translations(e) {
    this.$$set({ translations: e }), L();
  }
  get postUrl() {
    return this.$$.ctx[18];
  }
  set postUrl(e) {
    this.$$set({ postUrl: e }), L();
  }
  get postCallback() {
    return this.$$.ctx[19];
  }
  set postCallback(e) {
    this.$$set({ postCallback: e }), L();
  }
  get postedMessage() {
    return this.$$.ctx[3];
  }
  set postedMessage(e) {
    this.$$set({ postedMessage: e }), L();
  }
  get allowPostAgain() {
    return this.$$.ctx[4];
  }
  set allowPostAgain(e) {
    this.$$set({ allowPostAgain: e }), L();
  }
  get postAgainText() {
    return this.$$.ctx[5];
  }
  set postAgainText(e) {
    this.$$set({ postAgainText: e }), L();
  }
  get lang() {
    return this.$$.ctx[0];
  }
  set lang(e) {
    this.$$set({ lang: e }), L();
  }
}
re(_t, { form: {}, translations: {}, postUrl: {}, postCallback: {}, postedMessage: {}, allowPostAgain: { type: "Boolean" }, postAgainText: {}, lang: {} }, [], [], !0);
function rt(t) {
  let e, n;
  return e = new _t({
    props: {
      form: (
        /*data*/
        t[4]
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
      D(e.$$.fragment);
    },
    m(l, i) {
      z(e, l, i), n = !0;
    },
    p(l, i) {
      const s = {};
      i & /*data*/
      16 && (s.form = /*data*/
      l[4]), i & /*appsScriptUrl*/
      8 && (s.postUrl = /*appsScriptUrl*/
      l[3]), i & /*translations*/
      1 && (s.translations = /*translations*/
      l[0]), e.$set(s);
    },
    i(l) {
      n || (w(e.$$.fragment, l), n = !0);
    },
    o(l) {
      S(e.$$.fragment, l), n = !1;
    },
    d(l) {
      B(e, l);
    }
  };
}
function pn(t) {
  let e, n, l, i, s, o, r, a, u, c, f, p, g, d, E, C, G, b, A, F, k = (
    /*data*/
    t[4] && rt(t)
  );
  return {
    c() {
      e = v("div"), n = v("p"), l = M("FormsUrl: "), i = M(
        /*formsUrl*/
        t[1]
      ), s = I(), o = v("p"), r = M("FormsId: "), a = M(
        /*formsId*/
        t[2]
      ), u = I(), c = v("p"), f = M("AppsScriptUrl: "), p = M(
        /*appsScriptUrl*/
        t[3]
      ), g = I(), d = v("button"), E = M("Load"), C = I(), k && k.c(), G = me(), _(e, "class", "debug"), d.disabled = /*loading*/
      t[5], _(d, "class", "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded");
    },
    m(m, h) {
      T(m, e, h), $(e, n), $(n, l), $(n, i), $(e, s), $(e, o), $(o, r), $(o, a), $(e, u), $(e, c), $(c, f), $(c, p), T(m, g, h), T(m, d, h), $(d, E), T(m, C, h), k && k.m(m, h), T(m, G, h), b = !0, A || (F = P(
        d,
        "click",
        /*loadForm*/
        t[6]
      ), A = !0);
    },
    p(m, [h]) {
      (!b || h & /*formsUrl*/
      2) && X(
        i,
        /*formsUrl*/
        m[1]
      ), (!b || h & /*formsId*/
      4) && X(
        a,
        /*formsId*/
        m[2]
      ), (!b || h & /*appsScriptUrl*/
      8) && X(
        p,
        /*appsScriptUrl*/
        m[3]
      ), (!b || h & /*loading*/
      32) && (d.disabled = /*loading*/
      m[5]), /*data*/
      m[4] ? k ? (k.p(m, h), h & /*data*/
      16 && w(k, 1)) : (k = rt(m), k.c(), w(k, 1), k.m(G.parentNode, G)) : k && (Q(), S(k, 1, 1, () => {
        k = null;
      }), W());
    },
    i(m) {
      b || (w(k), b = !0);
    },
    o(m) {
      S(k), b = !1;
    },
    d(m) {
      m && (y(e), y(g), y(d), y(C), y(G)), k && k.d(m), A = !1, F();
    }
  };
}
function bn(t, e, n) {
  let { formsUrl: l = "" } = e, { formsId: i = "" } = e, { appsScriptUrl: s = "" } = e, { translations: o = {} } = e, { translationsUrl: r = "" } = e, a;
  async function u() {
    try {
      n(5, c = !0), console.log("Loading form from URL", l);
      var f = i ? `${s}?getFormData=1&formId=${encodeURIComponent(i)}` : `${s}?getFormData=1&formUrl=${encodeURIComponent(l)}`;
      const p = await fetch(f, { method: "GET", redirect: "follow" });
      if (!p.ok)
        throw new Error(`Failed to load form: ${p.statusText}`);
      n(4, a = await p.json()), console.log("Form Data Loaded:", a);
    } catch (p) {
      console.error("Error loading form from URL", f, p);
    } finally {
      n(5, c = !1);
    }
    if (r) {
      n(5, c = !0);
      try {
        const p = await fetch(r, { method: "GET", redirect: "follow" });
        if (!p.ok)
          throw new Error(`Failed to load translations: ${p.statusText}`);
        n(0, o = await p.json()), console.log("Translations Loaded:", o);
      } catch (p) {
        console.error("Error loading translations from URL", r, p);
      }
    }
  }
  let c = !1;
  return t.$$set = (f) => {
    "formsUrl" in f && n(1, l = f.formsUrl), "formsId" in f && n(2, i = f.formsId), "appsScriptUrl" in f && n(3, s = f.appsScriptUrl), "translations" in f && n(0, o = f.translations), "translationsUrl" in f && n(7, r = f.translationsUrl);
  }, [
    o,
    l,
    i,
    s,
    a,
    c,
    u,
    r
  ];
}
class $n extends ae {
  constructor(e) {
    super(), oe(this, e, bn, pn, se, {
      formsUrl: 1,
      formsId: 2,
      appsScriptUrl: 3,
      translations: 0,
      translationsUrl: 7
    });
  }
  get formsUrl() {
    return this.$$.ctx[1];
  }
  set formsUrl(e) {
    this.$$set({ formsUrl: e }), L();
  }
  get formsId() {
    return this.$$.ctx[2];
  }
  set formsId(e) {
    this.$$set({ formsId: e }), L();
  }
  get appsScriptUrl() {
    return this.$$.ctx[3];
  }
  set appsScriptUrl(e) {
    this.$$set({ appsScriptUrl: e }), L();
  }
  get translations() {
    return this.$$.ctx[0];
  }
  set translations(e) {
    this.$$set({ translations: e }), L();
  }
  get translationsUrl() {
    return this.$$.ctx[7];
  }
  set translationsUrl(e) {
    this.$$set({ translationsUrl: e }), L();
  }
}
re($n, { formsUrl: {}, formsId: {}, appsScriptUrl: {}, translations: {}, translationsUrl: {} }, [], [], !0);
export {
  $n as default
};
