var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (element_src === url)
    return true;
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
  return a != a ? b == b : a !== b;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node)
    return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function init_binding_group(group) {
  let _inputs;
  return {
    /* push */
    p(...inputs) {
      _inputs = inputs;
      _inputs.forEach((input) => group.push(input));
    },
    /* remove */
    r() {
      _inputs.forEach((input) => group.splice(group.indexOf(input), 1));
    }
  };
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data)
    return;
  text2.data = /** @type {string} */
  data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach(
    /** @param {Element} node */
    (node) => {
      result[node.slot || "default"] = true;
    }
  );
  return result;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal2, props, append_styles2 = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal: not_equal2,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      /** The Svelte component constructor */
      __publicField(this, "$$ctor");
      /** Slots */
      __publicField(this, "$$s");
      /** The Svelte component instance */
      __publicField(this, "$$c");
      /** Whether or not the custom element is connected */
      __publicField(this, "$$cn", false);
      /** Component props data */
      __publicField(this, "$$d", {});
      /** `true` if currently in the process of reflecting component props back to attributes */
      __publicField(this, "$$r", false);
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      __publicField(this, "$$p_d", {});
      /** @type {Record<string, Function[]>} Event listeners */
      __publicField(this, "$$l", {});
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
      }
    }
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot = function(name) {
          return () => {
            let node;
            const obj = {
              c: function create() {
                node = element("slot");
                if (name !== "default") {
                  attr(node, "name", name);
                }
              },
              /**
               * @param {HTMLElement} target
               * @param {HTMLElement} [anchor]
               */
              m: function mount(target, anchor) {
                insert(target, node, anchor);
              },
              d: function destroy(detaching) {
                if (detaching) {
                  detach(node);
                }
              }
            };
            return obj;
          };
        };
        await Promise.resolve();
        if (!this.$$cn || this.$$c) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            $$slots[name] = [create_slot(name)];
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        for (const key in this.$$p_d) {
          if (!(key in this.$$d) && this[key] !== void 0) {
            this.$$d[key] = this[key];
            delete this[key];
          }
        }
        this.$$c = new this.$$ctor({
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$scope: {
              ctx: []
            }
          }
        });
        const reflect_attributes = () => {
          this.$$r = true;
          for (const key in this.$$p_d) {
            this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
            if (this.$$p_d[key].reflect) {
              const attribute_value = get_custom_element_value(
                key,
                this.$$d[key],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key].attribute || key);
              } else {
                this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
              }
            }
          }
          this.$$r = false;
        };
        this.$$c.$$.after_update.push(reflect_attributes);
        reflect_attributes();
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    attributeChangedCallback(attr2, _oldValue, newValue) {
      var _a;
      if (this.$$r)
        return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      (_a = this.$$c) == null ? void 0 : _a.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$c = void 0;
        }
      });
    }
    $$g_p(attribute_name) {
      return Object.keys(this.$$p_d).find(
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop, value, props_definition, transform) {
  var _a;
  const type = (_a = props_definition[prop]) == null ? void 0 : _a.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
function create_custom_element(Component, props_definition, slots, accessors, use_shadow_dom, extend) {
  let Class = class extends SvelteElement {
    constructor() {
      super(Component, slots, use_shadow_dom);
      this.$$p_d = props_definition;
    }
    static get observedAttributes() {
      return Object.keys(props_definition).map(
        (key) => (props_definition[key].attribute || key).toLowerCase()
      );
    }
  };
  Object.keys(props_definition).forEach((prop) => {
    Object.defineProperty(Class.prototype, prop, {
      get() {
        return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
      },
      set(value) {
        var _a;
        value = get_custom_element_value(prop, value, props_definition);
        this.$$d[prop] = value;
        (_a = this.$$c) == null ? void 0 : _a.$set({ [prop]: value });
      }
    });
  });
  accessors.forEach((accessor) => {
    Object.defineProperty(Class.prototype, accessor, {
      get() {
        var _a;
        return (_a = this.$$c) == null ? void 0 : _a[accessor];
      }
    });
  });
  if (extend) {
    Class = extend(Class);
  }
  Component.element = /** @type {any} */
  Class;
  return Class;
}
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
const PUBLIC_VERSION = "4";
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
const builtInTranslations = {
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
};
const getText = (word, translations, lang = "en") => {
  if (translations[lang] && translations[lang][word]) {
    return translations[lang][word];
  } else if (builtInTranslations[lang] && builtInTranslations[lang][word]) {
    return builtInTranslations[lang][word];
  } else {
    return word;
  }
};
function add_css$5(target) {
  append_styles(target, "svelte-f2gsno", "span.svelte-f2gsno{display:contents}");
}
function create_fragment$6(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*translatedText*/
        ctx[1]
      );
      attr(
        span,
        "data-original-text",
        /*text*/
        ctx[0]
      );
      attr(span, "class", "svelte-f2gsno");
      toggle_class(
        span,
        "notranslate",
        /*haveTranslation*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*translatedText*/
      2)
        set_data(
          t,
          /*translatedText*/
          ctx2[1]
        );
      if (dirty & /*text*/
      1) {
        attr(
          span,
          "data-original-text",
          /*text*/
          ctx2[0]
        );
      }
      if (dirty & /*haveTranslation*/
      4) {
        toggle_class(
          span,
          "notranslate",
          /*haveTranslation*/
          ctx2[2]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { text: text2 } = $$props;
  let { lang = "en" } = $$props;
  let { translations = {} } = $$props;
  let translatedText = text2;
  let haveTranslation = false;
  $$self.$$set = ($$props2) => {
    if ("text" in $$props2)
      $$invalidate(0, text2 = $$props2.text);
    if ("lang" in $$props2)
      $$invalidate(3, lang = $$props2.lang);
    if ("translations" in $$props2)
      $$invalidate(4, translations = $$props2.translations);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*translations, lang, text*/
    25) {
      {
        $$invalidate(2, haveTranslation = !!(translations[lang] && translations[lang][text2]));
        $$invalidate(1, translatedText = getText(text2, translations, lang));
      }
    }
  };
  return [text2, translatedText, haveTranslation, lang, translations];
}
class T extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { text: 0, lang: 3, translations: 4 }, add_css$5);
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(text2) {
    this.$$set({ text: text2 });
    flush();
  }
  get lang() {
    return this.$$.ctx[3];
  }
  set lang(lang) {
    this.$$set({ lang });
    flush();
  }
  get translations() {
    return this.$$.ctx[4];
  }
  set translations(translations) {
    this.$$set({ translations });
    flush();
  }
}
create_custom_element(T, { "text": {}, "lang": {}, "translations": {} }, [], [], true);
function add_css$4(target) {
  append_styles(target, "svelte-lni2oa", ".translation-container.svelte-lni2oa{margin-top:1rem}.button-group.svelte-lni2oa{display:flex;flex-wrap:wrap;gap:0.5rem}.lang-button.svelte-lni2oa{padding:0.5rem 1rem;font-size:0.875rem;border:none;border-radius:6px;cursor:pointer;transition:background 0.2s ease-in-out,\n      transform 0.1s ease-in-out;text-transform:capitalize}.lang-button.primary.svelte-lni2oa{background-color:var(--primary-color, #2563eb);color:white}.lang-button.primary.svelte-lni2oa:hover{background-color:var(--primary-dark, #1d4ed8);transform:scale(1.05)}.lang-button.secondary.svelte-lni2oa{background-color:var(--text-color, #6b7280);color:white}.lang-button.secondary.svelte-lni2oa:hover{background-color:var(--muted-text, #4b5563);transform:scale(1.05)}.google-translate-container.svelte-lni2oa{margin-top:1rem}.hidden.svelte-lni2oa{display:none}");
}
function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[17] = list[i];
  const constants_0 = new Intl.DisplayNames([
    /*lang*/
    child_ctx[17]
  ], { type: "language" }).of(
    /*lang*/
    child_ctx[17]
  );
  child_ctx[18] = constants_0;
  return child_ctx;
}
function get_if_ctx(ctx) {
  const child_ctx = ctx.slice();
  const constants_0 = new Intl.DisplayNames([
    /*sourceLanguage*/
    child_ctx[1]
  ], { type: "language" }).of(
    /*sourceLanguage*/
    child_ctx[1]
  );
  child_ctx[18] = constants_0;
  return child_ctx;
}
function create_if_block_1$4(ctx) {
  let button;
  let t;
  let current;
  let mounted;
  let dispose;
  t = new T({
    props: {
      lang: (
        /*selectedLang*/
        ctx[2]
      ),
      translations: (
        /*translations*/
        ctx[0]
      ),
      text: (
        /*langName*/
        ctx[18]
      )
    }
  });
  return {
    c() {
      button = element("button");
      create_component(t.$$.fragment);
      attr(button, "class", "lang-button primary svelte-lni2oa");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      mount_component(t, button, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[9]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*selectedLang*/
      4)
        t_changes.lang = /*selectedLang*/
        ctx2[2];
      if (dirty & /*translations*/
      1)
        t_changes.translations = /*translations*/
        ctx2[0];
      if (dirty & /*sourceLanguage*/
      2)
        t_changes.text = /*langName*/
        ctx2[18];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(t);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block$4(ctx) {
  let button;
  let t0_value = (
    /*langName*/
    ctx[18] + ""
  );
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[10](
        /*lang*/
        ctx[17]
      )
    );
  }
  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "lang-button primary svelte-lni2oa");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*translations*/
      1 && t0_value !== (t0_value = /*langName*/
      ctx[18] + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_else_block$1(ctx) {
  let t;
  let current;
  t = new T({
    props: {
      lang: (
        /*selectedLang*/
        ctx[2]
      ),
      translations: (
        /*translations*/
        ctx[0]
      ),
      text: "Translate"
    }
  });
  return {
    c() {
      create_component(t.$$.fragment);
    },
    m(target, anchor) {
      mount_component(t, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*selectedLang*/
      4)
        t_changes.lang = /*selectedLang*/
        ctx2[2];
      if (dirty & /*translations*/
      1)
        t_changes.translations = /*translations*/
        ctx2[0];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(t, detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let t;
  let current;
  t = new T({
    props: {
      lang: (
        /*selectedLang*/
        ctx[2]
      ),
      translations: (
        /*translations*/
        ctx[0]
      ),
      text: "Other Languages"
    }
  });
  return {
    c() {
      create_component(t.$$.fragment);
    },
    m(target, anchor) {
      mount_component(t, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*selectedLang*/
      4)
        t_changes.lang = /*selectedLang*/
        ctx2[2];
      if (dirty & /*translations*/
      1)
        t_changes.translations = /*translations*/
        ctx2[0];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(t, detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let script;
  let script_src_value;
  let t0;
  let div1;
  let div0;
  let t1;
  let t2;
  let button;
  let show_if;
  let current_block_type_index;
  let if_block1;
  let t3;
  let div2;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*selectedLang*/
    ctx[2] !== /*sourceLanguage*/
    ctx[1] && create_if_block_1$4(get_if_ctx(ctx))
  );
  let each_value = ensure_array_like(Object.keys(
    /*translations*/
    ctx[0]
  ));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }
  const if_block_creators = [create_if_block$4, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (dirty & /*translations*/
    1)
      show_if = null;
    if (show_if == null)
      show_if = !!Object.keys(
        /*translations*/
        ctx2[0]
      ).length;
    if (show_if)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      script = element("script");
      script.innerHTML = ``;
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      button = element("button");
      if_block1.c();
      t3 = space();
      div2 = element("div");
      if (!src_url_equal(script.src, script_src_value = "https://translate.google.com/translate_a/element.js?cb=googleTranslateLoaded"))
        attr(script, "src", script_src_value);
      attr(button, "class", "lang-button secondary svelte-lni2oa");
      attr(div0, "class", "button-group svelte-lni2oa");
      attr(div1, "class", "translation-container svelte-lni2oa");
      attr(div2, "class", "google-translate-container svelte-lni2oa");
      attr(div2, "id", "google_translate_element");
      toggle_class(div2, "hidden", !/*showAllLanguages*/
      ctx[3]);
    },
    m(target, anchor) {
      append(document.head, script);
      insert(target, t0, anchor);
      insert(target, div1, anchor);
      append(div1, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append(div0, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div0, null);
        }
      }
      append(div0, t2);
      append(div0, button);
      if_blocks[current_block_type_index].m(button, null);
      insert(target, t3, anchor);
      insert(target, div2, anchor);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_2*/
          ctx[11]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*selectedLang*/
        ctx2[2] !== /*sourceLanguage*/
        ctx2[1]
      ) {
        if (if_block0) {
          if_block0.p(get_if_ctx(ctx2), dirty);
          if (dirty & /*selectedLang, sourceLanguage*/
          6) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$4(get_if_ctx(ctx2));
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div0, t1);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (dirty & /*setLanguage, Object, translations, Intl*/
      17) {
        each_value = ensure_array_like(Object.keys(
          /*translations*/
          ctx2[0]
        ));
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div0, t2);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block1.c();
        } else {
          if_block1.p(ctx2, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(button, null);
      }
      if (!current || dirty & /*showAllLanguages*/
      8) {
        toggle_class(div2, "hidden", !/*showAllLanguages*/
        ctx2[3]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(div1);
        detach(t3);
        detach(div2);
      }
      detach(script);
      if (if_block0)
        if_block0.d();
      destroy_each(each_blocks, detaching);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { translations = {} } = $$props;
  let { sourceLanguage = "en" } = $$props;
  let { onChange } = $$props;
  let { form } = $$props;
  let selectedLang = sourceLanguage;
  let useGoogleTranslate = false;
  let googleTranslateIsReady = false;
  let showAllLanguages = false;
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: sourceLanguage }, "google_translate_element");
  }
  function googleTranslateLoaded() {
    $$invalidate(8, googleTranslateIsReady = true);
  }
  function detectGoogleTranslateLanguage(hash) {
    let match = hash.match(/googtrans\((\w+)\|(\w+)\)/);
    if (match) {
      $$invalidate(2, selectedLang = match[2]);
      $$invalidate(7, useGoogleTranslate = true);
    }
  }
  onMount(() => {
    detectGoogleTranslateLanguage(window.location.hash);
    window.googleTranslateLoaded = googleTranslateLoaded;
    window.addEventListener("hashchange", () => {
      detectGoogleTranslateLanguage(window.location.hash);
    });
  });
  function setLanguage(lang) {
    $$invalidate(2, selectedLang = lang);
    let useGoogle = sourceLanguage !== lang && !hasCompleteTranslations(lang);
    $$invalidate(7, useGoogleTranslate = useGoogle);
    if (useGoogle) {
      triggerGoogleTranslate(lang);
    } else {
      window.location.hash = "";
    }
  }
  function triggerGoogleTranslate(lang) {
    window.location.hash = `#googtrans(${sourceLanguage}|${lang})`;
    location.reload();
  }
  function hasCompleteTranslations(lang) {
    let translation = translations[lang];
    if (!translation)
      return false;
    if (form.title && !translation[form.title])
      return false;
    if (form.description && !translation[form.description])
      return false;
    for (let item of form.items) {
      if (!translation[item.title])
        return false;
      if (item.description && !translation[item.description])
        return false;
      if (item.choices) {
        for (let choice of item.choices) {
          if (!translation[choice])
            return false;
        }
      }
    }
    return true;
  }
  const click_handler = () => setLanguage(sourceLanguage);
  const click_handler_1 = (lang) => setLanguage(lang);
  const click_handler_2 = () => {
    setLanguage(sourceLanguage);
    $$invalidate(3, showAllLanguages = !showAllLanguages);
  };
  $$self.$$set = ($$props2) => {
    if ("translations" in $$props2)
      $$invalidate(0, translations = $$props2.translations);
    if ("sourceLanguage" in $$props2)
      $$invalidate(1, sourceLanguage = $$props2.sourceLanguage);
    if ("onChange" in $$props2)
      $$invalidate(5, onChange = $$props2.onChange);
    if ("form" in $$props2)
      $$invalidate(6, form = $$props2.form);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*useGoogleTranslate, showAllLanguages, googleTranslateIsReady*/
    392) {
      if ((useGoogleTranslate || showAllLanguages) && googleTranslateIsReady) {
        googleTranslateElementInit();
      }
    }
    if ($$self.$$.dirty & /*onChange, selectedLang, useGoogleTranslate*/
    164) {
      onChange(selectedLang, useGoogleTranslate);
    }
  };
  return [
    translations,
    sourceLanguage,
    selectedLang,
    showAllLanguages,
    setLanguage,
    onChange,
    form,
    useGoogleTranslate,
    googleTranslateIsReady,
    click_handler,
    click_handler_1,
    click_handler_2
  ];
}
class TranslationSelector extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$5,
      create_fragment$5,
      safe_not_equal,
      {
        translations: 0,
        sourceLanguage: 1,
        onChange: 5,
        form: 6
      },
      add_css$4
    );
  }
  get translations() {
    return this.$$.ctx[0];
  }
  set translations(translations) {
    this.$$set({ translations });
    flush();
  }
  get sourceLanguage() {
    return this.$$.ctx[1];
  }
  set sourceLanguage(sourceLanguage) {
    this.$$set({ sourceLanguage });
    flush();
  }
  get onChange() {
    return this.$$.ctx[5];
  }
  set onChange(onChange) {
    this.$$set({ onChange });
    flush();
  }
  get form() {
    return this.$$.ctx[6];
  }
  set form(form) {
    this.$$set({ form });
    flush();
  }
}
create_custom_element(TranslationSelector, { "translations": {}, "sourceLanguage": {}, "onChange": {}, "form": {} }, [], [], true);
function add_css$3(target) {
  append_styles(target, "svelte-zcceq9", ".sr-only.svelte-zcceq9.svelte-zcceq9{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}span.svelte-zcceq9.svelte-zcceq9{display:inline-block;transform:scale(0.5);transition:transform 200ms}.selected.svelte-zcceq9 span.svelte-zcceq9{transform:scale(1)}label.svelte-zcceq9:hover span.svelte-zcceq9,.unselected.svelte-zcceq9.svelte-zcceq9:has(~ label:hover span){transform:scale(1.1)}label.svelte-zcceq9:hover~label.selected.svelte-zcceq9{transform:scale(0.75)}.peer.svelte-zcceq9:focus-visible+span.svelte-zcceq9{outline:2px solid #4f46e5;outline-offset:2px}");
}
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
}
function create_each_block$3(ctx) {
  let label;
  let input;
  let t0;
  let span;
  let t1_value = (
    /*iconMap*/
    ctx[4][
      /*icon*/
      ctx[2]
    ] + ""
  );
  let t1;
  let t2;
  let binding_group;
  let mounted;
  let dispose;
  binding_group = init_binding_group(
    /*$$binding_groups*/
    ctx[7][0]
  );
  return {
    c() {
      label = element("label");
      input = element("input");
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      attr(input, "type", "radio");
      attr(
        input,
        "name",
        /*name*/
        ctx[3]
      );
      input.__value = /*i*/
      ctx[10] + 1;
      set_input_value(input, input.__value);
      attr(input, "class", "sr-only peer svelte-zcceq9");
      attr(span, "class", "text-2xl transition-transform duration-200 ease-in-out svelte-zcceq9");
      attr(span, "aria-hidden", "true");
      attr(label, "class", "cursor-pointer relative svelte-zcceq9");
      toggle_class(
        label,
        "selected",
        /*value*/
        ctx[0] > /*i*/
        ctx[10]
      );
      toggle_class(
        label,
        "unselected",
        /*value*/
        ctx[0] <= /*i*/
        ctx[10]
      );
      binding_group.p(input);
    },
    m(target, anchor) {
      insert(target, label, anchor);
      append(label, input);
      input.checked = input.__value === /*value*/
      ctx[0];
      append(label, t0);
      append(label, span);
      append(span, t1);
      append(label, t2);
      if (!mounted) {
        dispose = [
          listen(
            input,
            "change",
            /*input_change_handler*/
            ctx[6]
          ),
          listen(
            input,
            "input",
            /*input_handler*/
            ctx[5]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*name*/
      8) {
        attr(
          input,
          "name",
          /*name*/
          ctx2[3]
        );
      }
      if (dirty & /*value, max*/
      3) {
        input.checked = input.__value === /*value*/
        ctx2[0];
      }
      if (dirty & /*icon*/
      4 && t1_value !== (t1_value = /*iconMap*/
      ctx2[4][
        /*icon*/
        ctx2[2]
      ] + ""))
        set_data(t1, t1_value);
      if (dirty & /*value*/
      1) {
        toggle_class(
          label,
          "selected",
          /*value*/
          ctx2[0] > /*i*/
          ctx2[10]
        );
      }
      if (dirty & /*value*/
      1) {
        toggle_class(
          label,
          "unselected",
          /*value*/
          ctx2[0] <= /*i*/
          ctx2[10]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(label);
      }
      binding_group.r();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let each_value = ensure_array_like(Array(
    /*max*/
    ctx[1]
  ).fill(0));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "flex space-x-1");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*value, iconMap, icon, name, max*/
      31) {
        each_value = ensure_array_like(Array(
          /*max*/
          ctx2[1]
        ).fill(0));
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { max = 5 } = $$props;
  let { icon = "STAR" } = $$props;
  let { value = 0 } = $$props;
  let { name = "rating" } = $$props;
  const iconMap = {
    STAR: "⭐",
    HEART: "❤️",
    THUMBS_UP: "👍"
  };
  const $$binding_groups = [[]];
  function input_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_change_handler() {
    value = this.__value;
    $$invalidate(0, value);
  }
  $$self.$$set = ($$props2) => {
    if ("max" in $$props2)
      $$invalidate(1, max = $$props2.max);
    if ("icon" in $$props2)
      $$invalidate(2, icon = $$props2.icon);
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("name" in $$props2)
      $$invalidate(3, name = $$props2.name);
  };
  return [
    value,
    max,
    icon,
    name,
    iconMap,
    input_handler,
    input_change_handler,
    $$binding_groups
  ];
}
class RatingItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { max: 1, icon: 2, value: 0, name: 3 }, add_css$3);
  }
  get max() {
    return this.$$.ctx[1];
  }
  set max(max) {
    this.$$set({ max });
    flush();
  }
  get icon() {
    return this.$$.ctx[2];
  }
  set icon(icon) {
    this.$$set({ icon });
    flush();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(value) {
    this.$$set({ value });
    flush();
  }
  get name() {
    return this.$$.ctx[3];
  }
  set name(name) {
    this.$$set({ name });
    flush();
  }
}
create_custom_element(RatingItem, { "max": {}, "icon": {}, "value": {}, "name": {} }, [], [], true);
function add_css$2(target) {
  append_styles(target, "svelte-qmvkct", ".form-item.svelte-qmvkct{margin-bottom:1.5rem}.question-title.svelte-qmvkct{font-size:1.125rem;font-weight:600;color:var(--text-color, #1f2937);margin-bottom:0.5rem}.question-description.svelte-qmvkct{font-size:0.875rem;color:var(--muted-text, #6b7280);margin-bottom:0.75rem}.checkbox-group.svelte-qmvkct,.radio-group.svelte-qmvkct{display:flex;flex-direction:column;gap:0.5rem}.checkbox-label.svelte-qmvkct,.radio-label.svelte-qmvkct{display:flex;align-items:center;gap:0.5rem;cursor:pointer}.choice-text.svelte-qmvkct{color:var(--text-color, #1f2937)}.checkbox-input.svelte-qmvkct,.radio-input.svelte-qmvkct{width:1.25rem;height:1.25rem;border:2px solid var(--input-border-color, #d1d5db);border-radius:50%;cursor:pointer;transition:transform 0.2s ease-in-out}.checkbox-input.svelte-qmvkct:hover,.radio-input.svelte-qmvkct:hover{transform:scale(1.1)}.checkbox-input.svelte-qmvkct:checked,.radio-input.svelte-qmvkct:checked{background-color:var(--primary-color, #2563eb);border-color:var(--primary-color, #2563eb);box-shadow:0 0 5px var(--primary-color, #2563eb)}.input-field.svelte-qmvkct{width:100%;padding:0.6rem;border:1px solid var(--input-border-color, #d1d5db);border-radius:6px;background-color:var(--input-bg-color, #f9fafb);color:var(--input-text-color, #111827);font-family:var(--input-font, sans-serif);transition:all 0.2s ease-in-out}.input-field.svelte-qmvkct:focus{outline:none;border-color:var(--input-focus-color, #2563eb);box-shadow:0 0 6px var(--input-focus-color, #2563eb)}.textarea-field.svelte-qmvkct{min-height:100px;resize:vertical}.input-range.svelte-qmvkct{width:100%;padding:0.5rem;border:none;cursor:pointer}.dropdown.svelte-qmvkct{width:100%;padding:0.6rem;border:1px solid var(--input-border-color, #d1d5db);border-radius:6px;background-color:var(--input-bg-color, #f9fafb);color:var(--input-text-color, #111827);font-family:var(--input-font, sans-serif);appearance:none}.dropdown.svelte-qmvkct:focus{outline:none;border-color:var(--input-focus-color, #2563eb);box-shadow:0 0 6px var(--input-focus-color, #2563eb)}.input-field.svelte-qmvkct:hover,.dropdown.svelte-qmvkct:hover{border-color:var(--primary-dark, #1d4ed8)}.input-field.svelte-qmvkct:focus,.dropdown.svelte-qmvkct:focus{border-color:var(--primary-color, #2563eb)}");
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[11] = i;
  return child_ctx;
}
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}
function create_if_block_7(ctx) {
  let p;
  let t;
  let current;
  t = new T({
    props: {
      text: (
        /*item*/
        ctx[0].description
      ),
      lang: (
        /*lang*/
        ctx[2]
      ),
      translations: (
        /*translations*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      p = element("p");
      create_component(t.$$.fragment);
      attr(p, "class", "question-description svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      mount_component(t, p, null);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*item*/
      1)
        t_changes.text = /*item*/
        ctx2[0].description;
      if (dirty & /*lang*/
      4)
        t_changes.lang = /*lang*/
        ctx2[2];
      if (dirty & /*translations*/
      8)
        t_changes.translations = /*translations*/
        ctx2[3];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
      destroy_component(t);
    }
  };
}
function create_if_block_6(ctx) {
  let select;
  let option;
  let select_name_value;
  let mounted;
  let dispose;
  let each_value_2 = ensure_array_like(
    /*item*/
    ctx[0].choices
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  return {
    c() {
      select = element("select");
      option = element("option");
      option.textContent = "Select an option";
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      option.__value = "";
      set_input_value(option, option.__value);
      attr(select, "name", select_name_value = /*item*/
      ctx[0].id);
      attr(select, "class", "dropdown svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, select, anchor);
      append(select, option);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(select, null);
        }
      }
      if (!mounted) {
        dispose = listen(
          select,
          "change",
          /*handleChange*/
          ctx[4]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1) {
        each_value_2 = ensure_array_like(
          /*item*/
          ctx2[0].choices
        );
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_2.length;
      }
      if (dirty & /*item*/
      1 && select_name_value !== (select_name_value = /*item*/
      ctx2[0].id)) {
        attr(select, "name", select_name_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(select);
      }
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_5$2(ctx) {
  let input;
  let input_name_value;
  let input_min_value;
  let input_max_value;
  let input_step_value;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      attr(input, "type", "range");
      attr(input, "name", input_name_value = /*item*/
      ctx[0].id);
      attr(input, "min", input_min_value = /*item*/
      ctx[0].min);
      attr(input, "max", input_max_value = /*item*/
      ctx[0].max);
      attr(input, "step", input_step_value = /*item*/
      ctx[0].step);
      attr(input, "class", "input-range svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*handleChange*/
            ctx[4]
          ),
          listen(
            input,
            "change",
            /*handleChange*/
            ctx[4]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && input_name_value !== (input_name_value = /*item*/
      ctx2[0].id)) {
        attr(input, "name", input_name_value);
      }
      if (dirty & /*item*/
      1 && input_min_value !== (input_min_value = /*item*/
      ctx2[0].min)) {
        attr(input, "min", input_min_value);
      }
      if (dirty & /*item*/
      1 && input_max_value !== (input_max_value = /*item*/
      ctx2[0].max)) {
        attr(input, "max", input_max_value);
      }
      if (dirty & /*item*/
      1 && input_step_value !== (input_step_value = /*item*/
      ctx2[0].step)) {
        attr(input, "step", input_step_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_4$2(ctx) {
  let ratingitem;
  let current;
  ratingitem = new RatingItem({
    props: {
      name: (
        /*item*/
        ctx[0].id
      ),
      icon: (
        /*item*/
        ctx[0].icon
      ),
      max: (
        /*item*/
        ctx[0].max
      )
    }
  });
  ratingitem.$on(
    "input",
    /*handleChange*/
    ctx[4]
  );
  return {
    c() {
      create_component(ratingitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(ratingitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const ratingitem_changes = {};
      if (dirty & /*item*/
      1)
        ratingitem_changes.name = /*item*/
        ctx2[0].id;
      if (dirty & /*item*/
      1)
        ratingitem_changes.icon = /*item*/
        ctx2[0].icon;
      if (dirty & /*item*/
      1)
        ratingitem_changes.max = /*item*/
        ctx2[0].max;
      ratingitem.$set(ratingitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(ratingitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(ratingitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(ratingitem, detaching);
    }
  };
}
function create_if_block_3$2(ctx) {
  let textarea;
  let textarea_name_value;
  let mounted;
  let dispose;
  return {
    c() {
      textarea = element("textarea");
      attr(textarea, "name", textarea_name_value = /*item*/
      ctx[0].id);
      attr(textarea, "class", "input-field textarea-field svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, textarea, anchor);
      if (!mounted) {
        dispose = listen(
          textarea,
          "input",
          /*handleChange*/
          ctx[4]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && textarea_name_value !== (textarea_name_value = /*item*/
      ctx2[0].id)) {
        attr(textarea, "name", textarea_name_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(textarea);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2$2(ctx) {
  let input;
  let input_name_value;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      attr(input, "type", "text");
      attr(input, "name", input_name_value = /*item*/
      ctx[0].id);
      attr(input, "class", "input-field svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*handleChange*/
          ctx[4]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && input_name_value !== (input_name_value = /*item*/
      ctx2[0].id)) {
        attr(input, "name", input_name_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1$3(ctx) {
  let div;
  let current;
  let each_value_1 = ensure_array_like(
    /*item*/
    ctx[0].choices
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "radio-group svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*item, lang, translations, handleChange, setChoice*/
      31) {
        each_value_1 = ensure_array_like(
          /*item*/
          ctx2[0].choices
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block$3(ctx) {
  let div;
  let current;
  let each_value = ensure_array_like(
    /*item*/
    ctx[0].choices
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "checkbox-group svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*item, lang, translations, handleChange*/
      29) {
        each_value = ensure_array_like(
          /*item*/
          ctx2[0].choices
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_2(ctx) {
  let option;
  let t_value = (
    /*choice*/
    ctx[7] + ""
  );
  let t;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t = text(t_value);
      option.__value = option_value_value = /*choice*/
      ctx[7];
      set_input_value(option, option.__value);
    },
    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && t_value !== (t_value = /*choice*/
      ctx2[7] + ""))
        set_data(t, t_value);
      if (dirty & /*item*/
      1 && option_value_value !== (option_value_value = /*choice*/
      ctx2[7])) {
        option.__value = option_value_value;
        set_input_value(option, option.__value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(option);
      }
    }
  };
}
function create_each_block_1(ctx) {
  let label;
  let input;
  let input_name_value;
  let input_value_value;
  let t0;
  let span;
  let t1;
  let t2;
  let current;
  let mounted;
  let dispose;
  function change_handler(...args) {
    return (
      /*change_handler*/
      ctx[6](
        /*idx*/
        ctx[11],
        ...args
      )
    );
  }
  t1 = new T({
    props: {
      text: (
        /*choice*/
        ctx[7]
      ),
      lang: (
        /*lang*/
        ctx[2]
      ),
      translations: (
        /*translations*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      label = element("label");
      input = element("input");
      t0 = space();
      span = element("span");
      create_component(t1.$$.fragment);
      t2 = space();
      attr(input, "type", "radio");
      attr(input, "name", input_name_value = /*item*/
      ctx[0].id);
      input.value = input_value_value = /*choice*/
      ctx[7];
      attr(input, "class", "radio-input svelte-qmvkct");
      attr(span, "class", "choice-text svelte-qmvkct");
      attr(label, "class", "radio-label svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, label, anchor);
      append(label, input);
      append(label, t0);
      append(label, span);
      mount_component(t1, span, null);
      append(label, t2);
      current = true;
      if (!mounted) {
        dispose = listen(input, "change", change_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!current || dirty & /*item*/
      1 && input_name_value !== (input_name_value = /*item*/
      ctx[0].id)) {
        attr(input, "name", input_name_value);
      }
      if (!current || dirty & /*item*/
      1 && input_value_value !== (input_value_value = /*choice*/
      ctx[7])) {
        input.value = input_value_value;
      }
      const t1_changes = {};
      if (dirty & /*item*/
      1)
        t1_changes.text = /*choice*/
        ctx[7];
      if (dirty & /*lang*/
      4)
        t1_changes.lang = /*lang*/
        ctx[2];
      if (dirty & /*translations*/
      8)
        t1_changes.translations = /*translations*/
        ctx[3];
      t1.$set(t1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(label);
      }
      destroy_component(t1);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block$2(ctx) {
  let label;
  let input;
  let input_name_value;
  let input_value_value;
  let t0;
  let span;
  let t1;
  let t2;
  let current;
  let mounted;
  let dispose;
  t1 = new T({
    props: {
      text: (
        /*choice*/
        ctx[7]
      ),
      lang: (
        /*lang*/
        ctx[2]
      ),
      translations: (
        /*translations*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      label = element("label");
      input = element("input");
      t0 = space();
      span = element("span");
      create_component(t1.$$.fragment);
      t2 = space();
      attr(input, "type", "checkbox");
      attr(input, "name", input_name_value = /*item*/
      ctx[0].id);
      input.value = input_value_value = /*choice*/
      ctx[7];
      attr(input, "class", "checkbox-input svelte-qmvkct");
      attr(span, "class", "choice-text svelte-qmvkct");
      attr(label, "class", "checkbox-label svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, label, anchor);
      append(label, input);
      append(label, t0);
      append(label, span);
      mount_component(t1, span, null);
      append(label, t2);
      current = true;
      if (!mounted) {
        dispose = listen(
          input,
          "change",
          /*handleChange*/
          ctx[4]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*item*/
      1 && input_name_value !== (input_name_value = /*item*/
      ctx2[0].id)) {
        attr(input, "name", input_name_value);
      }
      if (!current || dirty & /*item*/
      1 && input_value_value !== (input_value_value = /*choice*/
      ctx2[7])) {
        input.value = input_value_value;
      }
      const t1_changes = {};
      if (dirty & /*item*/
      1)
        t1_changes.text = /*choice*/
        ctx2[7];
      if (dirty & /*lang*/
      4)
        t1_changes.lang = /*lang*/
        ctx2[2];
      if (dirty & /*translations*/
      8)
        t1_changes.translations = /*translations*/
        ctx2[3];
      t1.$set(t1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(label);
      }
      destroy_component(t1);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let h3;
  let t0;
  let t1;
  let t2;
  let current_block_type_index;
  let if_block1;
  let current;
  t0 = new T({
    props: {
      text: (
        /*item*/
        ctx[0].title
      ),
      lang: (
        /*lang*/
        ctx[2]
      ),
      translations: (
        /*translations*/
        ctx[3]
      )
    }
  });
  let if_block0 = (
    /*item*/
    ctx[0].description && create_if_block_7(ctx)
  );
  const if_block_creators = [
    create_if_block$3,
    create_if_block_1$3,
    create_if_block_2$2,
    create_if_block_3$2,
    create_if_block_4$2,
    create_if_block_5$2,
    create_if_block_6
  ];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*item*/
      ctx2[0].type === "checkbox"
    )
      return 0;
    if (
      /*item*/
      ctx2[0].type === "multipleChoice"
    )
      return 1;
    if (
      /*item*/
      ctx2[0].type === "text"
    )
      return 2;
    if (
      /*item*/
      ctx2[0].type === "paragraph"
    )
      return 3;
    if (
      /*item*/
      ctx2[0].type == "rating"
    )
      return 4;
    if (
      /*item*/
      ctx2[0].type == "scale"
    )
      return 5;
    if (
      /*item*/
      ctx2[0].type == "list"
    )
      return 6;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div = element("div");
      h3 = element("h3");
      create_component(t0.$$.fragment);
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      attr(h3, "class", "question-title svelte-qmvkct");
      attr(div, "class", "form-item svelte-qmvkct");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, h3);
      mount_component(t0, h3, null);
      append(div, t1);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t2);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      const t0_changes = {};
      if (dirty & /*item*/
      1)
        t0_changes.text = /*item*/
        ctx2[0].title;
      if (dirty & /*lang*/
      4)
        t0_changes.lang = /*lang*/
        ctx2[2];
      if (dirty & /*translations*/
      8)
        t0_changes.translations = /*translations*/
        ctx2[3];
      t0.$set(t0_changes);
      if (
        /*item*/
        ctx2[0].description
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*item*/
          1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_7(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t2);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block1) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block1 = if_blocks[current_block_type_index];
          if (!if_block1) {
            if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block1.c();
          } else {
            if_block1.p(ctx2, dirty);
          }
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        } else {
          if_block1 = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(t0.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(t0.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(t0);
      if (if_block0)
        if_block0.d();
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { item } = $$props;
  let { onInputChange } = $$props;
  let { setChoice } = $$props;
  let { lang = "en" } = $$props;
  let { translations = {} } = $$props;
  function handleChange(event) {
    onInputChange(item.id, event.target.value);
  }
  const change_handler = (idx, event) => {
    handleChange(event);
    setChoice(item, idx);
  };
  $$self.$$set = ($$props2) => {
    if ("item" in $$props2)
      $$invalidate(0, item = $$props2.item);
    if ("onInputChange" in $$props2)
      $$invalidate(5, onInputChange = $$props2.onInputChange);
    if ("setChoice" in $$props2)
      $$invalidate(1, setChoice = $$props2.setChoice);
    if ("lang" in $$props2)
      $$invalidate(2, lang = $$props2.lang);
    if ("translations" in $$props2)
      $$invalidate(3, translations = $$props2.translations);
  };
  return [
    item,
    setChoice,
    lang,
    translations,
    handleChange,
    onInputChange,
    change_handler
  ];
}
class GFormItem extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$3,
      create_fragment$3,
      safe_not_equal,
      {
        item: 0,
        onInputChange: 5,
        setChoice: 1,
        lang: 2,
        translations: 3
      },
      add_css$2
    );
  }
  get item() {
    return this.$$.ctx[0];
  }
  set item(item) {
    this.$$set({ item });
    flush();
  }
  get onInputChange() {
    return this.$$.ctx[5];
  }
  set onInputChange(onInputChange) {
    this.$$set({ onInputChange });
    flush();
  }
  get setChoice() {
    return this.$$.ctx[1];
  }
  set setChoice(setChoice) {
    this.$$set({ setChoice });
    flush();
  }
  get lang() {
    return this.$$.ctx[2];
  }
  set lang(lang) {
    this.$$set({ lang });
    flush();
  }
  get translations() {
    return this.$$.ctx[3];
  }
  set translations(translations) {
    this.$$set({ translations });
    flush();
  }
}
create_custom_element(GFormItem, { "item": {}, "onInputChange": {}, "setChoice": {}, "lang": {}, "translations": {} }, [], [], true);
function add_css$1(target) {
  append_styles(target, "svelte-hvfp2g", ".page-container.svelte-hvfp2g{max-width:42rem;margin:0 auto;padding:1.5rem;background-color:var(--bg-color, #ffffff);color:var(--text-color, #1f2937);box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);border-radius:8px;transition:opacity 0.3s ease-in-out}.page-title.svelte-hvfp2g{font-size:1.5rem;font-weight:600;color:var(--text-color, #1f2937);margin-bottom:0.75rem}.page-description.svelte-hvfp2g{font-size:0.875rem;color:var(--muted-text, #6b7280);margin-bottom:1rem}.error-message.svelte-hvfp2g{background-color:var(--error-bg, #fef2f2);border:1px solid var(--error-color, #dc2626);color:var(--error-color, #dc2626);padding:0.5rem;border-radius:6px;font-size:0.875rem;margin-top:0.5rem}.nav-buttons.svelte-hvfp2g{display:flex;justify-content:space-between;margin-top:1.5rem}.nav-button.svelte-hvfp2g{padding:0.5rem 1rem;border-radius:6px;font-weight:500;font-size:1rem;transition:all 0.2s ease-in-out;cursor:pointer;border:none;outline:none}.back-button.svelte-hvfp2g{background-color:var(--muted-bg, #e5e7eb);color:var(--text-color, #1f2937)}.back-button.svelte-hvfp2g:hover{background-color:var(--muted-hover, #d1d5db)}.next-button.svelte-hvfp2g{background-color:var(--primary-color, #2563eb);color:#ffffff}.next-button.svelte-hvfp2g:hover{background-color:var(--primary-dark, #1d4ed8)}.next-button.svelte-hvfp2g:disabled{background-color:var(--disabled-bg, #9ca3af);cursor:not-allowed}.nav-button.svelte-hvfp2g:focus{outline:2px solid var(--input-focus-color, #2563eb);outline-offset:2px}.hidden.svelte-hvfp2g{visibility:hidden}");
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
}
function create_if_block_5$1(ctx) {
  let h2;
  let t_value = (
    /*page*/
    ctx[0].title + ""
  );
  let t;
  return {
    c() {
      h2 = element("h2");
      t = text(t_value);
      attr(h2, "class", "page-title svelte-hvfp2g");
    },
    m(target, anchor) {
      insert(target, h2, anchor);
      append(h2, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*page*/
      1 && t_value !== (t_value = /*page*/
      ctx2[0].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(h2);
      }
    }
  };
}
function create_if_block_4$1(ctx) {
  let p;
  let t;
  let current;
  t = new T({
    props: {
      text: (
        /*page*/
        ctx[0].description
      ),
      lang: (
        /*lang*/
        ctx[5]
      ),
      translations: (
        /*translations*/
        ctx[6]
      )
    }
  });
  return {
    c() {
      p = element("p");
      create_component(t.$$.fragment);
      attr(p, "class", "page-description svelte-hvfp2g");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      mount_component(t, p, null);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*page*/
      1)
        t_changes.text = /*page*/
        ctx2[0].description;
      if (dirty & /*lang*/
      32)
        t_changes.lang = /*lang*/
        ctx2[5];
      if (dirty & /*translations*/
      64)
        t_changes.translations = /*translations*/
        ctx2[6];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
      destroy_component(t);
    }
  };
}
function create_if_block_3$1(ctx) {
  let p;
  let t0_value = (
    /*formErrors*/
    ctx[8][
      /*item*/
      ctx[15].id
    ] + ""
  );
  let t0;
  let t1;
  return {
    c() {
      p = element("p");
      t0 = text(t0_value);
      t1 = space();
      attr(p, "class", "error-message svelte-hvfp2g");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t0);
      append(p, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*formErrors, page*/
      257 && t0_value !== (t0_value = /*formErrors*/
      ctx2[8][
        /*item*/
        ctx2[15].id
      ] + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_each_block$1(ctx) {
  let gformitem;
  let t;
  let if_block_anchor;
  let current;
  gformitem = new GFormItem({
    props: {
      item: (
        /*item*/
        ctx[15]
      ),
      onInputChange: (
        /*onInputChange*/
        ctx[10]
      ),
      setChoice: (
        /*setChoice*/
        ctx[9]
      ),
      lang: (
        /*lang*/
        ctx[5]
      ),
      translations: (
        /*translations*/
        ctx[6]
      )
    }
  });
  let if_block = (
    /*formErrors*/
    ctx[8][
      /*item*/
      ctx[15].id
    ] && create_if_block_3$1(ctx)
  );
  return {
    c() {
      create_component(gformitem.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(gformitem, target, anchor);
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const gformitem_changes = {};
      if (dirty & /*page*/
      1)
        gformitem_changes.item = /*item*/
        ctx2[15];
      if (dirty & /*lang*/
      32)
        gformitem_changes.lang = /*lang*/
        ctx2[5];
      if (dirty & /*translations*/
      64)
        gformitem_changes.translations = /*translations*/
        ctx2[6];
      gformitem.$set(gformitem_changes);
      if (
        /*formErrors*/
        ctx2[8][
          /*item*/
          ctx2[15].id
        ]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_3$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(gformitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(gformitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block_anchor);
      }
      destroy_component(gformitem, detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_else_block_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_2$1(ctx) {
  let button;
  let t;
  let current;
  let mounted;
  let dispose;
  t = new T({
    props: {
      text: "Back",
      lang: (
        /*lang*/
        ctx[5]
      ),
      translations: (
        /*translations*/
        ctx[6]
      )
    }
  });
  return {
    c() {
      button = element("button");
      create_component(t.$$.fragment);
      attr(button, "class", "nav-button back-button svelte-hvfp2g");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      mount_component(t, button, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", prevent_default(function() {
          if (is_function(
            /*onBack*/
            ctx[4]
          ))
            ctx[4].apply(this, arguments);
        }));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const t_changes = {};
      if (dirty & /*lang*/
      32)
        t_changes.lang = /*lang*/
        ctx[5];
      if (dirty & /*translations*/
      64)
        t_changes.translations = /*translations*/
        ctx[6];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(t);
      mounted = false;
      dispose();
    }
  };
}
function create_else_block(ctx) {
  let t;
  let current;
  t = new T({
    props: {
      text: "Next",
      lang: (
        /*lang*/
        ctx[5]
      ),
      translations: (
        /*translations*/
        ctx[6]
      )
    }
  });
  return {
    c() {
      create_component(t.$$.fragment);
    },
    m(target, anchor) {
      mount_component(t, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*lang*/
      32)
        t_changes.lang = /*lang*/
        ctx2[5];
      if (dirty & /*translations*/
      64)
        t_changes.translations = /*translations*/
        ctx2[6];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(t, detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let t;
  let current;
  t = new T({
    props: {
      text: "Submit",
      lang: (
        /*lang*/
        ctx[5]
      ),
      translations: (
        /*translations*/
        ctx[6]
      )
    }
  });
  return {
    c() {
      create_component(t.$$.fragment);
    },
    m(target, anchor) {
      mount_component(t, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*lang*/
      32)
        t_changes.lang = /*lang*/
        ctx2[5];
      if (dirty & /*translations*/
      64)
        t_changes.translations = /*translations*/
        ctx2[6];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(t, detaching);
    }
  };
}
function create_if_block$2(ctx) {
  let t;
  let current;
  t = new T({
    props: {
      text: "Submitting",
      lang: (
        /*lang*/
        ctx[5]
      ),
      translations: (
        /*translations*/
        ctx[6]
      )
    }
  });
  return {
    c() {
      create_component(t.$$.fragment);
    },
    m(target, anchor) {
      mount_component(t, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*lang*/
      32)
        t_changes.lang = /*lang*/
        ctx2[5];
      if (dirty & /*translations*/
      64)
        t_changes.translations = /*translations*/
        ctx2[6];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(t, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div1;
  let t0;
  let t1;
  let t2;
  let div0;
  let current_block_type_index;
  let if_block2;
  let t3;
  let button;
  let current_block_type_index_1;
  let if_block3;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*page*/
    ctx[0].title && create_if_block_5$1(ctx)
  );
  let if_block1 = (
    /*page*/
    ctx[0].description && create_if_block_4$1(ctx)
  );
  let each_value = ensure_array_like(
    /*page*/
    ctx[0].items
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  const if_block_creators = [create_if_block_2$1, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!/*isFirst*/
    ctx2[2])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const if_block_creators_1 = [create_if_block$2, create_if_block_1$2, create_else_block];
  const if_blocks_1 = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*isSubmitting*/
      ctx2[3]
    )
      return 0;
    if (
      /*nextPageId*/
      ctx2[7] === "submit"
    )
      return 1;
    return 2;
  }
  current_block_type_index_1 = select_block_type_1(ctx);
  if_block3 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
  return {
    c() {
      div1 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      div0 = element("div");
      if_block2.c();
      t3 = space();
      button = element("button");
      if_block3.c();
      attr(button, "class", "nav-button next-button svelte-hvfp2g");
      button.disabled = /*isSubmitting*/
      ctx[3];
      attr(div0, "class", "nav-buttons svelte-hvfp2g");
      attr(div1, "class", "page-container svelte-hvfp2g");
      toggle_class(div1, "hidden", !/*isActive*/
      ctx[1]);
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      if (if_block0)
        if_block0.m(div1, null);
      append(div1, t0);
      if (if_block1)
        if_block1.m(div1, null);
      append(div1, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append(div1, t2);
      append(div1, div0);
      if_blocks[current_block_type_index].m(div0, null);
      append(div0, t3);
      append(div0, button);
      if_blocks_1[current_block_type_index_1].m(button, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", prevent_default(
          /*handleNext*/
          ctx[11]
        ));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*page*/
        ctx2[0].title
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_5$1(ctx2);
          if_block0.c();
          if_block0.m(div1, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*page*/
        ctx2[0].description
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*page*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_4$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (dirty & /*formErrors, page, onInputChange, setChoice, lang, translations*/
      1889) {
        each_value = ensure_array_like(
          /*page*/
          ctx2[0].items
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div1, t2);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block2 = if_blocks[current_block_type_index];
        if (!if_block2) {
          if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block2.c();
        } else {
          if_block2.p(ctx2, dirty);
        }
        transition_in(if_block2, 1);
        if_block2.m(div0, t3);
      }
      let previous_block_index_1 = current_block_type_index_1;
      current_block_type_index_1 = select_block_type_1(ctx2);
      if (current_block_type_index_1 === previous_block_index_1) {
        if_blocks_1[current_block_type_index_1].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
          if_blocks_1[previous_block_index_1] = null;
        });
        check_outros();
        if_block3 = if_blocks_1[current_block_type_index_1];
        if (!if_block3) {
          if_block3 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx2);
          if_block3.c();
        } else {
          if_block3.p(ctx2, dirty);
        }
        transition_in(if_block3, 1);
        if_block3.m(button, null);
      }
      if (!current || dirty & /*isSubmitting*/
      8) {
        button.disabled = /*isSubmitting*/
        ctx2[3];
      }
      if (!current || dirty & /*isActive*/
      2) {
        toggle_class(div1, "hidden", !/*isActive*/
        ctx2[1]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block2);
      transition_in(if_block3);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block2);
      transition_out(if_block3);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      destroy_each(each_blocks, detaching);
      if_blocks[current_block_type_index].d();
      if_blocks_1[current_block_type_index_1].d();
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { page } = $$props;
  let { isActive = false } = $$props;
  let { isFirst = false } = $$props;
  let { isSubmitting = false } = $$props;
  let { onBack } = $$props;
  let { onGoto } = $$props;
  let { lang = "en" } = $$props;
  let { translations = {} } = $$props;
  let nextPageId = page.defaultNextPage;
  let formState = {};
  let formErrors = {};
  function setChoice(item, idx) {
    if (!item.choicesNavigation)
      return;
    if (!item.choicesNavigation[idx])
      return;
    $$invalidate(7, nextPageId = item.choicesNavigation[idx].type === "page" ? item.choicesNavigation[idx].id : "submit");
  }
  function onInputChange(id, value) {
    formState[id] = value;
    $$invalidate(8, formErrors[id] = "", formErrors);
  }
  function validatePage() {
    let isValid = true;
    $$invalidate(8, formErrors = {});
    for (let item of page.items) {
      if (item.required && (!formState[item.id] || formState[item.id].length === 0)) {
        $$invalidate(8, formErrors[item.id] = getText("This field is required.", translations, lang), formErrors);
        isValid = false;
      }
    }
    return isValid;
  }
  function handleNext() {
    if (!validatePage()) {
      console.log("Validation failed", formErrors);
      return;
    }
    onGoto(nextPageId);
  }
  $$self.$$set = ($$props2) => {
    if ("page" in $$props2)
      $$invalidate(0, page = $$props2.page);
    if ("isActive" in $$props2)
      $$invalidate(1, isActive = $$props2.isActive);
    if ("isFirst" in $$props2)
      $$invalidate(2, isFirst = $$props2.isFirst);
    if ("isSubmitting" in $$props2)
      $$invalidate(3, isSubmitting = $$props2.isSubmitting);
    if ("onBack" in $$props2)
      $$invalidate(4, onBack = $$props2.onBack);
    if ("onGoto" in $$props2)
      $$invalidate(12, onGoto = $$props2.onGoto);
    if ("lang" in $$props2)
      $$invalidate(5, lang = $$props2.lang);
    if ("translations" in $$props2)
      $$invalidate(6, translations = $$props2.translations);
  };
  return [
    page,
    isActive,
    isFirst,
    isSubmitting,
    onBack,
    lang,
    translations,
    nextPageId,
    formErrors,
    setChoice,
    onInputChange,
    handleNext,
    onGoto
  ];
}
class GPage extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$2,
      create_fragment$2,
      safe_not_equal,
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
      add_css$1
    );
  }
  get page() {
    return this.$$.ctx[0];
  }
  set page(page) {
    this.$$set({ page });
    flush();
  }
  get isActive() {
    return this.$$.ctx[1];
  }
  set isActive(isActive) {
    this.$$set({ isActive });
    flush();
  }
  get isFirst() {
    return this.$$.ctx[2];
  }
  set isFirst(isFirst) {
    this.$$set({ isFirst });
    flush();
  }
  get isSubmitting() {
    return this.$$.ctx[3];
  }
  set isSubmitting(isSubmitting) {
    this.$$set({ isSubmitting });
    flush();
  }
  get onBack() {
    return this.$$.ctx[4];
  }
  set onBack(onBack) {
    this.$$set({ onBack });
    flush();
  }
  get onGoto() {
    return this.$$.ctx[12];
  }
  set onGoto(onGoto) {
    this.$$set({ onGoto });
    flush();
  }
  get lang() {
    return this.$$.ctx[5];
  }
  set lang(lang) {
    this.$$set({ lang });
    flush();
  }
  get translations() {
    return this.$$.ctx[6];
  }
  set translations(translations) {
    this.$$set({ translations });
    flush();
  }
}
create_custom_element(GPage, { "page": {}, "isActive": { "type": "Boolean" }, "isFirst": { "type": "Boolean" }, "isSubmitting": { "type": "Boolean" }, "onBack": {}, "onGoto": {}, "lang": {}, "translations": {} }, [], [], true);
function add_css(target) {
  append_styles(target, "svelte-1hpprge", ':host,:root{--primary-color:#2563eb;--secondary-color:#9333ea;--success-color:#16a34a;--error-color:#dc2626;--primary-dark:color-mix(in srgb, var(--primary-color) 80%, black 20%);--secondary-dark:color-mix(in srgb, var(--secondary-color) 80%, black 20%);--bg-color:#ffffff;--text-color:#1f2937;--muted-text:color-mix(in srgb, var(--text-color) 70%, white 30%);--input-bg-color:#f9fafb;--input-text-color:#111827;--input-border-color:#d1d5db;--input-focus-color:#2563eb;--input-placeholder-color:#9ca3af;--font-family:"Inter", sans-serif;--input-font:"Inter", sans-serif}[data-theme="dark"]{--bg-color:#1f2937;--text-color:#e5e7eb;--muted-text:color-mix(in srgb, var(--text-color) 70%, black 30%);--input-bg-color:#374151;--input-text-color:#f3f4f6;--input-border-color:#4b5563;--input-focus-color:#60a5fa}[data-theme="transparent"]{--bg-color:transparent;--text-color:inherit}.form-container.svelte-1hpprge{background:var(--bg-color);color:var(--text-color);font-family:var(--font-family);padding:1.5rem;border-radius:8px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1)}.form-title.svelte-1hpprge{font-size:1.75rem;font-weight:600;color:var(--primary-color)}.form-link.svelte-1hpprge{color:var(--primary-color);font-size:0.875rem;text-decoration:underline;cursor:pointer}.page-list.svelte-1hpprge{margin-top:1rem}.error-message.svelte-1hpprge{background:#fde2e2;border:1px solid var(--error-color);padding:0.75rem;color:var(--error-color);border-radius:6px;margin-top:1rem}.success-container.svelte-1hpprge{text-align:center;padding:1.5rem;border:1px solid var(--text-color);border-radius:8px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1)}.success-title.svelte-1hpprge{font-size:1.5rem;font-weight:600;color:var(--success-color)}.edit-response-link.svelte-1hpprge{color:var(--secondary-color);text-decoration:underline;margin-top:0.5rem}.submit-again-button.svelte-1hpprge{background:var(--primary-color);color:white;padding:0.75rem 1.5rem;border-radius:6px;cursor:pointer;margin-top:1rem}.submit-again-button.svelte-1hpprge:hover{background:var(--secondary-color)}main.svelte-1hpprge{display:flex;flex-direction:column;align-items:center;justify-content:center}.hidden.svelte-1hpprge{visibility:hidden;display:none}');
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  return child_ctx;
}
function create_if_block$1(ctx) {
  let main;
  let translationselector;
  let t0;
  let form_1;
  let h1;
  let t1;
  let t2;
  let a;
  let t3;
  let t4;
  let t5;
  let a_href_value;
  let t6;
  let div;
  let t7;
  let t8;
  let current;
  translationselector = new TranslationSelector({
    props: {
      translations: (
        /*translations*/
        ctx[2]
      ),
      form: (
        /*form*/
        ctx[1]
      ),
      onChange: (
        /*onLanguageChange*/
        ctx[16]
      )
    }
  });
  t1 = new T({
    props: {
      text: (
        /*form*/
        ctx[1].title
      ),
      lang: (
        /*lang*/
        ctx[0]
      ),
      translations: (
        /*translations*/
        ctx[2]
      )
    }
  });
  t4 = new T({
    props: {
      text: "Complete in Google Forms",
      lang: (
        /*lang*/
        ctx[0]
      ),
      translations: (
        /*translations*/
        ctx[2]
      )
    }
  });
  let each_value = ensure_array_like(
    /*pages*/
    ctx[5]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block0 = (
    /*submissionError*/
    ctx[9] && create_if_block_5(ctx)
  );
  let if_block1 = (
    /*submitted*/
    ctx[8] && create_if_block_1$1(ctx)
  );
  return {
    c() {
      main = element("main");
      create_component(translationselector.$$.fragment);
      t0 = space();
      form_1 = element("form");
      h1 = element("h1");
      create_component(t1.$$.fragment);
      t2 = space();
      a = element("a");
      t3 = text("(");
      create_component(t4.$$.fragment);
      t5 = text(")");
      t6 = space();
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t7 = space();
      if (if_block0)
        if_block0.c();
      t8 = space();
      if (if_block1)
        if_block1.c();
      attr(h1, "class", "form-title svelte-1hpprge");
      attr(a, "class", "form-link svelte-1hpprge");
      attr(a, "href", a_href_value = /*form*/
      ctx[1].publishedUrl);
      attr(div, "class", "page-list svelte-1hpprge");
      attr(form_1, "class", "form-container svelte-1hpprge");
      toggle_class(
        form_1,
        "hidden",
        /*submitted*/
        ctx[8]
      );
      attr(main, "class", "svelte-1hpprge");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      mount_component(translationselector, main, null);
      append(main, t0);
      append(main, form_1);
      append(form_1, h1);
      mount_component(t1, h1, null);
      append(form_1, t2);
      append(form_1, a);
      append(a, t3);
      mount_component(t4, a, null);
      append(a, t5);
      append(form_1, t6);
      append(form_1, div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      ctx[18](form_1);
      append(main, t7);
      if (if_block0)
        if_block0.m(main, null);
      append(main, t8);
      if (if_block1)
        if_block1.m(main, null);
      current = true;
    },
    p(ctx2, dirty) {
      const translationselector_changes = {};
      if (dirty & /*translations*/
      4)
        translationselector_changes.translations = /*translations*/
        ctx2[2];
      if (dirty & /*form*/
      2)
        translationselector_changes.form = /*form*/
        ctx2[1];
      translationselector.$set(translationselector_changes);
      const t1_changes = {};
      if (dirty & /*form*/
      2)
        t1_changes.text = /*form*/
        ctx2[1].title;
      if (dirty & /*lang*/
      1)
        t1_changes.lang = /*lang*/
        ctx2[0];
      if (dirty & /*translations*/
      4)
        t1_changes.translations = /*translations*/
        ctx2[2];
      t1.$set(t1_changes);
      const t4_changes = {};
      if (dirty & /*lang*/
      1)
        t4_changes.lang = /*lang*/
        ctx2[0];
      if (dirty & /*translations*/
      4)
        t4_changes.translations = /*translations*/
        ctx2[2];
      t4.$set(t4_changes);
      if (!current || dirty & /*form*/
      2 && a_href_value !== (a_href_value = /*form*/
      ctx2[1].publishedUrl)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & /*pageHistory, currentPageId, pages, submitting, lang, translations, goBack, nextPageOrSubmit*/
      26853) {
        each_value = ensure_array_like(
          /*pages*/
          ctx2[5]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty & /*submitted*/
      256) {
        toggle_class(
          form_1,
          "hidden",
          /*submitted*/
          ctx2[8]
        );
      }
      if (
        /*submissionError*/
        ctx2[9]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*submissionError*/
          512) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_5(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(main, t8);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*submitted*/
        ctx2[8]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*submitted*/
          256) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(main, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(translationselector.$$.fragment, local);
      transition_in(t1.$$.fragment, local);
      transition_in(t4.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(translationselector.$$.fragment, local);
      transition_out(t1.$$.fragment, local);
      transition_out(t4.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(main);
      }
      destroy_component(translationselector);
      destroy_component(t1);
      destroy_component(t4);
      destroy_each(each_blocks, detaching);
      ctx[18](null);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function create_each_block(ctx) {
  let gpage;
  let current;
  gpage = new GPage({
    props: {
      isFirst: (
        /*pageHistory*/
        ctx[11].length === 0
      ),
      isActive: (
        /*currentPageId*/
        ctx[6] === /*page*/
        ctx[23].id
      ),
      isSubmitting: (
        /*submitting*/
        ctx[7]
      ),
      page: (
        /*page*/
        ctx[23]
      ),
      lang: (
        /*lang*/
        ctx[0]
      ),
      translations: (
        /*translations*/
        ctx[2]
      ),
      onBack: (
        /*goBack*/
        ctx[13]
      ),
      onGoto: (
        /*nextPageOrSubmit*/
        ctx[14]
      )
    }
  });
  return {
    c() {
      create_component(gpage.$$.fragment);
    },
    m(target, anchor) {
      mount_component(gpage, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const gpage_changes = {};
      if (dirty & /*pageHistory*/
      2048)
        gpage_changes.isFirst = /*pageHistory*/
        ctx2[11].length === 0;
      if (dirty & /*currentPageId, pages*/
      96)
        gpage_changes.isActive = /*currentPageId*/
        ctx2[6] === /*page*/
        ctx2[23].id;
      if (dirty & /*submitting*/
      128)
        gpage_changes.isSubmitting = /*submitting*/
        ctx2[7];
      if (dirty & /*pages*/
      32)
        gpage_changes.page = /*page*/
        ctx2[23];
      if (dirty & /*lang*/
      1)
        gpage_changes.lang = /*lang*/
        ctx2[0];
      if (dirty & /*translations*/
      4)
        gpage_changes.translations = /*translations*/
        ctx2[2];
      gpage.$set(gpage_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(gpage.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(gpage.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(gpage, detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let div;
  let t;
  let current;
  t = new T({
    props: {
      text: (
        /*submissionError*/
        ctx[9]
      ),
      lang: (
        /*lang*/
        ctx[0]
      ),
      translations: (
        /*translations*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(t.$$.fragment);
      attr(div, "class", "error-message svelte-1hpprge");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(t, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*submissionError*/
      512)
        t_changes.text = /*submissionError*/
        ctx2[9];
      if (dirty & /*lang*/
      1)
        t_changes.lang = /*lang*/
        ctx2[0];
      if (dirty & /*translations*/
      4)
        t_changes.translations = /*translations*/
        ctx2[2];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(t);
    }
  };
}
function create_if_block_1$1(ctx) {
  let div;
  let h2;
  let t1;
  let t2;
  let t3;
  let current;
  let if_block0 = (
    /*form*/
    ctx[1].confirmationMessage && create_if_block_4(ctx)
  );
  let if_block1 = (
    /*editResponseUrl*/
    ctx[10] && create_if_block_3(ctx)
  );
  let if_block2 = (
    /*allowPostAgain*/
    ctx[3] && create_if_block_2(ctx)
  );
  return {
    c() {
      div = element("div");
      h2 = element("h2");
      h2.textContent = "Form submitted successfully!";
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (if_block2)
        if_block2.c();
      attr(h2, "class", "success-title svelte-1hpprge");
      attr(div, "class", "success-container svelte-1hpprge");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, h2);
      append(div, t1);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t2);
      if (if_block1)
        if_block1.m(div, null);
      append(div, t3);
      if (if_block2)
        if_block2.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*form*/
        ctx2[1].confirmationMessage
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*form*/
          2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t2);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*editResponseUrl*/
        ctx2[10]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*editResponseUrl*/
          1024) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_3(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t3);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*allowPostAgain*/
        ctx2[3]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*allowPostAgain*/
          8) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_2(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
    }
  };
}
function create_if_block_4(ctx) {
  let p;
  let t;
  let current;
  t = new T({
    props: {
      text: (
        /*form*/
        ctx[1].confirmationMessage
      ),
      lang: (
        /*lang*/
        ctx[0]
      ),
      translations: (
        /*translations*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      p = element("p");
      create_component(t.$$.fragment);
    },
    m(target, anchor) {
      insert(target, p, anchor);
      mount_component(t, p, null);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*form*/
      2)
        t_changes.text = /*form*/
        ctx2[1].confirmationMessage;
      if (dirty & /*lang*/
      1)
        t_changes.lang = /*lang*/
        ctx2[0];
      if (dirty & /*translations*/
      4)
        t_changes.translations = /*translations*/
        ctx2[2];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
      destroy_component(t);
    }
  };
}
function create_if_block_3(ctx) {
  let p;
  let a;
  let t;
  let current;
  t = new T({
    props: {
      text: "Edit your response in Google Forms",
      lang: (
        /*lang*/
        ctx[0]
      ),
      translations: (
        /*translations*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      p = element("p");
      a = element("a");
      create_component(t.$$.fragment);
      attr(a, "class", "edit-response-link svelte-1hpprge");
      attr(
        a,
        "href",
        /*editResponseUrl*/
        ctx[10]
      );
      attr(a, "target", "_blank");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, a);
      mount_component(t, a, null);
      current = true;
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*lang*/
      1)
        t_changes.lang = /*lang*/
        ctx2[0];
      if (dirty & /*translations*/
      4)
        t_changes.translations = /*translations*/
        ctx2[2];
      t.$set(t_changes);
      if (!current || dirty & /*editResponseUrl*/
      1024) {
        attr(
          a,
          "href",
          /*editResponseUrl*/
          ctx2[10]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
      destroy_component(t);
    }
  };
}
function create_if_block_2(ctx) {
  let button;
  let t;
  let current;
  let mounted;
  let dispose;
  t = new T({
    props: {
      text: (
        /*postAgainText*/
        ctx[4]
      ),
      lang: (
        /*lang*/
        ctx[0]
      ),
      translations: (
        /*translations*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      button = element("button");
      create_component(t.$$.fragment);
      attr(button, "class", "submit-again-button svelte-1hpprge");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      mount_component(t, button, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*resetForm*/
          ctx[15]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const t_changes = {};
      if (dirty & /*postAgainText*/
      16)
        t_changes.text = /*postAgainText*/
        ctx2[4];
      if (dirty & /*lang*/
      1)
        t_changes.lang = /*lang*/
        ctx2[0];
      if (dirty & /*translations*/
      4)
        t_changes.translations = /*translations*/
        ctx2[2];
      t.$set(t_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(t.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(t.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(t);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*form*/
    ctx[1] && create_if_block$1(ctx)
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*form*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*form*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { form } = $$props;
  let { translations = {} } = $$props;
  let { postUrl = "" } = $$props;
  let { allowPostAgain = true } = $$props;
  let { postAgainText = "Submit another response" } = $$props;
  let pages = [];
  let submitting = false;
  let submitted = false;
  let submissionError = "";
  let editResponseUrl = "";
  let currentPageId;
  let pageHistory = [];
  function parsePages(form2) {
    if (!form2)
      return [];
    const pages2 = [];
    let currentPage = {
      id: "start",
      description: form2.description,
      items: []
    };
    for (const item of form2.items) {
      if (item.type === "pageBreak") {
        pages2.push(currentPage);
        currentPage = {
          id: item.id,
          items: [],
          title: item.title
        };
      } else {
        currentPage.items.push(item);
      }
    }
    if (currentPage.items.length > 0)
      pages2.push(currentPage);
    for (let i = 0; i < pages2.length - 1; i++) {
      if (!pages2[i].defaultNextPage)
        pages2[i].defaultNextPage = pages2[i + 1].id;
    }
    pages2[pages2.length - 1].defaultNextPage = "submit";
    $$invalidate(6, currentPageId = pages2[0].id);
    return pages2;
  }
  function goBack() {
    if (pageHistory.length > 0) {
      $$invalidate(6, currentPageId = pageHistory.pop());
    }
  }
  async function submitForm() {
    $$invalidate(7, submitting = true);
    $$invalidate(9, submissionError = "");
    let formData = new FormData(theFormElement);
    const uuid = crypto.randomUUID();
    let formJson = {
      id: form.id,
      items: Object.fromEntries(formData),
      uuid
    };
    try {
      await fetch(postUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson)
      });
    } catch (error) {
      console.warn("Expected CORS error, ignoring:", error);
    }
    console.log("Submitted data... polling for response: ", uuid);
    let result = await pollForResponse(uuid);
    console.log("Submitted form!", result);
    if (result.success) {
      $$invalidate(8, submitted = true);
      $$invalidate(10, editResponseUrl = result.editResponseUrl || "");
    } else {
      $$invalidate(9, submissionError = "Error submitting the form.");
    }
    $$invalidate(7, submitting = false);
  }
  async function pollForResponse(uuid) {
    for (let i = 0; i < 10; i++) {
      let response = await fetch(`${postUrl}?uuid=${uuid}`, { method: "GET" });
      let data = await response.json();
      if (data.success || data.error)
        return data;
      await new Promise((r) => setTimeout(r, 1e3));
    }
    return {
      success: false,
      error: "Timeout waiting for response"
    };
  }
  function nextPageOrSubmit(nextPageId2) {
    if (nextPageId2 === "submit") {
      submitForm();
    } else {
      pageHistory.push(currentPageId);
      $$invalidate(6, currentPageId = nextPageId2);
    }
  }
  function resetForm() {
    $$invalidate(8, submitted = false);
    $$invalidate(9, submissionError = "");
    $$invalidate(10, editResponseUrl = "");
    $$invalidate(6, currentPageId = pages[0].id);
    $$invalidate(11, pageHistory = []);
    theFormElement.reset();
  }
  let theFormElement;
  let { lang = "en" } = $$props;
  function onLanguageChange(newLang) {
    $$invalidate(0, lang = newLang);
  }
  function form_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      theFormElement = $$value;
      $$invalidate(12, theFormElement);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("form" in $$props2)
      $$invalidate(1, form = $$props2.form);
    if ("translations" in $$props2)
      $$invalidate(2, translations = $$props2.translations);
    if ("postUrl" in $$props2)
      $$invalidate(17, postUrl = $$props2.postUrl);
    if ("allowPostAgain" in $$props2)
      $$invalidate(3, allowPostAgain = $$props2.allowPostAgain);
    if ("postAgainText" in $$props2)
      $$invalidate(4, postAgainText = $$props2.postAgainText);
    if ("lang" in $$props2)
      $$invalidate(0, lang = $$props2.lang);
  };
  $$self.$$.update = () => {
    var _a;
    if ($$self.$$.dirty & /*form*/
    2) {
      $$invalidate(5, pages = parsePages(form));
    }
    if ($$self.$$.dirty & /*pages, currentPageId*/
    96) {
      ((_a = pages.find((page) => page.id === currentPageId)) == null ? void 0 : _a.defaultNextPage) || "submit";
    }
  };
  return [
    lang,
    form,
    translations,
    allowPostAgain,
    postAgainText,
    pages,
    currentPageId,
    submitting,
    submitted,
    submissionError,
    editResponseUrl,
    pageHistory,
    theFormElement,
    goBack,
    nextPageOrSubmit,
    resetForm,
    onLanguageChange,
    postUrl,
    form_1_binding
  ];
}
class GForm extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$1,
      create_fragment$1,
      safe_not_equal,
      {
        form: 1,
        translations: 2,
        postUrl: 17,
        allowPostAgain: 3,
        postAgainText: 4,
        lang: 0
      },
      add_css
    );
  }
  get form() {
    return this.$$.ctx[1];
  }
  set form(form) {
    this.$$set({ form });
    flush();
  }
  get translations() {
    return this.$$.ctx[2];
  }
  set translations(translations) {
    this.$$set({ translations });
    flush();
  }
  get postUrl() {
    return this.$$.ctx[17];
  }
  set postUrl(postUrl) {
    this.$$set({ postUrl });
    flush();
  }
  get allowPostAgain() {
    return this.$$.ctx[3];
  }
  set allowPostAgain(allowPostAgain) {
    this.$$set({ allowPostAgain });
    flush();
  }
  get postAgainText() {
    return this.$$.ctx[4];
  }
  set postAgainText(postAgainText) {
    this.$$set({ postAgainText });
    flush();
  }
  get lang() {
    return this.$$.ctx[0];
  }
  set lang(lang) {
    this.$$set({ lang });
    flush();
  }
}
create_custom_element(GForm, { "form": {}, "translations": {}, "postUrl": {}, "allowPostAgain": { "type": "Boolean" }, "postAgainText": {}, "lang": {} }, [], [], true);
function create_if_block_1(ctx) {
  let gform;
  let current;
  gform = new GForm({
    props: {
      form: (
        /*data*/
        ctx[1]
      ),
      postUrl: (
        /*appsScriptUrl*/
        ctx[3]
      ),
      translations: (
        /*translations*/
        ctx[0]
      ),
      lang: "en"
    }
  });
  return {
    c() {
      create_component(gform.$$.fragment);
    },
    m(target, anchor) {
      mount_component(gform, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const gform_changes = {};
      if (dirty & /*data*/
      2)
        gform_changes.form = /*data*/
        ctx2[1];
      if (dirty & /*appsScriptUrl*/
      8)
        gform_changes.postUrl = /*appsScriptUrl*/
        ctx2[3];
      if (dirty & /*translations*/
      1)
        gform_changes.translations = /*translations*/
        ctx2[0];
      gform.$set(gform_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(gform.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(gform.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(gform, detaching);
    }
  };
}
function create_if_block(ctx) {
  let button;
  let t;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      t = text("↻");
      button.disabled = /*loading*/
      ctx[4];
      attr(button, "class", "bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*loadForm*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*loading*/
      16) {
        button.disabled = /*loading*/
        ctx2[4];
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let t;
  let if_block1_anchor;
  let current;
  let if_block0 = (
    /*data*/
    ctx[1] && create_if_block_1(ctx)
  );
  let if_block1 = (
    /*formsUrl*/
    ctx[2] && create_if_block(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*data*/
        ctx2[1]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*data*/
          2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*formsUrl*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block1_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { formsUrl = "" } = $$props;
  let { formsId = "" } = $$props;
  let { appsScriptUrl = "" } = $$props;
  let { translations = {} } = $$props;
  let { data } = $$props;
  async function loadForm() {
    try {
      $$invalidate(4, loading = true);
      console.log("Loading form from URL", formsUrl);
      var fetchUrl = formsId ? `${appsScriptUrl}?getFormData=1&formId=${encodeURIComponent(formsId)}` : `${appsScriptUrl}?getFormData=1&formUrl=${encodeURIComponent(formsUrl)}`;
      const response = await fetch(fetchUrl, { method: "GET", redirect: "follow" });
      if (!response.ok) {
        throw new Error(`Failed to load form: ${response.statusText}`);
      }
      $$invalidate(1, data = await response.json());
      console.log("Form Data Loaded:", data);
    } catch (error) {
      console.error("Error loading form from URL", fetchUrl, error);
    } finally {
      $$invalidate(4, loading = false);
    }
    let translationsUrl = `${appsScriptUrl}?translations=1`;
    if (formsId) {
      translationsUrl += `&formId=${encodeURIComponent(formsId)}`;
    } else {
      translationsUrl += `&formUrl=${encodeURIComponent(formsUrl)}`;
    }
    $$invalidate(4, loading = true);
    try {
      console.log("Fetch transalations from", translationsUrl);
      const response = await fetch(translationsUrl, { method: "GET", redirect: "follow" });
      if (!response.ok) {
        throw new Error(`Failed to load translations: ${response.statusText}`);
      }
      $$invalidate(0, translations = await response.json());
      console.log("Translations Loaded:", translations);
    } catch (error) {
      console.error("Error loading translations from URL", translationsUrl, error);
    }
  }
  let loading = false;
  onMount(() => {
    loadForm();
  });
  $$self.$$set = ($$props2) => {
    if ("formsUrl" in $$props2)
      $$invalidate(2, formsUrl = $$props2.formsUrl);
    if ("formsId" in $$props2)
      $$invalidate(6, formsId = $$props2.formsId);
    if ("appsScriptUrl" in $$props2)
      $$invalidate(3, appsScriptUrl = $$props2.appsScriptUrl);
    if ("translations" in $$props2)
      $$invalidate(0, translations = $$props2.translations);
    if ("data" in $$props2)
      $$invalidate(1, data = $$props2.data);
  };
  return [translations, data, formsUrl, appsScriptUrl, loading, loadForm, formsId];
}
class GFormMirror extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, not_equal, {
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
  set formsUrl(formsUrl) {
    this.$$set({ formsUrl });
    flush();
  }
  get formsId() {
    return this.$$.ctx[6];
  }
  set formsId(formsId) {
    this.$$set({ formsId });
    flush();
  }
  get appsScriptUrl() {
    return this.$$.ctx[3];
  }
  set appsScriptUrl(appsScriptUrl) {
    this.$$set({ appsScriptUrl });
    flush();
  }
  get translations() {
    return this.$$.ctx[0];
  }
  set translations(translations) {
    this.$$set({ translations });
    flush();
  }
  get data() {
    return this.$$.ctx[1];
  }
  set data(data) {
    this.$$set({ data });
    flush();
  }
}
customElements.define("gforms-mirror", create_custom_element(GFormMirror, { "formsUrl": {}, "formsId": {}, "appsScriptUrl": {}, "translations": {}, "data": {} }, [], [], true));
export {
  GFormMirror as default
};
//# sourceMappingURL=gform-mirror.js.map
